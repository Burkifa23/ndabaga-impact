import { createClient } from "@/lib/supabase/server"
import EventsClient from "./events-client"

export default async function AdminEventsPage() {
  const supabase = createClient()

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false })

  return <EventsClient initialEvents={events || []} />
}
