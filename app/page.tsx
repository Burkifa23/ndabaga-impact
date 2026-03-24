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
      <Projects />
      <Impact />
      <Contact />
    </main>
  )
}
