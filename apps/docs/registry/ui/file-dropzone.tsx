"use client"

import * as React from "react"
import { AlertCircle, CheckCircle2, File, Upload, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export interface DropzoneFile {
  id: string
  name: string
  size: number
  /** 0–100, shown while status is "uploading". */
  progress?: number
  status: "uploading" | "done" | "error"
  error?: string
}

interface RejectedFile {
  name: string
  reason: string
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B"
  const k = 1024
  const units = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1)
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : decimals)} ${units[i]}`
}

function matchesAccept(file: globalThis.File, accept?: string): boolean {
  if (!accept) return true
  const rules = accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)
  if (rules.length === 0) return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return rules.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule)
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1))
    return type === rule
  })
}

export interface FileDropzoneProps {
  /** Comma-separated accept list, e.g. ".pdf,image/*". */
  accept?: string
  /** Maximum file size in bytes. */
  maxSize?: number
  /** Maximum total number of files (including the controlled list). */
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  onFilesAccepted: (files: globalThis.File[]) => void
  /** Controlled list of files rendered below the drop area. */
  files?: DropzoneFile[]
  onRemove?: (id: string) => void
  /** Hint line under the main label, e.g. "PNG or PDF up to 10 MB". */
  hint?: string
  className?: string
}

function FileDropzone({
  accept,
  maxSize,
  maxFiles,
  multiple = true,
  disabled = false,
  onFilesAccepted,
  files = [],
  onRemove,
  hint,
  className,
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [rejections, setRejections] = React.useState<RejectedFile[]>([])

  function openFileDialog() {
    if (!disabled) inputRef.current?.click()
  }

  function handleFiles(fileList: FileList | null) {
    if (disabled || !fileList || fileList.length === 0) return

    const incoming = multiple ? Array.from(fileList) : Array.from(fileList).slice(0, 1)
    const accepted: globalThis.File[] = []
    const rejected: RejectedFile[] = []
    let remaining =
      maxFiles !== undefined
        ? Math.max(0, maxFiles - files.length)
        : Number.POSITIVE_INFINITY

    for (const file of incoming) {
      if (!matchesAccept(file, accept)) {
        rejected.push({ name: file.name, reason: "File type is not allowed." })
        continue
      }
      if (maxSize !== undefined && file.size > maxSize) {
        rejected.push({
          name: file.name,
          reason: `File is larger than ${formatBytes(maxSize, 0)}.`,
        })
        continue
      }
      if (remaining <= 0) {
        rejected.push({
          name: file.name,
          reason: `File limit reached (max ${maxFiles} files).`,
        })
        continue
      }
      accepted.push(file)
      remaining -= 1
    }

    setRejections(rejected)
    if (accepted.length > 0) onFilesAccepted(accepted)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload files: drag files here or activate to browse"
        aria-disabled={disabled || undefined}
        onClick={openFileDialog}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            openFileDialog()
          }
        }}
        onDragOver={(event) => {
          event.preventDefault()
          if (!disabled) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          handleFiles(event.dataTransfer.files)
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-10 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          isDragging && "border-primary bg-accent/50",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
          <Upload className="size-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Drag files here or click to browse
          </p>
          {hint ? (
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          onChange={(event) => {
            handleFiles(event.target.files)
            event.target.value = ""
          }}
        />
      </div>

      <div aria-live="polite" className="flex flex-col gap-1 empty:hidden">
        {rejections.map((rejection) => (
          <p
            key={`${rejection.name}-${rejection.reason}`}
            className="flex items-center gap-2 text-sm text-destructive"
          >
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 truncate">
              {rejection.name}: {rejection.reason}
            </span>
          </p>
        ))}
      </div>

      {files.length > 0 ? (
        <ul aria-live="polite" className="flex flex-col gap-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center gap-3 rounded-md border p-3"
            >
              <File
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatBytes(file.size)}
                  </span>
                </div>
                {file.status === "uploading" ? (
                  <Progress
                    value={file.progress ?? 0}
                    className="mt-2 h-1"
                    aria-label={`Uploading ${file.name}`}
                  />
                ) : null}
                {file.status === "error" && file.error ? (
                  <p className="mt-1 text-xs text-destructive">{file.error}</p>
                ) : null}
              </div>
              {file.status === "done" ? (
                <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
              ) : null}
              {file.status === "error" ? (
                <AlertCircle
                  className="size-4 shrink-0 text-destructive"
                  aria-hidden="true"
                />
              ) : null}
              {onRemove ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => onRemove(file.id)}
                >
                  <X aria-hidden="true" />
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { FileDropzone }
