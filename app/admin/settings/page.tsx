import SettingsClient from "./settings-client"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings Manager</h1>
        <p className="text-gray-500">Configure global platform details, visuals, and messaging.</p>
      </div>
      
      <SettingsClient />
    </div>
  )
}
