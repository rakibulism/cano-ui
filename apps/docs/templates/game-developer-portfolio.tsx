"use client"

import * as React from "react"
import {
  Gamepad2,
  Play,
  Trophy,
  Star,
  Github,
  Twitch,
  Youtube,
  Twitter,
  Mail,
  Sword,
  Brain,
  Sparkles,
  Dices,
  Cpu,
  Boxes,
  Zap,
  Download,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const GENRES = ["All", "Action", "Puzzle", "RPG", "Casual"] as const
type Genre = (typeof GENRES)[number]

const GAMES: {
  title: string
  genre: Exclude<Genre, "All">
  tagline: string
  year: string
  rating: string
  status: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { title: "Neon Drifters", genre: "Action", tagline: "High-octane synthwave racing combat.", year: "2025", rating: "4.8", status: "Released", icon: Zap },
  { title: "Glyphbound", genre: "Puzzle", tagline: "Rotate ancient runes to bend reality.", year: "2024", rating: "4.6", status: "Released", icon: Brain },
  { title: "Ashfall Chronicles", genre: "RPG", tagline: "A 60-hour tactical fantasy saga.", year: "2025", rating: "4.9", status: "Early Access", icon: Sword },
  { title: "Pocket Orchard", genre: "Casual", tagline: "Cozy farm sim for relaxed evenings.", year: "2023", rating: "4.7", status: "Released", icon: Dices },
  { title: "Voidstrike", genre: "Action", tagline: "Bullet-hell roguelite in deep space.", year: "2024", rating: "4.5", status: "Released", icon: Sparkles },
  { title: "Mindloom", genre: "Puzzle", tagline: "Knit threads of logic across dimensions.", year: "2025", rating: "4.4", status: "Beta", icon: Boxes },
  { title: "Hollow Crown", genre: "RPG", tagline: "Choice-driven dark fantasy kingdom builder.", year: "2022", rating: "4.8", status: "Released", icon: Trophy },
  { title: "Sticker Saga", genre: "Casual", tagline: "Collect, decorate, and trade with friends.", year: "2024", rating: "4.6", status: "Released", icon: Star },
]

const SKILLS = [
  { name: "Unreal Engine 5", level: 95 },
  { name: "Unity / C#", level: 90 },
  { name: "Gameplay Systems", level: 88 },
  { name: "Procedural Generation", level: 80 },
  { name: "Shader / VFX", level: 74 },
  { name: "Multiplayer Netcode", level: 70 },
]

const AWARDS = [
  { event: "Indie Game Festival", prize: "Best Action Game", title: "Neon Drifters", year: "2025" },
  { event: "PixelCon Awards", prize: "Excellence in Design", title: "Glyphbound", year: "2024" },
  { event: "Cloud Play Showcase", prize: "Audience Choice", title: "Ashfall Chronicles", year: "2025" },
  { event: "Cozy Games Fest", prize: "Most Wholesome", title: "Pocket Orchard", year: "2023" },
]

const TECH = ["Unreal Engine", "Unity", "C++", "C#", "Blender", "Houdini", "HLSL", "Wwise", "Steamworks", "Photon", "Git LFS", "Perforce"]

const STATS = [
  { value: "12", label: "Games shipped" },
  { value: "3.4M", label: "Players reached" },
  { value: "4.7", label: "Avg. rating" },
  { value: "6", label: "Awards won" },
]

export default function GameDeveloperPortfolio() {
  const [activeGenre, setActiveGenre] = React.useState<Genre>("All")

  const filteredGames =
    activeGenre === "All" ? GAMES : GAMES.filter((g) => g.genre === activeGenre)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Gamepad2 className="h-5 w-5" />
            </span>
            <span className="text-lg">Kira Vance</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#games" className="transition-colors hover:text-foreground">Games</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#awards" className="transition-colors hover:text-foreground">Awards</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="GitHub profile">
              <Github className="h-5 w-5" />
            </Button>
            <Button size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              Press Kit
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero with featured game */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.primary/0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Available for collaborations
              </Badge>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                I build worlds
                <br />
                worth getting
                <span className="text-primary"> lost in.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Independent game developer crafting tactile combat, clever puzzles, and stories that linger. From prototype to launch.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  <Play className="h-4 w-4 fill-current" />
                  Watch the reel
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#games">Browse games</a>
                </Button>
              </div>
              <dl className="mt-12 grid max-w-md grid-cols-2 gap-6 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="text-2xl font-bold tracking-tight">{s.value}</dt>
                    <dd className="mt-0.5 text-xs text-muted-foreground">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <Card className="overflow-hidden border-primary/30 bg-card/60 shadow-2xl">
                <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-primary/25 via-muted to-background">
                  <Zap className="h-24 w-24 text-primary/40" />
                  <Badge className="absolute left-4 top-4 gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Featured
                  </Badge>
                  <Button
                    size="icon"
                    className="absolute h-16 w-16 rounded-full shadow-lg"
                    aria-label="Play Neon Drifters trailer"
                  >
                    <Play className="h-7 w-7 fill-current" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">Neon Drifters</h2>
                      <p className="text-sm text-muted-foreground">Synthwave racing combat · 2025</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary">
                      <Star className="h-4 w-4 fill-current" />
                      4.8
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline">Action</Badge>
                    <Badge variant="outline">Single-player</Badge>
                    <Badge variant="outline">Controller</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Games grid with genre filter */}
        <section id="games" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">The library</h2>
              <p className="mt-2 text-muted-foreground">A decade of shipped titles across genres.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => {
                const isActive = genre === activeGenre
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => setActiveGenre(genre)}
                    aria-pressed={isActive}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {genre}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGames.map((game) => {
              const Icon = game.icon
              return (
                <Card
                  key={game.title}
                  className="group overflow-hidden transition-colors hover:border-primary/50"
                >
                  <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-muted to-muted/30">
                    <Icon className="h-12 w-12 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                    <Badge variant="secondary" className="absolute right-3 top-3">
                      {game.status}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold tracking-tight">{game.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{game.tagline}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <Badge variant="outline">{game.genre}</Badge>
                      <span className="flex items-center gap-3 text-muted-foreground">
                        <span>{game.year}</span>
                        <span className="flex items-center gap-1 text-foreground">
                          <Star className="h-3.5 w-3.5 fill-current text-primary" />
                          {game.rating}
                        </span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredGames.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">No games in this genre yet.</p>
          )}
        </section>

        {/* About + skills */}
        <section id="about" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4 gap-1.5">
                <Cpu className="h-3.5 w-3.5" />
                About
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Solo dev, big-studio polish.
              </h2>
              <p className="mt-5 text-muted-foreground">
                For ten years I have been designing systems that feel alive, the moment-to-moment loops players cannot put down. I wear every hat: gameplay programming, technical art, audio integration, and the long tail of launch and live-ops.
              </p>
              <p className="mt-4 text-muted-foreground">
                I care about responsive controls, honest difficulty curves, and the small juicy details that make an interface sing. If you have a world that needs building, let us talk.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm">
                  <Trophy className="h-4 w-4 text-primary" />
                  6 industry awards
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  Shipped on 5 platforms
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Core skills
              </h3>
              <div className="mt-6 space-y-5">
                {SKILLS.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div
                      className="h-2 w-full overflow-hidden rounded-full bg-muted"
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={skill.name}
                    >
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section id="awards" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 gap-1.5">
              <Trophy className="h-3.5 w-3.5" />
              Recognition
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">Awards & honors</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Selected highlights from festivals and showcases around the world.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {AWARDS.map((award) => (
              <Card key={award.event} className="transition-colors hover:border-primary/50">
                <CardContent className="flex items-center gap-5 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Trophy className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{award.prize}</p>
                      <span className="text-sm text-muted-foreground">{award.year}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {award.event} — <span className="text-foreground">{award.title}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="md:max-w-xs">
                <h2 className="text-2xl font-bold tracking-tight">Tools of the trade</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  The engines and pipelines I reach for every day.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 md:max-w-xl md:justify-end">
                {TECH.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
          <Card className="relative overflow-hidden border-primary/30 bg-card">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,theme(colors.primary/0.18),transparent_60%)]" />
            <CardContent className="relative flex flex-col items-center gap-7 px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Gamepad2 className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Got a world to build?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                  Open to contract work, co-development, and the occasional game jam. Let us make something players remember.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" className="gap-2">
                  <Mail className="h-4 w-4" />
                  kira@vancegames.dev
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download press kit
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gamepad2 className="h-4 w-4" />
            <span>© 2026 Kira Vance · Vance Games</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitch">
              <Twitch className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
