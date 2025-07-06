import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import AppSidebar from "@/components/shared/AppSidebar"
import Navbar from "@/components/shared/Navbar"

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div
        className="min-h-screen flex w-full bg-background text-foreground transition-colors duration-300
          dark:bg-[var(--background)] dark:text-[var(--foreground)]"
      >
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <Navbar />

          {/* Breadcrumb Header */}
          <header
            className="flex h-16 shrink-0 items-center gap-2 border-b px-4
              border-border dark:border-[var(--border)]"
          >
            <SidebarTrigger className="-ml-1 hidden" />
            <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink className="dark:text-[var(--foreground)]">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="dark:text-[var(--foreground)]">Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Main Content */}
          <main
            className="flex-1 p-6 bg-card rounded-lg transition-colors duration-300
              dark:bg-[var(--card)] dark:text-[var(--card-foreground)] dark:shadow-glow"
          >
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard
