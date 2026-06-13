"use client"

import * as React from "react"
import {
  Sparkles,
  Wand2,
  Download,
  Heart,
  RefreshCw,
  Image as ImageIcon,
  Maximize2,
  Settings2,
  Layers,
  Clock,
  Coins,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const STYLES = [
  "Photorealistic",
  "Cinematic",
  "Anime",
  "3D Render",
  "Watercolor",
  "Neon Punk",
  "Oil Painting",
  "Pixel Art",
] as const
type Style = (typeof STYLES)[number]

const RATIOS = [
  { label: "1:1", hint: "Square", w: 1, h: 1 },
  { label: "3:2", hint: "Landscape", w: 3, h: 2 },
  { label: "2:3", hint: "Portrait", w: 2, h: 3 },
  { label: "16:9", hint: "Wide", w: 16, h: 9 },
] as const
type Ratio = (typeof RATIOS)[number]

const SIZES = ["512px", "1024px", "2048px"] as const
type Size = (typeof SIZES)[number]

const GALLERY: { id: string; seed: number; label: string; liked: boolean }[] = [
  { id: "g1", seed: 14, label: "Foggy mountain temple at dawn", liked: true },
  { id: "g2", seed: 52, label: "Neon alley, rain-slick streets", liked: false },
  { id: "g3", seed: 88, label: "Astronaut floating over reef", liked: false },
  { id: "g4", seed: 31, label: "Crystal forest, soft volumetric light", liked: true },
  { id: "g5", seed: 67, label: "Retro diner, chrome and pastel", liked: false },
  { id: "g6", seed: 7, label: "Desert monolith under twin moons", liked: false },
]

const HISTORY: { id: string; seed: number; prompt: string; time: string }[] = [
  { id: "h1", seed: 14, prompt: "Foggy mountain temple", time: "2m ago" },
  { id: "h2", seed: 52, prompt: "Neon alley rain", time: "11m ago" },
  { id: "h3", seed: 88, prompt: "Astronaut over reef", time: "26m ago" },
  { id: "h4", seed: 31, prompt: "Crystal forest light", time: "44m ago" },
  { id: "h5", seed: 67, prompt: "Retro chrome diner", time: "1h ago" },
  { id: "h6", seed: 7, prompt: "Desert twin moons", time: "1h ago" },
  { id: "h7", seed: 45, prompt: "Glass koi pond", time: "2h ago" },
  { id: "h8", seed: 99, prompt: "Aurora over tundra", time: "3h ago" },
]

function Tile({ seed, className }: { seed: number; className?: string }) {
  // Deterministic gradient swatch standing in for a generated image.
  const rot = (seed * 37) % 360
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-muted",
        className,
      )}
      style={{
        backgroundImage: `conic-gradient(from ${rot}deg at 30% 30%, var(--primary), var(--muted), var(--accent), var(--primary))`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-background/40" />
    </div>
  )
}

