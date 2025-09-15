"use client"

import { useHeroSlides } from "@/hooks/use-hero-slides"
import { HeroSlideTable } from "@/components/admin/hero-slides/hero-slide-table"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function HeroSlidesPage() {
  const { slides, loading, error } = useHeroSlides()

  if (loading) return <p>Loading slides...</p>
  if (error) return <p>{error}</p>

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Hero Slides</h1>
          <p className="text-muted-foreground">
            Manage homepage carousel slides.
          </p>
        </div>
        <HeroSlideTable
          slides={slides}
          onAdd={() => {}}
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      </div>
    </ProtectedRoute>
  )
}
