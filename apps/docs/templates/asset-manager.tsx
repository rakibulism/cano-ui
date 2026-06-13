"use client"

import * as React from "react"
import {
  Search,
  LayoutGrid,
  List,
  Image as ImageIcon,
  Film,
  FileText,
  Music,
  Folder,
  Plus,
  Upload,
  Download,
  Share2,
  Star,
  Tag,
  X,
  Sparkles,
  HardDrive,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

type AssetType = "image" | "video" | "doc" | "audio"

type Asset = {
  id: string
  name: string
  type: AssetType
  size: string
  dimensions: string
  collection: string
  uploaded: string
  author: string
  starred: boolean
  tags: string[]
}

const COLLECTIONS = [
  { id: "all", label: "All assets", count: 48, icon: HardDrive },
  { id: "brand", label: "Brand & Logos", count: 12, icon: Folder },
  { id: "product", label: "Product Shots", count: 18, icon: Folder },
  { id: "campaigns", label: "Campaign 2026", count: 9, icon: Folder },
  { id: "video", label: "Video Library", count: 6, icon: Folder },
  { id: "docs", label: "Documents", count: 3, icon: Folder },
] as const

const TYPE_FILTERS: { id: AssetType | "all"; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "Everything", icon: Sparkles },
  { id: "image", label: "Images", icon: ImageIcon },
  { id: "video", label: "Video", icon: Film },
  { id: "doc", label: "Documents", icon: FileText },
  { id: "audio", label: "Audio", icon: Music },
]

const ASSETS: Asset[] = [
  { id: "a1", name: "hero-banner-spring.png", type: "image", size: "4.2 MB", dimensions: "2400 x 1350", collection: "campaigns", uploaded: "Apr 2", author: "Mara Voss", starred: true, tags: ["hero", "campaign", "spring"] },
  { id: "a2", name: "logo-primary-dark.svg", type: "image", size: "82 KB", dimensions: "Vector", collection: "brand", uploaded: "Jan 14", author: "Design Sys", starred: true, tags: ["logo", "brand"] },
  { id: "a3", name: "product-launch-trailer.mp4", type: "video", size: "118 MB", dimensions: "1920 x 1080", collection: "video", uploaded: "Mar 28", author: "Leo Tran", starred: false, tags: ["video", "launch"] },
  { id: "a4", name: "press-kit-2026.pdf", type: "doc", size: "2.1 MB", dimensions: "24 pages", collection: "docs", uploaded: "Feb 9", author: "Comms Team", starred: false, tags: ["press", "kit"] },
  { id: "a5", name: "studio-shot-04.jpg", type: "image", size: "6.8 MB", dimensions: "3600 x 2400", collection: "product", uploaded: "Mar 11", author: "Ada Quinn", starred: false, tags: ["product", "studio"] },
  { id: "a6", name: "brand-anthem.wav", type: "audio", size: "31 MB", dimensions: "2:14", collection: "brand", uploaded: "Jan 30", author: "Sound Lab", starred: false, tags: ["audio", "brand"] },
  { id: "a7", name: "lifestyle-outdoor.jpg", type: "image", size: "5.1 MB", dimensions: "3200 x 2133", collection: "product", uploaded: "Apr 1", author: "Ada Quinn", starred: true, tags: ["lifestyle", "product"] },
  { id: "a8", name: "social-loop-15s.mp4", type: "video", size: "24 MB", dimensions: "1080 x 1080", collection: "campaigns", uploaded: "Mar 19", author: "Leo Tran", starred: false, tags: ["social", "loop"] },
  { id: "a9", name: "icon-set-outline.svg", type: "image", size: "144 KB", dimensions: "Vector", collection: "brand", uploaded: "Feb 22", author: "Design Sys", starred: false, tags: ["icons", "brand"] },
  { id: "a10", name: "annual-report.pdf", type: "doc", size: "8.4 MB", dimensions: "52 pages", collection: "docs", uploaded: "Jan 8", author: "Finance", starred: false, tags: ["report", "doc"] },
  { id: "a11", name: "packshot-bundle.jpg", type: "image", size: "7.2 MB", dimensions: "4000 x 2667", collection: "product", uploaded: "Mar 30", author: "Ada Quinn", starred: false, tags: ["packshot", "product"] },
  { id: "a12", name: "podcast-intro.wav", type: "audio", size: "12 MB", dimensions: "0:48", collection: "campaigns", uploaded: "Apr 3", author: "Sound Lab", starred: true, tags: ["audio", "intro"] },
]

