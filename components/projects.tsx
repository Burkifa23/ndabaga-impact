"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      title: "Inkingi Project",
      description:
        "Rural youth empowerment through agriculture, entrepreneurship, and mentorship through remote skills labs.",
      image: "/images/inkingi-project.png",
      category: "Agriculture",
      impact: "",
      status: "launching-soon",
    },
    {
      title: "Iteme Project",
      description: "Bridging the skills gap with e-learning, mentorship, and employability platforms.",
      image: "/images/iteme-project.png",
      category: "Entrepreneurship",
      impact: "",
      status: "launching-soon",
    },
    {
      title: "Ijwi Project",
      description: "Community-based and intergenerational dialogues for policy advocacy and resilience.",
      image: "/images/ijwi-project.png",
      category: "Digital Media",
      impact: "",
      status: "launching-soon",
    },
    {
      title: "Youth Camp",
      description: "Annual mentorship, leadership, and business training retreat.",
      image: "/images/youth-camp.png",
      category: "Leadership",
      impact: "300+ youth leaders",
      status: "active",
    },
    {
      title: "Green Energy Youth Initiative (GEYI)",
      description: "Promoting sustainable cooking and green energy entrepreneurship.",
      image: "/images/geyi-project.png",
      category: "Environment",
      impact: "",
      status: "launching-soon",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the innovative initiatives that are transforming communities and empowering youth across Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-0 hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className={`w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ${
                    project.status === "launching-soon" ? "blur-sm" : ""
                  }`}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                    {project.category}
                  </span>
                </div>
                {project.status === "launching-soon" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-900">
                      Launching Soon
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between">
                  {project.impact && <span className="text-sm font-medium text-gray-700">{project.impact}</span>}
                  {project.status === "active" && (
                    <Button variant="ghost" size="sm" className="group-hover:bg-gray-50 transition-colors ml-auto">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
