import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { toast } from "sonner"

import { NoteFormInterface, NoteInterface } from "@/interface/noteInterface"
import { createNote, deleteNote, fetchAllNotes, restoreNote } from "@/api/noteApi"

export const useGetAllNotes = (): UseQueryResult<NoteInterface[], Error> => {
    return useQuery({
        queryKey: ["notes"],
        queryFn: fetchAllNotes,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

export const useCreateNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: NoteFormInterface) => createNote(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
        }
    })
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
            toast.success("Your note moved to trash.")
        }
    })
}

export const useRestoreNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => restoreNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
            toast.success("Note restored successfully.")
        }
    })
}