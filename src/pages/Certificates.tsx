
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, Share, Calendar, Star } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Full Stack MERN Development",
    issueDate: "December 15, 2024",
    completionDate: "December 10, 2024",
    courseHours: 120,
    grade: "A+",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    instructor: "Sarah Johnson",
    certificateNumber: "MERN-2024-001234",
    verified: true
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    issueDate: "November 28, 2024",
    completionDate: "November 25, 2024",
    courseHours: 80,
    grade: "A",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    instructor: "Alex Rivera",
    certificateNumber: "UXUI-2024-005678",
    verified: true
  }
];

const badges = [
  {
    id: 1,
    name: "Code Warrior",
    description: "Completed 5 programming courses",
    icon: "🏆",
    earnedDate: "December 15, 2024",
    rarity: "Epic"
  },
  {
    id: 2,
    name: "Design Master",
    description: "Mastered UI/UX design principles",
    icon: "🎨",
    earnedDate: "November 28, 2024",
    rarity: "Rare"
  },
  {
    id: 3,
    name: "Community Helper",
    description: "Helped 50+ students in forums",
    icon: "🤝",
    earnedDate: "December 1, 2024",
    rarity: "Common"
  },
  {
    id: 4,
    name: "Study Streak",
    description: "30-day learning streak",
    icon: "🔥",
    earnedDate: "December 10, 2024",
    rarity: "Rare"
  },
  {
    id: 5,
    name: "Fast Learner",
    description: "Completed course in record time",
    icon: "⚡",
    earnedDate: "November 25, 2024",
    rarity: "Epic"
  },
  {
    id: 6,
    name: "Perfect Score",
    description: "Achieved 100% on final exam",
    icon: "⭐",
    earnedDate: "December 10, 2024",
    rarity: "Legendary"
  }
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common": return "bg-gray-500";
    case "Rare": return "bg-blue-500";
    case "Epic": return "bg-purple-500";
    case "Legendary": return "bg-yellow-500";
    default: return "bg-gray-500";
  }
};

const Certificates = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Certificates & Badges</h1>
          </div>
          <p className="text-xl text-slate-300">Your achievements and accomplishments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold">{certificates.length}</p>
              <p className="text-slate-300">Certificates</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <p className="text-2xl font-bold">{badges.length}</p>
              <p className="text-slate-300">Badges Earned</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold">200</p>
              <p className="text-slate-300">Study Hours</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-slate-300">Avg. Grade</p>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Certificates</h2>
          <div className="space-y-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border-b border-white/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
                          <Award className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-white">{cert.title}</CardTitle>
                          <CardDescription className="text-slate-300 text-lg">
                            Certificate of Completion
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-500 text-white mb-2">Verified</Badge>
                        <p className="text-slate-300 text-sm">Grade: {cert.grade}</p>
                      </div>
                    </div>
                  </CardHeader>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Course Details</h4>
                      <div className="space-y-1 text-slate-300">
                        <p>Instructor: {cert.instructor}</p>
                        <p>Duration: {cert.courseHours} hours</p>
                        <p>Completed: {cert.completionDate}</p>
                        <p>Issued: {cert.issueDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Skills Acquired</h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-white/20 text-slate-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Certificate ID</h4>
                      <p className="text-slate-300 font-mono text-sm">{cert.certificateNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4 border-t border-white/20">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="border-white/20 text-slate-300 hover:bg-white/10">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Achievement Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <Card key={badge.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {badge.icon}
                    </div>
                    <Badge className={`${getRarityColor(badge.rarity)} text-white absolute -top-2 -right-2`}>
                      {badge.rarity}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{badge.name}</h3>
                    <p className="text-slate-300 text-sm mb-3">{badge.description}</p>
                    <p className="text-slate-400 text-xs">Earned on {badge.earnedDate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Keep Learning, Keep Earning!</h3>
            <p className="text-slate-300 mb-6">Complete more courses to earn additional certificates and unlock exclusive badges.</p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Certificates;
