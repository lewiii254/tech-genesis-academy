import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, BookOpen, Clock, Users, Play, Award, CheckCircle, Target, Filter, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";

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
    progress: 85,
    modules: 24,
    projects: 6,
    instructor: "Sarah Johnson",
    skills: ["React", "Node.js", "MongoDB", "Express", "JWT", "REST APIs"],
    featured: true,
    certificate: true,
    difficulty: 7
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
    featured: true,
    certificate: true,
    difficulty: 5
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Design beautiful and functional user interfaces with Figma, Adobe XD, and modern design principles",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Advanced",
    duration: "8 weeks",
    rating: 4.7,
    students: 987,
    category: "Design",
    price: "Free",
    enrolled: true,
    progress: 95,
    modules: 16,
    projects: 5,
    instructor: "Alex Rivera",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    featured: false,
    certificate: true,
    difficulty: 8
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
    price: "Free",
    enrolled: true,
    progress: 40,
    modules: 12,
    projects: 4,
    instructor: "Jennifer Lopez",
    skills: ["SQL", "PostgreSQL", "MongoDB", "Database Design", "Performance Tuning"],
    featured: false,
    certificate: true,
    difficulty: 6
  },
  {
    id: 5,
    title: "Software Testing & Quality Assurance",
    description: "Learn comprehensive testing frameworks including Jest, Cypress, Selenium, and test automation",
    image: "photo-1605810230434-7631ac76ec81",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.5,
    students: 543,
    category: "Testing",
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 18,
    projects: 6,
    instructor: "Mark Thompson",
    skills: ["Jest", "Cypress", "Selenium", "Unit Testing", "Integration Testing"],
    featured: false,
    certificate: true,
    difficulty: 6
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
    price: "Free",
    enrolled: true,
    progress: 25,
    modules: 28,
    projects: 10,
    instructor: "Dr. Emily Watson",
    skills: ["GitHub Copilot", "OpenAI API", "Prompt Engineering", "AI Automation"],
    featured: true,
    certificate: true,
    difficulty: 9
  },
  {
    id: 7,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps for iOS and Android with React Native and Expo",
    image: "photo-1581091226825-a6a2a5aee158",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    students: 892,
    category: "Mobile Development",
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 22,
    projects: 7,
    instructor: "Carlos Rodriguez",
    skills: ["React Native", "Expo", "Redux", "Native Modules", "App Store Deployment"],
    featured: false,
    certificate: true,
    difficulty: 7
  },
  {
    id: 8,
    title: "Advanced JavaScript & TypeScript",
    description: "Master modern JavaScript ES6+ features and TypeScript for building robust applications",
    image: "photo-1461749280684-dccba630e2f6",
    level: "Advanced",
    duration: "8 weeks",
    rating: 4.8,
    students: 1456,
    category: "Programming",
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 16,
    projects: 5,
    instructor: "David Kim",
    skills: ["ES6+", "TypeScript", "Async/Await", "Design Patterns", "Performance"],
    featured: false,
    certificate: true,
    difficulty: 8
  },
  {
    id: 9,
    title: "Graphics Design Fundamentals",
    description: "Learn design principles, color theory, typography, and create stunning visuals with Adobe Creative Suite",
    image: "photo-1581090464777-f3220bbe1b8b",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.6,
    students: 634,
    category: "Design",
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 14,
    projects: 8,
    instructor: "Maria Santos",
    skills: ["Photoshop", "Illustrator", "InDesign", "Color Theory", "Typography"],
    featured: false,
    certificate: true,
    difficulty: 4
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
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 26,
    projects: 9,
    instructor: "James Wilson",
    skills: ["AWS", "EC2", "S3", "Lambda", "CloudFormation", "DevOps"],
    featured: true,
    certificate: true,
    difficulty: 9
  },
  {
    id: 11,
    title: "Cybersecurity Essentials",
    description: "Learn cybersecurity fundamentals, ethical hacking, and protect systems from security threats",
    image: "photo-1488590528505-98d2b5aba04b",
    level: "Intermediate",
    duration: "9 weeks",
    rating: 4.7,
    students: 789,
    category: "Cybersecurity",
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 20,
    projects: 6,
    instructor: "Lisa Anderson",
    skills: ["Network Security", "Penetration Testing", "Cryptography", "Risk Assessment"],
    featured: false,
    certificate: true,
    difficulty: 7
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
    price: "Free",
    enrolled: false,
    progress: 0,
    modules: 24,
    projects: 8,
    instructor: "Robert Chen",
    skills: ["Docker", "Kubernetes", "Jenkins", "Git", "AWS", "Monitoring"],
    featured: false,
    certificate: true,
    difficulty: 9
  }
];

