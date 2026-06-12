"use client"

import * as React from "react"

import { ProgressBar } from "@/registry/ui/progress-bar"

export default function ProgressBarDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setInterval(
      () => setProgress((p) => (p >= 100 ? 13 : p + 9)),
      900
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-7">
      <ProgressBar label="Uploading assets" value={progress} showValue />
      <ProgressBar label="Storage used" value={82} showValue variant="warning" />
      <ProgressBar label="Deploy checks" value={100} showValue variant="success" />
      <ProgressBar label="Error budget" value={96} showValue variant="danger" size="lg" />
      <ProgressBar label="Indexing…" size="sm" />
    </div>
  )
}
