
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  MessageCircle, 
  Bot, 
  Award, 
  Trophy, 
  Calendar, 
  User, 
  Menu, 
  X,
  Home,
  Star
} from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/courses", icon: BookOpen, label: "Courses" },
  { path: "/community", icon: Users, label: "Community" },
  { path: "/ai-chat", icon: Bot, label: "AI Assistant" },
  { path: "/groups", icon: MessageCircle, label: "Study Groups" },
  { path: "/certificates", icon: Award, label: "Certificates" },
  { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { path: "/timetable", icon: Calendar, label: "Timetable" },
  { path: "/profile", icon: User, label: "Profile" }
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
          size="sm"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Profile - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-white font-semibold">2,450</span>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
              AT
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-black/50 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">TechLearn</h1>
            </div>
            <p className="text-slate-300 text-sm">Learn. Build. Excel.</p>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
                {item.path === "/ai-chat" && (
                  <Badge className="bg-green-500 text-white text-xs ml-auto">New</Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="bg-white/5 rounded-lg p-4 space-y-3">
            <h3 className="text-white font-semibold text-sm">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Current Streak</span>
                <span className="text-white font-semibold">28 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Points</span>
                <span className="text-white font-semibold">2,450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Rank</span>
                <span className="text-white font-semibold">#4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
