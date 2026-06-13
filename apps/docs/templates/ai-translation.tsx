"use client"

import * as React from "react"
import {
  Languages,
  ArrowLeftRight,
  Sparkles,
  Copy,
  Volume2,
  Star,
  Clock,
  RotateCcw,
  Check,
  Globe,
  Zap,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

type LangCode = "en" | "es" | "fr" | "de" | "ja" | "pt"
type ToneId = "neutral" | "formal" | "casual" | "fluent"

const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "es", label: "Spanish", flag: "ES" },
  { code: "fr", label: "French", flag: "FR" },
  { code: "de", label: "German", flag: "DE" },
  { code: "ja", label: "Japanese", flag: "JA" },
  { code: "pt", label: "Portuguese", flag: "PT" },
]

const TONES: { id: ToneId; label: string; desc: string }[] = [
  { id: "neutral", label: "Neutral", desc: "Balanced, everyday" },
  { id: "formal", label: "Formal", desc: "Polished & professional" },
  { id: "casual", label: "Casual", desc: "Relaxed & friendly" },
  { id: "fluent", label: "Fluent", desc: "Natural, native-like" },
]

const SAMPLE_SOURCE =
  "Welcome to our launch event. We are thrilled to share what the team has been building, and we can't wait for you to try it. Thank you for being part of this journey."

const OUTPUTS: Record<LangCode, Record<ToneId, string>> = {
  es: {
    neutral:
      "Bienvenido a nuestro evento de lanzamiento. Estamos encantados de compartir lo que el equipo ha estado creando, y no podemos esperar a que lo pruebes. Gracias por ser parte de este recorrido.",
    formal:
      "Le damos la bienvenida a nuestro evento de lanzamiento. Es un honor compartir lo que nuestro equipo ha desarrollado. Le agradecemos sinceramente por acompañarnos en este recorrido.",
    casual:
      "¡Bienvenido a nuestro lanzamiento! Nos muere de ganas mostrarte lo que armó el equipo, y queremos que lo pruebes ya. ¡Gracias por sumarte a esta aventura!",
    fluent:
      "Te damos la bienvenida a nuestro evento de lanzamiento. Nos hace muchísima ilusión enseñarte lo que ha preparado el equipo, y estamos deseando que lo pruebes. Gracias por acompañarnos en este camino.",
  },
  fr: {
    neutral:
      "Bienvenue à notre événement de lancement. Nous sommes ravis de partager ce que l'équipe a construit, et nous avons hâte que vous l'essayiez. Merci de faire partie de cette aventure.",
    formal:
      "Nous vous souhaitons la bienvenue à notre événement de lancement. C'est un honneur de vous présenter le travail de notre équipe. Nous vous remercions vivement de votre présence à nos côtés.",
    casual:
      "Bienvenue à notre lancement ! On a trop hâte de vous montrer ce que l'équipe a concocté, et on veut que vous l'essayiez vite. Merci d'être de la partie !",
    fluent:
      "Bienvenue à notre événement de lancement. Nous sommes vraiment heureux de vous faire découvrir ce que l'équipe a imaginé, et nous avons hâte que vous l'essayiez. Merci de partager ce moment avec nous.",
  },
  de: {
    neutral:
      "Willkommen zu unserer Launch-Veranstaltung. Wir freuen uns, zu zeigen, woran das Team gearbeitet hat, und können es kaum erwarten, dass Sie es ausprobieren. Danke, dass Sie Teil dieser Reise sind.",
    formal:
      "Wir heißen Sie herzlich zu unserer Launch-Veranstaltung willkommen. Es ist uns eine Ehre, Ihnen die Arbeit unseres Teams vorzustellen. Wir danken Ihnen aufrichtig für Ihre Begleitung.",
    casual:
      "Willkommen zu unserem Launch! Wir können's kaum erwarten, dir zu zeigen, was das Team gebaut hat – probier's gleich aus. Danke, dass du dabei bist!",
    fluent:
      "Schön, dass Sie zu unserer Launch-Veranstaltung dabei sind. Wir freuen uns riesig, Ihnen zu zeigen, was das Team auf die Beine gestellt hat, und sind gespannt auf Ihr Feedback. Danke fürs Mitgehen.",
  },
  ja: {
    neutral:
      "ローンチイベントへようこそ。チームが作り上げてきたものを共有できることを嬉しく思います。ぜひお試しください。この旅にご参加いただきありがとうございます。",
    formal:
      "ローンチイベントにご来場いただき、誠にありがとうございます。私どものチームが取り組んでまいりました成果をご紹介できますことを光栄に存じます。心より御礼申し上げます。",
    casual:
      "ローンチイベントへようこそ！チームが作ったもの、早く見せたくてワクワクしてます。ぜひ試してみてね。一緒に来てくれてありがとう！",
    fluent:
      "ローンチイベントへようこそ。チームが心を込めて作ってきたものを、ようやくお届けできます。ぜひ実際に触れてみてください。一緒に歩んでくださってありがとうございます。",
  },
  pt: {
    neutral:
      "Bem-vindo ao nosso evento de lançamento. Estamos felizes em compartilhar o que a equipe vem construindo, e mal podemos esperar para você experimentar. Obrigado por fazer parte desta jornada.",
    formal:
      "Damos-lhe as boas-vindas ao nosso evento de lançamento. É uma honra apresentar o trabalho da nossa equipe. Agradecemos sinceramente por nos acompanhar nesta jornada.",
    casual:
      "Bem-vindo ao nosso lançamento! A gente tá doido pra mostrar o que a equipe fez, e quer que você experimente já. Valeu por estar junto nessa!",
    fluent:
      "Seja muito bem-vindo ao nosso evento de lançamento. Ficamos super animados em mostrar o que a equipe preparou, e mal podemos esperar pelo seu feedback. Obrigado por caminhar conosco.",
  },
  en: {
    neutral:
      "Welcome to our launch event. We are happy to share what the team has been building, and we look forward to you trying it. Thank you for being part of this journey.",
    formal:
      "We warmly welcome you to our launch event. It is an honour to present the work our team has produced. We sincerely thank you for joining us on this journey.",
    casual:
      "Welcome to our launch! We can't wait to show you what the team built, and we'd love for you to try it right away. Thanks for being here!",
    fluent:
      "Welcome to our launch event. We're genuinely excited to share what the team has created, and we can't wait for you to give it a try. Thanks for joining us on this journey.",
  },
}

