import Login from "@/pages/Login"
import Registration from "@/pages/Registration"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/registration" element={<Registration /> } />
            <Route path="/login" element={<Login /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes