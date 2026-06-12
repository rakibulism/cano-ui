import c from "picocolors"

export const logger = {
  info: (msg: string) => console.log(msg),
  dim: (msg: string) => console.log(c.dim(msg)),
  success: (msg: string) => console.log(`${c.green("✔")} ${msg}`),
  warn: (msg: string) => console.log(`${c.yellow("▲")} ${msg}`),
  error: (msg: string) => console.error(`${c.red("✖")} ${msg}`),
  step: (msg: string) => console.log(`${c.cyan("›")} ${msg}`),
  break: () => console.log(""),
}

export function highlight(text: string) {
  return c.cyan(text)
}

export function bold(text: string) {
  return c.bold(text)
}

export function dim(text: string) {
  return c.dim(text)
}