const HISTORY: {
  id: string
  from: LangCode
  to: LangCode
  snippet: string
  when: string
  starred: boolean
}[] = [
  { id: "h1", from: "en", to: "ja", snippet: "Quarterly report summary for the leadership team", when: "2m ago", starred: true },
  { id: "h2", from: "es", to: "en", snippet: "Resumen de la reunión con el cliente de Madrid", when: "18m ago", starred: false },
  { id: "h3", from: "en", to: "de", snippet: "Product onboarding email — new enterprise tier", when: "1h ago", starred: true },
  { id: "h4", from: "fr", to: "en", snippet: "Notes de la démo produit avec l'équipe design", when: "3h ago", starred: false },
  { id: "h5", from: "en", to: "pt", snippet: "Support macro: refund policy explanation", when: "Yesterday", starred: false },
]

function labelFor(code: LangCode) {
  return LANGUAGES.find((l) => l.code === code)?.label ?? code
}

function flagFor(code: LangCode) {
  return LANGUAGES.find((l) => l.code === code)?.flag ?? code.toUpperCase()
}

export default function AiTranslationTemplate() {
  const [source, setSource] = React.useState(SAMPLE_SOURCE)
  const [from, setFrom] = React.useState<LangCode>("en")
  const [to, setTo] = React.useState<LangCode>("es")
  const [tone, setTone] = React.useState<ToneId>("neutral")
  const [output, setOutput] = React.useState("")
  const [translating, setTranslating] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const charCount = source.length

  function swap() {
    setFrom(to)
    setTo(from)
    setOutput("")
  }

  function translate() {
    if (!source.trim()) return
    setTranslating(true)
    setCopied(false)
    const target = to === from ? "en" : to
    const text = OUTPUTS[target]?.[tone] ?? OUTPUTS.es[tone]
    setOutput(text)
    setTranslating(false)
  }

  function copyOut() {
    if (!output) return
    setCopied(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Languages className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Lingua Studio</p>
              <p className="text-xs text-muted-foreground">AI translation workspace</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 text-sm md:flex">
            <Button variant="ghost" size="sm">Glossaries</Button>
            <Button variant="ghost" size="sm">Documents</Button>
            <Button variant="ghost" size="sm">API</Button>
          </nav>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden gap-1 sm:inline-flex">
              <Zap className="size-3" /> 12.4k chars left
            </Badge>
            <Button size="sm">Upgrade</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Translate</h1>
          <p className="text-sm text-muted-foreground">
            Pick your languages and tone, then let the model render a natural translation.
          </p>
        </div>

        {/* Language + tone controls */}
        <div className="mb-4 flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setFrom(lang.code)
                  setOutput("")
                }}
                aria-pressed={from === lang.code}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  from === lang.code
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                )}
              >
                {lang.flag}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={swap}
            aria-label="Swap source and target languages"
            className="mx-auto shrink-0 sm:mx-1"
          >
            <ArrowLeftRight className="size-4" />
          </Button>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setTo(lang.code)
                  setOutput("")
                }}
                aria-pressed={to === lang.code}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  to === lang.code
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                )}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>

        {/* Tone chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium text-muted-foreground">Tone</span>
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              aria-pressed={tone === t.id}
              title={t.desc}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                tone === t.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "bg-background text-muted-foreground hover:bg-accent"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Two-pane editor */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Source pane */}
          <div className="flex flex-col rounded-xl border bg-card">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-semibold">
                  {flagFor(from)}
                </span>
                {labelFor(from)}
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Clear source text"
                onClick={() => {
                  setSource("")
                  setOutput("")
                }}
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>
            <Textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Type or paste text to translate…"
              className="min-h-[220px] resize-none border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center justify-between border-t px-4 py-2.5 text-xs text-muted-foreground">
              <span>{charCount} characters</span>
              <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
                <Volume2 className="size-3.5" /> Listen
              </button>
            </div>
          </div>

          {/* Output pane */}
          <div className="flex flex-col rounded-xl border bg-muted/30">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
                  {flagFor(to)}
                </span>
                {labelFor(to)}
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Copy translation"
                onClick={copyOut}
                disabled={!output}
              >
                {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
              </Button>
            </div>
            <div className="min-h-[220px] flex-1 px-4 py-3 text-base leading-relaxed">
              {translating ? (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Sparkles className="size-4 animate-pulse" /> Translating…
                </p>
              ) : output ? (
                <p>{output}</p>
              ) : (
                <p className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
                  Your {labelFor(to)} translation will appear here.
                </p>
              )}
            </div>
            <div className="flex items-center justify-between border-t px-4 py-2.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Sparkles className="size-3.5" /> {TONES.find((t) => t.id === tone)?.label} tone
              </span>
              {output && <span>{output.length} characters</span>}
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-xl border bg-card p-4 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            Translating <span className="font-medium text-foreground">{labelFor(from)}</span> to{" "}
            <span className="font-medium text-foreground">{labelFor(to)}</span> with a{" "}
            <span className="font-medium text-foreground">{TONES.find((t) => t.id === tone)?.label.toLowerCase()}</span> tone.
          </p>
          <Button size="lg" onClick={translate} disabled={!source.trim()} className="w-full gap-2 sm:w-auto">
            <Sparkles className="size-4" /> Translate
          </Button>
        </div>

        {/* Recent translations */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="size-4 text-muted-foreground" /> Recent translations
            </h2>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          <div className="overflow-hidden rounded-xl border bg-card">
            {HISTORY.map((item, i) => (
              <div key={item.id}>
                {i > 0 && <Separator />}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold">
                    <span className="rounded bg-muted px-1.5 py-0.5">{flagFor(item.from)}</span>
                    <ArrowLeftRight className="size-3 text-muted-foreground" />
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{flagFor(item.to)}</span>
                  </div>
                  <p className="min-w-0 flex-1 truncate text-sm">{item.snippet}</p>
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">{item.when}</span>
                  <Star
                    className={cn(
                      "size-4 shrink-0",
                      item.starred ? "fill-primary text-primary" : "text-muted-foreground"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature strip */}
        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Globe, title: "32 languages", desc: "Translate across major world languages with context." },
            { icon: FileText, title: "Document mode", desc: "Drop in PDFs and docs, keep the original formatting." },
            { icon: Sparkles, title: "Tone control", desc: "Tune formality and style to match your audience." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-5">
              <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </div>
              <p className="mb-1 text-sm font-semibold">{f.title}</p>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2024 Lingua Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
