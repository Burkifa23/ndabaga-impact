import Hero from "@/components/hero"
import About from "@/components/about"
import StrategicPillars from "@/components/strategic-pillars"
import Projects from "@/components/projects"
import Impact from "@/components/impact"
import Contact from "@/components/contact"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('home_content')
    .limit(1)
    .single()

  const homeContent = data?.home_content || {}

  // Consolidate specific project data dynamically over homepage mounts preventing disjointed component loading times
  const { data: dbProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <main className="min-h-screen">
      <Hero 
        title={homeContent.heroTitle} 
        subtitle={homeContent.heroSubtitle} 
      />
      <About 
        aboutText={homeContent.aboutSectionText} 
        mission={homeContent.missionStatement} 
        vision={homeContent.visionStatement} 
      />
      <StrategicPillars />
      <Projects 
        projects={dbProjects || []} 
        title={homeContent.featuredProjectsTitle || "Featured Projects"}
        subtitle={homeContent.featuredProjectsSubtitle || "Discover the innovative initiatives that are transforming communities and empowering youth across Rwanda."}
      />
      <Impact />
      <Contact />
    </main>
  )
}
