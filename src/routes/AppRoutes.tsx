import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

const UserLogin = lazy(() => import("@/pages/UserLogin"))
const UserRegistration = lazy(() => import("@/pages/UserRegistration"))
const Notes = lazy(() => import("@/pages/Notes"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const Expenses = lazy(() => import("@/pages/Expenses"))
const Books = lazy(() => import("@/pages/Books"))

import ProtectedRoute from "./ProtectedRoute"
import AppLayout from "./AppLayout"
import Loading from "@/components/shared/Loading"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/login" element={<UserLogin />} />
          {/* protected routers */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppLayout />}>
              {/* this is the default nested route */}
              <Route index element={<Dashboard />} />

              {/* nested routes */}
              <Route path="notes" element={<Notes />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="books" element={<Books />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes