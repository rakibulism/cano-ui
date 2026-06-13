"use client"

import * as React from "react"
import {
  Type,
  AlignLeft,
  Mail,
  Hash,
  ChevronDownSquare,
  CheckSquare,
  Calendar,
  Star,
  ToggleLeft,
  Trash2,
  GripVertical,
  Plus,
  Eye,
  Settings2,
  FileText,
  Inbox,
  Share2,
  Download,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

type FieldKind =
  | "short"
  | "long"
  | "email"
  | "number"
  | "select"
  | "checkbox"
  | "date"
  | "rating"
  | "toggle"

type PaletteItem = {
  kind: FieldKind
  label: string
  icon: React.ComponentType<{ className?: string }>
  defaultLabel: string
}

type FormField = {
  id: number
  kind: FieldKind
  label: string
  placeholder: string
  required: boolean
}

const PALETTE: PaletteItem[] = [
  { kind: "short", label: "Short text", icon: Type, defaultLabel: "Short answer" },
  { kind: "long", label: "Paragraph", icon: AlignLeft, defaultLabel: "Long answer" },
  { kind: "email", label: "Email", icon: Mail, defaultLabel: "Email address" },
  { kind: "number", label: "Number", icon: Hash, defaultLabel: "Number" },
  { kind: "select", label: "Dropdown", icon: ChevronDownSquare, defaultLabel: "Choose an option" },
  { kind: "checkbox", label: "Checkboxes", icon: CheckSquare, defaultLabel: "Select all that apply" },
  { kind: "date", label: "Date", icon: Calendar, defaultLabel: "Pick a date" },
  { kind: "rating", label: "Rating", icon: Star, defaultLabel: "Rate your experience" },
  { kind: "toggle", label: "Yes / No", icon: ToggleLeft, defaultLabel: "Yes or no?" },
]

const KIND_LABEL: Record<FieldKind, string> = {
  short: "Short text",
  long: "Paragraph",
  email: "Email",
  number: "Number",
  select: "Dropdown",
  checkbox: "Checkboxes",
  date: "Date",
  rating: "Rating",
  toggle: "Yes / No",
}

const INITIAL_FIELDS: FormField[] = [
  { id: 1, kind: "short", label: "Full name", placeholder: "Jane Cooper", required: true },
  { id: 2, kind: "email", label: "Work email", placeholder: "jane@company.com", required: true },
  { id: 3, kind: "select", label: "Team size", placeholder: "Select range", required: false },
  { id: 4, kind: "long", label: "What problem are you solving?", placeholder: "Tell us more...", required: false },
]

const RESPONSES = [
  { id: "#1042", name: "Marcus Lee", email: "marcus@northwind.io", team: "11-50", date: "Jun 11", status: "New" },
  { id: "#1041", name: "Priya Nair", email: "priya@lumen.app", team: "1-10", date: "Jun 11", status: "Reviewed" },
  { id: "#1040", name: "Dana White", email: "dana@helix.co", team: "51-200", date: "Jun 10", status: "Reviewed" },
  { id: "#1039", name: "Sam Okoro", email: "sam@driftly.com", team: "11-50", date: "Jun 10", status: "Contacted" },
  { id: "#1038", name: "Lena Brandt", email: "lena@aperture.dev", team: "200+", date: "Jun 9", status: "New" },
]

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  New: "default",
  Reviewed: "secondary",
  Contacted: "outline",
}

function FieldPreview({ field }: { field: FormField }) {
  switch (field.kind) {
    case "long":
      return <div className="h-20 w-full rounded-md border bg-background" />
    case "select":
      return (
        <div className="flex h-9 w-full items-center justify-between rounded-md border bg-background px-3 text-sm text-muted-foreground">
          {field.placeholder}
          <ChevronDownSquare className="h-4 w-4" />
        </div>
      )
    case "checkbox":
      return (
        <div className="space-y-2">
          {["Option one", "Option two", "Option three"].map((o) => (
            <div key={o} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-4 w-4 rounded border" />
              {o}
            </div>
          ))}
        </div>
      )
    case "rating":
      return (
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-5 w-5 text-muted-foreground" />
          ))}
        </div>
      )
    case "toggle":
      return (
        <div className="flex items-center gap-2">
          <span className="h-5 w-9 rounded-full bg-muted" />
          <span className="text-sm text-muted-foreground">No</span>
        </div>
      )
    default:
      return (
        <div className="flex h-9 w-full items-center rounded-md border bg-background px-3 text-sm text-muted-foreground">
          {field.placeholder}
        </div>
      )
  }
}

