
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, Heart, Share2, Calendar, Users, TrendingUp, Star, Send, Plus, ThumbsUp } from "lucide-react";
import TeamCollaboration from "@/components/TeamCollaboration";
import NetworkingEvents from "@/components/NetworkingEvents";
import { useToast } from "@/hooks/use-toast";

interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  replies: number;
  likes: number;
  date: string;
  avatar: string;
  liked: boolean;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar: string;
}

interface Review {
  id: string;
  author: string;
  course: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const initialDiscussions: Discussion[] = [
  {
    id: "1",
    title: "Best Resources for Learning React in 2024?",
    author: "Jane Doe",
    content: "Hey everyone! I'm looking for the best and most up-to-date resources for learning React this year. Any recommendations for courses, tutorials, or documentation?",
    replies: 15,
    likes: 42,
    date: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    liked: false,
    comments: [
      {
        id: "c1",
        author: "John Smith",
        content: "I highly recommend the official React documentation. It's been updated recently and has great examples!",
        date: "1 day ago",
        avatar: "JS"
      }
    ]
  },
  {
    id: "2",
    title: "Tips for Optimizing Node.js Performance",
    author: "John Smith",
    content: "What are some proven strategies for optimizing the performance of Node.js applications? I'm working on a project that needs to handle a lot of concurrent requests.",
    replies: 8,
    likes: 28,
    date: "5 days ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    liked: false,
    comments: []
  }
];

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
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [commentContent, setCommentContent] = useState<{[key: string]: string}>({});
  const [showComments, setShowComments] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive"
      });
      return;
    }

    const newPost: Discussion = {
      id: Date.now().toString(),
      title: newPostTitle,
      author: "Current User",
      content: newPostContent,
      replies: 0,
      likes: 0,
      date: "Just now",
      avatar: "CU",
      liked: false,
      comments: []
    };

    setDiscussions([newPost, ...discussions]);
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPostForm(false);
    
    toast({
      title: "Success",
      description: "Your post has been created!",
    });
  };

  const handleLikePost = (postId: string) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === postId) {
        return {
          ...discussion,
          liked: !discussion.liked,
          likes: discussion.liked ? discussion.likes - 1 : discussion.likes + 1
        };
      }
      return discussion;
    }));
  };

  const handleAddComment = (postId: string) => {
    const content = commentContent[postId];
    if (!content?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive"
      });
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "Current User",
      content: content,
      date: "Just now",
      avatar: "CU"
    };

    setDiscussions(discussions.map(discussion => {
      if (discussion.id === postId) {
        return {
          ...discussion,
          comments: [...discussion.comments, newComment],
          replies: discussion.replies + 1
        };
      }
      return discussion;
    }));

    setCommentContent({...commentContent, [postId]: ""});
    
    toast({
      title: "Success",
      description: "Your comment has been added!",
    });
  };

  const toggleComments = (postId: string) => {
    setShowComments({...showComments, [postId]: !showComments[postId]});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900">TechLearn Community</h1>
          <p className="text-lg sm:text-xl text-emerald-700">Connect, collaborate, and grow with fellow developers</p>
          
          {/* Partnership Information */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg p-4 sm:p-6 mt-6 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Our Partners</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-sm sm:text-lg">PLP</span>
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">Power Learn Project</h3>
                <p className="text-emerald-100 text-xs sm:text-sm">Empowering African youth with tech skills</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-sm sm:text-lg">SF</span>
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">Safaricom</h3>
                <p className="text-emerald-100 text-xs sm:text-sm">Leading telecommunications provider in Kenya</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-sm sm:text-lg">SH</span>
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">S-Hook</h3>
                <p className="text-emerald-100 text-xs sm:text-sm">Innovation and technology solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-white/80 rounded-lg p-1 shadow-md">
          {["discussions", "teams", "events", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[100px] sm:min-w-[120px] py-2 sm:py-3 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md"
                  : "text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "discussions" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Create Post Button */}
            <div className="text-center">
              <Button 
                onClick={() => setShowNewPostForm(!showNewPostForm)}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
            </div>

            {/* New Post Form */}
            {showNewPostForm && (
              <Card className="bg-white/90 backdrop-blur-md border-emerald-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Create New Discussion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Enter post title..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="bg-emerald-50 border-emerald-200 text-emerald-900 placeholder:text-emerald-600"
                  />
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="bg-emerald-50 border-emerald-200 text-emerald-900 placeholder:text-emerald-600 min-h-[120px]"
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleCreatePost} className="bg-gradient-to-r from-emerald-600 to-emerald-700">
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewPostForm(false)} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Discussions List */}
            <div className="space-y-4 sm:space-y-6">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="bg-white/90 backdrop-blur-md border-emerald-200 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-emerald-900 text-lg sm:text-xl">{discussion.title}</CardTitle>
                    <div className="flex items-center mt-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-emerald-500 text-white">
                          {discussion.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-emerald-700 ml-2 text-sm">
                        {discussion.author} - {discussion.date}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-emerald-800">{discussion.content}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikePost(discussion.id)}
                        className={`text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 ${discussion.liked ? 'text-red-600 hover:text-red-700' : ''}`}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${discussion.liked ? 'fill-current' : ''}`} />
                        <span className="text-xs sm:text-sm">{discussion.likes}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleComments(discussion.id)}
                        className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-xs sm:text-sm">{discussion.replies} Comments</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span className="text-xs sm:text-sm">Share</span>
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {showComments[discussion.id] && (
                      <div className="space-y-3 border-t border-emerald-200 pt-4">
                        {discussion.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-emerald-400 text-white text-xs">
                                {comment.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-emerald-50 rounded-lg p-3">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                  <span className="text-emerald-900 text-sm font-medium">{comment.author}</span>
                                  <span className="text-emerald-600 text-xs">{comment.date}</span>
                                </div>
                                <p className="text-emerald-800 text-sm">{comment.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Add Comment */}
                        <div className="flex space-x-3">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-emerald-600 text-white text-xs">
                              CU
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex flex-col sm:flex-row gap-2">
                            <Input
                              placeholder="Write a comment..."
                              value={commentContent[discussion.id] || ""}
                              onChange={(e) => setCommentContent({...commentContent, [discussion.id]: e.target.value})}
                              className="bg-emerald-50 border-emerald-200 text-emerald-900 placeholder:text-emerald-600"
                            />
                            <Button 
                              size="sm" 
                              onClick={() => handleAddComment(discussion.id)}
                              className="bg-gradient-to-r from-emerald-600 to-emerald-700 shrink-0"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "teams" && (
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <TeamCollaboration />
            <Card className="bg-white/90 backdrop-blur-md border-emerald-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-900">Advanced Project Reviews</CardTitle>
                <CardDescription className="text-emerald-700">
                  Get expert feedback on your projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-emerald-900 font-medium">E-commerce Dashboard</h4>
                    <Badge className="bg-emerald-500/20 text-emerald-700">Reviewed</Badge>
                  </div>
                  <p className="text-emerald-800 text-sm mb-3">React + Node.js project with payment integration</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-700">
                    <span>★★★★☆ 4.5/5</span>
                    <span>Mentor: Sarah K.</span>
                    <span>2 days ago</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
                  Submit Project for Review
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "events" && (
          <div className="space-y-6 sm:space-y-8">
            <NetworkingEvents />
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-white/90 backdrop-blur-md border-emerald-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-emerald-500 text-white">
                        {review.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <CardTitle className="text-emerald-900 text-lg">{review.author}</CardTitle>
                      <p className="text-emerald-700 text-sm">Reviewed {review.course}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-emerald-800">{review.comment}</p>
                  <p className="text-emerald-600 text-sm mt-3">Posted on {review.date}</p>
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
