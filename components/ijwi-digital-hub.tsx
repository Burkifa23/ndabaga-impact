"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, Camera, Database, Network, Zap, Globe } from "lucide-react"

export default function IjwiDigitalHub() {
  const features = [
    {
      icon: Monitor,
      title: "Digital Learning Platform",
      description: "Interactive courses and skill-building modules for the digital age",
    },
    {
      icon: Camera,
      title: "Multimedia Creation Suite",
      description: "Professional tools for video, audio, and graphic content production",
    },
    {
      icon: Database,
      title: "Virtual Knowledge Museum",
      description: "Curated repository of Rwandan culture, history, and innovation",
    },
    {
      icon: Network,
      title: "Networking & Job Portal",
      description: "Connect with mentors, peers, and remote work opportunities",
    },
  ]

  return (
    <section id="ijwi-hub" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gray-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gray-600 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gray-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Powered by Innovation
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">IJWI Digital Hub</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A futuristic digital ecosystem where young minds connect, create, and collaborate to build the future of
            Rwanda through technology and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Central Hub Visualization */}
        <div className="relative">
          <Card className="bg-black border-0 overflow-hidden">
            <CardContent className="p-12 text-center text-white relative">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&text=Digital+Network')] opacity-10 bg-cover bg-center" />
              <div className="relative z-10">
                <Globe className="h-20 w-20 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-bold mb-4">Join the Digital Revolution</h3>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Experience the future of learning, creating, and connecting in our state-of-the-art digital ecosystem
                  designed for the next generation.
                </p>
                <div className="flex justify-center">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 transition-colors">
                    Explore the Hub
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
