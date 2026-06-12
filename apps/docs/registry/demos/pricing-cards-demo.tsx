"use client"

import { PricingCards, type PricingTier } from "@/registry/ui/pricing-cards"

const tiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals trying out Acme on a personal project.",
    price: { monthly: 0, yearly: 0 },
    features: [
      "Up to 3 projects",
      "1,000 API requests per month",
      "Community support",
      "7-day activity history",
    ],
    cta: { label: "Get started" },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For small teams shipping production workloads.",
    price: { monthly: 20, yearly: 16 },
    features: [
      "Unlimited projects",
      "100,000 API requests per month",
      "Email support with 24h response",
      "90-day activity history",
      "Preview deployments",
      "Role-based access control",
    ],
    cta: { label: "Start free trial" },
    recommended: true,
  },
  {
    id: "scale",
    name: "Scale",
    description: "For growing companies with advanced security needs.",
    price: { monthly: 99, yearly: 79 },
    features: [
      "Everything in Pro",
      "Unlimited API requests",
      "SAML SSO and SCIM provisioning",
      "Audit logs and data export",
      "99.9% uptime SLA",
      "Dedicated success manager",
    ],
    cta: { label: "Contact sales" },
  },
]

export default function PricingCardsDemo() {
  return <PricingCards tiers={tiers} defaultBillingPeriod="monthly" />
}
