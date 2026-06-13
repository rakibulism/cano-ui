"use client"

import * as React from "react"
import {
  Building2,
  Contact,
  Filter,
  Home,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Settings,
  Star,
  Tag,
  Users,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NAV = [
  ["Home", Home, false],
  ["Contacts", Contact, true],
  ["Companies", Building2, false],
  ["Team", Users, false],
  ["Settings", Settings, false],
] as const

const SEGMENTS = ["All", "Customers", "Leads", "Prospects", "Churned"] as const
type Segment = (typeof SEGMENTS)[number]

type Status = "Customer" | "Lead" | "Prospect" | "Churned"

type ContactRow = {
  id: number
  name: string
  initials: string
  title: string
  email: string
  phone: string
  company: string
  location: string
  status: Status
  owner: string
  deals: number
  starred: boolean
}

const CONTACTS: ContactRow[] = [
  {
    id: 1,
    name: "Amelia Brooks",
    initials: "AB",
    title: "VP Operations",
    email: "amelia@northgate.io",
    phone: "+1 (415) 555-0182",
    company: "Northgate Logistics",
    location: "San Francisco, CA",
    status: "Customer",
    owner: "You",
    deals: 4,
    starred: true,
  },
  {
    id: 2,
    name: "Daniel Cho",
    initials: "DC",
    title: "Head of Growth",
    email: "daniel.cho@lumen.app",
    phone: "+1 (212) 555-0147",
    company: "Lumen App",
    location: "New York, NY",
    status: "Lead",
    owner: "Priya R.",
    deals: 1,
    starred: false,
  },
  {
    id: 3,
    name: "Sofia Marin",
    initials: "SM",
    title: "Procurement Lead",
    email: "s.marin@vertex.co",
    phone: "+1 (312) 555-0119",
    company: "Vertex Co.",
    location: "Chicago, IL",
    status: "Prospect",
    owner: "You",
    deals: 0,
    starred: false,
  },
  {
    id: 4,
    name: "Marcus Hale",
    initials: "MH",
    title: "CTO",
    email: "marcus@stackforge.dev",
    phone: "+1 (206) 555-0173",
    company: "StackForge",
    location: "Seattle, WA",
    status: "Customer",
    owner: "Leo K.",
    deals: 7,
    starred: true,
  },
  {
    id: 5,
    name: "Priya Nair",
    initials: "PN",
    title: "Marketing Director",
    email: "priya@brightwave.com",
    phone: "+1 (617) 555-0156",
    company: "Brightwave",
    location: "Boston, MA",
    status: "Lead",
    owner: "You",
    deals: 2,
    starred: false,
  },
  {
    id: 6,
    name: "Tomás Vidal",
    initials: "TV",
    title: "Founder",
    email: "tomas@cobalt.studio",
    phone: "+1 (305) 555-0138",
    company: "Cobalt Studio",
    location: "Miami, FL",
    status: "Churned",
    owner: "Priya R.",
    deals: 3,
    starred: false,
  },
  {
    id: 7,
    name: "Hannah Webb",
    initials: "HW",
    title: "Finance Manager",
    email: "hannah.webb@orbit.io",
    phone: "+1 (503) 555-0164",
    company: "Orbit Systems",
    location: "Portland, OR",
    status: "Prospect",
    owner: "Leo K.",
    deals: 0,
    starred: false,
  },
  {
    id: 8,
    name: "Owen Frost",
    initials: "OF",
    title: "Sales Lead",
    email: "owen@meridian.co",
    phone: "+1 (737) 555-0190",
    company: "Meridian",
    location: "Austin, TX",
    status: "Customer",
    owner: "You",
    deals: 5,
    starred: true,
  },
]

const STATUS_TO_SEGMENT: Record<Status, Segment> = {
  Customer: "Customers",
  Lead: "Leads",
  Prospect: "Prospects",
  Churned: "Churned",
}

function statusVariant(status: Status): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "Customer":
      return "default"
    case "Lead":
      return "secondary"
    case "Prospect":
      return "outline"
    case "Churned":
      return "destructive"
  }
}

