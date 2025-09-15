#!/bin/bash

echo "íº€ Creating Hero Slides management files..."

# Ensure script runs from project root
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)"

# ========== Create Folders ==========
mkdir -p components/admin/hero-slides
mkdir -p hooks
mkdir -p app/admin/hero-slides

# ========== Hero Slide Table ==========
cat <<'EOT' > components/admin/hero-slides/hero-slide-table.tsx
"use client"

import { useState } from "react"
import { HeroSlide } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { HeroSlideForm } from "./hero-slide-form"

interface HeroSlideTableProps {
  slides: HeroSlide[]
  onAdd: (slide: Partial<HeroSlide>) => void
  onUpdate: (id: number, slide: Partial<HeroSlide>) => void
  onDelete: (id: number) => void
}

export function HeroSlideTable({ slides, onAdd, onUpdate, onDelete }: HeroSlideTableProps) {
  const [editing, setEditing] = useState<HeroSlide | null>(null)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Hero Slides</h2>
        <HeroSlideForm onSave={onAdd} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Subtitle</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slides.map((slide) => (
            <TableRow key={slide.id}>
              <TableCell>{slide.title}</TableCell>
              <TableCell>{slide.subtitle}</TableCell>
              <TableCell>{slide.order}</TableCell>
              <TableCell>{slide.is_active ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <HeroSlideForm slide={slide} onSave={(data) => onUpdate(slide.id, data)} />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(slide.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
EOT

# ========== Hero Slide Form ==========
cat <<'EOT' > components/admin/hero-slides/hero-slide-form.tsx
"use client"

import { useState } from "react"
import { HeroSlide } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface HeroSlideFormProps {
  slide?: HeroSlide
  onSave: (data: Partial<HeroSlide>) => void
}

export function HeroSlideForm({ slide, onSave }: HeroSlideFormProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<HeroSlide>>(slide || {})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onSave(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant={slide ? "outline" : "default"}>
          {slide ? "Edit" : "Add Slide"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{slide ? "Edit Slide" : "Add Slide"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="title"
            placeholder="Title"
            value={formData.title || ""}
            onChange={handleChange}
          />
          <Input
            name="subtitle"
            placeholder="Subtitle"
            value={formData.subtitle || ""}
            onChange={handleChange}
          />
          <Input
            name="order"
            type="number"
            placeholder="Order"
            value={formData.order || 0}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
EOT

# ========== Hero Slide Item ==========
cat <<'EOT' > components/admin/hero-slides/hero-slide-item.tsx
"use client"

import { HeroSlide } from "@/types"

interface HeroSlideItemProps {
  slide: HeroSlide
}

export function HeroSlideItem({ slide }: HeroSlideItemProps) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      {slide.image && (
        <img src={slide.image} alt={slide.title} className="w-full h-64 object-cover" />
      )}
      <div
        className="absolute inset-0 flex flex-col justify-center items-start p-6"
        style={{ backgroundColor: slide.overlay_color, opacity: slide.overlay_opacity }}
      >
        <h2 className="text-2xl font-bold text-white">{slide.title}</h2>
        {slide.subtitle && <p className="text-white">{slide.subtitle}</p>}
      </div>
    </div>
  )
}
EOT

# ========== Hook ==========
cat <<'EOT' > hooks/use-hero-slides.ts
"use client"

import { useState, useEffect } from "react"
import { HeroSlide } from "@/types"
import { fetchHeroSlides } from "@/lib/api"

export function useHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSlides() {
      try {
        const data = await fetchHeroSlides()
        setSlides(data)
      } catch (err) {
        setError("Failed to load hero slides")
      } finally {
        setLoading(false)
      }
    }
    loadSlides()
  }, [])

  return { slides, loading, error }
}
EOT

# ========== Page ==========
cat <<'EOT' > app/admin/hero-slides/page.tsx
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
EOT

echo "âœ… Hero slides management files created successfully!"
