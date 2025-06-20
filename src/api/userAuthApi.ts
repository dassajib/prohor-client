import { UserLoginInterface, UserRegisterInterface } from "@/interface/userInterface"
import { axiosInstance } from "./axios"

export const registerUser = async (data: UserRegisterInterface) => {
    const response = await axiosInstance.post("/register", data)
    return response.data
}

export const loginUser = async (data: UserLoginInterface) => {
    const response = await axiosInstance.post("/login", data)
    return response.data
}