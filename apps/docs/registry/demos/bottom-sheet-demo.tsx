"use client"

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BottomSheet } from "@/registry/ui/bottom-sheet"

const plans = [
  { name: "Hobby", price: "$0", note: "2 projects, community support" },
  { name: "Pro", price: "$24", note: "Unlimited projects, email support", current: true },
  { name: "Team", price: "$96", note: "SSO, audit log, priority support" },
]

export default function BottomSheetDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <BottomSheet
        trigger={<Button variant="outline">Change plan</Button>}
        title="Change plan"
        description="Switches take effect at the next billing cycle."
        footer={<Button className="w-full">Continue</Button>}
      >
        <ul className="flex flex-col gap-2">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-sm font-medium">
                  {plan.name}
                  {plan.current ? (
                    <Check className="size-3.5 text-emerald-600" aria-label="Current plan" />
                  ) : null}
                </span>
                <span className="text-xs text-muted-foreground">{plan.note}</span>
              </div>
              <span className="text-sm tabular-nums text-muted-foreground">
                {plan.price}/mo
              </span>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </div>
  )
}
