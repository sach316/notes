// api.ts
import { NoteObject } from './models/note';

export const fetchNotes = async (): Promise<NoteObject[]> => {
    try {
      const response = await fetch('https://5f50-14-194-85-214.ngrok-free.app/api/notes',{
        headers: {
            'ngrok-skip-browser-warning': 'true',}
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format: not JSON');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      throw error;
    }
  };
  
  


export const addNote = async (newNote: NoteObject): Promise<NoteObject> => {
    console.log(JSON.stringify(newNote))
  try {
    const response = await fetch('https://5f50-14-194-85-214.ngrok-free.app/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(newNote),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to add note:', error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`https://5f50-14-194-85-214.ngrok-free.app/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
            'ngrok-skip-browser-warning': 'true',}
      
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to delete note:', error);
    throw error;
  }
};

export const editNote = async (id: string, editedNote: NoteObject): Promise<NoteObject> => {
  try {
    const response = await fetch(`https://5f50-14-194-85-214.ngrok-free.app/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(editedNote),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to edit note:', error);
    throw error;
  }
};
