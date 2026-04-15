import { z } from "zod"

export const blogPostSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Title is required"),
  slug: z.string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "An excerpt is required"),
  content: z.string().min(10, "Content is required"),
  category: z.string().min(1, "Category is required"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
})

export type BlogPostFormValues = z.infer<typeof blogPostSchema>
