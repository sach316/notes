import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { NoteObject } from '../models/note';

interface FormDialogProps {
  open: boolean;
  handleClose: () => void;
  selectedNote: NoteObject,
  editNote: (id: string, editedNote: NoteObject) => void;
}

export default function FormDialog({ open, handleClose,selectedNote,editNote }: FormDialogProps) {
    const [formData, setFormData] = React.useState<NoteObject>(selectedNote);

    React.useEffect(() => {
      setFormData(selectedNote);
    }, [selectedNote]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      editNote(selectedNote.id, formData);
      handleClose();
    };  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent>
      <TextField id="title" 
        name="title"
        defaultValue={selectedNote.title} 
        variant="outlined"
        onChange={handleChange} 
        required placeholder='Title' />
        <TextField id="content"
         name="content"
         multiline 
         maxRows={4} 
         required 
         placeholder='Jot down...'
         defaultValue= {selectedNote.content}
         onChange={handleChange}
         variant="outlined" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
