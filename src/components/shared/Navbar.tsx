import { Bell, Settings, Menu, LogOut, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/components/ui/sidebar"

import { useTheme } from "../theme-provider"
import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Navbar = () => {
  const { toggleSidebar } = useSidebar()
  const { setTheme } = useTheme()

  const logOut = useAuthStore((state) => state.logOut)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300
      dark:bg-[var(--background)] dark:border-[var(--border)]"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-5 w-5 dark:text-[var(--sidebar-foreground)]" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <div className="font-semibold text-lg text-foreground dark:text-[var(--foreground)]">
              Dashboard
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* theme toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer transition-colors duration-300 dark:text-[var(--foreground)] dark:border-[var(--border)]"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-lg dark:bg-[var(--popover)] dark:text-[var(--popover-foreground)] shadow-glow"
            >
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              >
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative cursor-pointer transition-colors duration-300 dark:text-[var(--foreground)]"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs
              bg-accent dark:bg-[var(--sidebar-accent)] text-accent-foreground dark:text-[var(--sidebar-accent-foreground)] rounded-full"
            >
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer transition-colors duration-300 dark:text-[var(--foreground)]"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 cursor-pointer rounded-full border border-border bg-card transition-colors duration-300
                  dark:border-[var(--sidebar-border)] dark:bg-[var(--card)]"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                  <AvatarFallback className="dark:text-[var(--primary-foreground)]">SD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-lg shadow-glow
                dark:bg-[var(--popover)] dark:text-[var(--popover-foreground)]"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none dark:text-[var(--foreground)]">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground dark:text-[var(--muted-foreground)]">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logOut()
                  navigate("/login")
                  toast.success("Log out successfully.")
                }}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Navbar

