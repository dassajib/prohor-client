export interface NoteInterface {
    ID: number,
    UserID: number,
    Title: string,
    Content: string,
    Tag: string,
    Pinned: boolean,
    Date: string,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null
}

export interface NoteFormInterface {
    title: string,
    tag: string,
    content: string,
}

export interface CreateAndEditNoteModalProps {
    noteToEdit?: NoteInterface | null
    onClose: () => void
}

export interface PinTogglePayloadInterface {
    id: number
    pinned: boolean
}