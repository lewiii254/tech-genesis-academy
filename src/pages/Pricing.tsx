
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Users, BookOpen, Award, Smartphone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "Forever",
    description: "Perfect for getting started with tech learning",
    features: [
      "Access to 3 basic courses",
      "Community support",
      "Basic progress tracking",
      "Mobile app access",
      "Email support"
    ],
    popular: false,
    color: "from-gray-500 to-gray-600"
  },
  {
    id: "premium",
    name: "Premium",
    price: 2500,
    period: "per month",
    description: "Most popular choice for serious learners",
    features: [
      "Access to all 50+ courses",
      "AI-powered learning assistant",
      "Priority community support",
      "Advanced progress analytics",
      "Downloadable resources",
      "Live coding sessions",
      "Career guidance",
      "Industry certificates"
    ],
    popular: true,
    color: "from-blue-500 to-purple-600"
  },
  {
    id: "pro",
    name: "Professional",
    price: 5000,
    period: "per month",
    description: "For professionals and teams",
    features: [
      "Everything in Premium",
      "1-on-1 mentorship sessions",
      "Job placement assistance",
      "Custom learning paths",
      "Team collaboration tools",
      "Advanced project reviews",
      "Industry networking events",
      "Lifetime access to courses"
    ],
    popular: false,
    color: "from-purple-500 to-pink-600"
  }
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const handleSubscribe = async (planId: string, price: number) => {
    if (planId === "free") {
      toast({
        title: "Welcome to TechLearn!",
        description: "You're now on the free plan. Start learning immediately!",
      });
      return;
    }

    if (paymentMethod === "mpesa" && !phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your M-PESA phone number to proceed.",
        variant: "destructive",
      });
      return;
    }

    setSelectedPlan(planId);
    
    try {
      if (paymentMethod === "mpesa") {
        // Simulate M-PESA payment
        toast({
          title: "M-PESA Payment Initiated",
          description: `Please check your phone (${phoneNumber}) for the M-PESA prompt to pay KES ${price.toLocaleString()}.`,
        });
        
        // Simulate payment processing
        setTimeout(() => {
          toast({
            title: "Payment Successful!",
            description: `Welcome to TechLearn ${planId}! Your subscription is now active.`,
          });
          setSelectedPlan(null);
        }, 3000);
      } else {
        // Card payment simulation
        toast({
          title: "Redirecting to Payment",
          description: "You'll be redirected to our secure payment gateway.",
        });
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2">
            🇰🇪 Made for Kenya
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Affordable Tech Education for
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Every Kenyan</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Master in-demand tech skills with courses designed for the Kenyan market. 
            Pay easily with M-PESA and join thousands of Kenyans building their tech careers.
          </p>
          <div className="flex justify-center gap-8 text-slate-300">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-green-400" />
              <span>M-PESA Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span>10,000+ Kenyan Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              <span>Industry Recognized</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className={`relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <Star className="mr-1 h-4 w-4" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">
                    KES {plan.price.toLocaleString()}
                  </span>
                  <span className="text-slate-300 ml-2">/{plan.period}</span>
                </div>
                <CardDescription className="text-slate-300 mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.id !== "free" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Payment Method</label>
                      <div className="flex gap-2">
                        <Button
                          variant={paymentMethod === "mpesa" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPaymentMethod("mpesa")}
                          className="flex-1"
                        >
                          <Smartphone className="mr-2 h-4 w-4" />
                          M-PESA
                        </Button>
                        <Button
                          variant={paymentMethod === "card" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPaymentMethod("card")}
                          className="flex-1"
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Card
                        </Button>
                      </div>
                    </div>

                    {paymentMethod === "mpesa" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">M-PESA Phone Number</label>
                        <input
                          type="tel"
                          placeholder="0712345678"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-slate-400"
                        />
                      </div>
                    )}
                  </div>
                )}

                <Button
                  onClick={() => handleSubscribe(plan.id, plan.price)}
                  disabled={selectedPlan === plan.id}
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`}
                >
                  {selectedPlan === plan.id ? "Processing..." : 
                   plan.id === "free" ? "Get Started Free" : `Subscribe for KES ${plan.price.toLocaleString()}/month`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kenya-specific Features */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-white/20 mb-16">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">🇰🇪 Built for Kenya</h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We understand the Kenyan tech ecosystem and have designed our platform to meet local needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">M-PESA Integration</h4>
                <p className="text-slate-300 text-sm">Pay easily with M-PESA, Kenya's most trusted mobile money platform</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Local Content</h4>
                <p className="text-slate-300 text-sm">Courses tailored for the Kenyan job market and tech industry</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Community Support</h4>
                <p className="text-slate-300 text-sm">Connect with fellow Kenyan developers and tech professionals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-white mb-2">Is M-PESA payment secure?</h4>
                <p className="text-slate-300 text-sm">Yes, we use secure M-PESA integration with end-to-end encryption to protect your payments.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-white mb-2">Can I cancel my subscription anytime?</h4>
                <p className="text-slate-300 text-sm">Yes, you can cancel your subscription anytime. You'll continue to have access until the end of your billing period.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-white mb-2">Do you offer student discounts?</h4>
                <p className="text-slate-300 text-sm">Yes, we offer 50% discounts for verified students. Contact support with your student ID.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-white mb-2">What happens if M-PESA payment fails?</h4>
                <p className="text-slate-300 text-sm">If payment fails, you can retry immediately or use card payment. No charges are made for failed transactions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
