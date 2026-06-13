"use client"

import * as React from "react"
import {
  ChefHat,
  Star,
  Clock,
  Users,
  Utensils,
  Flame,
  Leaf,
  Cookie,
  Soup,
  Check,
  Quote,
  PlayCircle,
  CalendarDays,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type CuisineKey = "italian" | "asian" | "baking" | "vegan"

const CUISINES: { key: CuisineKey; label: string; icon: React.ElementType }[] = [
  { key: "italian", label: "Italian", icon: Utensils },
  { key: "asian", label: "Asian", icon: Soup },
  { key: "baking", label: "Baking", icon: Cookie },
  { key: "vegan", label: "Vegan", icon: Leaf },
]

const CUISINE_DATA: Record<
  CuisineKey,
  {
    tagline: string
    blurb: string
    chefs: { name: string; title: string; rating: number; classes: number; initials: string }[]
    menu: { dish: string; level: string; minutes: number }[]
  }
> = {
  italian: {
    tagline: "Handmade pasta & wood-fired classics",
    blurb: "Roll fresh tagliatelle, simmer a Sunday ragù, and master the perfect Margherita.",
    chefs: [
      { name: "Lucia Moretti", title: "Pasta Maestra, Bologna", rating: 4.9, classes: 142, initials: "LM" },
      { name: "Paolo Riva", title: "Wood-Fired Specialist", rating: 4.8, classes: 98, initials: "PR" },
    ],
    menu: [
      { dish: "Hand-Rolled Tagliatelle al Ragù", level: "Beginner", minutes: 75 },
      { dish: "Margherita from Scratch", level: "Beginner", minutes: 60 },
      { dish: "Saffron Risotto Milanese", level: "Intermediate", minutes: 50 },
      { dish: "Tiramisù, the Classic Way", level: "Beginner", minutes: 40 },
    ],
  },
  asian: {
    tagline: "Dumplings, ramen & the art of the wok",
    blurb: "Pleat perfect dumplings, build a deep ramen broth, and stir-fry with restaurant heat.",
    chefs: [
      { name: "Mei Tanaka", title: "Ramen & Broth Expert", rating: 5.0, classes: 167, initials: "MT" },
      { name: "Arjun Sethi", title: "Wok & Curry Chef", rating: 4.7, classes: 121, initials: "AS" },
    ],
    menu: [
      { dish: "Pan-Fried Pork Dumplings", level: "Intermediate", minutes: 80 },
      { dish: "Tonkotsu-Style Ramen Broth", level: "Advanced", minutes: 120 },
      { dish: "Garlic Chili Stir-Fry", level: "Beginner", minutes: 35 },
      { dish: "Mango Sticky Rice", level: "Beginner", minutes: 45 },
    ],
  },
  baking: {
    tagline: "Bread, pastry & showstopping bakes",
    blurb: "Knead a glossy sourdough, laminate buttery croissants, and finish a flawless layer cake.",
    chefs: [
      { name: "Hannah Beck", title: "Sourdough & Bread", rating: 4.9, classes: 134, initials: "HB" },
      { name: "Théo Laurent", title: "Pâtissier, Lyon", rating: 4.8, classes: 110, initials: "TL" },
    ],
    menu: [
      { dish: "Crusty Country Sourdough", level: "Intermediate", minutes: 90 },
      { dish: "Laminated Croissants", level: "Advanced", minutes: 150 },
      { dish: "Vanilla Bean Layer Cake", level: "Intermediate", minutes: 95 },
      { dish: "Chewy Brown Butter Cookies", level: "Beginner", minutes: 40 },
    ],
  },
  vegan: {
    tagline: "Plant-forward plates full of flavour",
    blurb: "Cook creamy cashew sauces, hearty grain bowls, and desserts no one will believe are vegan.",
    chefs: [
      { name: "Sofia Andersson", title: "Plant-Based Pioneer", rating: 4.9, classes: 128, initials: "SA" },
      { name: "Marcus Bell", title: "Whole-Food Chef", rating: 4.8, classes: 87, initials: "MB" },
    ],
    menu: [
      { dish: "Creamy Cashew Alfredo", level: "Beginner", minutes: 45 },
      { dish: "Smoky Jackfruit Tacos", level: "Beginner", minutes: 50 },
      { dish: "Harvest Grain Power Bowl", level: "Beginner", minutes: 40 },
      { dish: "No-Bake Chocolate Tart", level: "Intermediate", minutes: 65 },
    ],
  },
}

const STEPS = [
  { icon: CalendarDays, title: "Pick a class", body: "Browse live and on-demand sessions across four cuisines and every skill level." },
  { icon: Utensils, title: "Get your kit", body: "We send a prepped ingredient list and printable recipe card before you cook." },
  { icon: Flame, title: "Cook along live", body: "Join your chef on video, ask questions, and plate up in real time." },
  { icon: ChefHat, title: "Level up", body: "Earn badges, unlock advanced menus, and build a repertoire you'll keep forever." },
]

const PACKAGES = [
  {
    name: "Taster",
    price: "$19",
    cadence: "/ class",
    blurb: "One live session to dip your toes in.",
    features: ["1 live cook-along", "Printable recipe card", "7-day replay access"],
    highlighted: false,
  },
  {
    name: "Home Chef",
    price: "$39",
    cadence: "/ month",
    blurb: "Our most popular plan for regular cooks.",
    features: ["4 live classes / month", "Full on-demand library", "Ingredient kit discounts", "Private community"],
    highlighted: true,
  },
  {
    name: "Masterclass",
    price: "$89",
    cadence: "/ month",
    blurb: "Go pro with mentorship and feedback.",
    features: ["Unlimited live classes", "1:1 chef feedback", "Advanced technique tracks", "Free ingredient kits"],
    highlighted: false,
  },
]

const TESTIMONIALS = [
  { quote: "I made fresh pasta for the first time and my family was floored. The live format makes all the difference.", name: "Dana Whitfield", role: "Home Chef member" },
  { quote: "The baking track took my sourdough from sad to bakery-worthy in three weeks.", name: "Owen Park", role: "Masterclass member" },
  { quote: "Vegan cooking finally clicked. Zero judgement, endless flavour, and chefs who actually answer questions.", name: "Priya Nadar", role: "Home Chef member" },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-primary">
      <Star className="size-4 fill-current" aria-hidden="true" />
      <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
    </span>
  )
}

