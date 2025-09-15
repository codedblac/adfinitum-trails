"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Truck, Shield } from "lucide-react"

interface CartSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
  itemCount: number
  onCheckout: () => void
  isCheckoutDisabled?: boolean
}

export function CartSummary({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
  onCheckout,
  isCheckoutDisabled = false,
}: CartSummaryProps) {
  const freeShippingThreshold = 10000
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  const formatCurrency = (amount: number) =>
    `KSh ${amount.toLocaleString("en-KE")}`

  return (
    <Card className="sticky top-4" role="complementary" aria-label="Cart summary">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
        </div>

        <Separator />

        {/* Grand Total */}
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>

        {/* Free Shipping Banner */}
        {remainingForFreeShipping > 0 && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Free Shipping Available</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Add {formatCurrency(remainingForFreeShipping)} more to qualify for free shipping
            </p>
          </div>
        )}

        {/* Benefits */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-green-600" />
            <span>Fast delivery</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={onCheckout}
          disabled={isCheckoutDisabled}
        >
          Proceed to Checkout
        </Button>

        {/* Return Policy */}
        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            30-day return policy
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
