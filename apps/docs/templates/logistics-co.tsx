"use client"
import * as React from "react"
import { Truck, Warehouse, MapPin, Search, PackageCheck, Plane, Ship, Globe, Phone, Mail, ArrowRight, ShieldCheck, Clock, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Coverage", href: "#coverage" },
  { label: "Network", href: "#network" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
]

const SERVICES = [
  {
    icon: Truck,
    title: "Freight Forwarding",
    desc: "Full-truckload, less-than-truckload, and intermodal freight moved across road and rail with live ETA tracking.",
    points: ["FTL & LTL", "Rail intermodal", "Customs clearance"],
  },
  {
    icon: Warehouse,
    title: "Warehousing & Fulfillment",
    desc: "Climate-controlled storage, pick-and-pack, and inventory sync across 40+ distribution centers.",
    points: ["Bonded storage", "Pick & pack", "Inventory API"],
  },
  {
    icon: PackageCheck,
    title: "Last-Mile Delivery",
    desc: "Same-day and next-day delivery with proof-of-delivery, route optimization, and a branded tracking page.",
    points: ["Same-day", "Route AI", "Proof of delivery"],
  },
]

const STATS = [
  { value: "120+", label: "Countries served" },
  { value: "40", label: "Distribution centers" },
  { value: "2.4M", label: "Shipments / year" },
  { value: "99.3%", label: "On-time delivery" },
]

const MODES = [
  { icon: Truck, label: "Road" },
  { icon: Plane, label: "Air" },
  { icon: Ship, label: "Ocean" },
  { icon: Globe, label: "Intermodal" },
]

const HUBS = [
  { city: "Rotterdam", top: "30%", left: "48%" },
  { city: "Singapore", top: "62%", left: "76%" },
  { city: "Chicago", top: "36%", left: "22%" },
  { city: "Dubai", top: "48%", left: "60%" },
  { city: "São Paulo", top: "74%", left: "32%" },
  { city: "Shanghai", top: "42%", left: "82%" },
]

const PARTNERS = ["Maersk", "DHL Air", "UnionRail", "PortCo", "FleetX", "CargoLink"]

const STEPS = [
  { num: "01", title: "Book online", desc: "Get an instant quote and schedule pickup in under two minutes." },
  { num: "02", title: "We move it", desc: "Optimized routing across road, air, and ocean lanes." },
  { num: "03", title: "Track live", desc: "Real-time visibility from dock to doorstep, every leg." },
]

export default function LogisticsCoTemplate() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [trackId, setTrackId] = React.useState("")
  const [tracked, setTracked] = React.useState<string | null>(null)

  const onTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setTracked(trackId.trim() ? trackId.trim() : "SHP-4827-XK")
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Truck className="h-4 w-4" />
            </span>
            Logistics Co
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button size="sm">Get a quote</Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        {menuOpen && (
          <div className="border-t md:hidden">
            <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {n.label}
                </a>
              ))}
              <Button size="sm" className="mt-2">Get a quote</Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-4 w-fit gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> ISO 9001 certified network
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Move freight anywhere, with total visibility.
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Freight forwarding, warehousing, and last-mile delivery on one platform, spanning 120+ countries and 2.4M shipments a year.
              </p>

              <Card className="mt-8 max-w-md">
                <CardContent className="pt-6">
                  <form onSubmit={onTrack} className="flex flex-col gap-3">
                    <Label htmlFor="track" className="text-sm font-medium">
                      Track a shipment
                    </Label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Input
                        id="track"
                        placeholder="Enter tracking number e.g. SHP-4827-XK"
                        value={trackId}
                        onChange={(e) => setTrackId(e.target.value)}
                      />
                      <Button type="submit" className="gap-1 sm:w-auto">
                        <Search className="h-4 w-4" /> Track
                      </Button>
                    </div>
                  </form>
                  {tracked && (
                    <div className="mt-4 rounded-md border bg-muted/40 p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{tracked}</span>
                        <Badge className="gap-1">
                          <Clock className="h-3 w-3" /> In transit
                        </Badge>
                      </div>
                      <p className="mt-1 text-muted-foreground">
                        Last scan: Rotterdam hub. Estimated delivery in 2 days.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mt-6 flex flex-wrap gap-4">
                {MODES.map((m) => (
                  <div key={m.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <m.icon className="h-4 w-4 text-primary" /> {m.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden items-center justify-center lg:flex">
              <div className="absolute inset-0 rounded-2xl bg-primary/10" aria-hidden="true" />
              <div className="relative w-full rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Live operations</p>
                  <Badge variant="outline" className="gap-1 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Online
                  </Badge>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  {[
                    { id: "SHP-4827-XK", route: "Shanghai → Hamburg", pct: "78%" },
                    { id: "SHP-1190-Q2", route: "Chicago → Denver", pct: "42%" },
                    { id: "SHP-7745-AB", route: "Dubai → Nairobi", pct: "91%" },
                  ].map((s) => (
                    <div key={s.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{s.id}</span>
                        <span className="text-muted-foreground">{s.pct}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.route}</p>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: s.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-12 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 text-center">
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3">What we move</Badge>
            <h2 className="text-3xl font-bold tracking-tight">End-to-end logistics, one partner</h2>
            <p className="mt-3 text-muted-foreground">
              From the factory floor to the final doorstep, every link in your supply chain is handled and tracked.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <Card key={s.title} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <ul className="space-y-2 text-sm">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-muted-foreground">
                        <PackageCheck className="h-4 w-4 text-primary" /> {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {STEPS.map((st) => (
                <div key={st.num} className="relative">
                  <div className="text-4xl font-bold text-primary/30">{st.num}</div>
                  <h3 className="mt-2 text-lg font-semibold">{st.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Network map */}
        <section id="network" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Badge variant="outline" className="mb-3">Global network</Badge>
              <h2 className="text-3xl font-bold tracking-tight">A logistics backbone across six continents</h2>
              <p className="mt-3 text-muted-foreground">
                Strategically placed hubs keep your cargo moving on the shortest, most reliable lanes, with redundancy built into every corridor.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {HUBS.map((h) => (
                  <Badge key={h.city} variant="secondary" className="gap-1">
                    <MapPin className="h-3 w-3" /> {h.city}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="mt-6 gap-1">
                Explore coverage <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div id="coverage" className="lg:col-span-3">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted/40">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, var(--border) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute left-4 top-4 rounded-md border bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
                  Network map
                </div>
                {HUBS.map((h) => (
                  <div
                    key={h.city}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: h.top, left: h.left }}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section id="partners" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <p className="text-center text-sm font-medium text-muted-foreground">
              Trusted by carriers and shippers worldwide
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {PARTNERS.map((p) => (
                <div
                  key={p}
                  className="flex items-center justify-center rounded-lg border bg-card px-4 py-5 text-sm font-semibold text-muted-foreground"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-3">Contact</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Let's plan your next shipment</h2>
              <p className="mt-3 text-muted-foreground">
                Tell us about your freight and our team will reply with a tailored quote within one business day.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-medium">+1 (800) 555-0142</div>
                    <div className="text-muted-foreground">24/7 operations desk</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-medium">freight@logisticsco.com</div>
                    <div className="text-muted-foreground">Quotes & bookings</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-medium">Pier 12, Rotterdam, NL</div>
                    <div className="text-muted-foreground">Global headquarters</div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jordan Patel" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Trading" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="details">Shipment details</Label>
                    <Textarea id="details" rows={4} placeholder="Origin, destination, weight, and timeline..." />
                  </div>
                  <Button type="submit" className="gap-1">
                    Request a quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Truck className="h-4 w-4" />
            </span>
            Logistics Co
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">© 2024 Logistics Co. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
