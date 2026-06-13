"use client"

import * as React from "react"
import {
  Archive,
  ChevronDown,
  Edit,
  Forward,
  Inbox,
  MoreHorizontal,
  Paperclip,
  Reply,
  ReplyAll,
  Search,
  Send,
  Send as SendIcon,
  Settings,
  Star,
  Tag,
  Trash2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

type Folder = {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
}

const FOLDERS: Folder[] = [
  { key: "inbox", label: "Inbox", icon: Inbox, count: 6 },
  { key: "starred", label: "Starred", icon: Star, count: 2 },
  { key: "sent", label: "Sent", icon: SendIcon },
  { key: "archive", label: "Archive", icon: Archive },
  { key: "trash", label: "Trash", icon: Trash2 },
]

const LABELS = [
  { name: "Work", tone: "bg-primary" },
  { name: "Personal", tone: "bg-accent" },
  { name: "Finance", tone: "bg-secondary" },
] as const

type Email = {
  id: number
  sender: string
  initials: string
  email: string
  subject: string
  preview: string
  body: string[]
  time: string
  unread: boolean
  starred: boolean
  label?: string
}

const EMAILS: Email[] = [
  {
    id: 1,
    sender: "Maya Chen",
    initials: "MC",
    email: "maya.chen@northwind.io",
    subject: "Q3 roadmap review — your sign-off needed",
    preview:
      "Hey, I've pulled together the updated roadmap deck ahead of Thursday's planning sync. Could you...",
    body: [
      "Hey,",
      "I've pulled together the updated roadmap deck ahead of Thursday's planning sync. Could you take a pass before EOD tomorrow? The biggest open question is whether we hold the billing rewrite for Q4 or pull it forward.",
      "I flagged the three slides that need your input in yellow. Everything else is ready to ship to leadership.",
      "Thanks!\nMaya",
    ],
    time: "9:42 AM",
    unread: true,
    starred: true,
    label: "Work",
  },
  {
    id: 2,
    sender: "Stripe",
    initials: "ST",
    email: "receipts@stripe.com",
    subject: "Your invoice for May is ready",
    preview:
      "Your subscription payment of $249.00 was successfully processed. View your full invoice and...",
    body: [
      "Hello,",
      "Your subscription payment of $249.00 was successfully processed on the Growth plan. Your next billing date is June 28.",
      "You can download a PDF copy of this invoice from your billing dashboard at any time.",
      "— The Stripe Team",
    ],
    time: "8:15 AM",
    unread: true,
    starred: false,
    label: "Finance",
  },
  {
    id: 3,
    sender: "Devon Park",
    initials: "DP",
    email: "devon@arcadialabs.com",
    subject: "Re: Coffee next week?",
    preview:
      "Tuesday works great on my end. Let's say 10am at the place on 5th — they finally got the new...",
    body: [
      "Tuesday works great on my end.",
      "Let's say 10am at the place on 5th — they finally got the new espresso machine in. I want to hear how the launch went, sounds like it was a wild couple of weeks.",
      "See you then,\nDevon",
    ],
    time: "Yesterday",
    unread: false,
    starred: true,
    label: "Personal",
  },
  {
    id: 4,
    sender: "GitHub",
    initials: "GH",
    email: "notifications@github.com",
    subject: "[cano-ui] 3 new pull requests need review",
    preview:
      "There are 3 pull requests waiting on your review in cano-ui/core. The oldest has been open for...",
    body: [
      "Hi there,",
      "There are 3 pull requests waiting on your review in cano-ui/core. The oldest has been open for 2 days.",
      "• #482 Add focus-visible ring to Switch\n• #485 Tidy up table border tokens\n• #486 Dark-mode contrast fixes",
      "Review them when you get a chance.",
    ],
    time: "Yesterday",
    unread: false,
    starred: false,
    label: "Work",
  },
  {
    id: 5,
    sender: "Priya Nair",
    initials: "PN",
    email: "priya@studioform.design",
    subject: "Updated brand assets + handoff",
    preview:
      "The refreshed logo lockups and the full icon set are in the shared drive. I exported everything in...",
    body: [
      "Hi,",
      "The refreshed logo lockups and the full icon set are in the shared drive. I exported everything in SVG plus 2x PNGs so the team has options.",
      "Let me know if you need a dark-background variant — happy to spin those up.",
      "Cheers,\nPriya",
    ],
    time: "Mon",
    unread: false,
    starred: false,
    label: "Work",
  },
  {
    id: 6,
    sender: "Notion",
    initials: "NO",
    email: "team@notion.so",
    subject: "Weekly digest: 12 pages updated",
    preview:
      "Here's what changed in your workspace this week. Your team made 47 edits across 12 pages, and...",
    body: [
      "Here's what changed in your workspace this week.",
      "Your team made 47 edits across 12 pages, and 3 new docs were created in the Engineering space.",
      "Open Notion to catch up on everything you missed.",
    ],
    time: "Sun",
    unread: false,
    starred: false,
  },
]

export default function InboxApp() {
  const [activeFolder, setActiveFolder] = React.useState("inbox")
  const [selectedId, setSelectedId] = React.useState(1)
  const [query, setQuery] = React.useState("")
  const [reply, setReply] = React.useState("")
  const [emails, setEmails] = React.useState(EMAILS)

  const filtered = emails.filter((e) => {
    if (activeFolder === "starred" && !e.starred) return false
    if (!query) return true
    const q = query.toLowerCase()
    return (
      e.sender.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      e.preview.toLowerCase().includes(q)
    )
  })

  const selected = emails.find((e) => e.id === selectedId) ?? emails[0]
  const unreadCount = emails.filter((e) => e.unread).length

  function openEmail(id: number) {
    setSelectedId(id)
    setReply("")
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, unread: false } : e))
    )
  }

  function toggleStar(id: number) {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e))
    )
  }

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Folder sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 md:flex">
        <div className="flex items-center gap-2 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Inbox className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">Plume</span>
        </div>

        <div className="px-3 pb-3">
          <Button className="w-full justify-start gap-2" size="sm">
            <Edit className="h-4 w-4" />
            Compose
          </Button>
        </div>

        <nav className="flex flex-col gap-0.5 px-3" aria-label="Mail folders">
          {FOLDERS.map((f) => {
            const Icon = f.icon
            const active = activeFolder === f.key
            return (
              <button
                key={f.key}
                onClick={() => {
                  setActiveFolder(f.key)
                  setQuery("")
                }}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{f.label}</span>
                {f.count ? (
                  <span
                    className={cn(
                      "text-xs",
                      active ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {f.count}
                  </span>
                ) : null}
              </button>
            )
          })}
        </nav>

        <Separator className="my-4" />

        <div className="px-5">
          <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Tag className="h-3.5 w-3.5" /> Labels
          </p>
          <ul className="flex flex-col gap-2">
            {LABELS.map((l) => (
              <li
                key={l.name}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <span className={cn("h-2.5 w-2.5 rounded-full", l.tone)} />
                {l.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex items-center gap-3 border-t p-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Ari Romero</p>
            <p className="truncate text-xs text-muted-foreground">
              ari@plume.app
            </p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </aside>

      {/* Message list */}
      <section className="flex w-full flex-col border-r md:w-96 md:shrink-0">
        <header className="sticky top-0 z-10 border-b bg-background/95 px-4 py-3 backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-lg font-semibold capitalize">
              {activeFolder}
            </h1>
            <Badge variant="secondary" className="font-normal">
              {unreadCount} unread
            </Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mail"
              className="pl-9"
              aria-label="Search mail"
            />
          </div>
        </header>

        <ul className="flex-1 divide-y overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="px-4 py-12 text-center text-sm text-muted-foreground">
              No messages match your search.
            </li>
          ) : (
            filtered.map((e) => {
              const active = e.id === selectedId
              return (
                <li key={e.id}>
                  <button
                    onClick={() => openEmail(e.id)}
                    className={cn(
                      "flex w-full gap-3 px-4 py-3 text-left transition-colors",
                      active ? "bg-accent" : "hover:bg-muted/50"
                    )}
                  >
                    <div className="relative pt-0.5">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs">
                          {e.initials}
                        </AvatarFallback>
                      </Avatar>
                      {e.unread ? (
                        <span
                          className="absolute -left-0.5 top-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary"
                          aria-label="Unread"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={cn(
                            "truncate text-sm",
                            e.unread ? "font-semibold" : "font-medium"
                          )}
                        >
                          {e.sender}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {e.time}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "truncate text-sm",
                          e.unread
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {e.subject}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {e.preview}
                      </p>
                      {e.label ? (
                        <Badge
                          variant="outline"
                          className="mt-1.5 font-normal"
                        >
                          {e.label}
                        </Badge>
                      ) : null}
                    </div>
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </section>

      {/* Reading pane */}
      <main className="hidden flex-1 flex-col bg-muted/20 md:flex">
        {selected ? (
          <>
            <div className="flex items-center justify-between border-b bg-background px-6 py-3">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" aria-label="Archive">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={selected.starred ? "Unstar" : "Star"}
                  onClick={() => toggleStar(selected.id)}
                >
                  <Star
                    className={cn(
                      "h-4 w-4",
                      selected.starred && "fill-primary text-primary"
                    )}
                  />
                </Button>
              </div>
              <Button variant="ghost" size="icon" aria-label="More options">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mx-auto max-w-2xl">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight">
                    {selected.subject}
                  </h2>
                  {selected.label ? (
                    <Badge variant="secondary" className="shrink-0">
                      {selected.label}
                    </Badge>
                  ) : null}
                </div>

                <div className="flex items-center gap-3 border-b pb-5">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{selected.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{selected.sender}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {selected.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {selected.time}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </div>

                <article className="space-y-4 py-6 text-sm leading-relaxed text-foreground/90">
                  {selected.body.map((para, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </article>

                <div className="mb-6 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Reply className="h-4 w-4" /> Reply
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ReplyAll className="h-4 w-4" /> Reply all
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Forward className="h-4 w-4" /> Forward
                  </Button>
                </div>

                {/* Reply box */}
                <div className="rounded-lg border bg-card p-4">
                  <p className="mb-3 text-xs text-muted-foreground">
                    Replying to{" "}
                    <span className="font-medium text-foreground">
                      {selected.sender}
                    </span>
                  </p>
                  <Textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder={`Write a reply to ${selected.sender}…`}
                    className="min-h-28 resize-none"
                    aria-label="Reply message"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Attach file"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="gap-2" disabled={!reply.trim()}>
                      <Send className="h-4 w-4" /> Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Select a message to read it.
          </div>
        )}
      </main>
    </div>
  )
}
