
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award, TrendingUp, Crown, Medal } from "lucide-react";

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
    isCurrentUser: false
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
    isCurrentUser: false
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
    isCurrentUser: false
  },
  {
    rank: 4,
    name: "Alex Thompson",
    avatar: "/placeholder.svg",
    points: 12980,
    coursesCompleted: 6,
    streak: 28,
    level: "Advanced",
    badgeCount: 8,
    isCurrentUser: true
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
    isCurrentUser: false
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
    isCurrentUser: false
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
    isCurrentUser: false
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
    isCurrentUser: false
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
    isCurrentUser: false
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
    isCurrentUser: false
  }
];

const myStats = {
  rank: 4,
  points: 12980,
  pointsToNext: 770,
  totalUsers: 2847,
  percentile: 85.6
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="h-6 w-6 text-amber-400" />;
    case 2: return <Medal className="h-6 w-6 text-gray-400" />;
    case 3: return <Award className="h-6 w-6 text-amber-600" />;
    default: return <span className="text-lg font-bold text-slate-300">#{rank}</span>;
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert": return "bg-purple-500";
    case "Advanced": return "bg-blue-500";
    case "Intermediate": return "bg-green-500";
    case "Beginner": return "bg-orange-500";
    default: return "bg-gray-500";
  }
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
          </div>
          <p className="text-xl text-slate-300">See where you stand among top learners</p>
        </div>

        {/* My Position Card */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Your Position</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">#{myStats.rank}</p>
                <p className="text-slate-300">Current Rank</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{myStats.points.toLocaleString()}</p>
                <p className="text-slate-300">Total Points</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{myStats.percentile}%</p>
                <p className="text-slate-300">Top Percentile</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{myStats.pointsToNext}</p>
                <p className="text-slate-300">Points to Next Rank</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Progress to Rank #3</span>
                <span>{Math.round((myStats.pointsToNext / 1000) * 100)}%</span>
              </div>
              <Progress value={77} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <Card key={user.rank} className={`bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 ${
              index === 0 ? 'order-2 md:order-1 scale-105' : 
              index === 1 ? 'order-1 md:order-2' : 
              'order-3'
            }`}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    {getRankIcon(user.rank)}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <Badge className={`${getLevelColor(user.level)} text-white mt-1`}>
                    {user.level}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Points</span>
                    <span className="font-bold text-white">{user.points.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Courses</span>
                    <span>{user.coursesCompleted}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Streak</span>
                    <span>{user.streak} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Top Learners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaderboardData.map((user) => (
              <div 
                key={user.rank} 
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                  user.isCurrentUser 
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex-shrink-0 w-12 text-center">
                  {getRankIcon(user.rank)}
                </div>
                
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white">{user.name}</h3>
                    {user.isCurrentUser && (
                      <Badge className="bg-blue-500 text-white text-xs">You</Badge>
                    )}
                  </div>
                  <Badge className={`${getLevelColor(user.level)} text-white text-xs`}>
                    {user.level}
                  </Badge>
                </div>
                
                <div className="flex space-x-6 text-sm text-slate-300">
                  <div className="text-center">
                    <p className="font-bold text-white">{user.points.toLocaleString()}</p>
                    <p>Points</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-white">{user.coursesCompleted}</p>
                    <p>Courses</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-white">{user.streak}</p>
                    <p>Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-white">{user.badgeCount}</p>
                    <p>Badges</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Points System Info */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>How Points Work</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Complete Courses</h4>
              <p className="text-sm">Earn 1000-3000 points per completed course based on difficulty and length.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Daily Streaks</h4>
              <p className="text-sm">Get bonus points for consecutive learning days. Longer streaks = bigger bonuses!</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Community Activity</h4>
              <p className="text-sm">Help others in forums, join study groups, and participate in discussions.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
