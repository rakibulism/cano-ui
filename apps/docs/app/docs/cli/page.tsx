import type { Metadata } from "next"

import { DocsArticle, InlineCode } from "@/components/site/docs"
import { CodeBlock } from "@/components/site/code-block"
import { CliTerminal } from "@/components/site/cli-terminal"

export const metadata: Metadata = {
  title: "Cano CLI",
  description:
    "The official command-line tool for Cano UI — a full-screen, keyboard-driven terminal app for installing, browsing, and scaffolding components.",
}

const COMMANDS: { cmd: string; desc: string }[] = [
  { cmd: "cano", desc: "Open the TUI — the guided welcome flow." },
  { cmd: "cano init", desc: "Guided setup for the current project." },
  { cmd: "cano install", desc: "Jump straight to the component picker." },
  { cmd: "cano install btn", desc: "Picker with Button pre-selected (aliases work)." },
  { cmd: "cano browse", desc: "Explore the catalog with usage examples." },
  { cmd: "cano create", desc: "Scaffold a new app with Cano UI preinstalled." },
  { cmd: "cano sync", desc: "Pull the latest components from the registry." },
]

export default function CliPage() {
  return (
    <DocsArticle
      title="Cano CLI"
      lead="The official command-line tool for Cano UI — a full-screen terminal product, not a script."
    >
      <p>
        Run <InlineCode>cano</InlineCode> and you get a keyboard-driven
        interface — welcome screen, mode selection, a searchable component
        picker, and live install progress — in the style of modern AI CLI tools.
        It installs, browses, scaffolds, and keeps your library in sync, so Cano
        UI is usable within seconds, without ever leaving the terminal.
      </p>

      <CliTerminal />

      <h2>Install</h2>
      <p>Install it globally from npm:</p>
      <CodeBlock>npm install -g cano-cli</CodeBlock>

      <h2>Commands</h2>
      <p>
        Every command opens the TUI at the right screen. With no arguments,{" "}
        <InlineCode>cano</InlineCode> starts the guided welcome flow.
      </p>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <tbody className="divide-y">
            {COMMANDS.map((row) => (
              <tr key={row.cmd}>
                <td className="w-px whitespace-nowrap px-4 py-2.5 align-top">
                  <code className="font-mono text-foreground">{row.cmd}</code>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Options: <InlineCode>-f, --force</InlineCode> overwrite existing files ·{" "}
        <InlineCode>-v, --version</InlineCode> · <InlineCode>-h, --help</InlineCode>.
      </p>

      <h2>The interface</h2>
      <ul>
        <li>
          <strong>Welcome.</strong> Shows the folder you ran it from, detects
          your framework, and has a command bar: type <InlineCode>/</InlineCode>{" "}
          for slash commands or just type to search components.
        </li>
        <li>
          <strong>Component picker.</strong> Multi-select with checkboxes,
          type-to-search, and Tab to cycle categories.
        </li>
        <li>
          <strong>Live install progress.</strong> A spinner per step — fetch
          registry, download component, inject files, link styles — with
          registry dependencies installed automatically.
        </li>
        <li>
          <strong>Project finder.</strong> <InlineCode>/projects</InlineCode>{" "}
          scans your machine for folders with a{" "}
          <InlineCode>package.json</InlineCode>;{" "}
          <InlineCode>/folders</InlineCode> is a Finder-style navigator.
        </li>
        <li>
          <strong>Escape always goes back, never out.</strong> The TUI exits
          only via <InlineCode>/exit</InlineCode>, the Exit menu, or Ctrl+C.
        </li>
      </ul>

      <h2>Library sync</h2>
      <p>
        <InlineCode>cano sync</InlineCode> pulls the full component registry into{" "}
        <InlineCode>~/.cano/registry</InlineCode>. Components published to the
        registry — current and future — appear in the picker and browser
        automatically after a sync. No CLI update needed.
      </p>

      <h2>Theme</h2>
      <p>
        The panel background follows your device&rsquo;s appearance (macOS
        light/dark mode). Override with <InlineCode>CANO_THEME=light</InlineCode>{" "}
        or <InlineCode>CANO_THEME=dark</InlineCode>. The CANO wordmark scales
        down as the terminal gets smaller.
      </p>

      <h2>Get it</h2>
      <p>
        Cano CLI is built with Ink (React for CLIs) and published on npm as{" "}
        <a
          href="https://www.npmjs.com/package/cano-cli"
          target="_blank"
          rel="noreferrer"
        >
          cano-cli
        </a>
        .
      </p>
    </DocsArticle>
  )
}
