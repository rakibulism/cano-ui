"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  CardPaymentInput,
  type CardPaymentValue,
} from "@/registry/ui/card-payment-input"

export default function CardPaymentInputDemo() {
  const [card, setCard] = React.useState<CardPaymentValue | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <CardPaymentInput onChange={setCard} />
      <Button disabled={!card?.complete}>
        {card?.complete ? "Pay $249.00" : "Enter card details"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Try 4242 4242 4242 4242 (Visa) or 3782 822463 10005 (Amex).
      </p>
    </div>
  )
}
