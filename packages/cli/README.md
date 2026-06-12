# cano-ui

The CLI for [cano](https://github.com/rakibulism/cano-ui) — design-led, shadcn-compatible components, copied as source into your project.

```bash
npx cano-ui add data-table-pro
```

## Commands

### `init`

Sets up a project: writes `components.json` (the same schema shadcn uses), creates the `cn()` utility, adds design tokens to your global CSS, and installs base dependencies. Projects that already use shadcn/ui are detected and left untouched — `add` works immediately.

```bash
npx cano-ui init        # interactive
npx cano-ui init -y     # defaults
```

### `add`

Adds components and everything they need: other cano components, shadcn primitives (fetched from the official shadcn registry), and npm packages (installed with your detected package manager).

```bash
npx cano-ui add command-palette
npx cano-ui add app-shell stats-grid --yes
npx cano-ui add data-table-pro --dry-run    # show the plan, write nothing
npx cano-ui add empty-state --overwrite     # replace existing files
```

### `list`

```bash
npx cano-ui list
```

### `diff`

Compare your local copies against the registry — useful after you've edited a component or when the registry version has moved on.

```bash
npx cano-ui diff data-table-pro
```

## Configuration

- Reads `components.json` aliases and tsconfig path mappings, so `src/` layouts and custom directories work.
- `--registry <url>` or `CANO_REGISTRY_URL` points the CLI at a different registry (useful for self-hosting or local development).

## License

MIT
