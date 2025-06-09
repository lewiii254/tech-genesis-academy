
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Clock, Users, Star, Smartphone, CheckCircle, Play, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaidCourse {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  students: number;
  rating: number;
  level: string;
  thumbnail: string;
  modules: string[];
  skills: string[];
  certificate: boolean;
  featured?: boolean;
}

const paidCourses: PaidCourse[] = [
  {
    id: "1",
    title: "Advanced React Development",
    instructor: "Sarah Kimani",
    description: "Master React with hooks, context, and advanced patterns. Build production-ready applications.",
    price: 15000,
    originalPrice: 25000,
    duration: "8 weeks",
    students: 1250,
    rating: 4.9,
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    modules: ["Advanced Hooks", "State Management", "Performance Optimization", "Testing", "Deployment"],
    skills: ["React 18", "TypeScript", "Testing Library", "Next.js"],
    certificate: true,
    featured: true
  },
  {
    id: "2",
    title: "Full Stack Web Development",
    instructor: "David Mwangi",
    description: "Complete web development course covering frontend, backend, and database technologies.",
    price: 25000,
    originalPrice: 35000,
    duration: "12 weeks",
    students: 890,
    rating: 4.8,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
    modules: ["HTML/CSS/JS", "React", "Node.js", "MongoDB", "Deployment"],
    skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    certificate: true
  },
  {
    id: "3",
    title: "Mobile App Development with Flutter",
    instructor: "Grace Wanjiku",
    description: "Build beautiful cross-platform mobile apps with Flutter and Dart.",
    price: 18000,
    originalPrice: 28000,
    duration: "10 weeks",
    students: 650,
    rating: 4.7,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    modules: ["Dart Fundamentals", "Flutter Widgets", "State Management", "APIs", "Publishing"],
    skills: ["Flutter", "Dart", "Firebase", "REST APIs", "App Store"],
    certificate: true,
    featured: true
  }
];

const PaidCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<PaidCourse | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStep, setPaymentStep] = useState<"details" | "payment" | "processing">("details");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { toast } = useToast();

  const handleEnrollment = async () => {
    if (!selectedCourse) return;

    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your M-PESA phone number to proceed.",
        variant: "destructive",
      });
      return;
    }

    setPaymentStep("processing");

    toast({
      title: "M-PESA Payment Initiated",
      description: `Please check your phone (${phoneNumber}) for the M-PESA prompt to pay KES ${selectedCourse.price.toLocaleString()}.`,
    });

    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `Welcome to ${selectedCourse.title}! You now have lifetime access to this course.`,
      });
      setPaymentStep("details");
      setSelectedCourse(null);
      setPhoneNumber("");
    }, 3000);
  };

  const toggleWishlist = (courseId: string) => {
    setWishlist(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
    toast({
      title: wishlist.includes(courseId) ? "Removed from Wishlist" : "Added to Wishlist",
      description: wishlist.includes(courseId) ? "Course removed from your wishlist" : "Course added to your wishlist",
    });
  };

  const handlePreview = (courseTitle: string) => {
    toast({
      title: "Preview Available",
      description: `Opening preview for ${courseTitle}`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-slate-900">Premium Courses</h2>
        <p className="text-lg text-slate-600">Unlock advanced skills with our expert-led courses</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Lifetime Access
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Expert Instructors
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            Certificates Included
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paidCourses.map((course) => (
          <Card key={course.id} className="bg-white border-slate-200 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            {course.featured && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  ⭐ Featured
                </Badge>
              </div>
            )}
            
            <CardHeader className="p-0 relative">
              <div className="relative overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    size="sm"
                    onClick={() => handlePreview(course.title)}
                    className="bg-white/90 text-slate-900 hover:bg-white"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </div>
              
              <div className="p-6 pb-2">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-slate-100 text-slate-800 border-slate-200">
                    {course.level}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleWishlist(course.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                    </Button>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-slate-700 text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-slate-900 text-lg mb-2 leading-tight">{course.title}</CardTitle>
                <p className="text-slate-600 text-sm mb-1">by {course.instructor}</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-slate-700 text-sm line-clamp-2">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 col-span-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-700">Certificate included</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold text-xl">
                        KES {course.price.toLocaleString()}
                      </span>
                      {course.originalPrice && (
                        <span className="text-slate-500 line-through text-sm">
                          KES {course.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {course.originalPrice && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                        Save KES {(course.originalPrice - course.price).toLocaleString()}
                      </Badge>
                    )}
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => setSelectedCourse(course)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Enroll Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-white border-slate-200">
                    <DialogHeader>
                      <DialogTitle className="text-slate-900">{course.title}</DialogTitle>
                      <DialogDescription className="text-slate-600">
                        by {course.instructor} • {course.duration} • {course.level}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Course Overview</h4>
                        <p className="text-slate-700">{course.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">What You'll Learn</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                          {course.modules.map((module, index) => (
                            <li key={index}>{module}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Skills You'll Gain</h4>
                        <div className="flex flex-wrap gap-2">
                          {course.skills.map((skill, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-slate-200 pt-4">
                        <h4 className="font-semibold text-slate-900 mb-3">Payment Details</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">Course Price:</span>
                            <span className="text-green-600 font-bold text-lg">
                              KES {course.price.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-900">M-PESA Phone Number</label>
                            <Input
                              type="tel"
                              placeholder="0712345678"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="bg-slate-50 border-slate-300 text-slate-900"
                            />
                          </div>
                          
                          <Button
                            onClick={handleEnrollment}
                            disabled={paymentStep === "processing"}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                          >
                            {paymentStep === "processing" ? (
                              "Processing Payment..."
                            ) : (
                              <>
                                <Smartphone className="mr-2 h-4 w-4" />
                                Pay KES {course.price.toLocaleString()} via M-PESA
                              </>
                            )}
                          </Button>
                          
                          <p className="text-xs text-slate-500 text-center">
                            Secure payment powered by Safaricom M-PESA
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Level Up Your Skills?</h3>
          <p className="text-blue-100 mb-6 text-lg">Join thousands of learners advancing their careers with our premium courses</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Browse All Courses
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              View Learning Paths
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaidCourses;
