import { Metadata } from "next"
import SettingsClient from "./settings-client"

export const metadata: Metadata = {
  title: "Admin Settings | Ndabaga Impact",
  description: "Manage global platform preferences, SEO, appearance, and maintenance.",
}

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-muted/40 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage global platform preferences, SEO, appearance, and maintenance.</p>
        </div>
        <SettingsClient />
      </div>
    </main>
  )
}
