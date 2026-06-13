"use client"

import { CalendarDays } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@cano-ui</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="" alt="" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">cano</p>
              <p className="text-sm text-muted-foreground">
                Design-led, shadcn-compatible components — copied as source into
                your project.
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                Joined June 2026
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