export default function AiImageStudio() {
  const [prompt, setPrompt] = React.useState(
    "A foggy mountain temple at dawn, ultra detailed, soft volumetric light",
  )
  const [style, setStyle] = React.useState<Style>("Cinematic")
  const [size, setSize] = React.useState<Size>("1024px")
  const [ratio, setRatio] = React.useState<Ratio>(RATIOS[1])
  const [hires, setHires] = React.useState(true)
  const [count, setCount] = React.useState(4)
  const [liked, setLiked] = React.useState<Record<string, boolean>>(
    Object.fromEntries(GALLERY.map((g) => [g.id, g.liked])),
  )

  const visible = GALLERY.slice(0, count)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Lumen Studio</p>
              <p className="text-xs text-muted-foreground">AI Image Generation</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Coins className="size-3.5" />
              <span className="tabular-nums">820</span> credits
            </Badge>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Upgrade
            </Button>
            <Button variant="ghost" size="icon" aria-label="Studio settings">
              <Settings2 className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[340px_1fr]">
        {/* Controls panel */}
        <aside className="flex flex-col gap-5">
          <div className="rounded-xl border bg-card p-4">
            <Label htmlFor="prompt" className="flex items-center gap-2 text-sm">
              <Wand2 className="size-4 text-primary" />
              Prompt
            </Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="mt-2 resize-none"
              placeholder="Describe the image you want to create..."
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Tip: add lighting, lens and mood for richer results.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Layers className="size-4 text-primary" />
              Style
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  aria-pressed={style === s}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    style === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-background text-muted-foreground hover:bg-accent",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <p className="text-sm font-medium">Aspect ratio</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {RATIOS.map((r) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setRatio(r)}
                  aria-pressed={ratio.label === r.label}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2 text-xs transition-colors",
                    ratio.label === r.label
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-background text-muted-foreground hover:bg-accent",
                  )}
                >
                  <span
                    className="rounded-sm border border-current"
                    style={{ width: 18 * (r.w / Math.max(r.w, r.h)), height: 18 * (r.h / Math.max(r.w, r.h)) }}
                  />
                  {r.label}
                </button>
              ))}
            </div>

            <Separator className="my-4" />

            <p className="text-sm font-medium">Resolution</p>
            <div className="mt-3 flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={cn(
                    "flex-1 rounded-lg border px-2 py-1.5 text-xs transition-colors",
                    size === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-background text-muted-foreground hover:bg-accent",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Hi-res upscale</p>
                <p className="text-xs text-muted-foreground">2x detail enhance</p>
              </div>
              <Switch checked={hires} onCheckedChange={setHires} aria-label="Toggle hi-res upscale" />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Images</p>
                <span className="text-sm tabular-nums text-muted-foreground">{count}</span>
              </div>
              <div className="mt-2 flex gap-2">
                {[1, 2, 4, 6].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    aria-pressed={count === n}
                    className={cn(
                      "flex-1 rounded-lg border py-1.5 text-xs tabular-nums transition-colors",
                      count === n
                        ? "border-primary bg-primary/10 text-primary"
                        : "bg-background text-muted-foreground hover:bg-accent",
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full gap-2">
            <Sparkles className="size-4" />
            Generate ({count * 4} credits)
          </Button>
        </aside>

        {/* Results + history */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold">Results</h1>
              <p className="text-sm text-muted-foreground">
                {style} &middot; {ratio.label} {ratio.hint} &middot; {size}
                {hires ? " &middot; Hi-res" : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="size-4" />
                Variations
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Download className="size-4" />
                Download all
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "grid gap-4",
              count <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-3",
            )}
          >
            {visible.map((g) => (
              <div key={g.id} className="group relative">
                <Tile seed={g.seed} className="aspect-square w-full" />
                <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-2 bottom-2 flex translate-y-1 items-center justify-between gap-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="line-clamp-1 text-xs text-foreground">{g.label}</p>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-7"
                      aria-label="Like image"
                      onClick={() =>
                        setLiked((prev) => ({ ...prev, [g.id]: !prev[g.id] }))
                      }
                    >
                      <Heart
                        className={cn(
                          "size-3.5",
                          liked[g.id] && "fill-primary text-primary",
                        )}
                      />
                    </Button>
                    <Button variant="secondary" size="icon" className="size-7" aria-label="Expand image">
                      <Maximize2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-medium">
                <Clock className="size-4 text-muted-foreground" />
                History
              </p>
              <Button variant="link" size="sm" className="h-auto p-0">
                View all
              </Button>
            </div>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {HISTORY.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  className="group flex w-28 shrink-0 flex-col gap-1.5 text-left"
                  onClick={() => setPrompt(h.prompt)}
                >
                  <Tile seed={h.seed} className="aspect-square w-full transition-transform group-hover:scale-[1.02]" />
                  <p className="line-clamp-1 text-xs font-medium">{h.prompt}</p>
                  <p className="text-[11px] text-muted-foreground">{h.time}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p className="flex items-center gap-1.5">
            <ImageIcon className="size-3.5" />
            Lumen Studio &middot; Generated images are yours to use.
          </p>
          <p>v2.4 &middot; Model: lumen-diffusion-xl</p>
        </div>
      </footer>
    </div>
  )
}
