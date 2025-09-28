import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMpesaPayment } from "@/hooks/useMpesaPayment";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  BookOpen,
  Clock,
  Users,
  Play,
  Award,
  CircleCheck as CheckCircle,
  Target,
  Filter,
  Grid2x2 as Grid,
  List,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";

const allCourses = [
  {
    id: 1,
    title: "Full Stack MERN Development",
    description:
      "Master MongoDB, Express, React, and Node.js to build modern web applications from scratch. Learn industry best practices, authentication, deployment, and real-world project development.",
    image: "photo-1461749280684-dccba630e2f6",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: 1234,
    category: "Web Development",
    price: "Free",
    enrolled: true,
    progress: 85,
    modules: 24,
    projects: 6,
    instructor: "Sarah Johnson",
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "JWT",
      "REST APIs",
      "Authentication",
      "Deployment",
    ],
    featured: true,
    certificate: true,
    difficulty: 7,
    content: {
      overview:
        "This comprehensive course covers the complete MERN stack development process. You'll build real-world applications while learning modern development practices.",
      curriculum: [
        "React Fundamentals & Component Architecture",
        "State Management with Hooks & Context",
        "React Router & Navigation",
        "Node.js & Express Server Setup",
        "MongoDB Database Design & Queries",
        "RESTful API Development",
        "JWT Authentication & Security",
        "Frontend-Backend Integration",
        "Error Handling & Validation",
        "File Upload & Cloud Storage",
        "Testing with Jest & React Testing Library",
        "Deployment to Production",
      ],
      projects: [
        "E-commerce Platform",
        "Social Media Dashboard",
        "Task Management App",
        "Real-time Chat Application",
        "Blog CMS",
        "Portfolio Website",
      ],
      prerequisites: [
        "Basic JavaScript knowledge",
        "HTML/CSS fundamentals",
        "Git basics",
      ],
      outcomes: [
        "Build full-stack web applications",
        "Implement secure authentication",
        "Design and query databases",
        "Deploy applications to production",
        "Write clean, maintainable code",
      ],
    },
  },
  {
    id: 2,
    title: "Python for Data Science & Machine Learning",
    description:
      "Learn Python programming and advanced data analysis with pandas, numpy, scikit-learn, and TensorFlow. Master data visualization, statistical analysis, and build intelligent systems.",
    image: "photo-1498050108023-c5249f4df085",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.9,
    students: 2156,
    category: "Programming",
    price: "Free",
    enrolled: true,
    progress: 60,
    modules: 20,
    projects: 8,
    instructor: "Dr. Michael Chen",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Scikit-learn",
      "TensorFlow",
      "Data Visualization",
      "Statistics",
    ],
    featured: true,
    certificate: true,
    difficulty: 5,
    content: {
      overview:
        "Transform raw data into actionable insights! This course covers everything from Python basics to advanced machine learning algorithms and real-world data science projects.",
      curriculum: [
        "Python Fundamentals & Data Types",
        "Data Structures & Control Flow",
        "NumPy for Numerical Computing",
        "Pandas for Data Manipulation",
        "Data Visualization with Matplotlib & Seaborn",
        "Statistical Analysis & Hypothesis Testing",
        "Machine Learning with Scikit-learn",
        "Supervised Learning Algorithms",
        "Unsupervised Learning & Clustering",
        "Deep Learning with TensorFlow",
        "Model Evaluation & Hyperparameter Tuning",
        "Real-world Data Science Projects",
      ],
      projects: [
        "Customer Segmentation Analysis",
        "Stock Price Prediction Model",
        "Image Classification System",
        "Sentiment Analysis Tool",
        "Sales Forecasting Dashboard",
        "Recommendation Engine",
        "Fraud Detection System",
        "Natural Language Processing App",
      ],
      prerequisites: [
        "No prior experience required",
        "Basic math knowledge helpful",
      ],
      outcomes: [
        "Master Python for data science",
        "Analyze and visualize data effectively",
        "Build machine learning models",
        "Solve real-world data problems",
        "Present insights professionally",
      ],
    },
  },
  {
    id: 3,
    title: "Advanced React & TypeScript Mastery",
    description:
      "Deep dive into React hooks, context, performance optimization, and TypeScript integration. Build enterprise-grade applications with modern React patterns.",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Advanced",
    duration: "8 weeks",
    rating: 4.8,
    students: 987,
    category: "Web Development",
    price: 15000,
    enrolled: false,
    progress: 0,
    modules: 16,
    projects: 5,
    instructor: "Alex Rivera",
    skills: [
      "React 18",
      "TypeScript",
      "Redux Toolkit",
      "Testing Library",
      "Vite",
      "Performance",
      "Architecture",
    ],
    featured: true,
    certificate: true,
    difficulty: 8,
    premium: true,
    content: {
      overview:
        "Master advanced React patterns and TypeScript to build scalable, maintainable applications. Learn performance optimization, testing strategies, and enterprise architecture.",
      curriculum: [
        "TypeScript Fundamentals for React",
        "Advanced React Hooks & Custom Hooks",
        "Context API & State Management",
        "Performance Optimization Techniques",
        "React Testing with Jest & RTL",
        "Code Splitting & Lazy Loading",
        "Server-Side Rendering with Next.js",
        "Advanced Component Patterns",
        "Error Boundaries & Error Handling",
        "Accessibility in React",
        "Deployment & CI/CD",
        "Enterprise Architecture Patterns",
      ],
      projects: [
        "E-commerce Admin Dashboard",
        "Real-time Collaboration Tool",
        "Performance Monitoring App",
        "Component Library",
        "Micro-frontend Architecture",
      ],
      prerequisites: [
        "Intermediate React knowledge",
        "Basic TypeScript experience",
        "JavaScript ES6+",
      ],
      outcomes: [
        "Build enterprise-grade React applications",
        "Master TypeScript with React",
        "Optimize application performance",
        "Implement advanced testing strategies",
        "Design scalable component architecture",
      ],
    },
  },
  {
    id: 4,
    title: "Database Design & Management",
    description:
      "Master SQL, NoSQL, database optimization, and cloud database solutions",
    image: "photo-1487058792275-0ad4aaf24ca7",
    level: "Intermediate",
    duration: "6 weeks",
    rating: 4.6,
    students: 756,
    category: "Database",
    price: "Free",
    enrolled: true,
    progress: 40,
    modules: 12,
    projects: 4,
    instructor: "Jennifer Lopez",
    skills: [
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "Database Design",
      "Performance Tuning",
    ],
    featured: false,
    certificate: true,
    difficulty: 6,
  },
  {
    id: 5,
    title: "Blockchain Development with Solidity",
    description:
      "Build decentralized applications (DApps) and smart contracts on Ethereum blockchain",
    image: "photo-1639762681485-074b7f938ba0",
    level: "Advanced",
    duration: "10 weeks",
    rating: 4.9,
    students: 543,
    category: "Blockchain",
    price: "KES 25,000",
    enrolled: false,
    progress: 0,
    modules: 18,
    projects: 6,
    instructor: "Mark Thompson",
    skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi"],
    featured: true,
    certificate: true,
    difficulty: 9,
    premium: true,
  },
  {
    id: 6,
    title: "AI for Software Engineering",
    description:
      "Integrate AI tools like GitHub Copilot, ChatGPT, and automate your development workflow",
    image: "photo-1649972904349-6e44c42644a7",
    level: "Advanced",
    duration: "14 weeks",
    rating: 4.9,
    students: 1876,
    category: "AI/ML",
    price: "Free",
    enrolled: true,
    progress: 25,
    modules: 28,
    projects: 10,
    instructor: "Dr. Emily Watson",
    skills: [
      "GitHub Copilot",
      "OpenAI API",
      "Prompt Engineering",
      "AI Automation",
    ],
    featured: true,
    certificate: true,
    difficulty: 9,
  },
  {
    id: 7,
    title: "Flutter Mobile App Development",
    description:
      "Build cross-platform mobile apps for iOS and Android with Flutter and Dart",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    students: 892,
    category: "Mobile Development",
    price: "KES 18,000",
    enrolled: false,
    progress: 0,
    modules: 22,
    projects: 7,
    instructor: "Carlos Rodriguez",
    skills: [
      "Flutter",
      "Dart",
      "Firebase",
      "Native Modules",
      "App Store Deployment",
    ],
    featured: false,
    certificate: true,
    difficulty: 7,
    premium: true,
  },
  {
    id: 8,
    title: "Cybersecurity & Ethical Hacking",
    description:
      "Learn penetration testing, network security, and ethical hacking techniques",
    image: "photo-1488590528505-98d2b5aba04b",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.8,
    students: 1456,
    category: "Cybersecurity",
    price: "KES 22,000",
    enrolled: false,
    progress: 0,
    modules: 24,
    projects: 8,
    instructor: "David Kim",
    skills: [
      "Penetration Testing",
      "Kali Linux",
      "Network Security",
      "OSINT",
      "Metasploit",
    ],
    featured: true,
    certificate: true,
    difficulty: 9,
    premium: true,
  },
  {
    id: 9,
    title: "Digital Marketing & SEO Mastery",
    description:
      "Master digital marketing strategies, SEO, social media marketing, and analytics",
    image: "photo-1460925895917-afdab827c52f",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.6,
    students: 634,
    category: "Marketing",
    price: "KES 12,000",
    enrolled: false,
    progress: 0,
    modules: 16,
    projects: 6,
    instructor: "Maria Santos",
    skills: [
      "SEO",
      "Google Analytics",
      "Facebook Ads",
      "Content Marketing",
      "Email Marketing",
    ],
    featured: false,
    certificate: true,
    difficulty: 4,
    premium: true,
  },
  {
    id: 10,
    title: "Cloud Computing with AWS",
    description:
      "Master Amazon Web Services including EC2, S3, Lambda, and deploy scalable applications",
    image: "photo-1487058792275-0ad4aaf24ca7",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.8,
    students: 1123,
    category: "Cloud Computing",
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 26,
    projects: 9,
    instructor: "James Wilson",
    skills: ["AWS", "EC2", "S3", "Lambda", "CloudFormation", "DevOps"],
    featured: true,
    certificate: true,
    difficulty: 9,
  },
  {
    id: 11,
    title: "Game Development with Unity",
    description: "Create 2D and 3D games using Unity engine and C# programming",
    image: "photo-1511512578047-dfb367046420",
    level: "Intermediate",
    duration: "14 weeks",
    rating: 4.7,
    students: 789,
    category: "Game Development",
    price: "KES 20,000",
    enrolled: false,
    progress: 0,
    modules: 28,
    projects: 8,
    instructor: "Lisa Anderson",
    skills: [
      "Unity",
      "C#",
      "3D Modeling",
      "Game Physics",
      "Mobile Game Development",
    ],
    featured: false,
    certificate: true,
    difficulty: 7,
    premium: true,
  },
  {
    id: 12,
    title: "DevOps & CI/CD Pipeline",
    description:
      "Master DevOps practices, Docker, Kubernetes, Jenkins, and automated deployment pipelines",
    image: "photo-1486312338219-ce68d2c6f44d",
    level: "Advanced",
    duration: "11 weeks",
    rating: 4.9,
    students: 567,
    category: "DevOps",
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 24,
    projects: 8,
    instructor: "Robert Chen",
    skills: ["Docker", "Kubernetes", "Jenkins", "Git", "AWS", "Monitoring"],
    featured: false,
    certificate: true,
    difficulty: 9,
  },
  {
    id: 13,
    title: "UI/UX Design with Figma",
    description:
      "Design beautiful user interfaces and experiences using Figma and design thinking principles",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.5,
    students: 892,
    category: "Design",
    price: "KES 10,000",
    enrolled: false,
    progress: 0,
    modules: 14,
    projects: 5,
    instructor: "Sophie Williams",
    skills: [
      "Figma",
      "Design Systems",
      "Prototyping",
      "User Research",
      "Adobe XD",
    ],
    featured: false,
    certificate: true,
    difficulty: 4,
    premium: true,
  },
  {
    id: 14,
    title: "iOS App Development with Swift",
    description:
      "Build native iOS applications using Swift and Xcode with modern iOS features",
    image: "photo-1512941937669-90a1b58e7e9c",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: 445,
    category: "Mobile Development",
    price: "KES 24,000",
    enrolled: false,
    progress: 0,
    modules: 26,
    projects: 6,
    instructor: "Ahmed Hassan",
    skills: ["Swift", "Xcode", "Core Data", "SwiftUI", "App Store Connect"],
    featured: true,
    certificate: true,
    difficulty: 8,
    premium: true,
  },
  {
    id: 15,
    title: "Data Analytics with Power BI",
    description:
      "Transform data into insights using Microsoft Power BI, DAX, and advanced analytics",
    image: "photo-1551288049-bebda4e38f71",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.6,
    students: 623,
    category: "Data Science",
    price: "KES 16,000",
    enrolled: false,
    progress: 0,
    modules: 18,
    projects: 7,
    instructor: "Grace Mutua",
    skills: ["Power BI", "DAX", "Power Query", "Excel", "SQL Server"],
    featured: false,
    certificate: true,
    difficulty: 6,
    premium: true,
  },
  {
    id: 16,
    title: "E-commerce with Shopify",
    description:
      "Build and manage successful online stores using Shopify platform and dropshipping",
    image: "photo-1556742049-0cfed4f6a45d",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.4,
    students: 534,
    category: "E-commerce",
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 12,
    projects: 4,
    instructor: "John Kamau",
    skills: [
      "Shopify",
      "Dropshipping",
      "Product Research",
      "Facebook Ads",
      "Customer Service",
    ],
    featured: false,
    certificate: true,
    difficulty: 3,
  },
  {
    id: 17,
    title: "Artificial Intelligence with Python",
    description:
      "Build AI applications using TensorFlow, PyTorch, and deep learning algorithms",
    image: "photo-1555255707-c07966088b7b",
    level: "Advanced",
    duration: "16 weeks",
    rating: 4.9,
    students: 234,
    category: "AI/ML",
    price: "KES 30,000",
    enrolled: false,
    progress: 0,
    modules: 32,
    projects: 12,
    instructor: "Dr. Peter Wanjiku",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Deep Learning",
      "Computer Vision",
      "NLP",
    ],
    featured: true,
    certificate: true,
    difficulty: 10,
    premium: true,
  },
  {
    id: 18,
    title: "Graphic Design Mastery",
    description:
      "Create stunning graphics using Adobe Creative Suite, typography, and brand design",
    image: "photo-1581090464777-f3220bbe1b8b",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.5,
    students: 678,
    category: "Design",
    price: "KES 14,000",
    enrolled: false,
    progress: 0,
    modules: 20,
    projects: 8,
    instructor: "Faith Njeri",
    skills: [
      "Photoshop",
      "Illustrator",
      "InDesign",
      "Typography",
      "Brand Design",
    ],
    featured: false,
    certificate: true,
    difficulty: 5,
    premium: true,
  },
];

