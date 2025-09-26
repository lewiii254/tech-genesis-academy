
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Clock, Target, Award, BookOpen, Calendar, Download } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

const weeklyProgress = [
  { day: "Mon", hours: 2.5, points: 150 },
  { day: "Tue", hours: 3.2, points: 220 },
  { day: "Wed", hours: 1.8, points: 120 },
  { day: "Thu", hours: 4.1, points: 280 },
  { day: "Fri", hours: 2.7, points: 180 },
  { day: "Sat", hours: 5.2, points: 350 },
  { day: "Sun", hours: 3.8, points: 260 }
];

const monthlyProgress = [
  { month: "Jul", completed: 3, started: 5 },
  { month: "Aug", completed: 5, started: 7 },
  { month: "Sep", completed: 4, started: 6 },
  { month: "Oct", completed: 6, started: 8 },
  { month: "Nov", completed: 7, started: 9 },
  { month: "Dec", completed: 8, started: 10 }
];

const skillDistribution = [
  { name: "Frontend", value: 35, color: "#3B82F6" },
  { name: "Backend", value: 25, color: "#10B981" },
  { name: "Mobile", value: 20, color: "#F59E0B" },
  { name: "Data Science", value: 15, color: "#EF4444" },
  { name: "DevOps", value: 5, color: "#8B5CF6" }
];

const recentAchievements = [
  { title: "React Master", description: "Completed advanced React course", date: "2 days ago", points: 500 },
  { title: "7-Day Streak", description: "Maintained learning streak", date: "1 week ago", points: 200 },
  { title: "Quiz Champion", description: "Perfect score on JavaScript quiz", date: "1 week ago", points: 150 },
  { title: "Project Complete", description: "Built e-commerce website", date: "2 weeks ago", points: 800 }
];

const learningGoals = [
  { goal: "Complete 5 courses this month", progress: 80, current: 4, target: 5 },
  { goal: "Study 20 hours per week", progress: 65, current: 13, target: 20 },
  { goal: "Earn 10,000 points", progress: 75, current: 7500, target: 10000 },
  { goal: "Join 3 study groups", progress: 100, current: 3, target: 3 }
];

const Analytics = () => {
  const { profile } = useProfile();

  const totalHours = weeklyProgress.reduce((sum, day) => sum + day.hours, 0);
  const avgDailyHours = totalHours / 7;
  const totalPoints = weeklyProgress.reduce((sum, day) => sum + day.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Learning Analytics</h1>
            <p className="text-xl text-slate-600">Track your progress and optimize your learning journey</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Hours</p>
                  <p className="text-slate-900 text-2xl font-bold">{totalHours.toFixed(1)}</p>
                  <p className="text-green-600 text-xs">This week</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Points Earned</p>
                  <p className="text-slate-900 text-2xl font-bold">{totalPoints}</p>
                  <p className="text-green-600 text-xs">This week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Avg Daily</p>
                  <p className="text-slate-900 text-2xl font-bold">{avgDailyHours.toFixed(1)}h</p>
                  <p className="text-blue-600 text-xs">+0.5h from last week</p>
                </div>
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Learning Streak</p>
                  <p className="text-slate-900 text-2xl font-bold">{profile?.learning_streak || 0}</p>
                  <p className="text-green-600 text-xs">Days</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Progress Chart */}
          <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-slate-900">Weekly Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="hours" stroke="#2563EB" strokeWidth={3} />
                  <Line type="monotone" dataKey="points" stroke="#059669" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Courses Chart */}
          <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-slate-900">Monthly Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="completed" fill="#2563EB" />
                  <Bar dataKey="started" fill="#60A5FA" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Skills and Goals Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skill Distribution */}
          <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-slate-900">Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={skillDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {skillDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {skillDistribution.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: skill.color }}
                      />
                      <span className="text-sm text-slate-700">{skill.name} ({skill.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-slate-900">Learning Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">{goal.goal}</span>
                    <Badge className={`${goal.progress === 100 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {goal.current}/{goal.target}
                    </Badge>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${goal.progress === 100 ? 'bg-green-600' : 'bg-blue-600'}`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{goal.progress}% complete</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-slate-900">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 space-y-2 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-slate-900">{achievement.title}</span>
                  </div>
                  <p className="text-sm text-slate-600">{achievement.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">{achievement.date}</span>
                    <Badge className="bg-blue-100 text-blue-800">+{achievement.points} pts</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
