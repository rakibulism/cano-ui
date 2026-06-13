"use client"
import * as React from "react"
import { FileText, Send, Sparkles, Upload, Quote, BookOpen, Trash2, Plus, Search, Database, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

type Doc = {
  id: string
  name: string
  pages: number
  size: string
  status: "indexed" | "processing"
}

type Source = {
  id: string
  doc: string
  page: number
  snippet: string
  score: number
}

type Message = {
  id: string
  role: "user" | "assistant"
  text: string
  sources?: Source[]
}

const DOCS: Doc[] = [
  { id: "d1", name: "Q4 Investor Memo.pdf", pages: 24, size: "1.8 MB", status: "indexed" },
  { id: "d2", name: "Master Services Agreement.docx", pages: 41, size: "612 KB", status: "indexed" },
  { id: "d3", name: "Annual Compliance Report.pdf", pages: 88, size: "4.2 MB", status: "indexed" },
  { id: "d4", name: "Product Roadmap 2026.pdf", pages: 12, size: "940 KB", status: "processing" },
]

const SEED_SOURCES: Source[] = [
  { id: "s1", doc: "Q4 Investor Memo.pdf", page: 7, snippet: "Net revenue retention reached 134%, up from 121% in the prior quarter, driven by mid-market expansion.", score: 0.94 },
  { id: "s2", doc: "Annual Compliance Report.pdf", page: 52, snippet: "All SOC 2 Type II controls were operating effectively throughout the audit period with zero exceptions.", score: 0.89 },
  { id: "s3", doc: "Master Services Agreement.docx", page: 18, snippet: "Either party may terminate for convenience upon ninety (90) days written notice to the other party.", score: 0.81 },
]

const ANSWER =
  "Based on the selected documents, net revenue retention was 134% in Q4 (up from 121%), and the SOC 2 Type II audit closed with zero exceptions. The active services agreement allows termination for convenience with 90 days notice. Let me know if you want a deeper breakdown of any source."

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    role: "user",
    text: "What were our key revenue and compliance results last quarter?",
  },
  {
    id: "m2",
    role: "assistant",
    text: ANSWER,
    sources: SEED_SOURCES,
  },
]

const SUGGESTIONS = [
  "Summarize the termination clause",
  "List all compliance exceptions",
  "What drove revenue growth?",
]

export default function ChatWithDocumentsTemplate() {
  const [selected, setSelected] = React.useState<string[]>(["d1", "d2", "d3"])
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = React.useState("")
  const [activeSources, setActiveSources] = React.useState<Source[]>(SEED_SOURCES)

  const toggleDoc = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    )
  }

  const send = (text: string) => {
    const q = text.trim()
    if (!q) return
    const userMsg: Message = { id: "u" + messages.length, role: "user", text: q }
    const botMsg: Message = {
      id: "a" + messages.length,
      role: "assistant",
      text: ANSWER,
      sources: SEED_SOURCES,
    }
    setMessages((prev) => [...prev, userMsg, botMsg])
    setActiveSources(SEED_SOURCES)
    setInput("")
  }

  const selectedCount = selected.length

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Left: documents */}
      <aside className="hidden w-72 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">DocMind</p>
            <p className="text-xs text-muted-foreground">Chat with your files</p>
          </div>
        </div>

        <div className="px-4 pt-4">
          <Button className="w-full justify-start gap-2" size="sm">
            <Upload className="h-4 w-4" />
            Upload document
          </Button>
        </div>

        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Library
          </p>
          <Badge variant="secondary" className="text-xs">
            {selectedCount} active
          </Badge>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {DOCS.map((doc) => {
            const isOn = selected.includes(doc.id)
            const disabled = doc.status === "processing"
            return (
              <button
                key={doc.id}
                type="button"
                disabled={disabled}
                onClick={() => toggleDoc(doc.id)}
                aria-pressed={isOn}
                className={cn(
                  "group flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition",
                  isOn
                    ? "border-primary bg-primary/10"
                    : "border-transparent hover:bg-accent",
                  disabled && "cursor-not-allowed opacity-60"
                )}
              >
                <FileText
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    isOn ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{doc.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {doc.pages} pages · {doc.size}
                  </span>
                  {doc.status === "processing" && (
                    <span className="mt-1.5 block">
                      <Progress value={62} className="h-1" />
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="border-t px-5 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
            165 chunks indexed
          </div>
        </div>
      </aside>

      {/* Center: chat */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div className="leading-tight">
              <h1 className="text-sm font-semibold">Research session</h1>
              <p className="text-xs text-muted-foreground">
                Answering across {selectedCount} document{selectedCount === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="gap-1">
            <Sparkles className="h-3 w-3" />
            RAG · grounded
          </Badge>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 max-w-[80%] space-y-3">
                  <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed">
                    {msg.text}
                  </div>
                  {msg.sources && (
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((src, i) => (
                        <button
                          key={src.id}
                          type="button"
                          onClick={() => setActiveSources(msg.sources || [])}
                          className="inline-flex items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground transition hover:bg-accent"
                        >
                          <Quote className="h-3 w-3 text-primary" />
                          <span className="font-medium text-foreground">[{i + 1}]</span>
                          <span className="truncate max-w-[140px]">{src.doc}</span>
                          <span className="text-muted-foreground">· p.{src.page}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        <div className="border-t px-6 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-muted-foreground transition hover:bg-accent"
              >
                <Plus className="h-3 w-3" />
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your documents…"
                className="pl-9"
                aria-label="Ask a question"
              />
            </div>
            <Button type="submit" size="icon" aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Answers are grounded in your selected documents and cite their sources.
          </p>
        </div>
      </main>

      {/* Right: sources */}
      <aside className="hidden w-80 shrink-0 flex-col border-l bg-muted/30 xl:flex">
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <Quote className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">Cited sources</h2>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {activeSources.map((src, i) => (
            <Card key={src.id} className="gap-0 py-0">
              <CardHeader className="gap-1 px-4 pt-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">[{i + 1}]</Badge>
                  <span className="text-xs font-medium text-primary">
                    {Math.round(src.score * 100)}% match
                  </span>
                </div>
                <CardTitle className="mt-2 truncate text-sm">{src.doc}</CardTitle>
                <CardDescription className="text-xs">Page {src.page}</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Separator className="my-3" />
                <p className="border-l-2 border-primary pl-3 text-xs leading-relaxed text-muted-foreground">
                  {src.snippet}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="border-t px-5 py-3">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
            <Trash2 className="h-4 w-4" />
            Clear conversation
          </Button>
        </div>
      </aside>
    </div>
  )
}
