
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Clock, Users, Star, Smartphone, CheckCircle } from "lucide-react";
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
    certificate: true
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
    certificate: true
  },
  {
    id: "4",
    title: "Data Science with Python",
    instructor: "Dr. James Ochieng",
    description: "Learn data analysis, machine learning, and visualization with Python.",
    price: 20000,
    originalPrice: 30000,
    duration: "14 weeks",
    students: 420,
    rating: 4.9,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    modules: ["Python Basics", "Pandas", "NumPy", "Machine Learning", "Visualization"],
    skills: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Jupyter"],
    certificate: true
  },
  {
    id: "5",
    title: "Cloud Computing with AWS",
    instructor: "Michael Mutua",
    description: "Master Amazon Web Services and cloud architecture fundamentals.",
    price: 22000,
    originalPrice: 32000,
    duration: "8 weeks",
    students: 380,
    rating: 4.6,
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
    modules: ["AWS Basics", "EC2", "S3", "Lambda", "CloudFormation"],
    skills: ["AWS", "Cloud Architecture", "DevOps", "Serverless", "Security"],
    certificate: true
  },
  {
    id: "6",
    title: "Cybersecurity Fundamentals",
    instructor: "Mary Njeri",
    description: "Learn essential cybersecurity concepts and practical security implementation.",
    price: 16000,
    originalPrice: 24000,
    duration: "6 weeks",
    students: 290,
    rating: 4.8,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
    modules: ["Security Basics", "Network Security", "Cryptography", "Ethical Hacking", "Compliance"],
    skills: ["Network Security", "Penetration Testing", "Risk Assessment", "CISSP"],
    certificate: true
  }
];

const PaidCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<PaidCourse | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStep, setPaymentStep] = useState<"details" | "payment" | "processing">("details");
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

    // Simulate M-PESA STK Push
    toast({
      title: "M-PESA Payment Initiated",
      description: `Please check your phone (${phoneNumber}) for the M-PESA prompt to pay KES ${selectedCourse.price.toLocaleString()}.`,
    });

    // Simulate payment processing
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

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Premium Courses</h2>
        <p className="text-slate-300">Unlock advanced skills with our expert-led courses</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paidCourses.map((course) => (
          <Card key={course.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
            <CardHeader className="p-0">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6 pb-2">
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-purple-500/20 text-purple-400">
                    {course.level}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-slate-300 text-sm">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-white text-lg mb-1">{course.title}</CardTitle>
                <p className="text-slate-400 text-sm">by {course.instructor}</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-slate-300 text-sm line-clamp-2">{course.description}</p>
              
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Certificate included</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 font-bold text-lg">
                      KES {course.price.toLocaleString()}
                    </span>
                    {course.originalPrice && (
                      <span className="text-slate-500 line-through text-sm">
                        KES {course.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <Badge className="bg-red-500/20 text-red-400 text-xs">
                      Save KES {(course.originalPrice - course.price).toLocaleString()}
                    </Badge>
                  )}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => setSelectedCourse(course)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-slate-900 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">{course.title}</DialogTitle>
                    <DialogDescription className="text-slate-300">
                      by {course.instructor} • {course.duration} • {course.level}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Course Overview</h4>
                      <p className="text-slate-300">{course.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">What You'll Learn</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {course.modules.map((module, index) => (
                          <li key={index}>{module}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Skills You'll Gain</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} className="bg-blue-500/20 text-blue-400">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-700 pt-4">
                      <h4 className="font-semibold text-white mb-3">Payment Details</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Course Price:</span>
                          <span className="text-green-400 font-bold text-lg">
                            KES {course.price.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">M-PESA Phone Number</label>
                          <Input
                            type="tel"
                            placeholder="0712345678"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="bg-slate-800 border-slate-600 text-white"
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
                        
                        <p className="text-xs text-slate-400 text-center">
                          Secure payment powered by Safaricom M-PESA
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaidCourses;
