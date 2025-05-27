
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, BookOpen, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const allCourses = [
  {
    id: 1,
    title: "Full Stack MERN Development",
    description: "Master MongoDB, Express, React, and Node.js to build modern web applications",
    image: "photo-1461749280684-dccba630e2f6",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: 1234,
    category: "Web Development",
    price: "Free",
    enrolled: true
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn Python programming and data analysis with pandas, numpy, and matplotlib",
    image: "photo-1498050108023-c5249f4df085",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.9,
    students: 2156,
    category: "Programming",
    price: "Free",
    enrolled: true
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Design beautiful and functional user interfaces with Figma and Adobe XD",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Advanced",
    duration: "10 weeks",
    rating: 4.7,
    students: 987,
    category: "Design",
    price: "Free",
    enrolled: true
  },
  {
    id: 4,
    title: "Database Design & Management",
    description: "Master SQL, NoSQL, and database optimization techniques",
    image: "photo-1487058792275-0ad4aaf24ca7",
    level: "Intermediate",
    duration: "6 weeks",
    rating: 4.6,
    students: 756,
    category: "Database",
    price: "Free",
    enrolled: true
  },
  {
    id: 5,
    title: "Software Testing Automation",
    description: "Learn testing frameworks like Jest, Cypress, and Selenium",
    image: "photo-1605810230434-7631ac76ec81",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.5,
    students: 543,
    category: "Testing",
    price: "Free",
    enrolled: false
  },
  {
    id: 6,
    title: "AI for Software Engineering",
    description: "Integrate AI tools like GitHub Copilot and ChatGPT into your workflow",
    image: "photo-1649972904349-6e44c42644a7",
    level: "Advanced",
    duration: "14 weeks",
    rating: 4.9,
    students: 1876,
    category: "AI/ML",
    price: "Free",
    enrolled: true
  },
  {
    id: 7,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps for iOS and Android",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    students: 892,
    category: "Mobile Development",
    price: "Free",
    enrolled: false
  },
  {
    id: 8,
    title: "Advanced JavaScript & TypeScript",
    description: "Master modern JavaScript ES6+ and TypeScript for robust applications",
    image: "photo-1461749280684-dccba630e2f6",
    level: "Advanced",
    duration: "8 weeks",
    rating: 4.8,
    students: 1456,
    category: "Programming",
    price: "Free",
    enrolled: false
  }
];

const categories = ["All", "Web Development", "Programming", "Design", "Database", "Testing", "AI/ML", "Mobile Development"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Course Catalog</h1>
          <p className="text-xl text-slate-300">Discover and master new tech skills</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
          />
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
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
                {course.enrolled && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white">Enrolled</Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="text-white pb-2">
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="text-slate-300 line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-slate-300">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                </div>
                
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to={`/course/${course.id}`}>
                    {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-300">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
