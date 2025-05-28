import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  Award,
  FileText,
  Video,
  Download,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const courseModules = {
  1: [ // Full Stack MERN Development
    {
      id: 1,
      title: "Introduction to MERN Stack Architecture",
      duration: "45 mins",
      type: "video",
      completed: true,
      lessons: [
        "Understanding the MERN Stack Ecosystem",
        "Setting up Your Development Environment",
        "Project Structure and Best Practices",
        "Version Control with Git and GitHub"
      ],
      content: "Learn the fundamentals of MongoDB, Express.js, React, and Node.js. Understand how these technologies work together to create powerful full-stack applications."
    },
    {
      id: 2,
      title: "MongoDB Database Design & Operations",
      duration: "2 hours",
      type: "video",
      completed: true,
      lessons: [
        "NoSQL vs SQL: When to Use MongoDB",
        "MongoDB Atlas Cloud Setup",
        "Collections, Documents, and Schema Design",
        "CRUD Operations and Aggregation Pipeline",
        "Indexing for Performance Optimization"
      ],
      content: "Master MongoDB database design patterns, learn to create efficient schemas, and understand how to perform complex queries and aggregations."
    },
    {
      id: 3,
      title: "Express.js Backend API Development",
      duration: "3 hours",
      type: "video",
      completed: true,
      lessons: [
        "Express Server Setup and Configuration",
        "Routing and Middleware Architecture",
        "RESTful API Design Principles",
        "Error Handling and Validation",
        "Authentication Middleware"
      ],
      content: "Build robust backend APIs with Express.js. Learn to create secure, scalable server applications with proper error handling and middleware."
    },
    {
      id: 4,
      title: "React Frontend Development Fundamentals",
      duration: "4 hours",
      type: "video",
      completed: false,
      lessons: [
        "Components and JSX Syntax",
        "State Management with useState",
        "Props and Component Communication",
        "Event Handling and Forms",
        "React Hooks Deep Dive"
      ],
      content: "Build dynamic user interfaces with React. Learn component-based architecture, state management, and modern React patterns."
    },
    {
      id: 5,
      title: "Advanced React Patterns & Performance",
      duration: "3.5 hours",
      type: "video",
      completed: false,
      lessons: [
        "Custom Hooks Development",
        "Context API for Global State",
        "React Router for Navigation",
        "Performance Optimization Techniques",
        "Testing React Components"
      ],
      content: "Master advanced React concepts including custom hooks, context patterns, and performance optimization strategies for production applications."
    },
    {
      id: 6,
      title: "Full-Stack Integration & Deployment",
      duration: "2.5 hours",
      type: "video",
      completed: false,
      lessons: [
        "Connecting Frontend to Backend APIs",
        "JWT Authentication Implementation",
        "File Upload and Image Handling",
        "Security Best Practices",
        "Production Deployment Strategies"
      ],
      content: "Integrate your frontend and backend into a complete application. Learn authentication, security, and deployment to production environments."
    }
  ],
  2: [ // Python for Data Science
    {
      id: 1,
      title: "Python Programming Foundations",
      duration: "2 hours",
      type: "video",
      completed: true,
      lessons: [
        "Python Syntax and PEP 8 Guidelines",
        "Variables, Data Types, and Memory Management",
        "Control Flow: Loops and Conditionals",
        "Functions, Modules, and Packages",
        "Error Handling and Debugging"
      ],
      content: "Master Python fundamentals with clean, readable code. Learn best practices and develop a solid foundation for data science applications."
    },
    {
      id: 2,
      title: "NumPy for Scientific Computing",
      duration: "1.5 hours",
      type: "video",
      completed: true,
      lessons: [
        "N-dimensional Arrays and Memory Layout",
        "Mathematical Operations and Broadcasting",
        "Linear Algebra Operations",
        "Random Number Generation",
        "Performance Optimization Techniques"
      ],
      content: "Harness the power of NumPy for numerical computing. Learn to work with large datasets efficiently using vectorized operations."
    },
    {
      id: 3,
      title: "Pandas for Data Manipulation & Analysis",
      duration: "3 hours",
      type: "video",
      completed: false,
      lessons: [
        "DataFrames and Series Fundamentals",
        "Data Cleaning and Preprocessing",
        "Grouping, Aggregation, and Pivot Tables",
        "Merging, Joining, and Concatenating Data",
        "Time Series Analysis"
      ],
      content: "Master data manipulation with Pandas. Learn to clean, transform, and analyze real-world datasets with powerful data structures."
    },
    {
      id: 4,
      title: "Data Visualization with Matplotlib & Seaborn",
      duration: "2 hours",
      type: "video",
      completed: false,
      lessons: [
        "Matplotlib Fundamentals and Pyplot",
        "Customizing Plots and Styling",
        "Subplots and Complex Layouts",
        "Seaborn for Statistical Visualizations",
        "Interactive Visualizations"
      ],
      content: "Create compelling data visualizations. Learn to communicate insights effectively through various chart types and statistical plots."
    },
    {
      id: 5,
      title: "Machine Learning with Scikit-Learn",
      duration: "3.5 hours",
      type: "video",
      completed: false,
      lessons: [
        "Supervised Learning Algorithms",
        "Unsupervised Learning and Clustering",
        "Model Selection and Cross-Validation",
        "Feature Engineering and Selection",
        "Model Evaluation Metrics"
      ],
      content: "Implement machine learning algorithms from scratch. Learn to build, evaluate, and deploy predictive models for real-world problems."
    },
    {
      id: 6,
      title: "Deep Learning with TensorFlow",
      duration: "4 hours",
      type: "video",
      completed: false,
      lessons: [
        "Neural Networks Fundamentals",
        "Building Models with Keras",
        "Convolutional Neural Networks",
        "Recurrent Neural Networks",
        "Transfer Learning and Fine-tuning"
      ],
      content: "Dive into deep learning with TensorFlow. Build neural networks for image recognition, natural language processing, and more."
    }
  ],
  3: [ // UI/UX Design Masterclass
    {
      id: 1,
      title: "Design Thinking & User Research",
      duration: "2 hours",
      type: "video",
      completed: true,
      lessons: [
        "Design Thinking Process and Methodology",
        "User Research Techniques and Methods",
        "Creating User Personas and Journey Maps",
        "Conducting User Interviews",
        "Analyzing User Feedback and Data"
      ],
      content: "Learn human-centered design principles. Understand your users through research and create solutions that solve real problems."
    },
    {
      id: 2,
      title: "Visual Design Principles",
      duration: "2.5 hours",
      type: "video",
      completed: false,
      lessons: [
        "Typography and Readability",
        "Color Theory and Psychology",
        "Layout and Grid Systems",
        "Visual Hierarchy and Composition",
        "Brand Identity and Style Guides"
      ],
      content: "Master visual design fundamentals. Create aesthetically pleasing and functional designs that communicate effectively."
    },
    {
      id: 3,
      title: "Wireframing & Prototyping",
      duration: "3 hours",
      type: "video",
      completed: false,
      lessons: [
        "Low-fidelity and High-fidelity Wireframes",
        "Interactive Prototyping Techniques",
        "Design Systems and Component Libraries",
        "Responsive Design Considerations",
        "Accessibility in Design"
      ],
      content: "Transform ideas into tangible designs. Learn to create wireframes and prototypes that guide development and validate concepts."
    },
    {
      id: 4,
      title: "User Interface Design",
      duration: "3.5 hours",
      type: "video",
      completed: false,
      lessons: [
        "Interface Design Patterns",
        "Mobile-First Design Approach",
        "Interaction Design and Microinteractions",
        "Design for Different Platforms",
        "Usability Testing and Iteration"
      ],
      content: "Create intuitive user interfaces. Learn platform-specific design patterns and create seamless user experiences across devices."
    }
  ]
};

