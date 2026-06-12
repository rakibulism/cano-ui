"use client"

import { FeedbackDialog } from "@/registry/ui/feedback-dialog"

export default function FeedbackDialogDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <FeedbackDialog onSubmit={() => {}} />
    </div>
  )
}
