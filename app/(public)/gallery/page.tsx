import { createClient } from "@/lib/supabase/server"
import { Metadata } from "next"
import GalleryClient from "./gallery-client"

export const metadata: Metadata = {
  title: "Impact Gallery | Ndabaga Impact",
  description: "A visual history of the projects, events, and community moments that define Ndabaga Impact.",
}

type GalleryImage = {
  id: string | number
  title: string | null
  category: string | null
  image_url: string
  created_at: string
}

export default async function GalleryPage() {
  const supabase = createClient()

  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })

  const items: GalleryImage[] = images ?? []

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Impact Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A visual history of the projects, events, and community moments that
            define Ndabaga Impact.
          </p>
        </div>

        <GalleryClient items={items} />
      </div>
    </div>
  )
}
