import { z } from "zod"

export const volunteerSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  gender: z.string().min(1, "Gender is required"),
  location: z.string().optional(),
  bio: z.string().optional(),
  previousVolunteer: z.string(), // "Yes" / "No" string radiogroup conversion
  volunteerExperience: z.string().optional(),
  motivation: z.string().min(10, "Motivation must be at least 10 characters"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  yearsExperience: z.string().min(1, "Experience level is required"),
  timeCommitment: z.string().min(1, "Time commitment is required"),
  availableDays: z.array(z.string()).optional(),
  preferredFormat: z.string().min(1, "Preferred format is required"),
  expectations: z.string().optional(),
})

export type VolunteerFormValues = z.infer<typeof volunteerSchema>
