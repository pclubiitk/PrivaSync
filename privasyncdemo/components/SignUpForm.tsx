"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { AlertCircle, Building2, CheckCircle2, Lock, Mail, ShieldCheck, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type SignupErrors = {
  name?: string
  email?: string
  organization?: string
  password?: string
  confirmPassword?: string
  otp?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SignUpForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [organization, setOrganization] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [errors, setErrors] = useState<SignupErrors>({})
  const [success, setSuccess] = useState(false)

  function validateAccount() {
    const nextErrors: SignupErrors = {}

    if (!name.trim()) 
      nextErrors.name = "Name is required."
    if (!organization.trim())
      nextErrors.organization = "Organization is required."

    if (!email.trim())
      nextErrors.email = "Email is required."
    else if (!emailPattern.test(email))
      nextErrors.email = "Enter a valid email address."

    if (!password)
      nextErrors.password = "Password is required."
    else if(password.length<8)
      nextErrors.password = "Use at least 8 characters."

    if (!confirmPassword)
      nextErrors.confirmPassword = "Confirm your password."
    else if (confirmPassword!==password)
      nextErrors.confirmPassword = "Passwords do not match."

    setErrors(nextErrors)
    return Object.keys(nextErrors).length===0
  }

  function validateOtp() {
    const nextErrors: SignupErrors = {}

    if (!/^\d{6}$/.test(otp)) {
      nextErrors.otp = "Enter the 6-digit OTP sent to your email."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) 
  {
    event.preventDefault()
    setSuccess(false)
    if (step === 1) 
    {
      if (!validateAccount()) return
      setStep(2)
      setErrors({})
      return
    }

    if (!validateOtp()) return
    setSuccess(true)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center">
        <Card className="grid w-full overflow-hidden rounded-lg border-slate-200 bg-white p-0 shadow-sm md:grid-cols-2">
          <aside className="flex min-h-72 flex-col justify-between bg-emerald-800 p-6 text-white sm:p-8 md:p-10">
            <div>
              <p className="mb-3 text-sm font-medium text-emerald-100">Create workspace</p>
              <h1 className="max-w-sm text-3xl font-semibold leading-tight">Make your PrivaSync account</h1>
            </div>
            <div className="space-y-4 text-sm text-emerald-50">
              <p>Already have an account? </p>
              <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </div>
          </aside>

          <CardContent className="p-6 sm:p-8 md:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-slate-800 text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Step {step} of 2</p>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {step === 1 ? "Account details" : "OTP verification"}
                  </h2>
                </div>
              </div>
              <div className="flex rounded-lg bg-slate-200 p-1 text-sm shadow-inner">
                <span className={`rounded-md px-3 py-1 ${step === 1 ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}>1</span>
                <span className={`rounded-md px-3 py-1 ${step === 2 ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}>2</span>
              </div>
            </div>

            {success && (
              <div className="mb-5 flex gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Account verified successfully.</span>
              </div>
            )}

            {hasErrors && (
              <div className="mb-5 flex gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Please fix the highlighted fields.</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={onSubmit} noValidate>
              {step === 1 ? (
                <>
                  <AuthField
                    id="name"
                    label="Name"
                    value={name}
                    onChange={setName}
                    placeholder="Your full name"
                    error={errors.name}
                    icon={<User className="h-4 w-4" />}
                  />
                  <AuthField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@company.com"
                    error={errors.email}
                    icon={<Mail className="h-4 w-4" />}
                  />
                  <AuthField
                    id="organization"
                    label="Organization"
                    value={organization}
                    onChange={setOrganization}
                    placeholder="Company or team name"
                    error={errors.organization}
                    icon={<Building2 className="h-4 w-4" />}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <AuthField
                      id="password"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={setPassword}
                      placeholder="Minimum 8 characters"
                      error={errors.password}
                      icon={<Lock className="h-4 w-4" />}
                    />
                    <AuthField
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      placeholder="Repeat password"
                      error={errors.confirmPassword}
                      icon={<Lock className="h-4 w-4" />}
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Verification</Label>
                  <Input
                    id="otp"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit OTP"
                    aria-invalid={Boolean(errors.otp)}
                    className="h-12 border-slate-200 text-center text-lg tracking-[0.35em] text-slate-800 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                  <p className="text-sm text-slate-500">We sent a verification code to {email || "your email"}.</p>
                  {errors.otp && <p className="text-sm text-red-600">{errors.otp}</p>}
                </div>
              )}

              <div className="flex">
                <Button type="submit" className="h-10 bg-slate-800 text-white hover:bg-slate-700">
                  {step === 1 ? "Continue" : "Verify account"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  error?: string
  icon: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className="h-10 border-slate-200 pl-9 text-slate-800 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
