import { z } from "zod"

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Title is required"),
  slug: z.string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(10, "A short description is required"),
  content: z.string().min(10, "Long-form content is required"),
  category: z.string().min(1, "Category is required"),
  status: z.string().min(1, "Status is required"),
  image_url: z.string().url("Must be a valid URL (e.g., https://...)").optional().or(z.literal("")),
  is_featured: z.boolean().default(false),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
