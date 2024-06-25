import './App.css';
import MiniDrawer from './components/Drawer';
import TextFields from './components/Create';
import NotesDisplay from './components/NotesDisplay';
import { NoteObject } from './models/note';
import { useState, useEffect } from 'react';
import { fetchNotes, addNote, deleteNote, editNote } from './api';



function App() {
  const [notes, setNotes] = useState<NoteObject[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      const fetchedNotes = await fetchNotes();
      console.log(fetchedNotes)
      setNotes(fetchedNotes);
    };

    loadNotes();
  }, []);

  const handleAddNote = async (newNote: NoteObject)=> {
    const addedNote = await addNote(newNote);
    setNotes((prevNotes) => {
      return [addedNote, ...prevNotes];
    })
  };

  const handleEditNote = async (id: string, editedNote: NoteObject) => {
    const updatedNote = await editNote(id, editedNote);
    setNotes((prevNotes) => 
      prevNotes.map((note) => 
        note.id === id ? updatedNote : note
      )
    );
  };
  
  

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  };

  

  return (
    <div className="App">
      <MiniDrawer />
      <br /><br /><br /><br /><br />
      <TextFields onAdd={handleAddNote} />
      <NotesDisplay notes={notes} deleteNote={handleDeleteNote} editNote={handleEditNote} />
    </div>
  );
}

export default App;
