"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type DonationStatus = "completed" | "failed"

export async function verifyDonation(id: string, status: DonationStatus) {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from("donations")
      .update({ status })
      .eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/donations")
    revalidatePath("/admin")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: "An unexpected error occurred." }
  }
}
