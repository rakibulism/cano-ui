"use client"

import * as React from "react"
import {
  Sparkles,
  Film,
  Play,
  Wand2,
  Clock,
  RectangleHorizontal,
  RectangleVertical,
  Square,
  Download,
  Share2,
  Loader2,
  MonitorPlay,
  Layers,
  Zap,
  Music,
  Camera,
  Mountain,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const STYLES = [
  { id: "cinematic", name: "Cinematic", desc: "Filmic, shallow depth of field", icon: Camera },
  { id: "anime", name: "Anime", desc: "Hand-drawn, vivid cels", icon: Sparkles },
  { id: "3d", name: "3D Render", desc: "Octane, soft global light", icon: Layers },
  { id: "claymation", name: "Claymation", desc: "Stop-motion clay texture", icon: Mountain },
  { id: "neon", name: "Neon Noir", desc: "Moody, high-contrast glow", icon: Zap },
  { id: "watercolor", name: "Watercolor", desc: "Soft painterly washes", icon: Wand2 },
]

const RATIOS = [
  { id: "16:9", label: "16:9", icon: RectangleHorizontal },
  { id: "9:16", label: "9:16", icon: RectangleVertical },
  { id: "1:1", label: "1:1", icon: Square },
]

const DURATIONS = ["4s", "8s", "12s", "20s"]

const SCENES = [
  { t: "0:00", label: "Establishing aerial drift", w: "28%" },
  { t: "0:03", label: "Hero close-up, slow push", w: "24%" },
  { t: "0:06", label: "Lighting shift to dusk", w: "26%" },
  { t: "0:09", label: "Final crane pull-out", w: "22%" },
]

const RECENT = [
  { id: 1, title: "Mountain trail at golden hour", style: "Cinematic", ratio: "16:9", dur: "8s" },
  { id: 2, title: "Cyberpunk alley, rain", style: "Neon Noir", ratio: "9:16", dur: "12s" },
  { id: 3, title: "Koi pond, morning mist", style: "Watercolor", ratio: "1:1", dur: "4s" },
  { id: 4, title: "Robot tending a garden", style: "3D Render", ratio: "16:9", dur: "20s" },
]

export default function AiVideoGeneratorTemplate() {
  const [prompt, setPrompt] = React.useState(
    "A lone astronaut walking across a glowing salt flat at twilight, reflections in the shallow water, cinematic camera drift"
  )
  const [style, setStyle] = React.useState("cinematic")
  const [ratio, setRatio] = React.useState("16:9")
  const [duration, setDuration] = React.useState("8s")
  const [status, setStatus] = React.useState<"idle" | "loading" | "ready">("idle")

  const activeStyle = STYLES.find((s) => s.id === style)

  const handleGenerate = () => {
    setStatus("loading")
    window.setTimeout(() => setStatus("ready"), 1400)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Film className="size-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Reelforge Studio</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">Beta</Badge>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#" className="transition-colors hover:text-foreground">Generate</a>
            <a href="#" className="transition-colors hover:text-foreground">Library</a>
            <a href="#" className="transition-colors hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden gap-1 sm:inline-flex">
              <Zap className="size-3" /> 240 credits
            </Badge>
            <Button size="sm">Upgrade</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <Badge variant="secondary" className="mb-3 gap-1">
            <Sparkles className="size-3" /> Text to Video
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Describe a scene. Get a video.
          </h1>
          <p className="mt-2 text-muted-foreground">
            Pick a style, set your format, and let the model direct a short clip from your words.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Wand2 className="size-4 text-primary" /> Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Scene description</Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    placeholder="A neon-lit street market in the rain..."
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: name the camera move, lighting, and mood for stronger results.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Visual style</Label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {STYLES.map((s) => {
                      const Icon = s.icon
                      const selected = style === s.id
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setStyle(s.id)}
                          aria-pressed={selected}
                          className={cn(
                            "flex flex-col items-start gap-1.5 rounded-lg border p-3 text-left transition-all",
                            selected
                              ? "border-primary bg-primary/10 ring-1 ring-primary"
                              : "bg-card hover:bg-accent"
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-4",
                              selected ? "text-primary" : "text-muted-foreground"
                            )}
                          />
                          <span className="text-sm font-medium">{s.name}</span>
                          <span className="text-xs text-muted-foreground">{s.desc}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-1.5">
                      <MonitorPlay className="size-3.5" /> Aspect ratio
                    </Label>
                    <div className="flex gap-2">
                      {RATIOS.map((r) => {
                        const Icon = r.icon
                        const selected = ratio === r.id
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setRatio(r.id)}
                            aria-pressed={selected}
                            className={cn(
                              "flex flex-1 items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors",
                              selected
                                ? "border-primary bg-primary/10 text-primary"
                                : "bg-card text-muted-foreground hover:bg-accent"
                            )}
                          >
                            <Icon className="size-4" /> {r.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-1.5">
                      <Clock className="size-3.5" /> Duration
                    </Label>
                    <div className="flex gap-2">
                      {DURATIONS.map((d) => {
                        const selected = duration === d
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setDuration(d)}
                            aria-pressed={selected}
                            className={cn(
                              "flex-1 rounded-md border px-2 py-2 text-sm transition-colors",
                              selected
                                ? "border-primary bg-primary/10 text-primary"
                                : "bg-card text-muted-foreground hover:bg-accent"
                            )}
                          >
                            {d}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Music className="size-3.5" /> Auto soundtrack enabled
                </div>
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  disabled={status === "loading"}
                  className="gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" /> Generate video
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={cn(
                    "relative flex w-full items-center justify-center overflow-hidden rounded-lg border bg-muted/30",
                    ratio === "9:16" ? "aspect-[9/16] mx-auto max-w-[260px]" : ratio === "1:1" ? "aspect-square" : "aspect-video"
                  )}
                >
                  {status === "ready" ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent to-muted" />
                      <button
                        type="button"
                        aria-label="Play preview"
                        className="relative z-10 flex size-14 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-transform hover:scale-105"
                      >
                        <Play className="size-6 translate-x-0.5 fill-current" />
                      </button>
                      <Badge className="absolute left-3 top-3 z-10 gap-1">
                        {activeStyle?.name} · {duration}
                      </Badge>
                    </>
                  ) : status === "loading" ? (
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <Loader2 className="size-7 animate-spin text-primary" />
                      <span className="text-sm">Rendering frames...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 px-6 text-center text-muted-foreground">
                      <MonitorPlay className="size-8" />
                      <span className="text-sm">Your generated clip will appear here</span>
                    </div>
                  )}
                </div>

                {status === "ready" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Layers className="size-4 text-primary" /> Scene timeline
                    </div>
                    <div className="flex gap-1.5">
                      {SCENES.map((sc, i) => (
                        <div
                          key={sc.t}
                          style={{ width: sc.w }}
                          className={cn(
                            "h-2 rounded-full",
                            i % 2 === 0 ? "bg-primary" : "bg-primary/40"
                          )}
                        />
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      {SCENES.map((sc) => (
                        <div key={sc.t} className="flex items-center gap-3 text-sm">
                          <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground">
                            {sc.t}
                          </span>
                          <span className="text-foreground">{sc.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              {status === "ready" && (
                <CardFooter className="gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                    <Download className="size-4" /> Export
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                    <Share2 className="size-4" /> Share
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <Wand2 className="size-4" /> Remix
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>

        <Separator className="my-10" />

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Recent generations</h2>
              <p className="text-sm text-muted-foreground">Pick up where you left off.</p>
            </div>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECENT.map((item) => (
              <Card key={item.id} className="group overflow-hidden p-0">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-muted via-accent to-primary/15">
                  <div className="flex size-10 items-center justify-center rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="size-4 translate-x-0.5 fill-current" />
                  </div>
                  <Badge variant="secondary" className="absolute bottom-2 right-2 text-xs">
                    {item.dur}
                  </Badge>
                </div>
                <div className="space-y-2 p-3">
                  <p className="line-clamp-2 text-sm font-medium leading-snug">{item.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">{item.style}</Badge>
                    <span>{item.ratio}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Film className="size-4" />
            <span>Reelforge Studio</span>
          </div>
          <p>Generated clips are watermarked on the free plan.</p>
        </div>
      </footer>
    </div>
  )
}
