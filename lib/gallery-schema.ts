import { z } from "zod"

export const gallerySchema = z.object({
  id: z.union([z.string().uuid(), z.number()]).optional(),
  title: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  image_url: z.string().url("Must be a valid URL"),
})

export type GalleryFormValues = z.infer<typeof gallerySchema>
