import { BrowserRouter, Route, Routes } from "react-router-dom"

import UserLogin from "@/pages/UserLogin"
import UserRegistration from "@/pages/UserRegistration"
import Dashboard from "@/pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        {/* Routr Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes