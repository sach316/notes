
import { Box, Typography } from '@mui/material';

import { NoteObject } from '../models/note';

// components
import Notes from './Notes';

interface INotesProps {
    notes: NoteObject[],
    deleteNote: (id: string) => void
    editNote: (id: string,editedNote:NoteObject) => void
}

export default function NotesDisplay ({ notes, deleteNote,editNote }:INotesProps) {

    return (
        <Box>
            <Typography variant="h5">Notes</Typography>
            <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    notes.map(note => (
                        <Notes key={note.id} note={note} deleteNote={deleteNote} editNote={editNote}/>
                    ))
                }
            </Box>
        </Box>
    )
}
