"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://www.youtube.com/embed/RMMTJxLabao?autoplay=1&mute=1&loop=1&playlist=RMMTJxLabao&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&cc_load_policy=0"
          className="w-full h-full object-cover scale-125"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 mt-20">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Empowering Youth, <span className="text-gray-300">Creating Sustainable Impact</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              asChild
              size="lg"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <Link href="#projects">
                Explore Our Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group"
            >
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScewR9RO88g8hZgW5qagKW_gRPTk0EUj3OOWpjVlVjYwz6EBw/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Join Our Movement
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
