"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { adminSignIn } from "@/lib/admin-actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <Shield className="mr-2 h-4 w-4" />
          Sign In to Admin
        </>
      )}
    </Button>
  )
}

export default function AdminLoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(adminSignIn, null)

  // Handle successful login by redirecting
  useEffect(() => {
    if (state?.success) {
      router.push("/admin")
    }
  }, [state, router])

  return (
    <Card className="w-full max-w-md bg-slate-800 border-slate-700">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Admin Portal</CardTitle>
        <CardDescription className="text-slate-400">Sign in to manage your portfolio content</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-slate-700 border-slate-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <SubmitButton />

          <div className="text-center text-sm text-slate-400">
            Need to create an admin account?{" "}
            <Link href="/admin/signup" className="text-indigo-400 hover:text-indigo-300 hover:underline">
              Sign up here
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
