
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, Star, ArrowRight, Play, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Landing = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience in Kenya's tech scene"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Join study groups and connect with fellow learners across Kenya"
    },
    {
      icon: Award,
      title: "Recognized Certificates",
      description: "Earn certificates valued by top employers in Kenya and East Africa"
    },
    {
      icon: Star,
      title: "Personalized Learning",
      description: "AI-powered recommendations tailored to your career goals and learning pace"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Learners" },
    { number: "500+", label: "Expert Instructors" },
    { number: "50+", label: "Course Categories" },
    { number: "95%", label: "Job Placement Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Mwangi",
      role: "Software Developer at Safaricom",
      content: "TechLearn Kenya transformed my career. The courses are practical and directly applicable to real work scenarios.",
      avatar: "SM"
    },
    {
      name: "David Kiprotich",
      role: "Data Scientist at Equity Bank",
      content: "The community support and expert mentorship made all the difference in my learning journey.",
      avatar: "DK"
    },
    {
      name: "Grace Wanjiku",
      role: "UX Designer at iHub",
      content: "From beginner to professional in 6 months. The quality of education here is unmatched.",
      avatar: "GW"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-red-600/20 backdrop-blur-sm"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-8">
            <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-500/30 mb-6">
              🚀 Kenya's #1 Tech Learning Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master Tech Skills,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-red-400">
                {" "}Transform Your Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto">
              Join thousands of Kenyans advancing their careers through industry-relevant tech education. 
              Learn from experts, build real projects, and land your dream job.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-lg px-8 py-4">
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-lg px-8 py-4">
                  <Link to="/auth">
                    Start Learning Today <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose TechLearn Kenya?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We're not just another online learning platform. We're your partners in building a successful tech career in Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success Stories from Kenya
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Hear from Kenyan professionals who transformed their careers with TechLearn Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-slate-300 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join the community of ambitious Kenyans building the future of technology. Your success story starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-lg px-8 py-4">
                <Link to="/courses">
                  Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-lg px-8 py-4">
                  <Link to="/auth">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4">
                  <Link to="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="mt-8 flex justify-center items-center space-x-6 text-slate-300">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-emerald-400 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-emerald-400 mr-2" />
              <span>7-day free trial</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
