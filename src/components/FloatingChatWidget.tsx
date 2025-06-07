
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot' as const,
      message: 'Hello! I\'m here to help you learn about TechLearn Kenya. What would you like to know?',
      timestamp: new Date()
    }
  ]);

  const predefinedQuestions = [
    'What courses do you offer?',
    'How does the mentorship program work?',
    'What are the partnership benefits?',
    'How can I get started?'
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      message: message,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        message: getBotResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('course')) {
      return 'We offer comprehensive courses in Web Development, Data Science, Mobile Development, UI/UX Design, and more. All courses include hands-on projects and real-world applications.';
    }
    if (lowerMessage.includes('mentorship')) {
      return 'Our mentorship program connects you with industry experts who provide 1-on-1 guidance, career advice, and technical support throughout your learning journey.';
    }
    if (lowerMessage.includes('partnership')) {
      return 'TechLearn Kenya is proudly partnered with Power Learn Project, Safaricom, and S-Hook to provide enhanced learning opportunities and career placement support.';
    }
    if (lowerMessage.includes('start') || lowerMessage.includes('begin')) {
      return 'Getting started is easy! Sign up for a free account, browse our courses, and begin your learning journey. You can also join study groups and connect with mentors.';
    }
    
    return 'Thank you for your question! For more detailed information, please explore our courses section or contact our support team. Is there anything specific you\'d like to know about our programs?';
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        )}

        {/* Chat Widget */}
        {isOpen && (
          <Card className="w-80 h-96 bg-white/95 backdrop-blur-md border-emerald-200 shadow-xl">
            <CardHeader className="pb-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>TechLearn Assistant</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-emerald-800 h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-80">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex items-start space-x-2 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="w-6 h-6 mt-1">
                      <AvatarFallback className={msg.type === 'bot' ? 'bg-emerald-500 text-white text-xs' : 'bg-emerald-600 text-white text-xs'}>
                        {msg.type === 'bot' ? 'AI' : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[70%] ${msg.type === 'user' ? 'text-right' : ''}`}>
                      <div className={`p-2 rounded-lg text-xs ${
                        msg.type === 'bot' 
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                          : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Questions */}
              <div className="p-2 border-t border-emerald-200">
                <div className="flex flex-wrap gap-1 mb-2">
                  {predefinedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuestionClick(question)}
                      className="text-xs h-6 px-2 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-2 border-t border-emerald-200">
                <div className="flex space-x-2">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about our courses..."
                    className="flex-1 text-xs min-h-[32px] max-h-16 bg-emerald-50 border-emerald-200 text-emerald-900"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white h-8 w-8 p-0"
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default FloatingChatWidget;