const allCourses = [
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
    price: "Free",
    enrolled: true,
    progress: 45,
    modules: 6,
    projects: 6,
    instructor: "Sarah Johnson",
    skills: ["React", "Node.js", "MongoDB", "Express", "JWT", "REST APIs"],
    overview: "This comprehensive course will take you from beginner to advanced in full-stack web development using the MERN stack. You'll build real-world projects and learn industry best practices.",
    requirements: ["Basic JavaScript knowledge", "HTML/CSS fundamentals", "Computer with internet connection"],
    whatYouLearn: [
      "Build full-stack web applications",
      "Master React.js for frontend development",
      "Create RESTful APIs with Express.js",
      "Work with MongoDB databases",
      "Implement user authentication",
      "Deploy applications to production"
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
    price: "Free",
    enrolled: true,
    progress: 60,
    modules: 6,
    projects: 8,
    instructor: "Dr. Michael Chen",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "TensorFlow"],
    overview: "Dive into the world of data science and machine learning with Python. This course covers everything from basic programming to advanced ML algorithms.",
    requirements: ["No prior programming experience needed", "High school mathematics", "Computer with Python installed"],
    whatYouLearn: [
      "Python programming fundamentals",
      "Data manipulation with Pandas",
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning with TensorFlow",
      "Real-world data science projects"
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Master user interface and user experience design from research to final implementation",
    image: "photo-1561070791-2526d30994b5",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.7,
    students: 987,
    category: "Design",
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 4,
    projects: 5,
    instructor: "Emma Wilson",
    skills: ["Figma", "User Research", "Prototyping", "Visual Design", "Usability Testing"],
    overview: "Learn to create beautiful and functional user experiences. This course covers the complete design process from research to implementation.",
    requirements: ["No prior design experience needed", "Computer with internet connection", "Creative mindset"],
    whatYouLearn: [
      "User research methodologies",
      "Visual design principles",
      "Wireframing and prototyping",
      "Design systems creation",
      "Usability testing techniques",
      "Industry-standard design tools"
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const courseId = parseInt(id || "1");
  const course = allCourses.find(c => c.id === courseId) || allCourses[0];
  const modules = courseModules[courseId as keyof typeof courseModules] || [];
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [courseProgress, setCourseProgress] = useState(() => {
    const saved = localStorage.getItem(`course-${courseId}-progress`);
    return saved ? JSON.parse(saved) : course.progress;
  });
  
  const [moduleStates, setModuleStates] = useState(() => {
    const saved = localStorage.getItem(`course-${courseId}-modules`);
    if (saved) {
      return JSON.parse(saved);
    }
    return modules.reduce((acc, module) => {
      acc[module.id] = { completed: module.completed, started: module.completed };
      return acc;
    }, {} as Record<number, { completed: boolean; started: boolean }>);
  });

  const [enrollment, setEnrollment] = useState(() => {
    const saved = localStorage.getItem(`course-${courseId}-enrolled`);
    return saved ? JSON.parse(saved) : course.enrolled;
  });

  useEffect(() => {
    localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(courseProgress));
    localStorage.setItem(`course-${courseId}-modules`, JSON.stringify(moduleStates));
    localStorage.setItem(`course-${courseId}-enrolled`, JSON.stringify(enrollment));
  }, [courseProgress, moduleStates, enrollment, courseId]);

  const completedModules = Object.values(moduleStates).filter(state => state.completed).length;
  const totalModules = modules.length;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const handleEnroll = () => {
    setEnrollment(true);
    toast({
      title: "Successfully Enrolled!",
      description: `You're now enrolled in ${course.title}. Start learning today!`,
    });
  };

  const handleStartModule = (moduleId: number) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], started: true }
    }));
    toast({
      title: "Module Started!",
      description: `You've started module ${moduleId}. Keep up the great work!`,
    });
  };

  const handleCompleteModule = (moduleId: number) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleId]: { completed: true, started: true }
    }));
    
    const newProgress = ((completedModules + 1) / totalModules) * 100;
    setCourseProgress(Math.round(newProgress));
    
    toast({
      title: "Module Completed!",
      description: `Great job! You've completed module ${moduleId}.`,
    });
  };

  const getNextAvailableModule = () => {
    for (const module of modules) {
      if (!moduleStates[module.id]?.completed) {
        return module;
      }
    }
    return null;
  };

  const nextModule = getNextAvailableModule();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-300">
          <Link to="/courses" className="hover:text-white">Courses</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{course.title}</span>
        </div>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-slate-300">
                  {course.level}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-slate-300 mb-6">{course.description}</p>
              
              <div className="flex items-center gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{course.rating}</span>
                  <span>({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{totalModules} modules</span>
                </div>
              </div>
            </div>

            <img 
              src={`https://images.unsplash.com/${course.image}?w=800&h=400&fit=crop`}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Course Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">{course.price}</div>
                  {enrollment ? (
                    <Badge className="bg-green-500 text-white">Enrolled</Badge>
                  ) : (
                    <Button 
                      onClick={handleEnroll}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>

                {enrollment && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-slate-300 mb-2">
                        <span>Progress</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    {nextModule && (
                      <Button 
                        onClick={() => handleStartModule(nextModule.id)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {moduleStates[nextModule.id]?.started ? 'Continue Learning' : 'Start Learning'}
                      </Button>
                    )}
                    {progressPercentage === 100 && (
                      <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600">
                        <Award className="h-4 w-4 mr-2" />
                        Get Certificate
                      </Button>
                    )}
                  </div>
                )}

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Instructor</span>
                    <span className="text-white">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Students</span>
                    <span className="text-white">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Projects</span>
                    <span className="text-white">{course.projects}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Skills You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-white/20 text-slate-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
            <TabsTrigger value="curriculum" className="data-[state=active]:bg-white/20">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor" className="data-[state=active]:bg-white/20">Instructor</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-white/20">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">{course.overview}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-4">
            {modules.map((module, index) => {
              const moduleState = moduleStates[module.id] || { completed: false, started: false };
              const isAvailable = enrollment && (index === 0 || moduleStates[modules[index - 1]?.id]?.completed);
              
              return (
                <Card key={module.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {moduleState.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : (
                          <div className="h-6 w-6 border-2 border-slate-400 rounded-full flex items-center justify-center">
                            {!isAvailable ? (
                              <Lock className="h-3 w-3 text-slate-400" />
                            ) : (
                              <span className="text-xs text-slate-400">{index + 1}</span>
                            )}
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg text-white">Module {index + 1}: {module.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-slate-300 mt-1">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{module.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Video className="h-4 w-4" />
                              <span>{module.lessons.length} lessons</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {enrollment && moduleState.completed && (
                          <Button size="sm" variant="outline" className="border-white/20 text-slate-300">
                            <Play className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        )}
                        {enrollment && !moduleState.completed && isAvailable && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStartModule(module.id)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {moduleState.started ? 'Continue' : 'Start'}
                          </Button>
                        )}
                        {enrollment && moduleState.started && !moduleState.completed && (
                          <Button 
                            size="sm" 
                            onClick={() => handleCompleteModule(module.id)}
                            className="bg-gradient-to-r from-green-600 to-blue-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4">{module.content}</p>
                    <ul className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center gap-3 text-slate-300">
                          <FileText className="h-4 w-4" />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="instructor" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{course.instructor}</h3>
                    <p className="text-slate-300 mb-4">Senior Full Stack Developer & Instructor</p>
                    <p className="text-slate-300 leading-relaxed">
                      With over 8 years of experience in web development, {course.instructor.split(' ')[0]} has worked with 
                      companies like Google, Facebook, and startups. She's passionate about teaching and has helped 
                      thousands of students launch their tech careers.
                    </p>
                    <div className="flex items-center gap-6 mt-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>10,000+ students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span>15 courses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>4.9 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {[
              { name: "Alex Thompson", rating: 5, comment: "Amazing course! The instructor explains everything clearly and the projects are really practical." },
              { name: "Maria Garcia", rating: 5, comment: "Best MERN stack course I've taken. Great progression from basics to advanced topics." },
              { name: "David Kim", rating: 4, comment: "Comprehensive content and good examples. Would recommend to anyone wanting to learn full stack development." }
            ].map((review, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-white">{review.name}</h4>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-300">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetail;