const categories = [
  "All",
  "Web Development",
  "Programming",
  "Design",
  "Database",
  "Blockchain",
  "AI/ML",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Marketing",
  "Game Development",
  "Data Science",
  "E-commerce",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const sortOptions = ["Popular", "Rating", "Newest", "Duration", "Price"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Payment states
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof allCourses)[0] | null
  >(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStep, setPaymentStep] = useState<
    "details" | "payment" | "processing"
  >("details");
  const { toast } = useToast();
  const { initiatePayment, isProcessing } = useMpesaPayment();
  const { user } = useAuth();

  // Payment handling functions
  const handleCourseEnrollment = async (course: (typeof allCourses)[0]) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to enroll in courses.",
        variant: "destructive",
      });
      return;
    }

    if (course.price === "Free" || course.price === 0) {
      // Free course - enroll directly
      toast({
        title: "Enrolled Successfully!",
        description: `You've been enrolled in ${course.title}`,
      });
      return;
    }

    // Paid course - show payment dialog
    setSelectedCourse(course);
    setPaymentStep("details");
  };

  const handlePayment = async () => {
    if (!selectedCourse || !user) return;

    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your M-PESA phone number to proceed.",
        variant: "destructive",
      });
      return;
    }

    setPaymentStep("processing");

    const result = await initiatePayment({
      amount:
        typeof selectedCourse.price === "number" ? selectedCourse.price : 0,
      phoneNumber,
      paymentType: "course_enrollment",
      referenceId: selectedCourse.id.toString(),
    });

    if (result) {
      // Start polling for payment status
      pollPaymentStatus(result.paymentId);
    } else {
      setPaymentStep("details");
    }
  };

  const pollPaymentStatus = async (paymentId: string) => {
    // Simulate payment polling - in real app, this would check payment status
    setTimeout(() => {
      setPaymentStep("details");
      setSelectedCourse(null);
      setPhoneNumber("");
      toast({
        title: "Payment Successful!",
        description: `You've been enrolled in ${selectedCourse?.title}`,
      });
    }, 3000);
  };

  // Memoize filtered and sorted courses for better performance
  const filteredCourses = useMemo(() => {
    setIsLoading(true);

    const filtered = allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      const matchesFeatured = !showFeaturedOnly || course.featured;
      const matchesFree = !showFreeOnly || course.price === "Free";

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesFeatured &&
        matchesFree
      );
    });

    // Sort courses
    const sorted = [...filtered];
    switch (sortBy) {
      case "Rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "Duration":
        sorted.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case "Newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "Price":
        sorted.sort((a, b) => {
          const priceA =
            a.price === "Free" || a.price === 0
              ? 0
              : typeof a.price === "number"
              ? a.price
              : parseInt(a.price.toString().replace(/[^\d]/g, ""));
          const priceB =
            b.price === "Free" || b.price === 0
              ? 0
              : typeof b.price === "number"
              ? b.price
              : parseInt(b.price.toString().replace(/[^\d]/g, ""));
          return priceA - priceB;
        });
        break;
      default: // Popular
        sorted.sort((a, b) => b.students - a.students);
    }

    // Simulate brief loading state for better UX
    setTimeout(() => setIsLoading(false), 100);

    return sorted;
  }, [
    searchTerm,
    selectedCategory,
    selectedLevel,
    sortBy,
    showFeaturedOnly,
    showFreeOnly,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Discover Courses
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            Master new skills with our comprehensive learning programs
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Free Courses Available
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              Premium Content
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              Industry Certificates
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search courses, skills, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-4">
                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={
                    showFeaturedOnly
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }
                >
                  <Star className="h-4 w-4 mr-2" />
                  Featured Only
                </Button>

                <Button
                  variant={showFreeOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFreeOnly(!showFreeOnly)}
                  className={
                    showFreeOnly
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }
                >
                  Free Courses
                </Button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-700">View:</span>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-slate-700">
                  Showing {filteredCourses.length} of {allCourses.length}{" "}
                  courses
                  {(searchTerm ||
                    selectedCategory !== "All" ||
                    selectedLevel !== "All" ||
                    showFeaturedOnly ||
                    showFreeOnly) && (
                    <span className="ml-2 text-blue-600">(filtered)</span>
                  )}
                </p>

                {/* Active Filters */}
                {(searchTerm ||
                  selectedCategory !== "All" ||
                  selectedLevel !== "All" ||
                  showFeaturedOnly ||
                  showFreeOnly) && (
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <Badge variant="secondary" className="text-xs">
                        Search: {searchTerm}
                      </Badge>
                    )}
                    {selectedCategory !== "All" && (
                      <Badge variant="secondary" className="text-xs">
                        Category: {selectedCategory}
                      </Badge>
                    )}
                    {selectedLevel !== "All" && (
                      <Badge variant="secondary" className="text-xs">
                        Level: {selectedLevel}
                      </Badge>
                    )}
                    {showFeaturedOnly && (
                      <Badge variant="secondary" className="text-xs">
                        Featured only
                      </Badge>
                    )}
                    {showFreeOnly && (
                      <Badge variant="secondary" className="text-xs">
                        Free only
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid/List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-600">Loading courses...</span>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className={`bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                  viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                }`}
              >
                {/* Course Image */}
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "sm:w-48 h-48 sm:h-auto" : "h-48"
                  } bg-gradient-to-br from-blue-600 to-blue-700 rounded-t-lg ${
                    viewMode === "list"
                      ? "sm:rounded-l-lg sm:rounded-t-none"
                      : ""
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-white opacity-80" />
                  </div>
                  {course.featured && (
                    <Badge className="absolute top-2 left-2 bg-amber-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {course.premium && (
                    <Badge className="absolute top-2 right-2 bg-purple-500 text-white">
                      <CreditCard className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  {course.enrolled && (
                    <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      {course.progress}%
                    </div>
                  )}
                </div>

                <div className={`flex-1 ${viewMode === "list" ? "p-6" : ""}`}>
                  <CardHeader className={viewMode === "list" ? "p-0 pb-4" : ""}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-slate-900 group-hover:text-blue-700 transition-colors">
                          {course.title}
                        </CardTitle>
                        <p className="text-slate-600 text-sm mt-1">
                          by {course.instructor}
                        </p>
                      </div>
                      <Badge className="bg-slate-100 text-slate-700 ml-2">
                        {course.level}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-600 mt-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent
                    className={`space-y-4 ${viewMode === "list" ? "p-0" : ""}`}
                  >
                    {/* Course Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                      <div className="flex items-center text-slate-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Star className="h-4 w-4 mr-1 text-blue-500" />
                        {course.rating}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Target className="h-4 w-4 mr-1" />
                        {course.difficulty}/10
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-lg ${
                            course.price === "Free"
                              ? "text-green-600"
                              : "text-purple-600"
                          }`}
                        >
                          {course.price}
                        </span>
                        {course.premium && course.price !== "Free" && (
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Course Progress (if enrolled) */}
                    {course.enrolled && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="text-slate-900 font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 4).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-slate-300 text-slate-700 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 4 && (
                        <Badge
                          variant="outline"
                          className="border-slate-300 text-slate-700 text-xs"
                        >
                          +{course.skills.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Course Features */}
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {course.modules} modules
                        </span>
                        <span className="flex items-center">
                          <Play className="h-4 w-4 mr-1" />
                          {course.projects} projects
                        </span>
                      </div>
                      {course.certificate && (
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-blue-500" />
                          <span>Certificate</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    {course.enrolled ? (
                      <Link to={`/course/${course.id}`}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group-hover:shadow-lg transition-all">
                          <Play className="h-4 w-4 mr-2" />
                          Continue Learning
                        </Button>
                      </Link>
                    ) : course.price === "Free" || course.price === 0 ? (
                      <Button
                        onClick={() => handleCourseEnrollment(course)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group-hover:shadow-lg transition-all"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Course
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleCourseEnrollment(course)}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 group-hover:shadow-lg transition-all"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Enroll Now - KES {course.price.toLocaleString()}
                      </Button>
                    )}
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredCourses.length === 0 && (
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No courses found
              </h3>
              <p className="text-slate-600 mb-4">
                {searchTerm
                  ? `No courses found matching "${searchTerm}". `
                  : ""}
                Try adjusting your search criteria or browse our featured
                courses.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedLevel("All");
                  setShowFeaturedOnly(false);
                  setShowFreeOnly(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Course Statistics */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Transform Your Career Today
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-3xl font-bold">{allCourses.length}+</div>
                <div className="text-blue-100">Courses Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {allCourses.filter((c) => c.price === "Free").length}
                </div>
                <div className="text-blue-100">Free Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {allCourses.filter((c) => c.premium).length}
                </div>
                <div className="text-blue-100">Premium Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold">15+</div>
                <div className="text-blue-100">Categories</div>
              </div>
            </div>
            <p className="text-blue-100 mb-6 text-lg">
              Join thousands of learners advancing their careers
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning Today
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog
          open={!!selectedCourse}
          onOpenChange={() => setSelectedCourse(null)}
        >
          <DialogContent className="max-w-2xl bg-white border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-slate-900">
                {selectedCourse?.title}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                by {selectedCourse?.instructor} • {selectedCourse?.duration} •{" "}
                {selectedCourse?.level}
              </DialogDescription>
            </DialogHeader>

            {selectedCourse && (
              <div className="space-y-6">
                {/* Course Overview */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Course Overview
                  </h4>
                  <p className="text-slate-600 text-sm mb-3">
                    {selectedCourse.content?.overview ||
                      selectedCourse.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">
                        Duration:
                      </span>
                      <span className="text-slate-600 ml-2">
                        {selectedCourse.duration}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Modules:
                      </span>
                      <span className="text-slate-600 ml-2">
                        {selectedCourse.modules}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Projects:
                      </span>
                      <span className="text-slate-600 ml-2">
                        {selectedCourse.projects}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Certificate:
                      </span>
                      <span className="text-slate-600 ml-2">
                        {selectedCourse.certificate ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold text-2xl">
                          KES {selectedCourse.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm">
                        One-time payment • Lifetime access
                      </p>
                    </div>
                  </div>

                  {paymentStep === "details" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="phone" className="text-slate-900">
                          M-PESA Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="07XXXXXXXX or +254XXXXXXXXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Enter your M-PESA registered phone number
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handlePayment}
                          disabled={!phoneNumber || isProcessing}
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay with M-PESA
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedCourse(null)}
                          className="px-6"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {paymentStep === "processing" && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">
                        Processing Payment
                      </h4>
                      <p className="text-slate-600 mb-4">
                        Please check your phone for the M-PESA prompt and enter
                        your PIN to complete the payment.
                      </p>
                      <p className="text-sm text-slate-500">
                        Amount: KES {selectedCourse.price.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Courses;
