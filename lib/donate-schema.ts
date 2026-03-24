import { z } from "zod"

export const donateSchema = z.object({
  amount: z.number().min(1, "Donation amount must be at least 1"),
  currency: z.string().min(1, "Currency is required"),
  donorName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  project: z.string().optional(),
  method: z.string().min(1, "Payment method is required"),
})

export type DonateFormValues = z.infer<typeof donateSchema>
