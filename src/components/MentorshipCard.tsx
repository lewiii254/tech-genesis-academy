
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Video, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MentorshipSession {
  id: string;
  mentorName: string;
  expertise: string;
  rating: number;
  duration: string;
  price: number;
  nextAvailable: string;
  avatar: string;
}

const mentorshipSessions: MentorshipSession[] = [
  {
    id: "1",
    mentorName: "Sarah Johnson",
    expertise: "Full Stack Development",
    rating: 4.9,
    duration: "60 min",
    price: 5000,
    nextAvailable: "Today 3:00 PM",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
  },
  {
    id: "2",
    mentorName: "David Chen",
    expertise: "Data Science & AI",
    rating: 4.8,
    duration: "45 min",
    price: 4500,
    nextAvailable: "Tomorrow 10:00 AM",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
  }
];

const MentorshipCard = () => {
  const { toast } = useToast();

  const handleBookSession = (mentorName: string, price: number) => {
    toast({
      title: "Session Booking",
      description: `Booking 1-on-1 session with ${mentorName} for KES ${price.toLocaleString()}`,
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Video className="h-5 w-5 text-blue-400" />
          1-on-1 Mentorship Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mentorshipSessions.map((session) => (
          <div key={session.id} className="border border-white/10 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <img 
                src={session.avatar} 
                alt={session.mentorName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="text-white font-medium">{session.mentorName}</h4>
                <p className="text-slate-300 text-sm">{session.expertise}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{session.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{session.duration}</span>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400">
                KES {session.price.toLocaleString()}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-slate-300">
                <Calendar className="h-4 w-4" />
                <span>{session.nextAvailable}</span>
              </div>
              <Button 
                size="sm"
                onClick={() => handleBookSession(session.mentorName, session.price)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Book Session
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MentorshipCard;
