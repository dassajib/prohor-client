import { NoteInterface } from "@/interface/noteInterface"
import { axiosInstance } from "./axios"

export const fetchAllNotes = async (): Promise<NoteInterface[]> => {
    const response = await axiosInstance.get<NoteInterface[]>("/api/notes/")
    return response.data
}