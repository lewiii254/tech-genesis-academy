
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
  TrendingUp
} from "lucide-react";

const featuredCourses = [
  {
    id: 1,
    title: "Full Stack MERN Development",
    description: "Master MongoDB, Express, React, and Node.js",
    image: "photo-1461749280684-dccba630e2f6",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: 1234,
    price: "Free"
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn Python programming and data analysis",
    image: "photo-1498050108023-c5249f4df085",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.9,
    students: 2156,
    price: "Free"
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Build native mobile apps with React Native",
    image: "photo-1531297484001-80022131f5a1",
    level: "Advanced",
    duration: "14 weeks",
    rating: 4.7,
    students: 892,
    price: "Free"
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
    name: "Sarah Johnson",
    role: "Software Developer",
    company: "Google",
    image: "SJ",
    quote: "TechLearn helped me transition from marketing to tech. The courses are practical and the community is incredibly supportive."
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    company: "Microsoft",
    image: "MC",
    quote: "The Python course gave me the foundation I needed to excel in data science. Now I'm working at my dream company!"
  },
  {
    name: "Emily Rodriguez",
    role: "Full Stack Developer",
    company: "Netflix",
    image: "ER",
    quote: "From zero coding experience to landing a job at Netflix - TechLearn made it possible with their comprehensive curriculum."
  }
];

const stats = [
  { number: "50,000+", label: "Active Students" },
  { number: "500+", label: "Expert Instructors" },
  { number: "100+", label: "Courses Available" },
  { number: "95%", label: "Success Rate" }
];

const Landing = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">TechLearn</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#courses" className="text-slate-300 hover:text-white transition-colors">Courses</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Reviews</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
            🚀 Join 50,000+ learners worldwide
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Master Tech Skills with
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Expert-Led</span> Courses
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            Transform your career with hands-on programming courses, real projects, 
            and a supportive community. Start learning today and land your dream tech job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Start Learning Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4">
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Courses
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose TechLearn?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We provide everything you need to succeed in your tech career journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Courses
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Start with our most popular courses, loved by thousands of students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
                <div className="relative">
                  <img 
                    src={`https://images.unsplash.com/${course.image}?w=400&h=200&fit=crop`}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                    {course.price}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-white/20 text-slate-300">
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-slate-300 text-sm">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-300 mb-4">
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
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
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
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See how TechLearn has transformed careers of thousands of students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-slate-300">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 italic">"{testimonial.quote}"</p>
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
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have successfully transformed their careers with TechLearn
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-md bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Instant access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black/30 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TechLearn</span>
              </div>
              <p className="text-slate-300">
                Empowering the next generation of tech professionals with world-class education.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Courses</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white">Web Development</a></li>
                <li><a href="#" className="hover:text-white">Data Science</a></li>
                <li><a href="#" className="hover:text-white">Mobile Development</a></li>
                <li><a href="#" className="hover:text-white">AI & Machine Learning</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Career Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-slate-300">
            <p>&copy; 2024 TechLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
