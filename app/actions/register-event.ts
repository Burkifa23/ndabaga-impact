"use server"

import { createClient } from "@/lib/supabase/server"

export async function registerForEvent(eventId: string | number, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) {
    return { success: false, error: "Name and email are required" }
  }

  const supabase = createClient()

  try {
    // Ideally we would have an event_registrations table. 
    // Since we only have the events table with a registered count, we will increment it.
    // Fetch current registered count
    const { data: event, error: fetchError } = await supabase
      .from("events")
      .select("registered, capacity")
      .eq("id", eventId)
      .single()

    if (fetchError) throw fetchError

    if (event.capacity && event.registered >= event.capacity) {
      return { success: false, error: "Event is already full" }
    }

    const { error: updateError } = await supabase
      .from("events")
      .update({ registered: (event.registered || 0) + 1 })
      .eq("id", eventId)

    if (updateError) throw updateError

    // Simulating email notification since we don't have Resend configured yet
    console.log(`[MOCK EMAIL]: Registration confirmed for ${name} (${email}) for Event #${eventId}`)

    return { success: true }
  } catch (err: any) {
    console.error("Error registering for event:", err)
    return { success: false, error: err.message || "Failed to register" }
  }
}
