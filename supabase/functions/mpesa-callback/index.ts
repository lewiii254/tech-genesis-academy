
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const callbackData = await req.json();
    console.log('M-Pesa callback received:', JSON.stringify(callbackData, null, 2));

    const { Body } = callbackData;
    const { stkCallback } = Body;

    const checkoutRequestID = stkCallback.CheckoutRequestID;
    const merchantRequestID = stkCallback.MerchantRequestID;
    const resultCode = stkCallback.ResultCode;
    const resultDesc = stkCallback.ResultDesc;

    // Find the payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('checkout_request_id', checkoutRequestID)
      .single();

    if (paymentError || !payment) {
      console.error('Payment not found:', checkoutRequestID);
      return new Response(JSON.stringify({ success: false }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (resultCode === 0) {
      // Payment successful
      const callbackMetadata = stkCallback.CallbackMetadata;
      const items = callbackMetadata.Item;
      
      let mpesaReceiptNumber = '';
      let transactionDate = '';
      let amountPaid = 0;

      items.forEach((item: any) => {
        switch (item.Name) {
          case 'MpesaReceiptNumber':
            mpesaReceiptNumber = item.Value;
            break;
          case 'TransactionDate':
            transactionDate = item.Value;
            break;
          case 'Amount':
            amountPaid = item.Value;
            break;
        }
      });

      // Update payment record
      const { error: updateError } = await supabase
        .from('payments')
        .update({
          status: 'success',
          mpesa_receipt_number: mpesaReceiptNumber,
          transaction_date: new Date(
            transactionDate.substring(0, 4) + '-' +
            transactionDate.substring(4, 6) + '-' +
            transactionDate.substring(6, 8) + 'T' +
            transactionDate.substring(8, 10) + ':' +
            transactionDate.substring(10, 12) + ':' +
            transactionDate.substring(12, 14)
          ).toISOString(),
        })
        .eq('id', payment.id);

      if (updateError) {
        console.error('Error updating payment:', updateError);
      } else {
        console.log('Payment updated successfully:', payment.id);
        
        // Process the payment based on type
        if (payment.payment_type === 'subscription') {
          await processSubscription(payment);
        } else if (payment.payment_type === 'course_enrollment') {
          await processCourseEnrollment(payment);
        }
      }

    } else {
      // Payment failed
      await supabase
        .from('payments')
        .update({
          status: 'failed',
        })
        .eq('id', payment.id);

      console.log('Payment failed:', resultDesc);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in mpesa-callback function:', error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function processSubscription(payment: any) {
  try {
    // Calculate expiry date based on plan
    const now = new Date();
    const expiryDate = new Date(now);
    expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month subscription

    // Create or update subscription
    const { error } = await supabase
      .from('user_subscriptions')
      .upsert({
        user_id: payment.user_id,
        plan_type: payment.reference_id, // premium, pro, etc.
        status: 'active',
        expires_at: expiryDate.toISOString(),
        payment_id: payment.id,
      });

    if (error) {
      console.error('Error creating subscription:', error);
    } else {
      console.log('Subscription created/updated for user:', payment.user_id);
    }
  } catch (error) {
    console.error('Error processing subscription:', error);
  }
}

async function processCourseEnrollment(payment: any) {
  try {
    // Create course enrollment
    const { error } = await supabase
      .from('course_enrollments')
      .upsert({
        user_id: payment.user_id,
        course_id: payment.reference_id,
        status: 'active',
        payment_id: payment.id,
      });

    if (error) {
      console.error('Error creating enrollment:', error);
    } else {
      console.log('Course enrollment created for user:', payment.user_id, 'course:', payment.reference_id);
    }
  } catch (error) {
    console.error('Error processing course enrollment:', error);
  }
}
