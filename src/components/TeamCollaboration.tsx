
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, MessageSquare, GitBranch, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Team {
  id: string;
  name: string;
  project: string;
  members: number;
  status: string;
  lastActivity: string;
  progress: number;
}

const teams: Team[] = [
  {
    id: "1",
    name: "React Masters",
    project: "E-commerce Platform",
    members: 4,
    status: "Active",
    lastActivity: "2 hours ago",
    progress: 75
  },
  {
    id: "2",
    name: "Data Wizards",
    project: "ML Prediction Model",
    members: 3,
    status: "Planning",
    lastActivity: "1 day ago",
    progress: 25
  }
];

const TeamCollaboration = () => {
  const { toast } = useToast();

  const handleJoinTeam = (teamName: string) => {
    toast({
      title: "Team Collaboration",
      description: `Joining ${teamName} for collaborative learning`,
    });
  };

  return (
    <Card className="bg-white border-slate-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Team Collaboration Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {teams.map((team) => (
          <div key={team.id} className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-slate-900 font-medium">{team.name}</h4>
                <p className="text-slate-700 text-sm">{team.project}</p>
              </div>
              <Badge className={`${
                team.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
              }`}>
                {team.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(Math.min(team.members, 3))].map((_, i) => (
                  <Avatar key={i} className="w-6 h-6 border-2 border-white">
                    <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {String.fromCharCode(65 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {team.members > 3 && (
                  <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-slate-700">+{team.members - 3}</span>
                  </div>
                )}
              </div>
              <span className="text-sm text-slate-700">{team.members} members</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-800">Chat</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitBranch className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-800">Code Review</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-800">{team.lastActivity}</span>
                </div>
              </div>
            </div>
            
            <Button 
              size="sm"
              onClick={() => handleJoinTeam(team.name)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              Join Team
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeamCollaboration;
