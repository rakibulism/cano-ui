"use client"

import * as React from "react"
import {
  Sun,
  Tent,
  Palette,
  Bike,
  Music,
  Trophy,
  Waves,
  Leaf,
  Rocket,
  Microscope,
  Heart,
  ShieldCheck,
  Phone,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Star,
  Quote,
  Menu,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const NAV = ["Programs", "Schedule", "Pricing", "Reviews"]

type AgeKey = "5-7" | "8-10" | "11-13"

const AGE_GROUPS: { key: AgeKey; label: string; tagline: string }[] = [
  { key: "5-7", label: "Ages 5–7", tagline: "Little Explorers" },
  { key: "8-10", label: "Ages 8–10", tagline: "Trailblazers" },
  { key: "11-13", label: "Ages 11–13", tagline: "Adventurers" },
]

const ACTIVITIES: Record<AgeKey, { icon: React.ElementType; title: string; body: string }[]> = {
  "5-7": [
    { icon: Palette, title: "Finger Painting", body: "Splashy art adventures with washable paints and giant canvases." },
    { icon: Leaf, title: "Nature Walks", body: "Gentle guided strolls to spot bugs, leaves, and friendly critters." },
    { icon: Music, title: "Sing & Dance", body: "Silly songs, clapping games, and a wiggle-it-out dance party." },
    { icon: Waves, title: "Splash Pad", body: "Cool-off water play in our shallow, fully-supervised splash zone." },
  ],
  "8-10": [
    { icon: Bike, title: "Trail Biking", body: "Pedal the woodland loop with helmets, buddies, and a snack stop." },
    { icon: Microscope, title: "Mini Science Lab", body: "Erupting volcanoes, slime chemistry, and curious experiments." },
    { icon: Trophy, title: "Camp Olympics", body: "Team relays, sack races, and friendly ribbons for everyone." },
    { icon: Tent, title: "Fort Building", body: "Design and build your own woodland hideout with cabin mates." },
  ],
  "11-13": [
    { icon: Rocket, title: "Rocketry Workshop", body: "Design, build, and launch real model rockets into the blue." },
    { icon: Waves, title: "Kayak Expedition", body: "Paddle the lake with certified instructors and full safety gear." },
    { icon: Microscope, title: "Robotics Build", body: "Code and battle bots in our maker-tent engineering challenge." },
    { icon: Trophy, title: "Leadership Quest", body: "Counselor-in-training games that grow confidence and teamwork." },
  ],
}

const PROGRAMS = [
  { icon: Palette, title: "Arts & Crafts", body: "Painting, pottery, and tie-dye in our sunny open-air studio.", accent: "bg-primary/10 text-primary" },
  { icon: Waves, title: "Lake & Swim", body: "Lessons and free-swim in a lifeguarded, crystal-clear lake.", accent: "bg-accent text-foreground" },
  { icon: Rocket, title: "STEM Makers", body: "Robots, rockets, and hands-on builds in the maker tent.", accent: "bg-secondary text-secondary-foreground" },
  { icon: Music, title: "Music & Drama", body: "Campfire songs, skits, and a grand end-of-week show.", accent: "bg-primary/10 text-primary" },
  { icon: Bike, title: "Outdoor Sports", body: "Soccer, archery, biking, and the legendary Camp Olympics.", accent: "bg-accent text-foreground" },
  { icon: Leaf, title: "Nature & Trails", body: "Hikes, gardening, and bug hunts led by our naturalists.", accent: "bg-secondary text-secondary-foreground" },
]

const SCHEDULE = [
  { time: "8:30 AM", title: "Drop-off & Sunrise Games", body: "Warm welcomes, name tags, and gentle morning wiggles." },
  { time: "9:30 AM", title: "Activity Block One", body: "Rotate through arts, sports, or the maker tent." },
  { time: "11:00 AM", title: "Snack & Story Circle", body: "Healthy snacks and a read-aloud in the shade." },
  { time: "12:00 PM", title: "Lunch & Free Play", body: "Nut-free lunch followed by playground time." },
  { time: "1:30 PM", title: "Activity Block Two", body: "Lake swim, science lab, or a woodland adventure." },
  { time: "3:30 PM", title: "Campfire & Pick-up", body: "Songs, shout-outs, and safe hand-off to grown-ups." },
]

const TRUST = [
  { icon: ShieldCheck, stat: "1:6", label: "Counselor-to-camper ratio" },
  { icon: Heart, stat: "100%", label: "First-aid certified staff" },
  { icon: CheckCircle2, stat: "20+", label: "Years of safe summers" },
  { icon: Sun, stat: "300+", label: "Happy campers each week" },
]

const SESSIONS = [
  {
    name: "Day Camper",
    price: "$249",
    unit: "/ week",
    blurb: "Full days of fun, Monday through Friday.",
    perks: ["8:30 AM – 3:30 PM daily", "All activities included", "Daily snacks & lunch", "Weekly photo updates"],
    featured: false,
  },
  {
    name: "Full Summer Pass",
    price: "$1,790",
    unit: "/ 8 weeks",
    blurb: "Our best value for the whole summer long.",
    perks: ["All 8 weeks of camp", "Free camp t-shirt & water bottle", "Priority activity sign-up", "Sibling discount applied"],
    featured: true,
  },
  {
    name: "Mini Explorer",
    price: "$159",
    unit: "/ 3 days",
    blurb: "A gentle first taste of camp for new friends.",
    perks: ["Tuesday – Thursday", "Half or full day option", "Buddy pairing included", "Welcome kit on day one"],
    featured: false,
  },
]

const TESTIMONIALS = [
  { name: "Marisol Reyes", role: "Parent of Theo, 7", quote: "Theo counts down the days until camp. The counselors are warm, attentive, and he comes home glowing with stories every single afternoon.", img: "https://i.pravatar.cc/120?img=47" },
  { name: "Daniel Okafor", role: "Parent of Amara, 10", quote: "The ratio of staff to kids gave us total peace of mind. Amara learned to kayak and made a best friend in week one.", img: "https://i.pravatar.cc/120?img=12" },
  { name: "Priya Nair", role: "Parent of Veer, 12", quote: "The robotics and leadership track was perfect for a tween who thinks he's too cool for camp. He was hooked by day two.", img: "https://i.pravatar.cc/120?img=32" },
]

export default function KidsCampTemplate() {
  const [age, setAge] = React.useState<AgeKey>("5-7")
  const activeGroup = AGE_GROUPS.find((g) => g.key === age)!

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Sun className="size-5" />
            </span>
            <span className="text-lg">Sunny Pines Camp</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button className="rounded-full font-bold">
              Register Now
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-primary/10">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1 text-sm">
                <Calendar className="mr-1 size-4" />
                June 16 – August 8, 2026
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                The best summer of their{" "}
                <span className="text-primary">whole year.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Eight sun-soaked weeks of swimming, science, art, and friendship on 40 acres of lakeside woodland — all led by caring, certified counselors.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="rounded-full px-7 text-base font-bold">
                  Register Your Camper
                  <ArrowRight className="size-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-7 text-base font-bold">
                  Book a Tour
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="size-4 text-primary" /> Maple Lake, OR</span>
                <span className="flex items-center gap-1.5"><Clock className="size-4 text-primary" /> 8:30 AM – 3:30 PM</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" /> Ages 5–13</span>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=80"
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <Card className="absolute -bottom-6 -left-4 hidden w-56 rounded-2xl shadow-lg sm:block">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Heart className="size-5" />
                  </span>
                  <div>
                    <p className="text-lg font-bold leading-none">4.9 / 5</p>
                    <p className="text-xs text-muted-foreground">from 600+ parents</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Age group selector */}
        <section id="programs" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3 rounded-full">Just for their age</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Activities that grow with your camper
            </h2>
            <p className="mt-3 text-muted-foreground">
              Pick an age group to see a sample of the adventures waiting at Sunny Pines.
            </p>
          </div>

          <Tabs value={age} onValueChange={(v) => setAge(v as AgeKey)} className="mt-8">
            <TabsList className="mx-auto h-auto flex-wrap justify-center gap-1 rounded-full bg-muted p-1.5">
              {AGE_GROUPS.map((g) => (
                <TabsTrigger key={g.key} value={g.key} className="rounded-full px-5 py-2 text-sm font-bold">
                  {g.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {AGE_GROUPS.map((g) => (
              <TabsContent key={g.key} value={g.key} className="mt-8">
                <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-primary">
                  {g.tagline} · {g.label}
                </p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {ACTIVITIES[g.key].map((a) => (
                    <Card key={a.title} className="rounded-2xl transition-shadow hover:shadow-md">
                      <CardHeader>
                        <span className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <a.icon className="size-6" />
                        </span>
                        <CardTitle className="text-lg">{a.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{a.body}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Currently viewing the <span className="font-semibold text-foreground">{activeGroup.tagline}</span> track.
          </p>
        </section>

        {/* Programs grid */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 max-w-2xl">
              <Badge variant="outline" className="mb-3 rounded-full">Six camp tracks</Badge>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Something for every kind of kid</h2>
              <p className="mt-3 text-muted-foreground">
                Every camper rotates through a mix of these tracks each week — no two days look the same.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PROGRAMS.map((p) => (
                <Card key={p.title} className="rounded-2xl border-0 bg-card shadow-sm">
                  <CardHeader>
                    <span className={cn("mb-2 flex size-12 items-center justify-center rounded-2xl", p.accent)}>
                      <p.icon className="size-6" />
                    </span>
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                    <CardDescription>{p.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Daily schedule */}
        <section id="schedule" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge variant="outline" className="mb-3 rounded-full">A day at camp</Badge>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Predictable rhythm, endless fun
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our days balance high-energy adventure with calm, restful moments — so kids stay happy, safe, and ready for more.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full">Sunscreen reminders</Badge>
                <Badge variant="secondary" className="rounded-full">Shaded rest times</Badge>
                <Badge variant="secondary" className="rounded-full">Hydration stations</Badge>
              </div>
            </div>
            <ol className="relative space-y-1 border-l pl-6">
              {SCHEDULE.map((s, i) => (
                <li key={s.time} className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[31px] flex size-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <span className="size-2 rounded-full bg-primary" />
                  </span>
                  <div className="flex flex-col gap-1 rounded-2xl bg-muted/40 p-4 sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="shrink-0 text-sm font-bold text-primary">{s.time}</span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-sm text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y bg-primary/5">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST.map((t) => (
                <div key={t.label} className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <t.icon className="size-6" />
                  </span>
                  <div>
                    <p className="text-2xl font-extrabold leading-none">{t.stat}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing / sessions */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3 rounded-full">Sessions & pricing</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Flexible plans for every family</h2>
            <p className="mt-3 text-muted-foreground">
              Sibling and early-bird discounts apply automatically at checkout.
            </p>
          </div>
          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
            {SESSIONS.map((s) => (
              <Card
                key={s.name}
                className={cn(
                  "relative flex flex-col rounded-3xl",
                  s.featured && "border-primary shadow-lg ring-1 ring-primary"
                )}
              >
                {s.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3">
                    <Star className="mr-1 size-3.5" /> Most popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{s.name}</CardTitle>
                  <CardDescription>{s.blurb}</CardDescription>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight">{s.price}</span>
                    <span className="text-sm text-muted-foreground">{s.unit}</span>
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2.5 text-sm">
                    {s.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full rounded-full font-bold"
                    variant={s.featured ? "default" : "outline"}
                  >
                    Choose {s.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-3 rounded-full">Loved by families</Badge>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">What parents are saying</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col rounded-2xl bg-card">
                  <CardContent className="flex flex-1 flex-col gap-4 pt-6">
                    <Quote className="size-7 text-primary/40" />
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      “{t.quote}”
                    </p>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={t.img} alt="" />
                        <AvatarFallback>{t.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Register CTA */}
        <section id="register" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Card className="overflow-hidden rounded-3xl border-primary bg-primary text-primary-foreground">
            <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Spots fill fast — save your camper&rsquo;s seat
                </h2>
                <p className="mt-4 max-w-md text-primary-foreground/80">
                  Drop your details and our camp director will follow up within one business day with availability and next steps.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
                  <span className="flex items-center gap-1.5"><Phone className="size-4" /> (555) 014-2200</span>
                  <span className="flex items-center gap-1.5"><MapPin className="size-4" /> 12 Maple Lake Rd</span>
                </div>
              </div>
              <div className="rounded-2xl bg-background p-6 text-foreground">
                <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-2">
                    <Label htmlFor="parent">Parent name</Label>
                    <Input id="parent" placeholder="Alex Morgan" />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="camper">Camper name</Label>
                      <Input id="camper" placeholder="Jamie" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@email.com" />
                    </div>
                  </div>
                  <Button type="submit" className="rounded-full font-bold">
                    Reserve a Spot
                    <ArrowRight className="size-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    No payment due today. We&rsquo;ll confirm availability first.
                  </p>
                </form>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-extrabold text-foreground">
            <span className="flex size-7 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sun className="size-4" />
            </span>
            Sunny Pines Camp
          </div>
          <p>© 2026 Sunny Pines Day Camp · Maple Lake, OR · ACA Accredited</p>
        </div>
      </footer>
    </div>
  )
}
