"use client"

import * as React from "react"
import {
  Clock,
  Copy,
  LayoutDashboard,
  Plus,
  Settings,
  UserPlus,
  Users,
} from "lucide-react"

import {
  CommandPalette,
  CommandPaletteTrigger,
} from "@/registry/ui/command-palette"

export default function CommandPaletteDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full justify-center py-8">
      <CommandPaletteTrigger onClick={() => setOpen(true)}>
        Search Acme…
      </CommandPaletteTrigger>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        placeholder="Type a command or search…"
        recentItems={[
          {
            id: "recent-billing",
            label: "Billing settings",
            icon: Clock,
            keywords: ["invoice", "plan"],
          },
          {
            id: "recent-api-keys",
            label: "API keys",
            icon: Clock,
            keywords: ["token", "secret"],
          },
        ]}
        groups={[
          {
            heading: "Navigation",
            items: [
              {
                id: "nav-dashboard",
                label: "Dashboard",
                icon: LayoutDashboard,
                keywords: ["home", "overview"],
              },
              {
                id: "nav-settings",
                label: "Settings",
                icon: Settings,
                keywords: ["preferences", "account"],
              },
              {
                id: "nav-team",
                label: "Team",
                icon: Users,
                keywords: ["members", "people"],
              },
            ],
          },
          {
            heading: "Actions",
            items: [
              {
                id: "action-create-project",
                label: "Create project",
                icon: Plus,
                shortcut: "⌘N",
                keywords: ["new"],
              },
              {
                id: "action-invite-member",
                label: "Invite member",
                icon: UserPlus,
                keywords: ["add", "teammate"],
              },
              {
                id: "action-copy-link",
                label: "Copy link",
                icon: Copy,
                keywords: ["share", "url"],
              },
            ],
          },
        ]}
      />
    </div>
  )
}
