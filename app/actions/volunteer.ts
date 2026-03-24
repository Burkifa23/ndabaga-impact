"use server"

import { createClient } from "@/lib/supabase/server"
import { volunteerSchema, type VolunteerFormValues } from "@/lib/volunteer-schema"
import { z } from "zod"

export async function submitVolunteerApplication(formData: VolunteerFormValues) {
  try {
    const validatedData = volunteerSchema.parse(formData)
    
    const supabase = createClient()
    const { error } = await supabase.from('volunteer_applications').insert({
      full_name: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      gender: validatedData.gender,
      location: validatedData.location,
      bio: validatedData.bio,
      previous_volunteer: validatedData.previousVolunteer === "Yes",
      volunteer_experience: validatedData.volunteerExperience,
      motivation: validatedData.motivation,
      skills: validatedData.skills,
      years_experience: validatedData.yearsExperience,
      time_commitment: validatedData.timeCommitment,
      available_days: validatedData.availableDays || [],
      preferred_format: validatedData.preferredFormat,
      expectations: validatedData.expectations,
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return { success: false, error: "Failed to submit application. Please try again." }
    }

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed. Please check your inputs." }
    }
    return { success: false, error: "Internal server error." }
  }
}
