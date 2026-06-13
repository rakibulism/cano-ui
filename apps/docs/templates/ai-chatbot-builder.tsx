"use client"
import * as React from "react"
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  Globe,
  Database,
  Plus,
  Trash2,
  Settings2,
  MessageSquare,
  Rocket,
  Zap,
  User,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

const MODELS = [
  { id: "swift", name: "Cano Swift", hint: "Fastest, lightweight", icon: Zap },
  { id: "pro", name: "Cano Pro", hint: "Balanced reasoning", icon: Sparkles },
  { id: "max", name: "Cano Max", hint: "Deepest knowledge", icon: Rocket },
]

const TONES = ["Friendly", "Professional", "Playful", "Concise", "Empathetic"]

const KNOWLEDGE = [
  { id: "k1", name: "Help Center Articles", type: "Website", icon: Globe, count: "248 pages", status: "Synced" },
  { id: "k2", name: "Product Handbook.pdf", type: "Document", icon: FileText, count: "52 pages", status: "Synced" },
  { id: "k3", name: "Pricing & Plans", type: "Database", icon: Database, count: "14 records", status: "Indexing" },
  { id: "k4", name: "Onboarding FAQ.pdf", type: "Document", icon: FileText, count: "18 pages", status: "Synced" },
]

const SEEDED_REPLIES = [
  "Great question! Based on our Help Center, you can upgrade your plan anytime from Settings -> Billing. Want me to walk you through it?",
  "I can help with that. Our Pro plan includes unlimited automations and priority support. Would you like a quick comparison?",
  "Sure thing! I pulled this from the Product Handbook: setup usually takes under five minutes. Shall I send the step-by-step guide?",
  "Happy to help! According to the latest pricing data, annual billing saves you about 20%. Want the exact numbers for your team size?",
]

type Msg = { id: number; from: "bot" | "user"; text: string }

const INITIAL_MESSAGES: Msg[] = [
  { id: 1, from: "bot", text: "Hi there! I'm Nova, your support assistant. How can I help you today?" },
  { id: 2, from: "user", text: "Hey! How do I upgrade my subscription?" },
  { id: 3, from: "bot", text: "You can upgrade in just a few clicks from your account settings. Want me to show you where?" },
]

