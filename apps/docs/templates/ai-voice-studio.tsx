"use client"

import * as React from "react"
import {
  AudioLines,
  Mic,
  Play,
  Pause,
  Download,
  Share2,
  Sparkles,
  Gauge,
  Music2,
  Clock,
  CheckCircle2,
  Wand2,
  Volume2,
  History,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Voice = {
  id: string
  name: string
  accent: string
  tone: string
  gradient: string
}

const VOICES: Voice[] = [
  { id: "nova", name: "Nova", accent: "American", tone: "Warm narrator", gradient: "from-primary/30 to-primary/5" },
  { id: "atlas", name: "Atlas", accent: "British", tone: "Deep, calm", gradient: "from-accent to-muted" },
  { id: "luna", name: "Luna", accent: "Australian", tone: "Bright, friendly", gradient: "from-secondary to-muted" },
  { id: "echo", name: "Echo", accent: "Irish", tone: "Soft-spoken", gradient: "from-primary/20 to-accent" },
  { id: "ember", name: "Ember", accent: "Canadian", tone: "Energetic", gradient: "from-muted to-secondary" },
  { id: "sage", name: "Sage", accent: "Scottish", tone: "Documentary", gradient: "from-accent to-primary/10" },
]

const SPEEDS = ["0.75x", "1x", "1.25x", "1.5x"] as const
const PITCHES = ["Low", "Neutral", "High"] as const
const FORMATS = ["MP3", "WAV", "OGG"] as const

const WAVE = [
  18, 34, 52, 28, 64, 44, 76, 38, 22, 58, 70, 30, 48, 84, 40, 26, 62, 36, 54, 20,
  46, 72, 32, 60, 24, 50, 80, 42, 28, 66, 38, 56, 22, 74, 44, 30, 52, 68, 34, 48,
] as const

const HISTORY: { id: string; title: string; voice: string; length: string; time: string }[] = [
  { id: "h1", title: "Podcast intro — Episode 24", voice: "Nova", length: "0:42", time: "8m ago" },
  { id: "h2", title: "Product demo voiceover", voice: "Atlas", length: "1:18", time: "32m ago" },
  { id: "h3", title: "Audiobook chapter draft", voice: "Sage", length: "3:05", time: "2h ago" },
  { id: "h4", title: "Welcome message for app", voice: "Luna", length: "0:21", time: "Yesterday" },
]

const SAMPLE_SCRIPT =
  "Welcome to Lumen Labs. In just seconds, turn your words into a studio-quality voice — natural, expressive, and ready to publish. Let's create something worth listening to."

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  icon: Icon,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className="size-4 text-muted-foreground" />
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              value === opt
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AiVoiceStudio() {
  const [script, setScript] = React.useState(SAMPLE_SCRIPT)
  const [voice, setVoice] = React.useState<string>("nova")
  const [speed, setSpeed] = React.useState<(typeof SPEEDS)[number]>("1x")
  const [pitch, setPitch] = React.useState<(typeof PITCHES)[number]>("Neutral")
  const [format, setFormat] = React.useState<(typeof FORMATS)[number]>("MP3")
  const [generated, setGenerated] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)

  const selectedVoice = VOICES.find((v) => v.id === voice) ?? VOICES[0]
  const charCount = script.length

  function handleGenerate() {
    if (!script.trim()) return
    setGenerated(true)
    setPlaying(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <AudioLines className="size-5" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-none">Lumen Voice Studio</div>
              <div className="text-xs text-muted-foreground">AI Text-to-Speech</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <Sparkles className="mr-1 size-3" /> 12,400 credits
            </Badge>
            <Button variant="outline" size="sm">
              Docs
            </Button>
            <Button size="sm">Upgrade</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Create a voiceover</h1>
          <p className="mt-1 text-muted-foreground">
            Write a script, pick a voice, fine-tune the delivery, and generate studio-quality audio.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mic className="size-4 text-primary" /> Script
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Label htmlFor="script" className="sr-only">
                  Script
                </Label>
                <Textarea
                  id="script"
                  value={script}
                  onChange={(e) => {
                    setScript(e.target.value)
                    setGenerated(false)
                  }}
                  rows={6}
                  placeholder="Type or paste the text you want to turn into speech..."
                  className="resize-none text-base leading-relaxed"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{charCount} / 5,000 characters</span>
                  <span>Approx. {Math.max(1, Math.round(charCount / 14))}s of audio</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Volume2 className="size-4 text-primary" /> Choose a voice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {VOICES.map((v) => {
                    const active = v.id === voice
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setVoice(v.id)
                          setGenerated(false)
                        }}
                        aria-pressed={active}
                        className={cn(
                          "group relative overflow-hidden rounded-xl border p-4 text-left transition-all",
                          active
                            ? "border-primary ring-2 ring-primary"
                            : "hover:bg-muted"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 -z-10 bg-gradient-to-br opacity-60",
                            v.gradient
                          )}
                        />
                        <div className="flex items-start justify-between">
                          <div className="flex size-10 items-center justify-center rounded-full bg-background/70">
                            <Mic className="size-5 text-foreground" />
                          </div>
                          {active && <CheckCircle2 className="size-5 text-primary" />}
                        </div>
                        <div className="mt-3 font-medium">{v.name}</div>
                        <div className="text-xs text-muted-foreground">{v.tone}</div>
                        <Badge variant="outline" className="mt-2 bg-background/60">
                          {v.accent}
                        </Badge>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {generated && (
              <Card className="border-primary/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AudioLines className="size-4 text-primary" /> Generated clip
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        onClick={() => setPlaying((p) => !p)}
                        aria-label={playing ? "Pause clip" : "Play clip"}
                      >
                        {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
                      </Button>
                      <div>
                        <div className="text-sm font-medium">
                          {selectedVoice.name} · {speed} · {pitch} pitch
                        </div>
                        <div className="text-xs text-muted-foreground">
                          0:00 / 0:{Math.max(10, Math.round(charCount / 14))
                            .toString()
                            .padStart(2, "0")} · {format}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" aria-label="Share clip">
                        <Share2 className="size-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1.5 size-4" /> Export
                      </Button>
                    </div>
                  </div>

                  <div className="flex h-24 items-center gap-[3px] rounded-lg bg-muted/30 px-4">
                    {WAVE.map((h, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex-1 rounded-full transition-colors",
                          playing && i < WAVE.length / 2 ? "bg-primary" : "bg-primary/30"
                        )}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Wand2 className="size-4 text-primary" /> Delivery settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <ChipGroup label="Speed" options={SPEEDS} value={speed} onChange={(v) => { setSpeed(v); setGenerated(false) }} icon={Gauge} />
                <Separator />
                <ChipGroup label="Pitch" options={PITCHES} value={pitch} onChange={(v) => { setPitch(v); setGenerated(false) }} icon={Music2} />
                <Separator />
                <ChipGroup label="Format" options={FORMATS} value={format} onChange={(v) => { setFormat(v); setGenerated(false) }} icon={Download} />
                <Button className="w-full" size="lg" onClick={handleGenerate} disabled={!script.trim()}>
                  <Sparkles className="mr-2 size-4" />
                  Generate voice
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Uses ~{Math.max(1, Math.round(charCount / 100))} credits
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <History className="size-4 text-primary" /> Recent generations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {HISTORY.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Play className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{h.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{h.voice}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" /> {h.length}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{h.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span>© Lumen Voice Studio</span>
          <span className="flex items-center gap-1">
            <AudioLines className="size-4" /> Powered by neural TTS
          </span>
        </div>
      </footer>
    </div>
  )
}
