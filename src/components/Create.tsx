import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { NoteObject } from '../models/note';
import {v4 as uuid} from 'uuid';
import { Button } from '@mui/material';
const defaultObj = {
    id: '0', 
    title: '',
    content: '',
    deleted: false,
    pinned: false,
    createdAt : new Date(),
    updatedAt: new Date()
} 

interface CreateProps{
    onAdd: (note:NoteObject)=>void
}

export default function TextFields({onAdd}:CreateProps) {
    const [note,setNote]= useState<NoteObject>(defaultObj);
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {id,value}= e.target;
        setNote((prevValue)=>{
            return {
                ...prevValue,
                [id]:value,
            }
        })
    }
    function submit(e:React.FormEvent){
        e.preventDefault()
        onAdd({...note,id:uuid() });
        setNote(defaultObj);
        }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m:'auto', maxWidth:450 ,minWidth: 200,padding:5},
      }}
      noValidate
      autoComplete="off"
    >
      <form>
        <TextField id="title" 
        name="title"
        value={note.title} 
        variant="outlined"
        onChange={handleChange} 
        required placeholder='Title' />
        <TextField id="content"
        name="content"
        onChange={handleChange} 
        value={note.content}
        multiline 
        required 
        placeholder='Jot down...' 
        variant="outlined"
        inputProps={{maxlength:100000}} />
        <br/><Button variant='contained' onClick={submit}>Add</Button>
        </form>
    </Box>
  );
}
