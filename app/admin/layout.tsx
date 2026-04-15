"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Settings, FolderOpen, LogOut, DollarSign, Users, FileText } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard",  href: "/admin/dashboard",  icon: LayoutDashboard },
    { name: "Donations",  href: "/admin/donations",  icon: DollarSign },
    { name: "Volunteers", href: "/admin/volunteers", icon: Users },
    { name: "Projects",   href: "/admin/projects",   icon: FolderOpen },
    { name: "Blog",       href: "/admin/blog",       icon: FileText },
    { name: "Settings",   href: "/admin/settings",   icon: Settings },
  ]
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar sidebar */}
      <div className="w-64 bg-white border-r h-full flex flex-col flex-shrink-0 z-20 shadow-sm">
        <div className="p-6 border-b flex items-center justify-center">
          <Link href="/" className="font-bold text-xl tracking-tight text-black flex items-center gap-2">
            NDABAGA <span className="text-gray-400 font-light">CMS</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            // Protect against aggressive strict matches handling sub-routes
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
        
        <div className="p-4 border-t bg-gray-50/50">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors font-medium"
          >
            <LogOut className="h-5 w-5" />
            <span>Exit System</span>
          </Link>
        </div>
      </div>
      
      {/* Main Content Area trapped gracefully within bounding box preventing lateral scroll */}
      <main className="flex-1 h-full overflow-y-auto w-full p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto pb-20">
          {children}
        </div>
      </main>
    </div>
  )
}
