import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, Star, Video, Smartphone, Users, Award, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  experience: string;
  rating: number;
  sessions: number;
  hourlyRate: number;
  avatar: string;
  bio: string;
  availability: string[];
  languages: string[];
  achievements: string[];
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Software Engineer",
    company: "Safaricom PLC",
    expertise: ["React", "Node.js", "System Design", "Career Growth"],
    experience: "8+ years",
    rating: 4.9,
    sessions: 240,
    hourlyRate: 5000,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Senior engineer with extensive experience in full-stack development and team leadership at Kenya's leading tech companies.",
    availability: ["Mon 6PM-9PM", "Wed 6PM-9PM", "Sat 10AM-4PM"],
    languages: ["English", "Swahili"],
    achievements: ["AWS Certified", "Tech Lead at 3 startups", "Mentor of the Year 2023"]
  },
  {
    id: "2",
    name: "David Chen",
    title: "Data Science Manager",
    company: "Equity Bank",
    expertise: ["Machine Learning", "Python", "Data Analysis", "AI Strategy"],
    experience: "10+ years",
    rating: 4.8,
    sessions: 180,
    hourlyRate: 6000,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Data science leader helping organizations leverage AI and machine learning for business growth.",
    availability: ["Tue 7PM-10PM", "Thu 7PM-10PM", "Sun 2PM-6PM"],
    languages: ["English", "Mandarin"],
    achievements: ["PhD in Computer Science", "Published 15+ papers", "Built ML team from 0 to 20"]
  },
  {
    id: "3",
    name: "Grace Wanjiku",
    title: "Mobile App Development Lead",
    company: "M-Shule",
    expertise: ["Flutter", "React Native", "iOS", "Android", "Product Management"],
    experience: "6+ years",
    rating: 4.9,
    sessions: 150,
    hourlyRate: 4500,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    bio: "Mobile development expert passionate about building educational technology that impacts millions across Africa.",
    availability: ["Mon 7PM-10PM", "Fri 6PM-9PM", "Sat 2PM-6PM"],
    languages: ["English", "Swahili", "Kikuyu"],
    achievements: ["Apps with 1M+ downloads", "Google Developer Expert", "Women in Tech Leader"]
  },
  {
    id: "4",
    name: "Michael Mutua",
    title: "DevOps Architect",
    company: "Twiga Foods",
    expertise: ["AWS", "Kubernetes", "CI/CD", "Infrastructure", "Security"],
    experience: "12+ years",
    rating: 4.7,
    sessions: 200,
    hourlyRate: 7000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Cloud infrastructure expert helping companies scale their systems to serve millions of users across Africa.",
    availability: ["Wed 8PM-11PM", "Sat 9AM-1PM", "Sun 3PM-7PM"],
    languages: ["English", "Swahili"],
    achievements: ["AWS Solutions Architect", "Scaled systems to 10M users", "Conference Speaker"]
  },
  {
    id: "5",
    name: "Dr. James Ochieng",
    title: "AI Research Scientist",
    company: "University of Nairobi",
    expertise: ["Machine Learning", "Deep Learning", "Research", "Academic Writing"],
    experience: "15+ years",
    rating: 4.9,
    sessions: 95,
    hourlyRate: 8000,
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    bio: "Leading AI researcher with focus on applications of machine learning in African contexts and agricultural technology.",
    availability: ["Tue 4PM-7PM", "Thu 4PM-7PM", "Sat 10AM-2PM"],
    languages: ["English", "Swahili", "Luo"],
    achievements: ["PhD from MIT", "50+ publications", "UNESCO AI Expert"]
  },
  {
    id: "6",
    name: "Mary Njeri",
    title: "Cybersecurity Consultant",
    company: "PwC Kenya",
    expertise: ["Cybersecurity", "Risk Assessment", "Compliance", "Incident Response"],
    experience: "9+ years",
    rating: 4.8,
    sessions: 120,
    hourlyRate: 5500,
    avatar: "https://images.unsplash.com/photo-1594736797933-d0c64e8fb04e?w=150&h=150&fit=crop&crop=face",
    bio: "Cybersecurity expert helping organizations protect their digital assets and comply with international security standards.",
    availability: ["Mon 6PM-9PM", "Wed 6PM-9PM", "Fri 7PM-10PM"],
    languages: ["English", "Swahili"],
    achievements: ["CISSP Certified", "Led 100+ security audits", "Cybersecurity Trainer"]
  }
];

