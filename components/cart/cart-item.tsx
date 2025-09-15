"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, Heart } from "lucide-react"
import type { CartItem as CartItemType } from "@/hooks/use-cart"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
  onMoveToWishlist?: (item: CartItemType) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove, onMoveToWishlist }: CartItemProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <div>
              <Link
                href={`/products/${item.id}`}
                className="font-medium hover:text-primary transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  KSh {(item.price * item.quantity).toLocaleString()}
                </span>

                {/* Wishlist */}
                {onMoveToWishlist && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMoveToWishlist(item)}
                    aria-label="Move to wishlist"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                )}

                {/* Remove */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove from cart"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
