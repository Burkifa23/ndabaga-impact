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

function hexToHSL(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1]);
    g = parseInt("0x" + hex[2] + hex[2]);
    b = parseInt("0x" + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2]);
    g = parseInt("0x" + hex[3] + hex[4]);
    b = parseInt("0x" + hex[5] + hex[6]);
  }
  r /= 255; g /= 255; b /= 255;
  const cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin;
  let h = 0, s = 0, l = 0;
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return `${h} ${s}% ${l}%`;
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
  
  const customStyles: React.CSSProperties = {}
  if (primaryHex) customStyles["--primary" as any] = hexToHSL(primaryHex)
  if (accentHex) customStyles["--accent" as any] = hexToHSL(accentHex)

  return (
    <html lang="en" className={`scroll-smooth ${appearance.darkMode ? 'dark' : ''}`} style={customStyles}>
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
