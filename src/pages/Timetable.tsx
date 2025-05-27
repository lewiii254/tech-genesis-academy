
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users, Video, MapPin, Plus } from "lucide-react";

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const sessions = [
  {
    id: 1,
    title: "React Advanced Patterns",
    course: "Full Stack MERN Development",
    instructor: "Sarah Johnson",
    time: "09:00 - 10:30",
    day: "Monday",
    type: "Live Session",
    participants: 28,
    maxParticipants: 30,
    location: "Virtual Room A",
    description: "Deep dive into React patterns, custom hooks, and performance optimization"
  },
  {
    id: 2,
    title: "Python Data Structures",
    course: "Python for Data Science",
    instructor: "Mike Chen",
    time: "14:00 - 15:30",
    day: "Monday",
    type: "Workshop",
    participants: 22,
    maxParticipants: 25,
    location: "Virtual Room B",
    description: "Hands-on workshop covering lists, dictionaries, and sets"
  },
  {
    id: 3,
    title: "Design System Creation",
    course: "UI/UX Design Masterclass",
    instructor: "Alex Rivera",
    time: "18:00 - 19:30",
    day: "Tuesday",
    type: "Live Session",
    participants: 15,
    maxParticipants: 20,
    location: "Virtual Room C",
    description: "Learn to build scalable design systems with Figma"
  },
  {
    id: 4,
    title: "Database Optimization",
    course: "Database Design & Management",
    instructor: "David Kim",
    time: "10:00 - 11:30",
    day: "Wednesday",
    type: "Masterclass",
    participants: 18,
    maxParticipants: 25,
    location: "Virtual Room A",
    description: "Advanced SQL optimization techniques and indexing strategies"
  },
  {
    id: 5,
    title: "AI Code Review Session",
    course: "AI for Software Engineering",
    instructor: "Emma Wilson",
    time: "16:00 - 17:30",
    day: "Thursday",
    type: "Code Review",
    participants: 12,
    maxParticipants: 15,
    location: "Virtual Room D",
    description: "Review AI-assisted code and discuss best practices"
  },
  {
    id: 6,
    title: "Testing Automation Lab",
    course: "Software Testing Automation",
    instructor: "Lisa Wang",
    time: "11:00 - 12:30",
    day: "Friday",
    type: "Lab Session",
    participants: 20,
    maxParticipants: 25,
    location: "Virtual Room B",
    description: "Hands-on practice with Jest and Cypress testing frameworks"
  },
  {
    id: 7,
    title: "Project Showcase",
    course: "Full Stack MERN Development",
    instructor: "Sarah Johnson",
    time: "15:00 - 16:30",
    day: "Saturday",
    type: "Presentation",
    participants: 35,
    maxParticipants: 40,
    location: "Main Auditorium",
    description: "Students present their completed MERN stack projects"
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Live Session": return "bg-blue-500";
    case "Workshop": return "bg-green-500";
    case "Masterclass": return "bg-purple-500";
    case "Code Review": return "bg-orange-500";
    case "Lab Session": return "bg-teal-500";
    case "Presentation": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const Timetable = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Class Timetable</h1>
          </div>
          <p className="text-xl text-slate-300">Your weekly learning schedule</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <p className="text-2xl font-bold">{sessions.length}</p>
              <p className="text-slate-300">Weekly Sessions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-slate-300">Hours/Week</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <p className="text-2xl font-bold">6</p>
              <p className="text-slate-300">Active Courses</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 mx-auto mb-2 text-red-400" />
              <p className="text-2xl font-bold">3</p>
              <p className="text-slate-300">Today's Sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Sessions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Today's Sessions ({today})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.filter(session => session.day === today).map((session) => (
              <Card key={session.id} className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge className={`${getTypeColor(session.type)} text-white`}>
                      {session.type}
                    </Badge>
                    <div className="text-right">
                      <p className="text-white font-bold">{session.time}</p>
                      <p className="text-slate-300 text-sm">{session.day}</p>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg">{session.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-slate-300 text-sm">{session.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                        {session.instructor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm font-medium">{session.instructor}</p>
                      <p className="text-slate-300 text-xs">{session.course}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{session.participants}/{session.maxParticipants}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{session.location}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Video className="h-4 w-4 mr-2" />
                    Join Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Weekly Schedule</h2>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {weekDays.map((day) => (
              <div key={day} className="space-y-4">
                <h3 className={`text-lg font-semibold text-center p-3 rounded-lg ${
                  day === today 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-white/10 text-white'
                }`}>
                  {day}
                </h3>
                
                <div className="space-y-3">
                  {sessions.filter(session => session.day === day).map((session) => (
                    <Card key={session.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge className={`${getTypeColor(session.type)} text-white text-xs`}>
                            {session.type}
                          </Badge>
                          <p className="text-white text-sm font-bold">{session.time}</p>
                        </div>
                        
                        <h4 className="text-white font-medium text-sm line-clamp-2">{session.title}</h4>
                        <p className="text-slate-300 text-xs">{session.instructor}</p>
                        
                        <div className="flex items-center justify-between text-xs text-slate-300">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{session.participants}</span>
                          </div>
                          <span>{session.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Next 3 Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="flex-shrink-0">
                  <Badge className={`${getTypeColor(session.type)} text-white`}>
                    {session.type}
                  </Badge>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-white font-medium">{session.title}</h4>
                  <p className="text-slate-300 text-sm">{session.course}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-white font-bold">{session.day}</p>
                  <p className="text-slate-300 text-sm">{session.time}</p>
                </div>
                
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Join
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Timetable;
