"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ForgotPasswordForm,
  SignInForm,
  SignUpForm,
  type AuthSocialProvider,
} from "@/registry/ui/auth-forms"

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  )
}

type AuthView = "sign-in" | "sign-up" | "forgot-password"

export default function AuthFormsDemo() {
  const [view, setView] = React.useState<AuthView>("sign-in")
  const [loading, setLoading] = React.useState(false)
  const [signedInAs, setSignedInAs] = React.useState<string | null>(null)
  const timeoutRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const socialProviders: AuthSocialProvider[] = [
    { name: "GitHub", icon: <GitHubIcon />, onClick: () => {} },
    { name: "Google", icon: <GoogleIcon />, onClick: () => {} },
  ]

  function fakeSubmit(email: string) {
    setLoading(true)
    timeoutRef.current = window.setTimeout(() => {
      setLoading(false)
      setSignedInAs(email)
    }, 1200)
  }

  function switchView(next: AuthView) {
    setLoading(false)
    setSignedInAs(null)
    setView(next)
  }

  if (signedInAs) {
    return (
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4 rounded-lg border py-12 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium">You&apos;re in</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in to Acme as {signedInAs}.
          </p>
        </div>
        <Button variant="outline" onClick={() => switchView("sign-in")}>
          Back to sign in
        </Button>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      {view === "sign-in" ? (
        <SignInForm
          socialProviders={socialProviders}
          loading={loading}
          onSubmit={(values) => fakeSubmit(values.email)}
          onSignUp={() => switchView("sign-up")}
          onForgotPassword={() => switchView("forgot-password")}
        />
      ) : null}
      {view === "sign-up" ? (
        <SignUpForm
          socialProviders={socialProviders}
          loading={loading}
          onSubmit={(values) => fakeSubmit(values.email)}
          onSignIn={() => switchView("sign-in")}
        />
      ) : null}
      {view === "forgot-password" ? (
        <ForgotPasswordForm
          loading={loading}
          onSubmit={(values) => fakeSubmit(values.email)}
          onSignIn={() => switchView("sign-in")}
        />
      ) : null}
    </div>
  )
}
