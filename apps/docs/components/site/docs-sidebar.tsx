"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

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

function CollapsibleGroup({
  title,
  count,
  defaultOpen = true,
  children,
}: {
  title: string
  count?: number
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const storageKey = `docs-group:${title}`
  const [open, setOpen] = React.useState(defaultOpen)

  React.useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved !== null) setOpen(saved === "1")
  }, [storageKey])

  function toggle() {
    setOpen((prev) => {
      const next = !prev
      try {
        localStorage.setItem(storageKey, next ? "1" : "0")
      } catch {
        // ignore (private mode, etc.)
      }
      return next
    })
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        <span className="flex items-center gap-1.5">
          {title}
          {count !== undefined ? (
            <span className="rounded-full bg-muted px-1.5 text-[10px] font-medium tracking-normal tabular-nums normal-case">
              {count}
            </span>
          ) : null}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 shrink-0 transition-transform duration-200",
            !open && "-rotate-90"
          )}
        />
      </button>
      {open ? <div className="mt-1">{children}</div> : null}
    </div>
  )
}

export function DocsSidebar({
  components = [],
}: {
  components?: { name: string; title: string }[]
}) {
  const pathname = usePathname()

  const linkClass = (active: boolean) =>
    cn(
      "block rounded-md px-2 py-1.5 text-sm transition-colors",
      active
        ? "bg-accent font-medium text-foreground"
        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
    )

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-4">
      {DOCS_NAV.map((group) => (
        <CollapsibleGroup key={group.title} title={group.title}>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={linkClass(pathname === item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </CollapsibleGroup>
      ))}

      {components.length > 0 ? (
        <CollapsibleGroup
          title="All components"
          count={components.length}
          defaultOpen={false}
        >
          <ul className="flex flex-col gap-0.5">
            {components.map((c) => {
              const href = `/components/${c.name}`
              return (
                <li key={c.name}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    className={linkClass(pathname === href)}
                  >
                    {c.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </CollapsibleGroup>
      ) : null}
    </nav>
  )
}
