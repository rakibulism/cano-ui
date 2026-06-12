# cano

Components for serious products.

cano is an open registry of design-led components built on [shadcn/ui](https://ui.shadcn.com), Tailwind, and Radix. The CLI copies component source code straight into your project — no npm package to depend on, nothing to outgrow. Everything is free and MIT-licensed, forever.

```bash
npx cano-ui add data-table-pro
```

## Why this exists

shadcn/ui gives you correct, neutral primitives. cano is the design layer on top: opinionated, polished components that look like they came out of Linear, Raycast, or Vercel — ready to ship without a designer. Every component covers the states most kits skip: loading, empty, error, and full keyboard support.

cano is not a competitor to shadcn — it's built on it. Components drop into an existing shadcn setup without conflicts: same `components.json`, same `cn()` utility, same CSS variable names.

## Getting started

In a project that already uses shadcn/ui, no setup is needed:

```bash
npx cano-ui add command-palette
```

Starting from nothing? The CLI installs components into an existing React project, so create one first:

```bash
npx create-next-app@latest my-app
cd my-app
npx cano-ui init   # writes components.json, cn(), and design tokens
npx cano-ui add app-shell
```

The CLI resolves dependencies automatically — cano components from the cano registry, shadcn primitives from the official shadcn registry, npm packages via your package manager (pnpm, npm, yarn, and bun are detected).

Other commands:

```bash
npx cano-ui list                  # everything in the registry
npx cano-ui diff data-table-pro   # compare local copy against the registry
```

Because every item is shadcn registry-item compatible, this also works:

```bash
npx shadcn add https://cano-ui.vercel.app/r/data-table-pro.json
```

## Components (18 at launch)

| Category | Components |
|---|---|
| Layout | App Shell, Settings Layout, Kanban Board |
| Data | Data Table Pro, Team Members Table, Activity Feed |
| Navigation | Command Palette |
| Input | Combobox Filters, Date Range Picker, File Dropzone |
| Flow | Onboarding Stepper |
| Auth | Auth Forms |
| Dashboard | Stats Grid |
| Data viz | Chart Cards |
| Marketing | Pricing Cards |
| Profile | Account Card |
| Feedback | Empty State, Error Page |

Browse them all with live previews at [cano-ui.vercel.app](https://cano-ui.vercel.app).

## Repository layout

```
packages/cli        the cano-ui CLI (init, add, list, diff)
apps/docs           docs/showcase site (Next.js) — also hosts the registry
  registry/ui       component source of truth
  registry/demos    live demos rendered on the docs site
  registry/meta     per-component metadata (deps, category, description)
  public/r          built registry JSON, served at /r/<name>.json
```

To work on it:

```bash
pnpm install
pnpm dev               # docs site at localhost:3000
pnpm build             # builds CLI, registry JSON, and docs site
pnpm build:registry    # rebuild public/r/*.json after editing components
```

## Stack

shadcn/ui conventions · Tailwind v4 · Radix · lucide-react · TanStack Table · cmdk · react-day-picker · Recharts · Next.js · TypeScript.

## Credits

Built on the shoulders of [shadcn/ui](https://ui.shadcn.com) and [Radix](https://www.radix-ui.com). The copy-source distribution model is shadcn's; we use it because it's right.

## License

[MIT](LICENSE) — CLI, registry, components, and docs.
