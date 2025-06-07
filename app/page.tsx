import Hero from "@/components/hero"
import About from "@/components/about"
import StrategicPillars from "@/components/strategic-pillars"
import Projects from "@/components/projects"
import Impact from "@/components/impact"
import Contact from "@/components/contact"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <StrategicPillars />
      <Projects />
      <Impact />
      <Contact />
    </main>
  )
}