const TYPE_META: Record<AssetType, { icon: React.ElementType; label: string }> = {
  image: { icon: ImageIcon, label: "Image" },
  video: { icon: Film, label: "Video" },
  doc: { icon: FileText, label: "Document" },
  audio: { icon: Music, label: "Audio" },
}

function TypeThumb({ type, className }: { type: AssetType; className?: string }) {
  const Icon = TYPE_META[type].icon
  return (
    <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", className)}>
      <Icon className="h-7 w-7" />
    </div>
  )
}

export default function AssetManagerTemplate() {
  const [collection, setCollection] = React.useState<string>("all")
  const [typeFilter, setTypeFilter] = React.useState<AssetType | "all">("all")
  const [query, setQuery] = React.useState("")
  const [view, setView] = React.useState<"grid" | "list">("grid")
  const [selectedId, setSelectedId] = React.useState<string>("a1")

  const filtered = React.useMemo(() => {
    return ASSETS.filter((a) => {
      const inCollection = collection === "all" || a.collection === collection
      const inType = typeFilter === "all" || a.type === typeFilter
      const q = query.trim().toLowerCase()
      const inQuery =
        q === "" ||
        a.name.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      return inCollection && inType && inQuery
    })
  }, [collection, typeFilter, query])

  const selected = React.useMemo(
    () => ASSETS.find((a) => a.id === selectedId) ?? null,
    [selectedId]
  )

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Collections sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <HardDrive className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Vault DAM</span>
        </div>
        <Separator />
        <div className="px-4 py-4">
          <Button className="w-full justify-start gap-2" size="sm">
            <Plus className="h-4 w-4" />
            New collection
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Collections
          </p>
          {COLLECTIONS.map((c) => {
            const Icon = c.icon
            const active = collection === c.id
            return (
              <button
                key={c.id}
                onClick={() => setCollection(c.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {c.label}
                </span>
                <span className="text-xs tabular-nums">{c.count}</span>
              </button>
            )
          })}
        </nav>
        <div className="p-4">
          <div className="rounded-lg border bg-card p-3">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Storage</span>
              <span className="tabular-nums">68.2 / 100 GB</span>
            </div>
            <Progress value={68} className="h-1.5" />
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search assets and tags..."
              className="pl-9"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden gap-2 sm:inline-flex">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <div className="flex items-center rounded-md border p-0.5">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                aria-label="Grid view"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                aria-label="List view"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Asset browser */}
          <main className="flex min-w-0 flex-1 flex-col">
            {/* Filter chips */}
            <div className="flex flex-wrap items-center gap-2 border-b px-4 py-3 sm:px-6">
              {TYPE_FILTERS.map((f) => {
                const Icon = f.icon
                const active = typeFilter === f.id
                return (
                  <button
                    key={f.id}
                    onClick={() => setTypeFilter(f.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {f.label}
                  </button>
                )
              })}
              <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                {filtered.length} {filtered.length === 1 ? "asset" : "assets"}
              </span>
            </div>

            {/* Content */}
            <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
              {filtered.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 py-20 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Search className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">No matching assets</p>
                  <p className="text-xs text-muted-foreground">
                    Try a different collection, type, or search term.
                  </p>
                </div>
              ) : view === "grid" ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((a) => {
                    const Icon = TYPE_META[a.type].icon
                    const active = a.id === selectedId
                    return (
                      <button
                        key={a.id}
                        onClick={() => setSelectedId(a.id)}
                        className={cn(
                          "group flex flex-col overflow-hidden rounded-lg border bg-card text-left transition-all hover:shadow-sm",
                          active && "ring-2 ring-primary"
                        )}
                      >
                        <div className="relative">
                          <TypeThumb type={a.type} className="aspect-[4/3] w-full" />
                          {a.starred && (
                            <Star className="absolute right-2 top-2 h-4 w-4 fill-primary text-primary" />
                          )}
                          <Badge
                            variant="secondary"
                            className="absolute left-2 top-2 gap-1 text-[10px]"
                          >
                            <Icon className="h-3 w-3" />
                            {TYPE_META[a.type].label}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-1 p-3">
                          <p className="truncate text-sm font-medium">{a.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {a.dimensions} &middot; {a.size}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2 font-medium">Name</th>
                        <th className="hidden px-4 py-2 font-medium sm:table-cell">Type</th>
                        <th className="hidden px-4 py-2 font-medium md:table-cell">Size</th>
                        <th className="hidden px-4 py-2 font-medium lg:table-cell">Uploaded</th>
                        <th className="hidden px-4 py-2 font-medium lg:table-cell">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((a) => {
                        const Icon = TYPE_META[a.type].icon
                        const active = a.id === selectedId
                        return (
                          <tr
                            key={a.id}
                            onClick={() => setSelectedId(a.id)}
                            className={cn(
                              "cursor-pointer border-t transition-colors hover:bg-accent",
                              active && "bg-primary/5"
                            )}
                          >
                            <td className="px-4 py-2.5">
                              <span className="flex items-center gap-2">
                                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <span className="truncate font-medium">{a.name}</span>
                                {a.starred && (
                                  <Star className="h-3.5 w-3.5 shrink-0 fill-primary text-primary" />
                                )}
                              </span>
                            </td>
                            <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">
                              {TYPE_META[a.type].label}
                            </td>
                            <td className="hidden px-4 py-2.5 text-muted-foreground md:table-cell">
                              {a.size}
                            </td>
                            <td className="hidden px-4 py-2.5 text-muted-foreground lg:table-cell">
                              {a.uploaded}
                            </td>
                            <td className="hidden px-4 py-2.5 text-muted-foreground lg:table-cell">
                              {a.author}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>

          {/* Details panel */}
          <aside className="hidden w-80 shrink-0 flex-col border-l bg-muted/20 xl:flex">
            {selected ? (
              <div className="flex flex-1 flex-col overflow-auto">
                <div className="flex items-center justify-between px-5 py-4">
                  <p className="text-sm font-semibold">Details</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    aria-label="Close details"
                    onClick={() => setSelectedId("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Separator />
                <div className="p-5">
                  <TypeThumb type={selected.type} className="aspect-video w-full rounded-lg border" />
                  <h2 className="mt-4 break-words text-base font-semibold">
                    {selected.name}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {TYPE_META[selected.type].label} &middot; {selected.size}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1 gap-1.5">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Share asset">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Star asset">
                      <Star
                        className={cn(
                          "h-4 w-4",
                          selected.starred && "fill-primary text-primary"
                        )}
                      />
                    </Button>
                  </div>

                  <Separator className="my-5" />

                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Dimensions</dt>
                      <dd className="font-medium tabular-nums">{selected.dimensions}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">File size</dt>
                      <dd className="font-medium tabular-nums">{selected.size}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Author</dt>
                      <dd className="font-medium">{selected.author}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> Uploaded
                      </dt>
                      <dd className="font-medium">{selected.uploaded}</dd>
                    </div>
                  </dl>

                  <Separator className="my-5" />

                  <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Tag className="h-3.5 w-3.5" />
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tags.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">No asset selected</p>
                <p className="text-xs text-muted-foreground">
                  Pick an asset to see its metadata and tags.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
