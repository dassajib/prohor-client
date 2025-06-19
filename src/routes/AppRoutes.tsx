import UserLogin from "@/pages/UserLogin"
import UserRegistration from "@/pages/UserRegistration"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/registration" element={<UserRegistration /> } />
            <Route path="/login" element={<UserLogin /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes