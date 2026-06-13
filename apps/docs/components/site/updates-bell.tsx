"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Bug,
  FileText,
  Package,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react"

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

export function UpdatesBell() {
  const router = useRouter()
  // Until mounted, treat everything as seen so SSR and the first client render
  // match (no hydration mismatch, no badge flash).
  const [seenId, setSeenId] = React.useState(LATEST_UPDATE_ID)

  React.useEffect(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY))
    if (Number.isFinite(stored) && localStorage.getItem(STORAGE_KEY) !== null) {
      setSeenId(stored)
    } else {
      // First visit: start caught up so returning visitors only see what's new.
      localStorage.setItem(STORAGE_KEY, String(LATEST_UPDATE_ID))
    }
  }, [])

  const notifications = UPDATES.map((u) => ({
    id: String(u.id),
    title: u.title,
    description: u.description,
    timestamp: u.date,
    read: u.id <= seenId,
    icon: TYPE_ICON[u.type],
  }))

  function markAllRead() {
    setSeenId(LATEST_UPDATE_ID)
    localStorage.setItem(STORAGE_KEY, String(LATEST_UPDATE_ID))
  }

  return (
    <NotificationCenter
      notifications={notifications}
      onMarkAllRead={markAllRead}
      onNotificationClick={() => router.push("/docs/updates")}
      emptyMessage="You're all caught up."
      className="size-8"
    />
  )
}
