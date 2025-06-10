
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// M-Pesa credentials from environment
const MPESA_CONSUMER_KEY = Deno.env.get('MPESA_CONSUMER_KEY');
const MPESA_CONSUMER_SECRET = Deno.env.get('MPESA_CONSUMER_SECRET');
const MPESA_BUSINESS_SHORT_CODE = Deno.env.get('MPESA_BUSINESS_SHORT_CODE');
const MPESA_PASSKEY = Deno.env.get('MPESA_PASSKEY');

// M-Pesa sandbox URLs (change to production when ready)
const MPESA_BASE_URL = 'https://sandbox.safaricom.co.ke';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getAccessToken() {
  const auth = btoa(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`);
  
  const response = await fetch(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
    },
  });
  
  const data = await response.json();
  return data.access_token;
}

function generateTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hour}${minute}${second}`;
}

function generatePassword(shortCode: string, passkey: string, timestamp: string) {
  const data = shortCode + passkey + timestamp;
  return btoa(data);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, phoneNumber, paymentType, referenceId, userId } = await req.json();

    // Clean phone number (remove + and ensure it starts with 254)
    let cleanPhone = phoneNumber.replace(/\+/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '254' + cleanPhone.substring(1);
    }
    if (!cleanPhone.startsWith('254')) {
      cleanPhone = '254' + cleanPhone;
    }

    console.log('Processing payment:', { amount, phoneNumber: cleanPhone, paymentType, referenceId, userId });

    // Get access token
    const accessToken = await getAccessToken();
    console.log('Got access token');

    // Generate timestamp and password
    const timestamp = generateTimestamp();
    const password = generatePassword(MPESA_BUSINESS_SHORT_CODE!, MPESA_PASSKEY!, timestamp);

    // Create payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        amount: parseFloat(amount),
        phone_number: cleanPhone,
        payment_type: paymentType,
        reference_id: referenceId,
        status: 'pending'
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
      throw new Error('Failed to create payment record');
    }

    console.log('Created payment record:', payment.id);

    // Prepare STK Push request
    const stkPushPayload = {
      BusinessShortCode: MPESA_BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: cleanPhone,
      PartyB: MPESA_BUSINESS_SHORT_CODE,
      PhoneNumber: cleanPhone,
      CallBackURL: `${supabaseUrl}/functions/v1/mpesa-callback`,
      AccountReference: `TechLearn-${payment.id}`,
      TransactionDesc: `Payment for ${paymentType}`,
    };

    console.log('Sending STK Push request...');

    // Send STK Push request
    const stkResponse = await fetch(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPushPayload),
    });

    const stkData = await stkResponse.json();
    console.log('STK Push response:', stkData);

    if (stkData.ResponseCode === '0') {
      // Update payment with checkout request ID
      await supabase
        .from('payments')
        .update({
          checkout_request_id: stkData.CheckoutRequestID,
          merchant_request_id: stkData.MerchantRequestID,
        })
        .eq('id', payment.id);

      return new Response(JSON.stringify({
        success: true,
        message: 'STK Push sent successfully',
        checkoutRequestId: stkData.CheckoutRequestID,
        paymentId: payment.id
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({ status: 'failed' })
        .eq('id', payment.id);

      throw new Error(stkData.ResponseDescription || 'STK Push failed');
    }

  } catch (error) {
    console.error('Error in mpesa-payment function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
