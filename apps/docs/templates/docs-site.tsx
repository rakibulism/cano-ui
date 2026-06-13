"use client"

import * as React from "react"
import {
  Search,
  BookOpen,
  Rocket,
  Terminal,
  Code2,
  Boxes,
  Layers,
  Plug,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  ChevronRight,
  FileText,
  Github,
  Hash,
  Star,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const NAV_TREE = [
  {
    group: "Getting Started",
    items: [
      { label: "Introduction", href: "#intro", active: true },
      { label: "Installation", href: "#install" },
      { label: "Quick Start", href: "#quick" },
      { label: "Project Structure", href: "#structure" },
    ],
  },
  {
    group: "Core Concepts",
    items: [
      { label: "Routing", href: "#routing" },
      { label: "Data Fetching", href: "#data" },
      { label: "Caching", href: "#caching" },
      { label: "Middleware", href: "#middleware" },
    ],
  },
  {
    group: "API Reference",
    items: [
      { label: "CLI Commands", href: "#cli" },
      { label: "Configuration", href: "#config" },
      { label: "Hooks", href: "#hooks" },
      { label: "Webhooks", href: "#webhooks" },
    ],
  },
  {
    group: "Guides",
    items: [
      { label: "Authentication", href: "#auth" },
      { label: "Deployment", href: "#deploy" },
      { label: "Testing", href: "#testing" },
    ],
  },
]

const START_CARDS = [
  {
    icon: Rocket,
    title: "Quick Start",
    desc: "Spin up a new project and see your first page render in under two minutes.",
    meta: "2 min read",
  },
  {
    icon: Terminal,
    title: "CLI Reference",
    desc: "Every command, flag, and option for the orbit command-line interface.",
    meta: "Reference",
  },
  {
    icon: Boxes,
    title: "Core Concepts",
    desc: "Understand routing, the rendering pipeline, and how the cache layer works.",
    meta: "8 min read",
  },
  {
    icon: Plug,
    title: "Integrations",
    desc: "Connect databases, auth providers, and queues with first-party adapters.",
    meta: "Guides",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    desc: "Best practices for secrets, headers, and protecting your endpoints.",
    meta: "6 min read",
  },
  {
    icon: Layers,
    title: "Architecture",
    desc: "A tour of the runtime, the build graph, and how deploys are isolated.",
    meta: "Deep dive",
  },
]

const POPULAR_GUIDES = [
  { title: "Migrating from v2 to v3", cat: "Upgrade", reads: "24.1k" },
  { title: "Deploying to the edge network", cat: "Deployment", reads: "18.7k" },
  { title: "Type-safe environment variables", cat: "Config", reads: "15.3k" },
  { title: "Streaming server responses", cat: "Data Fetching", reads: "12.9k" },
  { title: "Setting up incremental cache", cat: "Caching", reads: "9.4k" },
]

const INSTALL_TABS = [
  { id: "npm", label: "npm", cmd: "npm install @orbit/core" },
  { id: "pnpm", label: "pnpm", cmd: "pnpm add @orbit/core" },
  { id: "yarn", label: "yarn", cmd: "yarn add @orbit/core" },
  { id: "bun", label: "bun", cmd: "bun add @orbit/core" },
]

const CODE_SNIPPET = `import { createApp } from "@orbit/core"

const app = createApp({
  routes: "./src/routes",
  cache: "incremental",
})

app.get("/hello", (req) => {
  return { message: "Hello from Orbit" }
})

app.listen(3000)`

const ON_PAGE = [
  { label: "Overview", href: "#intro" },
  { label: "Why Orbit", href: "#why" },
  { label: "Installation", href: "#install" },
  { label: "Your first route", href: "#first" },
  { label: "Next steps", href: "#next" },
]

export default function DocsSiteTemplate() {
  const [activeInstall, setActiveInstall] = React.useState("npm")
  const [copied, setCopied] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const activeCmd =
    INSTALL_TABS.find((t) => t.id === activeInstall)?.cmd ?? INSTALL_TABS[0].cmd

  const handleCopy = () => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Orbit Docs</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
              v3.2
            </Badge>
          </div>

          <div className="relative ml-auto hidden w-full max-w-sm md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs..."
              className="pl-9 pr-12"
              aria-label="Search documentation"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:block">
              ⌘K
            </kbd>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            <Button variant="ghost" size="sm">
              Guides
            </Button>
            <Button variant="ghost" size="sm">
              API
            </Button>
            <Button variant="ghost" size="sm">
              Blog
            </Button>
          </nav>

          <Button variant="ghost" size="icon" aria-label="View on GitHub">
            <Github className="h-4 w-4" />
          </Button>
          <Button size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 sm:px-6">
        {/* Left docs nav tree */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto border-r py-8 pr-4 lg:block">
          <nav className="space-y-7">
            {NAV_TREE.map((section) => (
              <div key={section.group}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.group}
                </p>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                          item.active &&
                            "bg-primary/10 font-medium text-primary hover:bg-primary/10 hover:text-primary"
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 py-8 lg:py-10">
          <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Docs</span>
            <ChevronRight className="h-3 w-3" />
            <span>Getting Started</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Introduction</span>
          </div>

          {/* Intro prose */}
          <section id="intro" className="max-w-3xl">
            <Badge variant="outline" className="mb-4">
              Getting Started
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Build fast, ship faster with Orbit
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Orbit is a full-stack framework for building web applications with a
              file-based router, an incremental cache, and a runtime that deploys to the
              edge. This guide walks you through everything from your first install to
              your first production deploy.
            </p>
            <p id="why" className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If you are new here, start with the cards below. They are the fastest path
              from zero to a running app. Already shipping? Jump straight to the API
              reference in the sidebar.
            </p>
          </section>

          {/* Getting-started card grid */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight">Start building</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a track. Each one is self-contained and takes just a few minutes.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {START_CARDS.map((card) => (
                <Card
                  key={card.title}
                  className="group cursor-pointer transition-colors hover:border-primary"
                >
                  <CardHeader>
                    <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <card.icon className="h-4.5 w-4.5" />
                    </div>
                    <CardTitle className="flex items-center justify-between text-base">
                      {card.title}
                      <ArrowRight className="h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </CardTitle>
                    <CardDescription>{card.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-xs font-medium text-muted-foreground">
                      {card.meta}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Installation with tabbed code block */}
          <section id="install" className="mt-12 max-w-3xl scroll-mt-20">
            <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add the core package to your project using your preferred package manager.
            </p>

            <div className="mt-4 overflow-hidden rounded-lg border bg-card">
              <div className="flex items-center justify-between border-b bg-muted/30 pl-2 pr-2">
                <div className="flex">
                  {INSTALL_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveInstall(tab.id)}
                      className={cn(
                        "border-b-2 px-3 py-2.5 text-xs font-medium transition-colors",
                        activeInstall === tab.id
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleCopy}
                  aria-label="Copy install command"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 font-mono text-sm">
                <span className="text-muted-foreground">$</span>
                <span>{activeCmd}</span>
              </div>
            </div>
          </section>

          {/* Code snippet block */}
          <section id="first" className="mt-10 max-w-3xl scroll-mt-20">
            <h2 className="text-xl font-semibold tracking-tight">Your first route</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Create an entry file and define a handler. Orbit wires up the server for you.
            </p>
            <div className="mt-4 overflow-hidden rounded-lg border bg-card">
              <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Code2 className="h-3.5 w-3.5" />
                  <span className="font-mono">src/app.ts</span>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  TypeScript
                </Badge>
              </div>
              <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed">
                <code className="font-mono text-foreground">{CODE_SNIPPET}</code>
              </pre>
            </div>
            <div className="mt-3 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Tip:</span> run{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  orbit dev
                </code>{" "}
                and visit localhost:3000/hello to see it live with hot reload.
              </p>
            </div>
          </section>

          {/* Popular guides */}
          <section id="next" className="mt-12 max-w-3xl scroll-mt-20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Popular guides</h2>
              <Button variant="link" size="sm" className="h-auto p-0">
                Browse all
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="mt-4 divide-y rounded-lg border">
              {POPULAR_GUIDES.map((guide, i) => (
                <a
                  key={guide.title}
                  href="#guide"
                  className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/30"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{guide.title}</p>
                    <p className="text-xs text-muted-foreground">{guide.cat}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3" />
                    {guide.reads}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </section>

          <Separator className="my-10 max-w-3xl" />

          <div className="flex max-w-3xl flex-col gap-4 sm:flex-row">
            <a
              href="#prev"
              className="flex flex-1 flex-col rounded-lg border p-4 transition-colors hover:border-primary"
            >
              <span className="text-xs text-muted-foreground">Previous</span>
              <span className="mt-1 text-sm font-medium">Overview</span>
            </a>
            <a
              href="#install"
              className="flex flex-1 flex-col items-end rounded-lg border p-4 text-right transition-colors hover:border-primary"
            >
              <span className="text-xs text-muted-foreground">Next</span>
              <span className="mt-1 text-sm font-medium">Installation</span>
            </a>
          </div>
        </main>

        {/* On this page (right rail) */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-48 shrink-0 py-10 xl:block">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Hash className="h-3 w-3" />
            On this page
          </p>
          <ul className="space-y-1.5 border-l">
            {ON_PAGE.map((item, i) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={cn(
                    "-ml-px block border-l-2 pl-3 text-sm transition-colors",
                    i === 0
                      ? "border-primary font-medium text-primary"
                      : "border-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Separator className="my-5" />
          <a
            href="#edit"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            Edit this page
          </a>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BookOpen className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm text-muted-foreground">
              © 2024 Orbit. Built for builders.
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#docs" className="hover:text-foreground">
              Documentation
            </a>
            <a href="#changelog" className="hover:text-foreground">
              Changelog
            </a>
            <a href="#community" className="hover:text-foreground">
              Community
            </a>
            <a href="#status" className="hover:text-foreground">
              Status
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
