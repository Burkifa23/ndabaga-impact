"use client"

import { usePathname } from "next/navigation"
import type React from "react"

export default function GlobalLayoutWrapper({ 
  children,
  header,
  footer
}: { 
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
}) {
  const pathname = usePathname()
  
  // If we are anywhere inside the admin portal, completely shred the standard public navigation flows
  if (pathname.startsWith("/admin")) {
    return <>{children}</>
  }
  
  // Return standard public wrapping globally
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  )
}
