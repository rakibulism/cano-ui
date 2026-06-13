"use client"

import * as React from "react"
import {
  Folder,
  FolderOpen,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  File,
  HardDrive,
  Upload,
  Search,
  LayoutGrid,
  List,
  ChevronRight,
  Star,
  Clock,
  Trash2,
  Share2,
  Plus,
  MoreVertical,
  Download,
  Cloud,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

type FileKind =
  | "folder"
  | "doc"
  | "image"
  | "video"
  | "audio"
  | "archive"
  | "sheet"
  | "other"

type FileRow = {
  id: string
  name: string
  kind: FileKind
  size: string
  modified: string
  owner: string
  starred?: boolean
}

const sidebarFolders = [
  { id: "all", label: "All files", icon: HardDrive, count: 248 },
  { id: "recent", label: "Recent", icon: Clock, count: 18 },
  { id: "starred", label: "Starred", icon: Star, count: 7 },
  { id: "shared", label: "Shared with me", icon: Share2, count: 12 },
  { id: "trash", label: "Trash", icon: Trash2, count: 3 },
]

const projectFolders = [
  { id: "design", label: "Design assets", count: 64 },
  { id: "marketing", label: "Marketing 2025", count: 31 },
  { id: "finance", label: "Finance", count: 22 },
  { id: "engineering", label: "Engineering", count: 87 },
]

const files: FileRow[] = [
  { id: "f1", name: "Brand Guidelines", kind: "folder", size: "24 items", modified: "Apr 2", owner: "You" },
  { id: "f2", name: "Q2 Campaign", kind: "folder", size: "11 items", modified: "Apr 1", owner: "Lena Ortiz" },
  { id: "f3", name: "homepage-hero.png", kind: "image", size: "4.2 MB", modified: "Mar 31", owner: "You", starred: true },
  { id: "f4", name: "product-demo.mp4", kind: "video", size: "182 MB", modified: "Mar 30", owner: "Theo Park" },
  { id: "f5", name: "Investor Deck.pdf", kind: "doc", size: "8.1 MB", modified: "Mar 28", owner: "You", starred: true },
  { id: "f6", name: "Budget-2025.xlsx", kind: "sheet", size: "612 KB", modified: "Mar 27", owner: "Mara Quinn" },
  { id: "f7", name: "release-notes.docx", kind: "doc", size: "94 KB", modified: "Mar 26", owner: "You" },
  { id: "f8", name: "soundtrack-loop.mp3", kind: "audio", size: "6.4 MB", modified: "Mar 24", owner: "Theo Park" },
  { id: "f9", name: "assets-bundle.zip", kind: "archive", size: "44 MB", modified: "Mar 22", owner: "You" },
  { id: "f10", name: "moodboard.jpg", kind: "image", size: "2.8 MB", modified: "Mar 21", owner: "Lena Ortiz" },
  { id: "f11", name: "schema.sql", kind: "other", size: "18 KB", modified: "Mar 19", owner: "Theo Park" },
  { id: "f12", name: "onboarding.fig", kind: "other", size: "11 MB", modified: "Mar 18", owner: "You", starred: true },
]

const kindMeta: Record<FileKind, { icon: React.ElementType; label: string }> = {
  folder: { icon: Folder, label: "Folder" },
  doc: { icon: FileText, label: "Document" },
  image: { icon: FileImage, label: "Image" },
  video: { icon: FileVideo, label: "Video" },
  audio: { icon: FileAudio, label: "Audio" },
  archive: { icon: FileArchive, label: "Archive" },
  sheet: { icon: FileSpreadsheet, label: "Spreadsheet" },
  other: { icon: File, label: "File" },
}

export default function FileManager() {
  const [view, setView] = React.useState<"grid" | "list">("grid")
  const [activeFolder, setActiveFolder] = React.useState("all")
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<string[]>(["f5"])

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const visible = files.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  )

  const usedGb = 182
  const totalGb = 256
  const usedPct = Math.round((usedGb / totalGb) * 100)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex items-center gap-2 px-5 py-4">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Cloud className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Vault Drive</p>
            <p className="text-xs text-muted-foreground">Workspace storage</p>
          </div>
        </div>

        <div className="px-3">
          <Button className="w-full justify-start gap-2" size="sm">
            <Plus className="size-4" />
            New
          </Button>
        </div>

        <nav className="mt-4 flex flex-col gap-0.5 px-2">
          {sidebarFolders.map((item) => {
            const Icon = item.icon
            const active = activeFolder === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveFolder(item.id)}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className="size-4" />
                  {item.label}
                </span>
                <span className="text-xs tabular-nums">{item.count}</span>
              </button>
            )
          })}
        </nav>

        <Separator className="my-4" />

        <div className="px-4">
          <p className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Folders
          </p>
          <div className="mt-2 flex flex-col gap-0.5">
            {projectFolders.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveFolder(p.id)}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                  activeFolder === p.id && "bg-accent text-foreground"
                )}
              >
                <span className="flex items-center gap-3">
                  <FolderOpen className="size-4" />
                  {p.label}
                </span>
                <span className="text-xs tabular-nums">{p.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4">
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <HardDrive className="size-4 text-primary" />
                <span className="text-sm font-medium">Storage</span>
              </div>
              <Progress value={usedPct} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {usedGb} GB of {totalGb} GB used
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Upgrade plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex flex-col gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur md:flex-row md:items-center md:justify-between md:px-6">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search files and folders"
              className="pl-9"
              aria-label="Search files"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button className="gap-2">
              <Upload className="size-4" />
              Upload
            </Button>
            <Avatar className="size-9">
              <AvatarImage src="" alt="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 md:px-6">
          {/* Breadcrumb + view toggle */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1 text-sm text-muted-foreground"
            >
              <span className="font-medium text-foreground">Workspace</span>
              <ChevronRight className="size-4" />
              <span>Design assets</span>
              <ChevronRight className="size-4" />
              <span className="font-medium text-foreground">2025</span>
            </nav>

            <div className="flex items-center gap-2">
              {selected.length > 0 && (
                <div className="mr-1 flex items-center gap-1.5 rounded-md border bg-muted/50 px-2 py-1 text-xs">
                  <Badge variant="secondary">{selected.length} selected</Badge>
                  <Button variant="ghost" size="icon" aria-label="Download selected">
                    <Download className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Share selected">
                    <Share2 className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Delete selected">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              )}
              <div className="flex rounded-md border p-0.5">
                <Button
                  variant={view === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="size-8"
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                >
                  <LayoutGrid className="size-4" />
                </Button>
                <Button
                  variant={view === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="size-8"
                  onClick={() => setView("list")}
                  aria-label="List view"
                  aria-pressed={view === "list"}
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Folder quick cards */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {projectFolders.map((p) => (
              <Card
                key={p.id}
                className="cursor-pointer transition-colors hover:border-primary"
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Folder className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.count} files
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Files */}
          {view === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((f) => {
                const Icon = kindMeta[f.kind].icon
                const isSel = selected.includes(f.id)
                return (
                  <Card
                    key={f.id}
                    onClick={() => toggle(f.id)}
                    className={cn(
                      "group cursor-pointer transition-all hover:shadow-sm",
                      isSel && "border-primary ring-1 ring-primary"
                    )}
                  >
                    <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
                      <div
                        className={cn(
                          "flex size-11 items-center justify-center rounded-lg",
                          f.kind === "folder"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="flex items-center gap-1">
                        {f.starred && (
                          <Star className="size-4 fill-primary text-primary" />
                        )}
                        <Checkbox
                          checked={isSel}
                          onClick={(e) => e.stopPropagation()}
                          onCheckedChange={() => toggle(f.id)}
                          aria-label={`Select ${f.name}`}
                          className="opacity-0 transition-opacity group-hover:opacity-100 data-[state=checked]:opacity-100"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="truncate text-sm font-medium">{f.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {f.size} &middot; {f.modified}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <span className="w-4" />
                  <span>Name</span>
                  <span className="hidden w-24 sm:block">Owner</span>
                  <span className="hidden w-20 text-right md:block">Size</span>
                  <span className="w-20 text-right">Modified</span>
                </div>
                {visible.map((f) => {
                  const Icon = kindMeta[f.kind].icon
                  const isSel = selected.includes(f.id)
                  return (
                    <div
                      key={f.id}
                      onClick={() => toggle(f.id)}
                      className={cn(
                        "grid cursor-pointer grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b px-4 py-2.5 text-sm transition-colors last:border-0 hover:bg-accent",
                        isSel && "bg-primary/10"
                      )}
                    >
                      <Checkbox
                        checked={isSel}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => toggle(f.id)}
                        aria-label={`Select ${f.name}`}
                      />
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon
                          className={cn(
                            "size-4 shrink-0",
                            f.kind === "folder"
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        />
                        <span className="truncate font-medium">{f.name}</span>
                        {f.starred && (
                          <Star className="size-3.5 shrink-0 fill-primary text-primary" />
                        )}
                      </span>
                      <span className="hidden w-24 truncate text-muted-foreground sm:block">
                        {f.owner}
                      </span>
                      <span className="hidden w-20 text-right text-muted-foreground tabular-nums md:block">
                        {f.size}
                      </span>
                      <span className="flex w-20 items-center justify-end gap-1 text-right text-muted-foreground tabular-nums">
                        {f.modified}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`More actions for ${f.name}`}
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}

          {/* Storage summary (mobile / extra) */}
          <Card className="mt-6 lg:hidden">
            <CardHeader>
              <CardTitle className="text-base">Storage</CardTitle>
              <CardDescription>
                {usedGb} GB of {totalGb} GB used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={usedPct} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
