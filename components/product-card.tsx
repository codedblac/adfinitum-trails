"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isLoading } = useCart()

  // ✅ Safe fallbacks
  const safeName = product.name || "Unnamed Product"
  const safeCategory = product.category?.name || "Uncategorized"
  const safePrice = product.discount_price ?? product.price ?? 0
  const safeOriginalPrice = product.discount_price ? product.price : undefined
  const safeRating = product.rating ?? 0
  const safeReviews = product.review_count ?? 0
  const safeImage =
    product.images?.[0]?.image || "/placeholder.svg"

  // ✅ Discount calculation
  const discount =
    safeOriginalPrice && safeOriginalPrice > safePrice
      ? Math.round(((safeOriginalPrice - safePrice) / safeOriginalPrice) * 100)
      : 0

  // ✅ Add to cart
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: safeName,
      price: safePrice,
      image: safeImage,
      category: safeCategory,
      quantity: 1,
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-50">
          <Image
            src={safeImage}
            alt={safeName}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            priority={false}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_featured && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
            {product.is_on_sale && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Sale
              </Badge>
            )}
            {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{safeCategory}</p>
            <h3 className="font-semibold text-balance line-clamp-2">
              <Link
                href={`/products/${product.slug}`}
                className="hover:text-primary transition-colors"
              >
                {safeName}
              </Link>
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(safeRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({safeReviews})
            </span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  KSh {safePrice.toLocaleString()}
                </span>
                {safeOriginalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    KSh {safeOriginalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <Button
              size="sm"
              className="shrink-0"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
