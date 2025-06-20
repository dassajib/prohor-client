import { UserRegisterInterface } from "@/interface/userInterface"
import { axiosInstance } from "./axios"

export const registerUser = async (data: UserRegisterInterface) => {
    const response = await axiosInstance.post("/register", data)
    return response.data
}