import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

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

// Applies the OS color scheme to <html> before first paint (no flash) and
// keeps it in sync if the device theme changes while the page is open.
const themeScript = `(function(){try{var m=window.matchMedia("(prefers-color-scheme: dark)");var a=function(d){document.documentElement.classList.toggle("dark",d)};a(m.matches);m.addEventListener("change",function(e){a(e.matches)})}catch(e){}})();`

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
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  )
}
