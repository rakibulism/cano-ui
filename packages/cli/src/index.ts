import { Command } from "commander"
import { init } from "./commands/init.js"
import { add } from "./commands/add.js"
import { list } from "./commands/list.js"
import { diff } from "./commands/diff.js"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

const program = new Command()
  .name("cano-ui")
  .description(
    "cano — design-led components for your existing shadcn/Tailwind setup"
  )
  .version("0.1.0", "-v, --version")

program.addCommand(init)
program.addCommand(add)
program.addCommand(list)
program.addCommand(diff)

program.parse()
