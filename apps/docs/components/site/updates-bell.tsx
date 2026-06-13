"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Bug,
  FileText,
  Package,
  Sparkles,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UPDATES, LATEST_UPDATE_ID, type UpdateType } from "@/lib/updates"
import { NotificationCenter } from "@/registry/ui/notification-center"

const TYPE_ICON: Record<UpdateType, LucideIcon> = {
  feature: Sparkles,
  fix: Bug,
  component: Package,
  docs: FileText,
  chore: Wrench,
}

const STORAGE_KEY = "updates-seen"
const HIGHLIGHT_KEY = "updates-highlight-seen"

export function UpdatesBell() {
  const router = useRouter()
  // Until mounted, treat everything as seen so SSR and the first client render
  // match (no hydration mismatch, no badge flash).
  const [seenId, setSeenId] = React.useState(LATEST_UPDATE_ID)
  const [showHighlight, setShowHighlight] = React.useState(false)
  const calloutRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const stored = Number(raw)
    let currentSeen = LATEST_UPDATE_ID
    if (raw !== null && Number.isFinite(stored)) {
      currentSeen = stored
      setSeenId(stored)
    } else {
      // First visit: start caught up so returning visitors only see what's new.
      localStorage.setItem(STORAGE_KEY, String(LATEST_UPDATE_ID))
    }

    // "What's new" nudge: once per session, only when something is unread.
    // The session flag is set when the nudge actually shows (not here), so the
    // timer survives React Strict Mode's mount/cleanup/mount in development.
    const hasUnread = UPDATES.some((u) => u.id > currentSeen)
    if (!hasUnread || sessionStorage.getItem(HIGHLIGHT_KEY)) return
    const show = setTimeout(() => {
      sessionStorage.setItem(HIGHLIGHT_KEY, "1")
      setShowHighlight(true)
    }, 600)
    const hide = setTimeout(() => setShowHighlight(false), 9600)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  // Dismiss the nudge on Escape or any click outside it (incl. opening the bell).
  React.useEffect(() => {
    if (!showHighlight) return
    const onDown = (e: PointerEvent) => {
      if (calloutRef.current && !calloutRef.current.contains(e.target as Node)) {
        setShowHighlight(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowHighlight(false)
    }
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [showHighlight])

  const unreadUpdates = UPDATES.filter((u) => u.id > seenId)

  const notifications = UPDATES.map((u) => ({
    id: String(u.id),
    title: u.title,
    description: u.description,
    timestamp: `${u.date} · ${u.time}`,
    read: u.id <= seenId,
    icon: TYPE_ICON[u.type],
  }))

  function markAllRead() {
    setSeenId(LATEST_UPDATE_ID)
    localStorage.setItem(STORAGE_KEY, String(LATEST_UPDATE_ID))
  }

  return (
    <div className="relative">
      <NotificationCenter
        notifications={notifications}
        onMarkAllRead={markAllRead}
        onNotificationClick={() => router.push("/docs/updates")}
        emptyMessage="You're all caught up."
        className="size-8"
      />

      {showHighlight && unreadUpdates.length > 0 ? (
        <div
          ref={calloutRef}
          role="dialog"
          aria-label="What's new"
          className="absolute right-0 top-full z-40 mt-2 w-72 max-w-[calc(100vw-2rem)] origin-top-right rounded-lg border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in zoom-in-95 slide-in-from-top-1 duration-200"
        >
          <span
            aria-hidden="true"
            className="absolute -top-1.5 right-2.5 size-3 rotate-45 rounded-[2px] border-l border-t border-border bg-popover"
          />
          <div className="flex items-start justify-between gap-2">
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="size-4 text-muted-foreground" aria-hidden="true" />
              What&rsquo;s new
            </p>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setShowHighlight(false)}
              className="-mr-1 -mt-0.5 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {unreadUpdates.length} new update
            {unreadUpdates.length === 1 ? "" : "s"} since your last visit.
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {unreadUpdates.slice(0, 2).map((u) => {
              const Icon = TYPE_ICON[u.type]
              return (
                <li key={u.id} className="flex items-center gap-2 text-sm">
                  <Icon
                    className="size-3.5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="truncate">{u.title}</span>
                </li>
              )
            })}
          </ul>
          <Button
            size="sm"
            className="mt-3 w-full"
            onClick={() => {
              setShowHighlight(false)
              router.push("/docs/updates")
            }}
          >
            See what&rsquo;s changed
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      ) : null}
    </div>
  )
}
