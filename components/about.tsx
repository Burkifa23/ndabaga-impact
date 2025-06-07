"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Heart, Leaf, Lightbulb } from "lucide-react"

export default function About() {
  const beliefs = [
    {
      icon: Users,
      title: "Youth as Catalysts",
      description: "We believe youth are powerful agents of change with the ability to shape prosperous futures.",
    },
    {
      icon: Target,
      title: "Community-Driven Solutions",
      description: "Empowerment must start from the grassroots, with homegrown models.",
    },
    {
      icon: Heart,
      title: "Equity and Inclusion",
      description: "All youth, regardless of background, deserve access to opportunities.",
    },
    {
      icon: Leaf,
      title: "Sustainability and Innovation",
      description:
        "Long-term impact must be based on innovation, environmental responsibility, and socio-economic inclusion.",
    },
    {
      icon: Lightbulb,
      title: "Collaboration and Dialogue",
      description: "Change is accelerated when generations work together and all voices are heard.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Ndabaga Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a Rwandan youth-led organization dedicated to empowering young people with digital skills,
            mentorship, and community-centered innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {beliefs.map((belief, index) => (
            <Card
              key={belief.title}
              className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-gray-200 hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <belief.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{belief.title}</h3>
                <p className="text-gray-600 leading-relaxed">{belief.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              A future where every young person has the opportunity, capacity, and confidence to create positive,
              lasting impact in their communities and beyond.
            </p>

            {/* Motto */}
            <div className="bg-black text-white p-6 rounded-2xl mb-6">
              <p className="text-lg font-medium italic text-center">"Empowering Youth, Creating Sustainable Impact"</p>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Empowering youth with transformative skills, networks, and opportunities that enable them to drive
              sustainable change in their communities and shape a resilient future for Rwanda and beyond.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-black rounded-3xl p-8 text-white">
              <div className="h-full flex flex-col justify-center items-center text-center">
                <h4 className="text-2xl font-bold mb-4">Impact Since 2020</h4>
                <div className="w-full h-[calc(100%-3rem)] relative">
                  <div className="animated-globe">
                    <div className="globe-container">
                      <div className="globe">
                        <div className="globe-highlight"></div>
                      </div>
                      <div className="stats-container">
                        <div className="stat stat-main">
                          <div className="stat-number">500+</div>
                          <div className="stat-label">Youth Trained</div>
                        </div>
                        <div className="stat stat-1">
                          <div className="stat-number">5+</div>
                          <div className="stat-label">Projects</div>
                        </div>
                        <div className="stat stat-2">
                          <div className="stat-number">7</div>
                          <div className="stat-label">Key Pillars</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
