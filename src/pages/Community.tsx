import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Heart, Share2, Calendar, Users, TrendingUp } from "lucide-react";
import TeamCollaboration from "@/components/TeamCollaboration";
import NetworkingEvents from "@/components/NetworkingEvents";

interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  replies: number;
  likes: number;
  date: string;
  avatar: string;
}

const discussions: Discussion[] = [
  {
    id: "1",
    title: "Best Resources for Learning React in 2024?",
    author: "Jane Doe",
    content: "Hey everyone! I'm looking for the best and most up-to-date resources for learning React this year. Any recommendations for courses, tutorials, or documentation?",
    replies: 15,
    likes: 42,
    date: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
  },
  {
    id: "2",
    title: "Tips for Optimizing Node.js Performance",
    author: "John Smith",
    content: "What are some proven strategies for optimizing the performance of Node.js applications? I'm working on a project that needs to handle a lot of concurrent requests.",
    replies: 8,
    likes: 28,
    date: "5 days ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
  }
];

interface Review {
  id: string;
  author: string;
  course: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Alice Johnson",
    course: "Python for Data Science",
    rating: 5,
    comment: "This course was amazing! The instructor was very knowledgeable and the content was well-structured. I learned a lot about data analysis and machine learning.",
    date: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00d5a4ee9aa5?w=64&h=64&fit=crop&crop=face"
  },
  {
    id: "2",
    author: "Bob Williams",
    course: "Full Stack Web Development",
    rating: 4,
    comment: "A comprehensive course that covers all the essential aspects of web development. The projects were challenging but rewarding.",
    date: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1534528741702-a0cfae58b707?w=64&h=64&fit=crop&crop=face"
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">TechLearn Community</h1>
          <p className="text-xl text-slate-300">Connect, collaborate, and grow with fellow developers</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-white/5 rounded-lg p-1">
          {["discussions", "teams", "events", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "discussions" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">{discussion.title}</CardTitle>
                  <div className="flex items-center mt-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-green-500 text-white">
                        {discussion.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-slate-300 ml-2 text-sm">
                      {discussion.author} - {discussion.date}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{discussion.content}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-slate-300">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{discussion.replies} Replies</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{discussion.likes} Likes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "teams" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <TeamCollaboration />
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Advanced Project Reviews</CardTitle>
                <CardDescription className="text-slate-300">
                  Get expert feedback on your projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">E-commerce Dashboard</h4>
                    <Badge className="bg-green-500/20 text-green-400">Reviewed</Badge>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">React + Node.js project with payment integration</p>
                  <div className="flex items-center gap-4 text-sm text-slate-300">
                    <span>★★★★☆ 4.5/5</span>
                    <span>Mentor: Sarah K.</span>
                    <span>2 days ago</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Submit Project for Review
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "events" && (
          <div className="space-y-8">
            <NetworkingEvents />
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <div className="flex items-center">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {review.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <CardTitle className="text-white">{review.author}</CardTitle>
                      <p className="text-slate-300 text-sm">Reviewed {review.course}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300">{review.comment}</p>
                  <p className="text-slate-300 text-sm mt-3">Posted on {review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
