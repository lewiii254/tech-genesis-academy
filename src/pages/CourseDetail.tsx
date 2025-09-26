import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Star, CheckCircle, BookOpenCheck, StickyNote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NotesPanel from "@/components/NotesPanel";
import { useGameification } from "@/hooks/useGameification";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  rating: number;
  students: number;
  category: string;
  modules: Array<{ id: number; title: string }>;
}

interface ModuleState {
  started: boolean;
  completed: boolean;
}

const courseData: Course[] = [
  {
    id: 1,
    title: "Full Stack MERN Development",
    description: "Master MongoDB, Express, React, and Node.js to build modern web applications from scratch",
    image: "photo-1461749280684-dccba630e2f6",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: 1234,
    category: "Web Development",
    modules: [
      { id: 1, title: "React Fundamentals & JSX" },
      { id: 2, title: "State Management & Hooks" },
      { id: 3, title: "React Router & Navigation" },
      { id: 4, title: "Node.js & Express Setup" },
      { id: 5, title: "MongoDB Database Design" },
      { id: 6, title: "Building REST APIs" },
      { id: 7, title: "Authentication & JWT" },
      { id: 8, title: "Frontend-Backend Integration" },
      { id: 9, title: "Error Handling & Validation" },
      { id: 10, title: "File Upload & Cloud Storage" },
      { id: 11, title: "Testing & Deployment" },
      { id: 12, title: "Production Optimization" }
    ]
  },
  {
    id: 2,
    title: "Python for Data Science & Machine Learning",
    description: "Learn Python programming and advanced data analysis with pandas, numpy, scikit-learn, and TensorFlow",
    image: "photo-1498050108023-c5249f4df085",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.9,
    students: 2156,
    category: "Programming",
    modules: [
      { id: 13, title: "Python Basics & Syntax" },
      { id: 14, title: "Data Structures & Control Flow" },
      { id: 15, title: "NumPy for Numerical Computing" },
      { id: 16, title: "Pandas for Data Manipulation" },
      { id: 17, title: "Data Visualization with Matplotlib" },
      { id: 18, title: "Seaborn & Advanced Plotting" },
      { id: 19, title: "Statistical Analysis" },
      { id: 20, title: "Machine Learning with Scikit-learn" },
      { id: 21, title: "Model Evaluation & Tuning" },
      { id: 22, title: "Real-world Data Projects" }
    ]
  },
  {
    id: 3,
    title: "Advanced React & TypeScript Mastery",
    description: "Deep dive into React hooks, context, performance optimization, and TypeScript integration",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Advanced",
    duration: "8 weeks",
    rating: 4.8,
    students: 987,
    category: "Web Development",
    modules: [
      { id: 23, title: "TypeScript Fundamentals" },
      { id: 24, title: "Advanced React Hooks" },
      { id: 25, title: "Context API & State Management" },
      { id: 26, title: "Performance Optimization" },
      { id: 27, title: "Testing with React Testing Library" },
      { id: 28, title: "Custom Hooks Development" },
      { id: 29, title: "SSR & Next.js Integration" },
      { id: 30, title: "Production Best Practices" }
    ]
  },
  {
    id: 4,
    title: "Database Design & Management",
    description: "Master SQL, NoSQL, database optimization, and cloud database solutions",
    image: "photo-1487058792275-0ad4aaf24ca7",
    level: "Intermediate",
    duration: "6 weeks",
    rating: 4.6,
    students: 756,
    category: "Database",
    modules: [
      { id: 31, title: "Database Design Principles" },
      { id: 32, title: "SQL Fundamentals" },
      { id: 33, title: "Advanced SQL Queries" },
      { id: 34, title: "Database Normalization" },
      { id: 35, title: "PostgreSQL Administration" },
      { id: 36, title: "MongoDB & NoSQL" },
      { id: 37, title: "Database Performance Tuning" },
      { id: 38, title: "Backup & Recovery" },
      { id: 39, title: "Cloud Database Solutions" },
      { id: 40, title: "Security Best Practices" },
      { id: 41, title: "Database Migration" },
      { id: 42, title: "Monitoring & Maintenance" }
    ]
  },
  {
    id: 5,
    title: "Blockchain Development with Solidity",
    description: "Build decentralized applications (DApps) and smart contracts on Ethereum blockchain",
    image: "photo-1639762681485-074b7f938ba0",
    level: "Advanced",
    duration: "10 weeks",
    rating: 4.9,
    students: 543,
    category: "Blockchain",
    modules: [
      { id: 43, title: "Blockchain Fundamentals" },
      { id: 44, title: "Ethereum Ecosystem" },
      { id: 45, title: "Solidity Programming" },
      { id: 46, title: "Smart Contract Development" },
      { id: 47, title: "Web3.js Integration" },
      { id: 48, title: "DeFi Protocols" },
      { id: 49, title: "NFT Development" },
      { id: 50, title: "Testing Smart Contracts" },
      { id: 51, title: "Gas Optimization" },
      { id: 52, title: "Security Auditing" },
      { id: 53, title: "DApp Frontend" },
      { id: 54, title: "Deployment & Mainnet" }
    ]
  },
  {
    id: 6,
    title: "AI for Software Engineering",
    description: "Integrate AI tools like GitHub Copilot, ChatGPT, and automate your development workflow",
    image: "photo-1649972904349-6e44c42644a7",
    level: "Advanced",
    duration: "14 weeks",
    rating: 4.9,
    students: 1876,
    category: "AI/ML",
    modules: [
      { id: 55, title: "AI in Software Development" },
      { id: 56, title: "GitHub Copilot Mastery" },
      { id: 57, title: "Prompt Engineering" },
      { id: 58, title: "Code Generation & Review" },
      { id: 59, title: "AI-Powered Testing" },
      { id: 60, title: "Documentation Automation" },
      { id: 61, title: "Bug Detection & Fixing" },
      { id: 62, title: "Code Refactoring" },
      { id: 63, title: "API Integration" },
      { id: 64, title: "Workflow Automation" },
      { id: 65, title: "Custom AI Tools" },
      { id: 66, title: "Team Collaboration" },
      { id: 67, title: "Ethics & Best Practices" },
      { id: 68, title: "Future of AI Development" }
    ]
  },
  {
    id: 7,
    title: "Flutter Mobile App Development",
    description: "Build cross-platform mobile apps for iOS and Android with Flutter and Dart",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    students: 892,
    category: "Mobile Development",
    modules: [
      { id: 69, title: "Flutter & Dart Fundamentals" },
      { id: 70, title: "Widget System & Layouts" },
      { id: 71, title: "State Management" },
      { id: 72, title: "Navigation & Routing" },
      { id: 73, title: "HTTP Requests & APIs" },
      { id: 74, title: "Local Data Storage" },
      { id: 75, title: "Firebase Integration" },
      { id: 76, title: "Push Notifications" },
      { id: 77, title: "Native Device Features" },
      { id: 78, title: "Testing & Debugging" },
      { id: 79, title: "App Store Deployment" },
      { id: 80, title: "Performance Optimization" }
    ]
  },
  {
    id: 8,
    title: "Cybersecurity & Ethical Hacking",
    description: "Learn penetration testing, network security, and ethical hacking techniques",
    image: "photo-1488590528505-98d2b5aba04b",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.8,
    students: 1456,
    category: "Cybersecurity",
    modules: [
      { id: 81, title: "Cybersecurity Fundamentals" },
      { id: 82, title: "Network Security Basics" },
      { id: 83, title: "Linux & Kali Tools" },
      { id: 84, title: "Reconnaissance & OSINT" },
      { id: 85, title: "Vulnerability Assessment" },
      { id: 86, title: "Penetration Testing" },
      { id: 87, title: "Web Application Security" },
      { id: 88, title: "Wireless Security" },
      { id: 89, title: "Malware Analysis" },
      { id: 90, title: "Incident Response" },
      { id: 91, title: "Risk Assessment" },
      { id: 92, title: "Compliance & Governance" }
    ]
  },
  {
    id: 9,
    title: "Digital Marketing & SEO Mastery",
    description: "Master digital marketing strategies, SEO, social media marketing, and analytics",
    image: "photo-1460925895917-afdab827c52f",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.6,
    students: 634,
    category: "Marketing",
    modules: [
      { id: 93, title: "Digital Marketing Fundamentals" },
      { id: 94, title: "SEO Basics & Keywords" },
      { id: 95, title: "Content Marketing Strategy" },
      { id: 96, title: "Social Media Marketing" },
      { id: 97, title: "Google Ads & PPC" },
      { id: 98, title: "Facebook & Instagram Ads" },
      { id: 99, title: "Email Marketing" },
      { id: 100, title: "Analytics & Tracking" },
      { id: 101, title: "Conversion Optimization" },
      { id: 102, title: "Marketing Automation" },
      { id: 103, title: "Influencer Marketing" },
      { id: 104, title: "ROI & Performance Metrics" }
    ]
  },
  {
    id: 10,
    title: "Cloud Computing with AWS",
    description: "Master Amazon Web Services including EC2, S3, Lambda, and deploy scalable applications",
    image: "photo-1487058792275-0ad4aaf24ca7",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.8,
    students: 1123,
    category: "Cloud Computing",
    modules: [
      { id: 105, title: "AWS Cloud Fundamentals" },
      { id: 106, title: "EC2 & Virtual Machines" },
      { id: 107, title: "S3 Storage Solutions" },
      { id: 108, title: "VPC & Networking" },
      { id: 109, title: "Lambda & Serverless" },
      { id: 110, title: "RDS & Database Services" },
      { id: 111, title: "Load Balancing & Auto Scaling" },
      { id: 112, title: "CloudFormation" },
      { id: 113, title: "Security & IAM" },
      { id: 114, title: "Monitoring & CloudWatch" },
      { id: 115, title: "DevOps Integration" },
      { id: 116, title: "Cost Optimization" }
    ]
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
    modules: [
      { id: 117, title: "Unity Interface & Basics" },
      { id: 118, title: "C# Programming for Games" },
      { id: 119, title: "Game Objects & Components" },
      { id: 120, title: "2D Game Development" },
      { id: 121, title: "3D Game Development" },
      { id: 122, title: "Physics & Collision" },
      { id: 123, title: "Animation & Timeline" },
      { id: 124, title: "Audio & Sound Effects" },
      { id: 125, title: "UI & Menu Systems" },
      { id: 126, title: "Player Input & Controls" },
      { id: 127, title: "Game AI & NPCs" },
      { id: 128, title: "Performance Optimization" },
      { id: 129, title: "Mobile Game Development" },
      { id: 130, title: "Publishing & Distribution" }
    ]
  },
  {
    id: 12,
    title: "DevOps & CI/CD Pipeline",
    description: "Master DevOps practices, Docker, Kubernetes, Jenkins, and automated deployment pipelines",
    image: "photo-1486312338219-ce68d2c6f44d",
    level: "Advanced",
    duration: "11 weeks",
    rating: 4.9,
    students: 567,
    category: "DevOps",
    modules: [
      { id: 131, title: "DevOps Fundamentals" },
      { id: 132, title: "Version Control with Git" },
      { id: 133, title: "Docker Containerization" },
      { id: 134, title: "Kubernetes Orchestration" },
      { id: 135, title: "Jenkins CI/CD" },
      { id: 136, title: "Infrastructure as Code" },
      { id: 137, title: "Monitoring & Logging" },
      { id: 138, title: "Security in DevOps" },
      { id: 139, title: "Cloud Deployment" },
      { id: 140, title: "Automation Scripts" },
      { id: 141, title: "Performance Testing" },
      { id: 142, title: "Disaster Recovery" }
    ]
  },
  {
    id: 13,
    title: "UI/UX Design with Figma",
    description: "Design beautiful user interfaces and experiences using Figma and design thinking principles",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.5,
    students: 892,
    category: "Design",
    modules: [
      { id: 143, title: "Design Thinking Process" },
      { id: 144, title: "Figma Interface & Tools" },
      { id: 145, title: "Typography & Color Theory" },
      { id: 146, title: "Layout & Grid Systems" },
      { id: 147, title: "User Research Methods" },
      { id: 148, title: "Wireframing & Prototyping" },
      { id: 149, title: "User Testing" },
      { id: 150, title: "Design Systems" },
      { id: 151, title: "Mobile Design Patterns" },
      { id: 152, title: "Accessibility Design" },
      { id: 153, title: "Portfolio Development" },
      { id: 154, title: "Client Presentation" }
    ]
  },
  {
    id: 14,
    title: "iOS App Development with Swift",
    description: "Build native iOS applications using Swift and Xcode with modern iOS features",
    image: "photo-1512941937669-90a1b58e7e9c",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: 445,
    category: "Mobile Development",
    modules: [
      { id: 155, title: "Swift Programming Fundamentals" },
      { id: 156, title: "Xcode & Interface Builder" },
      { id: 157, title: "UIKit & View Controllers" },
      { id: 158, title: "Auto Layout & Constraints" },
      { id: 159, title: "Navigation & Tab Controllers" },
      { id: 160, title: "Table & Collection Views" },
      { id: 161, title: "Core Data & Persistence" },
      { id: 162, title: "Networking & APIs" },
      { id: 163, title: "SwiftUI Modern Development" },
      { id: 164, title: "Push Notifications" },
      { id: 165, title: "App Store Guidelines" },
      { id: 166, title: "Testing & Deployment" }
    ]
  },
  {
    id: 15,
    title: "Data Analytics with Power BI",
    description: "Transform data into insights using Microsoft Power BI, DAX, and advanced analytics",
    image: "photo-1551288049-bebda4e38f71",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.6,
    students: 623,
    category: "Data Science",
    modules: [
      { id: 167, title: "Power BI Fundamentals" },
      { id: 168, title: "Data Sources & Connections" },
      { id: 169, title: "Data Modeling" },
      { id: 170, title: "DAX Functions" },
      { id: 171, title: "Visualizations & Charts" },
      { id: 172, title: "Interactive Dashboards" },
      { id: 173, title: "Power Query Transformations" },
      { id: 174, title: "Advanced Analytics" },
      { id: 175, title: "Report Publishing" },
      { id: 176, title: "Mobile Optimization" },
      { id: 177, title: "Security & Sharing" },
      { id: 178, title: "Real-world Projects" }
    ]
  },
  {
    id: 16,
    title: "E-commerce with Shopify",
    description: "Build and manage successful online stores using Shopify platform and dropshipping",
    image: "photo-1556742049-0cfed4f6a45d",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.4,
    students: 534,
    category: "E-commerce",
    modules: [
      { id: 179, title: "E-commerce Fundamentals" },
      { id: 180, title: "Shopify Store Setup" },
      { id: 181, title: "Product Management" },
      { id: 182, title: "Theme Customization" },
      { id: 183, title: "Payment Processing" },
      { id: 184, title: "Shipping & Fulfillment" },
      { id: 185, title: "Dropshipping Strategy" },
      { id: 186, title: "Marketing & SEO" },
      { id: 187, title: "Customer Service" },
      { id: 188, title: "Analytics & Reporting" },
      { id: 189, title: "Scaling Your Business" },
      { id: 190, title: "Legal & Compliance" }
    ]
  },
  {
    id: 17,
    title: "Artificial Intelligence with Python",
    description: "Build AI applications using TensorFlow, PyTorch, and deep learning algorithms",
    image: "photo-1555255707-c07966088b7b",
    level: "Advanced",
    duration: "16 weeks",
    rating: 4.9,
    students: 234,
    category: "AI/ML",
    modules: [
      { id: 191, title: "AI & Machine Learning Overview" },
      { id: 192, title: "Python for AI Development" },
      { id: 193, title: "NumPy & Scientific Computing" },
      { id: 194, title: "Introduction to TensorFlow" },
      { id: 195, title: "Neural Networks Fundamentals" },
      { id: 196, title: "Deep Learning Concepts" },
      { id: 197, title: "Convolutional Neural Networks" },
      { id: 198, title: "Recurrent Neural Networks" },
      { id: 199, title: "Natural Language Processing" },
      { id: 200, title: "Computer Vision" },
      { id: 201, title: "PyTorch Framework" },
      { id: 202, title: "Model Training & Optimization" },
      { id: 203, title: "Model Deployment" },
      { id: 204, title: "AI Ethics & Bias" },
      { id: 205, title: "Real-world AI Projects" },
      { id: 206, title: "Future of AI" }
    ]
  },
  {
    id: 18,
    title: "Graphic Design Mastery",
    description: "Create stunning graphics using Adobe Creative Suite, typography, and brand design",
    image: "photo-1581090464777-f3220bbe1b8b",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.5,
    students: 678,
    category: "Design",
    modules: [
      { id: 207, title: "Design Fundamentals" },
      { id: 208, title: "Adobe Photoshop Basics" },
      { id: 209, title: "Adobe Illustrator Essentials" },
      { id: 210, title: "Adobe InDesign Layout" },
      { id: 211, title: "Typography & Fonts" },
      { id: 212, title: "Color Theory & Palettes" },
      { id: 213, title: "Logo Design Process" },
      { id: 214, title: "Brand Identity Creation" },
      { id: 215, title: "Print Design" },
      { id: 216, title: "Digital Design" },
      { id: 217, title: "Portfolio Development" },
      { id: 218, title: "Client Work & Freelancing" }
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const courseId = parseInt(id || "1");
  const { addPoints } = useGameification();

  const { toast } = useToast();
  const [enrollment, setEnrollment] = useState<{ enrolled: boolean; enrolledAt: string | null }>({
    enrolled: false,
    enrolledAt: null,
  });
  const [moduleStates, setModuleStates] = useState<{ [moduleId: number]: ModuleState }>({});

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  useEffect(() => {
    // Load enrollment status from local storage
    const storedEnrollment = localStorage.getItem(`enrollment-${courseId}`);
    if (storedEnrollment) {
      setEnrollment(JSON.parse(storedEnrollment));
    }

    // Load module states from local storage
    const storedModuleStates = localStorage.getItem(`moduleStates-${courseId}`);
    if (storedModuleStates) {
      setModuleStates(JSON.parse(storedModuleStates));
    }
  }, [courseId]);

  useEffect(() => {
    // Save enrollment status to local storage
    localStorage.setItem(`enrollment-${courseId}`, JSON.stringify(enrollment));

    // Save module states to local storage
    localStorage.setItem(`moduleStates-${courseId}`, JSON.stringify(moduleStates));
  }, [courseId, enrollment, moduleStates]);

  const calculateCourseProgress = () => {
    const totalModules = courseData.find(course => course.id === courseId)?.modules.length || 0;
    const completedModules = Object.values(moduleStates).filter(state => state.completed).length;
    return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  };

  const handleStartModule = (moduleId: number) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], started: true }
    }));
    addPoints(5); // 5 points for starting a module
    toast({
      title: "Module Started!",
      description: "You've started this module. Keep going!",
    });
  };

  const handleCompleteModule = (moduleId: number) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleId]: { completed: true, started: true }
    }));
    addPoints(25); // 25 points for completing a module
    toast({
      title: "Module Completed!",
      description: "Great job! You've completed this module.",
    });

    // Check if course is completed
    const allModulesCompleted = modules.every(module => 
      moduleStates[module.id]?.completed || module.id === moduleId
    );
    
    if (allModulesCompleted) {
      // Award certificate and extra points
      addPoints(200); // 200 bonus points for course completion
      toast({
        title: "🎉 Course Completed!",
        description: "Congratulations! You've earned a certificate and 200 bonus points!",
      });
      
      // Save certificate to localStorage
      const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
      const newCertificate = {
        id: Date.now(),
        courseId: courseId,
        courseTitle: course.title,
        completedAt: new Date().toISOString(),
        certificateId: `CERT-${courseId}-${Date.now()}`
      };
      certificates.push(newCertificate);
      localStorage.setItem('certificates', JSON.stringify(certificates));
    }
  };

  const handleEnroll = () => {
    setEnrollment({ enrolled: true, enrolledAt: new Date().toISOString() });
    addPoints(50); // 50 points for enrolling
    toast({
      title: "Successfully Enrolled!",
      description: "Welcome to the course! Start learning now.",
    });
  };

  const getCourseOverview = (course: Course) => {
    const overviews: { [key: number]: { description: string; highlights: string[] } } = {
      1: {
        description: "Welcome to the Full Stack MERN Development course! Master the complete web development stack and build modern, scalable web applications.",
        highlights: [
          "Build responsive React applications",
          "Create powerful Node.js backends",
          "Design and manage MongoDB databases",
          "Implement user authentication",
          "Deploy applications to the cloud"
        ]
      },
      2: {
        description: "Dive into Python programming and data science! Learn to analyze data, create visualizations, and build machine learning models.",
        highlights: [
          "Master Python programming fundamentals",
          "Analyze data with Pandas and NumPy",
          "Create stunning visualizations",
          "Build machine learning models",
          "Work with real-world datasets"
        ]
      },
      3: {
        description: "Advanced React development with TypeScript! Learn modern React patterns, performance optimization, and enterprise-level development.",
        highlights: [
          "Master TypeScript integration",
          "Advanced React hooks and patterns",
          "Performance optimization techniques",
          "Testing strategies",
          "Production-ready applications"
        ]
      },
      4: {
        description: "Master database design and management! Learn SQL, NoSQL, and cloud database solutions for modern applications.",
        highlights: [
          "Design efficient database schemas",
          "Write complex SQL queries",
          "Work with PostgreSQL and MongoDB",
          "Optimize database performance",
          "Implement security best practices"
        ]
      },
      5: {
        description: "Enter the world of blockchain development! Build decentralized applications and smart contracts on Ethereum.",
        highlights: [
          "Understand blockchain fundamentals",
          "Write Solidity smart contracts",
          "Build DeFi applications",
          "Create NFT marketplaces",
          "Deploy to mainnet"
        ]
      },
      6: {
        description: "Leverage AI in software development! Learn to use GitHub Copilot, ChatGPT, and other AI tools to supercharge your coding.",
        highlights: [
          "Master GitHub Copilot",
          "Advanced prompt engineering",
          "Automate code reviews",
          "AI-powered testing",
          "Build AI development workflows"
        ]
      },
      7: {
        description: "Build cross-platform mobile apps with Flutter! Create beautiful iOS and Android applications with a single codebase.",
        highlights: [
          "Flutter widget system",
          "State management patterns",
          "Native device integrations",
          "Firebase backend services",
          "App store deployment"
        ]
      },
      8: {
        description: "Learn ethical hacking and cybersecurity! Master penetration testing, network security, and defense strategies.",
        highlights: [
          "Penetration testing methodologies",
          "Network security assessment",
          "Web application security",
          "Malware analysis",
          "Incident response"
        ]
      },
      9: {
        description: "Master digital marketing strategies! Learn SEO, social media marketing, paid advertising, and analytics.",
        highlights: [
          "Search engine optimization",
          "Social media marketing",
          "Google Ads and Facebook Ads",
          "Content marketing strategy",
          "Analytics and conversion optimization"
        ]
      },
      10: {
        description: "Master Amazon Web Services! Learn cloud computing, serverless architecture, and scalable application deployment.",
        highlights: [
          "EC2 and cloud infrastructure",
          "S3 storage solutions",
          "Lambda serverless functions",
          "RDS database services",
          "DevOps and automation"
        ]
      },
      11: {
        description: "Create amazing games with Unity! Learn 2D and 3D game development using Unity engine and C# programming.",
        highlights: [
          "Unity game engine mastery",
          "C# programming for games",
          "2D and 3D game development",
          "Physics and animation",
          "Mobile game publishing"
        ]
      },
      12: {
        description: "Master DevOps practices! Learn containerization, orchestration, CI/CD pipelines, and infrastructure automation.",
        highlights: [
          "Docker containerization",
          "Kubernetes orchestration",
          "Jenkins CI/CD pipelines",
          "Infrastructure as code",
          "Monitoring and logging"
        ]
      },
      13: {
        description: "Design beautiful user experiences! Master Figma, design thinking, and create stunning UI/UX designs.",
        highlights: [
          "Design thinking methodology",
          "Figma design tools",
          "User research and testing",
          "Prototyping and wireframing",
          "Design systems creation"
        ]
      },
      14: {
        description: "Build native iOS applications! Master Swift programming and iOS development with modern features.",
        highlights: [
          "Swift programming language",
          "iOS app architecture",
          "SwiftUI modern development",
          "Core Data persistence",
          "App Store deployment"
        ]
      },
      15: {
        description: "Transform data into insights with Power BI! Create interactive dashboards and advanced analytics.",
        highlights: [
          "Power BI fundamentals",
          "DAX functions and formulas",
          "Interactive visualizations",
          "Data modeling techniques",
          "Business intelligence reporting"
        ]
      },
      16: {
        description: "Build successful online stores! Master Shopify, e-commerce strategies, and dropshipping business models.",
        highlights: [
          "Shopify store setup",
          "Product and inventory management",
          "Dropshipping strategies",
          "E-commerce marketing",
          "Business scaling techniques"
        ]
      },
      17: {
        description: "Build AI applications with Python! Master TensorFlow, deep learning, and create intelligent systems.",
        highlights: [
          "Neural networks and deep learning",
          "TensorFlow and PyTorch",
          "Computer vision applications",
          "Natural language processing",
          "AI model deployment"
        ]
      },
      18: {
        description: "Master graphic design with Adobe Creative Suite! Create stunning visuals, logos, and brand identities.",
        highlights: [
          "Adobe Photoshop mastery",
          "Adobe Illustrator techniques",
          "Typography and color theory",
          "Logo and brand design",
          "Print and digital design"
        ]
      }
    };

    return overviews[course.id] || {
      description: `Welcome to ${course.title}! ${course.description}`,
      highlights: [
        "Comprehensive curriculum",
        "Hands-on projects",
        "Expert instruction",
        "Industry-relevant skills",
        "Certificate upon completion"
      ]
    };
  };

  const course = courseData.find((c) => c.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const modules = course.modules;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="mb-8">
          <div className="relative">
            <img
              src={`https://images.unsplash.com/${course.image}?w=1200&h=400&fit=crop`}
              alt={course.title}
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {course.category}
              </Badge>
            </div>
          </div>

          <div className="mt-4 md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{course.title}</h1>
              <p className="text-slate-300">{course.description}</p>
            </div>
            <div className="mt-4 md:mt-0">
              {enrollment.enrolled ? (
                <Badge className="bg-green-500 text-white">
                  Enrolled
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Badge>
              ) : (
                <Button onClick={handleEnroll} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Enroll Now
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-white/20 text-slate-300">
              {course.level}
            </Badge>
            <div className="flex items-center gap-1 text-slate-300">
              <Calendar className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <Star className="h-4 w-4 text-amber-400 fill-current" />
              <span>{course.rating} ({course.students} students)</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
              {["overview", "modules", "notes"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                  <CardDescription>Learn the basics of this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    {getCourseOverview(course).description}
                  </p>
                  <h4 className="font-semibold mb-3">What you'll learn:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {getCourseOverview(course).highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {activeTab === "modules" && (
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <Card key={module.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader className="text-white">
                      <CardTitle className="flex items-center justify-between">
                        {module.title}
                        {moduleStates[module.id]?.completed && (
                          <Badge className="bg-green-500 text-white">
                            Completed
                            <BookOpenCheck className="ml-2 h-4 w-4" />
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-slate-300">Module {index + 1}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!moduleStates[module.id]?.started ? (
                        <Button onClick={() => handleStartModule(module.id)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Start Module
                        </Button>
                      ) : (
                        <div className="flex items-center justify-between">
                          <Progress value={100} className="w-3/5" />
                          <Button onClick={() => handleCompleteModule(module.id)} className="bg-green-600 hover:bg-green-700">
                            Mark Complete
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "notes" && (
              <NotesPanel 
                courseId={courseId}
                moduleId={selectedModule || undefined}
                modules={modules}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Keep track of your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{calculateCourseProgress().toFixed(0)}%</div>
                <Progress value={calculateCourseProgress()} />
                <div className="mt-4 flex justify-between text-sm text-slate-300">
                  <span>Modules Completed</span>
                  <span>{Object.values(moduleStates).filter(state => state.completed).length} / {modules.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Notes Preview for Sidebar */}
            {activeTab !== "notes" && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Quick Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setActiveTab("notes")}
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    View All Notes
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