export default function CookingClassLanding() {
  const [cuisine, setCuisine] = React.useState<CuisineKey>("italian")
  const active = CUISINE_DATA[cuisine]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ChefHat className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg">Saltora</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#classes" className="transition-colors hover:text-foreground">Classes</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#stories" className="transition-colors hover:text-foreground">Stories</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm">Book a class</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Flame className="size-3.5" aria-hidden="true" /> Live cook-alongs every day
              </Badge>
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Cook like a chef, right from your own kitchen.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Join award-winning chefs for live, hands-on classes. Pick a cuisine, grab your apron, and plate something unforgettable tonight.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Book your first class <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <PlayCircle className="size-4" aria-hidden="true" /> Watch a taster
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div>
                  <p className="text-2xl font-semibold text-foreground">12k+</p>
                  <p>Home cooks</p>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div>
                  <p className="text-2xl font-semibold text-foreground">40+</p>
                  <p>Expert chefs</p>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div>
                  <p className="flex items-center gap-1 text-2xl font-semibold text-foreground">
                    4.9 <Star className="size-5 fill-primary text-primary" aria-hidden="true" />
                  </p>
                  <p>Avg. rating</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-8 -top-8 hidden size-40 rounded-full bg-primary/10 blur-2xl lg:block" aria-hidden="true" />
              <Card className="relative overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/15 via-accent to-muted">
                    <Utensils className="size-24 text-primary/40" aria-hidden="true" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="text-sm font-medium">Tonight's live class</p>
                      <p className="text-sm text-muted-foreground">Hand-rolled pasta with Lucia</p>
                    </div>
                    <Badge className="gap-1">
                      <Clock className="size-3.5" aria-hidden="true" /> 7:00 PM
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="classes" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">Find your cuisine</h2>
              <p className="mt-3 text-muted-foreground">
                Switch cuisines to meet the chefs and preview the dishes you'll master.
              </p>
            </div>

            <Tabs value={cuisine} onValueChange={(v) => setCuisine(v as CuisineKey)} className="mt-10">
              <TabsList className="mx-auto flex h-auto w-full max-w-xl flex-wrap justify-center gap-1 p-1">
                {CUISINES.map((c) => {
                  const Icon = c.icon
                  return (
                    <TabsTrigger key={c.key} value={c.key} className="flex-1 gap-2">
                      <Icon className="size-4" aria-hidden="true" /> {c.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>

            <div className="mt-8 text-center">
              <p className="text-xl font-medium">{active.tagline}</p>
              <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{active.blurb}</p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Featured chefs
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {active.chefs.map((chef) => (
                    <Card key={chef.name}>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-12">
                            <AvatarFallback className="bg-primary/10 text-primary">{chef.initials}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate font-medium">{chef.name}</p>
                            <p className="truncate text-sm text-muted-foreground">{chef.title}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <Stars rating={chef.rating} />
                          <span className="text-muted-foreground">{chef.classes} classes</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Sample menu
                </h3>
                <Card>
                  <CardContent className="divide-y p-0">
                    {active.menu.map((item) => (
                      <div key={item.dish} className="flex items-center justify-between gap-4 px-5 py-4">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{item.dish}</p>
                          <p className="text-sm text-muted-foreground">{item.level}</p>
                        </div>
                        <Badge variant="outline" className="shrink-0 gap-1">
                          <Clock className="size-3.5" aria-hidden="true" /> {item.minutes}m
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
              <p className="mt-3 text-muted-foreground">From sign-up to sizzling pan in four simple steps.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <Card key={step.title} className="relative">
                    <CardContent className="p-6">
                      <span className="absolute right-5 top-5 text-4xl font-bold text-muted-foreground/15">
                        {i + 1}
                      </span>
                      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-medium">{step.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{step.body}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">Class packages</h2>
              <p className="mt-3 text-muted-foreground">Cancel anytime. Every plan includes printable recipe cards.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PACKAGES.map((pkg) => (
                <Card
                  key={pkg.name}
                  className={cn("relative flex flex-col", pkg.highlighted && "border-primary shadow-lg")}
                >
                  {pkg.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
                  )}
                  <CardContent className="flex flex-1 flex-col p-6">
                    <p className="font-medium">{pkg.name}</p>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground">{pkg.cadence}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{pkg.blurb}</p>
                    <Separator className="my-5" />
                    <ul className="flex-1 space-y-3 text-sm">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 w-full" variant={pkg.highlighted ? "default" : "outline"}>
                      Choose {pkg.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">Loved by home cooks</h2>
              <p className="mt-3 text-muted-foreground">Real plates, real progress, real reviews.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name}>
                  <CardContent className="flex h-full flex-col p-6">
                    <Quote className="size-7 text-primary/30" aria-hidden="true" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed">{t.quote}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <Card className="overflow-hidden border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-6 p-10 text-center md:p-16">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <ChefHat className="size-7" aria-hidden="true" />
                </span>
                <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight">
                  Your apron is waiting. Book your first class today.
                </h2>
                <p className="max-w-md text-muted-foreground">
                  Start with a $19 taster, no subscription required. Cook something you're proud of by tonight.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button size="lg" className="gap-2">
                    Get started <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Users className="size-4" aria-hidden="true" /> Gift a class
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <ChefHat className="size-4 text-primary" aria-hidden="true" /> Saltora
          </div>
          <p>2026 Saltora Cooking School. Cook with joy.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
