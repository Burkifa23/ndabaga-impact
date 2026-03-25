import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { createClient } from "@/lib/supabase/server"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('seo, general')
    .limit(1)
    .single()

  const seo = data?.seo || {}
  const general = data?.general || {}

  const metaTitle = seo.metaTitle || "Ndabaga Impact - Empowering Youth, Creating Sustainable Impact"
  const metaDescription = seo.metaDescription || "A Rwandan youth-led organization focused on empowering young people with digital skills, mentorship, and community-centered innovation."
  const siteName = general.siteName || "Ndabaga Impact"

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL("https://ndabagaimpact.org"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://ndabagaimpact.org",
      siteName,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: "/logo-black.svg",
          width: 1200,
          height: 630,
          alt: `${siteName} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
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
}

import { Toaster } from "@/components/ui/sonner"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('appearance')
    .limit(1)
    .single()

  const appearance = data?.appearance || {}
  const primaryHex = appearance.primaryHex || "" // Empty to let globals.css fallback naturally if nothing saved
  const accentHex = appearance.accentHex || ""

  return (
    <html lang="en" className="scroll-smooth" style={(primaryHex && accentHex) ? { "--primary": primaryHex, "--accent": accentHex } as React.CSSProperties : {}}>
      <head>
        {/* Additional meta tags for social media */}
        <meta property="og:image:type" content="image/svg+xml" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
