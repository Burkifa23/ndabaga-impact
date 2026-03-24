"use server"

import { createClient } from "@/lib/supabase/server"
import { projectSchema, type ProjectFormValues } from "@/lib/project-schema"
import { z } from "zod"
import { revalidatePath } from "next/cache"

export async function upsertProject(formData: ProjectFormValues) {
  try {
    const validatedData = projectSchema.parse(formData)
    const supabase = createClient()
    
    // Treat empty string urls natively as null for postgres integrity
    const payload = {
      ...validatedData,
      image_url: validatedData.image_url === "" ? null : validatedData.image_url
    }

    let result;
    if (payload.id) {
      // Process explicit Updates
      result = await supabase.from('projects').update(payload).eq('id', payload.id)
    } else {
      // Process generic Inserts strictly stripping ID artifacts
      const { id, ...insertData } = payload;
      result = await supabase.from('projects').insert([insertData])
    }

    if (result.error) {
      // Check for Postgres Constraint errors mapping exactly to the schema unique blocks
      if (result.error.code === '23505') {
        return { success: false, error: "A project with this exact slug already exists." }
      }
      return { success: false, error: "Failed to save project natively. " + result.error.message }
    }

    revalidatePath("/admin/projects")
    revalidatePath("/") 
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Strict Validation failed. Payload discarded." }
    }
    return { success: false, error: "Internal server error rejecting mutation pipeline." }
  }
}

export async function toggleFeaturedProject(id: string, is_featured: boolean) {
  try {
    const supabase = createClient()
    const { error } = await supabase.from('projects').update({ is_featured }).eq('id', id)
    if (error) throw error
    revalidatePath("/admin/projects")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteProject(id: string) {
  try {
    const supabase = createClient()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error
    revalidatePath("/admin/projects")
    revalidatePath("/")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
