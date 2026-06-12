"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export interface AuthSocialProvider {
  name: string
  icon: React.ReactNode
  onClick?: () => void
}

interface AuthCardProps {
  title: string
  description: string
  error?: string
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
}

function AuthCard({
  title,
  description,
  error,
  footer,
  className,
  children,
}: AuthCardProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p
          aria-live="polite"
          className={cn("text-sm text-destructive", !error && "sr-only")}
        >
          {error}
        </p>
        {children}
      </CardContent>
      {footer ? (
        <CardFooter className="justify-center text-sm text-muted-foreground">
          {footer}
        </CardFooter>
      ) : null}
    </Card>
  )
}

function SocialProviders({
  providers,
}: {
  providers: AuthSocialProvider[]
}) {
  if (providers.length === 0) return null

  return (
    <>
      <div className="flex flex-col gap-2">
        {providers.map((provider) => (
          <Button
            key={provider.name}
            type="button"
            variant="outline"
            className="w-full"
            onClick={provider.onClick}
          >
            {provider.icon}
            Continue with {provider.name}
          </Button>
        ))}
      </div>
      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
          or continue with
        </span>
      </div>
    </>
  )
}

function FlowLink({
  onClick,
  children,
}: {
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-medium text-foreground underline-offset-4 hover:underline"
    >
      {children}
    </button>
  )
}

export interface SignInFormValues {
  email: string
  password: string
}

export interface SignInFormProps {
  onSubmit?: (values: SignInFormValues) => void
  socialProviders?: AuthSocialProvider[]
  error?: string
  loading?: boolean
  onForgotPassword?: () => void
  onSignUp?: () => void
  className?: string
}

function SignInForm({
  onSubmit,
  socialProviders = [],
  error,
  loading = false,
  onForgotPassword,
  onSignUp,
  className,
}: SignInFormProps) {
  const id = React.useId()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [localError, setLocalError] = React.useState<string | undefined>(
    undefined
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim() === "") {
      setLocalError("Email is required.")
      return
    }
    if (password === "") {
      setLocalError("Password is required.")
      return
    }
    setLocalError(undefined)
    onSubmit?.({ email: email.trim(), password })
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your account to continue."
      error={error ?? localError}
      className={className}
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <FlowLink onClick={onSignUp}>Sign up</FlowLink>
        </p>
      }
    >
      <SocialProviders providers={socialProviders} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-email`}>Email</Label>
          <Input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <Input
            id={`${id}-password`}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : null}
          Sign in
        </Button>
      </form>
    </AuthCard>
  )
}

export interface SignUpFormValues {
  name: string
  email: string
  password: string
}

export interface SignUpFormProps {
  onSubmit?: (values: SignUpFormValues) => void
  socialProviders?: AuthSocialProvider[]
  error?: string
  loading?: boolean
  onSignIn?: () => void
  className?: string
}

function SignUpForm({
  onSubmit,
  socialProviders = [],
  error,
  loading = false,
  onSignIn,
  className,
}: SignUpFormProps) {
  const id = React.useId()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [localError, setLocalError] = React.useState<string | undefined>(
    undefined
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim() === "") {
      setLocalError("Name is required.")
      return
    }
    if (email.trim() === "") {
      setLocalError("Email is required.")
      return
    }
    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters.")
      return
    }
    setLocalError(undefined)
    onSubmit?.({ name: name.trim(), email: email.trim(), password })
  }

  return (
    <AuthCard
      title="Create an account"
      description="Get started with your free account."
      error={error ?? localError}
      className={className}
      footer={
        <p>
          Already have an account?{" "}
          <FlowLink onClick={onSignIn}>Sign in</FlowLink>
        </p>
      }
    >
      <SocialProviders providers={socialProviders} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-name`}>Name</Label>
          <Input
            id={`${id}-name`}
            autoComplete="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-email`}>Email</Label>
          <Input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-password`}>Password</Label>
          <Input
            id={`${id}-password`}
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters.
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : null}
          Create account
        </Button>
      </form>
    </AuthCard>
  )
}

export interface ForgotPasswordFormValues {
  email: string
}

export interface ForgotPasswordFormProps {
  onSubmit?: (values: ForgotPasswordFormValues) => void
  error?: string
  loading?: boolean
  onSignIn?: () => void
  className?: string
}

function ForgotPasswordForm({
  onSubmit,
  error,
  loading = false,
  onSignIn,
  className,
}: ForgotPasswordFormProps) {
  const id = React.useId()
  const [email, setEmail] = React.useState("")
  const [localError, setLocalError] = React.useState<string | undefined>(
    undefined
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim() === "") {
      setLocalError("Email is required.")
      return
    }
    setLocalError(undefined)
    onSubmit?.({ email: email.trim() })
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email and we'll send you a reset link."
      error={error ?? localError}
      className={className}
      footer={
        <p>
          Remembered it? <FlowLink onClick={onSignIn}>Back to sign in</FlowLink>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-email`}>Email</Label>
          <Input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : null}
          Send reset link
        </Button>
      </form>
    </AuthCard>
  )
}

export { SignInForm, SignUpForm, ForgotPasswordForm }
