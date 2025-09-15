"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/home/product-card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Product } from "@/lib/products"

interface CategoryPageClientProps {
  category: string
  categoryData: { name?: string; title?: string; description?: string } | null
  products: Product[] | null
}

export default function CategoryPageClient({
  category,
  categoryData,
  products,
}: CategoryPageClientProps) {
  const [brands, setBrands] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // ✅ Extract brands + initialize products
  useEffect(() => {
    if (!products || products.length === 0) {
      setBrands([])
      setFilteredProducts([])
      setLoading(false)
      return
    }

    const brandList = Array.from(
      new Set(
        products.map((p) =>
          typeof p.brand === "string"
            ? p.brand
            : p.brand?.name || "Unknown"
        )
      )
    ).filter(Boolean) as string[]

    setBrands(brandList)
    setFilteredProducts(products)
    setLoading(false)
  }, [products])

  // ✅ Handle brand filtering
  useEffect(() => {
    if (!products) return

    if (selectedBrand) {
      setLoading(true)
      const timer = setTimeout(() => {
        setFilteredProducts(
          products.filter((p) => {
            const brandName =
              typeof p.brand === "string" ? p.brand : p.brand?.name
            return brandName === selectedBrand
          })
        )
        setLoading(false)
      }, 400) // debounce for smoother UX
      return () => clearTimeout(timer)
    } else {
      setFilteredProducts(products)
    }
  }, [selectedBrand, products])

  // ✅ Loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="flex gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  // ✅ No products case
  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-3">
          {categoryData?.name || categoryData?.title || "Category"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {categoryData?.description || "No description available."}
        </p>
        <p className="text-gray-500">
          {selectedBrand
            ? "No products match this brand."
            : "No products found in this category."}
        </p>
      </div>
    )
  }

  // ✅ Main render
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryData?.name || categoryData?.title || "Category"}
        </h1>
        {categoryData?.description && (
          <p className="text-muted-foreground mb-6">
            {categoryData.description}
          </p>
        )}

        {/* Brand Filters */}
        {brands.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Popular Brands:</span>
            {brands.map((brand) => (
              <Badge
                key={brand}
                variant={selectedBrand === brand ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() =>
                  setSelectedBrand(selectedBrand === brand ? null : brand)
                }
              >
                {brand}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
