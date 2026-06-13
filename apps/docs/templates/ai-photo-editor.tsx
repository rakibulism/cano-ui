"use client"

import * as React from "react"
import {
  Sparkles,
  Scissors,
  Wand2,
  Maximize2,
  Eraser,
  Sun,
  Contrast,
  Droplets,
  Thermometer,
  Aperture,
  ArrowLeftRight,
  Download,
  Undo2,
  Redo2,
  Image as ImageIcon,
  Layers,
  ZoomIn,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const AI_TOOLS = [
  { id: "remove-bg", label: "Remove background", desc: "Cut the subject in one click", icon: Scissors },
  { id: "enhance", label: "Enhance", desc: "Auto color, light & clarity", icon: Wand2 },
  { id: "upscale", label: "Upscale", desc: "Sharpen up to 4x resolution", icon: Maximize2 },
  { id: "retouch", label: "Retouch", desc: "Smooth skin & remove spots", icon: Eraser },
] as const

const ADJUSTMENTS = [
  { id: "brightness", label: "Brightness", value: "+18", icon: Sun },
  { id: "contrast", label: "Contrast", value: "+6", icon: Contrast },
  { id: "saturation", label: "Saturation", value: "-4", icon: Droplets },
  { id: "warmth", label: "Warmth", value: "+12", icon: Thermometer },
  { id: "sharpness", label: "Sharpness", value: "+30", icon: Aperture },
] as const

const RECENT = [
  { id: 1, name: "portrait-04", tag: "Retouch" },
  { id: 2, name: "product-shot", tag: "Remove BG" },
  { id: 3, name: "landscape-2x", tag: "Upscale" },
  { id: 4, name: "cafe-mood", tag: "Enhance" },
  { id: 5, name: "studio-set", tag: "Retouch" },
  { id: 6, name: "headshot-fin", tag: "Upscale" },
] as const

export default function AiPhotoEditor() {
  const [activeTool, setActiveTool] = React.useState<string>("enhance")
  const [showBefore, setShowBefore] = React.useState(false)
  const [activeAdjustments, setActiveAdjustments] = React.useState<string[]>([
    "brightness",
    "warmth",
    "sharpness",
  ])

  const toggleAdjustment = (id: string) =>
    setActiveAdjustments((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )

  const currentTool = AI_TOOLS.find((t) => t.id === activeTool)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Lumen Studio</p>
            <p className="text-xs text-muted-foreground">portrait-04.png · 4096 × 2731</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Undo">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Redo">
            <Redo2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Layers className="mr-2 h-4 w-4" />
            Layers
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 lg:grid lg:grid-cols-[260px_minmax(0,1fr)_260px] lg:gap-4 lg:p-6">
        {/* Left tools panel */}
        <aside className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              AI Actions
            </h2>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" /> Pro
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {AI_TOOLS.map((tool) => {
              const Icon = tool.icon
              const active = activeTool === tool.id
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                    active
                      ? "border-primary bg-primary/10"
                      : "bg-card hover:bg-accent"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{tool.label}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {tool.desc}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-auto rounded-xl border bg-muted/30 p-3">
            <p className="text-sm font-medium">{currentTool?.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {currentTool?.desc}. Apply to the active layer or run on the whole canvas.
            </p>
            <Button size="sm" className="mt-3 w-full">
              <Wand2 className="mr-2 h-4 w-4" />
              Apply {currentTool?.label}
            </Button>
          </div>
        </aside>

        {/* Center canvas */}
        <section className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-card p-2">
            <div className="flex items-center gap-1">
              {AI_TOOLS.map((tool) => {
                const Icon = tool.icon
                return (
                  <Button
                    key={tool.id}
                    variant={activeTool === tool.id ? "secondary" : "ghost"}
                    size="icon"
                    aria-label={tool.label}
                    onClick={() => setActiveTool(tool.id)}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                )
              })}
            </div>
            <Button
              variant={showBefore ? "default" : "outline"}
              size="sm"
              onClick={() => setShowBefore((v) => !v)}
              aria-pressed={showBefore}
            >
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              {showBefore ? "Showing Before" : "Showing After"}
            </Button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border bg-muted/30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%), linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)",
                backgroundSize: "24px 24px",
                backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-center gap-3 px-6 py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed bg-background/70 text-muted-foreground">
                <ImageIcon className="h-8 w-8" />
              </div>
              <p className="text-sm font-medium">
                {showBefore ? "Original image" : "Edited preview"}
              </p>
              <p className="max-w-xs text-xs text-muted-foreground">
                {showBefore
                  ? "This is your source photo before any AI edits."
                  : `${activeAdjustments.length} adjustments and ${currentTool?.label} applied.`}
              </p>
              <Badge
                variant={showBefore ? "outline" : "default"}
                className="mt-1"
              >
                {showBefore ? "BEFORE" : "AFTER"}
              </Badge>
            </div>
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-lg border bg-background/90 px-2.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <ZoomIn className="h-3.5 w-3.5" /> 100%
            </div>
          </div>
        </section>

        {/* Right adjustments panel */}
        <aside className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Adjustments
          </h2>
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-3">
            {ADJUSTMENTS.map((adj) => {
              const Icon = adj.icon
              const on = activeAdjustments.includes(adj.id)
              return (
                <button
                  key={adj.id}
                  onClick={() => toggleAdjustment(adj.id)}
                  aria-pressed={on}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                    on
                      ? "border-primary bg-primary/10 text-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {adj.label}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-xs",
                      on ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {on ? adj.value : "—"}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="rounded-xl border bg-muted/30 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Smart presets</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Cinematic", "Portrait", "Vivid", "Mono", "Film"].map((p) => (
                <Badge key={p} variant="outline" className="cursor-pointer hover:bg-accent">
                  {p}
                </Badge>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Recent edits strip */}
      <footer className="border-t bg-background px-4 py-4 sm:px-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Recent edits
          </h2>
          <Button variant="link" size="sm" className="h-auto p-0">
            View all
          </Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {RECENT.map((item) => (
            <div
              key={item.id}
              className="group w-32 shrink-0 cursor-pointer"
            >
              <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-lg border bg-muted/30 transition-colors group-hover:border-primary">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="mt-1.5 truncate text-xs font-medium">{item.name}</p>
              <p className="text-[11px] text-muted-foreground">{item.tag}</p>
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}
