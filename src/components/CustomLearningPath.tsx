
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Route, Target, BookOpen, Award, Play, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  progress: number;
  modules: number;
  completedModules: number;
  category: string;
  nextModule: string;
}

const learningPaths: LearningPath[] = [
  {
    id: "1",
    title: "Full Stack Developer Roadmap",
    description: "Complete path from beginner to professional full stack developer",
    duration: "6 months",
    difficulty: "Intermediate",
    progress: 35,
    modules: 12,
    completedModules: 4,
    category: "Web Development",
    nextModule: "React State Management"
  },
  {
    id: "2",
    title: "Data Science Mastery",
    description: "Master data science from fundamentals to advanced machine learning",
    duration: "8 months",
    difficulty: "Advanced",
    progress: 15,
    modules: 15,
    completedModules: 2,
    category: "Data Science",
    nextModule: "Python Data Analysis"
  }
];

const CustomLearningPath = () => {
  const { toast } = useToast();

  const handleContinuePath = (pathTitle: string, nextModule: string) => {
    toast({
      title: "Learning Path Activated",
      description: `Continuing your ${pathTitle} journey with ${nextModule}`,
    });
  };

  const handleViewDetails = (pathTitle: string) => {
    toast({
      title: "Path Details",
      description: `Viewing detailed curriculum for ${pathTitle}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CardTitle className="text-slate-900 flex items-center justify-center gap-2 text-2xl">
          <Route className="h-6 w-6 text-purple-600" />
          Custom Learning Paths
        </CardTitle>
        <p className="text-slate-600">Personalized roadmaps tailored to your career goals</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-slate-900 font-semibold text-lg mb-2">{path.title}</h4>
                  <p className="text-slate-700 text-sm mb-3">{path.description}</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  {path.category}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">{path.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{path.completedModules}/{path.modules} modules</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Award className="h-4 w-4 text-amber-600" />
                  <span className="font-medium">{path.duration}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700 font-medium">Progress</span>
                  <span className="text-slate-900 font-semibold">{path.progress}%</span>
                </div>
                <Progress value={path.progress} className="h-3" />
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Play className="h-4 w-4" />
                    <span className="text-sm font-medium">Next: {path.nextModule}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm"
                  onClick={() => handleContinuePath(path.title, path.nextModule)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewDetails(path.title)}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Create Your Custom Path</h3>
          <p className="text-purple-100 mb-4">Get a personalized learning roadmap based on your goals and experience</p>
          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <Target className="mr-2 h-5 w-5" />
            Build My Path
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomLearningPath;
