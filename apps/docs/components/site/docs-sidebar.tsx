"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export interface DocsNavItem {
  href: string
  label: string
}

export const DOCS_NAV: { title: string; items: DocsNavItem[] }[] = [
  {
    title: "Getting started",
    items: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
    ],
  },
  {
    title: "Guides",
    items: [{ href: "/docs/components", label: "Using components" }],
  },
  {
    title: "Command line",
    items: [{ href: "/docs/cli", label: "Cano CLI" }],
  },
  {
    title: "Releases",
    items: [
      { href: "/docs/changelog", label: "Changelog" },
      { href: "/docs/updates", label: "Updates" },
    ],
  },
]

/** Flat, ordered list of doc pages — used by the prev/next pager. */
export const DOCS_FLAT: DocsNavItem[] = DOCS_NAV.flatMap((g) => g.items)

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      {DOCS_NAV.map((group) => (
        <div key={group.title}>
          <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {group.title}
          </p>
          <ul className="mt-2 flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
