"use client"

import { Kbd, KbdGroup } from "@/registry/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
        <Kbd>⏎</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Tab</Kbd>
        <Kbd>Space</Kbd>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <KbdGroup keys={["⌘", "K"]} />
        <KbdGroup keys={["⇧", "⌘", "P"]} separator="+" />
        <KbdGroup keys={["g", "d"]} separator="then" />
      </div>
      <p className="text-sm text-muted-foreground">
        Press <KbdGroup keys={["⌘", "K"]} size="sm" /> to open the command
        palette, or <Kbd size="sm">?</Kbd> to see all shortcuts.
      </p>
    </div>
  )
}
