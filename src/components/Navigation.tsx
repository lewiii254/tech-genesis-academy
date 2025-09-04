
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  BookOpen, 
  Users, 
  Trophy, 
  User, 
  MessageSquare, 
  Calendar,
  Award,
  Briefcase,
  UserCheck,
  Menu,
  X,
  BarChart3,
  UsersRound,
  Video
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      title: "Learning",
      items: [
        { title: "Dashboard", href: "/dashboard", icon: BarChart3, description: "Your learning overview" },
        { title: "Courses", href: "/courses", icon: BookOpen, description: "Browse and take courses" },
        { title: "Progress Analytics", href: "/analytics", icon: BarChart3, description: "Track your learning progress" },
        { title: "Timetable", href: "/timetable", icon: Calendar, description: "Manage your study schedule" },
        { title: "Certificates", href: "/certificates", icon: Award, description: "View your achievements" },
      ]
    },
    {
      title: "Community",
      items: [
        { title: "Community", href: "/community", icon: Users, description: "Connect with other learners" },
        { title: "Study Groups", href: "/study-groups", icon: UsersRound, description: "Join collaborative learning groups" },
        { title: "Groups", href: "/groups", icon: Users, description: "Join interest groups" },
        { title: "Leaderboard", href: "/leaderboard", icon: Trophy, description: "See top performers" },
        { title: "Live Events", href: "/events", icon: Video, description: "Workshops and webinars" },
      ]
    },
    {
      title: "Career",
      items: [
        { title: "Jobs", href: "/jobs", icon: Briefcase, description: "Find tech opportunities" },
        { title: "Mentorship", href: "/mentorship", icon: UserCheck, description: "Get guidance from experts" },
      ]
    }
  ];

  const mobileMenuItems = [
    { title: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { title: "Courses", href: "/courses", icon: BookOpen },
    { title: "Analytics", href: "/analytics", icon: BarChart3 },
    { title: "Community", href: "/community", icon: Users },
    { title: "Study Groups", href: "/study-groups", icon: UsersRound },
    { title: "Events", href: "/events", icon: Video },
    { title: "Jobs", href: "/jobs", icon: Briefcase },
    { title: "Mentorship", href: "/mentorship", icon: UserCheck },
    { title: "AI Chat", href: "/ai-chat", icon: MessageSquare },
    { title: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-cyan-700 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">TechLearn Kenya</span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationItems.map((section) => (
                    <NavigationMenuItem key={section.title}>
                      <NavigationMenuTrigger className="text-foreground hover:text-primary">
                        {section.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                          {section.items.map((item) => (
                            <NavigationMenuLink key={item.href} asChild>
                              <Link
                                to={item.href}
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted",
                                  isActive(item.href) && "bg-primary/10 text-primary"
                                )}
                              >
                                <div className="flex items-center space-x-2">
                                  <item.icon className="h-4 w-4" />
                                  <div className="text-sm font-medium">{item.title}</div>
                                </div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                  
                  <NavigationMenuItem>
                    <Link
                      to="/ai-chat"
                      className={cn(
                        "inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus:bg-muted focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted data-[state=open]:bg-muted",
                        isActive("/ai-chat") && "bg-primary/10 text-primary"
                      )}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      AI Chat
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="border-border text-foreground hover:bg-muted"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && user && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="grid gap-2">
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-foreground hover:bg-muted",
                    isActive(item.href) && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
              
              <div className="border-t border-border pt-4 mt-4">
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-foreground hover:bg-muted"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-foreground hover:bg-muted w-full text-left"
                >
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Auth Menu (when not logged in) */}
        {isMobileMenuOpen && !user && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="grid gap-2">
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-foreground hover:bg-muted rounded-md"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 bg-primary text-white hover:bg-primary/90 rounded-md text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
