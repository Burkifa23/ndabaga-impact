"use client"

import { useState } from "react"
import { toast } from "sonner"
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Event = {
  id: string | number
  title: string
  description: string | null
  status: string | null
  location: string | null
  start_date: string | null
  image_url: string | null
  registered?: number | null
  capacity?: number | null
}

function getBadgeVariant(status: string) {
  switch (status) {
    case "Upcoming":
      return "bg-blue-500 hover:bg-blue-600 text-white"
    case "Ongoing":
      return "bg-primary hover:bg-primary/90 text-primary-foreground"
    case "Completed":
      return "bg-gray-500 hover:bg-gray-600 text-white"
    default:
      return "bg-secondary text-secondary-foreground"
  }
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "TBD"
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function EventsPageClient({ events }: { events: Event[] }) {
  const [openDialogId, setOpenDialogId] = useState<string | number | null>(null)

  const handleRegister = (e: React.FormEvent, eventId: string | number) => {
    e.preventDefault()
    toast.success("Successfully registered your interest!", {
      description: "We'll be in touch with more details soon.",
    })
    setOpenDialogId(null)
  }

  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success("Subscribed successfully!", {
      description: "Thank you for joining our newsletter.",
    })
    e.currentTarget.reset()
  }

  if (events.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg text-gray-500">No events found. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="space-y-16">
      <div className="space-y-6">
        {events.map((event) => {
          const isFull =
            event.registered != null &&
            event.capacity != null &&
            event.registered >= event.capacity
          const isCompleted = event.status === "Completed"
          const isDisabled = isFull || isCompleted

          return (
            <Card
              key={event.id}
              className="overflow-hidden flex flex-col md:flex-row border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="md:w-2/5 h-64 md:h-auto relative bg-gray-100">
                <Image
                  src={event.image_url || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                {event.status && (
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`font-medium ${getBadgeVariant(event.status)} border-transparent`}
                    >
                      {event.status}
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="flex-1 p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                  {event.description && (
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {event.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 mr-2 shrink-0" />
                      {formatDate(event.start_date)}
                    </div>
                    {event.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPinIcon className="w-4 h-4 mr-2 shrink-0" />
                        {event.location}
                      </div>
                    )}
                    {event.registered != null && event.capacity != null && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <UsersIcon className="w-4 h-4 mr-2 shrink-0" />
                        {event.registered} / {event.capacity} Registered
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-48 flex flex-col justify-end md:justify-center border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6 shrink-0 mt-6 md:mt-0">
                  <Dialog
                    open={openDialogId === event.id}
                    onOpenChange={(isOpen) =>
                      setOpenDialogId(isOpen ? event.id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        disabled={isDisabled}
                        className="w-full"
                        variant={isDisabled ? "secondary" : "default"}
                      >
                        {isCompleted
                          ? "Event Ended"
                          : isFull
                          ? "Registration Full"
                          : "Register Interest"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Register Interest</DialogTitle>
                        <DialogDescription>
                          Sign up to receive updates and early access for{" "}
                          {event.title}.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => handleRegister(e, event.id)}
                        className="space-y-4 py-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor={`name-${event.id}`}>Full Name</Label>
                          <Input
                            id={`name-${event.id}`}
                            required
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`email-${event.id}`}>
                            Email address
                          </Label>
                          <Input
                            id={`email-${event.id}`}
                            type="email"
                            required
                            placeholder="Enter your email"
                          />
                        </div>
                        <Button type="submit" className="w-full mt-4">
                          Submit Registration
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <section className="bg-secondary/40 rounded-2xl p-8 md:p-12 border border-border/50 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Stay Updated
          </h2>
          <p className="text-muted-foreground">
            Don't miss out on our upcoming events! Subscribe to our newsletter
            to receive the latest updates.
          </p>
          <form
            onSubmit={handleNewsletter}
            className="flex flex-col sm:flex-row gap-2 mt-6"
          >
            <Input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 bg-background"
            />
            <Button type="submit" className="w-full sm:w-auto">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
