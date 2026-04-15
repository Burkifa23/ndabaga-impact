"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function markMessageRead(id: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/messages")
    return { success: true }
  } catch {
    return { success: false, error: "An unexpected error occurred." }
  }
}
