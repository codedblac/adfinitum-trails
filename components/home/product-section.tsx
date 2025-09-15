import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Product } from "@/lib/products"
import { Skeleton } from "@/components/ui/skeleton" // make sure you have this

export interface ProductSectionProps {
  title: string
  subtitle?: string
  products: (Product & {
    image?: string
    originalPrice?: number
    isNew?: boolean
    isTrending?: boolean
  })[]
  viewAllHref?: string
  loading?: boolean // ✅ added
}

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllHref,
  loading = false, // ✅ default false
}: ProductSectionProps) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Button variant="outline" asChild>
            <Link href={viewAllHref}>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  )
}
