"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export interface CommandPaletteItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  shortcut?: string
  keywords?: string[]
  onSelect?: () => void
}

export interface CommandPaletteGroup {
  heading: string
  items: CommandPaletteItem[]
}

export interface CommandPaletteProps {
  groups: CommandPaletteGroup[]
  recentItems?: CommandPaletteItem[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
}

function PaletteItem({
  item,
  onRun,
}: {
  item: CommandPaletteItem
  onRun: (item: CommandPaletteItem) => void
}) {
  const Icon = item.icon

  return (
    <CommandItem
      value={item.label}
      keywords={item.keywords}
      onSelect={() => onRun(item)}
    >
      {Icon ? <Icon className="size-4 text-muted-foreground" /> : null}
      <span>{item.label}</span>
      {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
    </CommandItem>
  )
}

export function CommandPalette({
  groups,
  recentItems,
  open: openProp,
  onOpenChange,
  placeholder = "Type a command or search…",
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : internalOpen

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        handleOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, handleOpenChange])

  const runItem = React.useCallback(
    (item: CommandPaletteItem) => {
      handleOpenChange(false)
      item.onSelect?.()
    },
    [handleOpenChange]
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Command palette"
      description="Search for a command to run"
    >
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {recentItems && recentItems.length > 0 ? (
          <>
            <CommandGroup heading="Recent">
              {recentItems.map((item) => (
                <PaletteItem key={item.id} item={item} onRun={runItem} />
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        ) : null}
        {groups.map((group, index) => (
          <React.Fragment key={group.heading}>
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <PaletteItem key={item.id} item={item} onRun={runItem} />
              ))}
            </CommandGroup>
            {index < groups.length - 1 ? <CommandSeparator /> : null}
          </React.Fragment>
        ))}
      </CommandList>
      <div className="flex items-center gap-4 border-t px-3 py-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <kbd className="pointer-events-none select-none rounded bg-muted px-1 font-mono text-[10px] font-medium">
            ↑
          </kbd>
          <kbd className="pointer-events-none select-none rounded bg-muted px-1 font-mono text-[10px] font-medium">
            ↓
          </kbd>
          navigate
        </span>
        <span className="flex items-center gap-1">
          <kbd className="pointer-events-none select-none rounded bg-muted px-1 font-mono text-[10px] font-medium">
            ↵
          </kbd>
          select
        </span>
        <span className="flex items-center gap-1">
          <kbd className="pointer-events-none select-none rounded bg-muted px-1 font-mono text-[10px] font-medium">
            esc
          </kbd>
          close
        </span>
      </div>
    </CommandDialog>
  )
}

export function CommandPaletteTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 w-full max-w-sm items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      <Search className="size-4 shrink-0" />
      <span className="flex-1 text-left">{children ?? "Search…"}</span>
      <kbd className="pointer-events-none ml-auto select-none rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">
        ⌘K
      </kbd>
    </button>
  )
}
