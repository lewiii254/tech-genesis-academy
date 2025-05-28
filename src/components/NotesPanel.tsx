
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNotes } from "@/hooks/useNotes";
import { Plus, Edit, Trash2, Save, X, StickyNote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotesPanelProps {
  courseId: number;
  moduleId?: number;
  modules: Array<{ id: number; title: string }>;
}

const NotesPanel = ({ courseId, moduleId, modules }: NotesPanelProps) => {
  const { notes, addNote, updateNote, deleteNote, getNotesForModule } = useNotes(courseId);
  const { toast } = useToast();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const displayNotes = moduleId ? getNotesForModule(moduleId) : notes;

  const handleAddNote = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both title and content for your note.",
        variant: "destructive"
      });
      return;
    }

    const currentModuleId = moduleId || modules[0]?.id || 1;
    addNote(currentModuleId, newTitle, newContent);
    
    setNewTitle("");
    setNewContent("");
    setIsAdding(false);
    
    toast({
      title: "Note Added",
      description: "Your note has been saved successfully.",
    });
  };

  const handleUpdateNote = (noteId: string) => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast({
        title: "Missing Information", 
        description: "Please enter both title and content for your note.",
        variant: "destructive"
      });
      return;
    }

    updateNote(noteId, newTitle, newContent);
    setEditingId(null);
    setNewTitle("");
    setNewContent("");
    
    toast({
      title: "Note Updated",
      description: "Your note has been updated successfully.",
    });
  };

  const startEditing = (note: any) => {
    setEditingId(note.id);
    setNewTitle(note.title);
    setNewContent(note.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewTitle("");
    setNewContent("");
    setIsAdding(false);
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    toast({
      title: "Note Deleted",
      description: "Your note has been deleted.",
    });
  };

  const getModuleTitle = (moduleId: number) => {
    return modules.find(m => m.id === moduleId)?.title || `Module ${moduleId}`;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <StickyNote className="h-5 w-5" />
              My Notes
            </CardTitle>
            <CardDescription className="text-slate-300">
              {moduleId ? `Notes for current module` : `All course notes (${notes.length})`}
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsAdding(true)}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Note
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add Note Form */}
        {isAdding && (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 space-y-3">
              <Input
                placeholder="Note title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Textarea
                placeholder="Write your note here..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddNote} size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button onClick={cancelEditing} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {displayNotes.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <StickyNote className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No notes yet. Add your first note to get started!</p>
            </div>
          ) : (
            displayNotes.map((note) => (
              <Card key={note.id} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  {editingId === note.id ? (
                    <div className="space-y-3">
                      <Input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      <Textarea
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="bg-white/10 border-white/20 text-white min-h-[80px]"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => handleUpdateNote(note.id)} size="sm">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button onClick={cancelEditing} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white">{note.title}</h4>
                        <div className="flex gap-1">
                          <Button
                            onClick={() => startEditing(note)}
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteNote(note.id)}
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-slate-300 text-sm mb-3 whitespace-pre-wrap">
                        {note.content}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="outline" className="border-white/20 text-slate-400">
                          {getModuleTitle(note.moduleId)}
                        </Badge>
                        <span className="text-slate-400">
                          {new Date(note.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesPanel;
