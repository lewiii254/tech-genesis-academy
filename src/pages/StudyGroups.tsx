
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Calendar, Clock, MapPin, Plus, Search, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  members: number;
  maxMembers: number;
  meetingTime: string;
  location: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  organizer: string;
  nextMeeting: string;
}

const studyGroups: StudyGroup[] = [
  {
    id: "1",
    name: "React Masters",
    description: "Deep dive into React hooks, state management, and advanced patterns",
    subject: "Frontend Development",
    members: 12,
    maxMembers: 15,
    meetingTime: "Saturdays 2:00 PM",
    location: "iHub Nairobi / Online",
    difficulty: "Intermediate",
    tags: ["React", "JavaScript", "Frontend"],
    organizer: "Sarah Mwangi",
    nextMeeting: "Jan 13, 2024"
  },
  {
    id: "2",
    name: "Python for Data Science",
    description: "Learn pandas, numpy, and machine learning fundamentals",
    subject: "Data Science",
    members: 8,
    maxMembers: 12,
    meetingTime: "Wednesdays 6:30 PM",
    location: "Online",
    difficulty: "Beginner",
    tags: ["Python", "Data Science", "ML"],
    organizer: "David Kiprotich",
    nextMeeting: "Jan 10, 2024"
  },
  {
    id: "3",
    name: "Mobile App Dev Kenya",
    description: "Flutter and React Native development for African markets",
    subject: "Mobile Development",
    members: 15,
    maxMembers: 20,
    meetingTime: "Sundays 10:00 AM",
    location: "Kenyatta University",
    difficulty: "Intermediate",
    tags: ["Flutter", "React Native", "Mobile"],
    organizer: "Grace Wanjiku",
    nextMeeting: "Jan 14, 2024"
  },
  {
    id: "4",
    name: "Cybersecurity Fundamentals",
    description: "Network security, ethical hacking, and security best practices",
    subject: "Cybersecurity",
    members: 6,
    maxMembers: 10,
    meetingTime: "Fridays 7:00 PM",
    location: "Online",
    difficulty: "Advanced",
    tags: ["Security", "Networking", "Ethical Hacking"],
    organizer: "John Otieno",
    nextMeeting: "Jan 12, 2024"
  }
];

const StudyGroups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    subject: "",
    maxMembers: "",
    meetingTime: "",
    location: "",
    difficulty: "Beginner",
    tags: ""
  });
  const { toast } = useToast();

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === "All" || group.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Joined Study Group!",
      description: `You've successfully joined ${groupName}. Check your email for meeting details.`,
    });
  };

  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.description || !newGroup.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Study Group Created!",
      description: `${newGroup.name} has been created successfully. Members will be notified.`,
    });

    setNewGroup({
      name: "",
      description: "",
      subject: "",
      maxMembers: "",
      meetingTime: "",
      location: "",
      difficulty: "Beginner",
      tags: ""
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Study Groups</h1>
          <p className="text-xl text-slate-700">Join collaborative learning groups and accelerate your tech journey</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
            <Input
              placeholder="Search groups, subjects, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
            />
          </div>
          
          <div className="flex gap-4 items-center">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-slate-900">Create New Study Group</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Group Name *"
                      value={newGroup.name}
                      onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-600"
                    />
                    <Input
                      placeholder="Subject/Topic *"
                      value={newGroup.subject}
                      onChange={(e) => setNewGroup({...newGroup, subject: e.target.value})}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-600"
                    />
                    <Input
                      placeholder="Max Members"
                      type="number"
                      value={newGroup.maxMembers}
                      onChange={(e) => setNewGroup({...newGroup, maxMembers: e.target.value})}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-600"
                    />
                    <select
                      value={newGroup.difficulty}
                      onChange={(e) => setNewGroup({...newGroup, difficulty: e.target.value})}
                      className="bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-900"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <Input
                      placeholder="Meeting Time"
                      value={newGroup.meetingTime}
                      onChange={(e) => setNewGroup({...newGroup, meetingTime: e.target.value})}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-600"
                    />
                    <Input
                      placeholder="Location/Online"
                      value={newGroup.location}
                      onChange={(e) => setNewGroup({...newGroup, location: e.target.value})}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-600"
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Group Description *"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                    className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-600"
                    rows={3}
                  />
                  
                  <Input
                    placeholder="Tags (comma separated)"
                    value={newGroup.tags}
                    onChange={(e) => setNewGroup({...newGroup, tags: e.target.value})}
                    className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-600"
                  />
                  
                  <Button onClick={handleCreateGroup} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Create Study Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Study Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="bg-white border-slate-300 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-slate-900">{group.name}</CardTitle>
                    <p className="text-blue-700 font-medium">{group.subject}</p>
                  </div>
                  <Badge className={getDifficultyColor(group.difficulty)}>
                    {group.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-slate-700 text-sm">{group.description}</p>
                
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-800">{group.members}/{group.maxMembers} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-800">{group.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-800">{group.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-800">Next: {group.nextMeeting}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {group.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-slate-400 text-slate-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-slate-600">by {group.organizer}</span>
                  <Button 
                    size="sm"
                    onClick={() => handleJoinGroup(group.name)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={group.members >= group.maxMembers}
                  >
                    {group.members >= group.maxMembers ? "Full" : "Join Group"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No study groups found</h3>
            <p className="text-slate-600">Try adjusting your search or create a new group</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGroups;
