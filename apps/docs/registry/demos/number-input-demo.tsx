"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { NumberInput } from "@/registry/ui/number-input"

export default function NumberInputDemo() {
  const [seats, setSeats] = React.useState(3)

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Label>Team seats ($12 each)</Label>
        <NumberInput
          label="team seats"
          value={seats}
          onValueChange={setSeats}
          min={1}
          max={25}
        />
        <p className="text-sm text-muted-foreground">
          ${(seats * 12).toLocaleString()}/month
        </p>
      </div>
      <div className="flex flex-wrap items-end justify-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Label>Quantity (1–10)</Label>
          <NumberInput label="quantity" defaultValue={10} min={1} max={10} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Label>Opacity (step 0.1)</Label>
          <NumberInput label="opacity" defaultValue={0.5} min={0} max={1} step={0.1} />
        </div>
      </div>
    </div>
  )
}
