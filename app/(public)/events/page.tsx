import { createClient } from "@/lib/supabase/server"
import EventsPageClient from "./events-client"

export default async function EventsPage() {
  const supabase = createClient()

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false })

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Community Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Join us for workshops, camps, and community gatherings designed to empower youth and drive impact.
          </p>
        </div>
        <EventsPageClient events={events ?? []} />
      </div>
    </div>
  )
}
