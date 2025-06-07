
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Lightbulb, Code, BookOpen, Sparkles, MessageCircle, Zap, Brain, FileText, Search, Settings, Mic, MicOff, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  type: "ai" | "user";
  message: string;
  timestamp: Date;
  context?: string;
}

const initialChatHistory: ChatMessage[] = [
  {
    id: "1",
    type: "ai",
    message: "Hello! I'm your advanced AI learning assistant. I can help you with programming concepts, code reviews, project ideas, study guidance, career advice, and much more. I can also analyze your code, suggest improvements, and provide personalized learning paths. What would you like to explore today?",
    timestamp: new Date(Date.now() - 300000)
  }
];

const enhancedSuggestions = [
  { icon: Code, text: "Explain async/await in JavaScript", category: "JavaScript", difficulty: "Intermediate" },
  { icon: BookOpen, text: "What is React state management?", category: "React", difficulty: "Beginner" },
  { icon: Lightbulb, text: "Give me a Python project idea", category: "Python", difficulty: "All Levels" },
  { icon: Code, text: "How to optimize database queries?", category: "Database", difficulty: "Advanced" },
  { icon: Brain, text: "Explain machine learning basics", category: "AI/ML", difficulty: "Beginner" },
  { icon: FileText, text: "Code review best practices", category: "Development", difficulty: "Intermediate" },
  { icon: Zap, text: "Performance optimization tips", category: "Performance", difficulty: "Advanced" },
  { icon: Search, text: "Data structures and algorithms", category: "CS Fundamentals", difficulty: "All Levels" }
];

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatHistory);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [chatMode, setChatMode] = useState<"general" | "code" | "career">("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const categories = ["All", "JavaScript", "React", "Python", "Database", "AI/ML", "Development", "Performance", "CS Fundamentals"];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (userMessage: string, mode: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (mode === "code") {
      if (lowerMessage.includes('function') || lowerMessage.includes('code')) {
        return "I'd be happy to help with your code! Here are some best practices:\n\n```javascript\n// Example of clean, efficient code\nconst fetchUserData = async (userId) => {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    if (!response.ok) throw new Error('Failed to fetch');\n    return await response.json();\n  } catch (error) {\n    console.error('Error fetching user data:', error);\n    return null;\n  }\n};\n```\n\nWould you like me to review specific code or explain any particular concept?";
      }
    }
    
    if (mode === "career") {
      return "For career development, I recommend:\n\n🚀 **Technical Skills**: Focus on in-demand technologies\n📝 **Portfolio**: Build impressive projects\n🤝 **Networking**: Join developer communities\n📚 **Continuous Learning**: Stay updated with trends\n💼 **Soft Skills**: Communication and problem-solving\n\nWhat specific aspect of your career would you like guidance on?";
    }

    // General responses
    if (lowerMessage.includes('async') || lowerMessage.includes('await')) {
      return "**Async/Await in JavaScript** 🚀\n\nAsync/await is a modern way to handle asynchronous operations:\n\n```javascript\n// Instead of callbacks or .then()\nasync function getData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}\n```\n\n**Key Benefits:**\n- Cleaner, more readable code\n- Better error handling\n- Easier debugging\n- Avoids callback hell\n\nWould you like me to explain error handling or show more advanced patterns?";
    }
    
    if (lowerMessage.includes('react') && lowerMessage.includes('state')) {
      return "**React State Management** ⚛️\n\n**Local State (useState):**\n```jsx\nconst [count, setCount] = useState(0);\n```\n\n**Global State Options:**\n🔹 **Context API** - Built-in, good for small apps\n🔹 **Redux Toolkit** - Predictable state container\n🔹 **Zustand** - Lightweight and simple\n🔹 **Recoil** - Facebook's experimental solution\n\n**When to use what:**\n- Local state: Component-specific data\n- Context: Theme, user auth, small global state\n- Redux: Complex apps with many state interactions\n\nWhat type of state management challenge are you facing?";
    }
    
    if (lowerMessage.includes('python') && lowerMessage.includes('project')) {
      return "**Exciting Python Project Ideas** 🐍\n\n**Beginner Level:**\n🎯 Personal expense tracker\n🌤️ Weather app with API integration\n📊 Data visualization dashboard\n\n**Intermediate Level:**\n🤖 Web scraper with BeautifulSoup\n📈 Stock price predictor\n🎮 Simple game with Pygame\n\n**Advanced Level:**\n🧠 Machine learning classifier\n🌐 REST API with FastAPI\n📱 Desktop GUI app with Tkinter\n\n**Current Trending:**\n- AI chatbots\n- Automation scripts\n- Data analysis tools\n\nWhich difficulty level interests you most?";
    }

    return "Thank you for your question! I'm here to provide detailed explanations and guidance. Could you please provide more specific details about what you'd like to learn? I can help with:\n\n🔹 Code explanations and reviews\n🔹 Project architecture advice\n🔹 Learning roadmaps\n🔹 Career guidance\n🔹 Best practices and patterns\n🔹 Debugging assistance\n\nFeel free to share code snippets, describe your challenges, or ask about specific technologies!";
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: message,
      timestamp: new Date(),
      context: chatMode
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        message: getAIResponse(message, chatMode),
        timestamp: new Date(),
        context: chatMode
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleCopyMessage = (messageText: string) => {
    navigator.clipboard.writeText(messageText);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard.",
    });
  };

  const handleExportChat = () => {
    const chatContent = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.type.toUpperCase()}: ${msg.message}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chat-export-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Chat Exported",
      description: "Your chat history has been downloaded.",
    });
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
    toast({
      title: isListening ? "Voice Input Stopped" : "Voice Input Started",
      description: isListening ? "Voice recognition stopped." : "Speak now...",
    });
  };

  const filteredSuggestions = selectedCategory === "All" 
    ? enhancedSuggestions 
    : enhancedSuggestions.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Enhanced Header */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg animate-pulse">
              <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">AI Learning Assistant</h1>
            <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 shadow-md">
              <Sparkles className="h-4 w-4 mr-1" />
              Enhanced AI
            </Badge>
          </div>
          <p className="text-lg sm:text-xl text-blue-700">Advanced coding assistance, career guidance, and personalized learning</p>
        </div>

        {/* Chat Mode Selector */}
        <div className="flex justify-center">
          <div className="bg-white/90 rounded-lg p-1 shadow-md flex space-x-1">
            {[
              { mode: "general", label: "General", icon: MessageCircle },
              { mode: "code", label: "Code Review", icon: Code },
              { mode: "career", label: "Career", icon: Brain }
            ].map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setChatMode(mode as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  chatMode === mode
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                    : "text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced AI Features Banner */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-blue-300 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto" />
                <h3 className="text-blue-900 font-medium text-sm sm:text-base">Smart Code Analysis</h3>
                <p className="text-blue-700 text-xs sm:text-sm">Advanced code review with optimization tips</p>
              </div>
              <div className="space-y-2">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto" />
                <h3 className="text-blue-900 font-medium text-sm sm:text-base">Personalized Learning</h3>
                <p className="text-blue-700 text-xs sm:text-sm">Adaptive study plans and concept explanations</p>
              </div>
              <div className="space-y-2">
                <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto" />
                <h3 className="text-blue-900 font-medium text-sm sm:text-base">Project Innovation</h3>
                <p className="text-blue-700 text-xs sm:text-sm">Creative project ideas to enhance your portfolio</p>
              </div>
              <div className="space-y-2">
                <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto" />
                <h3 className="text-blue-900 font-medium text-sm sm:text-base">Career Coaching</h3>
                <p className="text-blue-700 text-xs sm:text-sm">Professional development and interview prep</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Chat Container */}
        <Card className="bg-white/90 backdrop-blur-md border-blue-200 shadow-lg h-[500px] sm:h-[600px] flex flex-col">
          <CardHeader className="border-b border-blue-200 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-900 flex items-center space-x-2 text-lg sm:text-xl">
                <Bot className="h-5 w-5" />
                <span>Enhanced Chat Session</span>
                <Badge variant="outline" className="border-blue-300 text-blue-700 text-xs">
                  {chatMode.charAt(0).toUpperCase() + chatMode.slice(1)} Mode
                </Badge>
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportChat}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start space-x-2 sm:space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="mt-1 w-8 h-8 shrink-0">
                  <AvatarFallback className={msg.type === 'ai' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'bg-blue-500 text-white'}>
                    {msg.type === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`max-w-[85%] sm:max-w-[80%] ${msg.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-3 sm:p-4 rounded-lg ${
                    msg.type === 'ai' 
                      ? 'bg-blue-50 border border-blue-200 text-blue-900' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  }`}>
                    <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed">
                      {msg.message}
                    </pre>
                    {msg.type === 'ai' && (
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyMessage(msg.message)}
                          className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <Avatar className="mt-1 w-8 h-8 shrink-0">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          
          {/* Enhanced Input Area */}
          <div className="border-t border-blue-200 p-3 sm:p-4 space-y-3 sm:space-y-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-blue-700">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-blue-50 border border-blue-200 rounded px-2 py-1 text-blue-900"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Enhanced Suggestions */}
            <div className="flex flex-wrap gap-2">
              {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-900 text-xs flex items-center space-x-1"
                >
                  <suggestion.icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{suggestion.text}</span>
                  <span className="sm:hidden">{suggestion.category}</span>
                  <Badge variant="secondary" className="ml-1 text-xs bg-blue-100 text-blue-700">
                    {suggestion.difficulty}
                  </Badge>
                </Button>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about programming, career advice, project ideas..."
                className="flex-1 bg-blue-50 border-blue-200 text-blue-900 placeholder:text-blue-600 resize-none min-h-[60px] sm:min-h-[80px]"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
                <Button 
                  onClick={toggleVoiceInput}
                  variant="outline"
                  className={`border-blue-300 ${isListening ? 'bg-red-100 border-red-300 text-red-700' : 'text-blue-700 hover:bg-blue-50'} px-3 sm:px-4`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 sm:px-6"
                  disabled={isTyping}
                >
                  <Send className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;
