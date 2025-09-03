// components/auth/ProtectedRoute.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[] // e.g. ["admin", "customer"]
  redirectTo?: string      // default redirect path
  loadingFallback?: React.ReactNode // custom loading UI
  unauthorizedFallback?: React.ReactNode // custom unauthorized UI
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/auth/login",
  loadingFallback,
  unauthorizedFallback,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (allowedRoles && !allowedRoles.includes(user.role || "")) {
        router.push("/") // fallback home if role not allowed
        return
      }
    }
  }, [user, isLoading, allowedRoles, redirectTo, router])

  // Show loading spinner or custom UI
  if (isLoading) {
    return (
      loadingFallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )
    )
  }

  // Block unauthorized access (extra guard)
  if (!user || (allowedRoles && !allowedRoles.includes(user.role || ""))) {
    return (
      unauthorizedFallback || (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-500">You don’t have permission to view this page.</p>
        </div>
      )
    )
  }

  return <>{children}</>
}
