"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

const plans = [
  { value: "starter", label: "Starter", note: "$0 / month" },
  { value: "pro", label: "Pro", note: "$24 / month" },
  { value: "team", label: "Team", note: "$96 / month" },
]

export default function RadioGroupDemo() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <RadioGroup defaultValue="pro" className="gap-3">
        {plans.map((plan) => (
          <Label
            key={plan.value}
            htmlFor={plan.value}
            className="flex items-center gap-3 rounded-lg border p-3 has-[[data-state=checked]]:border-primary"
          >
            <RadioGroupItem value={plan.value} id={plan.value} />
            <span className="flex flex-1 items-center justify-between">
              <span className="text-sm font-medium">{plan.label}</span>
              <span className="text-sm text-muted-foreground">{plan.note}</span>
            </span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}
