"use client"

import * as React from "react"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MessageSquare,
  Users,
  PhoneOff,
  MoreVertical,
  Hand,
  Send,
  Settings,
  Lock,
  Maximize2,
  Pin,
  Volume2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Participant = {
  id: string
  name: string
  initials: string
  img: string
  speaking: boolean
  muted: boolean
  cameraOff: boolean
  host: boolean
  hand: boolean
}

const PARTICIPANTS: Participant[] = [
  { id: "p1", name: "Maya Okonkwo", initials: "MO", img: "https://i.pravatar.cc/300?img=47", speaking: true, muted: false, cameraOff: false, host: true, hand: false },
  { id: "p2", name: "Dev Patel", initials: "DP", img: "https://i.pravatar.cc/300?img=12", speaking: false, muted: true, cameraOff: false, host: false, hand: true },
  { id: "p3", name: "Lena Hofer", initials: "LH", img: "https://i.pravatar.cc/300?img=32", speaking: false, muted: false, cameraOff: true, host: false, hand: false },
  { id: "p4", name: "Tomás Rivera", initials: "TR", img: "https://i.pravatar.cc/300?img=15", speaking: false, muted: true, cameraOff: false, host: false, hand: false },
  { id: "p5", name: "Aiko Tanaka", initials: "AT", img: "https://i.pravatar.cc/300?img=49", speaking: false, muted: false, cameraOff: false, host: false, hand: false },
  { id: "p6", name: "Samir Haddad", initials: "SH", img: "https://i.pravatar.cc/300?img=68", speaking: false, muted: true, cameraOff: true, host: false, hand: false },
]

const CHAT = [
  { id: "c1", who: "Lena Hofer", initials: "LH", at: "10:02", text: "Morning everyone, can you all see the deck?" },
  { id: "c2", who: "You", initials: "YU", at: "10:03", text: "Loud and clear. Slide 4 is the one I had questions on.", me: true },
  { id: "c3", who: "Dev Patel", initials: "DP", at: "10:04", text: "Sharing the figures now — give me one sec." },
  { id: "c4", who: "Aiko Tanaka", initials: "AT", at: "10:05", text: "The Q3 retention chart looks much healthier 🎉" },
  { id: "c5", who: "Maya Okonkwo", initials: "MO", at: "10:06", text: "Great work team. Let's lock the launch date before we drop off." },
]

