"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/ui/context-menu"

export default function ContextMenuDemo() {
  const [bookmarked, setBookmarked] = React.useState(true)
  const [branch, setBranch] = React.useState("main")

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Save page…</ContextMenuItem>
              <ContextMenuItem>Inspect</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={bookmarked}
            onCheckedChange={setBookmarked}
          >
            Show bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={branch} onValueChange={setBranch}>
            <ContextMenuLabel>Branch</ContextMenuLabel>
            <ContextMenuRadioItem value="main">main</ContextMenuRadioItem>
            <ContextMenuRadioItem value="develop">develop</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
