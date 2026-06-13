"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/registry/ui/sonner"

export default function SonnerDemo() {
  return (
    <div className="flex min-h-[160px] w-full flex-wrap items-center justify-center gap-3">
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast("Deployment started", {
            description: "acme-web · main → production",
          })
        }
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Deployed", {
            description: "Live at acme.com in 12s.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Build failed", {
            description: "2 of 14 checks failed.",
            action: { label: "Retry", onClick: () => {} },
          })
        }
      >
        With action
      </Button>
    </div>
  )
}
