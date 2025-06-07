"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sprout, Heart, Briefcase, Crown, Users, Shield, Smartphone } from "lucide-react"

export default function StrategicPillars() {
  const pillars = [
    {
      icon: Sprout,
      title: "Youth in Agriculture",
      description:
        "Promoting youth-led ecofriendly initiatives, agri-innovations and sustainable farming to ensure food security and climate management.",
    },
    {
      icon: Heart,
      title: "Youth in Health",
      description: "Promoting youth that create digital solutions in the health sector for rural communities.",
    },
    {
      icon: Briefcase,
      title: "Youth in Entrepreneurship & Business Creation",
      description: "Supporting startup ecosystems and entrepreneurial skills through capacity building and grants.",
    },
    {
      icon: Crown,
      title: "Youth in Leadership",
      description: "Fostering responsible, value-driven young leaders through intergenerational dialogues.",
    },
    {
      icon: Users,
      title: "Youth in Gender Promotion",
      description: "Advancing gender equity and family wellbeing through youth engagement movements.",
    },
    {
      icon: Shield,
      title: "Youth in Peace Building",
      description:
        "Engaging the youth in community development through research, intergenerational dialogue and creative arts.",
    },
    {
      icon: Smartphone,
      title: "Youth in Digital Transformation & Technology",
      description:
        "Encouraging the holistic intervention of socioeconomic transformation initiatives through digital and technology innovations.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Strategic Pillars</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seven key areas where we focus our efforts to create lasting impact in Rwandan communities through youth
            empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <Card
              key={pillar.title}
              className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border border-gray-200 hover:scale-105 hover:-translate-y-2"
            >
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <pillar.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
