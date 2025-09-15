"use client"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice, isLoading, error } = useCart()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const subtotal = totalPrice
  const shipping = subtotal >= 10000 ? 0 : 500 // Free shipping over KSh 10,000
  const tax = Math.round(subtotal * 0.16) // 16% VAT
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      // ⚡️ Later: integrate real checkout API call here
      router.push("/checkout")
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-label="Loading cart" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon="cart"
        title="Your cart is empty"
        description="Add some products to get started"
        actionLabel="Continue Shopping"
        onAction={() => router.push("/products")}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.push("/products")} className="mb-4 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">{totalItems} {totalItems === 1 ? "item" : "items"} in your cart</p>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            itemCount={totalItems}
            onCheckout={handleCheckout}
            isCheckoutDisabled={isCheckingOut}
          />
        </div>
      </div>
    </div>
  )
}
