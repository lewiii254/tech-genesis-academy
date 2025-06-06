
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Route, Target, BookOpen, Award } from "lucide-react";
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
    category: "Web Development"
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
    category: "Data Science"
  }
];

const CustomLearningPath = () => {
  const { toast } = useToast();

  const handleContinuePath = (pathTitle: string) => {
    toast({
      title: "Learning Path Activated",
      description: `Continuing your ${pathTitle} journey`,
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Route className="h-5 w-5 text-purple-400" />
          Custom Learning Paths
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {learningPaths.map((path) => (
          <div key={path.id} className="border border-white/10 rounded-lg p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-white font-medium">{path.title}</h4>
                <p className="text-slate-300 text-sm mt-1">{path.description}</p>
              </div>
              <Badge className="bg-purple-500/20 text-purple-400">
                {path.category}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>{path.difficulty}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{path.completedModules}/{path.modules} modules</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>{path.duration}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Progress</span>
                <span>{path.progress}%</span>
              </div>
              <Progress value={path.progress} className="h-2" />
            </div>
            
            <Button 
              size="sm"
              onClick={() => handleContinuePath(path.title)}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              Continue Learning Path
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CustomLearningPath;
