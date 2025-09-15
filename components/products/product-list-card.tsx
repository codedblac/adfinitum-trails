"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/products";

interface ProductListCardProps {
  product: Product;
}

export function ProductListCard({ product }: ProductListCardProps) {
  // Calculate discount percentage if discount_price exists
  const discount =
    product.discount_price && product.discount_price < product.price
      ? Math.round(((product.price - product.discount_price) / product.price) * 100)
      : 0;

  // Check if product is "new" (created within the last 30 days)
  const isNew =
    (product as any)?.created_at &&
    new Date((product as any).created_at).getTime() >
      Date.now() - 30 * 24 * 60 * 60 * 1000;

  // Ensure category is a string
  const categoryName =
    typeof product.category === "string" ? product.category : product.category?.name || "";

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Product Image */}
          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={product.images?.[0]?.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {isNew && (
                <Badge
                  variant="secondary"
                  className="bg-accent text-accent-foreground text-xs"
                >
                  New
                </Badge>
              )}
              {product.is_featured && (
                <Badge
                  variant="secondary"
                  className="bg-primary text-primary-foreground text-xs"
                >
                  Featured
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  -{discount}%
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{categoryName}</p>
              <h3 className="font-semibold text-lg line-clamp-2">
                <Link
                  href={`/products/${product.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {product.name}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Rating & Availability */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.review_count} review{product.review_count !== 1 ? "s" : ""})
              </span>
              <Badge variant="outline" className="ml-auto capitalize">
                {product.availability}
              </Badge>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">
                    KSh {(product.discount_price || product.price).toLocaleString()}
                  </span>
                  {product.discount_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      KSh {product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" aria-label="Add to wishlist">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" aria-label="Add to cart">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
