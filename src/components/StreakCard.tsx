
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGameification } from "@/hooks/useGameification";
import { Flame, Trophy, Star, Target } from "lucide-react";

const StreakCard = () => {
  const { gameState, updateStreak } = useGameification();

  const isStudiedToday = gameState.lastStudyDate === new Date().toDateString();

  return (
    <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md border-orange-500/30 text-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-400" />
            Study Streak
          </CardTitle>
          <Badge className="bg-orange-500 text-white">
            {gameState.currentStreak} days
          </Badge>
        </div>
        <CardDescription className="text-orange-100">
          Keep the momentum going!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="text-slate-300">Best: {gameState.longestStreak} days</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-blue-400" />
            <span className="text-slate-300">{gameState.totalPoints} points</span>
          </div>
        </div>

        {!isStudiedToday ? (
          <Button 
            onClick={updateStreak}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Target className="mr-2 h-4 w-4" />
            Mark Today's Study
          </Button>
        ) : (
          <div className="text-center py-2">
            <Badge className="bg-green-500 text-white">
              ✅ Studied Today!
            </Badge>
          </div>
        )}

        {/* Recent Achievements */}
        <div className="space-y-2">
          <p className="text-xs text-slate-300">Recent Achievements:</p>
          <div className="flex flex-wrap gap-1">
            {gameState.achievements
              .filter(a => a.unlocked)
              .slice(0, 3)
              .map(achievement => (
                <Badge key={achievement.id} variant="outline" className="text-xs border-white/20 text-white">
                  {achievement.icon} {achievement.title}
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCard;
