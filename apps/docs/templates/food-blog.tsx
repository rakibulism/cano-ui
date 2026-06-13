"use client"
import * as React from "react"
import {
  UtensilsCrossed,
  Search,
  Clock,
  Flame,
  ChefHat,
  Heart,
  ArrowRight,
  Star,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const CUISINES = ["All", "Italian", "Asian", "Baking", "Vegan"] as const
type Cuisine = (typeof CUISINES)[number]

type Recipe = {
  title: string
  cuisine: Exclude<Cuisine, "All">
  minutes: number
  difficulty: string
  rating: number
  blurb: string
  tone: string
}

const RECIPES: Recipe[] = [
  {
    title: "Creamy Lemon Tagliatelle",
    cuisine: "Italian",
    minutes: 25,
    difficulty: "Easy",
    rating: 4.9,
    blurb: "Silky ribbons of pasta in a bright, peppery lemon cream sauce.",
    tone: "bg-primary/10 text-primary",
  },
  {
    title: "Miso Glazed Eggplant",
    cuisine: "Asian",
    minutes: 35,
    difficulty: "Medium",
    rating: 4.8,
    blurb: "Caramelized eggplant brushed with sweet-savory white miso.",
    tone: "bg-accent text-foreground",
  },
  {
    title: "Brown Butter Banana Bread",
    cuisine: "Baking",
    minutes: 60,
    difficulty: "Easy",
    rating: 5.0,
    blurb: "Deeply nutty loaf with a tender crumb and toasted edges.",
    tone: "bg-secondary text-foreground",
  },
  {
    title: "Smoky Chickpea Stew",
    cuisine: "Vegan",
    minutes: 40,
    difficulty: "Easy",
    rating: 4.7,
    blurb: "A hearty paprika-spiked stew that tastes like a hug.",
    tone: "bg-muted text-foreground",
  },
  {
    title: "Cacio e Pepe Risotto",
    cuisine: "Italian",
    minutes: 45,
    difficulty: "Medium",
    rating: 4.6,
    blurb: "All the comfort of cacio e pepe, folded into creamy rice.",
    tone: "bg-primary/10 text-primary",
  },
  {
    title: "Sesame Ginger Noodles",
    cuisine: "Asian",
    minutes: 20,
    difficulty: "Easy",
    rating: 4.9,
    blurb: "Twenty-minute weeknight noodles with crunchy scallions.",
    tone: "bg-accent text-foreground",
  },
  {
    title: "Salted Tahini Cookies",
    cuisine: "Baking",
    minutes: 30,
    difficulty: "Easy",
    rating: 4.8,
    blurb: "Chewy, fudgy cookies with flaky salt and toasted sesame.",
    tone: "bg-secondary text-foreground",
  },
  {
    title: "Roasted Cauliflower Tacos",
    cuisine: "Vegan",
    minutes: 30,
    difficulty: "Easy",
    rating: 4.7,
    blurb: "Charred cauliflower, lime crema, and quick pickled onion.",
    tone: "bg-muted text-foreground",
  },
]

const CATEGORIES = [
  { name: "Weeknight Dinners", count: 48 },
  { name: "30-Minute Meals", count: 36 },
  { name: "Cozy Bakes", count: 27 },
  { name: "Plant-Based", count: 41 },
  { name: "One-Pan Wonders", count: 19 },
  { name: "Sweet Treats", count: 33 },
]

const POPULAR = [
  { rank: 1, title: "The Ultimate Focaccia", views: "32.4k" },
  { rank: 2, title: "Crispy Tofu Bowl", views: "28.1k" },
  { rank: 3, title: "Brown Butter Banana Bread", views: "24.7k" },
  { rank: 4, title: "Sesame Ginger Noodles", views: "21.9k" },
  { rank: 5, title: "Salted Tahini Cookies", views: "18.3k" },
]

export default function FoodBlogTemplate() {
  const [active, setActive] = React.useState<Cuisine>("All")
  const [saved, setSaved] = React.useState<string[]>([])

  const visible = React.useMemo(
    () => (active === "All" ? RECIPES : RECIPES.filter((r) => r.cuisine === active)),
    [active]
  )

  const toggleSave = (title: string) =>
    setSaved((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" />
            </span>
            <span className="text-lg tracking-tight">Saffron & Sage</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#recipes" className="transition-colors hover:text-foreground">Recipes</a>
            <a href="#categories" className="transition-colors hover:text-foreground">Categories</a>
            <a href="#popular" className="transition-colors hover:text-foreground">Popular</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search recipes">
              <Search className="size-5" />
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">Subscribe</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero featured recipe */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div className="space-y-5">
              <Badge variant="secondary" className="gap-1.5">
                <Flame className="size-3.5" /> Recipe of the week
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Slow-Roasted Tomato & Garlic Galette
              </h1>
              <p className="max-w-prose text-lg text-muted-foreground">
                A rustic, flaky free-form tart packed with jammy roasted tomatoes,
                whipped ricotta, and a shower of fresh basil. Weeknight-friendly,
                dinner-party worthy.
              </p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" /> 55 min
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ChefHat className="size-4" /> Intermediate
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-4 fill-current text-primary" /> 4.9 (212)
                </span>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button size="lg" className="gap-2">
                  Read recipe <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Heart className="size-4" /> Save for later
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border bg-secondary">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-accent to-secondary">
                  <UtensilsCrossed className="size-20 text-primary/40" />
                </div>
              </div>
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ChefHat className="size-5" />
                </span>
                <div className="text-sm leading-tight">
                  <p className="font-medium">By Mira Halloran</p>
                  <p className="text-muted-foreground">Founder & recipe developer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recipes + sidebar */}
        <section id="recipes" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Fresh from the kitchen</h2>
                  <p className="mt-1 text-muted-foreground">
                    Browse our latest recipes by cuisine.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {visible.length} recipe{visible.length === 1 ? "" : "s"}
                </p>
              </div>

              {/* Filter chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {CUISINES.map((c) => {
                  const isActive = active === c
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActive(c)}
                      aria-pressed={isActive}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>

              {/* Recipe grid */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {visible.map((r) => {
                  const isSaved = saved.includes(r.title)
                  return (
                    <article
                      key={r.title}
                      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <div className={cn("flex h-full w-full items-center justify-center", r.tone)}>
                          <UtensilsCrossed className="size-12 opacity-40" />
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleSave(r.title)}
                          aria-label={isSaved ? "Remove from saved" : "Save recipe"}
                          aria-pressed={isSaved}
                          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border bg-background/90 backdrop-blur transition-colors hover:bg-background"
                        >
                          <Heart
                            className={cn(
                              "size-4 transition-colors",
                              isSaved ? "fill-primary text-primary" : "text-muted-foreground"
                            )}
                          />
                        </button>
                        <Badge variant="secondary" className="absolute left-3 top-3">
                          {r.cuisine}
                        </Badge>
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3.5" /> {r.minutes} min
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <ChefHat className="size-3.5" /> {r.difficulty}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Star className="size-3.5 fill-current text-primary" /> {r.rating.toFixed(1)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold leading-snug">{r.title}</h3>
                        <p className="text-sm text-muted-foreground">{r.blurb}</p>
                        <a
                          href="#"
                          className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary"
                        >
                          View recipe
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div id="categories" className="rounded-2xl border bg-card p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <BookOpen className="size-4" /> Categories
                </h3>
                <ul className="mt-4 space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.name}>
                      <a
                        href="#"
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-muted-foreground">{cat.count}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="popular" className="rounded-2xl border bg-card p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <Flame className="size-4" /> Popular this week
                </h3>
                <ol className="mt-4 space-y-4">
                  {POPULAR.map((p) => (
                    <li key={p.rank}>
                      <a href="#" className="flex items-start gap-3 group">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {p.rank}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium transition-colors group-hover:text-primary">
                            {p.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{p.views} reads</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border bg-primary/10 p-6">
                <h3 className="text-base font-semibold">Get our weekly menu</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Five new recipes in your inbox every Sunday.
                </p>
                <form
                  className="mt-4 space-y-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input type="email" placeholder="you@example.com" aria-label="Email address" />
                  <Button type="submit" className="w-full gap-2">
                    <Mail className="size-4" /> Subscribe
                  </Button>
                </form>
              </div>
            </aside>
          </div>
        </section>

        {/* About strip */}
        <section id="about" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[10rem_1fr]">
            <div className="mx-auto flex size-32 items-center justify-center rounded-full bg-primary/10 text-primary md:mx-0">
              <ChefHat className="size-14" />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-2xl font-semibold tracking-tight">Real food, no fuss</h2>
              <p className="max-w-prose text-muted-foreground">
                I&apos;m Mira, a recipe developer cooking from a tiny kitchen in
                Lisbon. Every recipe here is tested until it&apos;s foolproof, written
                for busy weeknights, and made with ingredients you can actually find.
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                <Badge variant="outline">Tested 3+ times</Badge>
                <Badge variant="outline">Weeknight friendly</Badge>
                <Badge variant="outline">Seasonal</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6">
          <Badge variant="secondary" className="mb-4">Join 24,000+ home cooks</Badge>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Never wonder what&apos;s for dinner again
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Subscribe to The Sunday Menu and get a hand-picked set of recipes,
            shopping lists, and prep tips delivered each week.
          </p>
          <form
            className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input type="email" placeholder="Enter your email" aria-label="Email address" className="flex-1" />
            <Button type="submit" size="lg">Subscribe free</Button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
        </section>
      </main>

      <footer className="border-t bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UtensilsCrossed className="size-4" />
                </span>
                Saffron & Sage
              </a>
              <p className="text-sm text-muted-foreground">
                Foolproof recipes for the everyday cook.
              </p>
              <div className="flex gap-1 pt-1">
                <Button variant="ghost" size="icon" aria-label="Instagram">
                  <Instagram className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Facebook">
                  <Facebook className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="YouTube">
                  <Youtube className="size-4" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Recipes</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Breakfast</a></li>
                <li><a href="#" className="hover:text-foreground">Mains</a></li>
                <li><a href="#" className="hover:text-foreground">Desserts</a></li>
                <li><a href="#" className="hover:text-foreground">Drinks</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Explore</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Mira</a></li>
                <li><a href="#" className="hover:text-foreground">Cookbook</a></li>
                <li><a href="#" className="hover:text-foreground">Press</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Cookie policy</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2024 Saffron & Sage. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
