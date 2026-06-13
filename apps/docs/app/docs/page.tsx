import Link from "next/link"
import type { Metadata } from "next"

import { getRegistryItems } from "@/lib/registry"
import { DocsArticle, InlineCode } from "@/components/site/docs"
import { CodeBlock } from "@/components/site/code-block"

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "cano is an open registry of design-led components built on shadcn/ui, Tailwind, and Radix.",
}

export default function DocsIntroPage() {
  const count = getRegistryItems().length

  return (
    <DocsArticle
      title="Introduction"
      lead="cano is an open registry of design-led components built on shadcn/ui, Tailwind, and Radix — copied as source straight into your project."
    >
      <p>
        cano is not a component package. There is nothing to{" "}
        <InlineCode>npm install</InlineCode> and no version to track. Instead,
        the CLI copies real, readable component source into your codebase, where
        it becomes yours to edit, extend, or delete. shadcn/ui gives you correct,
        neutral primitives; cano is the design layer on top — {count} opinionated,
        production-grade components covering the states most kits skip: loading,
        empty, error, and full keyboard support.
      </p>

      <h2>Quick start</h2>
      <p>
        Already using shadcn/ui? Add any component in one command — its
        dependencies, including shadcn primitives, are resolved automatically.
      </p>
      <CodeBlock>npx cano-ui add data-table-pro</CodeBlock>
      <p>
        Starting fresh, or want a guided experience? See{" "}
        <Link href="/docs/installation">Installation</Link>, or jump straight to
        the new <Link href="/docs/cli">Cano CLI</Link> — a full-screen terminal
        app that installs, browses, and scaffolds for you.
      </p>

      <h2>How it fits shadcn</h2>
      <p>
        cano is built on shadcn, not a competitor to it. Components drop into an
        existing shadcn project without conflicts: the same{" "}
        <InlineCode>components.json</InlineCode>, the same{" "}
        <InlineCode>cn()</InlineCode> utility, and the same CSS variable names.
      </p>

      <h2>Principles</h2>
      <ul>
        <li>
          <strong>You own the code.</strong> Source lands in your project at{" "}
          <InlineCode>components/ui/</InlineCode>. No dependency to outgrow.
        </li>
        <li>
          <strong>Designed, not assembled.</strong> Every component is
          accessible and production-grade out of the box.
        </li>
        <li>
          <strong>Free, forever.</strong> MIT-licensed — the CLI, the registry,
          the components, and the docs.
        </li>
      </ul>

      <h2>Next steps</h2>
      <ul>
        <li>
          <Link href="/docs/installation">Installation</Link> — set up a project
          from scratch.
        </li>
        <li>
          <Link href="/docs/components">Using components</Link> — add, update,
          and own your components.
        </li>
        <li>
          <Link href="/docs/cli">Cano CLI</Link> — the interactive terminal app.
        </li>
        <li>
          <Link href="/components">Browse all {count} components</Link>.
        </li>
      </ul>
    </DocsArticle>
  )
}
