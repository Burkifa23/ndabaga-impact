"use server"

import { createClient } from "@/lib/supabase/server"
import { gallerySchema, type GalleryFormValues } from "@/lib/gallery-schema"
import { z } from "zod"
import { revalidatePath } from "next/cache"

export async function upsertGalleryImage(formData: GalleryFormValues) {
  try {
    const validatedData = gallerySchema.parse(formData)
    const supabase = createClient()

    const payload: Record<string, unknown> = {
      ...validatedData,
    }

    let result
    if (payload.id) {
      result = await supabase.from("gallery_images").update(payload).eq("id", payload.id)
    } else {
      const { id, ...insertData } = payload
      result = await supabase.from("gallery_images").insert([insertData])
    }

    if (result.error) {
      return { success: false, error: "Failed to save gallery image. " + result.error.message }
    }

    revalidatePath("/admin/gallery")
    revalidatePath("/gallery")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed. Please check all fields." }
    }
    return { success: false, error: "Internal server error." }
  }
}

export async function deleteGalleryImage(id: string | number) {
  try {
    const supabase = createClient()
    const { error } = await supabase.from("gallery_images").delete().eq("id", id)
    if (error) throw error
    revalidatePath("/admin/gallery")
    revalidatePath("/gallery")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
