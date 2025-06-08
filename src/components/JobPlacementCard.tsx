
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedAt: string;
  logo: string;
}

const jobOpportunities: JobOpportunity[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Safaricom PLC",
    location: "Nairobi, Kenya",
    salary: "KES 150,000 - 250,000",
    type: "Full-time",
    postedAt: "2 days ago",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop"
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "Equity Bank",
    location: "Nairobi, Kenya",
    salary: "KES 200,000 - 350,000",
    type: "Full-time",
    postedAt: "1 week ago",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=64&h=64&fit=crop"
  }
];

const JobPlacementCard = () => {
  const { toast } = useToast();

  const handleApply = (jobTitle: string, company: string) => {
    toast({
      title: "Application Submitted",
      description: `Your application for ${jobTitle} at ${company} has been forwarded to our placement team.`,
    });
  };

  return (
    <Card className="bg-white border-slate-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-green-600" />
          Job Placement Assistance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobOpportunities.map((job) => (
          <div key={job.id} className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={job.logo} 
                  alt={job.company}
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h4 className="text-slate-900 font-medium">{job.title}</h4>
                  <p className="text-slate-700 text-sm">{job.company}</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                {job.type}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-600" />
                <span className="text-slate-800">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-slate-600" />
                <span className="text-slate-800">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-600" />
                <span className="text-slate-800">Posted {job.postedAt}</span>
              </div>
            </div>
            
            <Button 
              size="sm"
              onClick={() => handleApply(job.title, job.company)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              Apply with TechLearn
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default JobPlacementCard;
