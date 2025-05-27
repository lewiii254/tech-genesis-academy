
import { useState } from "react";
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

const courseModules = {
  1: [ // Full Stack MERN Development
    {
      id: 1,
      title: "Introduction to MERN Stack",
      duration: "45 mins",
      type: "video",
      completed: true,
      lessons: [
        "What is MERN Stack?",
        "Setting up Development Environment",
        "Project Structure Overview"
      ]
    },
    {
      id: 2,
      title: "MongoDB Fundamentals",
      duration: "2 hours",
      type: "video",
      completed: true,
      lessons: [
        "NoSQL vs SQL Databases",
        "MongoDB Atlas Setup",
        "Collections and Documents",
        "CRUD Operations"
      ]
    },
    {
      id: 3,
      title: "Express.js Backend Development",
      duration: "3 hours",
      type: "video",
      completed: true,
      lessons: [
        "Setting up Express Server",
        "Routing and Middleware",
        "API Endpoints",
        "Error Handling"
      ]
    },
    {
      id: 4,
      title: "React Frontend Basics",
      duration: "4 hours",
      type: "video",
      completed: false,
      lessons: [
        "Components and JSX",
        "State Management",
        "Props and Events",
        "Hooks Introduction"
      ]
    },
    {
      id: 5,
      title: "Advanced React Concepts",
      duration: "3.5 hours",
      type: "video",
      completed: false,
      lessons: [
        "Custom Hooks",
        "Context API",
        "React Router",
        "Performance Optimization"
      ]
    },
    {
      id: 6,
      title: "Node.js Backend Integration",
      duration: "2.5 hours",
      type: "video",
      completed: false,
      lessons: [
        "Connecting Frontend to Backend",
        "Authentication with JWT",
        "File Upload Handling",
        "Security Best Practices"
      ]
    }
  ],
  2: [ // Python for Data Science
    {
      id: 1,
      title: "Python Fundamentals",
      duration: "2 hours",
      type: "video",
      completed: true,
      lessons: [
        "Python Syntax and Variables",
        "Data Types and Structures",
        "Control Flow",
        "Functions and Modules"
      ]
    },
    {
      id: 2,
      title: "NumPy for Numerical Computing",
      duration: "1.5 hours",
      type: "video",
      completed: true,
      lessons: [
        "Arrays and Matrices",
        "Mathematical Operations",
        "Broadcasting",
        "Linear Algebra"
      ]
    },
    {
      id: 3,
      title: "Pandas for Data Manipulation",
      duration: "3 hours",
      type: "video",
      completed: false,
      lessons: [
        "DataFrames and Series",
        "Data Cleaning",
        "Grouping and Aggregation",
        "Merging and Joining"
      ]
    },
    {
      id: 4,
      title: "Data Visualization with Matplotlib",
      duration: "2 hours",
      type: "video",
      completed: false,
      lessons: [
        "Basic Plotting",
        "Customizing Charts",
        "Subplots and Layouts",
        "Advanced Visualizations"
      ]
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
    modules: 24,
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
    modules: 20,
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
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const courseId = parseInt(id || "1");
  const course = allCourses.find(c => c.id === courseId) || allCourses[0];
  const modules = courseModules[courseId as keyof typeof courseModules] || [];
  
  const [activeTab, setActiveTab] = useState("overview");
  const completedModules = modules.filter(m => m.completed).length;
  const totalModules = modules.length;
  const progressPercentage = (completedModules / totalModules) * 100;

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
                  {course.enrolled ? (
                    <Badge className="bg-green-500 text-white">Enrolled</Badge>
                  ) : (
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Enroll Now
                    </Button>
                  )}
                </div>

                {course.enrolled && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-slate-300 mb-2">
                        <span>Progress</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
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
            {modules.map((module, index) => (
              <Card key={module.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {module.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : (
                        <div className="h-6 w-6 border-2 border-slate-400 rounded-full flex items-center justify-center">
                          {course.enrolled ? (
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
                    {course.enrolled && module.completed && (
                      <Button size="sm" variant="outline" className="border-white/20 text-slate-300">
                        <Play className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    )}
                    {course.enrolled && !module.completed && index === completedModules && (
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
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
            ))}
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
