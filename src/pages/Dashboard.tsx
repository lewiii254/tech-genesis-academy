import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Calendar } from "lucide-react";
import { useProfile, Profile } from "@/hooks/useProfile";
import MentorshipCard from "@/components/MentorshipCard";
import JobPlacementCard from "@/components/JobPlacementCard";
import CustomLearningPath from "@/components/CustomLearningPath";
import PaidCourses from "@/components/PaidCourses";

interface DashboardProps {
  // You can define props here if needed
}

const Dashboard = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Welcome back, {profile?.full_name || profile?.username || 'Learner'}! 👋
          </h1>
          <p className="text-xl text-slate-300">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Courses Completed</p>
                  <p className="text-white text-2xl font-bold">{profile?.total_points ? Math.floor(profile.total_points / 100) : 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Total Points</p>
                  <p className="text-white text-2xl font-bold">{profile?.total_points || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Learning Streak</p>
                  <p className="text-white text-2xl font-bold">{profile?.learning_streak || 0} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <MentorshipCard />
          <JobPlacementCard />
        </div>

        {/* Custom Learning Path */}
        <CustomLearningPath />

        {/* Paid Courses Section */}
        <PaidCourses />

        {/* Additional Features */}
        <div className="text-center">
          <p className="text-slate-300 mb-4">
            Unlock all premium features with TechLearn Pro
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
