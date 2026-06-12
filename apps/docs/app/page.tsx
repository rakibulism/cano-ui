import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site/header"
import { CopyButton } from "@/components/site/copy-button"
import { getRegistryItems } from "@/lib/registry"

const FLAGSHIPS = [
  "app-shell",
  "data-table-pro",
  "command-palette",
  "onboarding-stepper",
  "empty-state",
]

export default function HomePage() {
  const items = getRegistryItems()
  const flagships = items.filter((i) => FLAGSHIPS.includes(i.name))

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Components for serious products.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            cano is an open registry of design-led components built on
            shadcn/ui, Tailwind, and Radix. Source code goes straight into your
            project — no package, no lock-in. Free and MIT-licensed, forever.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-lg border bg-muted/50 py-2 pl-4 pr-2 font-mono text-sm">
              <span className="select-all">npx cano-ui add data-table-pro</span>
              <CopyButton value="npx cano-ui add data-table-pro" />
            </div>
            <Link
              href="/components"
              className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              Browse {items.length} components
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-sm font-medium text-muted-foreground">
              Flagship components
            </h2>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {flagships.map((item) => (
                <li key={item.name} className="bg-background">
                  <Link
                    href={`/components/${item.name}`}
                    className="block h-full p-6 transition-colors hover:bg-accent/50"
                  >
                    <span className="font-medium">{item.title}</span>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                </li>
              ))}
              <li className="bg-background">
                <Link
                  href="/components"
                  className="flex h-full items-center gap-1.5 p-6 text-sm font-medium transition-colors hover:bg-accent/50"
                >
                  All components
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-3">
            <div>
              <h3 className="font-medium">Drops into shadcn</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Same components.json, same cn() utility, same CSS variables.
                Works in any existing shadcn project without conflicts.
              </p>
            </div>
            <div>
              <h3 className="font-medium">You own the code</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The CLI copies component source into your project. Edit it,
                extend it, delete it — there is no dependency to outgrow.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Designed, not assembled</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every component is production-grade and accessible, with the
                states most kits skip: loading, empty, error, keyboard.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <span>MIT licensed. Built on shadcn/ui, Radix, and Tailwind.</span>
          <a
            href="https://github.com/rakibulism/cano-ui"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
