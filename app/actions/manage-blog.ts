"use server"

import { createClient } from "@/lib/supabase/server"
import { blogPostSchema, type BlogPostFormValues } from "@/lib/blog-schema"
import { z } from "zod"
import { revalidatePath } from "next/cache"

export async function upsertBlogPost(formData: BlogPostFormValues) {
  try {
    const validatedData = blogPostSchema.parse(formData)
    const supabase = createClient()

    const payload: Record<string, unknown> = {
      ...validatedData,
      image_url: validatedData.image_url === "" ? null : validatedData.image_url,
    }

    if (validatedData.status === "published" && !payload.published_date) {
      payload.published_date = new Date().toISOString()
    }

    let result
    if (payload.id) {
      result = await supabase.from("blog_posts").update(payload).eq("id", payload.id as string)
    } else {
      const { id, ...insertData } = payload
      result = await supabase.from("blog_posts").insert([insertData])
    }

    if (result.error) {
      if (result.error.code === "23505") {
        return { success: false, error: "A post with this slug already exists." }
      }
      return { success: false, error: "Failed to save post. " + result.error.message }
    }

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed. Please check all fields." }
    }
    return { success: false, error: "Internal server error." }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const supabase = createClient()
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)
    if (error) throw error
    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
