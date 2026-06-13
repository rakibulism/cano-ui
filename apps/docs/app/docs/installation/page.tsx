import Link from "next/link"
import type { Metadata } from "next"

import { DocsArticle, InlineCode } from "@/components/site/docs"
import { CodeBlock } from "@/components/site/code-block"

export const metadata: Metadata = {
  title: "Installation",
  description: "Set up cano in a new or existing project.",
}

export default function InstallationPage() {
  return (
    <DocsArticle
      title="Installation"
      lead="Set up cano in a new or existing project — two ways, both zero-config."
    >
      <h2>Existing shadcn project</h2>
      <p>
        If your project already uses shadcn/ui, you are ready. Add a component
        and cano resolves everything it needs:
      </p>
      <CodeBlock>npx cano-ui add command-palette</CodeBlock>

      <h2>New project</h2>
      <p>
        Run <InlineCode>init</InlineCode> to configure a project from scratch. It
        writes <InlineCode>components.json</InlineCode> (the same schema shadcn
        uses), creates the <InlineCode>cn()</InlineCode> utility, adds design
        tokens to your global CSS, and installs base dependencies.
      </p>
      <CodeBlock>{`npx cano-ui init        # interactive
npx cano-ui init -y     # accept defaults`}</CodeBlock>
      <p>
        Projects that already use shadcn/ui are detected and left untouched —{" "}
        <InlineCode>add</InlineCode> just works.
      </p>

      <h2>The interactive way</h2>
      <p>
        Prefer not to memorize commands? The{" "}
        <Link href="/docs/cli">Cano CLI</Link> is a full-screen terminal app that
        detects your framework, walks you through setup, and installs components
        from a searchable picker.
      </p>
      <CodeBlock>npm install -g cano-cli</CodeBlock>

      <h2>Configuration</h2>
      <ul>
        <li>
          cano reads <InlineCode>components.json</InlineCode> aliases and
          tsconfig path mappings, so <InlineCode>src/</InlineCode> layouts and
          custom directories work.
        </li>
        <li>
          <InlineCode>--registry &lt;url&gt;</InlineCode> or{" "}
          <InlineCode>CANO_REGISTRY_URL</InlineCode> points the CLI at a
          different registry, for self-hosting or local development.
        </li>
      </ul>
    </DocsArticle>
  )
}
