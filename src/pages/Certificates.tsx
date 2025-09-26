
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, Share, Calendar, Star, FileText, Shield, Verified } from "lucide-react";

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
    verified: true,
    institution: "TechLearn Academy",
    credentialUrl: "https://techlearn.edu/verify/MERN-2024-001234"
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
    verified: true,
    institution: "TechLearn Academy",
    credentialUrl: "https://techlearn.edu/verify/UXUI-2024-005678"
  },
  {
    id: 3,
    title: "Python for Data Science",
    issueDate: "December 20, 2024",
    completionDate: "December 18, 2024",
    courseHours: 100,
    grade: "A+",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    instructor: "Dr. Michael Chen",
    certificateNumber: "PYDS-2024-009876",
    verified: true,
    institution: "TechLearn Academy",
    credentialUrl: "https://techlearn.edu/verify/PYDS-2024-009876"
  },
  {
    id: 4,
    title: "Database Design & Management",
    issueDate: "November 15, 2024",
    completionDate: "November 12, 2024",
    courseHours: 90,
    grade: "A",
    skills: ["SQL", "PostgreSQL", "MongoDB", "Database Design"],
    instructor: "Jennifer Lopez",
    certificateNumber: "DB-2024-112233",
    verified: true,
    institution: "TechLearn Academy",
    credentialUrl: "https://techlearn.edu/verify/DB-2024-112233"
  }
];

const badges = [
  {
    id: 1,
    name: "Code Warrior",
    description: "Completed 5 programming courses",
    icon: "🏆",
    earnedDate: "December 15, 2024",
    rarity: "Epic",
    category: "Programming"
  },
  {
    id: 2,
    name: "Design Master",
    description: "Mastered UI/UX design principles",
    icon: "🎨",
    earnedDate: "November 28, 2024",
    rarity: "Rare",
    category: "Design"
  },
  {
    id: 3,
    name: "Community Helper",
    description: "Helped 50+ students in forums",
    icon: "🤝",
    earnedDate: "December 1, 2024",
    rarity: "Common",
    category: "Community"
  },
  {
    id: 4,
    name: "Study Streak",
    description: "30-day learning streak",
    icon: "🔥",
    earnedDate: "December 10, 2024",
    rarity: "Rare",
    category: "Achievement"
  },
  {
    id: 5,
    name: "Fast Learner",
    description: "Completed course in record time",
    icon: "⚡",
    earnedDate: "November 25, 2024",
    rarity: "Epic",
    category: "Achievement"
  },
  {
    id: 6,
    name: "Perfect Score",
    description: "Achieved 100% on final exam",
    icon: "⭐",
    earnedDate: "December 10, 2024",
    rarity: "Legendary",
    category: "Academic"
  },
  {
    id: 7,
    name: "Data Scientist",
    description: "Mastered Python for Data Science",
    icon: "📊",
    earnedDate: "December 20, 2024",
    rarity: "Epic",
    category: "Programming"
  },
  {
    id: 8,
    name: "Database Expert",
    description: "Advanced database management skills",
    icon: "🗄️",
    earnedDate: "November 15, 2024",
    rarity: "Rare",
    category: "Database"
  }
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common": return "bg-gray-500";
    case "Rare": return "bg-blue-500";
    case "Epic": return "bg-purple-500";
    case "Legendary": return "bg-amber-500";
    default: return "bg-gray-500";
  }
};

