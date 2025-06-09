
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign,
  Calendar,
  Globe,
  Smartphone,
  Monitor
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AdminAnalytics = () => {
  const userGrowthData = [
    { month: 'Jan', users: 1200, active: 980 },
    { month: 'Feb', users: 1350, active: 1100 },
    { month: 'Mar', users: 1500, active: 1250 },
    { month: 'Apr', users: 1680, active: 1420 },
    { month: 'May', users: 1850, active: 1580 },
    { month: 'Jun', users: 2100, active: 1800 },
  ];

  const coursePopularityData = [
    { name: 'React Development', students: 450, revenue: 112500 },
    { name: 'Digital Marketing', students: 380, revenue: 95000 },
    { name: 'Data Science', students: 320, revenue: 160000 },
    { name: 'UI/UX Design', students: 290, revenue: 87000 },
    { name: 'Python Programming', students: 250, revenue: 125000 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 35, color: '#10B981' },
    { name: 'Tablet', value: 20, color: '#F59E0B' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 85000, courses: 12 },
    { month: 'Feb', revenue: 92000, courses: 15 },
    { month: 'Mar', revenue: 108000, courses: 18 },
    { month: 'Apr', revenue: 125000, courses: 22 },
    { month: 'May', revenue: 140000, courses: 25 },
    { month: 'Jun', revenue: 158000, courses: 28 },
  ];

  const topMetrics = [
    {
      title: "Total Revenue",
      value: "₹15.8L",
      change: "+23.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: "1,847",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Course Completions",
      value: "892",
      change: "+8.7%",
      trend: "up",
      icon: BookOpen,
      color: "text-purple-600"
    },
    {
      title: "Avg. Session Time",
      value: "24m 32s",
      change: "+12.4%",
      trend: "up",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="flex items-center text-sm mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">{metric.change}</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth & Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} name="Total Users" />
                <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={2} name="Active Users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Course Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Popularity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Most Popular Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursePopularityData.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{course.name}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">{course.students} students</div>
                        <div className="text-xs text-gray-600">₹{course.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                    <Progress value={(course.students / 500) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {deviceData.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: device.color}} />
                    <span className="text-sm">{device.name}</span>
                  </div>
                  <span className="text-sm font-medium">{device.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Global Reach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>India</span>
                <span className="font-medium">68%</span>
              </div>
              <Progress value={68} />
              <div className="flex justify-between">
                <span>United States</span>
                <span className="font-medium">15%</span>
              </div>
              <Progress value={15} />
              <div className="flex justify-between">
                <span>United Kingdom</span>
                <span className="font-medium">8%</span>
              </div>
              <Progress value={8} />
              <div className="flex justify-between">
                <span>Others</span>
                <span className="font-medium">9%</span>
              </div>
              <Progress value={9} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Course Completion Rate</span>
                  <span className="text-sm font-medium">73%</span>
                </div>
                <Progress value={73} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Daily Active Users</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">User Retention (30d)</span>
                  <span className="text-sm font-medium">58%</span>
                </div>
                <Progress value={58} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800">Peak Hours</p>
                  <p className="text-xs text-green-600">6 PM - 9 PM</p>
                </div>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-800">Avg Load Time</p>
                  <p className="text-xs text-blue-600">1.2 seconds</p>
                </div>
                <Monitor className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-800">Mobile Traffic</p>
                  <p className="text-xs text-purple-600">35% of total</p>
                </div>
                <Smartphone className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