export default function ContactsCrm() {
  const [segment, setSegment] = React.useState<Segment>("All")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<number | null>(CONTACTS[0].id)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return CONTACTS.filter((c) => {
      const inSegment = segment === "All" || STATUS_TO_SEGMENT[c.status] === segment
      const inQuery =
        q === "" ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q)
      return inSegment && inQuery
    })
  }, [segment, query])

  const selected = React.useMemo(
    () => CONTACTS.find((c) => c.id === selectedId) ?? null,
    [selectedId],
  )

  const segmentCount = (seg: Segment) =>
    seg === "All"
      ? CONTACTS.length
      : CONTACTS.filter((c) => STATUS_TO_SEGMENT[c.status] === seg).length

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Contact className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Relay CRM</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Primary">
          {NAV.map(([label, Icon, active]) => (
            <button
              key={label}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-md px-2 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>JR</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Jordan Reyes</p>
              <p className="truncate text-xs text-muted-foreground">jordan@relay.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search contacts, companies, emails…"
              className="pl-9"
              aria-label="Search contacts"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New contact
            </Button>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col xl:flex-row">
          {/* List column */}
          <section className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Contacts</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filtered.length} of {CONTACTS.length} people
                </p>
              </div>
            </div>

            {/* Segment tabs */}
            <div className="mt-5 flex flex-wrap gap-2">
              {SEGMENTS.map((seg) => (
                <button
                  key={seg}
                  onClick={() => setSegment(seg)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                    segment === seg
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {seg}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs",
                      segment === seg ? "bg-primary/15 text-primary" : "bg-muted",
                    )}
                  >
                    {segmentCount(seg)}
                  </span>
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="mt-5 overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Owner</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={cn(
                        "cursor-pointer",
                        selectedId === c.id && "bg-accent",
                      )}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{c.initials}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="truncate font-medium">{c.name}</span>
                              {c.starred && (
                                <Star
                                  className="h-3.5 w-3.5 fill-primary text-primary"
                                  aria-label="Starred"
                                />
                              )}
                            </div>
                            <p className="truncate text-xs text-muted-foreground">
                              {c.title}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm">{c.company}</span>
                        <p className="text-xs text-muted-foreground">{c.location}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                        {c.owner}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`More actions for ${c.name}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-16 text-center">
                        <p className="text-sm font-medium">No contacts found</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Try a different search or segment.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Detail panel */}
          <aside className="w-full shrink-0 border-t bg-muted/30 p-4 sm:p-6 xl:w-96 xl:border-l xl:border-t-0">
            {selected ? (
              <div className="sticky top-20 space-y-6">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Contact details
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close details"
                    onClick={() => setSelectedId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-lg">
                      {selected.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-3 text-lg font-semibold">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">{selected.title}</p>
                  <Badge variant={statusVariant(selected.status)} className="mt-3">
                    {selected.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" className="w-full">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                </div>

                <Separator />

                <dl className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <dt className="text-xs text-muted-foreground">Email</dt>
                      <dd className="truncate">{selected.email}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">Phone</dt>
                      <dd>{selected.phone}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">Company</dt>
                      <dd>{selected.company}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">Location</dt>
                      <dd>{selected.location}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Tag className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">Owner</dt>
                      <dd>{selected.owner}</dd>
                    </div>
                  </div>
                </dl>

                <Separator />

                <div className="rounded-lg border bg-card p-4">
                  <p className="text-xs text-muted-foreground">Open deals</p>
                  <p className="mt-1 text-2xl font-semibold">{selected.deals}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Last activity 3 days ago
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-48 flex-col items-center justify-center text-center">
                <Contact className="h-10 w-10 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">No contact selected</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select a row to see details.
                </p>
              </div>
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
