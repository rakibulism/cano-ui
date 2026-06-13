"use client"

import * as React from "react"
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  FileText,
  ListTodo,
  Mic,
  Plus,
  Search,
  Send,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Action = { id: string; text: string; owner: string; done: boolean }
type Line = { id: number; speaker: string; initials: string; time: string; text: string }
type Meeting = {
  id: string
  title: string
  date: string
  duration: string
  status: "Processed" | "Transcribing"
  attendees: string[]
  highlights: string[]
  summary: string
  actions: Action[]
  transcript: Line[]
}

const MEETINGS: Meeting[] = [
  {
    id: "m1",
    title: "Q3 Product Planning Sync",
    date: "Jun 12, 2026",
    duration: "48 min",
    status: "Processed",
    attendees: ["Maya Chen", "Devon Park", "Ari Romero", "Priya Nair"],
    highlights: [
      "Billing rewrite moved to Q4 to protect the launch window.",
      "Mobile onboarding flow approved for an A/B test next sprint.",
      "Two new hires joining the platform pod in July.",
    ],
    summary:
      "The team aligned on the Q3 roadmap and agreed to defer the billing rewrite to Q4 so the mobile launch stays on track. Maya walked through the updated deck; the group signed off on slides 1-8 and flagged the pricing section for a follow-up. Devon raised capacity concerns, resolved by reallocating two engineers from the growth pod. Next checkpoint is the planning review on Thursday.",
    actions: [
      { id: "a1", text: "Finalize the pricing slide and circulate for sign-off", owner: "Maya", done: false },
      { id: "a2", text: "Reallocate two engineers from growth to platform pod", owner: "Devon", done: true },
      { id: "a3", text: "Draft the mobile onboarding A/B test plan", owner: "Priya", done: false },
      { id: "a4", text: "Book the Thursday planning review and send invites", owner: "Ari", done: false },
    ],
    transcript: [
      { id: 1, speaker: "Maya Chen", initials: "MC", time: "00:02", text: "Thanks everyone. Goal today is to lock the Q3 roadmap. Big open question is the billing rewrite." },
      { id: 2, speaker: "Devon Park", initials: "DP", time: "00:31", text: "If we keep billing in Q3 we won't have the headroom for the mobile launch. I'd vote to push it." },
      { id: 3, speaker: "Ari Romero", initials: "AR", time: "01:14", text: "Agreed. Launch is the priority this quarter. We can pull billing forward to early Q4." },
      { id: 4, speaker: "Priya Nair", initials: "PN", time: "02:05", text: "On mobile — I'd like to run the new onboarding as an A/B test before we ship it to everyone." },
      { id: 5, speaker: "Maya Chen", initials: "MC", time: "02:40", text: "Love it. Let's get the test plan drafted this week so engineering can scope it." },
    ],
  },
  {
    id: "m2",
    title: "Design Review — Mobile Onboarding",
    date: "Jun 11, 2026",
    duration: "32 min",
    status: "Processed",
    attendees: ["Priya Nair", "Ari Romero", "Sam Liu"],
    highlights: [
      "New three-step onboarding cuts setup time roughly in half.",
      "Empty states need illustrations before handoff.",
    ],
    summary:
      "Priya presented the redesigned onboarding. The group preferred the three-step variant for its lower drop-off. Sam will supply empty-state illustrations, and the team agreed to instrument each step for funnel analytics ahead of the A/B test.",
    actions: [
      { id: "b1", text: "Deliver empty-state illustrations for steps 2 and 3", owner: "Sam", done: false },
      { id: "b2", text: "Add funnel analytics events to each onboarding step", owner: "Ari", done: false },
      { id: "b3", text: "Update the prototype with final copy", owner: "Priya", done: true },
    ],
    transcript: [
      { id: 1, speaker: "Priya Nair", initials: "PN", time: "00:05", text: "Here's the three-step flow versus the original five-step one. Drop-off is way down in testing." },
      { id: 2, speaker: "Sam Liu", initials: "SL", time: "00:48", text: "The empty states feel bare though — I can illustrate steps two and three by Friday." },
      { id: 3, speaker: "Ari Romero", initials: "AR", time: "01:20", text: "Let's instrument every step so the A/B test actually tells us where people fall off." },
    ],
  },
  {
    id: "m3",
    title: "Weekly Eng Standup",
    date: "Jun 13, 2026",
    duration: "18 min",
    status: "Transcribing",
    attendees: ["Devon Park", "Sam Liu", "Ari Romero"],
    highlights: ["Transcript is still being processed."],
    summary:
      "This meeting is currently being transcribed. Summary and action items will appear here once processing completes.",
    actions: [],
    transcript: [
      { id: 1, speaker: "Devon Park", initials: "DP", time: "00:03", text: "Quick round of updates — I'll start. Shipped the table token fixes yesterday." },
      { id: 2, speaker: "Sam Liu", initials: "SL", time: "00:22", text: "Still wrapping the icon set, should be done today." },
    ],
  },
]

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default function MeetingNotes() {
  const [selectedId, setSelectedId] = React.useState(MEETINGS[0].id)
  const [tab, setTab] = React.useState("summary")
  const [query, setQuery] = React.useState("")
  const [meetings, setMeetings] = React.useState(MEETINGS)
  const [ask, setAsk] = React.useState("")

  const selected = meetings.find((m) => m.id === selectedId) ?? meetings[0]
  const filtered = meetings.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  )

  const doneCount = selected.actions.filter((a) => a.done).length
  const totalActions = selected.actions.length

  function selectMeeting(id: string) {
    setSelectedId(id)
    setTab("summary")
  }

  function toggleAction(actionId: string) {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id !== selected.id
          ? m
          : {
              ...m,
              actions: m.actions.map((a) =>
                a.id === actionId ? { ...a, done: !a.done } : a
              ),
            }
      )
    )
  }

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Meetings sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex items-center gap-2 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">Recap AI</span>
        </div>

        <div className="px-4 pb-3">
          <Button className="w-full justify-start gap-2" size="sm">
            <Plus className="h-4 w-4" />
            New recording
          </Button>
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search meetings"
              className="pl-9"
              aria-label="Search meetings"
            />
          </div>
        </div>

        <p className="px-5 pb-2 pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Recent
        </p>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4" aria-label="Meetings">
          {filtered.map((m) => {
            const active = m.id === selectedId
            return (
              <button
                key={m.id}
                onClick={() => selectMeeting(m.id)}
                className={cn(
                  "w-full rounded-lg px-3 py-2.5 text-left transition-colors",
                  active ? "bg-primary/10" : "hover:bg-accent"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "truncate text-sm font-medium",
                      active && "text-primary"
                    )}
                  >
                    {m.title}
                  </span>
                  {m.status === "Transcribing" ? (
                    <Mic className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  ) : null}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  {m.date}
                  <span aria-hidden>·</span>
                  {m.duration}
                </div>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto flex items-center gap-3 border-t p-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Ari Romero</p>
            <p className="truncate text-xs text-muted-foreground">Pro workspace</p>
          </div>
        </div>
      </aside>

      {/* Main pane */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b bg-background/95 px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-1.5 flex items-center gap-2">
                <h1 className="truncate text-xl font-semibold tracking-tight">
                  {selected.title}
                </h1>
                <Badge
                  variant={selected.status === "Processed" ? "secondary" : "outline"}
                  className="shrink-0 gap-1 font-normal"
                >
                  {selected.status === "Processed" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Mic className="h-3 w-3" />
                  )}
                  {selected.status}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" /> {selected.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {selected.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> {selected.attendees.length} attendees
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Copy className="h-4 w-4" /> Copy notes
              </Button>
              <Button size="sm" className="gap-2">
                <Send className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>

          <div className="mt-4 flex -space-x-2">
            {selected.attendees.map((a) => (
              <Avatar key={a} className="h-7 w-7 border-2 border-background">
                <AvatarFallback className="text-[10px]">
                  {initialsOf(a)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <div className="mx-auto max-w-3xl">
            {/* AI ask bar */}
            <div className="mb-6 rounded-xl border bg-primary/10 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <Wand2 className="h-4 w-4" /> Ask the AI about this meeting
              </div>
              <div className="flex gap-2">
                <Input
                  value={ask}
                  onChange={(e) => setAsk(e.target.value)}
                  placeholder="e.g. What did we decide about billing?"
                  className="bg-background"
                  aria-label="Ask the AI"
                />
                <Button className="gap-2" disabled={!ask.trim()}>
                  <Sparkles className="h-4 w-4" /> Ask
                </Button>
              </div>
            </div>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="summary" className="gap-1.5">
                  <FileText className="h-4 w-4" /> Summary
                </TabsTrigger>
                <TabsTrigger value="actions" className="gap-1.5">
                  <ListTodo className="h-4 w-4" /> Actions
                  {totalActions > 0 ? (
                    <Badge variant="secondary" className="ml-1 px-1.5 font-normal">
                      {doneCount}/{totalActions}
                    </Badge>
                  ) : null}
                </TabsTrigger>
                <TabsTrigger value="transcript" className="gap-1.5">
                  <Mic className="h-4 w-4" /> Transcript
                </TabsTrigger>
              </TabsList>

              {/* Summary */}
              <TabsContent value="summary" className="space-y-8">
                <section>
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary" /> Key highlights
                  </h2>
                  <ul className="space-y-2.5">
                    {selected.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg border bg-card p-3.5 text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    AI summary
                  </h2>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {selected.summary}
                  </p>
                </section>
              </TabsContent>

              {/* Actions */}
              <TabsContent value="actions">
                {totalActions === 0 ? (
                  <div className="rounded-lg border border-dashed py-16 text-center text-sm text-muted-foreground">
                    No action items yet — they'll appear once the meeting is processed.
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {doneCount} of {totalActions} complete
                      </p>
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        <Plus className="h-4 w-4" /> Add item
                      </Button>
                    </div>
                    <ul className="space-y-2">
                      {selected.actions.map((a) => (
                        <li key={a.id}>
                          <label
                            className={cn(
                              "flex cursor-pointer items-start gap-3 rounded-lg border bg-card p-3.5 transition-colors hover:bg-muted/50",
                              a.done && "bg-muted/40"
                            )}
                          >
                            <Checkbox
                              checked={a.done}
                              onCheckedChange={() => toggleAction(a.id)}
                              className="mt-0.5"
                              aria-label={a.text}
                            />
                            <div className="min-w-0 flex-1">
                              <p
                                className={cn(
                                  "text-sm",
                                  a.done && "text-muted-foreground line-through"
                                )}
                              >
                                {a.text}
                              </p>
                              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Avatar className="h-4 w-4">
                                  <AvatarFallback className="text-[8px]">
                                    {initialsOf(a.owner)}
                                  </AvatarFallback>
                                </Avatar>
                                {a.owner}
                              </div>
                            </div>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </TabsContent>

              {/* Transcript */}
              <TabsContent value="transcript">
                <div className="space-y-5">
                  {selected.transcript.map((line, i) => (
                    <div key={line.id}>
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="text-xs">
                            {line.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-medium">
                              {line.speaker}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground">
                              {line.time}
                            </span>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                            {line.text}
                          </p>
                        </div>
                      </div>
                      {i < selected.transcript.length - 1 ? (
                        <Separator className="mt-5" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
