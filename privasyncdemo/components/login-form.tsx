"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { AlertCircle, CheckCircle2, Lock, Mail, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type LoginErrors = {
  email?: string
  password?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [status, setStatus] = useState<"idle" | "success">("idle")

  function validate() {
    const nextErrors: LoginErrors = {}

    if (!email.trim())
      nextErrors.email = "Email is required."
    else if (!emailPattern.test(email))
      nextErrors.email = "Enter a valid email address."
    

    if (!password)
      nextErrors.password = "Password is required."
    else if (password.length < 8)
      nextErrors.password = "Password must be at least 8 characters."
    

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("idle")

    if (!validate()) return

    setStatus("success")
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center">
        <Card className="grid w-full overflow-hidden rounded-lg border-slate-200 bg-white p-0 shadow-sm md:grid-cols-2">
          <CardContent className="p-6 sm:p-8 md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-800 text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">PrivaSync</p>
                <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
              </div>
            </div>

            {status === "success" && (
              <div className="mb-5 flex gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Login details validated successfully.</span>
              </div>
            )}

            {hasErrors && (
              <div className="mb-5 flex gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Please fix the highlighted fields.</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={onSubmit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    className="h-10 border-slate-200 pl-9 text-slate-800 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    className="h-10 border-slate-200 pl-9 text-slate-800 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="remember" className="font-normal text-slate-600">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    className="border-slate-300 data-checked:border-emerald-800 data-checked:bg-emerald-800"
                  />
                  Remember me
                </Label>
                <Link href="/auth/signup" className="text-sm font-medium text-emerald-800 hover:underline">
                  Create account
                </Link>
              </div>
              <Button type="submit" className="h-10 w-full bg-slate-800 text-white hover:bg-slate-700">
                Sign in
              </Button>
            </form>
          </CardContent>

          <aside className="flex min-h-72 flex-col justify-between bg-emerald-800 p-6 text-white sm:p-8 md:p-10">
            <div>
              <h2 className="max-w-sm text-3xl font-semibold leading-tight">Get started with PrivaSync</h2>
            </div>
            <div className="space-y-4 text-sm text-emerald-50">
              <p>Don&apos;t have an account? </p>
              <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </div>
          </aside>
        </Card>
      </div>
    </main>
  )
}
