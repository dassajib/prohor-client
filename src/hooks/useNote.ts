import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { fetchAllNotes } from "@/api/noteApi"
import { NoteInterface } from "@/interface/noteInterface"

export const useGetAllNotes = (): UseQueryResult<NoteInterface[], Error> => {
    return useQuery({
        queryKey: ["notes"],
        queryFn: fetchAllNotes,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}