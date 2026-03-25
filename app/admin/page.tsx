import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  Users,
  Mail,
  FolderOpen,
  Clock,
  TrendingUp,
  AlertCircle,
  Activity,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import DashboardCharts from "./dashboard-charts"

// ─── Types ───────────────────────────────────────────────────────────────────

type ActivityItem = {
  id: string
  type: "donation" | "volunteer" | "message"
  title: string
  subtitle: string
  date: string
  status?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function getMonthLabel(dateStr: string) {
  return MONTH_LABELS[new Date(dateStr).getMonth()]
}

function getStatusColor(status?: string) {
  switch (status) {
    case "pending":   return "bg-amber-50 text-amber-700 border-amber-200"
    case "approved":
    case "verified":  return "bg-green-50 text-green-700 border-green-200"
    case "rejected":  return "bg-red-50 text-red-700 border-red-200"
    default:          return "bg-gray-100 text-gray-600 border-gray-200"
  }
}

const ACTIVITY_ROUTES: Record<ActivityItem["type"], string> = {
  donation: "/admin/donations",
  volunteer: "/admin/volunteers",
  message: "/admin/messages",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminDashboardPage() {
  const supabase = createClient()

  // ── Parallel metric queries ───────────────────────────────────────────────
  const [
    { count: pendingDonations },
    { count: pendingVolunteers },
    { count: unreadMessages },
    { count: totalProjects },
  ] = await Promise.all([
    supabase.from("donations").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("volunteer_applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("projects").select("*", { count: "exact", head: true }),
  ])

  // ── Activity feed: last 7 of each ────────────────────────────────────────
  const [
    { data: recentDonations },
    { data: recentVolunteers },
    { data: recentMessages },
  ] = await Promise.all([
    supabase
      .from("donations")
      .select("id, donor_name, amount, currency, method, status, created_at")
      .order("created_at", { ascending: false })
      .limit(7),
    supabase
      .from("volunteer_applications")
      .select("id, full_name, skills, status, created_at")
      .order("created_at", { ascending: false })
      .limit(7),
    supabase
      .from("contact_messages")
      .select("id, name, subject, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(7),
  ])

  // ── Charts: last 6 months monetary donations ──────────────────────────────
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const { data: monetaryDonations } = await supabase
    .from("donations")
    .select("amount, method, created_at")
    .neq("method", "In-Kind")
    .gte("created_at", sixMonthsAgo.toISOString())
    .order("created_at", { ascending: true })

  const { data: allDonationsForPie } = await supabase
    .from("donations")
    .select("method")

  // ── Normalise activity feed ───────────────────────────────────────────────
  const feed: ActivityItem[] = [
    ...(recentDonations ?? []).map((d) => ({
      id: `donation-${d.id}`,
      type: "donation" as const,
      title: `${d.donor_name} — ${d.currency} ${Number(d.amount).toLocaleString()}`,
      subtitle: d.method ?? "Unknown method",
      date: d.created_at,
      status: d.status,
    })),
    ...(recentVolunteers ?? []).map((v) => ({
      id: `volunteer-${v.id}`,
      type: "volunteer" as const,
      title: v.full_name,
      subtitle: Array.isArray(v.skills) ? v.skills.slice(0, 2).join(", ") : (v.skills ?? "Volunteer application"),
      date: v.created_at,
      status: v.status ?? "pending",
    })),
    ...(recentMessages ?? []).map((m) => ({
      id: `message-${m.id}`,
      type: "message" as const,
      title: m.name,
      subtitle: m.subject ?? "Contact message",
      date: m.created_at,
      status: m.is_read ? "read" : "unread",
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 12)

  // ── Build chart data ──────────────────────────────────────────────────────
  const monthlyMap: Record<string, number> = {}
  ;(monetaryDonations ?? []).forEach((d) => {
    const label = getMonthLabel(d.created_at)
    monthlyMap[label] = (monthlyMap[label] ?? 0) + Number(d.amount)
  })
  const monthlyData = Object.entries(monthlyMap).map(([month, amount]) => ({ month, amount }))

  const methodMap: Record<string, number> = {}
  ;(allDonationsForPie ?? []).forEach((d) => {
    const m = d.method ?? "Other"
    methodMap[m] = (methodMap[m] ?? 0) + 1
  })
  const methodData = Object.entries(methodMap).map(([name, value]) => ({ name, value }))

  // ── Metric cards config ───────────────────────────────────────────────────
  const metrics = [
    {
      label: "Pending Donations",
      value: pendingDonations ?? 0,
      icon: DollarSign,
      urgent: (pendingDonations ?? 0) > 0,
      description: "Awaiting manual verification",
      href: "/admin/donations",
    },
    {
      label: "Volunteer Applications",
      value: pendingVolunteers ?? 0,
      icon: Users,
      urgent: (pendingVolunteers ?? 0) > 0,
      description: "Pending review",
      href: "/admin/volunteers",
    },
    {
      label: "Unread Messages",
      value: unreadMessages ?? 0,
      icon: Mail,
      urgent: (unreadMessages ?? 0) > 0,
      description: "Contact messages",
      href: "/admin/messages",
    },
    {
      label: "Total Projects",
      value: totalProjects ?? 0,
      icon: FolderOpen,
      urgent: false,
      description: "Published projects",
      href: "/admin/projects",
    },
  ]

  const ICONS = {
    donation: DollarSign,
    volunteer: Users,
    message: Mail,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time overview of platform activity and pending actions.
        </p>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Link key={m.label} href={m.href}>
            <Card className={`transition-shadow hover:shadow-md border-border/60 cursor-pointer h-full ${m.urgent ? "ring-1 ring-amber-400/40" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground truncate">{m.label}</p>
                    <p className={`text-3xl font-bold mt-1 ${m.urgent ? "text-amber-600" : "text-foreground"}`}>
                      {m.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                  </div>
                  <div className={`rounded-lg p-2.5 shrink-0 ${m.urgent ? "bg-amber-50" : "bg-muted"}`}>
                    {m.urgent ? (
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    ) : (
                      <m.icon className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* ── Charts ── */}
      <DashboardCharts monthlyData={monthlyData} methodData={methodData} />

      {/* ── Activity Feed ── */}
      <Card className="border-border/60">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Live</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {feed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
              <TrendingUp className="h-8 w-8 opacity-30" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {feed.map((item) => {
                const Icon = ICONS[item.type]
                const route = ACTIVITY_ROUTES[item.type]
                const relativeTime = (() => {
                  const diff = Date.now() - new Date(item.date).getTime()
                  const mins = Math.floor(diff / 60000)
                  if (mins < 60) return `${mins}m ago`
                  const hrs = Math.floor(mins / 60)
                  if (hrs < 24) return `${hrs}h ago`
                  return `${Math.floor(hrs / 24)}d ago`
                })()

                return (
                  <Link
                    key={item.id}
                    href={route}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted/40 transition-colors group"
                  >
                    {/* Icon */}
                    <div className={`rounded-full p-2 shrink-0 ${
                      item.type === "donation" ? "bg-indigo-50 text-indigo-600"
                      : item.type === "volunteer" ? "bg-emerald-50 text-emerald-600"
                      : "bg-sky-50 text-sky-600"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{item.subtitle}</p>
                    </div>

                    {/* Right: status + time */}
                    <div className="flex items-center gap-3 shrink-0">
                      {item.status && (
                        <Badge variant="outline" className={`text-xs capitalize px-2 py-0.5 ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground w-12 text-right">{relativeTime}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
