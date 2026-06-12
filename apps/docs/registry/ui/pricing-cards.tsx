"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

type BillingPeriod = "monthly" | "yearly"

interface PricingTier {
  id: string
  name: string
  description: string
  /** Price per month for each billing period. `yearly` is the discounted per-month price when billed annually. */
  price: {
    monthly: number
    yearly: number
  }
  currency?: string
  features: string[]
  cta: {
    label: string
    onClick?: () => void
    href?: string
  }
  recommended?: boolean
}

interface PricingCardsProps extends React.ComponentProps<"div"> {
  tiers: PricingTier[]
  /** Controlled billing period. Leave undefined for uncontrolled behavior. */
  billingPeriod?: BillingPeriod
  onBillingPeriodChange?: (period: BillingPeriod) => void
  defaultBillingPeriod?: BillingPeriod
  /** Hint shown next to the toggle when yearly billing is available. */
  yearlyHint?: string
}

function PricingCards({
  tiers,
  billingPeriod: billingPeriodProp,
  onBillingPeriodChange,
  defaultBillingPeriod = "monthly",
  yearlyHint = "Save 20%",
  className,
  ...props
}: PricingCardsProps) {
  const [internalPeriod, setInternalPeriod] =
    React.useState<BillingPeriod>(defaultBillingPeriod)
  const billingPeriod = billingPeriodProp ?? internalPeriod

  const setBillingPeriod = React.useCallback(
    (period: BillingPeriod) => {
      if (billingPeriodProp === undefined) {
        setInternalPeriod(period)
      }
      onBillingPeriodChange?.(period)
    },
    [billingPeriodProp, onBillingPeriodChange]
  )

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <div className="flex items-center justify-center gap-3">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex items-center rounded-lg bg-muted p-1"
        >
          {(["monthly", "yearly"] as const).map((period) => (
            <button
              key={period}
              type="button"
              aria-pressed={billingPeriod === period}
              onClick={() => setBillingPeriod(period)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                billingPeriod === period
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {period === "monthly" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
        {yearlyHint ? (
          <span className="text-sm text-muted-foreground">{yearlyHint}</span>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          const currency = tier.currency ?? "$"
          const amount =
            billingPeriod === "yearly" ? tier.price.yearly : tier.price.monthly

          return (
            <Card
              key={tier.id}
              className={cn(
                "relative flex flex-col",
                tier.recommended && "border-primary"
              )}
            >
              {tier.recommended ? (
                <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  Recommended
                </Badge>
              ) : null}
              <CardHeader>
                <h3 className="text-sm font-medium">{tier.name}</h3>
                <div aria-live="polite" className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    {currency}
                    {amount}
                  </span>
                  <span className="text-sm text-muted-foreground">/month</span>
                  {billingPeriod === "yearly" ? (
                    <span className="sr-only">billed yearly</span>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                {tier.cta.href ? (
                  <Button
                    asChild
                    variant={tier.recommended ? "default" : "outline"}
                    className="w-full"
                  >
                    <a href={tier.cta.href}>{tier.cta.label}</a>
                  </Button>
                ) : (
                  <Button
                    variant={tier.recommended ? "default" : "outline"}
                    className="w-full"
                    onClick={tier.cta.onClick}
                  >
                    {tier.cta.label}
                  </Button>
                )}
              </CardContent>
              <CardFooter>
                <ul className="flex flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export { PricingCards }
export type { PricingCardsProps, PricingTier, BillingPeriod }
