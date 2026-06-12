"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import {
  PhoneNumberInput,
  type PhoneNumberValue,
} from "@/registry/ui/phone-number-input"

export default function PhoneNumberInputDemo() {
  const [phone, setPhone] = React.useState<PhoneNumberValue | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
      <Label>Phone number</Label>
      <PhoneNumberInput defaultCountry="BD" onValueChange={setPhone} />
      <p className="h-5 text-sm text-muted-foreground">
        {phone?.e164 ? (
          <>
            Stored as{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              {phone.e164}
            </code>
          </>
        ) : (
          "Numbers are normalized to E.164 for storage."
        )}
      </p>
    </div>
  )
}
