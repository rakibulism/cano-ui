"use client"

import * as React from "react"
import { Check, Monitor, Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Theme = "light" | "dark" | "system"

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

/** Applies a theme to <html>. "system" follows the device preference. */
function applyTheme(theme: Theme) {
  const isDark = theme === "dark" || (theme === "system" && prefersDark())
  document.documentElement.classList.toggle("dark", isDark)
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("system")
  const [resolvedDark, setResolvedDark] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setTheme((localStorage.getItem("theme") as Theme) || "system")
    setResolvedDark(document.documentElement.classList.contains("dark"))
  }, [])

  // While following the system, keep the icon in sync when the OS theme flips.
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      if ((localStorage.getItem("theme") || "system") === "system") {
        setResolvedDark(mq.matches)
      }
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  function select(next: Theme) {
    localStorage.setItem("theme", next)
    applyTheme(next)
    setTheme(next)
    setResolvedDark(document.documentElement.classList.contains("dark"))
  }

  // Render a stable placeholder until mounted to avoid a hydration mismatch.
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-8"
        aria-label="Toggle theme"
      >
        <Sun aria-hidden="true" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          {resolvedDark ? (
            <Moon aria-hidden="true" />
          ) : (
            <Sun aria-hidden="true" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => select(value)}
            className="justify-between"
          >
            <span className="flex items-center gap-2">
              <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
              {label}
            </span>
            <Check
              aria-hidden="true"
              className={cn("size-4", theme === value ? "opacity-100" : "opacity-0")}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
