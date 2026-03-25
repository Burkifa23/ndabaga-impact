"use client"

import { useFormState, useFormStatus } from "react-dom"
import { signIn, type AuthState } from "@/app/actions/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const initialState: AuthState = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="w-full h-11 bg-black hover:bg-gray-800 text-white font-medium mt-2"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  )
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(signIn, initialState)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Back Link */}
      <div className="w-full max-w-sm mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Website
        </Link>
      </div>

      <Card className="w-full max-w-sm shadow-lg border-0">
        <CardHeader className="text-center pb-6">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="h-10 relative">
              <Image
                src="/logo-black.svg"
                alt="Ndabaga Impact"
                width={140}
                height={40}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <ShieldCheck className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Admin Portal</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
          <CardDescription className="text-gray-500">
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@ndabagaimpact.org"
                required
                autoComplete="email"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="h-11"
              />
            </div>

            {/* Error Message */}
            {state?.error && (
              <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3">
                <p className="text-sm text-red-600 font-medium">{state.error}</p>
              </div>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <p className="mt-8 text-xs text-gray-400">
        © {new Date().getFullYear()} Ndabaga Impact. All rights reserved.
      </p>
    </div>
  )
}
