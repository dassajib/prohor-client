import { useMutation } from "@tanstack/react-query"

import { UserInterface } from "@/interface/userInterface"
import { registerUser } from "@/api/userAuthApi"

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (data: UserInterface) => registerUser(data),
        onError: (error) => {
            console.error(error)
        },
    })
}