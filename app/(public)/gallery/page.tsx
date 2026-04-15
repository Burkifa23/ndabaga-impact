import { createClient } from "@/lib/supabase/server"
import Image from "next/image"

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

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-lg text-gray-500">
              No images yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-sm"
              >
                <Image
                  src={img.image_url}
                  alt={img.title ?? "Gallery image"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.title && (
                    <p className="text-white font-semibold text-sm leading-snug">
                      {img.title}
                    </p>
                  )}
                  {img.category && (
                    <span className="mt-1 inline-block text-xs text-white/70 font-medium">
                      {img.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
