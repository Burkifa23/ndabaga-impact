"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Youth Camp", "Training Sessions", "Community Events", "Agriculture", "Digital Skills"]

  const galleryItems = [
    {
      id: 1,
      title: "Youth Leadership Camp 2024",
      category: "Youth Camp",
      date: "March 2024",
      location: "Kigali, Rwanda",
      participants: "150+ Youth",
      image: "/placeholder.svg?height=400&width=600&text=Youth+Camp+2024",
      description: "Annual leadership development retreat bringing together young leaders from across Rwanda.",
    },
    {
      id: 2,
      title: "Digital Skills Training",
      category: "Digital Skills",
      date: "February 2024",
      location: "Remote Skills Lab",
      participants: "80+ Participants",
      image: "/placeholder.svg?height=400&width=600&text=Digital+Skills+Training",
      description: "Intensive web development and digital marketing training for rural youth.",
    },
    {
      id: 3,
      title: "Community Agriculture Workshop",
      category: "Agriculture",
      date: "January 2024",
      location: "Musanze District",
      participants: "60+ Farmers",
      image: "/placeholder.svg?height=400&width=600&text=Agriculture+Workshop",
      description: "Sustainable farming techniques and modern agricultural practices training.",
    },
    {
      id: 4,
      title: "Entrepreneurship Bootcamp",
      category: "Training Sessions",
      date: "December 2023",
      location: "Kigali Innovation Hub",
      participants: "45+ Entrepreneurs",
      image: "/placeholder.svg?height=400&width=600&text=Entrepreneurship+Bootcamp",
      description: "Business development and startup incubation program for young entrepreneurs.",
    },
    {
      id: 5,
      title: "Community Health Initiative",
      category: "Community Events",
      date: "November 2023",
      location: "Nyagatare District",
      participants: "200+ Community Members",
      image: "/placeholder.svg?height=400&width=600&text=Health+Initiative",
      description: "Health awareness campaign and digital health solutions demonstration.",
    },
    {
      id: 6,
      title: "Youth Innovation Summit",
      category: "Youth Camp",
      date: "October 2023",
      location: "Kigali Convention Centre",
      participants: "300+ Participants",
      image: "/placeholder.svg?height=400&width=600&text=Innovation+Summit",
      description: "Annual summit showcasing youth-led innovations and technological solutions.",
    },
    {
      id: 7,
      title: "Rural Connectivity Project",
      category: "Digital Skills",
      date: "September 2023",
      location: "Gicumbi District",
      participants: "120+ Youth",
      image: "/placeholder.svg?height=400&width=600&text=Rural+Connectivity",
      description: "Bringing digital literacy and internet access to remote communities.",
    },
    {
      id: 8,
      title: "Green Energy Workshop",
      category: "Training Sessions",
      date: "August 2023",
      location: "Huye District",
      participants: "75+ Participants",
      image: "/placeholder.svg?height=400&width=600&text=Green+Energy+Workshop",
      description: "Sustainable energy solutions and environmental conservation training.",
    },
    {
      id: 9,
      title: "Women in Tech Conference",
      category: "Community Events",
      date: "July 2023",
      location: "Kigali Tech Hub",
      participants: "180+ Women",
      image: "/placeholder.svg?height=400&width=600&text=Women+in+Tech",
      description: "Empowering women through technology and digital entrepreneurship.",
    },
  ]

  const filteredItems =
    selectedCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const openModal = (index: number) => {
    setSelectedImage(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredItems.length) % filteredItems.length)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Our Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Capturing moments of transformation, growth, and impact across our programs and initiatives.
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={category === selectedCategory ? "bg-black text-white hover:bg-gray-800" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900">{item.category}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {item.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {item.participants}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src={filteredItems[selectedImage].image || "/placeholder.svg"}
                alt={filteredItems[selectedImage].title}
                width={800}
                height={600}
                className="w-full h-auto max-h-[70vh] object-contain"
              />

              {/* Image Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{filteredItems[selectedImage].category}</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{filteredItems[selectedImage].title}</h3>
                <p className="text-gray-600 mb-4">{filteredItems[selectedImage].description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {filteredItems[selectedImage].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {filteredItems[selectedImage].location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {filteredItems[selectedImage].participants}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
