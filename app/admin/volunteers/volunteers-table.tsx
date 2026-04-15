"use client"

import { useState, useTransition, useMemo } from "react"
import { toast } from "sonner"
import { Search, Eye, Loader2, MapPin, Clock, Calendar, Users } from "lucide-react"

import { reviewVolunteer } from "@/app/actions/review-volunteer"
import type { VolunteerApplication } from "./page"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending:  "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
    approved: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50",
    rejected: "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100",
  }
  return (
    <Badge
      variant="outline"
      className={`capitalize text-xs px-2 py-0.5 ${styles[status] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}
    >
      {status}
    </Badge>
  )
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

// ─── Profile Section ─────────────────────────────────────────────────────────

function ProfileSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      {children}
    </div>
  )
}

function ProfileText({ value }: { value: string | null | undefined }) {
  if (!value) return <p className="text-sm text-muted-foreground italic">Not provided</p>
  return <p className="text-sm text-foreground leading-relaxed">{value}</p>
}

// ─── Main Component ───────────────────────────────────────────────────────────

type StatusFilter = "all" | "pending" | "approved" | "rejected"

export default function VolunteersTable({ data }: { data: VolunteerApplication[] }) {
  const [search, setSearch]               = useState("")
  const [statusFilter, setStatusFilter]   = useState<StatusFilter>("all")
  const [selected, setSelected]           = useState<VolunteerApplication | null>(null)
  const [isPending, startTransition]      = useTransition()
  const [loadingAction, setLoadingAction] = useState<"approved" | "rejected" | null>(null)

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return data.filter((a) => {
      const matchesStatus = statusFilter === "all" || a.status === statusFilter
      const matchesSearch =
        !q ||
        a.full_name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [data, search, statusFilter])

  // ── Mutation ──────────────────────────────────────────────────────────────
  function handleAction(id: string, status: "approved" | "rejected") {
    setLoadingAction(status)
    startTransition(async () => {
      const result = await reviewVolunteer(id, status)
      setLoadingAction(null)
      if (result.success) {
        toast.success(
          status === "approved"
            ? "Applicant approved successfully."
            : "Application rejected."
        )
        setSelected(null)
      } else {
        toast.error(result.error ?? "Something went wrong.")
      }
    })
  }

  // ── Counts for quick stats ────────────────────────────────────────────────
  const pendingCount = data.filter((a) => a.status === "pending").length

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">
              Pending {pendingCount > 0 && `(${pendingCount})`}
            </SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ── Table ── */}
      <Card className="border-border/60 shadow-sm border-none bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead className="hidden md:table-cell">Format</TableHead>
                <TableHead className="hidden lg:table-cell">Skills</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No applications match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(app.submitted_date || app.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{app.full_name}</div>
                      <div className="text-xs text-muted-foreground">{app.email}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {app.preferred_format ? (
                        <Badge variant="outline" className="bg-gray-50 text-xs">
                          {app.preferred_format}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {(app.skills ?? []).slice(0, 3).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs px-1.5 py-0"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {(app.skills ?? []).length > 3 && (
                          <span className="text-xs text-muted-foreground self-center">
                            +{app.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={app.status} />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs gap-1.5"
                        onClick={() => setSelected(app)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Review Dialog ── */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open && !isPending) setSelected(null)
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selected.full_name}</DialogTitle>
                <DialogDescription className="flex flex-wrap items-center gap-3 pt-1">
                  <span>{selected.email}</span>
                  {selected.phone && <span>· {selected.phone}</span>}
                  {selected.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selected.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Applied {formatDate(selected.submitted_date || selected.created_at)}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 mt-2">

                {/* ── Quick-glance metadata ── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    {
                      icon: Users,
                      label: "Format",
                      value: selected.preferred_format ?? "—",
                    },
                    {
                      icon: Clock,
                      label: "Availability",
                      value: selected.time_commitment ?? "—",
                    },
                    {
                      icon: Calendar,
                      label: "Experience",
                      value: selected.years_experience ?? "—",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <Card key={label} className="border-border/60">
                      <CardContent className="p-3 flex items-start gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className="text-sm font-medium">{value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator />

                {/* ── Skills ── */}
                <ProfileSection title="Skills">
                  {(selected.skills ?? []).length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selected.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">None listed</p>
                  )}
                </ProfileSection>

                {/* ── Bio ── */}
                <ProfileSection title="About the Applicant">
                  <ProfileText value={selected.bio} />
                </ProfileSection>

                <Separator />

                {/* ── Motivation ── */}
                <ProfileSection title="Motivation">
                  <ProfileText value={selected.motivation} />
                </ProfileSection>

                {/* ── Volunteer Experience ── */}
                {selected.previous_volunteer && (
                  <ProfileSection title="Previous Volunteer Experience">
                    <ProfileText value={selected.volunteer_experience} />
                  </ProfileSection>
                )}

                {/* ── Expectations ── */}
                {selected.expectations && (
                  <ProfileSection title="Expectations from the Program">
                    <ProfileText value={selected.expectations} />
                  </ProfileSection>
                )}

                {/* ── Availability days ── */}
                {(selected.available_days ?? []).length > 0 && (
                  <ProfileSection title="Available Days">
                    <div className="flex flex-wrap gap-1.5">
                      {(selected.available_days ?? []).map((day) => (
                        <Badge key={day} variant="outline" className="text-xs bg-gray-50">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </ProfileSection>
                )}

                <Separator />

                {/* ── Current status + action buttons ── */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    Current status:
                    <StatusBadge status={selected.status} />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="bg-black hover:bg-gray-800 text-white"
                      disabled={isPending || selected.status === "approved"}
                      onClick={() => handleAction(selected.id, "approved")}
                    >
                      {isPending && loadingAction === "approved" && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Approve Applicant
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={isPending || selected.status === "rejected"}
                      onClick={() => handleAction(selected.id, "rejected")}
                    >
                      {isPending && loadingAction === "rejected" && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Reject Applicant
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
