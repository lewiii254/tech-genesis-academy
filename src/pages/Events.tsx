
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Users, Video, Plus, Search, Filter, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  type: "Workshop" | "Webinar" | "Bootcamp" | "Networking";
  instructor: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  capacity: number;
  registered: number;
  price: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  image: string;
  isLive?: boolean;
  upcoming?: boolean;
}

const events: Event[] = [
  {
    id: "1",
    title: "React Performance Optimization Workshop",
    description: "Learn advanced techniques to optimize React applications for better performance and user experience.",
    type: "Workshop",
    instructor: "Sarah Mwangi",
    date: "2024-01-15",
    time: "14:00",
    duration: "3 hours",
    location: "Online via Zoom",
    capacity: 50,
    registered: 35,
    price: 2500,
    level: "Intermediate",
    tags: ["React", "Performance", "JavaScript"],
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400",
    upcoming: true
  },
  {
    id: "2",
    title: "AI & Machine Learning Bootcamp",
    description: "3-day intensive bootcamp covering Python, TensorFlow, and practical ML applications for African markets.",
    type: "Bootcamp",
    instructor: "David Kiprotich",
    date: "2024-01-20",
    time: "09:00",
    duration: "3 days",
    location: "iHub Nairobi",
    capacity: 30,
    registered: 28,
    price: 15000,
    level: "Beginner",
    tags: ["AI", "Machine Learning", "Python", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    upcoming: true
  },
  {
    id: "3",
    title: "Mobile App Monetization Strategies",
    description: "Explore different ways to monetize mobile apps in the African market with real case studies.",
    type: "Webinar",
    instructor: "Grace Wanjiku",
    date: "2024-01-12",
    time: "18:00",
    duration: "2 hours",
    location: "Online via Zoom",
    capacity: 100,
    registered: 67,
    price: 0,
    level: "Intermediate",
    tags: ["Mobile", "Business", "Monetization"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    isLive: true
  },
  {
    id: "4",
    title: "Tech Career Networking Night",
    description: "Connect with industry professionals, share experiences, and explore job opportunities in Kenya's tech scene.",
    type: "Networking",
    instructor: "Multiple Speakers",
    date: "2024-01-18",
    time: "19:00",
    duration: "3 hours",
    location: "Nairobi Garage",
    capacity: 80,
    registered: 45,
    price: 1000,
    level: "Beginner",
    tags: ["Networking", "Career", "Jobs"],
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
    upcoming: true
  },
  {
    id: "5",
    title: "Cybersecurity Fundamentals",
    description: "Essential cybersecurity practices for developers and businesses in the digital age.",
    type: "Workshop",
    instructor: "John Otieno",
    date: "2024-01-25",
    time: "15:00",
    duration: "4 hours",
    location: "Online via Teams",
    capacity: 40,
    registered: 22,
    price: 3500,
    level: "Beginner",
    tags: ["Cybersecurity", "Security", "Best Practices"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
    upcoming: true
  },
  {
    id: "6",
    title: "Blockchain Development Masterclass",
    description: "Build decentralized applications using Solidity and explore blockchain opportunities in Africa.",
    type: "Workshop",
    instructor: "Michael Njoroge",
    date: "2024-01-30",
    time: "10:00",
    duration: "6 hours",
    location: "University of Nairobi",
    capacity: 25,
    registered: 18,
    price: 8000,
    level: "Advanced",
    tags: ["Blockchain", "Solidity", "DApps", "Crypto"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
    upcoming: true
  }
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [showOnlyFree, setShowOnlyFree] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const { toast } = useToast();

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All" || event.type === selectedType;
    const matchesLevel = selectedLevel === "All" || event.level === selectedLevel;
    const matchesPrice = !showOnlyFree || event.price === 0;
    
    return matchesSearch && matchesType && matchesLevel && matchesPrice;
  });

  const handleRegister = (eventId: string, eventTitle: string, price: number) => {
    if (registeredEvents.includes(eventId)) {
      toast({
        title: "Already Registered",
        description: `You're already registered for ${eventTitle}`,
        variant: "destructive"
      });
      return;
    }

    setRegisteredEvents([...registeredEvents, eventId]);

    if (price === 0) {
      toast({
        title: "Registered Successfully!",
        description: `You've been registered for ${eventTitle}. Check your email for joining details.`,
      });
    } else {
      toast({
        title: "Registration Confirmed!",
        description: `Registration for ${eventTitle} confirmed. Payment of KES ${price.toLocaleString()} processed.`,
      });
    }
  };

  const handleJoinLive = (eventTitle: string) => {
    toast({
      title: "Joining Live Event",
      description: `Opening ${eventTitle} in a new window...`,
    });
  };

  const handleSetAlerts = () => {
    setAlertsEnabled(!alertsEnabled);
    toast({
      title: alertsEnabled ? "Alerts Disabled" : "Alerts Enabled",
      description: alertsEnabled 
        ? "You will no longer receive event notifications" 
        : "You'll now receive notifications for upcoming events",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Workshop": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Webinar": return "bg-green-100 text-green-800 border-green-200";
      case "Bootcamp": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Networking": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Live Events & Workshops</h1>
          <p className="text-xl text-slate-700">Join live learning sessions with industry experts</p>
          
          {/* Live Events Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-red-800">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="font-medium">Live Now:</span>
              <span>Mobile App Monetization Strategies</span>
              <Button 
                size="sm" 
                onClick={() => handleJoinLive("Mobile App Monetization Strategies")}
                className="ml-auto bg-red-600 hover:bg-red-700 text-white"
              >
                Join Live
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <Input
                placeholder="Search events, topics, or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
              />
            </div>
            
            <Button 
              onClick={handleSetAlerts}
              className={`${
                alertsEnabled 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              <Bell className="mr-2 h-4 w-4" />
              {alertsEnabled ? "Alerts On" : "Set Alerts"}
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900"
            >
              <option value="All">All Types</option>
              <option value="Workshop">Workshop</option>
              <option value="Webinar">Webinar</option>
              <option value="Bootcamp">Bootcamp</option>
              <option value="Networking">Networking</option>
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <label className="flex items-center gap-2 text-slate-800">
              <input
                type="checkbox"
                checked={showOnlyFree}
                onChange={(e) => setShowOnlyFree(e.target.checked)}
                className="rounded border-slate-400"
              />
              Free events only
            </label>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="bg-white border-slate-300 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                {event.isLive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                )}
                {event.upcoming && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    UPCOMING
                  </div>
                )}
                {registeredEvents.includes(event.id) && (
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    REGISTERED
                  </div>
                )}
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-slate-900 text-lg leading-tight">{event.title}</CardTitle>
                  <div className="flex flex-col gap-1">
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <Badge className={getLevelColor(event.level)}>
                      {event.level}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-slate-700 text-sm line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-800">{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-800">{event.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-800">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-800">{event.registered}/{event.capacity} registered</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {event.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-slate-400 text-slate-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <div>
                    <p className="text-slate-600 text-sm">by {event.instructor}</p>
                    <p className="text-slate-900 font-bold">
                      {event.price === 0 ? "FREE" : `KES ${event.price.toLocaleString()}`}
                    </p>
                  </div>
                  
                  {event.isLive ? (
                    <Button 
                      size="sm"
                      onClick={() => handleJoinLive(event.title)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Video className="mr-1 h-3 w-3" />
                      Join Live
                    </Button>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => handleRegister(event.id, event.title, event.price)}
                      className={`${
                        registeredEvents.includes(event.id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                      disabled={event.registered >= event.capacity && !registeredEvents.includes(event.id)}
                    >
                      {registeredEvents.includes(event.id)
                        ? "Registered"
                        : event.registered >= event.capacity 
                          ? "Full" 
                          : "Register"
                      }
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No events found</h3>
            <p className="text-slate-600">Try adjusting your filters or check back later for new events</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
