import { useMutation } from "@tanstack/react-query"

import { UserRegisterInterface } from "@/interface/userInterface"
import { registerUser } from "@/api/userAuthApi"

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (data: UserRegisterInterface) => registerUser(data),
        onError: (error) => {
            console.error(error)
        },
    })
}