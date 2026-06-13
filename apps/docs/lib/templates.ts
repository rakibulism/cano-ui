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
  {
    slug: "agency-studio",
    name: "Agency Studio",
    description: "A creative agency site: sticky nav, bold hero, services grid, selected-work gallery, team avatars, client logos, testimonial, contact CTA, footer.",
    kind: "website",
    category: "agency-studio",
    pages: "single",
    tags: ["website", "agency-studio"],
    components: ["button", "badge", "input", "textarea", "label", "separator", "avatar"],
    order: 3,
  },
  {
    slug: "personal-portfolio",
    name: "Personal Portfolio",
    description: "A developer/designer portfolio: hero intro with avatar, featured projects cards, about, skills badges, experience timeline, contact, footer.",
    kind: "website",
    category: "portfolio",
    pages: "single",
    tags: ["website", "portfolio"],
    components: ["button", "card", "badge", "input", "label", "textarea", "separator", "avatar"],
    order: 4,
  },
  {
    slug: "ecommerce-store",
    name: "E-commerce Store",
    description: "A storefront home: nav with cart, hero promo, category tiles, featured product grid with prices and add-to-cart, reviews, newsletter, footer.",
    kind: "website",
    category: "ecommerce",
    pages: "single",
    tags: ["website", "ecommerce"],
    components: ["button", "card", "badge", "input", "avatar", "separator"],
    order: 5,
  },
  {
    slug: "startup-launch",
    name: "Startup Launch",
    description: "A pre-launch startup page: hero with waitlist email input, problem vs solution, feature highlights, how-it-works steps, founders, FAQ accordion, footer.",
    kind: "website",
    category: "startup-launch",
    pages: "single",
    tags: ["website", "startup-launch"],
    components: ["button", "card", "badge", "input", "separator", "avatar", "accordion"],
    order: 6,
  },
  {
    slug: "corporate-business",
    name: "Corporate Business",
    description: "A corporate site: nav, hero, services cards, stats band, leadership team, case study highlight, partner logos, contact CTA, footer.",
    kind: "website",
    category: "corporate",
    pages: "single",
    tags: ["website", "corporate"],
    components: ["button", "card", "badge", "input", "label", "textarea", "separator", "avatar"],
    order: 7,
  },
  {
    slug: "blog-magazine",
    name: "Blog Magazine",
    description: "A magazine/blog home: nav with categories, featured hero article, latest posts grid with tags and author avatars, category sidebar, newsletter, footer.",
    kind: "website",
    category: "blog-publishing",
    pages: "single",
    tags: ["website", "blog-publishing"],
    components: ["button", "card", "badge", "input", "separator", "avatar"],
    order: 8,
  },
  {
    slug: "event-conference",
    name: "Event Conference",
    description: "A conference landing: hero with date/location and register CTA, speakers grid, agenda/schedule list with tabs for days, ticket tiers, sponsors, footer.",
    kind: "website",
    category: "events",
    pages: "single",
    tags: ["website", "events"],
    components: ["button", "card", "badge", "input", "separator", "avatar", "tabs"],
    order: 9,
  },
  {
    slug: "course-landing",
    name: "Course Landing",
    description: "An online course landing: hero with enroll CTA, what-you-learn checklist, curriculum accordion, instructor bio, student testimonials, pricing, FAQ, footer.",
    kind: "website",
    category: "education",
    pages: "single",
    tags: ["website", "education"],
    components: ["button", "card", "badge", "separator", "avatar", "accordion"],
    order: 10,
  },
  {
    slug: "crm-dashboard",
    name: "CRM Dashboard",
    description: "An interactive CRM dashboard: left sidebar nav, topbar with search, KPI cards (pipeline value, deals, win rate), a deals table with stage badges, tasks list with checkboxes, recent activity. Use useState for a stage filter that filters the deals table.",
    kind: "saas",
    category: "crm",
    pages: "single",
    tags: ["saas", "crm"],
    components: ["button", "card", "badge", "input", "separator", "avatar", "table", "checkbox"],
    order: 11,
  },
  {
    slug: "project-dashboard",
    name: "Project Dashboard",
    description: "An interactive project management dashboard: sidebar nav, topbar, KPI cards, a kanban-style 3-column board (To do / In progress / Done) of task cards, a progress bar per project, team avatars. Use useState to switch a tab between My tasks / Team.",
    kind: "saas",
    category: "project",
    pages: "single",
    tags: ["saas", "project"],
    components: ["button", "card", "badge", "input", "progress", "avatar"],
    order: 12,
  },
]

export function getTemplate(slug: string): TemplateMeta | null {
  return TEMPLATES.find((t) => t.slug === slug) ?? null
}
