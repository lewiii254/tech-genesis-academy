
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, Star, ArrowRight, Play, CheckCircle, Briefcase, Building, MapPin, DollarSign } from "lucide-react";
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
      icon: Briefcase,
      title: "Job Placement Board",
      description: "Access exclusive job opportunities from top Kenyan companies and apply directly through our platform"
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

  const jobHighlights = [
    {
      title: "Senior Frontend Developer",
      company: "Safaricom PLC",
      location: "Nairobi, Kenya",
      salary: "KES 180,000 - 300,000",
      type: "Full-time"
    },
    {
      title: "Data Scientist",
      company: "Equity Bank",
      location: "Nairobi, Kenya", 
      salary: "KES 200,000 - 350,000",
      type: "Full-time"
    },
    {
      title: "Mobile App Developer",
      company: "M-Shule",
      location: "Nairobi, Kenya",
      salary: "KES 120,000 - 200,000",
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-cyan-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/50 to-background/50 backdrop-blur-sm"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">
              🚀 Kenya's #1 Tech Learning Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Master Tech Skills,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-700">
                {" "}Transform Your Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Join thousands of Kenyans advancing their careers through industry-relevant tech education. 
              Learn from experts, build real projects, and land your dream job.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-cyan-700 hover:from-primary/90 hover:to-cyan-700/90 text-lg px-8 py-4 text-white">
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-cyan-700 hover:from-primary/90 hover:to-cyan-700/90 text-lg px-8 py-4 text-white">
                  <Link to="/auth">
                    Start Learning Today <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted text-lg px-8 py-4">
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
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose TechLearn Kenya?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just another online learning platform. We're your partners in building a successful tech career in Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/30 transition-all duration-300 group shadow-md">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-card-foreground text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Board Showcase Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Exclusive Job Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get direct access to premium job opportunities from Kenya's top tech companies. Our job board connects you with employers looking for skilled professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {jobHighlights.map((job, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/30 transition-all duration-300 shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {job.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <h4 className="text-card-foreground font-semibold text-lg mb-2">{job.title}</h4>
                  <p className="text-foreground mb-3">{job.company}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium text-emerald-600">{job.salary}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-accent to-emerald-700 hover:from-accent/90 hover:to-emerald-700/90 text-white">
              <Link to="/jobs">
                <Briefcase className="mr-2 h-5 w-5" />
                View All Job Opportunities
              </Link>
            </Button>
            <p className="text-muted-foreground mt-4">
              Join our platform to access exclusive job postings and apply directly through TechLearn Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Success Stories from Kenya
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from Kenyan professionals who transformed their careers with TechLearn Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/30 transition-all duration-300 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-cyan-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-card-foreground font-semibold">{testimonial.name}</h4>
                      <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the community of ambitious Kenyans building the future of technology. Your success story starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-cyan-700 hover:from-primary/90 hover:to-cyan-700/90 text-lg px-8 py-4 text-white">
                <Link to="/courses">
                  Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-cyan-700 hover:from-primary/90 hover:to-cyan-700/90 text-lg px-8 py-4 text-white">
                  <Link to="/auth">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-muted text-lg px-8 py-4">
                  <Link to="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="mt-8 flex justify-center items-center space-x-6 text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-accent mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-accent mr-2" />
              <span>7-day free trial</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
