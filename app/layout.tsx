import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ndabaga Impact - Empowering Youth, Creating Sustainable Impact",
  description:
    "A Rwandan youth-led organization focused on empowering young people with digital skills, mentorship, and community-centered innovation.",
  metadataBase: new URL("https://ndabagaimpact.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ndabagaimpact.org",
    siteName: "Ndabaga Impact",
    title: "Ndabaga Impact - Empowering Youth, Creating Sustainable Impact",
    description:
      "A Rwandan youth-led organization focused on empowering young people with digital skills, mentorship, and community-centered innovation.",
    images: [
      {
        url: "/logo-black.svg",
        width: 1200,
        height: 630,
        alt: "Ndabaga Impact Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ndabaga Impact - Empowering Youth, Creating Sustainable Impact",
    description:
      "A Rwandan youth-led organization focused on empowering young people with digital skills, mentorship, and community-centered innovation.",
    images: ["/logo-black.svg"],
    creator: "@ndabagaimpact",
  },
  icons: {
    icon: [
      {
        url: "/logo-black.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo-white.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional meta tags for social media */}
        <meta property="og:image:type" content="image/svg+xml" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <ScrollToTop />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
