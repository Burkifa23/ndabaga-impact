"use client"

import { useState, useTransition, useMemo } from "react"
import { toast } from "sonner"
import { Loader2, Search, Eye } from "lucide-react"

import { verifyDonation } from "@/app/actions/verify-donation"
import type { Donation } from "./page"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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
    pending:   "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
    completed: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50",
    failed:    "bg-red-50 text-red-700 border-red-200 hover:bg-red-50",
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

function formatAmount(amount: number, currency: string) {
  return `${currency} ${Number(amount).toLocaleString()}`
}

// ─── Detail Row ───────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground shrink-0 w-36">{label}</span>
      <span className="text-sm font-medium text-right break-all">{value ?? "—"}</span>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

type StatusFilter = "all" | "pending" | "completed" | "failed"

export default function DonationsTable({ data }: { data: Donation[] }) {
  const [search, setSearch]           = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)
  const [isPending, startTransition]  = useTransition()
  const [loadingAction, setLoadingAction] = useState<"completed" | "failed" | null>(null)

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return data.filter((d) => {
      const matchesStatus =
        statusFilter === "all" || d.status === statusFilter
      const matchesSearch =
        !search.trim() ||
        d.donor_name.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [data, search, statusFilter])

  // ── Mutation ──────────────────────────────────────────────────────────────
  function handleAction(id: string, status: "completed" | "failed") {
    setLoadingAction(status)
    startTransition(async () => {
      const result = await verifyDonation(id, status)
      setLoadingAction(null)
      if (result.success) {
        toast.success(
          status === "completed"
            ? "Donation verified successfully."
            : "Donation marked as failed."
        )
        setSelectedDonation(null)
      } else {
        toast.error(result.error ?? "Something went wrong.")
      }
    })
  }

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by donor name…"
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
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
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
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
                    No donations match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(donation.donation_date)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{donation.donor_name}</div>
                      {donation.email && (
                        <div className="text-xs text-muted-foreground">{donation.email}</div>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-medium">
                      {formatAmount(donation.amount, donation.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50 text-xs capitalize">
                        {donation.method ?? "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={donation.status} />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {donation.status === "pending" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1.5"
                          onClick={() => setSelectedDonation(donation)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Review
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
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
        open={!!selectedDonation}
        onOpenChange={(open) => {
          if (!open && !isPending) setSelectedDonation(null)
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Review Donation</DialogTitle>
            <DialogDescription>
              Confirm receipt of funds to verify, or mark as failed if the
              transfer was not received.
            </DialogDescription>
          </DialogHeader>

          {selectedDonation && (
            <div className="mt-2">
              {/* Details */}
              <div className="rounded-lg border bg-muted/30 px-4 py-1 mb-6">
                <DetailRow label="Donor Name" value={selectedDonation.donor_name} />
                <DetailRow label="Email" value={selectedDonation.email} />
                <DetailRow
                  label="Amount"
                  value={
                    <span className="font-mono font-semibold text-base">
                      {formatAmount(selectedDonation.amount, selectedDonation.currency)}
                    </span>
                  }
                />
                <DetailRow label="Method" value={selectedDonation.method} />
                <DetailRow
                  label="Date"
                  value={formatDate(selectedDonation.donation_date)}
                />
                <DetailRow label="Project" value={selectedDonation.project} />
                <DetailRow label="Message" value={selectedDonation.message} />
                <DetailRow
                  label="Status"
                  value={<StatusBadge status={selectedDonation.status} />}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  disabled={isPending}
                  onClick={() => handleAction(selectedDonation.id, "completed")}
                >
                  {isPending && loadingAction === "completed" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Verify Receipt
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  disabled={isPending}
                  onClick={() => handleAction(selectedDonation.id, "failed")}
                >
                  {isPending && loadingAction === "failed" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Mark Failed
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
