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

export interface NoteProps {
    note: NoteInterface
    index: number
    showTrashed: boolean
    onOpen: (note: NoteInterface) => void
    onEdit: (note: NoteInterface) => void
    onDelete: (id: number) => void
    onRestore: (id: number) => void
    onPermanentlyDelete: (id: number) => void
    onTogglePin: (id: number, pinned: boolean) => void
    isDeleting: boolean
    isRestoring: boolean
    isPermanentlyDeleting: boolean
    isTogglingPin: boolean
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