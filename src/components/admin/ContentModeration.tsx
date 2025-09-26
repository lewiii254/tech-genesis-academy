import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Flag, 
  MessageSquare, 
  CheckCircle, 
  XCircle,
  Eye,
  AlertTriangle,
  Clock,
  Trash2
} from "lucide-react";

const ContentModeration = () => {
  const [activeTab, setActiveTab] = useState("reported");

  const reportedContent = [
    {
      id: 1,
      type: "comment",
      content: "This course is absolutely terrible and waste of money!",
      author: "John Doe",
      course: "React Development",
      reportReason: "Inappropriate Language",
      reportedBy: "Jane Smith",
      reportedAt: "2024-01-15 14:30",
      status: "pending"
    },
    {
      id: 2,
      type: "post",
      content: "Looking for someone to do my assignments for money...",
      author: "Mike Johnson",
      course: "Data Science",
      reportReason: "Academic Dishonesty",
      reportedBy: "Sarah Wilson",
      reportedAt: "2024-01-15 12:15",
      status: "pending"
    },
    {
      id: 3,
      type: "review",
      content: "Instructor doesn't know what they're talking about. Complete fraud!",
      author: "Alex Brown",
      course: "Digital Marketing",
      reportReason: "False Information",
      reportedBy: "David Lee",
      reportedAt: "2024-01-15 10:45",
      status: "pending"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "course",
      title: "Advanced Machine Learning with TensorFlow",
      author: "Dr. Smith",
      submittedAt: "2024-01-15 16:20",
      category: "Data Science",
      status: "pending"
    },
    {
      id: 2,
      type: "article",
      title: "Best Practices for React Performance Optimization",
      author: "Jane Developer",
      submittedAt: "2024-01-15 14:10",
      category: "Programming",
      status: "pending"
    }
  ];

  const handleContentAction = (action: string, contentId: number, type: string) => {
    console.log(`${action} ${type} with ID: ${contentId}`);
    // Implement moderation actions
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      "pending": "secondary",
      "approved": "default",
      "rejected": "destructive"
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const getPriorityColor = (reason: string) => {
    const colors = {
      "Inappropriate Language": "text-red-600",
      "Academic Dishonesty": "text-red-600",
      "Spam": "text-orange-600",
      "False Information": "text-orange-600",
      "Harassment": "text-red-600"
    };
    return colors[reason as keyof typeof colors] || "text-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Flag className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Reported Content</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Approved Today</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Rejected Today</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab("reported")}
          className={`pb-2 px-1 ${activeTab === "reported" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
        >
          Reported Content
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-2 px-1 ${activeTab === "pending" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
        >
          Pending Approval
        </button>
      </div>

      {/* Reported Content */}
      {activeTab === "reported" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Reported Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportedContent.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{item.type}</Badge>
                        <span className={`text-sm font-medium ${getPriorityColor(item.reportReason)}`}>
                          {item.reportReason}
                        </span>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="bg-gray-50 p-3 rounded border-l-4 border-red-400">
                        <p className="text-gray-800">"{item.content}"</p>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {item.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>by {item.author}</span>
                        </div>
                        <span>in {item.course}</span>
                        <span>reported by {item.reportedBy}</span>
                        <span>{item.reportedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleContentAction("view", item.id, item.type)}
                      variant="outline"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Context
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleContentAction("approve", item.id, item.type)}
                      variant="outline"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleContentAction("remove", item.id, item.type)}
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Approval */}
      {activeTab === "pending" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{item.type}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">{item.category}</Badge>
                        {getStatusBadge(item.status)}
                      </div>
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {item.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>by {item.author}</span>
                        </div>
                        <span>submitted {item.submittedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleContentAction("preview", item.id, item.type)}
                      variant="outline"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleContentAction("approve", item.id, item.type)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleContentAction("reject", item.id, item.type)}
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentModeration;
