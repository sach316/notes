export interface NoteObject {
    id: string, 
    title: string,
    content: string,
    deleted: boolean,
    pinned: boolean,
    createdAt: Date,
    updatedAt: Date,
    color: string
}