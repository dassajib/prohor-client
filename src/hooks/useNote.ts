import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"

import { NoteFormInterface, NoteInterface } from "@/interface/noteInterface"
import { createNote, fetchAllNotes } from "@/api/noteApi"

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