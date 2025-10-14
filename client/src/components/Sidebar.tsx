import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import {
  Home,
  LayoutDashboard,
  Video,
  Plus,
  MessageSquare,
  User,
  Settings,
  Youtube,
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { cn } from ".././lib/utils"

const creatorNavItems = [
  { id: "creator-home", icon: Home, label: "Home", path: "/" },
  { id: "creator-dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/creator-dashboard" },
  { id: "creator-new-project", icon: Plus, label: "New Project", path: "/create-project" },
  { id: "creator-messages", icon: MessageSquare, label: "Messages", path: "/messages" },
  { id: "creator-profile", icon: User, label: "Profile", path: "/profile" },
]

const editorNavItems = [
  { id: "editor-home", icon: Home, label: "Home", path: "/" },
  { id: "editor-dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/editor-dashboard" },
  { id: "editor-browse", icon: Video, label: "Browse Projects", path: "/editor-dashboard" },
  { id: "editor-messages", icon: MessageSquare, label: "Messages", path: "/messages" },
  { id: "editor-profile", icon: User, label: "Profile", path: "/profile" },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  // Determine which nav items to show based on user role or current path
  const isCreatorPath = location.pathname.includes('creator') || location.pathname.includes('create-project')
  const navItems = isCreatorPath ? creatorNavItems : editorNavItems

  return (
    <div className={cn(
      "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Profile Section */}
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user?.name || 'User'}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {isCreatorPath ? 'Creator' : 'Editor'}
                  </Badge>
                  {user?.verified && (
                    <Youtube className="h-3 w-3 text-red-600" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed && "px-2",
                    isActive && "bg-primary/10 text-primary"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                  {!collapsed && item.label}
                </Button>
              )
            })}
          </div>
        </nav>

        <Separator />

        {/* Quick Stats */}
        {!collapsed && (
          <div className="p-4 space-y-3">
            <div className="text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Projects</span>
                <Badge variant="outline">3</Badge>
              </div>
            </div>
            <div className="text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Messages</span>
                <Badge variant="destructive">2</Badge>
              </div>
            </div>
          </div>
        )}

        {/* Role Switch */}
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate(isCreatorPath ? '/editor-dashboard' : '/creator-dashboard')}
          >
            {collapsed ? (
              <Users className="h-4 w-4" />
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Switch to {isCreatorPath ? 'Editor' : 'Creator'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}