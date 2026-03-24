import { Metadata } from "next"
import EventsPageClient from "./events-client"

export const metadata: Metadata = {
  title: "Events & Programs | Ndabaga Impact",
  description: "Discover our upcoming camps, bootcamps, and workshops. Join us in making a sustainable impact.",
}

export default function EventsPage() {
  return (
    <main className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Events & Programs</h1>
          <p className="text-lg text-muted-foreground">
            Explore our initiatives designed to empower youth, build essential skills, and foster community innovation. Register your interest to join our upcoming sessions.
          </p>
        </div>
        <EventsPageClient />
      </div>
    </main>
  )
}
