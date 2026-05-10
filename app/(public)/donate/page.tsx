"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { donateSchema, type DonateFormValues } from "@/lib/donate-schema"
import { submitDonation } from "@/app/actions/donate"
import { toast } from "sonner"
import { Loader2, Heart, CheckCircle2, Landmark, Smartphone } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const PRESETS = [10, 25, 50, 100]

export default function DonatePage() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<number | "custom">(50)

  const form = useForm<DonateFormValues>({
    resolver: zodResolver(donateSchema),
    defaultValues: {
      amount: 50,
      currency: "USD",
      donorName: "",
      email: "",
      project: "General Fund",
      method: "",
    },
  })

  const selectedMethod = form.watch("method")
  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(data: DonateFormValues) {
    const result = await submitDonation(data)
    if (result.success) {
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      toast.error(result.error)
    }
  }

  const handlePresetClick = (amount: number) => {
    setSelectedPreset(amount)
    form.setValue("amount", amount, { shouldValidate: true })
  }

  const handleCustomClick = () => {
    setSelectedPreset("custom")
    form.setValue("amount", 0)
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gray-50 py-20 px-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full border-none shadow-xl text-center p-8 bg-white border-t-4 border-t-black">
          <CardContent className="pt-6 flex flex-col items-center">
            <CheckCircle2 className="w-24 h-24 mb-6 text-green-500" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Thank You for Your Pledge!</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
              Your commitment empowers Rwandan youth. Please complete your donation using the details below:
            </p>

            <div className="bg-gray-100 p-6 rounded-lg w-full mb-8 text-left shadow-inner border border-gray-200">
              {selectedMethod === "Bank Transfer" ? (
                <div className="space-y-3">
                  <h3 className="font-bold text-xl border-b border-gray-300 pb-3 mb-4 flex items-center">
                    <Landmark className="mr-2 h-6 w-6" /> Bank Transfer Details
                  </h3>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Bank Name:</span> <span className="font-semibold text-gray-900">Bank of Kigali (BK)</span></p>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Account Name:</span> <span className="font-semibold text-gray-900">NDABAGA IMPACT LTD.</span></p>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Account No:</span> <span className="font-semibold text-gray-900 tracking-wider">00293-07759045-80</span></p>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Swift Code:</span> <span className="font-semibold text-gray-900">BKIGRWRW</span></p>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Bank Name:</span> <span className="font-semibold text-gray-900">EQUITY BANK RWANDA PLC. RWANDA.</span></p>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Account Name:</span> <span className="font-semibold text-gray-900">NDABAGA IMPACT LTD.</span></p>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Account No:</span> <span className="font-semibold text-gray-900 tracking-wider">40032000997312</span></p>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Swift Code:</span> <span className="font-semibold text-gray-900">CITIUS33</span></p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-bold text-xl border-b border-gray-300 pb-3 mb-4 flex items-center">
                    <Smartphone className="mr-2 h-6 w-6" /> Mobile Money Details
                  </h3>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Provider:</span> <span className="font-semibold text-gray-900">MTN Mobile Money</span></p>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Merchant/Code:</span> <span className="font-semibold text-gray-900">NDABAGA Impact</span></p>
                  <p><span className="text-gray-500 font-medium w-32 inline-block">Dial Code:</span> <span className="font-bold text-gray-900 tracking-wider bg-yellow-300 px-2 py-1 rounded"> *182*8*1*107250#</span></p>
                </div>
              )}
            </div>

            <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-8">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </main >
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-3xl w-full mb-10 text-center">
        <Heart className="w-12 h-12 mx-auto text-black mb-6 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Support NDABAGA Impact
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Your contribution empowers Rwandan youth to drive sustainable change in their communities.
        </p>
      </div>

      <Card className="max-w-2xl w-full border-none shadow-2xl bg-white overflow-hidden">
        <div className="h-2 w-full bg-black"></div>
        <CardHeader className="text-center pb-2 pt-8">
          <CardTitle className="text-2xl font-bold">Secure Donation Form</CardTitle>
          <CardDescription className="text-base">100% of your donation funds our youth programs directly.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 p-8 md:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {/* Amount Selection */}
              <div className="space-y-4">
                <FormLabel className="text-base font-semibold text-gray-900 block">Select Amount</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {PRESETS.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={selectedPreset === amount ? "default" : "outline"}
                      className={`h-14 text-lg font-bold transition-all ${selectedPreset === amount ? "bg-black text-white ring-2 ring-black ring-offset-2 scale-105" : "hover:border-black text-gray-600"
                        }`}
                      onClick={() => handlePresetClick(amount)}
                    >
                      ${amount}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant={selectedPreset === "custom" ? "default" : "outline"}
                    className={`h-14 text-lg font-bold sm:col-span-1 col-span-2 transition-all ${selectedPreset === "custom" ? "bg-black text-white ring-2 ring-black ring-offset-2 scale-105" : "hover:border-black text-gray-600"
                      }`}
                    onClick={handleCustomClick}
                  >
                    Custom
                  </Button>
                </div>
              </div>

              {selectedPreset === "custom" && (
                <FormField control={form.control} name="amount" render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-2">
                    <FormLabel>Custom Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                        <Input
                          type="number"
                          placeholder="100.00"
                          className="pl-8 text-lg font-bold h-14"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <FormField control={form.control} name="currency" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Select currency" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="RWF">RWF (Frw)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="method" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Select method" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="donorName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input placeholder="Jane Doe" className="h-12 text-base" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input type="email" placeholder="jane@example.com" className="h-12 text-base" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="project" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Direct my donation to (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Select a specific project" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="General Fund">General Fund (Greatest Need)</SelectItem>
                        <SelectItem value="Youth in Agriculture">Youth in Agriculture</SelectItem>
                        <SelectItem value="Youth in Health">Youth in Health</SelectItem>
                        <SelectItem value="Digital Transformation">Digital Transformation Bootcamp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <Button disabled={isSubmitting} size="lg" type="submit" className="w-full h-14 text-lg mt-8 bg-black hover:bg-gray-800 text-white rounded-xl shadow-lg transition-all hover:scale-[1.02]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Processing Pledge...
                  </>
                ) : (
                  <>
                    <Heart className="mr-3 h-5 w-5" />
                    Complete Donation
                  </>
                )}
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">Safe, secure, and privacy protected.</p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
