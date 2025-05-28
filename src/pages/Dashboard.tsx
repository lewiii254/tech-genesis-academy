import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Users, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import StreakCard from "@/components/StreakCard";

const courses = [
  {
    id: 1,
    title: "Full Stack MERN Development",
    description: "Master MongoDB, Express, React, and Node.js",
    image: "photo-1461749280684-dccba630e2f6",
    progress: 45,
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: 1234,
    category: "Web Development"
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn Python programming and data analysis",
    image: "photo-1498050108023-c5249f4df085",
    progress: 0,
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.9,
    students: 2156,
    category: "Programming"
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Design beautiful and functional user interfaces",
    image: "photo-1581091226825-a6a2a5aee158",
    progress: 78,
    level: "Advanced",
    duration: "10 weeks",
    rating: 4.7,
    students: 987,
    category: "Design"
  },
  {
    id: 4,
    title: "Database Design & Management",
    description: "Master SQL, NoSQL, and database optimization",
    image: "photo-1487058792275-0ad4aaf24ca7",
    progress: 23,
    level: "Intermediate",
    duration: "6 weeks",
    rating: 4.6,
    students: 756,
    category: "Database"
  },
  {
    id: 5,
    title: "Software Testing Automation",
    description: "Learn testing frameworks and automation tools",
    image: "photo-1605810230434-7631ac76ec81",
    progress: 0,
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.5,
    students: 543,
    category: "Testing"
  },
  {
    id: 6,
    title: "AI for Software Engineering",
    description: "Integrate AI tools into your development workflow",
    image: "photo-1649972904349-6e44c42644a7",
    progress: 12,
    level: "Advanced",
    duration: "14 weeks",
    rating: 4.9,
    students: 1876,
    category: "AI/ML"
  }
];

const stats = [
  { label: "Courses Enrolled", value: "4", icon: BookOpen },
  { label: "Certificates Earned", value: "2", icon: Award },
  { label: "Study Groups", value: "3", icon: Users },
  { label: "Points Earned", value: "2,450", icon: Star }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Welcome back, Alex!</h1>
          <p className="text-xl text-slate-300">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-slate-300 text-sm">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Streak Card */}
          <div className="md:col-span-1">
            <StreakCard />
          </div>
        </div>

        {/* Course Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Your Courses</h2>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link to="/courses">Browse All Courses</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden">
                <div className="relative">
                  <img 
                    src={`https://images.unsplash.com/${course.image}?w=400&h=200&fit=crop`}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="text-white">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                    <span>({course.students} students)</span>
                  </div>
                  
                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-slate-300">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                  
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Link to={`/course/${course.id}`}>
                      {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
