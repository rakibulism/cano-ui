"use client"

import * as React from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

/**
 * Toast notifications, powered by sonner. Mount <Toaster /> once near the root
 * of your app, then call `toast(...)` from anywhere. Follows the active theme
 * by watching the `dark` class on <html>.
 */
function Toaster(props: ToasterProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const root = document.documentElement
    const update = () =>
      setTheme(root.classList.contains("dark") ? "dark" : "light")
    update()
    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
