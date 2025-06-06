
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  speaker: string;
  description: string;
}

const events: Event[] = [
  {
    id: "1",
    title: "Kenya Tech Meetup 2024",
    type: "Networking",
    date: "Jan 25, 2024",
    time: "6:00 PM",
    location: "iHub Nairobi",
    attendees: 150,
    speaker: "Sarah Wanjiku - CTO, Flutterwave",
    description: "Connect with top tech professionals in Kenya"
  },
  {
    id: "2",
    title: "AI & Machine Learning Summit",
    type: "Conference",
    date: "Feb 2, 2024",
    time: "9:00 AM",
    location: "Virtual Event",
    attendees: 500,
    speaker: "Dr. James Mwangi - Lead AI Researcher",
    description: "Latest trends in AI and career opportunities"
  }
];

const NetworkingEvents = () => {
  const { toast } = useToast();

  const handleRegister = (eventTitle: string) => {
    toast({
      title: "Event Registration",
      description: `You've registered for ${eventTitle}. We'll send you details soon!`,
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-400" />
          Industry Networking Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border border-white/10 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-white font-medium">{event.title}</h4>
                <p className="text-slate-300 text-sm mt-1">{event.description}</p>
              </div>
              <Badge className="bg-orange-500/20 text-orange-400">
                {event.type}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{event.attendees} attendees</span>
              </div>
              <p className="font-medium text-white">{event.speaker}</p>
            </div>
            
            <Button 
              size="sm"
              onClick={() => handleRegister(event.title)}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
            >
              Register for Event
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NetworkingEvents;
