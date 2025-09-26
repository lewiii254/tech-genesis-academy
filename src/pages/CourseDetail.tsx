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
    description: "Master MongoDB, Express, React, and Node.js",
    image: "photo-1461749280684-dccba630e2f6",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: 1234,
    category: "Web Development",
    modules: [
      { id: 1, title: "Introduction to React" },
      { id: 2, title: "Node.js Fundamentals" },
      { id: 3, title: "MongoDB Basics" },
      { id: 4, title: "Building RESTful APIs" },
    ]
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn Python programming and data analysis",
    image: "photo-1498050108023-c5249f4df085",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.9,
    students: 2156,
    category: "Programming",
    modules: [
      { id: 5, title: "Python Basics" },
      { id: 6, title: "Data Analysis with Pandas" },
      { id: 7, title: "Data Visualization with Matplotlib" },
      { id: 8, title: "Machine Learning with Scikit-learn" },
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Design beautiful and functional user interfaces",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Advanced",
    duration: "10 weeks",
    rating: 4.7,
    students: 987,
    category: "Design",
    modules: [
      { id: 9, title: "UI Design Principles" },
      { id: 10, title: "UX Research Methods" },
      { id: 11, title: "Prototyping with Figma" },
      { id: 12, title: "Usability Testing" },
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
  };

  const handleEnroll = () => {
    setEnrollment({ enrolled: true, enrolledAt: new Date().toISOString() });
    addPoints(50); // 50 points for enrolling
    toast({
      title: "Successfully Enrolled!",
      description: "Welcome to the course! Start learning now.",
    });
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
                  <p>
                    Welcome to the Full Stack MERN Development course! In this course, you will learn how to build
                    modern web applications using MongoDB, Express, React, and Node.js.
                  </p>
                  <ul className="list-disc pl-5 mt-4">
                    <li>Set up your development environment</li>
                    <li>Create a React frontend</li>
                    <li>Build a Node.js backend</li>
                    <li>Connect to a MongoDB database</li>
                    <li>Deploy your application to the cloud</li>
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
