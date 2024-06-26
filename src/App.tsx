import './App.css';
import MiniDrawer from './components/Drawer';
import Create from './components/Create';
import NotesDisplay from './components/NotesDisplay';
import SearchBar from './components/Search';
import { NoteObject } from './models/note';
import { useState, useEffect } from 'react';
import { fetchNotes, addNote, deleteNote, editNote, searchNotes } from './api';



function App() {
  const [notes, setNotes] = useState<NoteObject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term) {
      const searchedNotes = await searchNotes(term);
      setNotes(searchedNotes);
    } else {
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
    }
  };

  return (
    <div className="App">
      <MiniDrawer onSearch={handleSearch}/>
      <br /><br /><br /><br /><br />
      <Create onAdd={handleAddNote}  />
      <NotesDisplay notes={notes} deleteNote={handleDeleteNote} editNote={handleEditNote} searchTerm={searchTerm} />
    </div>
  );
}

export default App;
