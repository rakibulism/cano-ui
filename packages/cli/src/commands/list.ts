import { Command } from "commander"
import c from "picocolors"
import { CANO_REGISTRY_URL, fetchIndex } from "../utils/registry.js"
import { logger, highlight } from "../utils/logger.js"

export const list = new Command()
  .name("list")
  .description("list all components in the cano registry")
  .option("--registry <url>", "registry base URL", CANO_REGISTRY_URL)
  .action(async (opts: { registry: string }) => {
    const index = await fetchIndex(opts.registry)

    const byCategory = new Map<string, typeof index>()
    for (const item of index) {
      const cat = item.category ?? "other"
      if (!byCategory.has(cat)) byCategory.set(cat, [])
      byCategory.get(cat)!.push(item)
    }

    logger.break()
    logger.info(c.bold(`cano registry — ${index.length} components`))
    for (const [category, items] of [...byCategory.entries()].sort()) {
      logger.break()
      logger.info(c.bold(category.toUpperCase()))
      const pad = Math.max(...items.map((i) => i.name.length)) + 2
      for (const item of items.sort((a, b) => a.name.localeCompare(b.name))) {
        logger.info(
          `  ${highlight(item.name.padEnd(pad))}${c.dim(item.description)}`
        )
      }
    }
    logger.break()
    logger.dim(`Add one with: npx cano-ui add <name>`)
  })
