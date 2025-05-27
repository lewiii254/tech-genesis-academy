
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Users, MessageCircle, Heart, Share, Plus, Search } from "lucide-react";

const forumPosts = [
  {
    id: 1,
    title: "Best practices for React state management?",
    content: "I'm working on a large React application and struggling with state management. Should I use Redux, Zustand, or stick with React Context?",
    author: "Sarah Chen",
    avatar: "/placeholder.svg",
    category: "Web Development",
    likes: 24,
    replies: 8,
    timeAgo: "2 hours ago",
    tags: ["React", "State Management", "Redux"]
  },
  {
    id: 2,
    title: "Python vs JavaScript for beginners",
    content: "I'm new to programming and can't decide between Python and JavaScript as my first language. What are the pros and cons?",
    author: "Mike Johnson",
    avatar: "/placeholder.svg",
    category: "Programming",
    likes: 15,
    replies: 12,
    timeAgo: "4 hours ago",
    tags: ["Python", "JavaScript", "Beginner"]
  },
  {
    id: 3,
    title: "UI Design trends for 2024",
    content: "What design trends should we be following this year? I've been seeing a lot of glassmorphism and 3D elements lately.",
    author: "Alex Rivera",
    avatar: "/placeholder.svg",
    category: "Design",
    likes: 32,
    replies: 6,
    timeAgo: "6 hours ago",
    tags: ["UI Design", "Trends", "2024"]
  },
  {
    id: 4,
    title: "Database optimization techniques",
    content: "My queries are running slow on a large dataset. What are some effective optimization strategies for PostgreSQL?",
    author: "David Kim",
    avatar: "/placeholder.svg",
    category: "Database",
    likes: 18,
    replies: 4,
    timeAgo: "8 hours ago",
    tags: ["PostgreSQL", "Optimization", "Performance"]
  }
];

const Community = () => {
  const [newPost, setNewPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Community Forum</h1>
          <p className="text-xl text-slate-300">Connect, learn, and grow together</p>
        </div>

        {/* Search and Create Post */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            New Discussion
          </Button>
        </div>

        {/* Forum Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-slate-300">Active Members</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-slate-300">Discussions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-red-400" />
              <p className="text-2xl font-bold">8,976</p>
              <p className="text-slate-300">Helpful Answers</p>
            </CardContent>
          </Card>
        </div>

        {/* Forum Posts */}
        <div className="space-y-6">
          {forumPosts.map((post) => (
            <Card key={post.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">{post.author}</p>
                      <p className="text-sm text-slate-300">{post.timeAgo}</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl">{post.title}</CardTitle>
                <CardDescription className="text-slate-300 text-base">
                  {post.content}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-white/20 text-slate-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.replies}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Post */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Start a Discussion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's on your mind? Ask a question or share your knowledge..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              rows={3}
            />
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Post Discussion
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
