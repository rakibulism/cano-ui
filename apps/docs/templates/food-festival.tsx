"use client"
import * as React from "react"
import {
  UtensilsCrossed,
  MapPin,
  CalendarDays,
  Clock,
  Ticket,
  ChefHat,
  Store,
  Wine,
  Flame,
  Star,
  ArrowRight,
  Plus,
  Minus,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"
import { Separator } from "@/components/ui/separator"

const CUISINES = ["All", "Italian", "Asian", "BBQ", "Sweets", "Drinks"] as const
type Cuisine = (typeof CUISINES)[number]

const VENDORS: { name: string; chef: string; cuisine: Exclude<Cuisine, "All">; stall: string; tag: string }[] = [
  { name: "Forno Vivo", chef: "Chef Lucia Romano", cuisine: "Italian", stall: "Stall 04", tag: "Wood-fired pizza" },
  { name: "Saffron & Smoke", chef: "Chef Arjun Mehta", cuisine: "Asian", stall: "Stall 11", tag: "Street curries" },
  { name: "Low & Slow", chef: "Chef Marcus Webb", cuisine: "BBQ", stall: "Stall 18", tag: "16-hr brisket" },
  { name: "Sugar Atelier", chef: "Chef Noor Haddad", cuisine: "Sweets", stall: "Stall 22", tag: "Pastry lab" },
  { name: "The Pour House", chef: "Sommelier Eli Voss", cuisine: "Drinks", stall: "Bar A", tag: "Natural wines" },
  { name: "Pasta Theatre", chef: "Chef Gio Bianchi", cuisine: "Italian", stall: "Stall 07", tag: "Hand-rolled" },
  { name: "Wok Republic", chef: "Chef Mei Lin", cuisine: "Asian", stall: "Stall 13", tag: "Live wok station" },
  { name: "Ember Pit", chef: "Chef Dana Cole", cuisine: "BBQ", stall: "Stall 19", tag: "Whole-hog roast" },
  { name: "Cocoa Lab", chef: "Chef Theo Park", cuisine: "Sweets", stall: "Stall 25", tag: "Bean-to-bar" },
]

const STATS = [
  { icon: ChefHat, value: "48", label: "Guest chefs" },
  { icon: Store, value: "90+", label: "Food stalls" },
  { icon: Wine, value: "120", label: "Tastings" },
  { icon: Flame, value: "12", label: "Live demos" },
]

const SCHEDULE = [
  { time: "11:00", title: "Knife Skills with Chef Lucia", stage: "Demo Kitchen", tag: "Italian" },
  { time: "13:30", title: "Fire & Smoke Masterclass", stage: "Pit Arena", tag: "BBQ" },
  { time: "15:00", title: "Natural Wine Tasting Flight", stage: "Cellar Bar", tag: "Drinks" },
  { time: "16:45", title: "Dumpling Folding Workshop", stage: "Demo Kitchen", tag: "Asian" },
  { time: "18:30", title: "Dessert Plating Showdown", stage: "Main Stage", tag: "Sweets" },
]

const TIERS = [
  {
    name: "Day Pass",
    price: "$39",
    blurb: "General entry for a full day of tasting.",
    perks: ["All stalls access", "Live demo seating", "Festival tote bag"],
    featured: false,
  },
  {
    name: "Foodie Weekend",
    price: "$89",
    blurb: "Two days plus reserved demo seats.",
    perks: ["Two-day entry", "Reserved demo rows", "6 tasting tokens", "Recipe booklet"],
    featured: true,
  },
  {
    name: "Chef's Table",
    price: "$179",
    blurb: "VIP lounge and a private tasting menu.",
    perks: ["Everything in Weekend", "VIP lounge access", "Private chef tasting", "Meet & greet"],
    featured: false,
  },
]

const SPONSORS = ["Harvest Co.", "Saltworks", "Verde Olive Oil", "Copper Kettle", "Stonefire Mills", "Bloom Bevco"]

const FAQS = [
  { q: "Are tickets refundable?", a: "Tickets are transferable up to 48 hours before the gates open. Refunds are available within 14 days of purchase." },
  { q: "Is the festival kid-friendly?", a: "Absolutely. Under-12s enter free with a ticketed adult, and there is a dedicated junior cooking corner." },
  { q: "Can you cater to allergies?", a: "Every stall displays full allergen labelling, and our info tent maintains a live map of allergen-friendly options." },
  { q: "Is there parking on site?", a: "Limited paid parking is available. We strongly recommend the free shuttle running from Central Station every 15 minutes." },
]

export default function FoodFestivalPage() {
  const [active, setActive] = React.useState<Cuisine>("All")
  const [qty, setQty] = React.useState<Record<string, number>>({})

  const vendors = active === "All" ? VENDORS : VENDORS.filter((v) => v.cuisine === active)

  function adjust(name: string, delta: number) {
    setQty((prev) => {
      const next = Math.max(0, (prev[name] ?? 0) + delta)
      return { ...prev, [name]: next }
    })
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <UtensilsCrossed className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Feast & Field</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#vendors" className="transition-colors hover:text-foreground">Vendors</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#tickets" className="transition-colors hover:text-foreground">Tickets</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <Button size="sm" className="gap-1.5">
            <Ticket className="h-4 w-4" />
            Get tickets
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Flame className="h-3.5 w-3.5" />
                Summer edition 2026
              </Badge>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                A weekend feast of fire, flavour & friends
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                Ninety stalls, forty-eight guest chefs and a city park turned open-air kitchen. Come hungry, leave inspired.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5 text-sm font-medium">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  August 15-16
                </span>
                <Separator orientation="vertical" className="hidden h-5 sm:block" />
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Riverside Park, Portland
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="gap-1.5">
                  <Ticket className="h-4 w-4" />
                  Grab your pass
                </Button>
                <Button size="lg" variant="outline" className="gap-1.5">
                  Explore vendors
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl border bg-primary/10" aria-hidden="true" />
              <Card className="absolute -bottom-6 -left-6 w-52 shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">4.9 / 5</p>
                    <p className="text-xs text-muted-foreground">12,000 last year</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <s.icon className="mb-3 h-7 w-7 opacity-90" />
                <span className="text-3xl font-bold tracking-tight">{s.value}</span>
                <span className="mt-1 text-sm opacity-80">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Vendors with cuisine filter */}
        <section id="vendors" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Meet the kitchens</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                Filter by cuisine to find your crew. Every stall is run by a chef worth queuing for.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CUISINES.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={active === c ? "default" : "outline"}
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((v) => (
              <Card key={v.name} className="group transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex aspect-[3/2] items-center justify-center rounded-lg bg-muted">
                    <UtensilsCrossed className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{v.name}</CardTitle>
                    <Badge variant="secondary">{v.cuisine}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4" />
                    {v.chef}
                  </p>
                  <p className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    {v.stall} · {v.tag}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          {vendors.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">No stalls in this category yet.</p>
          )}
        </section>

        {/* Schedule */}
        <section id="schedule" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-bold tracking-tight">Demo schedule</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Live cooking, tastings and showdowns across four stages all weekend.
            </p>
            <div className="mt-10 divide-y rounded-xl border bg-card">
              {SCHEDULE.map((item) => (
                <div key={item.title} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6">
                  <span className="flex w-20 items-center gap-2 text-sm font-semibold text-primary">
                    <Clock className="h-4 w-4" />
                    {item.time}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.stage}</p>
                  </div>
                  <Badge variant="outline">{item.tag}</Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tickets */}
        <section id="tickets" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Pick your pass</h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Adjust the quantity for your group and check out in one go.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <Card
                key={tier.name}
                className={cn(
                  "flex flex-col",
                  tier.featured && "border-primary shadow-md ring-1 ring-primary",
                )}
              >
                <CardHeader>
                  {tier.featured && <Badge className="mb-2 w-fit">Most popular</Badge>}
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">/ person</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.blurb}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2.5 text-sm">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => adjust(tier.name, -1)}
                      aria-label={"Remove one " + tier.name}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums">
                      {qty[tier.name] ?? 0}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => adjust(tier.name, 1)}
                      aria-label={"Add one " + tier.name}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant={tier.featured ? "default" : "secondary"} className="gap-1.5">
                    <Ticket className="h-4 w-4" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Sponsors */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-14">
            <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Tasted & trusted by
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {SPONSORS.map((s) => (
                <span key={s} className="text-lg font-semibold text-muted-foreground/80">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">Good to know</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
            Everything you need before you join the table.
          </p>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={"item-" + i}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              The tables fill fast. Save your seat.
            </h2>
            <p className="max-w-md opacity-80">
              Last year sold out three weeks early. Lock in your weekend of flavour today.
            </p>
            <Button size="lg" variant="secondary" className="gap-1.5">
              <Ticket className="h-4 w-4" />
              Get your tickets
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <UtensilsCrossed className="h-4 w-4" />
            </span>
            <span className="font-semibold">Feast & Field</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#vendors" className="hover:text-foreground">Vendors</a>
            <a href="#schedule" className="hover:text-foreground">Schedule</a>
            <a href="#tickets" className="hover:text-foreground">Tickets</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 Feast & Field Festival</p>
        </div>
      </footer>
    </div>
  )
}
