"use client"

import * as React from "react"
import { Loader2, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { KbdGroup } from "@/registry/ui/kbd"

export interface SearchBarProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "size"> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Shows a spinner in place of the clear button. */
  loading?: boolean
  /**
   * Shortcut hint shown while empty, e.g. ["⌘", "K"]. The last key is also
   * registered globally with Cmd/Ctrl to focus the input.
   */
  shortcut?: string[]
  containerClassName?: string
}

export function SearchBar({
  value,
  defaultValue = "",
  onValueChange,
  loading = false,
  shortcut,
  placeholder = "Search…",
  containerClassName,
  className,
  ...props
}: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal

  function setValue(next: string) {
    setInternal(next)
    onValueChange?.(next)
  }

  React.useEffect(() => {
    if (!shortcut?.length) return
    const key = shortcut[shortcut.length - 1].toLowerCase()
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === key) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [shortcut])

  return (
    <div
      data-slot="search-bar"
      className={cn("relative w-full", containerClassName)}
    >
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        ref={inputRef}
        type="search"
        role="searchbox"
        value={current}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "pl-9 pr-9 [&::-webkit-search-cancel-button]:appearance-none",
          className
        )}
        {...props}
      />
      <span className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center">
        {loading ? (
          <Loader2
            aria-label="Searching"
            className="size-4 animate-spin text-muted-foreground"
          />
        ) : current ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setValue("")
              inputRef.current?.focus()
            }}
            className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : shortcut?.length ? (
          <KbdGroup keys={shortcut} aria-hidden="true" />
        ) : null}
      </span>
    </div>
  )
}
