import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Calendar, MapPin, Users, Link, ImagePlus, BookOpen, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "React Best Practices",
      content: "What are some best practices for React development?",
      author: "John Doe",
      time: "2 hours ago",
      likes: 23,
      replies: 5,
      category: "Programming",
      isLiked: false
    },
    {
      id: 2,
      title: "Marketing Strategies",
      content: "What are effective marketing strategies for a new online course?",
      author: "Jane Smith",
      time: "1 day ago",
      likes: 15,
      replies: 2,
      category: "Marketing",
      isLiked: false
    }
  ]);

  const [posts, setPosts] = useState([
    {
      id: 3,
      title: "New Course: AI Fundamentals",
      content: "Excited to announce my new course on AI fundamentals!",
      author: "Mike Johnson",
      time: "3 hours ago",
      likes: 35,
      replies: 10,
      category: "Announcements",
      isLiked: false
    },
    {
      id: 4,
      title: "Looking for Study Partners",
      content: "Anyone interested in forming a study group for the upcoming exam?",
      author: "Sarah Wilson",
      time: "2 days ago",
      likes: 12,
      replies: 3,
      category: "Study Groups",
      isLiked: false
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "General"
  });

  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleLike = (id: number, type: 'discussion' | 'post') => {
    if (type === 'discussion') {
      setDiscussions(prev => prev.map(item => 
        item.id === id ? { ...item, likes: item.likes + 1, isLiked: !item.isLiked } : item
      ));
    } else {
      setPosts(prev => prev.map(item => 
        item.id === id ? { ...item, likes: item.likes + 1, isLiked: !item.isLiked } : item
      ));
    }
  };

  const handleReply = (id: number) => {
    console.log(`Reply to post/discussion ${id}`);
  };

  const handleCreatePost = () => {
    const newPostData = {
      id: Date.now(),
      ...newPost,
      author: "You",
      time: "Just now",
      likes: 0,
      replies: 0,
      isLiked: false
    };

    if (activeTab === "discussions") {
      setDiscussions(prev => [newPostData, ...prev]);
    } else {
      setPosts(prev => [newPostData, ...prev]);
    }

    setNewPost({ title: "", content: "", category: "General" });
    setShowCreatePost(false);
  };

  const handleJoinEvent = (eventId: number) => {
    console.log(`Joined event ${eventId}`);
  };

  const events = [
    {
      id: 1,
      title: "React Meetup",
      date: "2024-03-15",
      location: "Nairobi Garage",
      description: "Join us for a React meetup!",
      attendees: 30,
      isOnline: false
    },
    {
      id: 2,
      title: "Digital Marketing Webinar",
      date: "2024-03-20",
      location: "Online",
      description: "Learn about digital marketing strategies.",
      attendees: 50,
      isOnline: true
    }
  ];

  const categories = ["General", "Programming", "Marketing", "Study Groups", "Announcements"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900">Community</h1>
          <p className="text-slate-600 mt-2">Connect, share, and learn with fellow students</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="discussions" className="text-sm">Discussions</TabsTrigger>
            <TabsTrigger value="posts" className="text-sm">Posts</TabsTrigger>
            <TabsTrigger value="events" className="text-sm">Events</TabsTrigger>
            <TabsTrigger value="resources" className="text-sm">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Button onClick={() => setShowCreatePost(true)} className="w-full sm:w-auto">
                  Create Discussion
                </Button>

                {discussions.map((item) => (
                  <Card key={item.id} className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{item.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-slate-900">{item.author}</h3>
                            <span className="text-sm text-slate-500">{item.time}</span>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <h4 className="font-medium text-lg mb-2">{item.title}</h4>
                          <p className="text-slate-700 mb-4">{item.content}</p>
                          <div className="flex items-center gap-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(item.id, 'discussion')}
                              className={item.isLiked ? "text-red-600" : ""}
                            >
                              <Heart className={`h-4 w-4 mr-1 ${item.isLiked ? 'fill-current' : ''}`} />
                              {item.likes}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleReply(item.id)}>
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {item.replies}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category} className="flex items-center justify-between text-slate-700">
                          <span>{category}</span>
                          <Badge variant="secondary">12</Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Top Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-slate-900">John Doe</h4>
                            <p className="text-sm text-slate-500">560 points</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Button onClick={() => setShowCreatePost(true)} className="w-full sm:w-auto">
                  Create Post
                </Button>

                {posts.map((item) => (
                  <Card key={item.id} className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{item.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-slate-900">{item.author}</h3>
                            <span className="text-sm text-slate-500">{item.time}</span>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <h4 className="font-medium text-lg mb-2">{item.title}</h4>
                          <p className="text-slate-700 mb-4">{item.content}</p>
                          <div className="flex items-center gap-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(item.id, 'post')}
                              className={item.isLiked ? "text-red-600" : ""}
                            >
                              <Heart className={`h-4 w-4 mr-1 ${item.isLiked ? 'fill-current' : ''}`} />
                              {item.likes}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleReply(item.id)}>
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {item.replies}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category} className="flex items-center justify-between text-slate-700">
                          <span>{category}</span>
                          <Badge variant="secondary">12</Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Top Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-slate-900">John Doe</h4>
                            <p className="text-sm text-slate-500">560 points</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {event.isOnline ? <Link className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                      <span>{event.location}</span>
                    </div>
                    <p className="text-slate-700">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                      <Button size="sm" onClick={() => handleJoinEvent(event.id)}>Join Event</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Study Materials */}
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Study Materials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">React Best Practices Guide</h4>
                    <p className="text-sm text-slate-600">Comprehensive guide covering modern React patterns</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>📄 PDF</span>
                      <span>⭐ 4.8</span>
                      <span>👥 1.2k downloads</span>
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">Python Cheat Sheet</h4>
                    <p className="text-sm text-slate-600">Quick reference for Python syntax and functions</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>📄 PDF</span>
                      <span>⭐ 4.9</span>
                      <span>👥 2.1k downloads</span>
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">Database Design Templates</h4>
                    <p className="text-sm text-slate-600">Common database patterns and schema designs</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>📁 ZIP</span>
                      <span>⭐ 4.7</span>
                      <span>👥 856 downloads</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Useful Links */}
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <Link className="h-5 w-5" />
                    Useful Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">Free Programming Books</h4>
                    <p className="text-sm text-slate-600">Collection of free programming books and resources</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">External</Badge>
                      <Badge variant="outline" className="text-xs">Free</Badge>
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">Developer Roadmaps</h4>
                    <p className="text-sm text-slate-600">Step by step guides for different tech career paths</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">External</Badge>
                      <Badge variant="outline" className="text-xs">Interactive</Badge>
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">Coding Practice Platforms</h4>
                    <p className="text-sm text-slate-600">Best platforms to practice coding and algorithms</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">External</Badge>
                      <Badge variant="outline" className="text-xs">Practice</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Tutorials */}
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">Git & GitHub Fundamentals</h4>
                    <p className="text-sm text-slate-600">Master version control with practical examples</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>🎥 45 min</span>
                      <span>⭐ 4.9</span>
                      <span>👁️ 12k views</span>
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">API Development Crash Course</h4>
                    <p className="text-sm text-slate-600">Build REST APIs from scratch using Node.js</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>🎥 2h 15min</span>
                      <span>⭐ 4.8</span>
                      <span>👁️ 8.5k views</span>
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">CSS Grid & Flexbox</h4>
                    <p className="text-sm text-slate-600">Modern CSS layout techniques explained</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>🎥 1h 30min</span>
                      <span>⭐ 4.7</span>
                      <span>👁️ 15k views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Resources */}
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">Study Group Templates</h4>
                    <p className="text-sm text-slate-600">Organized templates for effective study sessions</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">Templates</Badge>
                      <Badge variant="outline" className="text-xs">Free</Badge>
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">Project Ideas Repository</h4>
                    <p className="text-sm text-slate-600">Collection of project ideas for different skill levels</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">Projects</Badge>
                      <Badge variant="outline" className="text-xs">All levels</Badge>
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <h4 className="font-medium text-slate-900">Career Guidance</h4>
                    <p className="text-sm text-slate-600">Resources for job preparation and career development</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">Career</Badge>
                      <Badge variant="outline" className="text-xs">Guide</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Post Dialog */}
      <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
        <DialogContent className="max-w-2xl bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">Title</label>
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Enter post title"
                className="bg-slate-50 border-slate-300 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">Content</label>
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Enter post content"
                rows={3}
                className="bg-slate-50 border-slate-300 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">Category</label>
              <select
                className="w-full px-3 py-2 border rounded-md bg-slate-50 border-slate-300 text-slate-900"
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={handleCreatePost} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Create Post
              </Button>
              <Button variant="outline" onClick={() => setShowCreatePost(false)} className="border-slate-300 text-slate-700 hover:bg-slate-50">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;