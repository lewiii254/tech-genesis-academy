import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Users, Calendar, Star, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import StreakCard from "@/components/StreakCard";
import MentorshipCard from "@/components/MentorshipCard";
import JobPlacementCard from "@/components/JobPlacementCard";
import CustomLearningPath from "@/components/CustomLearningPath";

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  duration_hours: number;
  thumbnail_url: string;
  is_published: boolean;
}

interface Enrollment {
  id: string;
  progress: number;
  course: Course;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch published courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .limit(6);

      // Fetch user enrollments
      const { data: enrollmentsData } = await supabase
        .from('enrollments')
        .select(`
          id,
          progress,
          course:courses (*)
        `)
        .eq('user_id', user.id);

      setCourses(coursesData || []);
      setEnrollments(enrollmentsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('enrollments')
      .insert([
        { user_id: user.id, course_id: courseId }
      ]);

    if (!error) {
      fetchData(); // Refresh data
    }
  };

  const completedCourses = enrollments.filter(e => e.progress >= 100).length;
  const studyGroups = 3; // This would come from a study_groups table
  const totalPoints = profile?.total_points || 0;

  const stats = [
    { label: "Courses Enrolled", value: enrollments.length.toString(), icon: BookOpen },
    { label: "Certificates Earned", value: completedCourses.toString(), icon: Award },
    { label: "Study Groups", value: studyGroups.toString(), icon: Users },
    { label: "Points Earned", value: totalPoints.toLocaleString(), icon: Star }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Welcome back, {profile?.full_name || 'Learner'}!
          </h1>
          <p className="text-xl text-slate-300">Continue your learning journey</p>
        </div>

        {/* AI Assistant Quick Access */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Learning Assistant</h3>
                  <p className="text-slate-300">Get instant help with your coding questions</p>
                </div>
              </div>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link to="/ai-chat">Ask AI</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-slate-300 text-sm">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Streak Card */}
          <div className="md:col-span-1">
            <StreakCard />
          </div>
        </div>

        {/* Premium Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomLearningPath />
          <MentorshipCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <JobPlacementCard />
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  Lifetime Access Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Access to all 50+ courses forever</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>New courses added monthly</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Downloadable resources & certificates</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Priority support & community access</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enrolled Courses */}
        {enrollments.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Your Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    <img 
                      src={enrollment.course.thumbnail_url || `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop`}
                      alt={enrollment.course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                        {enrollment.course.difficulty_level}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="text-white">
                    <CardTitle className="text-lg">{enrollment.course.title}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {enrollment.course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-slate-300">
                        <span>Progress</span>
                        <span>{Math.round(enrollment.progress)}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                    
                    <Button asChild className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
                      <Link to={`/course/${enrollment.course.id}`}>
                        Continue Learning
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Courses */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Available Courses</h2>
            <Button asChild className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
              <Link to="/courses">Browse All Courses</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const isEnrolled = enrollments.some(e => e.course.id === course.id);
              
              return (
                <Card key={course.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    <img 
                      src={course.thumbnail_url || `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop`}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                        {course.difficulty_level}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="text-white">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>{course.difficulty_level}</span>
                      <span>{course.duration_hours} hours</span>
                    </div>
                    
                    {isEnrolled ? (
                      <Button asChild className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
                        <Link to={`/course/${course.id}`}>
                          Continue Learning
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => enrollInCourse(course.id)}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                      >
                        Enroll Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
