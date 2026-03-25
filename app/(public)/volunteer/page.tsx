"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { volunteerSchema, type VolunteerFormValues } from "@/lib/volunteer-schema"
import { submitVolunteerApplication } from "@/app/actions/volunteer"
import { toast } from "sonner"
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const SKILLS_LIST = [
  "IT & Web Development", "Administrative Support", "Legal Advisors", "Training & Mentorship",
  "Community Outreach", "Social Media Management", "Graphic Design", "Photography & Videography",
  "Event Management", "Grant Writers/Researchers", "Fundraising & Partnerships", 
  "Marketing & Communications", "Other"
]

const DAYS_LIST = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Flexible"]

export default function VolunteerPage() {
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      location: "",
      bio: "",
      previousVolunteer: "",
      volunteerExperience: "",
      motivation: "",
      skills: [],
      yearsExperience: "",
      timeCommitment: "",
      availableDays: [],
      preferredFormat: "",
      expectations: "",
    },
  })

  // Watch for conditional fields
  const previousVolunteer = form.watch("previousVolunteer")
  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(data: VolunteerFormValues) {
    const result = await submitVolunteerApplication(data)

    if (result.success) {
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      toast.error(result.error)
    }
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gray-50 py-20 px-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full border-none shadow-xl text-center p-8 bg-white text-gray-900 border-t-4 border-t-black">
          <CardContent className="pt-6 flex flex-col items-center">
            <CheckCircle2 className="w-24 h-24 mb-6 text-green-500" />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
              Thank you for volunteering to empower the next generation with NDABAGA Impact. 
              Our team will review your application and be in touch soon!
            </p>
            <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-8">
              <Link href="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          NDABAGA Impact Youth Volunteer Application
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto">
          Thank you for your interest in volunteering with NDABAGA Impact! Our mission is to Empower the Next Generation with skills, opportunities, and Experiences for creating valuable impact in the humanitarian sector, green economy and entrepreneurship sectors to enable them lead transformative changes in their communities.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
          As Ndabaga Impact continues to serve the Rwandan community through youth empowerment, we are currently seeking passionate, creative, and committed young individuals—both locally and internationally—to join our growing organization as volunteers.
        </p>
        <p className="text-sm font-medium text-gray-500 bg-gray-200 inline-flex items-center px-4 py-2 rounded-full">
          For any questions, feel free to email us at <a href="mailto:ndabagaimpact@gmail.com" className="ml-1 text-black font-semibold hover:underline">ndabagaimpact@gmail.com</a>.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
          
          {/* Card 1: Personal Info */}
          <Card className="border-none shadow-md">
            <CardHeader className="bg-black text-white rounded-t-xl">
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription className="text-gray-300">Basic details so we can get to know you.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                  <FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                  <FormControl><Input placeholder="+250 7..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="gender" render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Location (City, Country)</FormLabel>
                  <FormControl><Input placeholder="Kigali, Rwanda" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="bio" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Tell us a little bit about yourself</FormLabel>
                  <FormControl><Textarea className="min-h-[100px]" placeholder="Your background, interests, etc..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>

          {/* Card 2: Experience & Motivation */}
          <Card className="border-none shadow-md">
            <CardHeader className="bg-black text-white rounded-t-xl">
              <CardTitle className="text-xl">Experience & Motivation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <FormField control={form.control} name="previousVolunteer" render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Have you volunteered with Ndabaga Impact or other organizations before? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-4">
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {previousVolunteer === "Yes" && (
                <FormField control={form.control} name="volunteerExperience" render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-4">
                    <FormLabel>Please describe your previous volunteer experience <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Textarea placeholder="I volunteered at..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}

              <FormField control={form.control} name="motivation" render={({ field }) => (
                <FormItem>
                  <FormLabel>Why do you want to volunteer with NDABAGA Impact? <span className="text-red-500">*</span></FormLabel>
                  <FormControl><Textarea className="min-h-[100px]" placeholder="I want to contribute because..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="skills" render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">What are your main areas of interest/skills? (Select all that apply) <span className="text-red-500">*</span></FormLabel>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {SKILLS_LIST.map((item) => (
                      <FormField key={item} control={form.control} name="skills" render={({ field }) => {
                        return (
                          <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value?.includes(item)} 
                                onCheckedChange={(checked) => { 
                                  return checked ? field.onChange([...field.value, item]) : field.onChange(field.value?.filter((value) => value !== item)) 
                                }} 
                              />
                            </FormControl>
                            <FormLabel className="font-normal leading-tight mt-0.5">{item}</FormLabel>
                          </FormItem>
                        )
                      }} />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="yearsExperience" render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of specific formal experience in the selected skills <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="max-w-sm"><SelectValue placeholder="Select timeframe" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="No experience">No experience</SelectItem>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="More than 5 years">More than 5 years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>

          {/* Card 3: Availability & Expectations */}
          <Card className="border-none shadow-md">
            <CardHeader className="bg-black text-white rounded-t-xl">
              <CardTitle className="text-xl">Availability & Expectations</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <FormField control={form.control} name="timeCommitment" render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What is your general time commitment? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="A few hours per week" /></FormControl><FormLabel className="font-normal">A few hours per week</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="A few days per month" /></FormControl><FormLabel className="font-normal">A few days per month</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Full-time volunteer" /></FormControl><FormLabel className="font-normal">Full-time volunteer</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Occasionally" /></FormControl><FormLabel className="font-normal">Occasionally (Events, weekend activities)</FormLabel></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="availableDays" render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Which days are you generally available?</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {DAYS_LIST.map((item) => (
                      <FormField key={item} control={form.control} name="availableDays" render={({ field }) => {
                        return (
                          <FormItem key={item} className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value?.includes(item)} 
                                onCheckedChange={(checked) => { 
                                  return checked ? field.onChange([...field.value, item]) : field.onChange(field.value?.filter((value) => value !== item)) 
                                }} 
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item}</FormLabel>
                          </FormItem>
                        )
                      }} />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="preferredFormat" render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Preferred Format <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-6">
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="In-person" /></FormControl><FormLabel className="font-normal">In-person</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Remote/Online" /></FormControl><FormLabel className="font-normal">Remote/Online</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Both" /></FormControl><FormLabel className="font-normal">Both</FormLabel></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="expectations" render={({ field }) => (
                <FormItem>
                  <FormLabel>What are your expectations from volunteering with us?</FormLabel>
                  <FormControl><Textarea className="min-h-[80px]" placeholder="I expect to..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

            </CardContent>
          </Card>

          <div className="flex justify-end pt-4 pb-12">
            <Button disabled={isSubmitting} size="lg" type="submit" className="w-full md:w-auto px-12 text-lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
