"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, DollarSign, ArrowRight, CheckCircle } from "lucide-react"

export default function GetInvolved() {
  const pathways = [
    {
      icon: Users,
      title: "Mentorship",
      description: "Share your expertise and guide the next generation of leaders",
      benefits: [
        "One-on-one mentoring sessions",
        "Group workshops and masterclasses",
        "Virtual and in-person opportunities",
        "Flexible time commitments",
      ],
      cta: "Become a Mentor",
    },
    {
      icon: Heart,
      title: "Volunteering",
      description: "Contribute your time and skills to meaningful community projects",
      benefits: [
        "Project-based volunteering",
        "Skills-based contributions",
        "Community event support",
        "Remote opportunities available",
      ],
      cta: "Start Volunteering",
    },
    {
      icon: DollarSign,
      title: "Donating",
      description: "Support our mission with financial contributions that create lasting impact",
      benefits: [
        "Direct impact on youth programs",
        "Transparent fund allocation",
        "Regular impact reports",
        "Tax-deductible contributions",
      ],
      cta: "Make a Donation",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get Involved</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our movement and help us create sustainable impact in Rwandan communities. Every contribution, big or
            small, makes a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pathways.map((pathway, index) => (
            <Card
              key={pathway.title}
              className="group relative overflow-hidden bg-white border-0 hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <pathway.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {pathway.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{pathway.description}</p>

                <div className="space-y-3 mb-8">
                  {pathway.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className="w-full bg-black hover:bg-gray-800 text-white group-hover:shadow-lg transition-all duration-300"
                >
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScewR9RO88g8hZgW5qagKW_gRPTk0EUj3OOWpjVlVjYwz6EBw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pathway.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <Card className="bg-black border-0 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of changemakers who are already part of our community. Together, we can create a brighter
              future for Rwandan youth.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 transition-colors">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScewR9RO88g8hZgW5qagKW_gRPTk0EUj3OOWpjVlVjYwz6EBw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Our Community
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
