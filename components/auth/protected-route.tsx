// components/auth/ProtectedRoute.tsx
"use client"

import { useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: string[]                 // e.g., ["admin", "customer"]
  redirectTo?: string                     // default redirect path
  loadingFallback?: ReactNode             // optional custom loading UI
  unauthorizedFallback?: ReactNode        // optional unauthorized UI
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
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Not logged in → redirect
      if (!user) {
        setIsRedirecting(true)
        router.replace(redirectTo)
        return
      }

      // Logged in but role not allowed → redirect to home
      if (allowedRoles && !allowedRoles.includes(user.role ?? "")) {
        setIsRedirecting(true)
        router.replace("/") // fallback
        return
      }
    }
  }, [user, isLoading, allowedRoles, redirectTo, router])

  // Loading state
  if (isLoading || isRedirecting) {
    return (
      loadingFallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      )
    )
  }

  // Extra unauthorized guard (should rarely hit due to redirect above)
  if (!user || (allowedRoles && !allowedRoles.includes(user.role ?? ""))) {
    return (
      unauthorizedFallback || (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-500 text-center">
            You don’t have permission to view this page.
          </p>
        </div>
      )
    )
  }

  return <>{children}</>
}
