"use client"

import * as React from "react"
import { CreditCard, Lock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | null

export interface CardPaymentValue {
  number: string
  expiry: string
  cvc: string
  brand: CardBrand
  /** True when all three fields are plausibly complete. */
  complete: boolean
}

export interface CardPaymentInputProps {
  onChange?: (value: CardPaymentValue) => void
  disabled?: boolean
  className?: string
}

function detectBrand(digits: string): CardBrand {
  if (/^4/.test(digits)) return "visa"
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard"
  if (/^3[47]/.test(digits)) return "amex"
  if (/^6(011|5)/.test(digits)) return "discover"
  return null
}

const brandLabels: Record<Exclude<CardBrand, null>, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  discover: "Discover",
}

function formatCardNumber(digits: string, brand: CardBrand) {
  // Amex groups 4-6-5; everything else 4-4-4-4.
  const groups = brand === "amex" ? [4, 6, 5] : [4, 4, 4, 4]
  const parts: string[] = []
  let rest = digits
  for (const size of groups) {
    if (!rest) break
    parts.push(rest.slice(0, size))
    rest = rest.slice(size)
  }
  return parts.join(" ")
}

export function CardPaymentInput({
  onChange,
  disabled,
  className,
}: CardPaymentInputProps) {
  const id = React.useId()
  const [number, setNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")

  const digits = number.replace(/\D/g, "")
  const brand = detectBrand(digits)
  const numberLength = brand === "amex" ? 15 : 16
  const cvcLength = brand === "amex" ? 4 : 3

  function emit(next: { number?: string; expiry?: string; cvc?: string }) {
    const n = (next.number ?? number).replace(/\D/g, "")
    const e = next.expiry ?? expiry
    const c = next.cvc ?? cvc
    const b = detectBrand(n)
    onChange?.({
      number: n,
      expiry: e,
      cvc: c,
      brand: b,
      complete:
        n.length === (b === "amex" ? 15 : 16) &&
        /^(0[1-9]|1[0-2])\/\d{2}$/.test(e) &&
        c.length === (b === "amex" ? 4 : 3),
    })
  }

  return (
    <div
      data-slot="card-payment-input"
      className={cn("flex w-full flex-col gap-4", className)}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-number`}>Card number</Label>
        <div className="relative">
          <CreditCard
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id={`${id}-number`}
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            value={number}
            disabled={disabled}
            onChange={(e) => {
              const d = e.target.value.replace(/\D/g, "").slice(0, numberLength)
              const formatted = formatCardNumber(d, detectBrand(d))
              setNumber(formatted)
              emit({ number: formatted })
            }}
            className="pl-9 pr-20 font-mono tabular-nums"
          />
          {brand ? (
            <span className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm border bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {brandLabels[brand]}
            </span>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-expiry`}>Expiry</Label>
          <Input
            id={`${id}-expiry`}
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            value={expiry}
            disabled={disabled}
            onChange={(e) => {
              let d = e.target.value.replace(/\D/g, "").slice(0, 4)
              if (d.length === 1 && Number(d) > 1) d = `0${d}`
              const next = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
              setExpiry(next)
              emit({ expiry: next })
            }}
            className="font-mono tabular-nums"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-cvc`}>CVC</Label>
          <div className="relative">
            <Input
              id={`${id}-cvc`}
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder={"•".repeat(cvcLength)}
              value={cvc}
              disabled={disabled}
              onChange={(e) => {
                const next = e.target.value.replace(/\D/g, "").slice(0, cvcLength)
                setCvc(next)
                emit({ cvc: next })
              }}
              className="pr-9 font-mono"
            />
            <Lock
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
