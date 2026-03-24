"use server"

import { createClient } from "@/lib/supabase/server"
import { donateSchema, type DonateFormValues } from "@/lib/donate-schema"
import { z } from "zod"

export async function submitDonation(formData: DonateFormValues) {
  try {
    const validatedData = donateSchema.parse(formData)
    
    // Establishing strict server boundary parsing ensuring statuses are never forged remotely
    const supabase = createClient()
    const { error } = await supabase.from('donations').insert({
      amount: validatedData.amount,
      currency: validatedData.currency,
      donor_name: validatedData.donorName,
      email: validatedData.email,
      project: validatedData.project,
      method: validatedData.method,
      status: 'pending' 
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return { success: false, error: "Failed to process donation pledge. Please try again." }
    }

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed. Please check your inputs." }
    }
    return { success: false, error: "Internal server error." }
  }
}
