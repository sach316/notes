import React, { useState } from 'react';
import { Box, Card, CardContent, InputBase, Button, Typography, CardActions, ClickAwayListener, CardHeader,IconButton } from '@mui/material';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import { NoteObject } from '../models/note';
import { v4 as uuid } from 'uuid';
import { ArchiveOutlined } from '@mui/icons-material';

const defaultObj = {
    id: '0',
    title: '',
    content: '',
    deleted: false,
    pinned: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    color: '#ffffff'
};

interface CreateProps {
    onAdd: (note: NoteObject) => void;
}

export default function Create({ onAdd }: CreateProps) {
    const [note, setNote] = useState<NoteObject>(defaultObj);
    const [expanded, setExpanded] = useState(false);
    const [pinned, setPinned] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        // console.log(id)
        setNote((prevNote) => ({
            ...prevNote,
            [id]: value,
        }));
    };

    const handleSubmit = () => {
        if (note.title.trim() !== '' || note.content.trim() !== '') {
            onAdd({ ...note, id: uuid() });
            setNote(defaultObj);
            // console.log('Note added');
        }
        setExpanded(false);
    };

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        // console.log('Close');
        if (note.title.trim() !== '' || note.content.trim() !== '') {
          onAdd({ ...note, id: uuid() });
          setNote(defaultObj);
        //   console.log('Note added');
      }
        setExpanded(false);
        setPinned(false)
    };



    const handlePinned = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setPinned((prevPinned) => {
          const newPinned = !prevPinned;
          setNote((prevNote) => ({
              ...prevNote,
              pinned: newPinned,
          }));
          return newPinned;
      });
  };

    const Icon = pinned?<PushPinIcon/> :<PushPinOutlinedIcon sx={{opacity:0.5}}/>
    // console.log('pinned '+pinned)
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop:12}}>
            <ClickAwayListener onClickAway={(handleSubmit)}>
                <Card
                    sx={{ minWidth: 600, maxWidth: 700,boxShadow:5 ,"--Card-radius": "40px"}}
                    id="note-card"
                    onClick={() => { setExpanded(true); console.log('opened'); }}
                >
                    <CardHeader
                      sx={{ maxHeight:5 }}
                      title={<Typography variant='h5'>
                        <InputBase
                            name="title"
                            id='title'
                            value={note.title}
                            onChange={handleChange}
                            required
                            fullWidth
                            placeholder={expanded? "Title":"Jot down..."}
                            inputProps={{ 'aria-label': 'title' }}
                            sx={{paddingTop:5}}
                        />
                    </Typography>}
                      action={<IconButton aria-label="settings" sx={{paddingTop:1}} onClick={handlePinned}>
                                {Icon}
                              </IconButton>
                              }
                    />
                    <CardContent>
                        
                        {expanded && (
                            <Typography variant='h5'>
                                <InputBase
                                    name="content"
                                    id='content'
                                    value={note.content}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Jot down..."
                                    inputProps={{ 'aria-label': 'content' }}
                                />
                            </Typography>
                        )}
                    </CardContent>
                    {expanded && (
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <IconButton><ArchiveOutlined/></IconButton>
                            <InputBase id='color' type='color' value={note.color} defaultValue='ffffff' onChange={handleChange} sx={{width:40}}style={{borderRadius:6000}}></InputBase>
                            <Button onClick={handleClose} variant="text" color="primary">Close</Button>
                        </CardActions>
                    )}
                </Card>
            </ClickAwayListener>
        </Box>
    );
}
