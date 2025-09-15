"use client"

import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { ProductCard } from "@/components/home/product-card"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/products"
import { fetchCategoryById, fetchCategoryProducts } from "@/lib/api"

interface CategoryPageProps {
  params: {
    category: string // category ID or slug
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [title, setTitle] = useState("Category")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategory() {
      try {
        setLoading(true)
        setError(null)

        // 1️⃣ Fetch category details
        const categoryData = await fetchCategoryById(Number(category))
        if (!categoryData) {
          notFound()
          return
        }

        setTitle(categoryData.name || categoryData.title || "Category")
        setDescription(categoryData.description || "")

        // 2️⃣ Fetch products
        const productsData: Product[] = await fetchCategoryProducts(category)
        setProducts(productsData || [])

        // 3️⃣ Extract unique brands
        const brandList = Array.from(
          new Set(
            (productsData || []).map((p) =>
              typeof p.brand === "string" ? p.brand : p.brand?.name
            )
          )
        ).filter(Boolean) as string[]

        setBrands(brandList)
      } catch (err) {
        setError("Failed to load category data. Please try again later.")
        console.error("CategoryPage error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadCategory()
  }, [category])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading category...</div>
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        {error}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        No products found in this category.
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && (
          <p className="text-muted-foreground mb-6">{description}</p>
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

// ✅ Optional Static Generation
// Replace with dynamic fetch if API provides categories
export async function generateStaticParams() {
  // Example: Pretend we have only 2 categories
  // Ideally, fetch category list from your API
  return [{ category: "1" }, { category: "2" }]
}
