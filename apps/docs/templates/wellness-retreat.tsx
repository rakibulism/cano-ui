"use client"
import * as React from "react"
import {
  Leaf,
  MapPin,
  CalendarDays,
  Sunrise,
  Waves,
  Salad,
  HeartPulse,
  Moon,
  Mountain,
  Wind,
  Star,
  Check,
  ArrowRight,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const RETREAT = {
  name: "Still Waters Retreat",
  location: "Ubud, Bali",
  dates: "October 12 – 18, 2026",
  nights: "6 nights",
}

const INCLUDED = [
  { icon: Sunrise, title: "Daily Sunrise Yoga", desc: "Greet the day with guided vinyasa overlooking the rice terraces." },
  { icon: Salad, title: "Plant-Based Cuisine", desc: "Three nourishing chef-prepared meals crafted from local produce." },
  { icon: HeartPulse, title: "Breathwork & Meditation", desc: "Twice-daily sessions to reset your nervous system." },
  { icon: Waves, title: "Spa & Hydrotherapy", desc: "Unlimited access to natural spring pools and a steam pavilion." },
  { icon: Mountain, title: "Guided Nature Walks", desc: "Mindful treks through jungle paths and hidden waterfalls." },
  { icon: Moon, title: "Sound Healing Nights", desc: "Wind down beneath the stars with crystal bowl ceremonies." },
]

const SCHEDULE: Record<string, { time: string; title: string; tag: string }[]> = {
  "Day 1": [
    { time: "16:00", title: "Arrival & Welcome Tea", tag: "Gathering" },
    { time: "18:00", title: "Intention-Setting Circle", tag: "Ceremony" },
    { time: "19:30", title: "Communal Dinner", tag: "Nourish" },
  ],
  "Day 2": [
    { time: "06:30", title: "Sunrise Vinyasa Flow", tag: "Movement" },
    { time: "09:00", title: "Mindful Breakfast", tag: "Nourish" },
    { time: "11:00", title: "Breathwork Workshop", tag: "Breath" },
    { time: "17:00", title: "Restorative Yin", tag: "Movement" },
  ],
  "Day 3": [
    { time: "06:30", title: "Silent Walking Meditation", tag: "Stillness" },
    { time: "10:00", title: "Waterfall Trek", tag: "Adventure" },
    { time: "15:00", title: "Ayurvedic Spa Ritual", tag: "Spa" },
    { time: "20:00", title: "Crystal Bowl Sound Bath", tag: "Healing" },
  ],
  "Day 4": [
    { time: "06:30", title: "Sunrise Vinyasa Flow", tag: "Movement" },
    { time: "11:00", title: "Journaling & Reflection", tag: "Stillness" },
    { time: "16:00", title: "Cacao Heart-Opening", tag: "Ceremony" },
  ],
  "Day 5": [
    { time: "06:30", title: "Power Flow & Inversions", tag: "Movement" },
    { time: "13:00", title: "Local Market & Cooking Class", tag: "Adventure" },
    { time: "19:00", title: "Closing Fire Circle", tag: "Ceremony" },
  ],
}

const INSTRUCTORS = [
  { name: "Anaya Rao", role: "Lead Yoga Guide", img: "https://i.pravatar.cc/160?img=47", bio: "200hr E-RYT with 12 years guiding breath-led flows across Asia." },
  { name: "Mateo Cruz", role: "Breathwork Facilitator", img: "https://i.pravatar.cc/160?img=12", bio: "Certified Pranayama coach and former competitive freediver." },
  { name: "Lina Bergström", role: "Sound Healer", img: "https://i.pravatar.cc/160?img=32", bio: "Crystal bowl practitioner trained in Nordic and Himalayan traditions." },
]

const TIERS = [
  {
    name: "Garden Casita",
    price: "$1,890",
    note: "Shared twin room",
    features: ["Private garden patio", "All meals & sessions included", "Daily housekeeping"],
    featured: false,
  },
  {
    name: "Riverside Villa",
    price: "$2,640",
    note: "Private suite",
    features: ["Plunge pool & river view", "All meals & sessions included", "One private spa ritual", "Airport transfer"],
    featured: true,
  },
  {
    name: "Canopy Pavilion",
    price: "$3,480",
    note: "Premium villa",
    features: ["Full open-air pavilion", "All meals & sessions included", "Daily spa & massage", "Private chef evening", "Airport transfer"],
    featured: false,
  },
]

const TESTIMONIALS = [
  { name: "Priya M.", text: "I arrived depleted and left feeling completely re-rooted. The sunrise flows alone were worth the trip.", img: "https://i.pravatar.cc/80?img=45" },
  { name: "James T.", text: "The most intentional, beautifully run retreat I've attended. Every detail was considered with care.", img: "https://i.pravatar.cc/80?img=15" },
  { name: "Sofia L.", text: "Six days that genuinely changed how I breathe and move through my days back home.", img: "https://i.pravatar.cc/80?img=20" },
]

const FAQ = [
  { q: "Is this suitable for beginners?", a: "Absolutely. Every session offers modifications, and our guides tailor flows to all levels. No prior experience is required." },
  { q: "What is the cancellation policy?", a: "Full refund up to 60 days before arrival, 50% up to 30 days, and a transferable credit thereafter." },
  { q: "Are flights included?", a: "Flights are not included. Riverside and Canopy tiers include complimentary round-trip airport transfers from Denpasar." },
  { q: "Can dietary needs be accommodated?", a: "Yes. Our kitchen handles vegan, gluten-free, and most allergy requirements with advance notice." },
]

const DAYS = Object.keys(SCHEDULE)

export default function WellnessRetreat() {
  const [activeDay, setActiveDay] = React.useState(DAYS[1])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Leaf className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Still Waters</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#included" className="transition-colors hover:text-foreground">Included</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#guides" className="transition-colors hover:text-foreground">Guides</a>
            <a href="#stay" className="transition-colors hover:text-foreground">Stay</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#book">Book retreat</a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div className="space-y-7">
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                <Wind className="mr-1.5 size-3.5" /> Limited to 16 guests
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Come home to your{" "}
                <span className="text-primary">stillness.</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                A six-day immersion in breath, movement, and rest among the rice terraces of Bali. Slow mornings, nourishing food, and space to simply be.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4 text-primary" /> {RETREAT.location}
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-4 text-primary" /> {RETREAT.dates}
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Moon className="size-4 text-primary" /> {RETREAT.nights}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button size="lg" asChild>
                  <a href="#book">Reserve your place <ArrowRight className="ml-1 size-4" /></a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#schedule">View daily schedule</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border bg-muted shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <Card className="absolute -bottom-6 -left-6 hidden w-56 shadow-lg sm:block">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="size-5 fill-current" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">4.9 / 5 rating</p>
                    <p className="text-xs text-muted-foreground">From 240+ past guests</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section id="included" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Everything included</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A week designed for full surrender</h2>
            <p className="mt-3 text-muted-foreground">No add-ons, no surprises. Your stay covers every session, meal, and moment of care.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item) => (
              <Card key={item.title} className="border-muted transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Schedule with day tabs */}
        <section id="schedule" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-10 max-w-xl">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Daily rhythm</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A gentle flow, day by day</h2>
              <p className="mt-3 text-muted-foreground">Each day unfolds with intention. Tap through to see how the week moves.</p>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                    activeDay === day
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {SCHEDULE[activeDay].map((slot, i) => (
                <Card key={i} className="border-muted">
                  <CardContent className="flex flex-wrap items-center gap-4 p-5">
                    <span className="w-16 shrink-0 font-mono text-sm font-semibold tabular-nums text-primary">
                      {slot.time}
                    </span>
                    <Separator orientation="vertical" className="hidden h-8 sm:block" />
                    <span className="flex-1 text-base font-medium">{slot.title}</span>
                    <Badge variant="outline" className="rounded-full">{slot.tag}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Instructors */}
        <section id="guides" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Your guides</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Held by experienced hands</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {INSTRUCTORS.map((person) => (
              <Card key={person.name} className="overflow-hidden text-center">
                <CardContent className="flex flex-col items-center p-8">
                  <Avatar className="size-24 border-2 border-primary/20">
                    <AvatarImage src={person.img} alt="" />
                    <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-5 text-lg font-semibold">{person.name}</h3>
                  <p className="text-sm font-medium text-primary">{person.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{person.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Accommodation / pricing */}
        <section id="stay" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-xl">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Your stay</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Choose your sanctuary</h2>
              <p className="mt-3 text-muted-foreground">All tiers include the full program. Prices are per person for the entire retreat.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {TIERS.map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    "relative flex flex-col",
                    tier.featured && "border-primary shadow-md ring-1 ring-primary"
                  )}
                >
                  {tier.featured && (
                    <Badge className="absolute -top-3 left-6 rounded-full">Most loved</Badge>
                  )}
                  <CardContent className="flex flex-1 flex-col p-7">
                    <h3 className="text-xl font-semibold">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.note}</p>
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="text-3xl font-semibold tracking-tight">{tier.price}</span>
                      <span className="text-sm text-muted-foreground">/ person</span>
                    </div>
                    <ul className="mt-6 flex-1 space-y-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-7 w-full"
                      variant={tier.featured ? "default" : "outline"}
                      asChild
                    >
                      <a href="#book">Reserve {tier.name}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">In their words</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Stories from the mat</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="bg-muted/30">
                <CardContent className="flex h-full flex-col p-7">
                  <Quote className="size-7 text-primary/40" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">{t.text}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage src={t.img} alt="" />
                      <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <div className="flex text-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Questions</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Before you book</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final book CTA */}
        <section id="book" className="mx-auto w-full max-w-6xl px-6 py-20">
          <Card className="overflow-hidden border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-16 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Leaf className="size-6" />
              </span>
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Only a handful of spaces remain for October
              </h2>
              <p className="max-w-md text-muted-foreground">
                Secure your place at {RETREAT.name} with a refundable deposit. We will hold your sanctuary for 7 days.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg">Book your retreat <ArrowRight className="ml-1 size-4" /></Button>
                <Button size="lg" variant="outline">Talk to our team</Button>
              </div>
              <p className="text-xs text-muted-foreground">{RETREAT.location} · {RETREAT.dates}</p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="size-4 text-primary" />
            <span className="font-semibold text-foreground">Still Waters Retreat</span>
          </div>
          <p>© 2026 Still Waters. Crafted with intention in Ubud, Bali.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
