"use client"

import { useState, useTransition, useMemo } from "react"
import { Search, Eye } from "lucide-react"

import { markMessageRead } from "@/app/actions/mark-message-read"
import type { ContactMessage } from "./page"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function ReadBadge({ isRead }: { isRead: boolean }) {
  if (isRead) {
    return (
      <Badge
        variant="outline"
        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 border-gray-200"
      >
        Read
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200"
    >
      Unread
    </Badge>
  )
}

export default function MessagesTable({ data }: { data: ContactMessage[] }) {
  const [rows, setRows] = useState<ContactMessage[]>(data)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const [, startTransition] = useTransition()

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return rows
    return rows.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.subject?.toLowerCase().includes(q)
    )
  }, [rows, search])

  function openMessage(msg: ContactMessage) {
    setSelected(msg)
    if (!msg.is_read) {
      startTransition(async () => {
        const result = await markMessageRead(String(msg.id))
        if (result.success) {
          setRows((prev) =>
            prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
          )
        }
      })
    }
  }

  const unreadCount = rows.filter((m) => !m.is_read).length

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by name, email, or subject…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {unreadCount > 0 && (
          <span className="text-sm text-muted-foreground shrink-0">
            {unreadCount} unread
          </span>
        )}
      </div>

      <Card className="border-border/60 shadow-sm border-none bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Subject</TableHead>
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
                    No messages found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((msg) => (
                  <TableRow
                    key={msg.id}
                    className={!msg.is_read ? "font-medium" : ""}
                  >
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(msg.created_at)}
                    </TableCell>
                    <TableCell className="text-sm">{msg.name ?? "—"}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {msg.email ?? "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-[240px] truncate">
                      {msg.subject ?? "—"}
                    </TableCell>
                    <TableCell>
                      <ReadBadge isRead={!!msg.is_read} />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs gap-1.5"
                        onClick={() => openMessage(msg)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg">
                  {selected.subject ?? "(No subject)"}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-sm">
                  <span className="font-medium text-foreground">
                    {selected.name ?? "Unknown"}
                  </span>
                  {selected.email && (
                    <span className="text-muted-foreground">
                      {selected.email}
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    {formatDate(selected.created_at)}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <Separator className="my-1" />

              <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto py-1">
                {selected.message ?? (
                  <span className="italic text-muted-foreground">
                    No message body.
                  </span>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
