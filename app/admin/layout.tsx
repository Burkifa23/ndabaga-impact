"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Settings, FolderOpen, LogOut, DollarSign, Users, FileText, Mail, Calendar, Image as ImageIcon, Menu } from "lucide-react"
import { signOutAction } from "@/app/actions/auth"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard",  href: "/admin",  icon: LayoutDashboard },
  { name: "Donations",  href: "/admin/donations",  icon: DollarSign },
  { name: "Volunteers", href: "/admin/volunteers", icon: Users },
  { name: "Projects",   href: "/admin/projects",   icon: FolderOpen },
  { name: "Events",     href: "/admin/events",     icon: Calendar },
  { name: "Gallery",    href: "/admin/gallery",    icon: ImageIcon },
  { name: "Blog",       href: "/admin/blog",       icon: FileText },
  { name: "Messages",  href: "/admin/messages",   icon: Mail },
  { name: "Settings",   href: "/admin/settings",   icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b flex items-center justify-center shrink-0">
        <Link href="/" className="font-bold text-xl tracking-tight text-black flex items-center gap-2">
          NDABAGA <span className="text-gray-400 font-light">CMS</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-black text-white shadow-md font-semibold" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
              }`}
            >
              <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t bg-gray-50/50 shrink-0">
        <form action={signOutAction}>
          <button 
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors font-medium"
          >
            <LogOut className="h-5 w-5" />
            <span>Exit System</span>
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b shrink-0 z-20">
        <Link href="/" className="font-bold text-lg tracking-tight text-black">
          NDABAGA <span className="text-gray-400 font-light">CMS</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r h-full flex-col shrink-0 z-20 shadow-sm">
        <SidebarContent />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto w-full p-4 md:p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto pb-20">
          {children}
        </div>
      </main>
    </div>
  )
}
