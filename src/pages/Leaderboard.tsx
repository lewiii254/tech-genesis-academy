import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award, TrendingUp, Crown, Medal } from "lucide-react";
import { useGameification } from "@/hooks/useGameification";
import { useProfile } from "@/hooks/useProfile";

const Leaderboard = () => {
  const { gameState } = useGameification();
  const { profile } = useProfile();
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );
    setCertificates(storedCertificates);
  }, []);

  const getLevel = (points: number) => {
    if (points >= 10000) return "Expert";
    if (points >= 5000) return "Advanced";
    if (points >= 2000) return "Intermediate";
    return "Beginner";
  };

  const leaderboardData = [
    {
      rank: 1,
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg",
      points: 15240,
      coursesCompleted: 8,
      streak: 45,
      level: "Expert",
      badgeCount: 12,
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "James Chen",
      avatar: "/placeholder.svg",
      points: 14890,
      coursesCompleted: 7,
      streak: 38,
      level: "Expert",
      badgeCount: 11,
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "Sofia Martinez",
      avatar: "/placeholder.svg",
      points: 13750,
      coursesCompleted: 6,
      streak: 42,
      level: "Advanced",
      badgeCount: 9,
      isCurrentUser: false,
    },
    {
      rank: 4,
      name: profile?.full_name || profile?.username || "You",
      avatar: "/placeholder.svg",
      points: gameState.totalPoints,
      coursesCompleted: certificates.length,
      streak: gameState.currentStreak,
      level: getLevel(gameState.totalPoints),
      badgeCount: gameState.achievements.filter((a) => a.unlocked).length,
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "Maria Garcia",
      avatar: "/placeholder.svg",
      points: 11450,
      coursesCompleted: 5,
      streak: 35,
      level: "Advanced",
      badgeCount: 7,
      isCurrentUser: false,
    },
    {
      rank: 6,
      name: "David Kim",
      avatar: "/placeholder.svg",
      points: 10890,
      coursesCompleted: 5,
      streak: 22,
      level: "Intermediate",
      badgeCount: 6,
      isCurrentUser: false,
    },
    {
      rank: 7,
      name: "Lisa Wang",
      avatar: "/placeholder.svg",
      points: 9750,
      coursesCompleted: 4,
      streak: 19,
      level: "Intermediate",
      badgeCount: 5,
      isCurrentUser: false,
    },
    {
      rank: 8,
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      points: 8920,
      coursesCompleted: 4,
      streak: 15,
      level: "Intermediate",
      badgeCount: 4,
      isCurrentUser: false,
    },
    {
      rank: 9,
      name: "Anna Wilson",
      avatar: "/placeholder.svg",
      points: 8340,
      coursesCompleted: 3,
      streak: 12,
      level: "Intermediate",
      badgeCount: 4,
      isCurrentUser: false,
    },
    {
      rank: 10,
      name: "Ryan Miller",
      avatar: "/placeholder.svg",
      points: 7680,
      coursesCompleted: 3,
      streak: 8,
      level: "Beginner",
      badgeCount: 3,
      isCurrentUser: false,
    },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-amber-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-slate-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-white">{rank}</span>;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-purple-500";
      case "Advanced":
        return "bg-blue-500";
      case "Intermediate":
        return "bg-green-500";
      case "Beginner":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Leaderboard</h1>
          </div>
          <p className="text-xl text-slate-600">
            See where you stand among top learners
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {gameState.totalPoints}
              </div>
              <div className="text-slate-600">Your Points</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {certificates.length}
              </div>
              <div className="text-slate-600">Courses Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {gameState.currentStreak}
              </div>
              <div className="text-slate-600">Current Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">#{4}</div>
              <div className="text-slate-600">Your Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Top Learners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                  user.isCurrentUser
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex-shrink-0 w-12 text-center">
                  {getRankIcon(user.rank)}
                </div>

                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-slate-900">
                      {user.name}
                    </h4>
                    {user.isCurrentUser && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span>{user.points.toLocaleString()} points</span>
                    <span>•</span>
                    <span>{user.coursesCompleted} courses</span>
                    <span>•</span>
                    <span>{user.streak} day streak</span>
                  </div>
                </div>

                <div className="text-right">
                  <Badge
                    className={`${getLevelColor(user.level)} text-white mb-2`}
                  >
                    {user.level}
                  </Badge>
                  <div className="text-sm text-slate-600">
                    {user.badgeCount} badges
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievement Tips */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>How to Climb the Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 text-slate-600">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Complete Courses
              </h4>
              <p className="text-sm">
                Finish courses to earn significant points and certificates.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Maintain Streaks
              </h4>
              <p className="text-sm">
                Get bonus points for consecutive learning days. Longer streaks =
                bigger bonuses!
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Community Activity
              </h4>
              <p className="text-sm">
                Help others in forums, join study groups, and participate in
                discussions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Earn Achievements
              </h4>
              <p className="text-sm">
                Unlock badges and achievements for bonus points and recognition.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
