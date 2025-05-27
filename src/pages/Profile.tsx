
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Edit, Award, BookOpen, Users, Calendar, Star, TrendingUp, Settings } from "lucide-react";

const userProfile = {
  name: "Alex Thompson",
  email: "alex.thompson@email.com",
  avatar: "/placeholder.svg",
  joinDate: "September 15, 2024",
  lastActive: "2 hours ago",
  location: "San Francisco, CA",
  bio: "Full-stack developer passionate about learning new technologies and helping others in their coding journey.",
  level: "Advanced",
  currentStreak: 28,
  longestStreak: 45,
  totalPoints: 12980,
  rank: 4,
  coursesCompleted: 6,
  coursesInProgress: 4,
  certificatesEarned: 2,
  badgesEarned: 8,
  forumPosts: 23,
  studyGroups: 3
};

const recentActivity = [
  {
    type: "course_completion",
    title: "Completed: UI/UX Design Masterclass",
    date: "2 days ago",
    icon: Award,
    color: "text-green-400"
  },
  {
    type: "badge_earned",
    title: "Earned: Design Master Badge",
    date: "2 days ago",
    icon: Star,
    color: "text-yellow-400"
  },
  {
    type: "forum_post",
    title: "Posted in React Developers Circle",
    date: "3 days ago",
    icon: Users,
    color: "text-blue-400"
  },
  {
    type: "streak_milestone",
    title: "Achieved 25-day learning streak",
    date: "5 days ago",
    icon: TrendingUp,
    color: "text-purple-400"
  }
];

const skills = [
  { name: "React", level: 85, category: "Frontend" },
  { name: "Node.js", level: 78, category: "Backend" },
  { name: "Python", level: 70, category: "Programming" },
  { name: "UI/UX Design", level: 92, category: "Design" },
  { name: "MongoDB", level: 65, category: "Database" },
  { name: "TypeScript", level: 80, category: "Programming" }
];

const currentCourses = [
  {
    title: "AI for Software Engineering",
    progress: 45,
    nextLesson: "Neural Networks Basics",
    timeSpent: "12 hours"
  },
  {
    title: "Database Design & Management",
    progress: 68,
    nextLesson: "Query Optimization",
    timeSpent: "8 hours"
  },
  {
    title: "Software Testing Automation",
    progress: 23,
    nextLesson: "Jest Testing Framework",
    timeSpent: "4 hours"
  }
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">My Profile</h1>
          <p className="text-xl text-slate-300">Track your learning journey and achievements</p>
        </div>

        {/* Profile Header */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-4xl">
                    AT
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 bg-white/20 hover:bg-white/30">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-white">{userProfile.name}</h2>
                  <p className="text-slate-300">{userProfile.email}</p>
                  <p className="text-slate-400 text-sm">{userProfile.location}</p>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {userProfile.level} Level
                  </Badge>
                  <Badge variant="outline" className="border-white/20 text-slate-300">
                    Rank #{userProfile.rank}
                  </Badge>
                  <Badge variant="outline" className="border-white/20 text-slate-300">
                    {userProfile.currentStreak} Day Streak
                  </Badge>
                </div>
                
                <p className="text-slate-300 max-w-2xl">{userProfile.bio}</p>
                
                <div className="flex justify-center md:justify-start gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="border-white/20 text-slate-300 hover:bg-white/10">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <p className="text-xl font-bold">{userProfile.totalPoints.toLocaleString()}</p>
              <p className="text-slate-300 text-sm">Points</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <p className="text-xl font-bold">{userProfile.coursesCompleted}</p>
              <p className="text-slate-300 text-sm">Completed</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
              <p className="text-xl font-bold">{userProfile.certificatesEarned}</p>
              <p className="text-slate-300 text-sm">Certificates</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <p className="text-xl font-bold">{userProfile.badgesEarned}</p>
              <p className="text-slate-300 text-sm">Badges</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-pink-400" />
              <p className="text-xl font-bold">{userProfile.studyGroups}</p>
              <p className="text-slate-300 text-sm">Groups</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-orange-400" />
              <p className="text-xl font-bold">{userProfile.longestStreak}</p>
              <p className="text-slate-300 text-sm">Best Streak</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Courses */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Courses in Progress</CardTitle>
              <CardDescription className="text-slate-300">
                Continue your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentCourses.map((course, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-white">{course.title}</h4>
                    <Badge variant="outline" className="border-white/20 text-slate-300 text-xs">
                      {course.timeSpent}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-slate-300">
                    Next: {course.nextLesson}
                  </p>
                  
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Continue Learning
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Skills & Expertise</CardTitle>
              <CardDescription className="text-slate-300">
                Your skill levels across different areas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <Badge variant="outline" className="border-white/20 text-slate-300 text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <span className="text-slate-300 text-sm">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-300">
              Your latest achievements and interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className={`p-2 bg-white/10 rounded-lg ${activity.color}`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-slate-300 text-sm">{activity.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Profile Completion</h3>
                <p className="text-slate-300">Complete your profile to unlock more features</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">85%</p>
                <p className="text-slate-300 text-sm">Complete</p>
              </div>
            </div>
            <Progress value={85} className="h-3 mt-4" />
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Add Skills
              </Button>
              <Button size="sm" variant="outline" className="border-white/20 text-slate-300 hover:bg-white/10">
                Upload Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
