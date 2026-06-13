"use client"

import * as React from "react"
import { MapPin, Star, Wifi, Waves, UtensilsCrossed, Dumbbell, Sparkles, Plane, Award, Phone, ArrowRight, Crown, Globe, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Region = "europe" | "asia" | "americas" | "middle-east"

const REGIONS: { id: Region; label: string }[] = [
  { id: "europe", label: "Europe" },
  { id: "asia", label: "Asia Pacific" },
  { id: "americas", label: "Americas" },
  { id: "middle-east", label: "Middle East" },
]

const PROPERTIES: Record<Region, { name: string; city: string; tagline: string; rooms: string; rating: string; tier: string }[]> = {
  europe: [
    { name: "The Lumière", city: "Paris, France", tagline: "Haussmann elegance steps from the Tuileries", rooms: "184 rooms & suites", rating: "4.9", tier: "Grand Heritage" },
    { name: "Casa Veroni", city: "Lake Como, Italy", tagline: "A lakeside villa wrapped in cypress gardens", rooms: "96 rooms & suites", rating: "4.8", tier: "Villa Collection" },
    { name: "Heath & Stone", city: "Edinburgh, Scotland", tagline: "Townhouse warmth beneath the castle rock", rooms: "72 rooms & suites", rating: "4.7", tier: "Townhouse" },
  ],
  asia: [
    { name: "Amaya Bay", city: "Phuket, Thailand", tagline: "Overwater pavilions on a private cove", rooms: "120 villas", rating: "4.9", tier: "Resort" },
    { name: "Kanazawa House", city: "Kyoto, Japan", tagline: "A ryokan reimagined around a moss garden", rooms: "54 rooms & suites", rating: "5.0", tier: "Ryokan" },
    { name: "The Marigold", city: "Singapore", tagline: "Skyline serenity above the Marina district", rooms: "210 rooms & suites", rating: "4.8", tier: "Urban Flagship" },
  ],
  americas: [
    { name: "Pinecrest Lodge", city: "Aspen, Colorado", tagline: "Alpine refuge with ski-in terraces", rooms: "88 rooms & suites", rating: "4.8", tier: "Mountain Lodge" },
    { name: "Solano del Mar", city: "Tulum, Mexico", tagline: "Barefoot luxury along the Riviera Maya", rooms: "64 casitas", rating: "4.9", tier: "Beach Casitas" },
    { name: "The Gramercy", city: "New York, USA", tagline: "A landmark address in the heart of Manhattan", rooms: "230 rooms & suites", rating: "4.7", tier: "Urban Flagship" },
  ],
  "middle-east": [
    { name: "Qasr Almira", city: "Dubai, UAE", tagline: "Desert palace with a private beach club", rooms: "260 rooms & suites", rating: "4.9", tier: "Palace" },
    { name: "Saffron Court", city: "Marrakech, Morocco", tagline: "A riad of courtyards and zellige fountains", rooms: "48 rooms & suites", rating: "4.8", tier: "Riad" },
    { name: "Rosewater Cove", city: "Muscat, Oman", tagline: "Cliffside suites above the Gulf of Oman", rooms: "110 rooms & suites", rating: "4.8", tier: "Resort" },
  ],
}

const EXPERIENCES = [
  { icon: UtensilsCrossed, title: "Signature Dining", copy: "Tasting menus from Michelin-starred chefs and locally sourced markets." },
  { icon: Waves, title: "Spa & Wellness", copy: "Thermal pools, hammams and bespoke treatment journeys." },
  { icon: Dumbbell, title: "Fitness & Movement", copy: "Sunrise yoga, private trainers and 24-hour wellness studios." },
  { icon: Plane, title: "Private Transfers", copy: "Chauffeured arrivals, helicopter pads and yacht charters." },
  { icon: Wifi, title: "Connected Comfort", copy: "Gigabit wi-fi and quiet workspaces in every residence." },
  { icon: Sparkles, title: "Curated Excursions", copy: "Private guides, after-hours museum access and tailored adventures." },
]

const AWARDS = [
  "Condé Nast Gold List",
  "Forbes Five-Star",
  "World's 50 Best Hotels",
  "Travel + Leisure A-List",
  "Michelin Keys",
]

const LEADERSHIP = [
  { name: "Eleanor Vance", role: "Chief Executive Officer", initials: "EV" },
  { name: "Mateo Ribeiro", role: "President, Hotel Operations", initials: "MR" },
  { name: "Sana Iqbal", role: "Chief Brand Officer", initials: "SI" },
  { name: "Henrik Sø", role: "Head of Design & Development", initials: "HS" },
]

const STATS = [
  { value: "62", label: "Properties worldwide" },
  { value: "24", label: "Countries" },
  { value: "1.4M", label: "Loyalty members" },
  { value: "98%", label: "Guest satisfaction" },
]

export default function HospitalityGroupPage() {
  const [region, setRegion] = React.useState<Region>("europe")
  const properties = PROPERTIES[region]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-lg font-semibold tracking-tight">Maison Aurélia</span>
          </div>
          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#properties" className="transition-colors hover:text-foreground">Properties</a>
            <a href="#experiences" className="transition-colors hover:text-foreground">Experiences</a>
            <a href="#loyalty" className="transition-colors hover:text-foreground">Loyalty</a>
            <a href="#leadership" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm" asChild>
              <a href="#book">Book a stay</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent" aria-hidden="true" />
          <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-24 lg:py-32">
            <Badge variant="outline" className="w-fit gap-1.5">
              <Globe className="h-3.5 w-3.5" aria-hidden="true" /> A collection of 62 extraordinary hotels
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Where every arrival becomes a memory worth keeping.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              From lakeside villas to desert palaces, Maison Aurélia gathers the world&apos;s most
              distinctive addresses under one standard of effortless hospitality.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <a href="#properties">Explore our properties <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#loyalty">Join the loyalty club</a>
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-semibold tracking-tight">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="properties" className="border-b">
          <div className="mx-auto w-full max-w-7xl px-6 py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">The Collection</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Featured destinations</h2>
                <p className="mt-2 max-w-xl text-muted-foreground">Choose a region to discover the hotels that define it.</p>
              </div>
            </div>

            <Tabs value={region} onValueChange={(v) => setRegion(v as Region)} className="mt-8">
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/50 p-1">
                {REGIONS.map((r) => (
                  <TabsTrigger key={r.id} value={r.id} className="data-[state=active]:bg-background">
                    {r.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <Card key={p.name} className="group overflow-hidden border bg-card transition-shadow hover:shadow-lg">
                  <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-accent">
                    <Crown className="h-10 w-10 text-primary/40" aria-hidden="true" />
                    <Badge variant="secondary" className="absolute left-4 top-4">{p.tier}</Badge>
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" /> {p.rating}
                    </div>
                  </div>
                  <CardContent className="space-y-3 p-6">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {p.city}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.tagline}</p>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{p.rooms}</span>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        View hotel <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="experiences" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Experiences</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Amenities crafted around you</h2>
              <p className="mt-2 text-muted-foreground">Every stay is built from the same promise of comfort, taste and care, expressed differently at each address.</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {EXPERIENCES.map((e) => {
                const Icon = e.icon
                return (
                  <Card key={e.title} className="border bg-card">
                    <CardContent className="space-y-3 p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold">{e.title}</h3>
                      <p className="text-sm text-muted-foreground">{e.copy}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="loyalty" className="border-b">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
            <div className="space-y-6">
              <Badge variant="outline" className="gap-1.5">
                <Award className="h-3.5 w-3.5" aria-hidden="true" /> Aurélia Circle
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A loyalty programme that travels with you.</h2>
              <p className="text-muted-foreground">Earn nights across every property, unlock suite upgrades, and enjoy a dedicated concierge from your very first stay.</p>
              <ul className="space-y-4">
                {[
                  { tier: "Silver", perk: "Late checkout & welcome amenity" },
                  { tier: "Gold", perk: "Room upgrades & resort credits" },
                  { tier: "Platinum", perk: "Guaranteed suites & private transfers" },
                ].map((t) => (
                  <li key={t.tier} className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{t.tier[0]}</span>
                    <div>
                      <div className="font-medium">{t.tier}</div>
                      <div className="text-sm text-muted-foreground">{t.perk}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Button size="lg">Become a member</Button>
            </div>
            <Card className="border bg-gradient-to-br from-primary/10 via-card to-accent">
              <CardContent className="space-y-6 p-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Aurélia Circle</span>
                  <Crown className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-semibold tracking-tight">Member since 2026</div>
                  <div className="text-muted-foreground">Platinum • 1842 nights</div>
                </div>
                <Separator />
                <figure className="space-y-3">
                  <Quote className="h-6 w-6 text-primary/50" aria-hidden="true" />
                  <blockquote className="text-lg leading-relaxed">
                    &ldquo;Wherever I land, the team already knows my name, my room and my coffee order. That&apos;s the real luxury.&rdquo;
                  </blockquote>
                  <figcaption className="text-sm text-muted-foreground">— Amara Daniels, Platinum member</figcaption>
                </figure>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-6 py-12">
            <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">Recognised by the world&apos;s most trusted critics</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {AWARDS.map((a) => (
                <div key={a} className="flex items-center gap-2 text-base font-medium text-foreground/80">
                  <Award className="h-4 w-4 text-primary" aria-hidden="true" /> {a}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="leadership" className="border-b">
          <div className="mx-auto w-full max-w-7xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Leadership</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">The people behind the welcome</h2>
              <p className="mt-2 text-muted-foreground">A team of hoteliers, designers and storytellers stewarding a tradition of hospitality across four continents.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {LEADERSHIP.map((person) => (
                <Card key={person.name} className="border bg-card text-center">
                  <CardContent className="flex flex-col items-center gap-4 p-8">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">{person.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{person.name}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{person.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Plan your next escape</h2>
              <p className="max-w-md text-primary-foreground/80">Tell us where you&apos;re dreaming of and our travel desk will craft an itinerary within 24 hours.</p>
              <div className="flex items-center gap-2 pt-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" aria-hidden="true" /> +1 (800) 555-0143 • Available 24/7
              </div>
            </div>
            <Card className="border-0 bg-background text-foreground">
              <CardContent className="space-y-4 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Jordan Avery" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dest">Destination</Label>
                    <Input id="dest" placeholder="Kyoto, Paris, Tulum…" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dates">Travel dates</Label>
                    <Input id="dates" placeholder="Flexible" />
                  </div>
                </div>
                <Button className="w-full" size="lg">Send enquiry</Button>
                <p className="text-center text-xs text-muted-foreground">No deposit required. A travel specialist will reply within one business day.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-semibold">Maison Aurélia</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <a href="#properties" className="hover:text-foreground">Properties</a>
            <a href="#loyalty" className="hover:text-foreground">Loyalty</a>
            <a href="#leadership" className="hover:text-foreground">Careers</a>
            <a href="#book" className="hover:text-foreground">Contact</a>
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 Maison Aurélia Hospitality Group</p>
        </div>
      </footer>
    </div>
  )
}
