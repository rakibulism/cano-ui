"use client"

import * as React from "react"
import { RotateCw, Sparkles, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SITE_VERSION } from "@/lib/version"

const DISMISS_KEY = "update-dismissed-version"
const POLL_MS = 3 * 60 * 1000

/**
 * Watches the live deployment for a newer version than the one this client
 * loaded with. When one ships, it prompts the visitor to reload (or skip).
 */
export function UpdateNotifier() {
  const [newVersion, setNewVersion] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true

    async function check() {
      try {
        const res = await fetch("/api/version", { cache: "no-store" })
        if (!res.ok || !active) return
        const data = (await res.json()) as { version?: string }
        const latest = data.version
        if (!active || typeof latest !== "string") return
        const dismissed = localStorage.getItem(DISMISS_KEY)
        setNewVersion(
          latest !== SITE_VERSION && latest !== dismissed ? latest : null
        )
      } catch {
        // Offline or transient — try again on the next tick.
      }
    }

    check()
    const interval = setInterval(check, POLL_MS)
    const onVisible = () => {
      if (document.visibilityState === "visible") check()
    }
    window.addEventListener("focus", check)
    document.addEventListener("visibilitychange", onVisible)
    return () => {
      active = false
      clearInterval(interval)
      window.removeEventListener("focus", check)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [])

  function dismiss() {
    if (newVersion) localStorage.setItem(DISMISS_KEY, newVersion)
    setNewVersion(null)
  }

  if (!newVersion) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 bottom-4 z-[60] w-80 max-w-[calc(100vw-2rem)] rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
        >
          <Sparkles className="size-4" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-sm font-medium">A new version is available</p>
          <p className="text-xs text-muted-foreground">
            cano <span className="font-medium text-foreground">v{newVersion}</span>{" "}
            is live. Reload to get the latest.
          </p>
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={dismiss}
          className="-mt-0.5 -mr-1 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={() => window.location.reload()}>
          <RotateCw aria-hidden="true" />
          Reload now
        </Button>
        <Button size="sm" variant="ghost" onClick={dismiss}>
          Not now
        </Button>
      </div>
    </div>
  )
}
