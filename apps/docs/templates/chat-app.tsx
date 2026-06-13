"use client"

import * as React from "react"
import {
  Hash,
  Lock,
  Plus,
  Search,
  Bell,
  Smile,
  Paperclip,
  Send,
  Users,
  Hash as HashIcon,
  Phone,
  Settings,
  Pin,
  Circle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Message = {
  id: number
  author: string
  initials: string
  time: string
  text: string
  self?: boolean
}

type Channel = {
  key: string
  name: string
  kind: "channel" | "dm"
  private?: boolean
  topic: string
  unread?: number
  online?: boolean
  messages: Message[]
}

const ME = { name: "You", initials: "YO" }

const CHANNELS: Channel[] = [
  {
    key: "general",
    name: "general",
    kind: "channel",
    topic: "Company-wide announcements and watercooler chat",
    unread: 0,
    messages: [
      { id: 1, author: "Priya Nair", initials: "PN", time: "9:02 AM", text: "Morning team! Reminder that the all-hands is moved to 2pm today." },
      { id: 2, author: "Marcus Lee", initials: "ML", time: "9:04 AM", text: "Thanks for the heads up. I'll push the design review back an hour." },
      { id: 3, author: "Priya Nair", initials: "PN", time: "9:06 AM", text: "Perfect. Agenda is pinned at the top of the channel." },
    ],
  },
  {
    key: "design",
    name: "design-crit",
    kind: "channel",
    topic: "Share work in progress and get feedback",
    unread: 3,
    messages: [
      { id: 1, author: "Sofia Reyes", initials: "SR", time: "8:41 AM", text: "Dropped the new onboarding flow in Figma — would love eyes before lunch." },
      { id: 2, author: "Marcus Lee", initials: "ML", time: "8:47 AM", text: "The empty state is so much cleaner now. One nit: the CTA could use more contrast." },
      { id: 3, author: "Sofia Reyes", initials: "SR", time: "8:52 AM", text: "Good call, bumping it to the primary token now." },
    ],
  },
  {
    key: "eng",
    name: "engineering",
    kind: "channel",
    private: true,
    topic: "Deploys, incidents, and code review",
    unread: 8,
    messages: [
      { id: 1, author: "Devon Park", initials: "DP", time: "7:30 AM", text: "Shipping the caching layer to staging now. Watch #alerts for anything weird." },
      { id: 2, author: "Aisha Khan", initials: "AK", time: "7:58 AM", text: "p95 latency already down 40% on the dashboard endpoint 🚀" },
      { id: 3, author: "Devon Park", initials: "DP", time: "8:10 AM", text: "Love it. Rolling to prod after the all-hands." },
    ],
  },
  {
    key: "random",
    name: "random",
    kind: "channel",
    topic: "Non-work banter, memes, and pet photos",
    unread: 0,
    messages: [
      { id: 1, author: "Aisha Khan", initials: "AK", time: "Yesterday", text: "Anyone else trying the new ramen place on 5th? Verdict?" },
      { id: 2, author: "Marcus Lee", initials: "ML", time: "Yesterday", text: "10/10. Get the spicy miso." },
    ],
  },
  {
    key: "dm-sofia",
    name: "Sofia Reyes",
    kind: "dm",
    online: true,
    topic: "Direct message",
    unread: 2,
    messages: [
      { id: 1, author: "Sofia Reyes", initials: "SR", time: "8:20 AM", text: "Hey! Do you have 10 min to look at the spacing tokens?" },
      { id: 2, author: "Sofia Reyes", initials: "SR", time: "8:21 AM", text: "No rush — after standup is fine." },
    ],
  },
  {
    key: "dm-devon",
    name: "Devon Park",
    kind: "dm",
    online: false,
    topic: "Direct message",
    unread: 0,
    messages: [
      { id: 1, author: "Devon Park", initials: "DP", time: "Mon", text: "Merged your PR, thanks for the quick turnaround." },
    ],
  },
]

const MEMBERS = [
  { name: "Priya Nair", initials: "PN", role: "Founder", online: true },
  { name: "Sofia Reyes", initials: "SR", role: "Design Lead", online: true },
  { name: "Marcus Lee", initials: "ML", role: "Product Designer", online: true },
  { name: "Devon Park", initials: "DP", role: "Staff Engineer", online: false },
  { name: "Aisha Khan", initials: "AK", role: "Backend Engineer", online: true },
]

export default function ChatApp() {
  const [activeKey, setActiveKey] = React.useState(CHANNELS[1].key)
  const [showMembers, setShowMembers] = React.useState(true)
  const [draft, setDraft] = React.useState("")
  const [threads, setThreads] = React.useState<Record<string, Message[]>>(() =>
    Object.fromEntries(CHANNELS.map((c) => [c.key, c.messages]))
  )
  const [unread, setUnread] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(CHANNELS.map((c) => [c.key, c.unread ?? 0]))
  )

  const active = CHANNELS.find((c) => c.key === activeKey) ?? CHANNELS[0]
  const messages = threads[activeKey] ?? []

  const selectChannel = (key: string) => {
    setActiveKey(key)
    setUnread((prev) => ({ ...prev, [key]: 0 }))
  }

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setThreads((prev) => ({
      ...prev,
      [activeKey]: [
        ...(prev[activeKey] ?? []),
        { id: Date.now(), author: ME.name, initials: ME.initials, time: "Now", text, self: true },
      ],
    }))
    setDraft("")
  }

  const channelList = CHANNELS.filter((c) => c.kind === "channel")
  const dmList = CHANNELS.filter((c) => c.kind === "dm")

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <nav className="flex w-64 shrink-0 flex-col border-r bg-muted/30">
        <div className="flex items-center justify-between border-b px-4 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <HashIcon className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Northwind HQ</span>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="New message">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="px-3 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="h-8 pl-8 text-sm" />
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-2 pb-4">
          <div>
            <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Channels
            </div>
            <ul className="space-y-0.5">
              {channelList.map((c) => {
                const count = unread[c.key] ?? 0
                const isActive = c.key === activeKey
                return (
                  <li key={c.key}>
                    <button
                      onClick={() => selectChannel(c.key)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {c.private ? (
                        <Lock className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <Hash className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span className="flex-1 truncate">{c.name}</span>
                      {count > 0 && (
                        <Badge className="h-5 min-w-5 justify-center px-1.5 text-xs">{count}</Badge>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Direct Messages
            </div>
            <ul className="space-y-0.5">
              {dmList.map((c) => {
                const count = unread[c.key] ?? 0
                const isActive = c.key === activeKey
                return (
                  <li key={c.key}>
                    <button
                      onClick={() => selectChannel(c.key)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <span className="relative flex shrink-0">
                        <Circle
                          className={cn(
                            "h-2.5 w-2.5",
                            c.online ? "fill-primary text-primary" : "fill-muted-foreground/40 text-muted-foreground/40"
                          )}
                        />
                      </span>
                      <span className="flex-1 truncate">{c.name}</span>
                      {count > 0 && (
                        <Badge className="h-5 min-w-5 justify-center px-1.5 text-xs">{count}</Badge>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t px-3 py-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-xs text-primary">{ME.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">Jordan Avery</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Circle className="h-2 w-2 fill-primary text-primary" /> Active
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Main thread */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex items-center gap-2">
              {active.kind === "dm" ? (
                <span className="relative flex">
                  <Circle
                    className={cn(
                      "h-3 w-3",
                      active.online ? "fill-primary text-primary" : "fill-muted-foreground/40 text-muted-foreground/40"
                    )}
                  />
                </span>
              ) : active.private ? (
                <Lock className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Hash className="h-4 w-4 text-muted-foreground" />
              )}
              <h1 className="truncate text-base font-semibold">{active.name}</h1>
            </div>
            <Separator orientation="vertical" className="h-5" />
            <p className="hidden truncate text-sm text-muted-foreground md:block">{active.topic}</p>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Pinned items">
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Start call">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant={showMembers ? "secondary" : "ghost"}
              size="sm"
              className="ml-1 gap-1.5"
              onClick={() => setShowMembers((v) => !v)}
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{MEMBERS.length}</span>
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <section className="flex min-w-0 flex-1 flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="rounded-full border bg-card px-3 py-0.5 text-xs text-muted-foreground">
                  Today
                </span>
                <Separator className="flex-1" />
              </div>
              {messages.map((m) => (
                <div key={m.id} className="flex gap-3">
                  <Avatar className="mt-0.5 h-9 w-9 shrink-0">
                    <AvatarFallback
                      className={cn(
                        "text-xs",
                        m.self ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      )}
                    >
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold">{m.author}</span>
                      <span className="text-xs text-muted-foreground">{m.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Composer */}
            <div className="px-5 pb-5">
              <form
                onSubmit={send}
                className="rounded-xl border bg-card focus-within:border-primary focus-within:ring-1 focus-within:ring-ring"
              >
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={`Message ${active.kind === "dm" ? active.name : "#" + active.name}`}
                  className="border-0 bg-transparent px-4 py-3 text-sm shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center justify-between border-t px-3 py-2">
                  <div className="flex items-center gap-1">
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" aria-label="Attach file">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" aria-label="Add emoji">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button type="submit" size="sm" className="gap-1.5" disabled={!draft.trim()}>
                    <Send className="h-4 w-4" /> Send
                  </Button>
                </div>
              </form>
            </div>
          </section>

          {/* Members panel */}
          {showMembers && (
            <aside className="hidden w-64 shrink-0 flex-col border-l bg-muted/30 lg:flex">
              <div className="border-b px-4 py-3">
                <h2 className="text-sm font-semibold">Members</h2>
                <p className="text-xs text-muted-foreground">
                  {MEMBERS.filter((m) => m.online).length} online
                </p>
              </div>
              <div className="flex-1 space-y-1 overflow-y-auto p-2">
                {MEMBERS.map((m) => (
                  <div key={m.name} className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-accent">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted text-xs">{m.initials}</AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
                          m.online ? "bg-primary" : "bg-muted-foreground/40"
                        )}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{m.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-3">
                <Button variant="outline" size="sm" className="w-full gap-1.5">
                  <Plus className="h-4 w-4" /> Invite people
                </Button>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}
