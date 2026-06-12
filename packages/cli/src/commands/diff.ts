import fs from "node:fs"
import path from "node:path"
import { Command } from "commander"
import c from "picocolors"
import { readConfig, resolvePaths } from "../utils/config.js"
import { CANO_REGISTRY_URL, fetchItem } from "../utils/registry.js"
import { diffLines, hasChanges } from "../utils/diff.js"
import { logger, highlight } from "../utils/logger.js"

export const diff = new Command()
  .name("diff")
  .description("compare local components against the registry version")
  .argument("<components...>", "components to diff")
  .option("-c, --cwd <cwd>", "working directory", process.cwd())
  .option("--registry <url>", "registry base URL", CANO_REGISTRY_URL)
  .action(
    async (components: string[], opts: { cwd: string; registry: string }) => {
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

      for (const name of components) {
        const item = await fetchItem(name, opts.registry)
        if (!item) {
          logger.error(`${name}: not found in the registry`)
          continue
        }

        for (const file of item.files ?? []) {
          const local = path.join(paths.ui, path.basename(file.path))
          if (!fs.existsSync(local)) {
            logger.warn(
              `${name}: ${path.relative(cwd, local)} not installed locally`
            )
            continue
          }
          const localContent = fs.readFileSync(local, "utf8")
          const d = diffLines(localContent, file.content)
          if (!hasChanges(d)) {
            logger.success(`${name}: up to date`)
            continue
          }

          const added = d.filter((l) => l.type === "add").length
          const removed = d.filter((l) => l.type === "remove").length
          logger.break()
          logger.info(
            c.bold(
              `${path.relative(cwd, local)} ${c.green(`+${added}`)} ${c.red(`-${removed}`)}`
            )
          )
          for (const line of d) {
            if (line.type === "add") console.log(c.green(`+ ${line.line}`))
            else if (line.type === "remove")
              console.log(c.red(`- ${line.line}`))
          }
        }
      }
    }
  )
