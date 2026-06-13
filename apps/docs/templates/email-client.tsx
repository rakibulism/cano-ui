"use client"

import * as React from "react"
import {
  Inbox,
  Star,
  Send,
  FileText,
  Archive,
  Trash2,
  AlertOctagon,
  Tag,
  Search,
  Pencil,
  Reply,
  ReplyAll,
  Forward,
  Trash,
  Paperclip,
  Settings,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type FolderId = "inbox" | "starred" | "sent" | "drafts" | "archive" | "spam" | "trash"

type Message = {
  id: string
  folder: FolderId
  from: string
  email: string
  subject: string
  snippet: string
  body: string[]
  time: string
  date: string
  read: boolean
  starred: boolean
  attachment?: string
  labels?: string[]
}

const FOLDERS: { id: FolderId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "starred", label: "Starred", icon: Star },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText },
  { id: "archive", label: "Archive", icon: Archive },
  { id: "spam", label: "Spam", icon: AlertOctagon },
  { id: "trash", label: "Trash", icon: Trash2 },
]

const LABELS: { name: string; tone: string }[] = [
  { name: "Work", tone: "bg-primary" },
  { name: "Personal", tone: "bg-accent" },
  { name: "Finance", tone: "bg-muted-foreground" },
]

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    folder: "inbox",
    from: "Priya Raman",
    email: "priya@northwind.dev",
    subject: "Q3 roadmap review — your input needed",
    snippet: "Hey, can you take a pass at the roadmap deck before Thursday? I flagged a few sections...",
    body: [
      "Hey,",
      "Can you take a pass at the roadmap deck before Thursday? I flagged a few sections where the timelines feel optimistic and I want a second opinion before we share with leadership.",
      "The mobile milestone in particular looks tight. Let me know if you think we should split it across two quarters.",
      "Thanks,\nPriya",
    ],
    time: "9:42 AM",
    date: "Today",
    read: false,
    starred: true,
    attachment: "roadmap-q3.pdf",
    labels: ["Work"],
  },
  {
    id: "m2",
    folder: "inbox",
    from: "GitHub",
    email: "notifications@github.com",
    subject: "[northwind/core] 3 new pull requests assigned to you",
    snippet: "You have been requested to review pull requests in northwind/core...",
    body: [
      "You have been requested to review the following pull requests:",
      "#412 Refactor billing webhook handler\n#418 Add retry logic to email queue\n#421 Bump dependencies for security advisory",
      "Review them at your convenience.",
    ],
    time: "8:15 AM",
    date: "Today",
    read: false,
    starred: false,
    labels: ["Work"],
  },
  {
    id: "m3",
    folder: "inbox",
    from: "Marcus Lee",
    email: "marcus@cano.studio",
    subject: "Lunch on Friday?",
    snippet: "Free around noon? There's a new ramen spot two blocks from the office...",
    body: [
      "Free around noon on Friday?",
      "There's a new ramen spot two blocks from the office that everyone keeps raving about. Figured we could finally catch up.",
      "— Marcus",
    ],
    time: "Yesterday",
    date: "Yesterday",
    read: true,
    starred: true,
    labels: ["Personal"],
  },
  {
    id: "m4",
    folder: "inbox",
    from: "Stripe",
    email: "receipts@stripe.com",
    subject: "Your invoice for May is ready",
    snippet: "Invoice #INV-2049 totaling $1,280.00 has been paid successfully...",
    body: [
      "Invoice #INV-2049 totaling $1,280.00 has been paid successfully.",
      "A copy of the receipt is attached for your records. No action is required.",
    ],
    time: "Mon",
    date: "Monday",
    read: true,
    starred: false,
    attachment: "invoice-may.pdf",
    labels: ["Finance"],
  },
  {
    id: "m5",
    folder: "inbox",
    from: "Design Weekly",
    email: "hello@designweekly.co",
    subject: "12 interface patterns worth stealing this week",
    snippet: "This issue: command palettes, optimistic UI, and the return of the sidebar...",
    body: [
      "This issue: command palettes, optimistic UI, and the return of the sidebar.",
      "We dug into how the best teams handle empty states and loading skeletons without making things feel slow.",
    ],
    time: "Sun",
    date: "Sunday",
    read: true,
    starred: false,
  },
  {
    id: "m6",
    folder: "sent",
    from: "Me",
    email: "you@cano.studio",
    subject: "Re: Onboarding flow handoff",
    snippet: "Shipped the updated specs to the eng channel — ping me if anything is unclear...",
    body: [
      "Shipped the updated specs to the eng channel — ping me if anything is unclear.",
      "I left annotations on the edge cases for the verification step.",
    ],
    time: "Tue",
    date: "Tuesday",
    read: true,
    starred: false,
  },
  {
    id: "m7",
    folder: "drafts",
    from: "Me",
    email: "you@cano.studio",
    subject: "(no subject)",
    snippet: "Hi team, quick update on the migration —",
    body: ["Hi team, quick update on the migration —"],
    time: "Wed",
    date: "Wednesday",
    read: true,
    starred: false,
  },
  {
    id: "m8",
    folder: "spam",
    from: "Lucky Rewards",
    email: "win@prizes-now.biz",
    subject: "You've been selected! Claim your reward",
    snippet: "Congratulations! Click here within 24 hours to claim your exclusive prize...",
    body: ["Congratulations! Click here within 24 hours to claim your exclusive prize."],
    time: "Wed",
    date: "Wednesday",
    read: false,
    starred: false,
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function EmailClient() {
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES)
  const [activeFolder, setActiveFolder] = React.useState<FolderId>("inbox")
  const [selectedId, setSelectedId] = React.useState<string | null>("m1")

  const visible = React.useMemo(() => {
    if (activeFolder === "starred") return messages.filter((m) => m.starred)
    return messages.filter((m) => m.folder === activeFolder)
  }, [messages, activeFolder])

  const unreadByFolder = React.useMemo(() => {
    const counts: Record<string, number> = {}
    for (const m of messages) {
      if (!m.read) {
        counts[m.folder] = (counts[m.folder] ?? 0) + 1
        if (m.starred) counts.starred = (counts.starred ?? 0) + 1
      }
    }
    return counts
  }, [messages])

  const selected = visible.find((m) => m.id === selectedId) ?? null

  function openMessage(id: string) {
    setSelectedId(id)
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }

  function toggleStar(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)))
  }

  function switchFolder(id: FolderId) {
    setActiveFolder(id)
    const first = (id === "starred" ? messages.filter((m) => m.starred) : messages.filter((m) => m.folder === id))[0]
    setSelectedId(first ? first.id : null)
  }

  const activeFolderLabel = FOLDERS.find((f) => f.id === activeFolder)?.label ?? "Inbox"

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Folder navigation */}
      <nav className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 md:flex">
        <div className="flex items-center gap-2 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Send className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Plume</span>
        </div>
        <div className="px-3">
          <Button className="w-full justify-start gap-2" size="lg">
            <Pencil className="h-4 w-4" />
            Compose
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-0.5 px-2">
          {FOLDERS.map((folder) => {
            const Icon = folder.icon
            const count = unreadByFolder[folder.id] ?? 0
            const active = folder.id === activeFolder
            return (
              <button
                key={folder.id}
                onClick={() => switchFolder(folder.id)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left">{folder.label}</span>
                {count > 0 && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs tabular-nums",
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <Separator className="my-4" />
        <div className="px-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Labels</p>
          <div className="flex flex-col gap-0.5">
            {LABELS.map((label) => (
              <button
                key={label.name}
                className="flex items-center gap-3 rounded-md px-1 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className={cn("h-2.5 w-2.5 rounded-full", label.tone)} />
                {label.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-center gap-3 border-t px-5 py-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>YC</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">You</p>
            <p className="truncate text-xs text-muted-foreground">you@cano.studio</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Message list */}
      <section className="flex w-full max-w-md shrink-0 flex-col border-r lg:w-96">
        <header className="flex items-center gap-2 border-b px-4 py-3">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open folders">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search mail" className="pl-9" aria-label="Search mail" />
          </div>
        </header>
        <div className="flex items-center justify-between px-4 py-2.5">
          <h1 className="text-sm font-semibold">{activeFolderLabel}</h1>
          <span className="text-xs text-muted-foreground">{visible.length} conversations</span>
        </div>
        <Separator />
        <ul className="flex-1 overflow-y-auto">
          {visible.length === 0 && (
            <li className="flex flex-col items-center gap-2 px-6 py-16 text-center">
              <Inbox className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Nothing here</p>
              <p className="text-xs text-muted-foreground">This folder is empty.</p>
            </li>
          )}
          {visible.map((m) => {
            const isSelected = m.id === selectedId
            return (
              <li key={m.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openMessage(m.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      openMessage(m.id)
                    }
                  }}
                  className={cn(
                    "flex w-full cursor-pointer gap-3 border-b px-4 py-3 text-left transition-colors",
                    isSelected ? "bg-accent" : "hover:bg-muted/50",
                  )}
                >
                  <span className="mt-1.5 flex w-2 shrink-0 justify-center">
                    {!m.read && <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread" />}
                  </span>
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="text-xs">{initials(m.from)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={cn("truncate text-sm", !m.read ? "font-semibold" : "font-medium")}>
                        {m.from}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">{m.time}</span>
                    </div>
                    <p className={cn("truncate text-sm", !m.read ? "font-medium" : "text-muted-foreground")}>
                      {m.subject}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{m.snippet}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      {m.labels?.map((l) => (
                        <Badge key={l} variant="secondary" className="px-1.5 py-0 text-[10px]">
                          {l}
                        </Badge>
                      ))}
                      {m.attachment && <Paperclip className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  </div>
                  <button
                    onClick={(e) => toggleStar(m.id, e)}
                    className="mt-0.5 shrink-0 self-start text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={m.starred ? "Remove star" : "Add star"}
                  >
                    <Star className={cn("h-4 w-4", m.starred && "fill-primary text-primary")} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Reading pane */}
      <main className="hidden flex-1 flex-col lg:flex">
        {selected ? (
          <>
            <header className="flex items-center gap-2 border-b px-6 py-3">
              <Button variant="ghost" size="icon" aria-label="Archive">
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Delete">
                <Trash className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={selected.starred ? "Remove star" : "Add star"}
                onClick={(e) => toggleStar(selected.id, e)}
              >
                <Star className={cn("h-4 w-4", selected.starred && "fill-primary text-primary")} />
              </Button>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
                <Button variant="ghost" size="icon" aria-label="Forward">
                  <Forward className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mx-auto max-w-2xl">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight">{selected.subject}</h2>
                  {selected.labels?.map((l) => (
                    <Badge key={l} variant="outline" className="gap-1">
                      <Tag className="h-3 w-3" />
                      {l}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-3 pb-5">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{initials(selected.from)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{selected.from}</p>
                    <p className="truncate text-xs text-muted-foreground">{selected.email}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {selected.date} · {selected.time}
                  </span>
                </div>

                <Separator />

                <div className="space-y-4 py-6 text-sm leading-relaxed text-foreground">
                  {selected.body.map((para, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>

                {selected.attachment && (
                  <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{selected.attachment}</p>
                      <p className="text-xs text-muted-foreground">PDF · 248 KB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-2">
                  <Button className="gap-2">
                    <Reply className="h-4 w-4" />
                    Reply
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ReplyAll className="h-4 w-4" />
                    Reply all
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Forward className="h-4 w-4" />
                    Forward
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No message selected</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Choose a conversation from the list to read it here.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
