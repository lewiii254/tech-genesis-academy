
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Briefcase, MapPin, DollarSign, Clock, Building, Phone, Mail, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  postedAt: string;
  description: string;
  requirements: string[];
  benefits: string[];
  logo: string;
  ussdCode?: string;
  applicationMethod: "online" | "ussd" | "both";
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Safaricom PLC",
    location: "Nairobi, Kenya",
    salary: "KES 180,000 - 300,000",
    type: "Full-time",
    experience: "3-5 years",
    postedAt: "2 days ago",
    description: "Join Safaricom's digital transformation team to build cutting-edge web applications that serve millions of Kenyans.",
    requirements: ["React/Vue.js experience", "TypeScript proficiency", "REST API integration", "Mobile-first design"],
    benefits: ["Medical insurance", "Performance bonuses", "Learning budget", "Flexible working"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop",
    ussdCode: "*234*1#",
    applicationMethod: "both"
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "Equity Bank",
    location: "Nairobi, Kenya",
    salary: "KES 200,000 - 350,000",
    type: "Full-time",
    experience: "2-4 years",
    postedAt: "1 week ago",
    description: "Analyze financial data to drive business insights and improve customer experience.",
    requirements: ["Python/R programming", "Machine Learning", "SQL expertise", "Statistical analysis"],
    benefits: ["Health insurance", "Pension scheme", "Annual bonus", "Professional development"],
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=64&h=64&fit=crop",
    ussdCode: "*234*2#",
    applicationMethod: "both"
  },
  {
    id: "3",
    title: "Mobile App Developer",
    company: "M-Shule",
    location: "Nairobi, Kenya",
    salary: "KES 120,000 - 200,000",
    type: "Full-time",
    experience: "2-3 years",
    postedAt: "3 days ago",
    description: "Develop educational mobile applications that democratize learning across Africa.",
    requirements: ["Flutter/React Native", "API integration", "Firebase", "Android/iOS publishing"],
    benefits: ["Stock options", "Remote work", "Learning allowance", "Team retreats"],
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop",
    ussdCode: "*234*3#",
    applicationMethod: "both"
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "Twiga Foods",
    location: "Nairobi, Kenya",
    salary: "KES 150,000 - 250,000",
    type: "Full-time",
    experience: "3-5 years",
    postedAt: "5 days ago",
    description: "Manage cloud infrastructure and deployment pipelines for Africa's largest B2B marketplace.",
    requirements: ["AWS/Azure experience", "Docker/Kubernetes", "CI/CD pipelines", "Infrastructure as Code"],
    benefits: ["Medical cover", "Performance bonus", "Training budget", "Meal allowances"],
    logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=64&h=64&fit=crop",
    ussdCode: "*234*4#",
    applicationMethod: "online"
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "Kopo Kopo",
    location: "Nairobi, Kenya",
    salary: "KES 140,000 - 220,000",
    type: "Full-time",
    experience: "2-4 years",
    postedAt: "1 week ago",
    description: "Build robust payment processing systems serving thousands of merchants across Kenya.",
    requirements: ["Node.js/Python", "Database design", "Payment integrations", "API development"],
    benefits: ["Health insurance", "Flexible hours", "Learning budget", "Team building"],
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=64&h=64&fit=crop",
    applicationMethod: "online"
  },
  {
    id: "6",
    title: "UI/UX Designer",
    company: "Branch International",
    location: "Nairobi, Kenya",
    salary: "KES 100,000 - 180,000",
    type: "Full-time",
    experience: "2-3 years",
    postedAt: "4 days ago",
    description: "Design intuitive financial products that improve financial inclusion across emerging markets.",
    requirements: ["Figma/Sketch expertise", "User research", "Prototyping", "Design systems"],
    benefits: ["Medical insurance", "Design tools allowance", "Conference attendance", "Remote work options"],
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=64&h=64&fit=crop",
    ussdCode: "*234*6#",
    applicationMethod: "both"
  },
  {
    id: "7",
    title: "Cybersecurity Specialist",
    company: "Kenya Commercial Bank",
    location: "Nairobi, Kenya",
    salary: "KES 160,000 - 280,000",
    type: "Full-time",
    experience: "3-6 years",
    postedAt: "6 days ago",
    description: "Protect critical banking infrastructure and ensure compliance with financial security standards.",
    requirements: ["Security frameworks", "Penetration testing", "Risk assessment", "Incident response"],
    benefits: ["Comprehensive insurance", "Security certifications", "Annual bonus", "Career progression"],
    logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=64&h=64&fit=crop",
    applicationMethod: "online"
  },
  {
    id: "8",
    title: "Product Manager",
    company: "Sendy",
    location: "Nairobi, Kenya",
    salary: "KES 180,000 - 320,000",
    type: "Full-time",
    experience: "4-6 years",
    postedAt: "1 week ago",
    description: "Lead product strategy for Kenya's leading on-demand logistics platform.",
    requirements: ["Product strategy", "Data analysis", "User research", "Cross-functional leadership"],
    benefits: ["Stock options", "Health cover", "Product training", "Leadership development"],
    logo: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=64&h=64&fit=crop",
    ussdCode: "*234*8#",
    applicationMethod: "both"
  },
  {
    id: "9",
    title: "Cloud Architect",
    company: "Liquid Telecom",
    location: "Nairobi, Kenya",
    salary: "KES 220,000 - 400,000",
    type: "Full-time",
    experience: "5-8 years",
    postedAt: "3 days ago",
    description: "Design and implement cloud solutions for enterprise clients across East Africa.",
    requirements: ["Cloud architecture", "Multi-cloud experience", "Enterprise solutions", "Team leadership"],
    benefits: ["Premium medical", "Cloud certifications", "Performance bonuses", "International exposure"],
    logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=64&h=64&fit=crop",
    applicationMethod: "online"
  },
  {
    id: "10",
    title: "Software Engineer Intern",
    company: "iHub",
    location: "Nairobi, Kenya",
    salary: "KES 30,000 - 50,000",
    type: "Internship",
    experience: "0-1 years",
    postedAt: "2 days ago",
    description: "Join Kenya's premier innovation hub and work on projects that impact local communities.",
    requirements: ["Programming fundamentals", "Problem-solving", "Eagerness to learn", "Team collaboration"],
    benefits: ["Mentorship program", "Networking opportunities", "Skill development", "Project exposure"],
    logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=64&h=64&fit=crop",
    ussdCode: "*234*10#",
    applicationMethod: "both"
  }
];

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    experience: ""
  });
  const { toast } = useToast();

  const handleApply = (method: "online" | "ussd") => {
    if (!selectedJob) return;

    if (method === "online") {
      if (!applicationData.fullName || !applicationData.email || !applicationData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Application Submitted!",
        description: `Your application for ${selectedJob.title} at ${selectedJob.company} has been submitted successfully.`,
      });
    } else {
      toast({
        title: "USSD Application",
        description: `Dial ${selectedJob.ussdCode} to apply for ${selectedJob.title} via USSD.`,
      });
    }

    setSelectedJob(null);
    setApplicationData({
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      experience: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Tech Jobs in Kenya</h1>
          <p className="text-xl text-slate-300">Find your dream tech job with top companies in Kenya</p>
          <div className="flex justify-center gap-8 text-slate-300">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-green-400" />
              <span>{jobs.length} Active Positions</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-400" />
              <span>Top Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-orange-400" />
              <span>USSD Applications</span>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={job.logo} 
                      alt={job.company}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <CardTitle className="text-white text-lg">{job.title}</CardTitle>
                      <p className="text-slate-300">{job.company}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Posted {job.postedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>Experience: {job.experience}</span>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm line-clamp-2">{job.description}</p>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm"
                        onClick={() => setSelectedJob(job)}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="text-white flex items-center gap-3">
                          <img 
                            src={job.logo} 
                            alt={job.company}
                            className="w-10 h-10 rounded-lg"
                          />
                          {job.title} at {job.company}
                        </DialogTitle>
                        <DialogDescription className="text-slate-300">
                          {job.location} • {job.type} • {job.experience}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6 text-slate-300">
                        <div>
                          <h4 className="font-semibold text-white mb-2">Job Description</h4>
                          <p>{job.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white mb-2">Requirements</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white mb-2">Benefits</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {job.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">Apply for this position:</h4>
                          
                          {/* Online Application Form */}
                          <div className="space-y-4">
                            <h5 className="text-white">Online Application</h5>
                            <div className="grid md:grid-cols-2 gap-4">
                              <Input
                                placeholder="Full Name *"
                                value={applicationData.fullName}
                                onChange={(e) => setApplicationData({...applicationData, fullName: e.target.value})}
                                className="bg-slate-800 border-slate-600 text-white"
                              />
                              <Input
                                type="email"
                                placeholder="Email Address *"
                                value={applicationData.email}
                                onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                                className="bg-slate-800 border-slate-600 text-white"
                              />
                              <Input
                                type="tel"
                                placeholder="Phone Number *"
                                value={applicationData.phone}
                                onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                                className="bg-slate-800 border-slate-600 text-white"
                              />
                              <Input
                                placeholder="Years of Experience"
                                value={applicationData.experience}
                                onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                                className="bg-slate-800 border-slate-600 text-white"
                              />
                            </div>
                            <Textarea
                              placeholder="Cover Letter (Optional)"
                              value={applicationData.coverLetter}
                              onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                              className="bg-slate-800 border-slate-600 text-white"
                              rows={4}
                            />
                            <Button 
                              onClick={() => handleApply("online")}
                              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Submit Application
                            </Button>
                          </div>
                          
                          {/* USSD Application */}
                          {job.ussdCode && (
                            <div className="border-t border-slate-700 pt-4">
                              <h5 className="text-white mb-2">Quick USSD Application</h5>
                              <p className="text-sm text-slate-400 mb-3">
                                Apply instantly using your mobile phone without internet
                              </p>
                              <div className="flex items-center gap-4">
                                <code className="bg-slate-800 px-3 py-2 rounded text-green-400 font-mono">
                                  {job.ussdCode}
                                </code>
                                <Button 
                                  onClick={() => handleApply("ussd")}
                                  variant="outline"
                                  className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
                                >
                                  <Phone className="mr-2 h-4 w-4" />
                                  Apply via USSD
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {job.ussdCode && (
                    <Button 
                      size="sm"
                      onClick={() => {
                        setSelectedJob(job);
                        handleApply("ussd");
                      }}
                      variant="outline"
                      className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