export default function VideoMeetingApp() {
  const [micOn, setMicOn] = React.useState(true)
  const [cameraOn, setCameraOn] = React.useState(true)
  const [sharing, setSharing] = React.useState(false)
  const [handRaised, setHandRaised] = React.useState(false)
  const [panelOpen, setPanelOpen] = React.useState(true)
  const [tab, setTab] = React.useState("chat")
  const [draft, setDraft] = React.useState("")
  const [pinned, setPinned] = React.useState<string | null>(null)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="flex items-center justify-between gap-4 border-b bg-card px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Video className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-sm font-semibold sm:text-base">Q3 Product Sync</h1>
              <Badge variant="secondary" className="hidden gap-1 sm:inline-flex">
                <Lock className="h-3 w-3" /> Locked
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Recurring · Hosted by Maya Okonkwo</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5">
            <span className="flex h-2 w-2 rounded-full bg-destructive" aria-hidden="true" />
            <span className="text-xs font-medium tabular-nums">REC · 42:17</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 sm:flex">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium tabular-nums">{PARTICIPANTS.length} joined</span>
          </div>
          <Button variant="ghost" size="icon" aria-label="Meeting settings">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <section className="flex flex-1 flex-col p-3 sm:p-4">
          <div className="grid flex-1 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PARTICIPANTS.map((p) => {
              const isPinned = pinned === p.id
              return (
                <div
                  key={p.id}
                  className={cn(
                    "group relative flex items-center justify-center overflow-hidden rounded-xl border bg-muted/40 transition-shadow",
                    p.speaking && "ring-2 ring-primary",
                    isPinned && "sm:col-span-2 sm:row-span-2",
                  )}
                >
                  {p.cameraOff ? (
                    <div className="flex flex-col items-center gap-3 py-10">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={p.img} alt="" />
                        <AvatarFallback>{p.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">Camera off</span>
                    </div>
                  ) : (
                    <img src={p.img} alt="" className="h-full w-full object-cover" />
                  )}

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    {p.hand && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Hand className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <span className="ml-auto flex items-center gap-1">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-7 w-7"
                        aria-label={isPinned ? "Unpin " + p.name : "Pin " + p.name}
                        onClick={() => setPinned(isPinned ? null : p.id)}
                      >
                        <Pin className={cn("h-3.5 w-3.5", isPinned && "text-primary")} />
                      </Button>
                      <Button variant="secondary" size="icon" className="h-7 w-7" aria-label={"Expand " + p.name}>
                        <Maximize2 className="h-3.5 w-3.5" />
                      </Button>
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-background/80 to-transparent p-2">
                    <span className="flex items-center gap-1.5 rounded-md bg-background/70 px-2 py-1 text-xs font-medium backdrop-blur">
                      {p.name.split(" ")[0]}
                      {p.host && <Badge variant="outline" className="h-4 px-1 text-[10px]">Host</Badge>}
                    </span>
                    <span className="flex items-center gap-1">
                      {p.speaking && !p.muted && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary">
                          <Volume2 className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-md bg-background/70 backdrop-blur",
                          p.muted ? "text-destructive" : "text-foreground",
                        )}
                      >
                        {p.muted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                      </span>
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border bg-card px-3 py-3 sm:gap-3">
            <Button
              variant={micOn ? "secondary" : "destructive"}
              className="flex-col gap-1 h-auto py-2 px-3"
              onClick={() => setMicOn((v) => !v)}
              aria-pressed={micOn}
            >
              {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              <span className="text-[11px] font-medium">{micOn ? "Mute" : "Unmute"}</span>
            </Button>
            <Button
              variant={cameraOn ? "secondary" : "destructive"}
              className="flex-col gap-1 h-auto py-2 px-3"
              onClick={() => setCameraOn((v) => !v)}
              aria-pressed={cameraOn}
            >
              {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              <span className="text-[11px] font-medium">{cameraOn ? "Stop" : "Start"}</span>
            </Button>
            <Button
              variant={sharing ? "default" : "secondary"}
              className="flex-col gap-1 h-auto py-2 px-3"
              onClick={() => setSharing((v) => !v)}
              aria-pressed={sharing}
            >
              <MonitorUp className="h-5 w-5" />
              <span className="text-[11px] font-medium">{sharing ? "Stop share" : "Share"}</span>
            </Button>
            <Button
              variant={handRaised ? "default" : "secondary"}
              className="flex-col gap-1 h-auto py-2 px-3"
              onClick={() => setHandRaised((v) => !v)}
              aria-pressed={handRaised}
            >
              <Hand className="h-5 w-5" />
              <span className="text-[11px] font-medium">{handRaised ? "Lower" : "Raise"}</span>
            </Button>
            <Button
              variant={panelOpen ? "default" : "secondary"}
              className="flex-col gap-1 h-auto py-2 px-3"
              onClick={() => {
                setPanelOpen(true)
                setTab("chat")
              }}
              aria-pressed={panelOpen && tab === "chat"}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-[11px] font-medium">Chat</span>
            </Button>
            <Button
              variant="secondary"
              className="flex-col gap-1 h-auto py-2 px-3"
              aria-label="More options"
            >
              <MoreVertical className="h-5 w-5" />
              <span className="text-[11px] font-medium">More</span>
            </Button>
            <Separator orientation="vertical" className="mx-1 hidden h-10 sm:block" />
            <Button variant="destructive" className="flex-col gap-1 h-auto py-2 px-4">
              <PhoneOff className="h-5 w-5" />
              <span className="text-[11px] font-medium">Leave</span>
            </Button>
          </div>
        </section>

        {panelOpen && (
          <aside className="hidden w-80 shrink-0 flex-col border-l bg-card md:flex">
            <Tabs value={tab} onValueChange={setTab} className="flex flex-1 flex-col">
              <div className="flex items-center justify-between border-b px-3 py-2">
                <TabsList className="grid flex-1 grid-cols-2">
                  <TabsTrigger value="chat" className="gap-1.5">
                    <MessageSquare className="h-4 w-4" /> Chat
                  </TabsTrigger>
                  <TabsTrigger value="people" className="gap-1.5">
                    <Users className="h-4 w-4" /> People
                  </TabsTrigger>
                </TabsList>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 shrink-0"
                  aria-label="Close panel"
                  onClick={() => setPanelOpen(false)}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <TabsContent value="chat" className="flex flex-1 flex-col overflow-hidden m-0">
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  {CHAT.map((m) => (
                    <div key={m.id} className={cn("flex gap-2.5", m.me && "flex-row-reverse")}>
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className="text-[10px]">{m.initials}</AvatarFallback>
                      </Avatar>
                      <div className={cn("max-w-[80%]", m.me && "text-right")}>
                        <div className={cn("mb-1 flex items-center gap-2", m.me && "flex-row-reverse")}>
                          <span className="text-xs font-medium">{m.who}</span>
                          <span className="text-[10px] text-muted-foreground tabular-nums">{m.at}</span>
                        </div>
                        <p
                          className={cn(
                            "rounded-2xl px-3 py-2 text-sm",
                            m.me ? "bg-primary text-primary-foreground" : "bg-muted",
                          )}
                        >
                          {m.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <form
                  className="flex items-center gap-2 border-t p-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setDraft("")
                  }}
                >
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Send a message to everyone"
                    aria-label="Message"
                  />
                  <Button type="submit" size="icon" aria-label="Send message">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="people" className="flex flex-1 flex-col overflow-hidden m-0">
                <div className="flex items-center justify-between border-b px-4 py-2.5">
                  <span className="text-xs font-medium text-muted-foreground">
                    In meeting · {PARTICIPANTS.length}
                  </span>
                  <Button variant="outline" size="sm">Invite</Button>
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto p-2">
                  {PARTICIPANTS.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={p.img} alt="" />
                        <AvatarFallback>{p.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-sm font-medium">{p.name}</span>
                          {p.host && <Badge variant="outline" className="h-4 px-1 text-[10px]">Host</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {p.cameraOff ? "Camera off" : p.speaking ? "Speaking" : "Connected"}
                        </p>
                      </div>
                      {p.hand && <Hand className="h-4 w-4 text-primary" aria-label="Hand raised" />}
                      <span className={cn(p.muted ? "text-destructive" : "text-muted-foreground")}>
                        {p.muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </aside>
        )}
      </main>
    </div>
  )
}