const handleDownloadCertificate = (certificateId: number) => {
  // Create a more realistic certificate content
  const cert = certificates.find(c => c.id === certificateId);
  if (!cert) return;

  const certificateHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Certificate - ${cert.title}</title>
        <style>
            body { 
                font-family: 'Times New Roman', serif; 
                margin: 0; 
                padding: 40px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .certificate {
                background: white;
                border: 8px solid #2c3e50;
                max-width: 800px;
                padding: 60px;
                text-align: center;
                box-shadow: 0 0 30px rgba(0,0,0,0.3);
                position: relative;
            }
            .certificate::before {
                content: '';
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                bottom: 20px;
                border: 2px solid #e74c3c;
                pointer-events: none;
            }
            .header { color: #2c3e50; margin-bottom: 30px; }
            .title { font-size: 36px; color: #e74c3c; margin: 20px 0; font-weight: bold; }
            .recipient { font-size: 28px; color: #2c3e50; margin: 30px 0; border-bottom: 2px solid #bdc3c7; padding-bottom: 10px; }
            .course { font-size: 24px; color: #27ae60; margin: 20px 0; font-style: italic; }
            .details { margin: 30px 0; color: #7f8c8d; }
            .signature { margin-top: 50px; display: flex; justify-content: space-between; }
            .sig-line { border-top: 1px solid #bdc3c7; width: 200px; padding-top: 10px; }
            .seal { position: absolute; top: 50px; right: 50px; width: 80px; height: 80px; border-radius: 50%; background: #e74c3c; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="seal">VERIFIED</div>
            <div class="header">
                <h1 style="margin: 0; font-size: 24px;">TECHLEARN ACADEMY</h1>
                <p style="margin: 5px 0; font-size: 14px;">Certificate of Completion</p>
            </div>
            
            <div class="title">CERTIFICATE OF ACHIEVEMENT</div>
            
            <p style="font-size: 18px; margin: 30px 0;">This is to certify that</p>
            
            <div class="recipient">Alex Thompson</div>
            
            <p style="font-size: 18px; margin: 20px 0;">has successfully completed the course</p>
            
            <div class="course">${cert.title}</div>
            
            <div class="details">
                <p><strong>Course Duration:</strong> ${cert.courseHours} hours</p>
                <p><strong>Grade Achieved:</strong> ${cert.grade}</p>
                <p><strong>Completion Date:</strong> ${cert.completionDate}</p>
                <p><strong>Certificate Number:</strong> ${cert.certificateNumber}</p>
                <p><strong>Skills Acquired:</strong> ${cert.skills.join(', ')}</p>
            </div>
            
            <div class="signature">
                <div class="sig-line">
                    <p style="margin: 0; font-size: 14px;">${cert.instructor}</p>
                    <p style="margin: 0; font-size: 12px;">Course Instructor</p>
                </div>
                <div class="sig-line">
                    <p style="margin: 0; font-size: 14px;">Dr. Sarah Wilson</p>
                    <p style="margin: 0; font-size: 12px;">Academy Director</p>
                </div>
            </div>
            
            <p style="font-size: 12px; margin-top: 30px; color: #95a5a6;">
                Verify this certificate at: ${cert.credentialUrl}
            </p>
        </div>
    </body>
    </html>
  `;

  const blob = new Blob([certificateHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const Certificates = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Certificates & Badges</h1>
          </div>
          <p className="text-xl text-slate-300">Your verified achievements and accomplishments</p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-amber-400" />
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
              <p className="text-2xl font-bold">300</p>
              <p className="text-slate-300">Study Hours</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <p className="text-2xl font-bold">100%</p>
              <p className="text-slate-300">Verified</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Certificates Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="h-8 w-8 text-amber-400" />
            Professional Certificates
          </h2>
          <div className="space-y-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border-b border-white/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-lg">
                            <Award className="h-8 w-8 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Verified className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-white">{cert.title}</CardTitle>
                          <CardDescription className="text-slate-300 text-lg">
                            {cert.institution} • Certificate of Completion
                          </CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-green-500 text-white">Verified</Badge>
                            <Badge className="bg-blue-500 text-white">Blockchain Secured</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white mb-1">{cert.grade}</div>
                        <p className="text-slate-300 text-sm">Final Grade</p>
                      </div>
                    </div>
                  </CardHeader>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Course Details
                      </h4>
                      <div className="space-y-2 text-slate-300">
                        <p><span className="font-medium">Instructor:</span> {cert.instructor}</p>
                        <p><span className="font-medium">Duration:</span> {cert.courseHours} hours</p>
                        <p><span className="font-medium">Completed:</span> {cert.completionDate}</p>
                        <p><span className="font-medium">Issued:</span> {cert.issueDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-3">Skills Mastered</h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-white/20 text-slate-300 bg-white/5">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-3">Verification</h4>
                      <div className="space-y-2 text-slate-300">
                        <p className="font-mono text-sm break-all">{cert.certificateNumber}</p>
                        <p className="text-xs">Verify at: <span className="text-blue-400">{cert.credentialUrl}</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4 border-t border-white/20">
                    <Button 
                      onClick={() => handleDownloadCertificate(cert.id)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" className="border-white/20 text-slate-300 hover:bg-white/10">
                      <Share className="h-4 w-4 mr-2" />
                      Share on LinkedIn
                    </Button>
                    <Button variant="outline" className="border-white/20 text-slate-300 hover:bg-white/10">
                      <Shield className="h-4 w-4 mr-2" />
                      Verify
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Badges Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Star className="h-8 w-8 text-purple-400" />
            Achievement Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge) => (
              <Card key={badge.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 text-center space-y-4 relative z-10">
                  <div className="relative">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                      {badge.icon}
                    </div>
                    <Badge className={`${getRarityColor(badge.rarity)} text-white absolute -top-2 -right-2 shadow-lg`}>
                      {badge.rarity}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{badge.name}</h3>
                    <Badge variant="outline" className="border-white/20 text-slate-400 mb-3 text-xs">
                      {badge.category}
                    </Badge>
                    <p className="text-slate-300 text-sm mb-3">{badge.description}</p>
                    <p className="text-slate-400 text-xs">Earned • {badge.earnedDate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <CardContent className="p-8 text-center relative z-10">
            <Award className="h-16 w-16 mx-auto mb-4 text-amber-400" />
            <h3 className="text-2xl font-bold text-white mb-4">Continue Your Learning Journey!</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Complete more courses to earn additional certificates and unlock exclusive badges. 
              Build your professional portfolio with industry-recognized credentials.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Browse Courses
              </Button>
              <Button variant="outline" className="border-white/20 text-slate-300 hover:bg-white/10">
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Certificates;
