import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { NoteObject } from '../models/note';
import { CardActionArea } from '@mui/material';
import FormDialog from './Dialog';

interface INoteProps {
  note: NoteObject;
  deleteNote: (id: string) => void;
  editNote: (id: string, editedNote: NoteObject) => void;
  searchTerm?: string;
}

const Notes = ({ note, deleteNote, editNote,searchTerm }: INoteProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const highlightSearchTerm = (text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
    return text.replace(regex, match => `<span style="background-color: yellow">${match}</span>`);
  };
  console.log(note.color)

  return (
    <>
      <Card sx={{ minWidth: 250, maxWidth: 300, marginBottom: 10 ,boxShadow:3}}style={{backgroundColor:note.color}}>
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              <div dangerouslySetInnerHTML={{ __html: highlightSearchTerm(note.title, searchTerm || '') }} />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <div dangerouslySetInnerHTML={{ __html: highlightSearchTerm(note.content.slice(0, 100), searchTerm || '') }} /> 
              {/* what about content beyond 100 words? */}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={(event) => {
                event.stopPropagation();
                deleteNote(note.id);
              }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <Delete />
            </IconButton>
          </CardActions>
        </CardActionArea>
      </Card>
      <FormDialog open={open} handleClose={handleClose} selectedNote={note} editNote={editNote} />
    </>
  );
};

export default Notes;
