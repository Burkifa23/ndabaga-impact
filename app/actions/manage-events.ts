"use server"

import { createClient } from "@/lib/supabase/server"
import { eventSchema, type EventFormValues } from "@/lib/events-schema"
import { z } from "zod"
import { revalidatePath } from "next/cache"

export async function upsertEvent(formData: EventFormValues) {
  try {
    const validatedData = eventSchema.parse(formData)
    const supabase = createClient()

    const payload: Record<string, unknown> = {
      ...validatedData,
      image_url: validatedData.image_url === "" ? null : validatedData.image_url,
    }

    let result
    if (payload.id) {
      result = await supabase.from("events").update(payload).eq("id", payload.id)
    } else {
      const { id, ...insertData } = payload
      result = await supabase.from("events").insert([insertData])
    }

    if (result.error) {
      return { success: false, error: "Failed to save event. " + result.error.message }
    }

    revalidatePath("/admin/events")
    revalidatePath("/events")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed. Please check all fields." }
    }
    return { success: false, error: "Internal server error." }
  }
}

export async function deleteEvent(id: string | number) {
  try {
    const supabase = createClient()
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (error) throw error
    revalidatePath("/admin/events")
    revalidatePath("/events")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
