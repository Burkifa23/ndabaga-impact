"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check if we're on the home page
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // For non-home pages, always use white background and black logo
  const shouldUseWhiteBackground = !isHomePage || isScrolled
  const shouldUseBlackLogo = !isHomePage || isScrolled

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    // If it's a section link (starts with /#) and we're not on home page
    if (href.startsWith("/#") && !isHomePage) {
      e.preventDefault()
      // Navigate to home page with the hash
      router.push(href)
    }
    // Close mobile menu
    setIsOpen(false)
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        shouldUseWhiteBackground ? "bg-white/90 backdrop-blur-md border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="h-8 relative">
              <Image
                src={shouldUseBlackLogo ? "/logo-black.svg" : "/logo-white.svg"}
                alt="Ndabaga Impact"
                width={120}
                height={32}
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`transition-colors duration-200 font-medium ${
                  shouldUseBlackLogo ? "text-gray-900 hover:text-black" : "text-white hover:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="bg-black hover:bg-gray-800 text-white">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScewR9RO88g8hZgW5qagKW_gRPTk0EUj3OOWpjVlVjYwz6EBw/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Our Movement
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className={`h-6 w-6 ${shouldUseBlackLogo ? "text-gray-900" : "text-white"}`} />
              ) : (
                <Menu className={`h-6 w-6 ${shouldUseBlackLogo ? "text-gray-900" : "text-white"}`} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="block px-3 py-2 text-gray-900 hover:text-black transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScewR9RO88g8hZgW5qagKW_gRPTk0EUj3OOWpjVlVjYwz6EBw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Our Movement
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
