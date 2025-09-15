"use client"

import { useState } from "react"
import { HeroSlide } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HeroSlideForm } from "./hero-slide-form"
import { Switch } from "@/components/ui/switch"

interface HeroSlideTableProps {
  slides: HeroSlide[]
  onAdd: (slide: Partial<HeroSlide>) => void
  onUpdate: (id: number, slide: Partial<HeroSlide>) => void
  onDelete: (id: number) => void
}

export function HeroSlideTable({
  slides,
  onAdd,
  onUpdate,
  onDelete,
}: HeroSlideTableProps) {
  const [editing, setEditing] = useState<HeroSlide | null>(null)

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this slide?")) {
      onDelete(id)
    }
  }

  const handleToggleActive = (slide: HeroSlide) => {
    onUpdate(slide.id, { is_active: !slide.is_active })
  }

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
            <TableHead className="w-[180px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slides.length > 0 ? (
            slides.map((slide) => (
              <TableRow key={slide.id}>
                <TableCell className="font-medium">{slide.title}</TableCell>
                <TableCell>{slide.subtitle || "—"}</TableCell>
                <TableCell>{slide.order ?? "—"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={slide.is_active}
                      onCheckedChange={() => handleToggleActive(slide)}
                    />
                    <span className={slide.is_active ? "text-green-600" : "text-gray-500"}>
                      {slide.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <HeroSlideForm
                      slide={slide}
                      onSave={(data) => onUpdate(slide.id, data)}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(slide.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                No hero slides found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
