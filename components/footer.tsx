"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const footerLinks = {
    "About Us": [
      { name: "Home", href: "/" },
      { name: "Mission & Vision", href: "/#about" },
      { name: "Team", href: "#" },
      { name: "Careers", href: "#" },
    ],
    Programs: [
      { name: "Digital Skills", href: "#" },
      { name: "Leadership", href: "#" },
      { name: "Agriculture", href: "#" },
      { name: "Entrepreneurship", href: "#" },
    ],
    Support: [
      { name: "Success Stories", href: "/#alumni-testimonials" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact Us", href: "/#contact" },
      {
        name: "Partner with Us",
        href: "https://docs.google.com/forms/d/e/1FAIpQLScewR9RO88g8hZgW5qagKW_gRPTk0EUj3OOWpjVlVjYwz6EBw/viewform",
        external: true,
      },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <div className="h-10 relative">
                <Image
                  src="/logo-white.svg"
                  alt="Ndabaga Impact"
                  width={150}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Empowering Rwandan youth through digital skills, mentorship, and community-centered innovation for
              sustainable development.
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Ndabaga Impact. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                Terms of Service
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-lg flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-gray-300 group-hover:text-black" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Slogan */}
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 italic">"Empowering Youth, Creating Sustainable Impact"</p>
        </div>
      </div>
    </footer>
  )
}
