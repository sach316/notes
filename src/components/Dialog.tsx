import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { NoteObject } from '../models/note';
import { InputBase,Box, IconButton } from '@mui/material';
import { PushPinOutlined } from '@mui/icons-material';
import { useState } from 'react';

interface FormDialogProps {
  open: boolean;
  handleClose: () => void;
  selectedNote: NoteObject,
  editNote: (id: string, editedNote: NoteObject) => void;
  pinnedState:boolean
}

export default function FormDialog({ open, handleClose,selectedNote,editNote,pinnedState }: FormDialogProps) {
    const [formData, setFormData] = useState<NoteObject>(selectedNote);
    const [pinned,setPinnedState]= useState(false)

    React.useEffect(() => {
      setFormData(selectedNote);
    }, [selectedNote]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      // console.log(name, value)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    
    const handlePinned = () => {
      setFormData((prev) => ({
        ...prev,
        ['pinned']: !pinned,
      }))}
      
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // console.log('submitting')
      editNote(selectedNote.id, formData);
      handleClose();
    };  
  return (
    <Box sx={{borderRadius:25}}>
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      
      }}
      
    >
      {/* <DialogTitle>Edit Note</DialogTitle> */}
      <DialogContent sx={{backgroundColor:selectedNote.color}}>
      <InputBase
          name="title"
          id='title'
          defaultValue={selectedNote.title}
          onChange={handleChange}
          required
          fullWidth
          placeholder="Title"
          inputProps={{ 'aria-label': 'title' }}
          sx={{fontWeight: 'bold', fontSize:20}}
      />

        <InputBase id="content"
         name="content"
         multiline
         required 
         placeholder='Jot down...'
         defaultValue= {selectedNote.content}
         onChange={handleChange}
         sx={{width:'100%'}}
         />
      </DialogContent>
      <DialogActions sx={{backgroundColor:selectedNote.color}}>
        <IconButton onClick={handlePinned}><PushPinOutlined/></IconButton>
        <InputBase id='color' name='color' type='color' defaultValue={selectedNote.color} onChange={handleChange} sx={{width:40, borderStyle:'rounded',borderWidth: 'thick' }}></InputBase>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
}
