import { createClient } from "@/lib/supabase/server"
import MessagesTable from "./messages-table"

export type ContactMessage = {
  id: string
  created_at: string
  name: string | null
  email: string | null
  subject: string | null
  message: string | null
  is_read: boolean
}

export default async function AdminMessagesPage() {
  const supabase = createClient()

  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-sm text-red-600">
          Failed to load messages: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Contact Messages
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Incoming submissions from the public contact form.
        </p>
      </div>

      <MessagesTable data={(messages ?? []) as ContactMessage[]} />
    </div>
  )
}
