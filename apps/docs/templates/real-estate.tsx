"use client"

import * as React from "react"
import {
  Home,
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Heart,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Building2,
  Key,
  TrendingUp,
  Menu,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = ["Buy", "Rent", "Sell", "Neighborhoods", "Agents"]

const PROPERTY_TYPES = ["Any type", "House", "Apartment", "Condo", "Townhouse", "Land"] as const

const LISTING_FILTERS = ["All", "For Sale", "For Rent", "New"] as const

type Listing = {
  id: string
  title: string
  price: string
  location: string
  beds: number
  baths: number
  sqft: string
  status: "For Sale" | "For Rent" | "New"
  featured?: boolean
}

const LISTINGS: Listing[] = [
  {
    id: "l1",
    title: "Maple Ridge Modern Estate",
    price: "$1,250,000",
    location: "Highland Park, Austin",
    beds: 4,
    baths: 3,
    sqft: "3,240",
    status: "For Sale",
    featured: true,
  },
  {
    id: "l2",
    title: "Cedar Loft Downtown Condo",
    price: "$4,200 / mo",
    location: "Warehouse District, Austin",
    beds: 2,
    baths: 2,
    sqft: "1,180",
    status: "For Rent",
  },
  {
    id: "l3",
    title: "Willow Creek Family Home",
    price: "$685,000",
    location: "Mueller, Austin",
    beds: 3,
    baths: 2,
    sqft: "2,010",
    status: "New",
  },
  {
    id: "l4",
    title: "Sunset Hills Townhouse",
    price: "$540,000",
    location: "Travis Heights, Austin",
    beds: 3,
    baths: 3,
    sqft: "1,860",
    status: "For Sale",
  },
  {
    id: "l5",
    title: "Lakeview Garden Apartment",
    price: "$2,950 / mo",
    location: "Zilker, Austin",
    beds: 1,
    baths: 1,
    sqft: "820",
    status: "For Rent",
  },
  {
    id: "l6",
    title: "Oak Terrace New Build",
    price: "$920,000",
    location: "Tarrytown, Austin",
    beds: 4,
    baths: 4,
    sqft: "2,760",
    status: "New",
  },
]

const NEIGHBORHOODS = [
  { name: "Highland Park", count: 48, blurb: "Tree-lined streets & top schools" },
  { name: "Downtown", count: 73, blurb: "High-rise living, walk everywhere" },
  { name: "Zilker", count: 31, blurb: "Park-side green & weekend trails" },
  { name: "Mueller", count: 26, blurb: "Master-planned & modern" },
]

const STATS = [
  { icon: Home, value: "1,240+", label: "Active listings" },
  { icon: Key, value: "8,900", label: "Homes sold" },
  { icon: TrendingUp, value: "$1.4B", label: "In sales volume" },
  { icon: Star, value: "4.9/5", label: "Client rating" },
]

function statusVariant(status: Listing["status"]) {
  if (status === "New") return "default" as const
  if (status === "For Rent") return "secondary" as const
  return "outline" as const
}

export default function RealEstateTemplate() {
  const [activeType, setActiveType] = React.useState<(typeof PROPERTY_TYPES)[number]>(
    "Any type",
  )
  const [query, setQuery] = React.useState("")
  const [activeFilter, setActiveFilter] =
    React.useState<(typeof LISTING_FILTERS)[number]>("All")
  const [saved, setSaved] = React.useState<Record<string, boolean>>({})

  const visibleListings = LISTINGS.filter((l) => {
    if (activeFilter === "All") return true
    return l.status === activeFilter
  })

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">Northvale</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">List a property</Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-24 lg:px-8">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-5 w-fit gap-1">
                <MapPin className="h-3 w-3" /> Now serving Greater Austin
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Find the place you&apos;ll call{" "}
                <span className="text-primary">home</span>.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Browse curated listings, explore neighborhoods, and connect with
                local agents who know the market street by street.
              </p>

              {/* Search bar */}
              <div className="mt-8 rounded-2xl border bg-card p-4 shadow-sm">
                <div className="flex flex-wrap gap-1.5">
                  {PROPERTY_TYPES.slice(0, 4).map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                        activeType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent",
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="City, neighborhood, or ZIP"
                      className="pl-9"
                      aria-label="Search location"
                    />
                  </div>
                  <Button className="gap-2 sm:w-auto">
                    <Search className="h-4 w-4" /> Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="relative">
              <div
                className="aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-muted to-accent"
                role="img"
                aria-label="Featured modern home exterior"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <Home className="h-20 w-20 text-primary/40" />
                </div>
              </div>
              <Card className="absolute -bottom-6 left-6 w-56 shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">+12% value</p>
                    <p className="text-xs text-muted-foreground">
                      Avg. growth this year
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center px-4 py-2 text-center">
                <stat.icon className="mb-2 h-6 w-6 text-primary" />
                <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured listings */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured listings</h2>
              <p className="mt-2 text-muted-foreground">
                Hand-picked homes across the city&apos;s most-loved areas.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {LISTING_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    activeFilter === filter
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleListings.map((listing) => (
              <Card
                key={listing.id}
                className="group overflow-hidden p-0 transition-shadow hover:shadow-lg"
              >
                {/* Image placeholder */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-muted to-accent"
                  role="img"
                  aria-label={`Photo of ${listing.title}`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Home className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                  <Badge
                    variant={statusVariant(listing.status)}
                    className="absolute left-3 top-3"
                  >
                    {listing.status}
                  </Badge>
                  <button
                    onClick={() =>
                      setSaved((s) => ({ ...s, [listing.id]: !s[listing.id] }))
                    }
                    aria-label={
                      saved[listing.id]
                        ? `Remove ${listing.title} from saved`
                        : `Save ${listing.title}`
                    }
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-muted-foreground backdrop-blur transition-colors hover:text-primary"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        saved[listing.id] && "fill-primary text-primary",
                      )}
                    />
                  </button>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-xl font-bold tracking-tight">{listing.price}</p>
                  </div>
                  <h3 className="mt-1 truncate font-semibold">{listing.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {listing.location}
                  </p>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="h-4 w-4" /> {listing.beds} bd
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="h-4 w-4" /> {listing.baths} ba
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize className="h-4 w-4" /> {listing.sqft} sqft
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="lg" className="gap-2">
              View all listings <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Explore neighborhoods</h2>
              <p className="mt-2 text-muted-foreground">
                Every block has a story. Find the one that fits your life.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {NEIGHBORHOODS.map((n) => (
                <a
                  key={n.name}
                  href="#"
                  className="group relative overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md"
                >
                  <div
                    className="aspect-[4/3] w-full bg-gradient-to-br from-primary/10 via-muted to-accent"
                    role="img"
                    aria-label={`${n.name} neighborhood`}
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <MapPin className="h-8 w-8 text-primary/40" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{n.name}</h3>
                      <Badge variant="outline">{n.count}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{n.blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View homes
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Agent CTA */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
          <Card className="overflow-hidden border-primary/20 bg-primary/5">
            <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:p-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Work with an agent who has your back
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Our local experts handle showings, negotiations, and paperwork so
                  you can focus on finding the right home. Get matched in minutes.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="flex -space-x-3">
                    {["AR", "JM", "PL", "TS"].map((a) => (
                      <Avatar key={a} className="h-10 w-10 border-2 border-background">
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {a}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="flex items-center gap-1 font-semibold">
                      <Star className="h-4 w-4 fill-primary text-primary" /> 4.9 rating
                    </p>
                    <p className="text-muted-foreground">from 2,300+ clients</p>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <Card className="bg-card">
                <CardContent className="space-y-4 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" placeholder="Jordan Rivera" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="(512) 555-0142" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <Button className="w-full gap-2">
                    Get matched with an agent <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    No commitment. We&apos;ll never share your details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building2 className="h-5 w-5" />
                </span>
                <span className="text-lg tracking-tight">Northvale</span>
              </a>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Helping families find their place in Greater Austin since 2009.
              </p>
              <div className="mt-5 flex gap-2">
                <Button variant="outline" size="icon" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Explore</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {["Buy a home", "Rent a home", "Sell with us", "New listings"].map(
                  (i) => (
                    <li key={i}>
                      <a href="#" className="transition-colors hover:text-foreground">
                        {i}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {["About us", "Our agents", "Careers", "Press"].map((i) => (
                  <li key={i}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Get in touch</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> (512) 555-0100
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" /> hello@northvale.com
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> 410 Congress
                  Ave, Austin, TX
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <p>&copy; 2009–2026 Northvale Realty. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Fair Housing
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
