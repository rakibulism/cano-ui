"use client"

import {
  TypographyBlockquote,
  TypographyH2,
  TypographyH3,
  TypographyInlineCode,
  TypographyLead,
  TypographyList,
  TypographyP,
} from "@/registry/ui/typography"

export default function TypographyDemo() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <TypographyH2>The cano design layer</TypographyH2>
      <TypographyLead>
        Beautiful, accessible components — copied as source into your project.
      </TypographyLead>
      <TypographyP>
        cano is built on shadcn/ui, Tailwind, and Radix. Add a component with{" "}
        <TypographyInlineCode>npx cano-ui add</TypographyInlineCode> and it lands
        in your repo, ready to edit.
      </TypographyP>
      <TypographyH3>Principles</TypographyH3>
      <TypographyList>
        <li>You own the code — no dependency to outgrow.</li>
        <li>Designed, not assembled — every state covered.</li>
        <li>Free and MIT-licensed, forever.</li>
      </TypographyList>
      <TypographyBlockquote>
        “We replaced three internal libraries with cano and shipped in days.”
      </TypographyBlockquote>
    </div>
  )
}
