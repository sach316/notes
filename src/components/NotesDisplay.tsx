import React from 'react';
import { Box, Typography } from '@mui/material';
import { NoteObject } from '../models/note';
import Notes from './Notes';

interface INotesProps {
    notes: NoteObject[];
    deleteNote: (id: string) => void;
    editNote: (id: string, editedNote: NoteObject) => void;
    searchTerm: string;
}

export default function NotesDisplay({ notes, deleteNote, editNote,searchTerm }: INotesProps) {
    return (
        <Box>
            <br></br>
            <Typography variant="h5">Notes</Typography>
            <br></br>
            <br></br>
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap={2} // Adjust the gap between note cards as needed
                paddingLeft={4}
                marginLeft={5} // Add more gap from the left side
            >
                {notes.map((note) => (
                    <Notes key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} searchTerm={searchTerm} />
                ))}
            </Box>
        </Box>
    );
}
