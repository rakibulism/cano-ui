"use client"

import * as React from "react"
import { ArrowRight, Download, Sparkles, Trash2 } from "lucide-react"

import { ButtonPro } from "@/registry/ui/button-pro"

export default function ButtonProDemo() {
  const [saving, setSaving] = React.useState(false)

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <ButtonPro
        loading={saving}
        loadingText="Saving…"
        onClick={() => {
          setSaving(true)
          setTimeout(() => setSaving(false), 2000)
        }}
      >
        Save changes
      </ButtonPro>
      <ButtonPro icon={<Download />} variant="outline">
        Export CSV
      </ButtonPro>
      <ButtonPro iconRight={<ArrowRight />} variant="secondary">
        Continue
      </ButtonPro>
      <ButtonPro icon={<Sparkles />} loading loadingText="Generating…">
        Generate
      </ButtonPro>
      <ButtonPro icon={<Trash2 />} variant="destructive">
        Delete
      </ButtonPro>
    </div>
  )
}
