import type { Metadata } from "next"

import { DocsArticle } from "@/components/site/docs"

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Notable changes to the cano registry, components, and CLI, newest first.",
}

interface Release {
  version: string
  date: string
  tag?: string
  changes: string[]
}

const RELEASES: Release[] = [
  {
    version: "0.1.7",
    date: "June 13, 2026",
    tag: "Docs",
    changes: [
      "Announced the Cano CLI — a full-screen terminal app — across the site, with a homepage banner and a dedicated section.",
      "Added a documentation section at /docs with a left sidebar, prev/next pager, and pages for Introduction, Installation, Using components, and the CLI.",
      "Reworked the site header into real navigation (Docs, Components, CLI, GitHub) with active-route highlighting.",
    ],
  },
  {
    version: "0.1.6",
    date: "June 13, 2026",
    tag: "Components",
    changes: [
      "Added country-input — a searchable country combobox with emoji flags and dial codes.",
      "Added phone-number-input — a flag and dial-code picker with E.164 output.",
      "Added language-search — a searchable language list with flags and native names.",
    ],
  },
  {
    version: "0.1.5",
    date: "June 13, 2026",
    tag: "Components",
    changes: [
      "Added six form components: input-field, input-group, number-input, otp-input, pagination-bar, and card-payment-input.",
      "Security: forced esbuild ≥ 0.28.1 to resolve GHSA-gv7w-rqvm-qjhr.",
    ],
  },
  {
    version: "0.1.4",
    date: "June 13, 2026",
    tag: "Components",
    changes: [
      "Added kbd, search-bar, and search-results.",
      "Added site-wide component search on the Components page, with match highlighting and a ⌘K shortcut.",
    ],
  },
  {
    version: "0.1.3",
    date: "June 13, 2026",
    tag: "Components",
    changes: [
      "Added button-pro, button-group, slider-field, and progress-bar.",
      "Added the rich-tooltip placement playground with title, shortcut, and bound-box toggles.",
    ],
  },
  {
    version: "0.1.2",
    date: "June 12, 2026",
    tag: "Components",
    changes: [
      "Added eight components across the dashboard and feedback categories, plus drawer, bottom-sheet, and rich-tooltip.",
      "Added the npm publish and public-repo sync workflows.",
      "Security: forced postcss ≥ 8.5.10 to resolve GHSA-qx2v-qp2m-jg93.",
    ],
  },
  {
    version: "0.1.1",
    date: "June 12, 2026",
    tag: "Launch",
    changes: [
      "First public release: 18 design-led components, the cano-ui CLI, and the docs site.",
      "Added a GitHub raw registry fallback and package LICENSE.",
    ],
  },
]

export default function ChangelogPage() {
  return (
    <DocsArticle
      title="Changelog"
      lead="Notable changes to the cano registry, components, and CLI — newest first. Every higher-level change lands here."
    >
      <p>
        The separate Cano CLI terminal app{" "}
        <a
          href="https://www.npmjs.com/package/cano-cli"
          target="_blank"
          rel="noreferrer"
        >
          (cano-cli)
        </a>{" "}
        is versioned independently on npm.
      </p>

      <div className="!mt-8 flex flex-col">
        {RELEASES.map((release) => (
          <section
            key={release.version}
            className="relative flex flex-col gap-3 border-l pb-10 pl-6 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-background bg-foreground"
            />
            <div className="flex items-center gap-3">
              <h2 className="!mt-0 text-lg font-semibold tabular-nums">
                {release.version}
              </h2>
              {release.tag ? (
                <span className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
                  {release.tag}
                </span>
              ) : null}
              <span className="text-sm text-muted-foreground">
                {release.date}
              </span>
            </div>
            <ul className="!mt-0 flex flex-col gap-2 pl-5">
              {release.changes.map((change, i) => (
                <li key={i}>{change}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </DocsArticle>
  )
}
