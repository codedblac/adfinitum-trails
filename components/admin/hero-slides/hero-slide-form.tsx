"use client"

import { useState, useEffect } from "react"
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
  const [formData, setFormData] = useState<Partial<HeroSlide>>({})

  // ✅ Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData(slide || {})
    }
  }, [open, slide])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    })
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

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} />
          <Input name="subtitle" placeholder="Subtitle" value={formData.subtitle || ""} onChange={handleChange} />
          <Input name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} />
          <Input name="cta_text" placeholder="CTA Text" value={formData.cta_text || ""} onChange={handleChange} />
          <Input name="cta_link" placeholder="CTA Link" value={formData.cta_link || ""} onChange={handleChange} />
          <Input name="badge" placeholder="Badge" value={formData.badge || ""} onChange={handleChange} />
          <Input name="bg_color" placeholder="Background Gradient" value={formData.bg_color || ""} onChange={handleChange} />
          <Input name="image" placeholder="Image URL" value={formData.image || ""} onChange={handleChange} />
          <Input
            name="order"
            type="number"
            placeholder="Order"
            value={formData.order ?? 0}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
