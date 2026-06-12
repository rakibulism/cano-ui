"use client"

import { demos } from "@/registry/demos"

export function ComponentPreview({ name }: { name: string }) {
  const Demo = demos[name]
  if (!Demo) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border text-sm text-muted-foreground">
        Preview not available
      </div>
    )
  }
  return (
    <div className="rounded-lg border p-6 sm:p-10">
      <Demo />
    </div>
  )
}
