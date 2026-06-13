import Link from "next/link"
import type { Metadata } from "next"

import { getRegistryItems } from "@/lib/registry"
import { DocsArticle, InlineCode } from "@/components/site/docs"
import { CodeBlock } from "@/components/site/code-block"

export const metadata: Metadata = {
  title: "Using components",
  description: "Add, update, and own cano components in your project.",
}

export default function UsingComponentsPage() {
  const count = getRegistryItems().length

  return (
    <DocsArticle
      title="Using components"
      lead="Add components, let cano resolve their dependencies, and own every line once it lands."
    >
      <h2>Adding components</h2>
      <p>
        Pass one or more component names to <InlineCode>add</InlineCode>. cano
        fetches each from the registry and writes it into your project.
      </p>
      <CodeBlock>{`npx cano-ui add command-palette
npx cano-ui add app-shell stats-grid --yes`}</CodeBlock>
      <p>
        Useful flags: <InlineCode>--dry-run</InlineCode> prints the plan without
        writing anything, and <InlineCode>--overwrite</InlineCode> replaces
        files that already exist.
      </p>

      <h2>Dependency resolution</h2>
      <p>
        cano installs everything a component needs, automatically: other cano
        components, shadcn primitives (fetched from the official shadcn
        registry), and npm packages (installed with your detected package
        manager). A component like <InlineCode>phone-number-input</InlineCode>{" "}
        pulls in <InlineCode>country-input</InlineCode> and the radix primitives
        it depends on without a second command.
      </p>

      <h2>You own the code</h2>
      <p>
        The source lands at <InlineCode>components/ui/&lt;name&gt;.tsx</InlineCode>
        . It is a plain file in your repo — restyle it, refactor it, or delete
        it. There is no runtime dependency on cano.
      </p>

      <h2>Staying in sync</h2>
      <p>
        Because you own the copy, components do not auto-update. To compare your
        local copy against the latest registry version — handy after you have
        edited a component, or when the registry has moved on — run:
      </p>
      <CodeBlock>npx cano-ui diff data-table-pro</CodeBlock>

      <h2>Browse the catalog</h2>
      <p>
        See all {count} components with live, interactive previews on the{" "}
        <Link href="/components">Components</Link> page, or list them in your
        terminal with <InlineCode>npx cano-ui list</InlineCode>.
      </p>
    </DocsArticle>
  )
}
