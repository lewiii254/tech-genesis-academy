
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Users, 
  Award, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Play,
  Globe,
  Clock,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Smartphone
} from "lucide-react";

const featuredCourses = [
  {
    id: 1,
    title: "Full Stack Web Development (MERN)",
    description: "Master MongoDB, Express, React, and Node.js for the Kenyan market",
    image: "photo-1461749280684-dccba630e2f6",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: 1234,
    price: "KES 2,500/month"
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn Python programming and data analysis - high demand in Kenya",
    image: "photo-1498050108023-c5249f4df085",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.9,
    students: 2156,
    price: "KES 2,500/month"
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Build native mobile apps for Kenya's growing mobile market",
    image: "photo-1531297484001-80022131f5a1",
    level: "Advanced",
    duration: "14 weeks",
    rating: 4.7,
    students: 892,
    price: "KES 5,000/month"
  }
];

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience"
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with fellow learners and collaborate on projects"
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn verified certificates to showcase your achievements"
  },
  {
    icon: Zap,
    title: "AI-Powered Learning",
    description: "Get personalized recommendations and instant help"
  },
  {
    icon: Target,
    title: "Project-Based",
    description: "Build real projects that you can add to your portfolio"
  },
  {
    icon: Globe,
    title: "Learn Anywhere",
    description: "Access courses from anywhere, anytime on any device"
  }
];

const testimonials = [
  {
    name: "Grace Wanjiku",
    role: "Software Developer",
    company: "Safaricom",
    image: "GW",
    quote: "TechLearn helped me transition from accounting to tech. Now I'm working at Safaricom building the future of mobile technology in Kenya!"
  },
  {
    name: "Brian Kiprotich",
    role: "Data Scientist", 
    company: "Equity Bank",
    image: "BK",
    quote: "The Python course gave me the skills I needed to land a data science role at Equity Bank. The M-PESA payment option made it so convenient!"
  },
  {
    name: "Mercy Akinyi",
    role: "Full Stack Developer",
    company: "iHub Nairobi",
    image: "MA",
    quote: "From zero coding experience to building apps for Kenyan startups - TechLearn made it possible with practical, locally relevant content."
  }
];

const stats = [
  { number: "15,000+", label: "Kenyan Students" },
  { number: "200+", label: "Local Instructors" },
  { number: "50+", label: "Industry Courses" },
  { number: "95%", label: "Job Placement Rate" }
];

const Landing = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-red-600">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white text-emerald-700 px-4 py-2">
            🇰🇪 Made for Kenya - Pay with M-PESA
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Master Tech Skills for
            <span className="text-red-200"> Kenya's Digital Future</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-emerald-100 mb-12 leading-relaxed">
            Join thousands of Kenyans building successful tech careers. Learn in-demand skills, 
            get job placement support, and pay conveniently with M-PESA starting from KES 2,500/month.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Start Learning Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                <Smartphone className="mr-2 h-5 w-5" />
                View Pricing & M-PESA
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Kenyan Professionals Choose TechLearn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the Kenyan tech ecosystem and provide exactly what you need to succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* M-PESA Payment Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-50 to-red-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <Smartphone className="h-20 w-20 mx-auto mb-6 text-emerald-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pay Easily with M-PESA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No need for credit cards or bank transfers. Pay securely with M-PESA, 
              Kenya's most trusted mobile money platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Choose Your Plan</h3>
                <p className="text-gray-600 text-sm">Select from our affordable monthly plans starting at KES 2,500</p>
              </CardContent>
            </Card>
            
            <Card className="border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enter Phone Number</h3>
                <p className="text-gray-600 text-sm">Input your M-PESA registered phone number</p>
              </CardContent>
            </Card>
            
            <Card className="border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Complete Payment</h3>
                <p className="text-gray-600 text-sm">Confirm the M-PESA prompt on your phone and start learning immediately</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Courses Built for Kenya's Tech Market
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn skills that are in high demand by Kenyan companies and international employers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="border-emerald-200 overflow-hidden hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
                <div className="relative">
                  <img 
                    src={`https://images.unsplash.com/${course.image}?w=400&h=200&fit=crop`}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">
                    {course.price}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-600 text-sm">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-gray-900 text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link to={`/course/${course.id}`}>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-red-600 hover:from-emerald-700 hover:to-red-700">
                      View Course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-r from-emerald-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from Kenya
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how TechLearn has transformed careers of Kenyan professionals across the country
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-emerald-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Tech Journey in Kenya?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of Kenyans who have successfully transformed their careers with TechLearn
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-md bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Link to="/pricing">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                View M-PESA Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-emerald-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>M-PESA payments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-red-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TechLearn Kenya</span>
              </div>
              <p className="text-gray-300">
                Empowering Kenya's next generation of tech professionals with world-class education and M-PESA convenience.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Popular Courses</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Web Development</a></li>
                <li><a href="#" className="hover:text-white">Data Science</a></li>
                <li><a href="#" className="hover:text-white">Mobile Development</a></li>
                <li><a href="#" className="hover:text-white">Digital Marketing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">M-PESA Support</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Career Guidance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 TechLearn Kenya. All rights reserved. M-PESA is a trademark of Safaricom.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
