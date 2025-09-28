import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit,
  Award,
  BookOpen,
  Users,
  Calendar,
  Star,
  TrendingUp,
  Settings,
  Save,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Enrollment {
  id: string;
  progress: number;
  enrolled_at: string;
  course: {
    id: string;
    title: string;
    description: string;
    difficulty_level: string;
    duration_hours: number;
  };
}

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { profile, loading, refetch } = useProfile();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [editForm, setEditForm] = useState({
    full_name: "",
    bio: "",
    location: "",
    skills: [] as string[],
  });

  const fetchEnrollments = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("enrollments")
      .select(
        `
        id,
        progress,
        enrolled_at,
        course:courses (
          id,
          title,
          description,
          difficulty_level,
          duration_hours
        )
      `
      )
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching enrollments:", error);
    } else {
      setEnrollments(data || []);
    }
  }, [user]);

  useEffect(() => {
    if (profile && !loading) {
      setEditForm({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        location: profile.location || "",
        skills: profile.skills || [],
      });
      fetchEnrollments();
    }
  }, [profile, loading, fetchEnrollments]);

  const handleSave = async () => {
    const { error } = await updateProfile(editForm);
    if (!error) {
      setIsEditing(false);
      refetch();
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        location: profile.location || "",
        skills: profile.skills || [],
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-slate-900 text-xl">Loading...</div>
      </div>
    );
  }

  const completedCourses = enrollments.filter((e) => e.progress >= 100).length;
  const totalHoursSpent = enrollments.reduce(
    (acc, e) => acc + e.course.duration_hours * (e.progress / 100),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">My Profile</h1>
          <p className="text-xl text-slate-600">
            Track your learning journey and achievements
          </p>
        </div>

        {/* Profile Header */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-4xl">
                    {profile?.full_name?.charAt(0) ||
                      user?.email?.charAt(0) ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full_name" className="text-slate-900">
                        Full Name
                      </Label>
                      <Input
                        id="full_name"
                        value={editForm.full_name}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            full_name: e.target.value,
                          })
                        }
                        className="bg-white border-slate-300 text-slate-900"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-slate-900">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) =>
                          setEditForm({ ...editForm, location: e.target.value })
                        }
                        className="bg-white border-slate-300 text-slate-900"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio" className="text-slate-900">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) =>
                          setEditForm({ ...editForm, bio: e.target.value })
                        }
                        className="bg-white border-slate-300 text-slate-900"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">
                      {profile?.full_name || "Anonymous User"}
                    </h2>
                    <p className="text-slate-600">{user?.email}</p>
                    <p className="text-slate-500 text-sm">
                      {profile?.location}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    {profile?.level} Level
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-slate-300 text-slate-700"
                  >
                    {profile?.total_points} Points
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-slate-300 text-slate-700"
                  >
                    {profile?.learning_streak} Day Streak
                  </Badge>
                </div>

                {!isEditing && (
                  <p className="text-slate-600 max-w-2xl">{profile?.bio}</p>
                )}

                <div className="flex justify-center md:justify-start gap-4">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-slate-300 text-slate-700 hover:bg-slate-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xl font-bold text-slate-900">
                {profile?.total_points || 0}
              </p>
              <p className="text-slate-600 text-sm">Points</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xl font-bold text-slate-900">
                {completedCourses}
              </p>
              <p className="text-slate-600 text-sm">Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xl font-bold text-slate-900">
                {Math.round(totalHoursSpent)}
              </p>
              <p className="text-slate-600 text-sm">Hours</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xl font-bold text-slate-900">
                {profile?.learning_streak || 0}
              </p>
              <p className="text-slate-600 text-sm">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Courses */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-slate-900">
              Courses in Progress
            </CardTitle>
            <CardDescription className="text-slate-600">
              Continue your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrollments.length > 0 ? (
              enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="p-4 bg-slate-50 rounded-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-slate-900">
                      {enrollment.course.title}
                    </h4>
                    <Badge
                      variant="outline"
                      className="border-slate-300 text-slate-700 text-xs"
                    >
                      {enrollment.course.difficulty_level}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Progress</span>
                      <span>{Math.round(enrollment.progress)}%</span>
                    </div>
                    <Progress value={enrollment.progress} className="h-2" />
                  </div>

                  <p className="text-sm text-slate-600">
                    Duration: {enrollment.course.duration_hours} hours
                  </p>

                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    Continue Learning
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-slate-600 text-center py-8">
                No courses enrolled yet. Start learning today!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
