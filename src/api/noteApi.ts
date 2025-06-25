import { NoteFormInterface, NoteInterface } from "@/interface/noteInterface"
import { axiosInstance } from "./axios"

export const fetchAllNotes = async (): Promise<NoteInterface[]> => {
    const response = await axiosInstance.get<NoteInterface[]>("/api/notes/")
    return response.data
}

export const createNote = async (data: NoteFormInterface): Promise<NoteInterface> => {
    const response = await axiosInstance.post("/api/notes/", data)
    return response.data
}

export const deleteNote = async (id: number): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/api/notes/${id}`)
    return response.data
}