"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UsageMeter } from "@/registry/ui/usage-meter"

export default function UsageMeterDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <UsageMeter
        title="Plan usage"
        description="Billing period resets May 1."
        action={<Badge variant="secondary">Pro</Badge>}
        items={[
          {
            label: "API requests",
            used: 84200,
            limit: 100000,
            usedLabel: "84.2k",
            limitLabel: "100k",
          },
          { label: "Team seats", used: 7, limit: 10 },
          {
            label: "Storage",
            used: 4.6,
            limit: 5,
            usedLabel: "4.6 GB",
            limitLabel: "5 GB",
          },
          { label: "Preview deployments", used: 132, limit: 500 },
        ]}
        footer={
          <Button variant="outline" className="w-full">
            Upgrade plan
          </Button>
        }
      />
    </div>
  )
}
