"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type VolunteerStatus = "approved" | "rejected"

export async function reviewVolunteer(id: string, status: VolunteerStatus) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from("volunteer_applications")
      .update({ status })
      .eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/volunteers")
    revalidatePath("/admin")
    return { success: true }
  } catch {
    return { success: false, error: "An unexpected error occurred." }
  }
}
