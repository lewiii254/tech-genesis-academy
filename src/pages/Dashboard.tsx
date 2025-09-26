
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Calendar, UsersRound, Award } from "lucide-react";
import { useProfile, Profile } from "@/hooks/useProfile";
import { useGameification } from "@/hooks/useGameification";
import MentorshipCard from "@/components/MentorshipCard";
import JobPlacementCard from "@/components/JobPlacementCard";
import CustomLearningPath from "@/components/CustomLearningPath";
import PaidCourses from "@/components/PaidCourses";

const Dashboard = () => {
  const { profile, loading } = useProfile();
  const { gameState } = useGameification();
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    // Load certificates from localStorage
    const storedCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    setCertificates(storedCertificates);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
        <div className="text-foreground text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Welcome back, {profile?.full_name || profile?.username || 'Learner'}! 👋
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">Courses Completed</p>
                  <p className="text-slate-900 text-xl sm:text-2xl font-bold">{certificates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-md">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center shadow-md">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Points</p>
                  <p className="text-slate-800 text-xl sm:text-2xl font-bold">{gameState.totalPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-md">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-md">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">Learning Streak</p>
                  <p className="text-slate-800 text-xl sm:text-2xl font-bold">{gameState.currentStreak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-md">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center shadow-md">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">Certificates Earned</p>
                  <p className="text-slate-800 text-xl sm:text-2xl font-bold">{certificates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Certificates */}
        {certificates.length > 0 && (
          <Card className="bg-white border-slate-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Recent Certificates</h3>
                <Button asChild variant="outline" size="sm">
                  <Link to="/certificates">View All</Link>
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.slice(0, 3).map((cert: any) => (
                  <div key={cert.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="h-8 w-8 text-amber-500" />
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{cert.courseTitle}</h4>
                        <p className="text-xs text-slate-600">Completed {new Date(cert.completedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">Certificate ID: {cert.certificateId}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* New Features Quick Access */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersRound className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Study Groups</h3>
              <p className="text-slate-600 text-sm mb-4">Join collaborative learning groups</p>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/study-groups">Join Groups</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Progress Analytics</h3>
              <p className="text-slate-600 text-sm mb-4">Track your learning insights</p>
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                <Link to="/analytics">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Live Events</h3>
              <p className="text-slate-600 text-sm mb-4">Join workshops and webinars</p>
              <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Link to="/events">Browse Events</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Premium Features Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <MentorshipCard />
          <JobPlacementCard />
        </div>

        {/* Custom Learning Path with Better Visibility */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <CustomLearningPath />
        </div>

        {/* Paid Courses Section with Better Visibility */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <PaidCourses />
        </div>

        {/* Additional Features */}
        <div className="text-center">
          <p className="text-slate-600 mb-4 font-medium">
            Unlock all premium features with TechLearn Pro
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg text-white"
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