export default function AiChatbotBuilderTemplate() {
  const [botName, setBotName] = React.useState("Nova")
  const [model, setModel] = React.useState("pro")
  const [activeTones, setActiveTones] = React.useState<string[]>(["Friendly", "Concise"])
  const [messages, setMessages] = React.useState<Msg[]>(INITIAL_MESSAGES)
  const [draft, setDraft] = React.useState("")
  const [replyIndex, setReplyIndex] = React.useState(0)
  const [streaming, setStreaming] = React.useState(true)
  const [creativity, setCreativity] = React.useState(60)

  const toggleTone = (tone: string) => {
    setActiveTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone]
    )
  }

  const send = () => {
    const text = draft.trim()
    if (!text) return
    const reply = SEEDED_REPLIES[replyIndex % SEEDED_REPLIES.length]
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "user", text },
      { id: prev.length + 2, from: "bot", text: reply },
    ])
    setReplyIndex((i) => i + 1)
    setDraft("")
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-background/80 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Chatbot Studio</p>
            <p className="text-xs text-muted-foreground">Editing: {botName} Assistant</p>
          </div>
          <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">Draft</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Preview</Button>
          <Button size="sm">
            <Rocket className="mr-1.5 h-4 w-4" />
            Publish
          </Button>
        </div>
      </header>

      <main className="grid flex-1 grid-cols-1 gap-4 p-4 sm:p-6 lg:grid-cols-[300px_minmax(0,1fr)_340px]">
        {/* Left: configuration */}
        <section className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings2 className="h-4 w-4 text-primary" />
                Configuration
              </CardTitle>
              <CardDescription>Define how your bot behaves.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Bot name</Label>
                <Input
                  id="bot-name"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  placeholder="e.g. Nova"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Model</Label>
                <div className="space-y-2">
                  {MODELS.map((m) => {
                    const Icon = m.icon
                    const selected = model === m.id
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setModel(m.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-colors",
                          selected
                            ? "border-primary bg-primary/10"
                            : "hover:bg-muted"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                            selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{m.name}</span>
                          <span className="block text-xs text-muted-foreground">{m.hint}</span>
                        </span>
                        {selected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Tone</Label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map((tone) => {
                    const active = activeTones.includes(tone)
                    return (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => toggleTone(tone)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground hover:bg-muted"
                        )}
                        aria-pressed={active}
                      >
                        {tone}
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Center: live preview chat */}
        <section className="flex min-h-[520px] flex-col">
          <Card className="flex flex-1 flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between gap-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm">{botName}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5 text-xs">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    Live preview
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="gap-1">
                <Sparkles className="h-3 w-3" />
                {MODELS.find((m) => m.id === model)?.name}
              </Badge>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 overflow-y-auto bg-muted/30 p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-end gap-2",
                    msg.from === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.from === "bot" && (
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Bot className="h-3.5 w-3.5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
                      msg.from === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-card text-foreground"
                    )}
                  >
                    {msg.text}
                  </div>
                  {msg.from === "user" && (
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarFallback className="bg-secondary text-foreground">
                        <User className="h-3.5 w-3.5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </CardContent>

            <div className="border-t bg-background p-3">
              <div className="flex items-center gap-2">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send()
                  }}
                  placeholder="Type a message to test your bot..."
                  className="flex-1"
                  aria-label="Message preview input"
                />
                <Button size="icon" onClick={send} aria-label="Send message">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
                <MessageSquare className="h-3 w-3" />
                Replies are generated from your knowledge sources.
              </p>
            </div>
          </Card>
        </section>

        {/* Right: tabs panel */}
        <section className="flex flex-col">
          <Tabs defaultValue="knowledge" className="flex flex-1 flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="knowledge" className="mt-4 space-y-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Knowledge sources</CardTitle>
                  <CardDescription>What your bot can reference.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {KNOWLEDGE.map((k) => {
                    const Icon = k.icon
                    return (
                      <div
                        key={k.id}
                        className="flex items-center gap-3 rounded-lg border p-2.5"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{k.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {k.type} · {k.count}
                          </p>
                        </div>
                        <Badge
                          variant={k.status === "Synced" ? "secondary" : "outline"}
                          className="shrink-0 text-[10px]"
                        >
                          {k.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 shrink-0 text-muted-foreground"
                          aria-label={"Remove " + k.name}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )
                  })}
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-1.5 h-4 w-4" />
                    Add source
                  </Button>
                  <div className="rounded-lg bg-muted/30 p-3">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Index usage</span>
                      <span className="font-medium">332 / 500 pages</span>
                    </div>
                    <Progress value={66} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-4 space-y-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Behavior</CardTitle>
                  <CardDescription>Fine-tune responses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="streaming">Stream responses</Label>
                      <p className="text-xs text-muted-foreground">Type out replies word by word.</p>
                    </div>
                    <Switch
                      id="streaming"
                      checked={streaming}
                      onCheckedChange={setStreaming}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="creativity">Creativity</Label>
                      <span className="text-xs font-medium text-muted-foreground">
                        {creativity}%
                      </span>
                    </div>
                    <input
                      id="creativity"
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={creativity}
                      onChange={(e) => setCreativity(Number(e.target.value))}
                      className="w-full accent-primary"
                      aria-label="Creativity level"
                    />
                    <Progress value={creativity} />
                    <p className="text-xs text-muted-foreground">
                      Higher values produce more varied answers.
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="fallback">Fallback message</Label>
                    <Input
                      id="fallback"
                      defaultValue="Let me connect you with a human teammate."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Deployment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Channel</span>
                    <Badge variant="outline">Website widget</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="flex items-center gap-1.5 font-medium text-primary">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                      Ready to publish
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
