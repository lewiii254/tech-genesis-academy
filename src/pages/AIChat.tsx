
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Lightbulb, Code, BookOpen, Sparkles } from "lucide-react";

const chatHistory = [
  {
    id: 1,
    type: "ai",
    message: "Hello! I'm your AI learning assistant. I can help you with programming concepts, code reviews, project ideas, and study guidance. What would you like to learn about today?",
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: 2,
    type: "user",
    message: "Can you explain the difference between let, const, and var in JavaScript?",
    timestamp: new Date(Date.now() - 240000)
  },
  {
    id: 3,
    type: "ai",
    message: "Great question! Here are the key differences:\n\n**var:**\n- Function-scoped or globally-scoped\n- Can be redeclared and updated\n- Hoisted to the top of their scope\n\n**let:**\n- Block-scoped\n- Can be updated but not redeclared in the same scope\n- Hoisted but not initialized (temporal dead zone)\n\n**const:**\n- Block-scoped\n- Cannot be updated or redeclared\n- Must be initialized at declaration\n- Hoisted but not initialized\n\nFor modern JavaScript, prefer `const` for values that won't change and `let` for variables that will be reassigned. Avoid `var` in modern code.",
    timestamp: new Date(Date.now() - 180000)
  },
  {
    id: 4,
    type: "user",
    message: "That's helpful! Can you show me a code example?",
    timestamp: new Date(Date.now() - 120000)
  },
  {
    id: 5,
    type: "ai",
    message: "Absolutely! Here's a practical example:\n\n```javascript\n// const - for values that won't change\nconst PI = 3.14159;\nconst users = []; // The array can still be modified\n\n// let - for variables that will be reassigned\nlet counter = 0;\nlet userName = 'guest';\n\n// Block scope example\nif (true) {\n  let blockScoped = 'only accessible here';\n  const alsoBlockScoped = 'me too';\n}\n// console.log(blockScoped); // Error!\n\n// Reassignment\ncounter = 1; // ✅ Works with let\nuserName = 'john'; // ✅ Works with let\n// PI = 3.14; // ❌ Error with const\n```\n\nWould you like me to explain any specific part in more detail?",
    timestamp: new Date(Date.now() - 60000)
  }
];

const suggestions = [
  { icon: Code, text: "Explain async/await in JavaScript", category: "JavaScript" },
  { icon: BookOpen, text: "What is React state management?", category: "React" },
  { icon: Lightbulb, text: "Give me a Python project idea", category: "Python" },
  { icon: Code, text: "How to optimize database queries?", category: "Database" }
];

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatHistory);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: "user" as const,
      message: message,
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai" as const,
        message: "Thanks for your question! I'm processing your request and will provide a detailed explanation shortly. This is a simulated response for demonstration purposes.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg">
              <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900">AI Learning Assistant</h1>
            <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 shadow-md">
              <Sparkles className="h-4 w-4 mr-1" />
              Premium Feature
            </Badge>
          </div>
          <p className="text-lg sm:text-xl text-emerald-700">Get instant help with your coding questions and career guidance</p>
        </div>

        {/* AI Features Banner */}
        <Card className="bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 border-emerald-300 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mx-auto" />
                <h3 className="text-emerald-900 font-medium text-sm sm:text-base">Code Review</h3>
                <p className="text-emerald-700 text-xs sm:text-sm">Get feedback on your code quality and best practices</p>
              </div>
              <div className="space-y-2">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mx-auto" />
                <h3 className="text-emerald-900 font-medium text-sm sm:text-base">Learning Guidance</h3>
                <p className="text-emerald-700 text-xs sm:text-sm">Personalized study plans and concept explanations</p>
              </div>
              <div className="space-y-2">
                <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mx-auto" />
                <h3 className="text-emerald-900 font-medium text-sm sm:text-base">Project Ideas</h3>
                <p className="text-emerald-700 text-xs sm:text-sm">Creative project suggestions to build your portfolio</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Container */}
        <Card className="bg-white/90 backdrop-blur-md border-emerald-200 shadow-lg h-[500px] sm:h-[600px] flex flex-col">
          <CardHeader className="border-b border-emerald-200 py-3 sm:py-4">
            <CardTitle className="text-emerald-900 flex items-center space-x-2 text-lg sm:text-xl">
              <Bot className="h-5 w-5" />
              <span>Chat Session</span>
            </CardTitle>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start space-x-2 sm:space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="mt-1 w-8 h-8 shrink-0">
                  <AvatarFallback className={msg.type === 'ai' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'bg-emerald-500 text-white'}>
                    {msg.type === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`max-w-[85%] sm:max-w-[80%] ${msg.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-3 sm:p-4 rounded-lg ${
                    msg.type === 'ai' 
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white'
                  }`}>
                    <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed">
                      {msg.message}
                    </pre>
                  </div>
                  <p className="text-xs text-emerald-600 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          
          {/* Input Area */}
          <div className="border-t border-emerald-200 p-3 sm:p-4 space-y-3 sm:space-y-4">
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900 text-xs"
                >
                  <suggestion.icon className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">{suggestion.text}</span>
                  <span className="sm:hidden">{suggestion.category}</span>
                  <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs bg-emerald-100 text-emerald-700">
                    {suggestion.category}
                  </Badge>
                </Button>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about programming, web development, databases..."
                className="flex-1 bg-emerald-50 border-emerald-200 text-emerald-900 placeholder:text-emerald-600 resize-none min-h-[60px] sm:min-h-[80px]"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 px-4 sm:px-6 self-end sm:self-stretch"
              >
                <Send className="h-4 w-4" />
                <span className="ml-2 sm:hidden">Send</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;
