"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, ChevronLeft, ChevronRight, Play } from "lucide-react"

export default function Impact() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Olive Mukeshimana",
      role: "Participant",
      content:
        "Ndabaga Impact taught me the importance of Mushrooms. I didn't know the importance of Mushrooms now I know the use of it and how healthy it is for my life.",
      avatar: "/placeholder.svg?height=80&width=80&text=OM",
    },
    {
      name: "Fabrice Rukundo",
      role: "Participant",
      content:
        "Ndabaga is a good family that helps the youth with their projects for example how to farm. They taught us about how to grow Mushrooms and I use that knowledge in my daily life.",
      avatar: "/placeholder.svg?height=80&width=80&text=FR",
    },
    {
      name: "Byukusenge Emmerance",
      role: "Participant",
      content:
        "It's an organisation that helped us know how we could start a business by sharing different ideas. To this day it still helps us.",
      avatar: "/placeholder.svg?height=80&width=80&text=BE",
    },
    {
      name: "Muhorakeye Gisèle",
      role: "Participant",
      content:
        "They gave us the right lessons about Nature we got clarity about it and we loved it. The Teacher helped with giving us different exercise to make sure we get the lessons. Ndabaga Impact played their part, the rest is ours.",
      avatar: "/placeholder.svg?height=80&width=80&text=MG",
    },
    {
      name: "Ishimwe Jean Claude",
      role: "Participant",
      content:
        "The first thing I liked about Ndabaga Impact is how they trained the youth with different skills. That has great value for the country and the youth. Also the way they took care of us treating us equally making sure no one is left out. Now I am student and I am glad to have the basics that help me with school.",
      avatar: "/placeholder.svg?height=80&width=80&text=IJ",
    },
  ]

  const successStories = [
    {
      id: "IR_yqB25Vio",
      title: "Ndabaga Impact Documentary",
      description: "Exploring our community initiatives and their impact",
    },
    {
      id: "RMMTJxLabao",
      title: "Youth Impact Camp",
      description: "Full documentary of our transformative youth camp",
    },
    {
      id: "53ag_9ogcxM",
      title: "Community Transformation",
      description: "How our programs are changing lives across Rwanda",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Testimonials</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measuring success through the lives we've touched and the communities we've transformed.
          </p>
        </div>

        {/* Success Stories Video Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((video) => (
              <Card key={video.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video bg-gray-100">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                  />
                  {/* Play button overlay for better UX */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-gray-900 ml-1" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">{video.title}</h4>
                  <p className="text-sm text-gray-600">{video.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div id="alumni-testimonials" className="relative">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Alumni Say</h3>

          <Card className="max-w-4xl mx-auto bg-gray-50 border-0">
            <CardContent className="p-12 text-center">
              <Quote className="h-12 w-12 text-gray-500 mx-auto mb-6" />

              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[currentTestimonial].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
