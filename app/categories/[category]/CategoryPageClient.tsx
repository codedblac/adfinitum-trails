"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/home/product-card"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/products"

interface CategoryPageClientProps {
  category: string
  categoryData: { name?: string; title?: string; description?: string }
  products: Product[]
}

export default function CategoryPageClient({
  category,
  categoryData,
  products,
}: CategoryPageClientProps) {
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    if (!products?.length) {
      setBrands([])
      return
    }

    const brandList = Array.from(
      new Set(
        products.map((p) =>
          typeof p.brand === "string" ? p.brand : p.brand?.name
        )
      )
    ).filter(Boolean) as string[]

    setBrands(brandList)
  }, [products])

  if (!products?.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">
          {categoryData.name || categoryData.title || "Category"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {categoryData.description || "No description available."}
        </p>
        <p>No products found in this category.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryData.name || categoryData.title || "Category"}
        </h1>
        {categoryData.description && (
          <p className="text-muted-foreground mb-6">
            {categoryData.description}
          </p>
        )}

        {/* Brand Tags */}
        {brands.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Popular Brands:</span>
            {brands.map((brand) => (
              <Badge key={brand} variant="outline">
                {brand}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
