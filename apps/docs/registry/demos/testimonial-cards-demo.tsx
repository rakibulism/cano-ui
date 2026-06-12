"use client"

import { TestimonialCards } from "@/registry/ui/testimonial-cards"

export default function TestimonialCardsDemo() {
  return (
    <TestimonialCards
      testimonials={[
        {
          id: "1",
          quote:
            "We replaced three internal component libraries with Cano UI. Our team ships dashboards in days instead of weeks.",
          author: "Mia Park",
          role: "CTO, Northwind",
        },
        {
          id: "2",
          quote:
            "The components feel hand-designed, not generated. Copy, paste, tweak two tokens, done.",
          author: "Jonas Weber",
          role: "Design Engineer, Linear-ish",
        },
        {
          id: "3",
          quote:
            "Best registry DX I've used. The CLI diff command alone saved us from two painful upgrades.",
          author: "Priya Sharma",
          role: "Staff Engineer, Acme Cloud",
        },
        {
          id: "4",
          quote: "It just works with our shadcn setup. Zero friction.",
          author: "Diego Fernández",
          role: "Frontend Lead, Vega Labs",
        },
        {
          id: "5",
          quote:
            "Accessible by default and the dark mode tokens are genuinely beautiful. Our designers stopped overriding things.",
          author: "Sofia Rossi",
          role: "Head of Product, Brightly",
        },
        {
          id: "6",
          quote:
            "We onboarded a junior dev on Monday; by Friday she had shipped a full settings area with Cano UI.",
          author: "Tom Becker",
          role: "Engineering Manager, Relay",
        },
      ]}
    />
  )
}
