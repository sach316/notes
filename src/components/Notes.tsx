import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FormDialog from './Dialog';
import { NoteObject } from '../models/note';
import { CardActionArea,IconButton, } from '@mui/material';
import { Delete } from '@mui/icons-material';


interface INoteProps {
  note: NoteObject;
  deleteNote: (id: string) => void;
  editNote: (id: string, editedNote: NoteObject) => void;
}

export default function Notes({ note, deleteNote, editNote }: INoteProps) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    <>
      <Card sx={{ minWidth: 100, maxWidth: 250, marginLeft: 10 }} >
        <CardActionArea
        onClick={handleClickOpen}
        // <Link
        //   underline="none"
        //   sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        //   onClick={handleClickOpen}
        // >
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {note.title}
            </Typography>
            <Typography variant="body2" >
              {note.content.slice(0,100)}
            </Typography>
            {/* <Typography variant='body2'>
              {formattedDate}
            </Typography> */}
          </CardContent>
          <CardActions>
            <IconButton aria-label="delete" size="large" 
            onClick={
              event => {
              event.stopPropagation();
              deleteNote(note.id);}}
              onMouseDown={event => event.stopPropagation()}>
              <Delete />
            </IconButton>

          </CardActions>
        {/* </Link> */}
        </CardActionArea>
      </Card>
      <FormDialog open={open} handleClose={handleClose} selectedNote={note} editNote={editNote}/>
    </>
  );
}
