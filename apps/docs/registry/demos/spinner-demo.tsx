"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-8">
      <Spinner className="size-4 text-muted-foreground" />
      <Spinner className="size-6 text-muted-foreground" />
      <Spinner className="size-8 text-muted-foreground" />
      <Button disabled>
        <Spinner />
        Saving…
      </Button>
    </div>
  )
}
