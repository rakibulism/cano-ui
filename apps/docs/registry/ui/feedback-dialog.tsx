"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const ratings = [
  { value: 1, emoji: "😞", label: "Very dissatisfied" },
  { value: 2, emoji: "🙁", label: "Dissatisfied" },
  { value: 3, emoji: "😐", label: "Neutral" },
  { value: 4, emoji: "🙂", label: "Satisfied" },
  { value: 5, emoji: "😍", label: "Very satisfied" },
] as const

export interface FeedbackDialogProps {
  /** Trigger element; defaults to an outline "Give feedback" button. */
  trigger?: React.ReactNode
  title?: string
  description?: string
  commentPlaceholder?: string
  onSubmit?: (feedback: { rating: number; comment: string }) => void
  /** Message shown after submitting. */
  thanksMessage?: string
}

export function FeedbackDialog({
  trigger,
  title = "Share feedback",
  description = "How was your experience? Your feedback helps us improve.",
  commentPlaceholder = "Tell us what worked well or what we can do better…",
  onSubmit,
  thanksMessage = "Thanks for the feedback! We read every response.",
}: FeedbackDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [rating, setRating] = React.useState<number | null>(null)
  const [comment, setComment] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      // Reset after the close animation so the form is fresh next time.
      setTimeout(() => {
        setRating(null)
        setComment("")
        setSubmitted(false)
      }, 200)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">Give feedback</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-slot="feedback-dialog">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2
              className="size-10 text-emerald-500"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">{thanksMessage}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div
              role="radiogroup"
              aria-label="Rating"
              className="flex justify-center gap-2"
            >
              {ratings.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  role="radio"
                  aria-checked={rating === r.value}
                  aria-label={r.label}
                  title={r.label}
                  onClick={() => setRating(r.value)}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border text-xl transition-all hover:bg-muted",
                    rating === r.value
                      ? "scale-110 border-primary bg-primary/10"
                      : "border-input grayscale hover:grayscale-0"
                  )}
                >
                  <span aria-hidden="true">{r.emoji}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="feedback-comment" className="sr-only">
                Comment
              </Label>
              <Textarea
                id="feedback-comment"
                placeholder={commentPlaceholder}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button
                disabled={rating === null}
                onClick={() => {
                  if (rating === null) return
                  onSubmit?.({ rating, comment })
                  setSubmitted(true)
                }}
              >
                Send feedback
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
