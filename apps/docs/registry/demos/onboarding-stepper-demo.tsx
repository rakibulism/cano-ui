"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Stepper,
  StepperContent,
  StepperFooter,
  type StepperStep,
} from "@/registry/ui/onboarding-stepper"

const steps: StepperStep[] = [
  {
    id: "details",
    title: "Workspace details",
    description: "Name and URL",
  },
  {
    id: "invite",
    title: "Invite team",
    description: "Bring people in",
  },
  {
    id: "plan",
    title: "Choose plan",
    description: "Pick what fits",
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm and create",
  },
]

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$0/mo",
    detail: "Up to 3 members, core features.",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12/mo",
    detail: "Unlimited members, advanced analytics.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    detail: "SSO, audit logs, dedicated support.",
  },
]

export default function OnboardingStepperDemo() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isComplete, setIsComplete] = React.useState(false)

  const [workspaceName, setWorkspaceName] = React.useState("")
  const [workspaceUrl, setWorkspaceUrl] = React.useState("")
  const [invites, setInvites] = React.useState("")
  const [plan, setPlan] = React.useState("pro")

  function validateStep(step: number): string | undefined {
    if (step === 0 && workspaceName.trim() === "") {
      return "Workspace name is required."
    }
    return undefined
  }

  function handleNext() {
    const validationError = validateStep(currentStep)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(undefined)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      return
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 1500)
  }

  function handleBack() {
    setError(undefined)
    setCurrentStep(Math.max(0, currentStep - 1))
  }

  function handleReset() {
    setIsComplete(false)
    setCurrentStep(0)
    setWorkspaceName("")
    setWorkspaceUrl("")
    setInvites("")
    setPlan("pro")
  }

  if (isComplete) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 rounded-lg border py-12 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium">Workspace created</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {workspaceName.trim()} is ready to go.
          </p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          Start over
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight">
          Create your workspace
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set up a new Acme workspace in a few steps.
        </p>
      </div>

      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={(step) => {
          setError(undefined)
          setCurrentStep(step)
        }}
      >
        <StepperContent step={0}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="workspace-name">Workspace name</Label>
            <Input
              id="workspace-name"
              placeholder="Acme Inc"
              value={workspaceName}
              onChange={(event) => {
                setWorkspaceName(event.target.value)
                setError(undefined)
              }}
              aria-invalid={Boolean(error) || undefined}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="workspace-url">Workspace URL</Label>
            <Input
              id="workspace-url"
              placeholder="acme"
              value={workspaceUrl}
              onChange={(event) => setWorkspaceUrl(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {workspaceUrl.trim() || "acme"}.acme.app
            </p>
          </div>
        </StepperContent>

        <StepperContent step={1}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="invite-emails">Invite by email</Label>
            <Input
              id="invite-emails"
              placeholder="jane@acme.com, sam@acme.com"
              value={invites}
              onChange={(event) => setInvites(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple addresses with commas. You can skip this for
              now.
            </p>
          </div>
        </StepperContent>

        <StepperContent step={2}>
          <div className="flex flex-col gap-3" role="radiogroup" aria-label="Plan">
            {plans.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={plan === item.id}
                onClick={() => setPlan(item.id)}
                className={cn(
                  "flex items-baseline justify-between gap-4 rounded-lg border p-4 text-left transition-colors outline-none hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring/50",
                  plan === item.id && "border-primary"
                )}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{item.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {item.detail}
                  </span>
                </span>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {item.price}
                </span>
              </button>
            ))}
          </div>
        </StepperContent>

        <StepperContent step={3}>
          <dl className="divide-y rounded-lg border text-sm">
            <div className="flex items-center justify-between gap-4 p-3">
              <dt className="text-muted-foreground">Workspace</dt>
              <dd className="truncate font-medium">
                {workspaceName.trim() || "—"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 p-3">
              <dt className="text-muted-foreground">URL</dt>
              <dd className="truncate font-medium">
                {(workspaceUrl.trim() || "acme") + ".acme.app"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 p-3">
              <dt className="text-muted-foreground">Invites</dt>
              <dd className="truncate font-medium">
                {invites.trim() || "None yet"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 p-3">
              <dt className="text-muted-foreground">Plan</dt>
              <dd className="font-medium">
                {plans.find((item) => item.id === plan)?.name}
              </dd>
            </div>
          </dl>
        </StepperContent>

        <StepperFooter
          onBack={handleBack}
          onNext={handleNext}
          isSubmitting={isSubmitting}
          nextLabel={currentStep === steps.length - 1 ? "Create workspace" : undefined}
          error={error}
        />
      </Stepper>
    </div>
  )
}
