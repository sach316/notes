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
  const Highlight = require('react-highlighter');
  return (
    <>
      <Card sx={{ minWidth: 250, maxWidth: 300, marginBottom: 4 ,boxShadow:6}}style={{backgroundColor:note.color}}>
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography component="div" gutterBottom sx={{fontWeight:'bold',fontSize:20}}>
              <Highlight
                search={searchTerm}>
              {note.title}
              </Highlight>
            </Typography>
            <Typography variant="body2" color="textSecondary">
            <Highlight
                search={searchTerm}>
              {note.content.slice(0,300)}
              </Highlight>
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
