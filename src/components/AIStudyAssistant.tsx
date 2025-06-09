
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Brain, 
  MessageCircle, 
  Users, 
  Lightbulb, 
  Target, 
  Clock,
  TrendingUp,
  BookOpen,
  Send,
  Mic,
  Video
} from "lucide-react";

const AIStudyAssistant = () => {
  const [message, setMessage] = useState("");
  const [activeSession, setActiveSession] = useState(false);

  const studyMetrics = [
    { label: "Focus Score", value: "92%", trend: "+5%", color: "text-green-600" },
    { label: "Learning Speed", value: "1.3x", trend: "+12%", color: "text-blue-600" },
    { label: "Retention Rate", value: "87%", trend: "+8%", color: "text-purple-600" },
    { label: "Study Streak", value: "15 days", trend: "🔥", color: "text-orange-600" }
  ];

  const aiSuggestions = [
    "Review JavaScript fundamentals - You scored 78% last time",
    "Practice React hooks - 30 min session recommended",
    "Join AI study group - 3 peers online now",
    "Take a 5-min break - You've been studying for 45 minutes"
  ];

  const activePeers = [
    { name: "Sarah M.", subject: "React", status: "online" },
    { name: "John D.", subject: "Python", status: "studying" },
    { name: "Mike K.", subject: "AI/ML", status: "break" },
    { name: "Lisa R.", subject: "Blockchain", status: "online" }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("AI Assistant message:", message);
      setMessage("");
    }
  };

  const startStudySession = () => {
    setActiveSession(true);
    console.log("Starting AI-powered study session");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Brain className="h-8 w-8 text-purple-600" />
            AI Study Assistant
          </h2>
          <p className="text-muted-foreground">Your personalized learning companion powered by AI</p>
        </div>
        <Button 
          onClick={startStudySession}
          className={`${activeSession ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {activeSession ? 'End Session' : 'Start Study Session'}
        </Button>
      </div>

      {/* Study Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {studyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                </div>
                <span className={`text-sm font-medium ${metric.color}`}>{metric.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              AI Learning Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-64 overflow-y-auto mb-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-100 text-purple-600">AI</AvatarFallback>
                </Avatar>
                <div className="bg-purple-100 text-purple-900 p-3 rounded-lg max-w-xs">
                  Hello! I'm your AI study assistant. How can I help you learn today?
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-blue-100 text-blue-900 p-3 rounded-lg max-w-xs">
                  I'm struggling with React hooks. Can you help?
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">You</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-100 text-purple-600">AI</AvatarFallback>
                </Avatar>
                <div className="bg-purple-100 text-purple-900 p-3 rounded-lg max-w-xs">
                  Perfect! Let's start with useState. I'll create a personalized exercise for you based on your learning style.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ask your AI assistant anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg text-sm">
                    <p className="text-foreground">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Study Peers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Study Together
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activePeers.map((peer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{peer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-foreground">{peer.name}</p>
                        <p className="text-xs text-muted-foreground">{peer.subject}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={peer.status === 'online' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {peer.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Join Study Room
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Learning Path Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI-Optimized Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                ✓
              </div>
              <div>
                <p className="font-medium text-green-800">HTML/CSS Basics</p>
                <p className="text-sm text-green-600">Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-blue-800">JavaScript Fundamentals</p>
                <p className="text-sm text-blue-600">In Progress - 78%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-800">React Basics</p>
                <p className="text-sm text-gray-600">Recommended Next</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-10 h-10 bg-purple-400 text-white rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-purple-800">Advanced React</p>
                <p className="text-sm text-purple-600">Future Goal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIStudyAssistant;
