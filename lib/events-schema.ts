import { z } from "zod"

export const eventSchema = z.object({
  id: z.union([z.string().uuid(), z.number()]).optional(),
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "A description is required"),
  status: z.enum(["Upcoming", "Ongoing", "Completed"]),
  location: z.string().min(2, "Location is required"),
  start_date: z.string().min(1, "Start date is required"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  registered: z.coerce.number().int().min(0).optional(),
  capacity: z.coerce.number().int().min(1, "Capacity must be at least 1").optional(),
})

export type EventFormValues = z.infer<typeof eventSchema>
