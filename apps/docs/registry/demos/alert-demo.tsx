"use client"

import { CheckCircle2, Terminal, TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert"

export default function AlertDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <Alert>
        <Terminal />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app with the cano CLI.
        </AlertDescription>
      </Alert>
      <Alert>
        <CheckCircle2 className="text-emerald-600 dark:text-emerald-500" />
        <AlertTitle>Deploy succeeded</AlertTitle>
        <AlertDescription>
          Your changes are live at acme.com.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <TriangleAlert />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Your card was declined. Update your billing details to continue.
        </AlertDescription>
      </Alert>
    </div>
  )
}
