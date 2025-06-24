export interface NoteInterface {
    ID: number,
    UserID: number,
    Title: string,
    Content: string,
    Tag: string,
    Date: string,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null
}