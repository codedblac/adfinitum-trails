"use client"

import { Package, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon?: "package" | "cart" | "users"
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon = "package", title, description, actionLabel, onAction }: EmptyStateProps) {
  const icons = {
    package: Package,
    cart: ShoppingCart,
    users: Users,
  }

  const Icon = icons[icon]

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm">{description}</p>
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  )
}
