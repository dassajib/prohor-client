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

export const restoreNote = async (id: number): Promise<{ message: string }> => {
    const response = await axiosInstance.put(`/api/notes/${id}/restore`)
    return response.data
}

export const permanentlyDelNote = async (id: number) => {
    const response = await axiosInstance.delete(`/api/notes/${id}/permanent`)
    return response.data
}

export const searchNote = async (query: string) => {
    const response = await axiosInstance.get(`/api/notes/search?q=${query}`)
    return response.data
}

export const editNote = async (id: number, data: NoteFormInterface): Promise<NoteInterface> => {
    console.log('sending backend:', { id, data });
    const response = await axiosInstance.put(`/api/notes/${id}`, data);
    console.log('api res:', response);
    return response.data;
}