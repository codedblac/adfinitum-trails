"use client"

import { useState, useEffect, useCallback } from "react"
import { HeroSlide } from "@/types"
import API, { API_ENDPOINTS } from "@/lib/api"

export function useHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ Fetch all slides
  const fetchSlides = useCallback(async () => {
    setLoading(true)
    try {
      const res = await API.apiRequest<HeroSlide[]>(API_ENDPOINTS.hero.list)
      setSlides(res)
      setError(null)
    } catch (err) {
      console.error("Error fetching hero slides:", err)
      setError("Failed to load hero slides")
    } finally {
      setLoading(false)
    }
  }, [])

  // ✅ Add new slide
  const addSlide = async (slide: Partial<HeroSlide>) => {
    try {
      const res = await API.apiRequest<HeroSlide>(API_ENDPOINTS.hero.list, {
        method: "POST",
        body: JSON.stringify(slide),
        headers: { "Content-Type": "application/json" },
      })
      setSlides((prev) => [...prev, res])
    } catch (err) {
      console.error("Error adding slide:", err)
      setError("Failed to add slide")
    }
  }

  // ✅ Update slide
  const updateSlide = async (id: number, slide: Partial<HeroSlide>) => {
    try {
      const res = await API.apiRequest<HeroSlide>(API_ENDPOINTS.hero.detail(id), {
        method: "PUT",
        body: JSON.stringify(slide),
        headers: { "Content-Type": "application/json" },
      })
      setSlides((prev) => prev.map((s) => (s.id === id ? res : s)))
    } catch (err) {
      console.error("Error updating slide:", err)
      setError("Failed to update slide")
    }
  }

  // ✅ Delete slide
  const deleteSlide = async (id: number) => {
    try {
      await API.apiRequest(API_ENDPOINTS.hero.detail(id), { method: "DELETE" })
      setSlides((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      console.error("Error deleting slide:", err)
      setError("Failed to delete slide")
    }
  }

  // Load on mount
  useEffect(() => {
    fetchSlides()
  }, [fetchSlides])

  return {
    slides,
    loading,
    error,
    fetchSlides,
    addSlide,
    updateSlide,
    deleteSlide,
  }
}
