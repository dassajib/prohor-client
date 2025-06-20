import { useMutation } from "@tanstack/react-query"

import { UserLoginInterface, UserRegisterInterface } from "@/interface/userInterface"
import { loginUser, registerUser } from "@/api/userAuthApi"
import { useAuthStore } from "@/store/useAuthStore"

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (data: UserRegisterInterface) => registerUser(data),
        onError: (error) => {
            console.error(error)
        },
    })
}

export const useLoginUser = () => {
    const setToken = useAuthStore((state) => state.setToken)

    return useMutation({
        mutationFn: (data: UserLoginInterface) => loginUser(data),
        onSuccess: (data) => {
            setToken(data.access_token)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}