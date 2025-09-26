
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { BookOpen, UserPlus, LogIn } from 'lucide-react';

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ email: '', password: '', fullName: '', confirmPassword: '' });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(signInForm.email, signInForm.password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    await signUp(signUpForm.email, signUpForm.password, signUpForm.fullName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TechLearn Kenya</h1>
          <p className="text-blue-100">Join thousands of learners advancing their tech skills</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/20 border-white/30">
            <TabsTrigger value="signin" className="flex items-center space-x-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center space-x-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card className="bg-white/95 backdrop-blur-md border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-900">Welcome Back</CardTitle>
                <CardDescription className="text-slate-600">
                  Sign in to continue your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-slate-900">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInForm.email}
                      onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-slate-900">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInForm.password}
                      onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-white/95 backdrop-blur-md border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-900">Create Account</CardTitle>
                <CardDescription className="text-slate-600">
                  Start your tech learning journey today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-slate-900">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signUpForm.fullName}
                      onChange={(e) => setSignUpForm({ ...signUpForm, fullName: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-900">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-900">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-slate-900">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={signUpForm.confirmPassword}
                      onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
