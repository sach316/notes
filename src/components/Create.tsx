import React, { useState } from 'react';
import { Box, Card, CardContent, InputBase, Button, Typography, CardActions, ClickAwayListener } from '@mui/material';
import { NoteObject } from '../models/note';
import { v4 as uuid } from 'uuid';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNote((prevNote) => ({
            ...prevNote,
            [id]: value,
        }));
    };

    const handleSubmit = () => {
        if (note.title.trim() !== '' || note.content.trim() !== '') {
            onAdd({ ...note, id: uuid() });
            setNote(defaultObj);
            console.log('Note added');
        }
        setExpanded(false); // Close the card after submitting or without adding note
    };

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log('Close');
        if (note.title.trim() !== '' || note.content.trim() !== '') {
          onAdd({ ...note, id: uuid() });
          setNote(defaultObj);
          console.log('Note added');
      }
        setExpanded(false); // Collapse the card after submitting
        
    };

    const handleClickAway = (e: MouseEvent | TouchEvent) => {
      if (expanded) {
          const cardElement = document.getElementById('note-card');
          if (cardElement && !cardElement.contains(e.target as Node)) {
              e.preventDefault();
              console.log('Click DETECTED');
              handleSubmit(); // Call handleSubmit when clicking away
          }
      }
  };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ClickAwayListener onClickAway={(e) => handleClickAway(e)}>
                <Card
                    sx={{ minWidth: 600, maxWidth: 700,boxShadow:5 }}
                    id="note-card"
                    onClick={() => { setExpanded(true); console.log('opened'); }}
                >
                    <CardContent>
                        <Typography variant='h5'>
                            <InputBase
                                name="title"
                                id='title'
                                value={note.title}
                                onChange={handleChange}
                                required
                                fullWidth
                                placeholder={expanded? "Title":"Jot Down"}
                                inputProps={{ 'aria-label': 'title' }}
                                sx={{maxHeight:5}}
                            />
                        </Typography>
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
                            <InputBase id='color' type='color' value={note.color} defaultValue='ffffff' onChange={handleChange} sx={{width:40}}></InputBase>
                            <Button onClick={handleClose} variant="text" color="primary">Close</Button>
                        </CardActions>
                    )}
                </Card>
            </ClickAwayListener>
        </Box>
    );
}
