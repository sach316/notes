
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { NoteObject } from '../models/note';
import { InputBase, Box, IconButton } from '@mui/material';
import { PushPinOutlined, PushPin, ColorLensOutlined } from '@mui/icons-material';
import { useState, useEffect } from 'react';

interface FormDialogProps {
  open: boolean;
  handleClose: () => void;
  selectedNote: NoteObject;
  editNote: (id: string, editedNote: NoteObject) => void;
}

export default function FormDialog({ open, handleClose, selectedNote, editNote }: FormDialogProps) {
  const [formData, setFormData] = useState<NoteObject>(selectedNote);

  useEffect(() => {
    setFormData(selectedNote);
  }, [selectedNote]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    //console.log('Change', { ...formData, [name]: value });
  };

  const handlePinned = () => {
    setFormData((prevNote) => ({
      ...prevNote,
      pinned: !prevNote.pinned,
    }));
    //console.log('Editing', { ...formData, pinned: !formData.pinned });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log('Submitting', formData);
    editNote(selectedNote.id, formData);
    handleClose();
  };

  const Icon = formData.pinned ? <PushPin /> : <PushPinOutlined sx={{ opacity: 0.5 }} />;

  return (
    <Box sx={{ borderRadius: 25 }}>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogContent sx={{ backgroundColor: selectedNote.color }}>
          <InputBase
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            placeholder="Title"
            inputProps={{ 'aria-label': 'title' }}
            sx={{ fontWeight: 'bold', fontSize: 20 }}
          />
          <InputBase
            id="content"
            name="content"
            multiline
            placeholder="Jot down..."
            value={formData.content}
            onChange={handleChange}
            sx={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: selectedNote.color }}>
          <IconButton onClick={handlePinned}>{Icon}</IconButton>
          <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  id="color"
                  type="color"
                  name='color'
                  value={formData.color}
                  defaultValue="#ffffff"
                  onChange={handleChange}
                  sx={{
                    width: 0, 
                    height: 0,
                    opacity: 0, 
                    position: "absolute", 
                  }}
                />
                <ColorLensOutlined
                  sx={{
                    fontSize: 24,
                    color: "grey", 
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)", 
                    },
                  }}
                  onClick={() => {
                    document.getElementById("color")?.click(); 
                  }}
                />
              </Box>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
