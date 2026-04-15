import { createClient } from "@/lib/supabase/server"
import VolunteersTable from "./volunteers-table"

export type VolunteerApplication = {
  id: string
  full_name: string
  email: string
  phone: string | null
  gender: string | null
  location: string | null
  bio: string | null
  previous_volunteer: boolean | null
  volunteer_experience: string | null
  motivation: string
  skills: string[]
  years_experience: string | null
  time_commitment: string | null
  available_days: string[] | null
  preferred_format: string | null
  expectations: string | null
  status: string
  submitted_date: string
  created_at: string
}

export default async function AdminVolunteersPage() {
  const supabase = createClient()

  const { data: applications, error } = await supabase
    .from("volunteer_applications")
    .select("*")
    .order("submitted_date", { ascending: false })

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Volunteers</h1>
        <p className="text-sm text-red-600">
          Failed to load applications: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Volunteer Applications
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review applicant profiles and approve or reject submissions.
        </p>
      </div>

      <VolunteersTable data={applications as VolunteerApplication[]} />
    </div>
  )
}
