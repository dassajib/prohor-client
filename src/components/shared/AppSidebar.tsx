import { Link, NavLink } from "react-router-dom"
import {
  BarChart3,
  BookOpen,
  CircleDollarSign,
  Home,
  NotepadText,
  Settings,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Navigation data
const navigationData = {
  main: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: NotepadText,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: CircleDollarSign,
    },
    {
      title: "Books",
      url: "/books",
      icon: BookOpen,
    },
  ],
}

const AppSidebar = () => {
  return (
    <Sidebar
      collapsible="icon"
      className="transition-colors duration-300
        dark:bg-[var(--sidebar)] dark:text-[var(--sidebar-foreground)]"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg
                  hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-300
                  dark:hover:bg-[var(--sidebar-accent)] dark:hover:text-[var(--sidebar-accent-foreground)]"
              >
                <div
                  className="flex aspect-square size-10 items-center justify-center rounded-lg
                    bg-sidebar-primary text-sidebar-primary-foreground
                    dark:bg-[var(--sidebar-primary)] dark:text-[var(--sidebar-primary-foreground)]"
                >
                  <BarChart3 className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none dark:text-[var(--sidebar-foreground)]">
                  <span className="font-semibold text-lg">Prohor</span>
                  <span className="text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="dark:text-[var(--sidebar-foreground)]">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        asChild
                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-muted text-primary shadow-sm dark:bg-[var(--muted)] dark:text-[var(--primary)] dark:shadow-glow"
                              : "text-muted-foreground hover:text-primary hover:bg-muted dark:text-[var(--muted-foreground)] dark:hover:text-[var(--primary)] dark:hover:bg-[var(--muted)]"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-300
                  dark:hover:bg-[var(--sidebar-accent)] dark:hover:text-[var(--sidebar-accent-foreground)]"
              >
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
