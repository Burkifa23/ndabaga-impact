"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Monitor, Palette, Video, GraduationCap, Building, BookOpen } from "lucide-react"

export default function Programs() {
  const programs = [
    {
      id: "skills-labs",
      title: "Remote Skills Labs",
      icon: Monitor,
      description: "Virtual learning environments providing digital skills training to youth across Rwanda.",
      features: ["Web Development", "Digital Marketing", "Data Analysis", "Graphic Design"],
      participants: "300+ active learners",
    },
    {
      id: "arts-crafts",
      title: "Arts & Crafts",
      icon: Palette,
      description: "Creative workshops fostering artistic expression and traditional craft preservation.",
      features: ["Traditional Crafts", "Modern Art", "Cultural Preservation", "Creative Entrepreneurship"],
      participants: "150+ artists",
    },
    {
      id: "content-studio",
      title: "Ijwi Content Studio",
      icon: Video,
      description: "Professional content creation hub for youth storytelling and media production.",
      features: ["Video Production", "Podcast Creation", "Photography", "Digital Storytelling"],
      participants: "100+ content creators",
    },
    {
      id: "trainings",
      title: "Customized Trainings",
      icon: GraduationCap,
      description: "Tailored training programs designed to meet specific community and organizational needs.",
      features: ["Leadership Development", "Technical Skills", "Soft Skills", "Community Engagement"],
      participants: "500+ trainees",
    },
    {
      id: "ijwi-centers",
      title: "Ijwi Centers",
      icon: Building,
      description: "Physical hubs providing access to technology, mentorship, and collaborative spaces.",
      features: ["Co-working Spaces", "Mentorship Programs", "Tech Access", "Community Events"],
      participants: "200+ members",
    },
    {
      id: "magazine",
      title: "Online Magazine",
      icon: BookOpen,
      description: "Digital publication platform showcasing youth voices, stories, and innovations.",
      features: ["Youth Stories", "Innovation Spotlights", "Community News", "Educational Content"],
      participants: "10,000+ readers",
    },
  ]

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Programs & Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive programs designed to equip youth with the skills, resources, and platforms they need to thrive
            in the digital age.
          </p>
        </div>

        <Tabs defaultValue="skills-labs" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            {programs.map((program) => (
              <TabsTrigger
                key={program.id}
                value={program.id}
                className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gray-100"
              >
                <program.icon className="h-5 w-5" />
                <span className="text-xs font-medium hidden sm:block">{program.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {programs.map((program) => (
            <TabsContent key={program.id} value={program.id}>
              <Card className="bg-gray-50 border-0">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
                          <program.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                          <p className="text-gray-700 font-medium">{program.participants}</p>
                        </div>
                      </div>

                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {program.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-black rounded-full" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button className="bg-black hover:bg-gray-800 text-white">Learn More</Button>
                    </div>

                    <div className="relative">
                      <div className="aspect-square bg-black rounded-3xl p-8 text-white">
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <program.icon className="h-20 w-20 mb-6 opacity-80" />
                          <h4 className="text-xl font-bold mb-2">{program.title}</h4>
                          <p className="text-sm opacity-90">Transforming lives through innovative programs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
