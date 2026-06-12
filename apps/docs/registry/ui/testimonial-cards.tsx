import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export interface Testimonial {
  id: string
  quote: string
  author: string
  /** Role and company, e.g. "CTO, Acme Inc." */
  role?: string
  avatarUrl?: string
  /** Company logo slot rendered opposite the author. */
  logo?: React.ReactNode
}

export interface TestimonialCardsProps extends React.ComponentProps<"div"> {
  testimonials: Testimonial[]
  /** Number of masonry columns on large screens (1–3), default 3. */
  columns?: 1 | 2 | 3
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial
  className?: string
}) {
  return (
    <Card
      data-slot="testimonial-card"
      className={cn("break-inside-avoid gap-4", className)}
    >
      <CardContent>
        <blockquote className="text-sm leading-relaxed text-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="size-9">
            {testimonial.avatarUrl ? (
              <AvatarImage src={testimonial.avatarUrl} alt="" />
            ) : null}
            <AvatarFallback className="text-xs">
              {initials(testimonial.author)}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">
              {testimonial.author}
            </span>
            {testimonial.role ? (
              <span className="truncate text-xs text-muted-foreground">
                {testimonial.role}
              </span>
            ) : null}
          </div>
        </div>
        {testimonial.logo ? (
          <span
            aria-hidden="true"
            className="shrink-0 text-muted-foreground [&>svg]:size-5"
          >
            {testimonial.logo}
          </span>
        ) : null}
      </CardFooter>
    </Card>
  )
}

const columnClasses: Record<NonNullable<TestimonialCardsProps["columns"]>, string> = {
  1: "columns-1",
  2: "columns-1 md:columns-2",
  3: "columns-1 md:columns-2 lg:columns-3",
}

export function TestimonialCards({
  testimonials,
  columns = 3,
  className,
  ...props
}: TestimonialCardsProps) {
  return (
    <div
      data-slot="testimonial-cards"
      className={cn("w-full gap-4 space-y-4", columnClasses[columns], className)}
      {...props}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  )
}
