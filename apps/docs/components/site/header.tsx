"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/site/logo"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { UpdatesBell } from "@/components/site/updates-bell"

const NAV: {
  href: string
  label: string
  match: (pathname: string) => boolean
}[] = [
  {
    href: "/docs",
    label: "Docs",
    match: (p) =>
      p === "/docs" || (p.startsWith("/docs/") && p !== "/docs/cli"),
  },
  {
    href: "/components",
    label: "Components",
    match: (p) => p.startsWith("/components"),
  },
  {
    href: "/templates",
    label: "Templates",
    match: (p) => p.startsWith("/templates"),
  },
  {
    href: "/docs/cli",
    label: "CLI",
    match: (p) => p === "/docs/cli",
  },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-7">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight"
            aria-label="cano home"
          >
            <Logo className="size-6" />
            cano
          </Link>
          <nav
            aria-label="Main"
            className="flex items-center gap-5 text-sm sm:gap-6"
          >
            {NAV.map((item) => {
              const active = item.match(pathname)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "transition-colors hover:text-foreground",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                  {item.label === "CLI" ? (
                    <span className="ml-1.5 hidden rounded-full bg-primary px-1.5 py-0.5 align-middle text-[10px] font-medium leading-none text-primary-foreground sm:inline-block">
                      New
                    </span>
                  ) : null}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="https://github.com/rakibulism/cano-ui"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <UpdatesBell />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
