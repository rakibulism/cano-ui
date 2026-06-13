"use client"

import * as React from "react"
import {
  ArrowUp,
  Plus,
  Smile,
  TrendingUp,
  CheckSquare,
  Calendar,
  ChevronDown,
  Users,
  Timer,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"

type ColumnKey = "well" | "improve" | "action"

type RetroCard = {
  id: string
  column: ColumnKey
  body: string
  author: string
  initials: string
  votes: number
}

type Sprint = {
  id: string
  name: string
  range: string
  status: string
}

const SPRINTS: Sprint[] = [
  { id: "s-42", name: "Sprint 42", range: "Jun 2 – Jun 13", status: "Active" },
  { id: "s-41", name: "Sprint 41", range: "May 19 – May 30", status: "Closed" },
  { id: "s-40", name: "Sprint 40", range: "May 5 – May 16", status: "Closed" },
]

const PARTICIPANTS = [
  { name: "Maya Chen", initials: "MC" },
  { name: "Diego Ramos", initials: "DR" },
  { name: "Priya Nair", initials: "PN" },
  { name: "Tom Becker", initials: "TB" },
  { name: "Aisha Khan", initials: "AK" },
  { name: "Leo Park", initials: "LP" },
]

const COLUMN_META: Record<
  ColumnKey,
  { title: string; hint: string; icon: React.ComponentType<{ className?: string }> }
> = {
  well: { title: "Went well", hint: "Celebrate the wins", icon: Smile },
  improve: { title: "To improve", hint: "What slowed us down", icon: TrendingUp },
  action: { title: "Action items", hint: "Commit to change", icon: CheckSquare },
}

const SEED_CARDS: Record<string, RetroCard[]> = {
  "s-42": [
    { id: "c1", column: "well", body: "Pairing sessions on the auth refactor cut review time in half.", author: "Maya Chen", initials: "MC", votes: 7 },
    { id: "c2", column: "well", body: "The new on-call rotation felt fair and predictable this sprint.", author: "Leo Park", initials: "LP", votes: 4 },
    { id: "c3", column: "well", body: "Demo Friday had the whole team show up — great energy.", author: "Aisha Khan", initials: "AK", votes: 3 },
    { id: "c4", column: "improve", body: "Standups ran long; too much status, not enough blockers.", author: "Diego Ramos", initials: "DR", votes: 6 },
    { id: "c5", column: "improve", body: "Staging kept drifting from prod and broke two QA passes.", author: "Priya Nair", initials: "PN", votes: 9 },
    { id: "c6", column: "improve", body: "Tickets landed mid-sprint without estimates again.", author: "Tom Becker", initials: "TB", votes: 5 },
    { id: "c7", column: "action", body: "Add a staging parity check to the deploy pipeline by next sprint.", author: "Priya Nair", initials: "PN", votes: 8 },
    { id: "c8", column: "action", body: "Cap standup at 10 min — overflow moves to a parking-lot thread.", author: "Maya Chen", initials: "MC", votes: 5 },
  ],
  "s-41": [
    { id: "d1", column: "well", body: "Shipped the billing migration with zero customer downtime.", author: "Tom Becker", initials: "TB", votes: 11 },
    { id: "d2", column: "well", body: "Design handoffs came with specs this time — much smoother.", author: "Aisha Khan", initials: "AK", votes: 4 },
    { id: "d3", column: "improve", body: "Too many context switches between the API and mobile work.", author: "Leo Park", initials: "LP", votes: 6 },
    { id: "d4", column: "improve", body: "Flaky integration tests cost us a full afternoon.", author: "Diego Ramos", initials: "DR", votes: 7 },
    { id: "d5", column: "action", body: "Quarantine flaky tests and file a tracking issue per failure.", author: "Diego Ramos", initials: "DR", votes: 6 },
  ],
  "s-40": [
    { id: "e1", column: "well", body: "Onboarding the two new hires went faster than planned.", author: "Maya Chen", initials: "MC", votes: 5 },
    { id: "e2", column: "improve", body: "Roadmap changed twice mid-sprint and scattered focus.", author: "Priya Nair", initials: "PN", votes: 8 },
    { id: "e3", column: "action", body: "Lock scope at sprint planning; changes need a written trade-off.", author: "Tom Becker", initials: "TB", votes: 9 },
  ],
}

const COLUMN_ORDER: ColumnKey[] = ["well", "improve", "action"]

export default function RetroBoardTemplate() {
  const [activeSprint, setActiveSprint] = React.useState<string>("s-42")
  const [sprintMenuOpen, setSprintMenuOpen] = React.useState(false)
  const [cardsBySprint, setCardsBySprint] = React.useState<
    Record<string, RetroCard[]>
  >(() => SEED_CARDS)
  const [drafts, setDrafts] = React.useState<Record<ColumnKey, string>>({
    well: "",
    improve: "",
    action: "",
  })
  const [voted, setVoted] = React.useState<Record<string, boolean>>({})

  const cards = cardsBySprint[activeSprint] ?? []
  const sprint = SPRINTS.find((s) => s.id === activeSprint) ?? SPRINTS[0]

  const upvote = (id: string) => {
    setCardsBySprint((prev) => ({
      ...prev,
      [activeSprint]: (prev[activeSprint] ?? []).map((c) =>
        c.id === id ? { ...c, votes: c.votes + 1 } : c
      ),
    }))
    setVoted((prev) => ({ ...prev, [id]: true }))
  }

  const addCard = (column: ColumnKey) => {
    const body = drafts[column].trim()
    if (!body) return
    const newCard: RetroCard = {
      id: column + "-" + (cards.length + 1) + "-" + body.length,
      column,
      body,
      author: "You",
      initials: "YO",
      votes: 0,
    }
    setCardsBySprint((prev) => ({
      ...prev,
      [activeSprint]: [...(prev[activeSprint] ?? []), newCard],
    }))
    setDrafts((prev) => ({ ...prev, [column]: "" }))
  }

  const totalVotes = cards.reduce((sum, c) => sum + c.votes, 0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Retro Board</h1>
              <p className="text-xs text-muted-foreground">
                Platform Squad · Retrospective
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setSprintMenuOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={sprintMenuOpen}
              >
                <Calendar className="size-4" />
                <span className="font-medium">{sprint.name}</span>
                <span className="hidden text-muted-foreground sm:inline">
                  {sprint.range}
                </span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
              {sprintMenuOpen && (
                <div
                  className="absolute right-0 z-30 mt-2 w-64 overflow-hidden rounded-lg border bg-card shadow-lg"
                  role="listbox"
                >
                  {SPRINTS.map((s) => (
                    <button
                      key={s.id}
                      role="option"
                      aria-selected={s.id === activeSprint}
                      onClick={() => {
                        setActiveSprint(s.id)
                        setSprintMenuOpen(false)
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-accent",
                        s.id === activeSprint && "bg-accent"
                      )}
                    >
                      <span className="flex flex-col">
                        <span className="font-medium">{s.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {s.range}
                        </span>
                      </span>
                      <Badge
                        variant={s.status === "Active" ? "default" : "secondary"}
                      >
                        {s.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex -space-x-2">
              {PARTICIPANTS.map((p) => (
                <Avatar
                  key={p.initials}
                  className="size-8 border-2 border-background"
                >
                  <AvatarImage src="" alt="" />
                  <AvatarFallback className="text-xs">
                    {p.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground">
                +3
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <section className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border bg-muted/30 px-5 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="size-4 text-muted-foreground" />
            <span className="font-medium">9</span>
            <span className="text-muted-foreground">participants</span>
          </div>
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <div className="flex items-center gap-2 text-sm">
            <ArrowUp className="size-4 text-muted-foreground" />
            <span className="font-medium">{totalVotes}</span>
            <span className="text-muted-foreground">total votes</span>
          </div>
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <div className="flex items-center gap-2 text-sm">
            <Timer className="size-4 text-muted-foreground" />
            <span className="font-medium">{cards.length}</span>
            <span className="text-muted-foreground">cards on board</span>
          </div>
          <div className="ml-auto hidden text-xs text-muted-foreground sm:block">
            Voting open · {sprint.status === "Active" ? "live" : "read-only"}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-3">
          {COLUMN_ORDER.map((key) => {
            const meta = COLUMN_META[key]
            const Icon = meta.icon
            const columnCards = cards
              .filter((c) => c.column === key)
              .sort((a, b) => b.votes - a.votes)
            return (
              <div key={key} className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <h2 className="text-sm font-semibold leading-none">
                        {meta.title}
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {meta.hint}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{columnCards.length}</Badge>
                </div>

                <div className="flex flex-col gap-3">
                  {columnCards.map((card) => (
                    <Card key={card.id} className="border bg-card">
                      <CardContent className="flex gap-3 p-4">
                        <button
                          onClick={() => upvote(card.id)}
                          aria-label={"Upvote card by " + card.author}
                          className={cn(
                            "flex h-fit flex-col items-center gap-0.5 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                            voted[card.id]
                              ? "border-primary bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent"
                          )}
                        >
                          <ArrowUp className="size-3.5" />
                          <span className="tabular-nums">{card.votes}</span>
                        </button>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm leading-relaxed">{card.body}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <Avatar className="size-5">
                              <AvatarImage src="" alt="" />
                              <AvatarFallback className="text-[10px]">
                                {card.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              {card.author}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {columnCards.length === 0 && (
                    <div className="rounded-lg border border-dashed px-4 py-6 text-center text-xs text-muted-foreground">
                      No cards yet — add the first one below.
                    </div>
                  )}
                </div>

                <Card className="border-dashed bg-muted/30">
                  <CardContent className="flex flex-col gap-2 p-3">
                    <Textarea
                      value={drafts[key]}
                      onChange={(e) =>
                        setDrafts((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                      placeholder={"Add a card to " + meta.title.toLowerCase()}
                      className="min-h-[60px] resize-none bg-background"
                      aria-label={"New card for " + meta.title}
                    />
                    <Button
                      size="sm"
                      className="gap-1.5 self-end"
                      onClick={() => addCard(key)}
                      disabled={!drafts[key].trim()}
                    >
                      <Plus className="size-4" />
                      Add card
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>{sprint.name} retrospective · facilitated by Maya Chen</span>
          <span>Cards auto-group by votes · powered by Retro Board</span>
        </div>
      </footer>
    </div>
  )
}
