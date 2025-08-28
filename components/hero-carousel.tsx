"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    subtitle: "Now Available",
    description: "Experience the power of titanium with advanced camera system",
    cta: "Shop Now",
    href: "/products/iphone-15-pro-max",
    badge: "New Arrival",
    bgColor: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Samsung QLED TVs",
    subtitle: "Up to 40% Off",
    description: "Transform your living room with stunning 4K displays",
    cta: "View Deals",
    href: "/categories/appliances?filter=tv",
    badge: "Limited Time",
    bgColor: "from-green-600 to-teal-600",
  },
  {
    id: 3,
    title: "Flexible Financing",
    subtitle: "0% Interest",
    description: "Get your dream electronics with easy monthly payments",
    cta: "Learn More",
    href: "/financing",
    badge: "Special Offer",
    bgColor: "from-orange-600 to-red-600",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
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
          <div className={`h-full bg-gradient-to-r ${slide.bgColor} flex items-center`}>
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white space-y-6">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {slide.badge}
                </Badge>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-bold text-balance">{slide.title}</h2>
                  <p className="text-xl md:text-2xl font-medium">{slide.subtitle}</p>
                  <p className="text-lg opacity-90 text-pretty">{slide.description}</p>
                </div>
                <Button size="lg" variant="secondary" asChild>
                  <Link href={slide.href}>{slide.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
