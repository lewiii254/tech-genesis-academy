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
  switch (sortBy) {
    case "Rating":
      filteredCourses.sort((a, b) => b.rating - a.rating);
      break;
    case "Duration":
      filteredCourses.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      break;
    case "Newest":
      filteredCourses.sort((a, b) => b.id - a.id);
      break;
    default: // Popular
      filteredCourses.sort((a, b) => b.students - a.students);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">Discover Courses</h1>
          <p className="text-lg sm:text-xl text-blue-700">Master new skills with our comprehensive learning programs</p>
        </div>

        {/* Filters */}
        <Card className="bg-white/90 backdrop-blur-md border-blue-200 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search courses, skills, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-blue-50 border-blue-200 text-blue-900 placeholder:text-blue-600"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-blue-50 border-blue-200 text-blue-900">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="bg-blue-50 border-blue-200 text-blue-900">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-blue-50 border-blue-200 text-blue-900">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
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
                  className={showFeaturedOnly 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-blue-300 text-blue-700 hover:bg-blue-50"
                  }
                >
                  <Star className="h-4 w-4 mr-2" />
                  Featured Only
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-blue-700">View:</span>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "border-blue-300 text-blue-700 hover:bg-blue-50"
                    }
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "border-blue-300 text-blue-700 hover:bg-blue-50"
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-blue-700">
                Showing {filteredCourses.length} of {allCourses.length} courses
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredCourses.map((course) => (
            <Card key={course.id} className={`bg-white/90 backdrop-blur-md border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 group ${
              viewMode === "list" ? "flex flex-col sm:flex-row" : ""
            }`}>
              {/* Course Image */}
              <div className={`relative overflow-hidden ${
                viewMode === "list" ? "sm:w-48 h-48 sm:h-auto" : "h-48"
              } bg-gradient-to-br from-blue-500 to-blue-600 rounded-t-lg ${
                viewMode === "list" ? "sm:rounded-l-lg sm:rounded-t-none" : ""
              }`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white opacity-80" />
                </div>
                {course.featured && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {course.enrolled && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    {course.progress}%
                  </div>
                )}
              </div>

              <div className={`flex-1 ${viewMode === "list" ? "p-6" : ""}`}>
                <CardHeader className={viewMode === "list" ? "p-0 pb-4" : ""}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-blue-900 group-hover:text-blue-700 transition-colors">
                        {course.title}
                      </CardTitle>
                      <p className="text-blue-700 text-sm mt-1">by {course.instructor}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 ml-2">
                      {course.level}
                    </Badge>
                  </div>
                  <CardDescription className="text-blue-600 mt-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className={`space-y-4 ${viewMode === "list" ? "p-0" : ""}`}>
                  {/* Course Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                    <div className="flex items-center text-blue-700">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-blue-700">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center text-blue-700">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {course.rating}
                    </div>
                    <div className="flex items-center text-blue-700">
                      <Target className="h-4 w-4 mr-1" />
                      {course.difficulty}/10
                    </div>
                  </div>

                  {/* Course Progress (if enrolled) */}
                  {course.enrolled && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-700">Progress</span>
                        <span className="text-blue-900 font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {course.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-blue-300 text-blue-700 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 4 && (
                      <Badge variant="outline" className="border-blue-300 text-blue-700 text-xs">
                        +{course.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Course Features */}
                  <div className="flex items-center justify-between text-sm text-blue-700">
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
                        <Award className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>Certificate</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Link to={`/course/${course.id}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group-hover:shadow-lg transition-all">
                      {course.enrolled ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Course
                        </>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-md border-blue-200 shadow-lg">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">No courses found</h3>
              <p className="text-blue-700 mb-4">
                Try adjusting your search criteria or browse our featured courses.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedLevel("All");
                  setShowFeaturedOnly(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Courses;
