"use client"

import * as React from "react"

import { OtpInput } from "@/registry/ui/otp-input"

export default function OtpInputDemo() {
  const [status, setStatus] = React.useState<"idle" | "wrong" | "ok">("idle")

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <p className="text-sm font-medium">Enter the 6-digit code</p>
      <OtpInput
        error={status === "wrong"}
        onValueChange={() => setStatus("idle")}
        onComplete={(code) => setStatus(code === "123456" ? "ok" : "wrong")}
      />
      <p
        role="status"
        className="h-5 text-sm text-muted-foreground"
      >
        {status === "ok" ? (
          <span className="text-emerald-600">Verified — welcome back!</span>
        ) : status === "wrong" ? (
          <span className="text-destructive">
            Wrong code — hint: it's 123456.
          </span>
        ) : (
          <>
            We sent a code to mia@acme.com. Paste works too — try{" "}
            <span className="font-medium">123456</span>.
          </>
        )}
      </p>
    </div>
  )
}
