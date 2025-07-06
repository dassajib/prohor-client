import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { toast } from "sonner"

import { NoteFormInterface, NoteInterface, PinTogglePayloadInterface } from "@/interface/noteInterface"
import { createNote, deleteNote, editNote, fetchAllNotes, notePinToggle, permanentlyDelNote, restoreNote, searchNote } from "@/api/noteApi"

export const useGetAllNotes = (query: string): UseQueryResult<NoteInterface[], Error> => {
    return useQuery({
        queryKey: ["notes", query],
        queryFn: () => query ? searchNote(query) : fetchAllNotes(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: query !== undefined,
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
            toast.success("Your note moved to trash")
        }
    })
}

export const useRestoreNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => restoreNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
            toast.success("Note restored successfully")
        }
    })
}

export const usePermanentDelNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => permanentlyDelNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
            toast.success("Note delete permanently")
        }
    })
}

export const useEditNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: NoteFormInterface }) =>
            editNote(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || error?.message || "Failed to edit note"
            );
        },
    });
};

export const useNotePinToggle = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, pinned }: PinTogglePayloadInterface) => notePinToggle(id, pinned),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
        },
        onError: () => {
            toast.error("Cannot pin/unpin note")
        },
    })
}
