import { BrowserRouter, Route, Routes } from "react-router-dom"

import UserLogin from "@/pages/UserLogin"
import UserRegistration from "@/pages/UserRegistration"
import Dashboard from "@/pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import Notes from "@/pages/Notes"
import Expenses from "@/pages/Expenses"
import Books from "@/pages/Books"
import AppLayout from "./AppLayout"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        {/* protected routers */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            {/* This is the default nested route when user visits '/' */}
            <Route index element={<Dashboard />} />

            {/* Other nested routes */}
            <Route path="notes" element={<Notes />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="books" element={<Books />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes