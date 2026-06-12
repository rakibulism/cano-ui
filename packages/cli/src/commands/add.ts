import fs from "node:fs"
import path from "node:path"
import { Command } from "commander"
import prompts from "prompts"
import { readConfig, resolvePaths } from "../utils/config.js"
import {
  CANO_REGISTRY_URL,
  resolveTree,
  type RegistryItem,
} from "../utils/registry.js"
import { installPackages, readInstalledDeps } from "../utils/packages.js"
import { logger, highlight, dim } from "../utils/logger.js"

interface AddOptions {
  yes: boolean
  overwrite: boolean
  dryRun: boolean
  cwd: string
  registry: string
}

export const add = new Command()
  .name("add")
  .description("add a component and its dependencies to your project")
  .argument("<components...>", "components to add (e.g. data-table-pro)")
  .option("-y, --yes", "skip confirmation prompts", false)
  .option("-o, --overwrite", "overwrite existing files", false)
  .option("--dry-run", "show what would be written without writing", false)
  .option("-c, --cwd <cwd>", "working directory", process.cwd())
  .option("--registry <url>", "registry base URL", CANO_REGISTRY_URL)
  .action(async (components: string[], opts: AddOptions) => {
    const cwd = path.resolve(opts.cwd)
    const config = readConfig(cwd)
    if (!config) {
      logger.error(
        `No components.json found. Run ${highlight("npx cano-ui init")} first.`
      )
      process.exitCode = 1
      return
    }
    const paths = resolvePaths(cwd, config)

    logger.step(`Resolving ${components.join(", ")}…`)
    const { items, missing } = await resolveTree(components, opts.registry)

    // Only fail hard if something the user asked for by name is missing —
    // transitive misses are reported but don't block the rest.
    const requestedMissing = missing.filter((m) => components.includes(m))
    if (requestedMissing.length > 0) {
      logger.error(
        `Not found in the registry: ${requestedMissing.join(", ")}. Run ${highlight("npx cano-ui list")} to see what's available.`
      )
      process.exitCode = 1
      return
    }
    for (const m of missing) {
      logger.warn(`Skipping unresolved dependency: ${m}`)
    }

    const canoItems = items.filter((i) => i.source === "cano")
    const shadcnItems = items.filter((i) => i.source === "shadcn")
    logger.info(
      `  ${canoItems.length} cano component(s)` +
        (shadcnItems.length > 0
          ? dim(` + ${shadcnItems.length} shadcn primitive(s)`)
          : "")
    )

    // Collect files and npm deps across the resolved tree.
    const writes: { target: string; content: string; item: string }[] = []
    const deps = new Set<string>()
    for (const item of items) {
      for (const dep of item.dependencies ?? []) deps.add(dep)
      for (const file of item.files ?? []) {
        writes.push({
          target: resolveTarget(cwd, paths, file.path, file.target),
          content: file.content,
          item: item.name,
        })
      }
    }

    const installed = readInstalledDeps(cwd)
    const depsToInstall = [...deps].filter((d) => {
      // dep may be pinned like "recharts@2" — match on the bare name
      const bare = d.startsWith("@")
        ? d.split("@").slice(0, 2).join("@")
        : d.split("@")[0]
      return !installed.has(bare)
    })

    if (opts.dryRun) {
      logger.break()
      logger.info("Would write:")
      for (const w of writes) logger.dim(`  ${path.relative(cwd, w.target)}`)
      if (depsToInstall.length > 0) {
        logger.info("Would install:")
        logger.dim(`  ${depsToInstall.join(", ")}`)
      }
      return
    }

    let written = 0
    let skipped = 0
    for (const w of writes) {
      const exists = fs.existsSync(w.target)
      if (exists && !opts.overwrite) {
        const current = fs.readFileSync(w.target, "utf8")
        if (current === w.content) {
          skipped++
          continue
        }
        if (opts.yes) {
          logger.warn(
            `Skipped ${path.relative(cwd, w.target)} (exists — use --overwrite)`
          )
          skipped++
          continue
        }
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `${path.relative(cwd, w.target)} already exists. Overwrite?`,
          initial: false,
        })
        if (!overwrite) {
          skipped++
          continue
        }
      }
      fs.mkdirSync(path.dirname(w.target), { recursive: true })
      fs.writeFileSync(w.target, w.content)
      logger.success(`${path.relative(cwd, w.target)}`)
      written++
    }

    // Per-component CSS variables, appended once per component.
    applyCssVars(cwd, paths.css, items)

    if (depsToInstall.length > 0) {
      logger.step(`Installing ${depsToInstall.join(", ")}…`)
      await installPackages(cwd, depsToInstall)
    }

    logger.break()
    logger.success(
      `Done — ${written} file(s) written${skipped > 0 ? `, ${skipped} skipped` : ""}.`
    )
  })

/**
 * Map a registry file path like "components/ui/data-table-pro.tsx" onto the
 * user's configured aliases (so src/ layouts, custom ui dirs, etc. work).
 */
function resolveTarget(
  cwd: string,
  paths: ReturnType<typeof resolvePaths>,
  filePath: string,
  explicitTarget?: string
): string {
  if (explicitTarget) {
    return path.resolve(cwd, explicitTarget.replace(/^~\//, ""))
  }
  const normalized = filePath.replace(/^\.\//, "").replace(/^src\//, "")
  if (normalized.startsWith("components/ui/")) {
    return path.join(paths.ui, normalized.slice("components/ui/".length))
  }
  if (normalized.startsWith("components/")) {
    return path.join(paths.components, normalized.slice("components/".length))
  }
  if (normalized.startsWith("lib/")) {
    return path.join(paths.lib, normalized.slice("lib/".length))
  }
  if (normalized.startsWith("hooks/")) {
    return path.join(paths.hooks, normalized.slice("hooks/".length))
  }
  // registry-style paths ("registry/ui/x.tsx") or anything else → ui dir
  const base = path.basename(normalized)
  return path.join(paths.ui, base)
}

function applyCssVars(
  cwd: string,
  cssFile: string | null,
  items: RegistryItem[]
) {
  if (!cssFile || !fs.existsSync(cssFile)) return
  let css = fs.readFileSync(cssFile, "utf8")
  let changed = false

  for (const item of items) {
    if (!item.cssVars) continue
    const marker = `/* cano:${item.name} */`
    if (css.includes(marker)) continue

    let block = `\n${marker}\n`
    const light = item.cssVars.light ?? {}
    const dark = item.cssVars.dark ?? {}
    if (Object.keys(light).length > 0) {
      block += `:root {\n${Object.entries(light)
        .map(([k, v]) => `  ${k.startsWith("--") ? k : `--${k}`}: ${v};`)
        .join("\n")}\n}\n`
    }
    if (Object.keys(dark).length > 0) {
      block += `.dark {\n${Object.entries(dark)
        .map(([k, v]) => `  ${k.startsWith("--") ? k : `--${k}`}: ${v};`)
        .join("\n")}\n}\n`
    }
    css += block
    changed = true
    logger.success(`Added CSS variables for ${item.name}`)
  }

  if (changed) fs.writeFileSync(cssFile, css)
}
