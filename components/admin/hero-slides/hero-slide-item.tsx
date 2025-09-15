"use client"

import { HeroSlide } from "@/types"
import clsx from "clsx"

interface HeroSlideItemProps {
  slide: HeroSlide
}

// Map numeric opacity to Tailwind opacity utilities
const opacityMap: Record<number, string> = {
  0: "bg-opacity-0",
  10: "bg-opacity-10",
  20: "bg-opacity-20",
  30: "bg-opacity-30",
  40: "bg-opacity-40",
  50: "bg-opacity-50",
  60: "bg-opacity-60",
  70: "bg-opacity-70",
  80: "bg-opacity-80",
  90: "bg-opacity-90",
  100: "bg-opacity-100",
}

export function HeroSlideItem({ slide }: HeroSlideItemProps) {
  const overlayClass = clsx(
    "absolute inset-0 flex flex-col justify-center items-start p-6",
    slide.overlay_color ?? "bg-black",
    opacityMap[slide.overlay_opacity ?? 50] // fallback to 50% opacity
  )

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      {slide.image && (
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className={overlayClass}>
        <h2 className="text-2xl font-bold text-white">{slide.title}</h2>
        {slide.subtitle && (
          <p className="text-white opacity-90">{slide.subtitle}</p>
        )}
      </div>
    </div>
  )
}
