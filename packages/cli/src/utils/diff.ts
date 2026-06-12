export interface DiffLine {
  type: "add" | "remove" | "same"
  line: string
}

/** Minimal LCS-based line diff — enough for `cano-ui diff` output. */
export function diffLines(a: string, b: string): DiffLine[] {
  const aLines = a.split("\n")
  const bLines = b.split("\n")
  const m = aLines.length
  const n = bLines.length

  // LCS table (files are component-sized; O(m*n) is fine).
  const lcs: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  )
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      lcs[i][j] =
        aLines[i] === bLines[j]
          ? lcs[i + 1][j + 1] + 1
          : Math.max(lcs[i + 1][j], lcs[i][j + 1])
    }
  }

  const out: DiffLine[] = []
  let i = 0
  let j = 0
  while (i < m && j < n) {
    if (aLines[i] === bLines[j]) {
      out.push({ type: "same", line: aLines[i] })
      i++
      j++
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      out.push({ type: "remove", line: aLines[i] })
      i++
    } else {
      out.push({ type: "add", line: bLines[j] })
      j++
    }
  }
  while (i < m) out.push({ type: "remove", line: aLines[i++] })
  while (j < n) out.push({ type: "add", line: bLines[j++] })
  return out
}

export function hasChanges(diff: DiffLine[]): boolean {
  return diff.some((d) => d.type !== "same")
}
