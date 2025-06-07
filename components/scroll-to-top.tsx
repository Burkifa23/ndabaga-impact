"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Always scroll to top when pathname changes, unless there's a hash
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        // If there's a hash, handle section scrolling
        const hash = window.location.hash
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      } else {
        // No hash, scroll to top
        window.scrollTo(0, 0)
      }
    }
  }, [pathname])

  return null
}
