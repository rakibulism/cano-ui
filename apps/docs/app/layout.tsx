import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { UpdateNotifier } from "@/components/site/update-notifier"

export const metadata: Metadata = {
  title: {
    default: "cano — Components for serious products",
    template: "%s — cano",
  },
  description:
    "An open registry of design-led components built on shadcn/ui, Tailwind, and Radix. Free, MIT-licensed, forever.",
}

export const viewport: Viewport = {
  // Native UI (scrollbars, form controls) follows the OS preference.
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

// Applies the saved theme (or the OS preference, the default) to <html>
// before first paint so there's no flash, and tracks live OS changes while
// the page follows the system.
const themeScript = `(function(){try{var m=window.matchMedia("(prefers-color-scheme: dark)");var a=function(){var t=localStorage.getItem("theme")||"system";document.documentElement.classList.toggle("dark",t==="dark"||(t==="system"&&m.matches))};a();m.addEventListener("change",a)}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        {children}
        <UpdateNotifier />
      </body>
    </html>
  )
}
