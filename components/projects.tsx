import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectsProps {
  projects?: any[]
  title?: string
  subtitle?: string
}

export default function Projects({ 
  projects: dbProjects = [], 
  title = "Featured Projects", 
  subtitle = "Discover the innovative initiatives that are transforming communities and empowering youth across Rwanda." 
}: ProjectsProps) {

  // Use DB featured projects if they exist, otherwise use fallback data to avoid empty screen
  const projects = dbProjects && dbProjects.length > 0 ? dbProjects : [
    {
      title: "Inkingi Project",
      slug: "#",
      description: "Rural youth empowerment through agriculture, entrepreneurship, and mentorship through remote skills labs.",
      image_url: "/images/inkingi-project.png",
      category: "Agriculture",
      status: "Draft",
    },
    {
      title: "Iteme Project",
      slug: "#",
      description: "Bridging the skills gap with e-learning, mentorship, and employability platforms.",
      image_url: "/images/iteme-project.png",
      category: "Entrepreneurship",
      status: "Draft",
    },
    {
      title: "Youth Camp",
      slug: "#",
      description: "Annual mentorship, leadership, and business training retreat.",
      image_url: "/images/youth-camp.png",
      category: "Leadership",
      status: "Published",
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <Card
              key={project.title}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-0 hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image_url || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className={`w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ${
                    project.status === "Draft" ? "blur-sm" : ""
                  }`}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900 shadow-sm border">
                    {project.category}
                  </span>
                </div>
                {project.status === "Draft" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-900 shadow-lg border">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardContent className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{project.description}</p>
                
                <div className="flex items-center justify-end mt-auto pt-4 border-t">
                  {project.slug !== "#" && (
                    <Button asChild variant="ghost" size="sm" className="group-hover:bg-gray-50 transition-colors text-black hover:text-gray-900">
                      <Link href={`/projects/${project.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
            <Link href="/projects">
              View All Projects
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
