"use client"

import { useState } from "react"
import Image from "next/image"

type GalleryImage = {
  id: string | number
  title: string | null
  category: string | null
  image_url: string
  created_at: string
}

export default function GalleryClient({ items }: { items: GalleryImage[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(items.map(item => item.category).filter(Boolean))) as string[]]

  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(item => item.category === selectedCategory)

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg text-gray-500">
          No images yet. Check back soon!
        </p>
      </div>
    )
  }

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((img) => (
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
    </div>
  )
}