export default function FormBuilder() {
  const [fields, setFields] = React.useState<FormField[]>(INITIAL_FIELDS)
  const [selectedId, setSelectedId] = React.useState<number | null>(1)
  const nextId = React.useRef(5)

  const selected = fields.find((f) => f.id === selectedId) ?? null

  function addField(item: PaletteItem) {
    const id = nextId.current++
    const newField: FormField = {
      id,
      kind: item.kind,
      label: item.defaultLabel,
      placeholder: "Type here...",
      required: false,
    }
    setFields((prev) => [...prev, newField])
    setSelectedId(id)
  }

  function removeField(id: number) {
    setFields((prev) => prev.filter((f) => f.id !== id))
    setSelectedId((cur) => (cur === id ? null : cur))
  }

  function updateField(id: number, patch: Partial<FormField>) {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)))
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Formly</div>
              <div className="text-xs text-muted-foreground">Beta access waitlist</div>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">Draft</Badge>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Eye className="mr-1.5 h-4 w-4" /> Preview
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Share2 className="mr-1.5 h-4 w-4" /> Share
            </Button>
            <Button size="sm">Publish</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6">
        <Tabs defaultValue="build" className="mx-auto w-full max-w-7xl">
          <TabsList>
            <TabsTrigger value="build">
              <Settings2 className="mr-1.5 h-4 w-4" /> Build
            </TabsTrigger>
            <TabsTrigger value="responses">
              <Inbox className="mr-1.5 h-4 w-4" /> Responses
              <Badge variant="secondary" className="ml-2">{RESPONSES.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="build" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-[220px_1fr_300px]">
              <aside className="space-y-3">
                <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Field types
                </h2>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {PALETTE.map((item) => (
                    <button
                      key={item.kind}
                      onClick={() => addField(item)}
                      className="group flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2.5 text-left text-sm transition-colors hover:border-primary hover:bg-accent"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 truncate font-medium">{item.label}</span>
                      <Plus className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </aside>

              <section className="min-w-0">
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle>Beta access waitlist</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Tell us about your team and we will reach out with an invite.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3 py-6">
                    {fields.length === 0 && (
                      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
                        <Inbox className="h-6 w-6 text-muted-foreground" />
                        <p className="text-sm font-medium">No fields yet</p>
                        <p className="text-xs text-muted-foreground">
                          Click a field type on the left to add one.
                        </p>
                      </div>
                    )}
                    {fields.map((field) => (
                      <div
                        key={field.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedId(field.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setSelectedId(field.id)
                        }}
                        className={cn(
                          "group relative rounded-lg border bg-card p-4 transition-colors",
                          selectedId === field.id
                            ? "border-primary ring-1 ring-primary"
                            : "hover:border-primary/40"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <GripVertical className="mt-0.5 h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{field.label}</span>
                              {field.required && (
                                <span className="text-destructive" aria-label="required">*</span>
                              )}
                              <Badge variant="outline" className="ml-1 text-[10px]">
                                {KIND_LABEL[field.kind]}
                              </Badge>
                            </div>
                            <FieldPreview field={field} />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove field"
                            className="h-8 w-8 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeField(field.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>

              <aside className="space-y-4">
                <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Field settings
                </h2>
                {selected ? (
                  <Card>
                    <CardContent className="space-y-5 py-5">
                      <div className="flex items-center gap-2 rounded-md bg-muted/30 px-3 py-2 text-sm">
                        <Settings2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{KIND_LABEL[selected.kind]}</span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="field-label">Label</Label>
                        <Input
                          id="field-label"
                          value={selected.label}
                          onChange={(e) => updateField(selected.id, { label: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="field-placeholder">Placeholder</Label>
                        <Input
                          id="field-placeholder"
                          value={selected.placeholder}
                          onChange={(e) => updateField(selected.id, { placeholder: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center justify-between rounded-md border px-3 py-2.5">
                        <div className="space-y-0.5">
                          <Label htmlFor="field-required" className="text-sm">Required</Label>
                          <p className="text-xs text-muted-foreground">Must be filled in</p>
                        </div>
                        <Switch
                          id="field-required"
                          checked={selected.required}
                          onCheckedChange={(v) => updateField(selected.id, { required: Boolean(v) })}
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full text-destructive"
                        onClick={() => removeField(selected.id)}
                      >
                        <Trash2 className="mr-1.5 h-4 w-4" /> Delete field
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                      <Settings2 className="h-6 w-6 text-muted-foreground" />
                      <p className="text-sm font-medium">No field selected</p>
                      <p className="text-xs text-muted-foreground">
                        Select a field on the canvas to edit it.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="responses" className="mt-6">
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              <Card>
                <CardContent className="py-4">
                  <p className="text-xs text-muted-foreground">Total responses</p>
                  <p className="mt-1 text-2xl font-semibold">1,284</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-4">
                  <p className="text-xs text-muted-foreground">Completion rate</p>
                  <p className="mt-1 text-2xl font-semibold">72%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-4">
                  <p className="text-xs text-muted-foreground">Avg. time to fill</p>
                  <p className="mt-1 text-2xl font-semibold">1m 48s</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <CardTitle className="text-base">Recent submissions</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-1.5 h-4 w-4" /> Export CSV
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">Team size</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RESPONSES.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground">{r.id}</TableCell>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">{r.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{r.team}</TableCell>
                        <TableCell className="text-muted-foreground">{r.date}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
