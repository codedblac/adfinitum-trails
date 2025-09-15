"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { fetchHeroSlides } from "@/lib/api"

// Slide type matches your Django HeroSlide model
interface Slide {
  id: number
  title: string
  subtitle?: string
  description?: string
  cta_text?: string
  cta_link?: string
  badge?: string
  bg_color?: string
  image?: string // admin-uploaded image URL
}

export function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const data: Slide[] = await fetchHeroSlides()
        setSlides(data)
      } catch (error) {
        console.error("Error fetching hero slides:", error)
      }
    }
    loadSlides()
  }, [])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  if (slides.length === 0) return null

  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          {/* Background with optional image */}
          <div className="relative h-full w-full">
            {slide.image ? (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <div className="h-full w-full bg-gray-900" />
            )}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                slide.bg_color || "from-black/70 to-black/40"
              }`}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white space-y-6">
                  {slide.badge && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {slide.badge}
                    </Badge>
                  )}
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">{slide.title}</h2>
                    {slide.subtitle && <p className="text-lg md:text-2xl font-medium">{slide.subtitle}</p>}
                    {slide.description && <p className="text-sm md:text-lg opacity-90">{slide.description}</p>}
                  </div>
                  {slide.cta_link && slide.cta_text && (
                    <Button size="lg" variant="secondary" asChild>
                      <Link href={slide.cta_link}>{slide.cta_text}</Link>
                    </Button>
                  )}
                </div>
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
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
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
