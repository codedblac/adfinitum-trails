"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/home/product-card"
import { ProductListCard } from "@/components/products/product-list-card"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductSort } from "@/components/products/product-sort"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

// Mock product data - replace with API calls
const mockProducts = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro 128GB",
    price: 145000,
    originalPrice: 155000,
    image: "/iphone-15-pro-hands.png",
    rating: 4.8,
    reviewCount: 124,
    category: "Smartphones",
    description: "The most advanced iPhone with titanium design and powerful A17 Pro chip",
    isNew: true,
    availability: "In Stock",
  },
  {
    id: "samsung-s24",
    name: "Samsung Galaxy S24 Ultra",
    price: 135000,
    image: "/samsung-galaxy-s24-ultra.png",
    rating: 4.7,
    reviewCount: 89,
    category: "Smartphones",
    description: "Premium Android flagship with S Pen and advanced camera system",
    isTrending: true,
    availability: "In Stock",
  },
  {
    id: "lg-oled-tv",
    name: 'LG OLED 55" 4K Smart TV',
    price: 95000,
    originalPrice: 120000,
    image: "/lg-oled-tv.png",
    rating: 4.9,
    reviewCount: 67,
    category: "TVs",
    description: "Stunning OLED display with perfect blacks and vibrant colors",
    availability: "In Stock",
  },
  {
    id: "macbook-air",
    name: "MacBook Air M2 13-inch",
    price: 165000,
    image: "/macbook-air-m2.png",
    rating: 4.9,
    reviewCount: 78,
    category: "Laptops",
    description: "Incredibly thin and light laptop with M2 chip performance",
    isNew: true,
    availability: "Pre-order",
  },
  {
    id: "sony-headphones",
    name: "Sony WH-1000XM5 Headphones",
    price: 35000,
    originalPrice: 42000,
    image: "/sony-wh-1000xm5.png",
    rating: 4.7,
    reviewCount: 92,
    category: "Audio",
    description: "Industry-leading noise canceling with premium sound quality",
    availability: "In Stock",
  },
  {
    id: "samsung-fridge",
    name: "Samsung Double Door Refrigerator",
    price: 75000,
    image: "/samsung-refrigerator.png",
    rating: 4.6,
    reviewCount: 45,
    category: "Home Appliances",
    description: "Energy-efficient refrigerator with spacious storage and modern design",
    availability: "In Stock",
  },
]

interface FilterState {
  brands: string[]
  priceRange: [number, number]
  categories: string[]
  availability: string[]
  rating: number
}

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange: [0, 500000],
    categories: [],
    availability: [],
    rating: 0,
  })
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      // Brand filter
      if (filters.brands.length > 0) {
        const productBrand = product.name.split(" ")[0] // Simple brand extraction
        if (!filters.brands.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase()))) {
          return false
        }
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Availability filter
      if (filters.availability.length > 0 && !filters.availability.includes(product.availability)) {
        return false
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "popular":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        // Keep original order for relevance
        break
    }

    return filtered
  }, [filters, sortBy])

  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: [0, 500000],
      categories: [],
      availability: [],
      rating: 0,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">Discover our complete range of electronics and appliances</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <ProductFilters filters={filters} onFiltersChange={setFilters} onClearFilters={clearFilters} />
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Mobile Filter Button & Sort */}
          <div className="flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <ProductFilters filters={filters} onFiltersChange={setFilters} onClearFilters={clearFilters} />
              </SheetContent>
            </Sheet>

            <div className="flex-1 lg:flex-none">
              <ProductSort
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                totalResults={filteredAndSortedProducts.length}
              />
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredAndSortedProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAndSortedProducts.map((product) =>
                viewMode === "grid" ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductListCard key={product.id} product={product} />
                ),
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
