/**
 * The templates catalog — full pages and apps composed from cano components.
 * Two kinds: marketing "website" templates and interactive "saas" products.
 *
 * Adding a template = append an entry here, create the page component at
 * `templates/<slug>.tsx` (default export), and register it in
 * `templates/index.tsx`. The gallery, filters, and preview routes pick it up.
 */
export type TemplateKind = "website" | "saas"
export type TemplatePages = "single" | "multi"

export interface TemplateMeta {
  slug: string
  name: string
  description: string
  kind: TemplateKind
  /** Category slug — see CATEGORIES. */
  category: string
  pages: TemplatePages
  tags: string[]
  /** cano components the template is built from. */
  components: string[]
  /** Higher = newer; drives the "Newest" sort. */
  order: number
}

export interface Category {
  slug: string
  label: string
  kind: TemplateKind
}

export const CATEGORIES: Category[] = [
  // Website categories (≥20 templates each, single + multi-page).
  { slug: "marketing-landing", label: "Marketing & Landing", kind: "website" },
  { slug: "saas-software", label: "SaaS & Software", kind: "website" },
  { slug: "ecommerce", label: "E-commerce & Retail", kind: "website" },
  { slug: "startup-launch", label: "Startup & Product Launch", kind: "website" },
  { slug: "agency-studio", label: "Agency & Studio", kind: "website" },
  { slug: "portfolio", label: "Portfolio & Personal", kind: "website" },
  { slug: "blog-publishing", label: "Blog & Publishing", kind: "website" },
  { slug: "corporate", label: "Corporate & Business", kind: "website" },
  { slug: "events", label: "Events & Conferences", kind: "website" },
  { slug: "education", label: "Education & Community", kind: "website" },
  // SaaS product categories.
  { slug: "analytics", label: "Analytics", kind: "saas" },
  { slug: "crm", label: "CRM & Sales", kind: "saas" },
  { slug: "project", label: "Project Management", kind: "saas" },
  { slug: "finance", label: "Finance & Billing", kind: "saas" },
  { slug: "ai", label: "AI & Chat", kind: "saas" },
  { slug: "full-product", label: "Full Products", kind: "saas" },
]

export const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label])
)

export const TEMPLATES: TemplateMeta[] = [
  {
    slug: "saas-landing",
    name: "SaaS Landing",
    description:
      "A conversion-focused SaaS landing page — hero, logos, features, metrics, pricing, testimonials, FAQ, and CTA.",
    kind: "website",
    category: "marketing-landing",
    pages: "single",
    tags: ["landing", "saas", "pricing", "marketing"],
    components: [
      "button",
      "badge",
      "card",
      "accordion",
      "stats-grid",
      "pricing-cards",
      "testimonial-cards",
    ],
    order: 2,
  },
  {
    slug: "analytics-dashboard",
    name: "Analytics Dashboard",
    description:
      "An interactive analytics dashboard with a range switcher, KPI cards, charts, a top-pages table, and an activity feed.",
    kind: "saas",
    category: "analytics",
    pages: "single",
    tags: ["dashboard", "analytics", "charts", "interactive"],
    components: [
      "app-shell",
      "stats-grid",
      "chart-cards",
      "data-table-pro",
      "activity-feed",
      "button-group",
      "tabs",
    ],
    order: 1,
  },
]

export function getTemplate(slug: string): TemplateMeta | null {
  return TEMPLATES.find((t) => t.slug === slug) ?? null
}