const categories = ["All", "Web Development", "Programming", "Design", "Database", "Testing", "AI/ML", "Mobile Development", "Cloud Computing", "Cybersecurity", "DevOps"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const sortOptions = ["Popular", "Rating", "Newest", "Duration"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  let filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    const matchesFeatured = !showFeaturedOnly || course.featured;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesFeatured;
  });

  // Sort courses
  filteredCourses = filteredCourses.sort((a, b) => {
    switch (sortBy) {
      case "Rating":
        return b.rating - a.rating;
      case "Duration":
        return parseInt(a.duration) - parseInt(b.duration);
      case "Newest":
        return b.id - a.id;
      default: // Popular
        return b.students - a.students;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Course Catalog</h1>
          </div>
          <p className="text-xl text-slate-300">Master in-demand tech skills with industry experts</p>
          <div className="flex justify-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-400" />
              <span>{categories.length - 1} Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span>{allCourses.reduce((acc, course) => acc + course.students, 0).toLocaleString()}+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-yellow-400" />
              <span>Industry Certificates</span>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                placeholder="Search courses, skills, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 flex-1"
              />
              
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white w-40">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className="border-white/20"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Featured
                </Button>

                <div className="flex border border-white/20 rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 text-slate-300">
              <span>{filteredCourses.length} courses found</span>
              <div className="flex gap-4 text-sm">
                <span>Free: {filteredCourses.filter(c => c.price === "Free").length}</span>
                <span>With Certificate: {filteredCourses.filter(c => c.certificate).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredCourses.map((course) => (
            <Card key={course.id} className={`bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden ${viewMode === "list" ? "flex" : ""}`}>
              <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                <img 
                  src={`https://images.unsplash.com/${course.image}?w=400&h=200&fit=crop`}
                  alt={course.title}
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {course.category}
                  </Badge>
                  {course.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {course.enrolled && (
                    <Badge className="bg-green-500 text-white">Enrolled</Badge>
                  )}
                  <Badge variant="outline" className="border-white bg-black/50 text-white text-xs">
                    {course.level}
                  </Badge>
                </div>
                {course.enrolled && course.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
                    <div className="flex justify-between text-white text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <CardHeader className="text-white pb-2">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300 line-clamp-2">
                    {course.description}
                  </CardDescription>
                  <div className="text-sm text-slate-400">
                    by {course.instructor}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-slate-300">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.modules} modules</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>{course.projects} projects</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    {course.certificate && (
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4 text-yellow-400" />
                        <span>Certificate</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-white/20 text-slate-400 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 3 && (
                      <Badge variant="outline" className="border-white/20 text-slate-400 text-xs">
                        +{course.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Link to={`/course/${course.id}`} className="flex items-center justify-center gap-2">
                      {course.enrolled ? (
                        <>
                          <Play className="h-4 w-4" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Enroll Now
                        </>
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
              <p className="text-slate-300">Try adjusting your search criteria or browse all courses.</p>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20">
          <CardContent className="p-8 text-center">
            <Award className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Tech Journey?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with our comprehensive tech courses. 
              Earn industry-recognized certificates and build real-world projects.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-white/20 text-slate-300 hover:bg-white/10">
                View All Certificates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Courses;
