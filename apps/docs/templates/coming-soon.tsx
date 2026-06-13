"use client"

import * as React from "react"
import {
  Sparkles,
  Mail,
  Check,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const COUNTDOWN = [
  { label: "Days", value: "42" },
  { label: "Hours", value: "08" },
  { label: "Minutes", value: "15" },
  { label: "Seconds", value: "30" },
]

const PERKS = [
  "Early access before public launch",
  "Founding-member pricing locked for life",
  "A say in what we build next",
]

const AVATARS = [
  { name: "Ada Lovelace", src: "https://i.pravatar.cc/80?img=47", fallback: "AL" },
  { name: "Grace Hopper", src: "https://i.pravatar.cc/80?img=32", fallback: "GH" },
  { name: "Alan Turing", src: "https://i.pravatar.cc/80?img=12", fallback: "AT" },
  { name: "Katherine Johnson", src: "https://i.pravatar.cc/80?img=5", fallback: "KJ" },
]

const SOCIALS = [
  { label: "Twitter", icon: Twitter },
  { label: "GitHub", icon: Github },
  { label: "LinkedIn", icon: Linkedin },
  { label: "Instagram", icon: Instagram },
]

export default function ComingSoon() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Northwind</span>
        </div>
        <Badge variant="secondary" className="hidden sm:inline-flex">
          Launching Summer 2026
        </Badge>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
          <Badge
            variant="outline"
            className="mb-6 gap-1.5 border-primary/40 bg-primary/10 text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Something new is coming
          </Badge>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            The workspace your team has been{" "}
            <span className="text-primary">waiting for</span>
          </h1>

          <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
            We are putting the finishing touches on something special. Join the
            waitlist and be the first through the door when we open.
          </p>

          <section
            aria-label="Time until launch"
            className="mt-12 grid w-full max-w-md grid-cols-4 gap-3"
          >
            {COUNTDOWN.map((unit) => (
              <div
                key={unit.label}
                className="rounded-2xl border bg-card px-2 py-4 shadow-sm"
              >
                <div className="text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
                  {unit.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {unit.label}
                </div>
              </div>
            ))}
          </section>

          <div className="mt-12 w-full max-w-md">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 px-6 py-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-6 w-6" />
                </div>
                <p className="text-lg font-semibold">You are on the list!</p>
                <p className="text-sm text-muted-foreground">
                  We sent a confirmation to{" "}
                  <span className="font-medium text-foreground">{email}</span>.
                  Keep an eye on your inbox.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="flex-1 text-left">
                  <Label htmlFor="waitlist-email" className="sr-only">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="waitlist-email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      className="pl-9"
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="gap-1.5">
                  Notify me
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}

            <ul className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-5">
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-primary" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="flex -space-x-3">
              {AVATARS.map((person) => (
                <Avatar
                  key={person.name}
                  className="h-10 w-10 border-2 border-background"
                >
                  <AvatarImage src={person.src} alt="" />
                  <AvatarFallback>{person.fallback}</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold">
                9k+
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Joined by{" "}
              <span className="font-semibold text-foreground">9,248 people</span>{" "}
              already on the waitlist
            </p>
          </div>
        </div>
      </main>

      <footer className="px-6 pb-10 pt-6 sm:px-10">
        <Separator className="mb-6" />
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Northwind Labs. All rights reserved.
          </p>
          <nav aria-label="Social links" className="flex items-center gap-1">
            {SOCIALS.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                aria-label={social.label}
                className="text-muted-foreground"
              >
                <social.icon className="h-4 w-4" />
              </Button>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
