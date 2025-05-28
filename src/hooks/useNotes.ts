
import { useState, useEffect } from 'react';

interface Note {
  id: string;
  courseId: number;
  moduleId: number;
  content: string;
  timestamp: string;
  title: string;
}

export const useNotes = (courseId: number) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(`notes-course-${courseId}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(`notes-course-${courseId}`, JSON.stringify(notes));
  }, [notes, courseId]);

  const addNote = (moduleId: number, title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      courseId,
      moduleId,
      content,
      title,
      timestamp: new Date().toISOString()
    };

    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (noteId: string, title: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId 
        ? { ...note, title, content, timestamp: new Date().toISOString() }
        : note
    ));
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const getNotesForModule = (moduleId: number) => {
    return notes.filter(note => note.moduleId === moduleId);
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNotesForModule
  };
};
