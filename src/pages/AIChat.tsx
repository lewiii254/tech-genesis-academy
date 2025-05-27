
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Lightbulb, Code, BookOpen } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">AI Learning Assistant</h1>
          </div>
          <p className="text-xl text-slate-300">Get instant help with your coding questions</p>
        </div>

        {/* Chat Container */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 h-[600px] flex flex-col">
          <CardHeader className="border-b border-white/20">
            <CardTitle className="text-white flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>Chat Session</span>
            </CardTitle>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="mt-1">
                  <AvatarFallback className={msg.type === 'ai' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-green-500 text-white'}>
                    {msg.type === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`max-w-[80%] ${msg.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-4 rounded-lg ${
                    msg.type === 'ai' 
                      ? 'bg-white/10 border border-white/20 text-white' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}>
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {msg.message}
                    </pre>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          
          {/* Input Area */}
          <div className="border-t border-white/20 p-4 space-y-4">
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <suggestion.icon className="h-3 w-3 mr-1" />
                  <span className="text-xs">{suggestion.text}</span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {suggestion.category}
                  </Badge>
                </Button>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="flex space-x-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about programming, web development, databases..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-slate-400 resize-none"
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;
