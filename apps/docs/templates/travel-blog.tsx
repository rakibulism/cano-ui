"use client"

import * as React from "react"
import {
  Compass,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Menu,
  Plane,
  Mountain,
  Camera,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Heart,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type Region = "All" | "Asia" | "Europe" | "Americas" | "Africa"

const REGIONS: Region[] = ["All", "Asia", "Europe", "Americas", "Africa"]

type Post = {
  id: number
  title: string
  excerpt: string
  region: Exclude<Region, "All">
  place: string
  readTime: string
  date: string
  author: string
  initials: string
  image: string
}

const FEATURED: Post = {
  id: 0,
  title: "Chasing Sunrise Over the Bagan Temple Plains",
  excerpt:
    "We woke at 4am, climbed a quiet pagoda, and watched two thousand temples emerge from the mist as hot-air balloons drifted over the Burmese horizon. Here is how to do it without the crowds.",
  region: "Asia",
  place: "Bagan, Myanmar",
  readTime: "9 min read",
  date: "May 28",
  author: "Lena Hart",
  initials: "LH",
  image:
    "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1600&q=80",
}

const POSTS: Post[] = [
  {
    id: 1,
    title: "A Slow Week in the Kyoto Backstreets",
    excerpt: "Tea houses, mossy shrines, and the art of getting pleasantly lost.",
    region: "Asia",
    place: "Kyoto, Japan",
    readTime: "7 min read",
    date: "May 21",
    author: "Lena Hart",
    initials: "LH",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Cinque Terre by Foot: Five Villages, One Trail",
    excerpt: "Cliffside paths, pastel houses, and the best focaccia of my life.",
    region: "Europe",
    place: "Liguria, Italy",
    readTime: "6 min read",
    date: "May 14",
    author: "Marco Reyes",
    initials: "MR",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Patagonia's W Trek: A Field Notebook",
    excerpt: "Granite towers, turquoise lakes, and weather that changes by the hour.",
    region: "Americas",
    place: "Torres del Paine, Chile",
    readTime: "11 min read",
    date: "May 9",
    author: "Marco Reyes",
    initials: "MR",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Dawn Drives Through the Serengeti",
    excerpt: "On the migration trail with a thermos of coffee and endless plains.",
    region: "Africa",
    place: "Serengeti, Tanzania",
    readTime: "8 min read",
    date: "Apr 30",
    author: "Amara Okoye",
    initials: "AO",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Lisbon's Tiled Hills and Late-Night Fado",
    excerpt: "Trams, miradouros, and pastéis de nata at every corner.",
    region: "Europe",
    place: "Lisbon, Portugal",
    readTime: "5 min read",
    date: "Apr 24",
    author: "Marco Reyes",
    initials: "MR",
    image:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Marrakech After Dark: The Medina Comes Alive",
    excerpt: "Spice stalls, lantern light, and the hum of Jemaa el-Fnaa.",
    region: "Africa",
    place: "Marrakech, Morocco",
    readTime: "6 min read",
    date: "Apr 18",
    author: "Amara Okoye",
    initials: "AO",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    title: "Hanoi to Halong: A North Vietnam Loop",
    excerpt: "Street food mornings and limestone karsts by twilight.",
    region: "Asia",
    place: "Halong Bay, Vietnam",
    readTime: "7 min read",
    date: "Apr 11",
    author: "Lena Hart",
    initials: "LH",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    title: "Road-Tripping the Pacific Coast Highway",
    excerpt: "Big Sur fog, cliffside diners, and one very stubborn sea otter.",
    region: "Americas",
    place: "California, USA",
    readTime: "9 min read",
    date: "Apr 3",
    author: "Marco Reyes",
    initials: "MR",
    image:
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=900&q=80",
  },
]

const POPULAR: { place: string; region: Region; count: number }[] = [
  { place: "Kyoto, Japan", region: "Asia", count: 18 },
  { place: "Lisbon, Portugal", region: "Europe", count: 14 },
  { place: "Patagonia, Chile", region: "Americas", count: 11 },
  { place: "Marrakech, Morocco", region: "Africa", count: 9 },
  { place: "Bali, Indonesia", region: "Asia", count: 7 },
]

const NAV = ["Stories", "Destinations", "Guides", "About"]

export default function TravelBlogTemplate() {
  const [active, setActive] = React.useState<Region>("All")

  const visible = React.useMemo(
    () => (active === "All" ? POSTS : POSTS.filter((p) => p.region === active)),
    [active]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-lg">Wanderfold</span>
          </a>
          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stories"
                className="h-9 w-40 pl-9 lg:w-56"
                aria-label="Search stories"
              />
            </div>
            <Button size="sm" className="hidden sm:inline-flex">
              Subscribe
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero / Featured story */}
        <section className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
          <a
            href="#"
            className="group relative block overflow-hidden rounded-3xl border"
          >
            <img
              src={FEATURED.image}
              alt=""
              className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="gap-1">
                  <Plane className="h-3.5 w-3.5" />
                  Featured journey
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {FEATURED.place}
                </Badge>
              </div>
              <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
                {FEATURED.title}
              </h1>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                {FEATURED.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>{FEATURED.initials}</AvatarFallback>
                  </Avatar>
                  {FEATURED.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {FEATURED.readTime}
                </span>
                <span>{FEATURED.date}</span>
                <span className="ml-auto hidden items-center gap-1 font-medium text-foreground sm:flex">
                  Read the story
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </a>
        </section>

        {/* Body: posts grid + sidebar */}
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_300px]">
          {/* Posts column */}
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Latest dispatches</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Filter the field notes by where in the world they were written.
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {visible.length} {visible.length === 1 ? "story" : "stories"}
              </span>
            </div>

            {/* Filter chips */}
            <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter by region">
              {REGIONS.map((region) => {
                const selected = active === region
                return (
                  <button
                    key={region}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(region)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {region === "All" && <Globe className="h-3.5 w-3.5" />}
                    {region}
                  </button>
                )
              })}
            </div>

            {/* Grid */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {visible.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg"
                >
                  <a href="#" className="relative block overflow-hidden">
                    <img
                      src={post.image}
                      alt=""
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute left-3 top-3 gap-1 backdrop-blur"
                    >
                      <MapPin className="h-3 w-3" />
                      {post.region}
                    </Badge>
                  </a>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                      {post.place}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight">
                      <a href="#" className="hover:underline">
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback className="text-[10px]">{post.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span className="ml-auto flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {visible.length === 0 && (
              <div className="mt-8 rounded-2xl border border-dashed p-12 text-center">
                <Mountain className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">
                  No stories from this region yet. Adventure pending.
                </p>
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <Button variant="outline" className="gap-2">
                Load more stories
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* About */}
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>WF</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Wanderfold</p>
                  <p className="text-xs text-muted-foreground">Three writers, one passport</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                We are a small crew of slow travelers writing honest field notes from the road —
                no filters, just the good, the lost, and the unforgettable.
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full gap-2">
                <Camera className="h-4 w-4" />
                Meet the team
              </Button>
            </div>

            {/* Popular destinations */}
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                <Mountain className="h-4 w-4 text-primary" />
                Popular destinations
              </h3>
              <Separator className="my-4" />
              <ul className="space-y-1">
                {POPULAR.map((d) => (
                  <li key={d.place}>
                    <a
                      href="#"
                      className="flex items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {d.place}
                      </span>
                      <Badge variant="outline">{d.count}</Badge>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter (sidebar) */}
            <div className="rounded-2xl border bg-primary/10 p-6">
              <Mail className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">The Sunday postcard</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                One story and one tiny travel tip, in your inbox every week.
              </p>
              <form
                className="mt-4 space-y-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input type="email" placeholder="you@email.com" aria-label="Email address" />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </div>
          </aside>
        </section>

        {/* Full-width newsletter band */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2">
            <div>
              <Badge variant="secondary" className="gap-1">
                <Plane className="h-3.5 w-3.5" />
                Join 24,000 travelers
              </Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Get the next adventure before anyone else
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                New routes, packing lists, and the occasional last-minute flight deal — never spam,
                always wanderlust.
              </p>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-12 flex-1"
              />
              <Button type="submit" size="lg" className="h-12 gap-2">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Compass className="h-4 w-4" />
              </span>
              Wanderfold
            </a>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Slow travel stories from every corner of the map. Written on trains, edited in cafes.
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="icon" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {["Asia", "Europe", "Americas", "Africa", "Guides"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {["About", "Contact", "Press kit", "Privacy"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 Wanderfold. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 fill-current text-primary" /> on the road
          </p>
        </div>
      </footer>
    </div>
  )
}
