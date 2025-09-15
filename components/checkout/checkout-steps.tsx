"use client"

import { Check } from "lucide-react"

interface CheckoutStep {
  id: number
  name: string
  description: string
}

interface CheckoutStepsProps {
  currentStep: number
  steps?: CheckoutStep[]
}

const defaultSteps: CheckoutStep[] = [
  { id: 1, name: "Shipping", description: "Delivery information" },
  { id: 2, name: "Payment", description: "Payment method" },
  { id: 3, name: "Review", description: "Order confirmation" },
]

export function CheckoutSteps({ currentStep, steps = defaultSteps }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <nav aria-label="Checkout progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep
            const isCurrent = step.id === currentStep

            return (
              <li
                key={step.id}
                className="flex-1 flex items-center"
                aria-current={isCurrent ? "step" : undefined}
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors shrink-0
                      ${
                        isCompleted
                          ? "bg-primary border-primary text-primary-foreground"
                          : isCurrent
                          ? "border-primary text-primary"
                          : "border-muted-foreground text-muted-foreground"
                      }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : step.id}
                  </div>

                  <div className="ml-3">
                    <p
                      className={`text-sm font-medium ${
                        isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
