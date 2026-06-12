"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { CountryInput } from "@/registry/ui/country-input"

export default function CountryInputDemo() {
  const [shipping, setShipping] = React.useState("BD")
  const [billing, setBilling] = React.useState<string | undefined>()

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label>Shipping country</Label>
        <CountryInput
          value={shipping}
          onValueChange={(c) => setShipping(c.code)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Billing country</Label>
        <CountryInput
          value={billing}
          onValueChange={(c) => setBilling(c.code)}
        />
      </div>
    </div>
  )
}
