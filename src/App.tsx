import './App.css';
import MiniDrawer from './components/Drawer';
import Create from './components/Create';
import NotesDisplay from './components/NotesDisplay';
import { NoteObject } from './models/note';
import { useState, useEffect } from 'react';
import { fetchNotes, addNote, deleteNote, editNote, searchNotes } from './api';
import { useDebounce } from './hooks';

function App() {
  const [notes, setNotes] = useState<NoteObject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [drawerState, setDrawerState] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      const fetchedNotes = await fetchNotes();
      console.log(fetchedNotes);
      setNotes(fetchedNotes);
      checkPinnedStatus(fetchedNotes);
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const search = async () => {
      await handleSearch(debouncedSearchTerm);
    };
    search();
  }, [debouncedSearchTerm]);

  const checkPinnedStatus = (notes: NoteObject[]) => {
    for (const note of notes) {
      if (note.pinned) {
        setPinned(true);
        return;
      }
    }
    setPinned(false);
  };

  const handleAddNote = async (newNote: NoteObject) => {
    const addedNote = await addNote(newNote);
    setNotes((prevNotes) => [addedNote, ...prevNotes]);
    if (addedNote.pinned) {
      setPinned(true);
    }
  };

  const handleEditNote = async (id: string, editedNote: NoteObject) => {
    const updatedNote = await editNote(id, editedNote);
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? updatedNote : note))
    );
    checkPinnedStatus([updatedNote, ...notes.filter((note) => note.id !== id)]);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
    checkPinnedStatus(notes.filter(note => note.id !== id));
  };

  const handleSearch = async (term: string) => {
    if (term) {
      const searchedNotes = await searchNotes(term);
      setNotes(searchedNotes);
      checkPinnedStatus(searchedNotes);
    } else {
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
      checkPinnedStatus(fetchedNotes);
    }
  };

  return (
    <div className="App">
      <MiniDrawer onSearch={setSearchTerm} drawerState={drawerState} setDrawerOpened={setDrawerState} />
      <Create onAdd={handleAddNote} />
      <NotesDisplay notes={notes} deleteNote={handleDeleteNote} editNote={handleEditNote} searchTerm={searchTerm} drawerOpened={drawerState} pinned={pinned} />
    </div>
  );
}

export default App;
