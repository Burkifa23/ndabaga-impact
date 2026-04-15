import { createClient } from "@/lib/supabase/server"
import DonationsTable from "./donations-table"

export type Donation = {
  id: string
  donor_name: string
  email: string | null
  amount: number
  currency: string
  method: string | null
  status: string
  donation_date: string
  created_at: string
  project: string | null
  message: string | null
}

export default async function AdminDonationsPage() {
  const supabase = createClient()

  const { data: donations, error } = await supabase
    .from("donations")
    .select("*")
    .order("donation_date", { ascending: false })

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Donations</h1>
        <p className="text-sm text-red-600">
          Failed to load donations: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Donations
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manually verify Mobile Money, Bank Transfer, and Cash pledges.
        </p>
      </div>

      <DonationsTable data={donations as Donation[]} />
    </div>
  )
}