const Mentorship = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookingData, setBookingData] = useState({
    sessionType: "1-hour",
    date: "",
    time: "",
    phoneNumber: "",
    goals: "",
    experience: ""
  });
  const { toast } = useToast();

  const getSessionPrice = (hourlyRate: number, type: string) => {
    switch (type) {
      case "30-min":
        return Math.round(hourlyRate * 0.5);
      case "1-hour":
        return hourlyRate;
      case "2-hour":
        return hourlyRate * 2;
      default:
        return hourlyRate;
    }
  };

  const handleBooking = () => {
    if (!selectedMentor) return;

    if (!bookingData.date || !bookingData.time || !bookingData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const price = getSessionPrice(selectedMentor.hourlyRate, bookingData.sessionType);

    // Simulate M-PESA payment
    toast({
      title: "M-PESA Payment Initiated",
      description: `Please check your phone (${bookingData.phoneNumber}) for the M-PESA prompt to pay KES ${price.toLocaleString()}.`,
    });

    // Simulate booking confirmation
    setTimeout(() => {
      toast({
        title: "Session Booked Successfully!",
        description: `Your ${bookingData.sessionType} session with ${selectedMentor.name} is confirmed for ${bookingData.date} at ${bookingData.time}.`,
      });
      setSelectedMentor(null);
      setBookingData({
        sessionType: "1-hour",
        date: "",
        time: "",
        phoneNumber: "",
        goals: "",
        experience: ""
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">1-on-1 Mentorship</h1>
          <p className="text-xl text-slate-600">Get personalized guidance from industry experts</p>
          <div className="flex justify-center gap-8 text-slate-600">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-600" />
              <span>Video Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <span>{mentors.length} Expert Mentors</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-orange-600" />
              <span>Pay via M-PESA</span>
            </div>
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="bg-white border-slate-200 hover:border-blue-300 transition-all shadow-md">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <img 
                    src={mentor.avatar} 
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-slate-800 text-lg">{mentor.name}</CardTitle>
                    <p className="text-slate-600 text-sm">{mentor.title}</p>
                    <p className="text-slate-500 text-xs">{mentor.company}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    <span className="text-slate-600 text-sm">{mentor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.slice(0, 3).map((skill, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700 text-xs border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-sm text-slate-600">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4" />
                      <span>{mentor.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{mentor.sessions} sessions completed</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm line-clamp-2">{mentor.bio}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-green-600 font-bold">
                      KES {mentor.hourlyRate.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-sm">/hour</span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => setSelectedMentor(mentor)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Book Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-slate-200">
                    <DialogHeader>
                      <DialogTitle className="text-slate-800 flex items-center gap-3">
                        <img 
                          src={mentor.avatar} 
                          alt={mentor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        Book Session with {mentor.name}
                      </DialogTitle>
                      <DialogDescription className="text-slate-600">
                        {mentor.title} at {mentor.company}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 text-slate-600">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">About {mentor.name}</h4>
                        <p className="mb-3">{mentor.bio}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <strong className="text-slate-800">Expertise:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {mentor.expertise.map((skill, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-700 text-xs border-blue-200">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <strong className="text-slate-800">Languages:</strong> {mentor.languages.join(", ")}
                          </div>
                          
                          <div>
                            <strong className="text-slate-800">Achievements:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {mentor.achievements.map((achievement, index) => (
                                <li key={index} className="text-sm">{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Book Your Session</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-800 mb-2">Session Duration</label>
                            <select
                              value={bookingData.sessionType}
                              onChange={(e) => setBookingData({...bookingData, sessionType: e.target.value})}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800"
                            >
                              <option value="30-min">30 minutes - KES {getSessionPrice(mentor.hourlyRate, "30-min").toLocaleString()}</option>
                              <option value="1-hour">1 hour - KES {getSessionPrice(mentor.hourlyRate, "1-hour").toLocaleString()}</option>
                              <option value="2-hour">2 hours - KES {getSessionPrice(mentor.hourlyRate, "2-hour").toLocaleString()}</option>
                            </select>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-800 mb-2">Preferred Date</label>
                              <Input
                                type="date"
                                value={bookingData.date}
                                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                                className="bg-white border-slate-300 text-slate-800"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-800 mb-2">Preferred Time</label>
                              <Input
                                type="time"
                                value={bookingData.time}
                                onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                                className="bg-white border-slate-300 text-slate-800"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-800 mb-2">M-PESA Phone Number</label>
                            <Input
                              type="tel"
                              placeholder="0712345678"
                              value={bookingData.phoneNumber}
                              onChange={(e) => setBookingData({...bookingData, phoneNumber: e.target.value})}
                              className="bg-white border-slate-300 text-slate-800"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-800 mb-2">Your Experience Level</label>
                            <select
                              value={bookingData.experience}
                              onChange={(e) => setBookingData({...bookingData, experience: e.target.value})}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800"
                            >
                              <option value="">Select your level</option>
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-800 mb-2">What would you like to discuss?</label>
                            <Textarea
                              placeholder="Describe your goals and what you'd like to achieve from this session..."
                              value={bookingData.goals}
                              onChange={(e) => setBookingData({...bookingData, goals: e.target.value})}
                              className="bg-white border-slate-300 text-slate-800"
                              rows={3}
                            />
                          </div>
                          
                          <div className="border-t border-slate-200 pt-4">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-slate-800 font-medium">Total Amount:</span>
                              <span className="text-green-600 font-bold text-lg">
                                KES {getSessionPrice(mentor.hourlyRate, bookingData.sessionType).toLocaleString()}
                              </span>
                            </div>
                            
                            <Button 
                              onClick={handleBooking}
                              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                            >
                              <Smartphone className="mr-2 h-4 w-4" />
                              Pay & Book Session
                            </Button>
                            
                            <p className="text-xs text-slate-500 text-center mt-2">
                              Secure payment via M-PESA • Session link will be sent via SMS
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Availability</h4>
                        <div className="space-y-1">
                          {mentor.availability.map((slot, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{slot}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
