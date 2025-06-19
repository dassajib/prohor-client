import { UserInterface } from "@/interface/userInterface"
import { axiosInstance } from "./axios"

export const registerUser = async (data: UserInterface) => {
    const response = await axiosInstance.post("/register", data)
    return response.data
}