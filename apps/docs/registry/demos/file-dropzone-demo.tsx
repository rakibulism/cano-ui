"use client"

import * as React from "react"

import {
  FileDropzone,
  type DropzoneFile,
} from "@/registry/ui/file-dropzone"

const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export default function FileDropzoneDemo() {
  const [files, setFiles] = React.useState<DropzoneFile[]>([
    {
      id: "seed-1",
      name: "acme-brand-guidelines.pdf",
      size: 2_415_000,
      status: "done",
    },
  ])
  const idCounter = React.useRef(0)
  const intervals = React.useRef<Map<string, number>>(new Map())

  React.useEffect(() => {
    const current = intervals.current
    return () => {
      current.forEach((interval) => window.clearInterval(interval))
      current.clear()
    }
  }, [])

  function stopSimulation(id: string) {
    const interval = intervals.current.get(id)
    if (interval !== undefined) {
      window.clearInterval(interval)
      intervals.current.delete(id)
    }
  }

  function simulateUpload(id: string) {
    const interval = window.setInterval(() => {
      setFiles((previous) =>
        previous.map((file) => {
          if (file.id !== id || file.status !== "uploading") return file
          const next = Math.min(100, (file.progress ?? 0) + 8 + Math.random() * 10)
          if (next >= 100) {
            stopSimulation(id)
            return { ...file, progress: 100, status: "done" as const }
          }
          return { ...file, progress: next }
        })
      )
    }, 250)
    intervals.current.set(id, interval)
  }

  function handleFilesAccepted(accepted: File[]) {
    const entries: DropzoneFile[] = accepted.map((file) => {
      idCounter.current += 1
      return {
        id: `upload-${idCounter.current}`,
        name: file.name,
        size: file.size,
        progress: 0,
        status: "uploading" as const,
      }
    })
    setFiles((previous) => [...previous, ...entries])
    entries.forEach((entry) => simulateUpload(entry.id))
  }

  function handleRemove(id: string) {
    stopSimulation(id)
    setFiles((previous) => previous.filter((file) => file.id !== id))
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <FileDropzone
        accept=".pdf,.png,.jpg,.jpeg,.svg"
        maxSize={MAX_SIZE}
        maxFiles={5}
        multiple
        hint="PDF, PNG, JPG or SVG, up to 10 MB each (max 5 files)"
        files={files}
        onFilesAccepted={handleFilesAccepted}
        onRemove={handleRemove}
      />
    </div>
  )
}
