import { Suspense } from "react"
import CategoryPageClient from "./CategoryPageClient"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// ✅ Skeleton Loader (server fallback)
function CategoryPageSkeleton() {
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

// ✅ SEO Metadata
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params // 🔥 await params here

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${category}/`,
      { cache: "no-store" }
    )

    if (!res.ok) {
      return { title: "Category Not Found" }
    }

    const categoryData = await res.json()
    return {
      title: `${categoryData.name} | AD Finitum Trails`,
      description:
        categoryData.description ||
        "Browse products in this category on AD Finitum Trails.",
    }
  } catch (error) {
    console.error("Metadata fetch error:", error)
    return { title: "Category | AD Finitum Trails" }
  }
}

// ✅ Static Params (SSG)
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`)
    if (!res.ok) return []

    const categories = await res.json()
    return categories.map((cat: any) => ({
      category: String(cat.id), // or cat.slug
    }))
  } catch (error) {
    console.error("Failed to fetch categories for static params:", error)
    return []
  }
}

// ✅ Main Page
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params // 🔥 await params here

  async function loadData() {
    try {
      const [categoryRes, productsRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${category}/`,
          { cache: "no-store" }
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${category}/products/`,
          { cache: "no-store" }
        ),
      ])

      const categoryData = categoryRes.ok ? await categoryRes.json() : null
      const products = productsRes.ok ? await productsRes.json() : []

      return (
        <CategoryPageClient
          category={category}
          categoryData={categoryData}
          products={products}
        />
      )
    } catch (error) {
      console.error("Category page error:", error)
      return (
        <CategoryPageClient
          category={category}
          categoryData={null}
          products={[]}
        />
      )
    }
  }

  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      {await loadData()}
    </Suspense>
  )
}
