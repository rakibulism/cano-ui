"use client"

import * as React from "react"
import {
  Sparkles,
  Upload,
  Download,
  Wand2,
  ImagePlus,
  Check,
  Palette,
  Shirt,
  Camera,
  RefreshCw,
  Star,
  Grid2x2,
  Settings2,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

const STYLES = [
  { id: "corporate", name: "Corporate", desc: "Studio headshots", tag: "Popular" },
  { id: "linkedin", name: "LinkedIn Pro", desc: "Clean & confident", tag: null },
  { id: "creative", name: "Creative", desc: "Bold editorial", tag: "New" },
  { id: "cinematic", name: "Cinematic", desc: "Moody film tones", tag: null },
  { id: "outdoor", name: "Outdoor", desc: "Natural daylight", tag: null },
  { id: "vintage", name: "Vintage", desc: "Warm retro film", tag: null },
] as const

const UPLOADS = ["JD", "JD", "JD", "JD", "JD"] as const

const BACKGROUNDS = ["Studio Gray", "Office", "Gradient", "Outdoor", "Bookshelf"] as const
const OUTFITS = ["Suit", "Blazer", "Sweater", "Casual", "Turtleneck"] as const

const GENERATED = [
  { id: 1, tone: "from-primary/20 to-muted", label: "Variation 01" },
  { id: 2, tone: "from-muted to-accent", label: "Variation 02" },
  { id: 3, tone: "from-accent to-primary/15", label: "Variation 03" },
  { id: 4, tone: "from-muted to-primary/20", label: "Variation 04" },
  { id: 5, tone: "from-primary/15 to-accent", label: "Variation 05" },
  { id: 6, tone: "from-accent to-muted", label: "Variation 06" },
  { id: 7, tone: "from-primary/20 to-accent", label: "Variation 07" },
  { id: 8, tone: "from-muted to-primary/15", label: "Variation 08" },
] as const

const DOWNLOADS = [
  { id: "a", name: "headshot_corporate_01.png", res: "1024x1024", date: "Saved today" },
  { id: "b", name: "headshot_linkedin_03.png", res: "1024x1024", date: "Saved today" },
  { id: "c", name: "headshot_creative_07.png", res: "2048x2048", date: "Yesterday" },
  { id: "d", name: "headshot_outdoor_02.png", res: "1024x1024", date: "2 days ago" },
] as const

export default function AiAvatarStudio() {
  const [selectedStyle, setSelectedStyle] = React.useState<string>("corporate")
  const [background, setBackground] = React.useState<string>("Studio Gray")
  const [outfit, setOutfit] = React.useState<string>("Blazer")
  const [hiRes, setHiRes] = React.useState(true)
  const [enhance, setEnhance] = React.useState(true)
  const [generated, setGenerated] = React.useState(false)

  const handleGenerate = () => setGenerated(true)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Avatar Studio</p>
              <p className="text-xs text-muted-foreground">AI headshots</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="sm">Gallery</Button>
            <Button variant="ghost" size="sm">Styles</Button>
            <Button variant="ghost" size="sm">Pricing</Button>
          </nav>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <Star className="mr-1 h-3 w-3" /> 12 credits
            </Badge>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Create your AI headshots
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a style, tune the look, and generate a studio-grade set in minutes.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-2">
            <RefreshCw className="h-4 w-4 text-primary" />
            <div className="text-xs">
              <p className="font-medium">Model trained</p>
              <p className="text-muted-foreground">28 source photos</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <Palette className="h-4 w-4 text-primary" /> Choose a style
                </h2>
                <Badge variant="outline">{STYLES.length} styles</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {STYLES.map((style) => {
                  const active = selectedStyle === style.id
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyle(style.id)}
                      aria-pressed={active}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border bg-card p-3 text-left transition",
                        active ? "border-primary ring-2 ring-primary" : "hover:bg-accent"
                      )}
                    >
                      <div className="mb-3 flex aspect-square items-center justify-center rounded-lg bg-muted">
                        <Camera className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{style.name}</p>
                        {active && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{style.desc}</p>
                      {style.tag && (
                        <Badge variant="secondary" className="absolute right-2 top-2 text-[10px]">
                          {style.tag}
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <ImagePlus className="h-4 w-4 text-primary" /> Source photos
                </h2>
                <Button variant="ghost" size="sm">
                  <Upload className="mr-1 h-4 w-4" /> Add more
                </Button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {UPLOADS.map((u, i) => (
                  <div
                    key={i}
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border bg-muted"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-xs">{u}</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
                <button
                  type="button"
                  className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-muted-foreground transition hover:bg-accent"
                  aria-label="Upload photo"
                >
                  <Upload className="h-5 w-5" />
                  <span className="text-[10px]">Upload</span>
                </button>
              </div>
            </section>

            <Card>
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Wand2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {generated ? "Set ready" : "Ready to generate"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {STYLES.find((s) => s.id === selectedStyle)?.name} · {background} · {outfit}
                      {hiRes ? " · 2048px" : " · 1024px"}
                    </p>
                  </div>
                </div>
                <Button size="lg" onClick={handleGenerate} className="w-full sm:w-auto">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {generated ? "Regenerate" : "Generate avatars"}
                </Button>
              </CardContent>
            </Card>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <Grid2x2 className="h-4 w-4 text-primary" /> Generated results
                </h2>
                {generated && <Badge>{GENERATED.length} new</Badge>}
              </div>
              {generated ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {GENERATED.map((g) => (
                    <div
                      key={g.id}
                      className="group relative overflow-hidden rounded-xl border bg-card"
                    >
                      <div
                        className={cn(
                          "flex aspect-square items-center justify-center bg-gradient-to-br",
                          g.tone
                        )}
                      >
                        <Camera className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between px-2 py-1.5">
                        <span className="text-[11px] text-muted-foreground">{g.label}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          aria-label={"Download " + g.label}
                        >
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-14 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Sparkles className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">No avatars yet</p>
                  <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                    Hit generate to render a fresh grid of headshots from your selected style.
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="space-y-5 p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <Settings2 className="h-4 w-4 text-primary" /> Settings
                </h2>

                <div>
                  <Label className="mb-2 flex items-center gap-1.5 text-xs">
                    <Palette className="h-3.5 w-3.5" /> Background
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {BACKGROUNDS.map((bg) => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setBackground(bg)}
                        aria-pressed={background === bg}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs transition",
                          background === bg
                            ? "border-primary bg-primary/10 text-primary"
                            : "hover:bg-accent"
                        )}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 flex items-center gap-1.5 text-xs">
                    <Shirt className="h-3.5 w-3.5" /> Outfit
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {OUTFITS.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setOutfit(o)}
                        aria-pressed={outfit === o}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs transition",
                          outfit === o
                            ? "border-primary bg-primary/10 text-primary"
                            : "hover:bg-accent"
                        )}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="hires" className="text-xs font-medium">
                      High resolution
                    </Label>
                    <p className="text-[11px] text-muted-foreground">2048px exports</p>
                  </div>
                  <Switch id="hires" checked={hiRes} onCheckedChange={setHiRes} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enhance" className="text-xs font-medium">
                      Face enhance
                    </Label>
                    <p className="text-[11px] text-muted-foreground">Sharper details</p>
                  </div>
                  <Switch id="enhance" checked={enhance} onCheckedChange={setEnhance} />
                </div>

                <Separator />

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Monthly credits</span>
                    <span className="font-medium">12 / 50</span>
                  </div>
                  <Progress value={24} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-semibold">
                    <Download className="h-4 w-4 text-primary" /> Downloads
                  </h2>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    View all <ChevronRight className="ml-0.5 h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {DOWNLOADS.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center gap-3 rounded-lg border bg-card p-2"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">{d.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {d.res} · {d.date}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        aria-label={"Download " + d.name}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 Avatar Studio. AI-generated images.</p>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-foreground">Privacy</span>
            <span className="cursor-pointer hover:text-foreground">Terms</span>
            <span className="cursor-pointer hover:text-foreground">Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
