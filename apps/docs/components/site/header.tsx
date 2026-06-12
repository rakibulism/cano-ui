import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight"
          aria-label="cano home"
        >
          cano
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6 text-sm">
          <Link
            href="/components"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <a
            href="https://github.com/rakibulism/cano-ui"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
