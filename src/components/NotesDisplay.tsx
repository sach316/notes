import React from 'react';
import { Box, Typography } from '@mui/material';
import { NoteObject } from '../models/note';
import Notes from './Notes';

interface INotesProps {
    notes: NoteObject[];
    deleteNote: (id: string) => void;
    editNote: (id: string, editedNote: NoteObject) => void;
    searchTerm: string;
    drawerOpened: boolean
    
}

export default function NotesDisplay({ notes, deleteNote, editNote,searchTerm,drawerOpened }: INotesProps) {
    const margin= drawerOpened?30:7
    // console.log(drawerOpened,margin+'drawer')
    return (
        <Box sx={{marginTop:3}}>

            <Typography variant="h5" sx={{marginBottom:3}}>Notes</Typography>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap={2} 
                paddingLeft={4}
                marginLeft={margin} 
            >
                {notes.map((note) => (
                    <Notes key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} searchTerm={searchTerm} />
                ))}
            </Box>
        </Box>
    );
}
