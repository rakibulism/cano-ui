# Contributing to cano

Thanks for your interest. The bar for components in this registry is deliberately high — design quality is the whole point of the project. Read this before opening a PR.

## What gets accepted

A component belongs in cano if:

1. **shadcn doesn't ship it** (or ships only a bare primitive of it).
2. **It's genuinely hard to get right** — states, accessibility, responsive behavior.
3. **Design quality is the differentiator** — it should look designed, not assembled.

Bug fixes, accessibility improvements, and polish to existing components are always welcome.

## Component requirements

Every component must:

- Style **only with design tokens** (`bg-background`, `text-muted-foreground`, `border`, …). No hardcoded colors. Borders are 1px — never heavier.
- Use the standard shadcn conventions: `cn()` from `@/lib/utils`, primitives from `@/components/ui/<name>`, other cano components from `@/registry/ui/<name>`.
- Cover its states: default, hover, loading (skeleton), empty, error, disabled — as applicable.
- Be accessible: semantic elements, ARIA attributes, keyboard operability, focus management. Drag interactions need a keyboard fallback.
- Be generic and props-driven. No sample data inside the component file.
- Use only dependencies already in the stack (Radix, lucide-react, TanStack Table, cmdk, react-day-picker, date-fns, Recharts). Adding a new dependency needs a strong case.

## Anatomy of a contribution

Each component is three files in `apps/docs`:

```
registry/ui/<name>.tsx          component source (what users receive)
registry/demos/<name>-demo.tsx  realistic demo, default export, no lorem ipsum
registry/meta/<name>.json       name, title, description, category, deps, registryDependencies, files
```

Then:

1. Register the demo in `registry/demos/index.tsx`.
2. Run `pnpm build:registry` to regenerate `public/r/`.
3. Run `pnpm build` — typecheck and production build must pass.
4. Include a spec in the PR description following the template: Purpose, Anatomy, Variants, States, Tokens used, Responsive behavior, Accessibility notes, Dependencies.

## Voice

Descriptions and docs are direct and documentation-style. Describe, don't sell.

## License

By contributing you agree your contribution is licensed under the MIT license.
