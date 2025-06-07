
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageCircle, Calendar, Plus, BookOpen } from "lucide-react";

const studyGroups = [
  {
    id: 1,
    name: "React Developers Circle",
    description: "Weekly discussions about React patterns, hooks, and best practices",
    members: 45,
    category: "Web Development",
    nextSession: "Tomorrow at 7:00 PM",
    isJoined: true,
    avatar: "/placeholder.svg",
    recentActivity: "Discussing React 18 features",
    topics: ["React", "Hooks", "State Management"]
  },
  {
    id: 2,
    name: "Python Data Science Club",
    description: "Learn data analysis, machine learning, and visualization with Python",
    members: 38,
    category: "Data Science",
    nextSession: "Friday at 6:00 PM",
    isJoined: true,
    avatar: "/placeholder.svg",
    recentActivity: "Working on pandas exercises",
    topics: ["Python", "Pandas", "ML"]
  },
  {
    id: 3,
    name: "UI/UX Design Studio",
    description: "Share designs, get feedback, and learn design principles together",
    members: 52,
    category: "Design",
    nextSession: "Sunday at 5:00 PM",
    isJoined: false,
    avatar: "/placeholder.svg",
    recentActivity: "Design challenge submissions",
    topics: ["Figma", "User Research", "Prototyping"]
  },
  {
    id: 4,
    name: "Full Stack Study Group",
    description: "End-to-end web development with MERN stack",
    members: 67,
    category: "Web Development",
    nextSession: "Wednesday at 8:00 PM",
    isJoined: true,
    avatar: "/placeholder.svg",
    recentActivity: "Building a collaborative project",
    topics: ["MongoDB", "Express", "React", "Node.js"]
  },
  {
    id: 5,
    name: "Database Optimization Team",
    description: "Learn SQL, NoSQL, and database performance tuning",
    members: 29,
    category: "Database",
    nextSession: "Thursday at 7:30 PM",
    isJoined: false,
    avatar: "/placeholder.svg",
    recentActivity: "Query optimization exercises",
    topics: ["SQL", "PostgreSQL", "Performance"]
  },
  {
    id: 6,
    name: "AI & Machine Learning Lab",
    description: "Explore AI concepts, build models, and discuss latest developments",
    members: 73,
    category: "AI/ML",
    nextSession: "Saturday at 4:00 PM",
    isJoined: false,
    avatar: "/placeholder.svg",
    recentActivity: "Neural network fundamentals",
    topics: ["TensorFlow", "PyTorch", "Deep Learning"]
  }
];

const Groups = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-emerald-900">Study Groups</h1>
          <p className="text-xl text-emerald-700">Join collaborative learning communities</p>
        </div>

        {/* Stats and Create Group */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-900">12</p>
              <p className="text-emerald-700">Active Groups</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-900">3</p>
              <p className="text-emerald-700">Joined Groups</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-900">156</p>
              <p className="text-emerald-700">Total Members</p>
            </div>
          </div>
          
          <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Study Group
          </Button>
        </div>

        {/* My Groups */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-emerald-900">My Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.filter(group => group.isJoined).map((group) => (
              <Card key={group.id} className="bg-white/90 backdrop-blur-md border-emerald-200 hover:bg-white/95 transition-all duration-300 relative overflow-hidden shadow-lg">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-500 text-white">Joined</Badge>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={group.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                        {group.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-emerald-900 text-lg">{group.name}</CardTitle>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs">
                        {group.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-emerald-700">
                    {group.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-emerald-700">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{group.nextSession}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {group.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="border-emerald-300 text-emerald-700 text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <p className="text-sm text-emerald-700">
                      <MessageCircle className="h-4 w-4 inline mr-1" />
                      {group.recentActivity}
                    </p>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Open Chat
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Groups */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-emerald-900">Discover Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.filter(group => !group.isJoined).map((group) => (
              <Card key={group.id} className="bg-white/90 backdrop-blur-md border-emerald-200 hover:bg-white/95 transition-all duration-300 overflow-hidden shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={group.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                        {group.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-emerald-900 text-lg">{group.name}</CardTitle>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs">
                        {group.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-emerald-700">
                    {group.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-emerald-700">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{group.nextSession}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {group.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="border-emerald-300 text-emerald-700 text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <p className="text-sm text-emerald-700">
                      <BookOpen className="h-4 w-4 inline mr-1" />
                      {group.recentActivity}
                    </p>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg">
                    Join Group
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

export default Groups;
