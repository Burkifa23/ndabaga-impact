"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

import { eventSchema, type EventFormValues } from "@/lib/events-schema"
import { upsertEvent, deleteEvent } from "@/app/actions/manage-events"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"

type EventType = {
  id: string | number
  title: string
  description: string | null
  status: string
  location: string
  start_date: string
  image_url: string | null
  registered: number | null
  capacity: number | null
}

export default function EventsClient({ initialEvents }: { initialEvents: EventType[] }) {
  const router = useRouter()
  const [events, setEvents] = useState<EventType[]>(initialEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | number | null>(null)

  useEffect(() => {
    setEvents(initialEvents)
  }, [initialEvents])

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Upcoming",
      location: "",
      start_date: "",
      image_url: "",
      registered: 0,
      capacity: 100,
    },
  })

  const handleOpenNew = () => {
    setEditingId(null)
    form.reset({
      title: "",
      description: "",
      status: "Upcoming",
      location: "",
      start_date: "",
      image_url: "",
      registered: 0,
      capacity: 100,
    })
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (event: EventType) => {
    setEditingId(event.id)
    form.reset({
      id: event.id,
      title: event.title,
      description: event.description || "",
      status: event.status as "Upcoming" | "Ongoing" | "Completed",
      location: event.location,
      start_date: event.start_date ? event.start_date.split("T")[0] : "",
      image_url: event.image_url || "",
      registered: event.registered || 0,
      capacity: event.capacity || 100,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string | number, title: string) => {
    if (!window.confirm(`Delete event "${title}"? This cannot be undone.`)) return
    try {
      const result = await deleteEvent(id)
      if (result.success) {
        toast.success("Event deleted successfully")
        setEvents(events.filter((e) => e.id !== id))
        router.refresh()
      } else {
        toast.error(result.error)
      }
    } catch {
      toast.error("An unexpected error occurred.")
    }
  }

  const onSubmit = async (data: EventFormValues) => {
    const result = await upsertEvent(data)
    if (result.success) {
      toast.success(editingId ? "Event updated successfully!" : "Event created successfully!")
      setIsDialogOpen(false)
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Events</h1>
          <p className="text-gray-500">Manage upcoming and past events.</p>
        </div>
        <Button onClick={handleOpenNew} className="bg-black hover:bg-gray-800 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Event
        </Button>
      </div>

      <Card className="border-none bg-white shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No events yet. Click "New Event" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      {event.image_url ? (
                        <div className="w-12 h-12 rounded-md border overflow-hidden bg-gray-100">
                          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-md border bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-gray-900">{event.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {event.registered} / {event.capacity} Registered
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{event.location}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          event.status === "Upcoming"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-none"
                            : event.status === "Ongoing"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-none"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-none"
                        }
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {event.start_date
                        ? format(new Date(event.start_date), "MMM d, yyyy")
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(event)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(event.id, event.title)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 ml-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Event" : "Create New Event"}</DialogTitle>
            <DialogDescription>
              Manage details for this event.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Community Cleanup" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Kigali, Rwanda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Upcoming">Upcoming</SelectItem>
                            <SelectItem value="Ongoing">Ongoing</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registered"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registered</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/event.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px]"
                        placeholder="Event details..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end gap-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingId ? "Save Changes" : "Create Event"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
