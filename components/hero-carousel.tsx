"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useHeroSlides } from "@/hooks/use-hero-slides"

export function HeroCarousel() {
  const { slides, loading, error } = useHeroSlides()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play every 5s
  useEffect(() => {
    if (!slides.length) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (loading) {
    return (
      <div className="h-[500px] md:h-[600px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading slides...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[500px] md:h-[600px] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!slides.length) {
    return (
      <div className="h-[500px] md:h-[600px] flex items-center justify-center">
        <p className="text-muted-foreground">No slides available</p>
      </div>
    )
  }

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div
            className={`h-full bg-gradient-to-r ${slide.bg_color ?? "from-gray-800 to-gray-600"} flex items-center`}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white space-y-6">
                {slide.badge && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {slide.badge}
                  </Badge>
                )}
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-bold text-balance">{slide.title}</h2>
                  {slide.subtitle && <p className="text-xl md:text-2xl font-medium">{slide.subtitle}</p>}
                  {slide.description && <p className="text-lg opacity-90 text-pretty">{slide.description}</p>}
                </div>
                {slide.cta_text && slide.cta_link && (
                  <Button size="lg" variant="secondary" asChild>
                    <Link href={slide.cta_link}>{slide.cta_text}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
