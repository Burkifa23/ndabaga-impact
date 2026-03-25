import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Folder } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!project) {
    notFound()
  }

  // Define a safely structured date string if applicable
  const dateFormatted = new Date(project.created_at).toLocaleDateString("en-US", {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <article className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/projects" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-10 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        {/* Hero Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className="bg-black text-white hover:bg-gray-800 text-sm px-4 py-1">
              <Folder className="mr-2 h-4 w-4 inline" />
              {project.category}
            </Badge>
            <div className="flex items-center text-sm text-gray-500 font-medium">
              <Calendar className="mr-2 h-4 w-4" />
              {dateFormatted}
            </div>
            {project.status === "Draft" && (
              <Badge variant="outline" className="border-yellow-400 text-yellow-700 bg-yellow-50">
                Coming Soon
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </header>

        {/* Cover Image */}
        {project.image_url && (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl mb-16 border bg-white">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content Body */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
          {project.content ? (
            <div className="prose dark:prose-invert max-w-none">
              {project.content.split('\n').map((paragraph: string, idx: number) => {
                if (!paragraph.trim()) return null
                return <p key={idx}>{paragraph}</p>
              })}
            </div>
          ) : (
             <div className="text-center py-12 text-gray-500">
               <p className="text-lg">Detailed content is currently being prepared for this initiative.</p>
             </div>
          )}
        </div>

      </div>
    </article>
  )
}
