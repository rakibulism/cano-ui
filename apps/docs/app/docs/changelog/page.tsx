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
  time: string
  tag?: string
  changes: string[]
}

const RELEASES: Release[] = [
  {
    version: "0.1.14",
    date: "June 13, 2026",
    time: "6:52 PM",
    tag: "Components",
    changes: [
      "Completed the standard primitive set: added item, field, typography, carousel, resizable, and sidebar.",
      "The registry now spans 68 components — the full shadcn primitive set plus cano's design-led components.",
    ],
  },
  {
    version: "0.1.13",
    date: "June 13, 2026",
    time: "6:34 PM",
    tag: "UX",
    changes: [
      "Component categories on the Components page are now collapsible, with a show-all / collapse-all toggle for scanning the whole library at a glance.",
      "Changelog and Updates now show the time of each change, not just the date.",
    ],
  },
  {
    version: "0.1.12",
    date: "June 13, 2026",
    time: "6:20 PM",
    tag: "Templates",
    changes: [
      "Templates wave 1 — 10 new templates: agency, portfolio, e-commerce, startup, corporate, blog, event, and course websites, plus interactive CRM and project-management dashboards.",
      "Docs sidebar categories are now collapsible.",
    ],
  },
  {
    version: "0.1.11",
    date: "June 13, 2026",
    time: "6:06 PM",
    tag: "Templates",
    changes: [
      "Launched Templates — a gallery of full pages and interactive SaaS products built from cano components, with filter, sort, search, and full-screen previews.",
      "Seeded with a SaaS landing page (website) and an interactive analytics dashboard (SaaS product); many more rolling out.",
    ],
  },
  {
    version: "0.1.10",
    date: "June 13, 2026",
    time: "5:52 PM",
    tag: "Components",
    changes: [
      "More standard primitives (batch 3): sonner (toasts), menubar, and navigation-menu.",
      "Added an update notifier: when a new version ships, the site offers a one-click reload (or skip).",
    ],
  },
  {
    version: "0.1.9",
    date: "June 13, 2026",
    time: "5:38 PM",
    tag: "Components",
    changes: [
      "More standard primitives (batch 2): alert-dialog, radio-group, hover-card, context-menu, scroll-area, and native-select.",
    ],
  },
  {
    version: "0.1.8",
    date: "June 13, 2026",
    time: "5:24 PM",
    tag: "Components",
    changes: [
      "Started filling out the standard primitive set: added accordion, collapsible, toggle, toggle-group, alert, breadcrumb, aspect-ratio, and spinner (batch 1).",
    ],
  },
  {
    version: "0.1.7",
    date: "June 13, 2026",
    time: "5:10 PM",
    tag: "Docs",
    changes: [
      "Announced the Cano CLI — a full-screen terminal app — across the site, with a homepage banner and a dedicated section.",
      "Added a documentation section at /docs with a left sidebar, prev/next pager, and pages for Introduction, Installation, Using components, and the CLI.",
      "Reworked the site header into real navigation (Docs, Components, CLI, GitHub) with active-route highlighting.",
      "Added a category sidebar with scroll-spy to the Components page, and this Changelog.",
      "Added the cano logo mark across the header and footer, and as the favicon.",
      "Enabled automatic light/dark theming that follows the device preference, with no flash and theme-aware logo and favicon.",
      "Added a Light / Dark / System theme toggle in the header that persists the choice and overrides the device preference.",
      "Added a header notifications bell and an Updates feed (/docs/updates) for granular, day-to-day change notes.",
      "Added a “What’s new” highlight that appears under the bell once per session when there are unread updates.",
    ],
  },
  {
    version: "0.1.6",
    date: "June 13, 2026",
    time: "4:56 PM",
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
    time: "4:42 PM",
    tag: "Components",
    changes: [
      "Added six form components: input-field, input-group, number-input, otp-input, pagination-bar, and card-payment-input.",
      "Security: forced esbuild ≥ 0.28.1 to resolve GHSA-gv7w-rqvm-qjhr.",
    ],
  },
  {
    version: "0.1.4",
    date: "June 13, 2026",
    time: "4:28 PM",
    tag: "Components",
    changes: [
      "Added kbd, search-bar, and search-results.",
      "Added site-wide component search on the Components page, with match highlighting and a ⌘K shortcut.",
    ],
  },
  {
    version: "0.1.3",
    date: "June 13, 2026",
    time: "4:14 PM",
    tag: "Components",
    changes: [
      "Added button-pro, button-group, slider-field, and progress-bar.",
      "Added the rich-tooltip placement playground with title, shortcut, and bound-box toggles.",
    ],
  },
  {
    version: "0.1.2",
    date: "June 12, 2026",
    time: "4:00 PM",
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
    time: "3:46 PM",
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
                {release.date} · {release.time}
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
