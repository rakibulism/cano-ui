"use client"

import { PartyPopper, ShieldAlert, Sparkles } from "lucide-react"

import { AnnouncementBanner } from "@/registry/ui/announcement-banner"

export default function AnnouncementBannerDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <AnnouncementBanner
        title="Cano UI 2.0 is here"
        description="new components, dark mode tokens, and a faster CLI"
        actionLabel="See what's new"
        onAction={() => {}}
        onDismiss={() => {}}
      />
      <AnnouncementBanner
        variant="info"
        icon={Sparkles}
        title="Try the new dashboard"
        description="rebuilt from the ground up for speed"
        actionLabel="Take a tour"
        onAction={() => {}}
      />
      <AnnouncementBanner
        variant="success"
        icon={PartyPopper}
        title="You've been upgraded to Pro"
        description="enjoy unlimited projects and priority support"
        onDismiss={() => {}}
      />
      <AnnouncementBanner
        variant="warning"
        icon={ShieldAlert}
        title="Scheduled maintenance May 4, 02:00–04:00 UTC"
        description="API requests may be briefly delayed"
        actionLabel="Status page"
        onAction={() => {}}
        onDismiss={() => {}}
      />
    </div>
  )
}
