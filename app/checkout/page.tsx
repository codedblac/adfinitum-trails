"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { CheckoutSteps } from "@/components/checkout/checkout-steps"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { CartSummary } from "@/components/cart/cart-summary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ShippingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  deliveryMethod: string
  notes: string
}

interface PaymentData {
  method: string
  mpesaNumber?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardName?: string
  bankAccount?: string
  bankCode?: string
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingData, setShippingData] = useState<ShippingData | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const { items, totalItems, totalPrice, clearCart } = useCart()
  const router = useRouter()

  // Redirect if cart is empty
  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const subtotal = totalPrice
  const getShippingCost = () => {
    if (!shippingData) return 500
    switch (shippingData.deliveryMethod) {
      case "express":
        return 1500
      case "pickup":
        return 0
      default:
        return subtotal >= 10000 ? 0 : 500
    }
  }
  const shipping = getShippingCost()
  const tax = Math.round(subtotal * 0.16)
  const total = subtotal + shipping + tax

  const handleShippingNext = (data: ShippingData) => {
    setShippingData(data)
    setCurrentStep(2)
  }

  const handlePaymentNext = (data: PaymentData) => {
    setPaymentData(data)
    setCurrentStep(3)
  }

  const handlePaymentBack = () => {
    setCurrentStep(1)
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    try {
      // TODO: Replace with actual API call to Django backend
      const orderData = {
        items,
        shipping: shippingData,
        payment: paymentData,
        totals: { subtotal, shipping, tax, total },
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) throw new Error("Failed to place order")

      const result = await response.json()

      // Clear cart and redirect to success page
      clearCart()
      router.push(`/orders/${result.orderId}/success`)
    } catch (error) {
      console.error("Order placement failed:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <CheckoutSteps currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 1 && <ShippingForm onNext={handleShippingNext} initialData={shippingData || undefined} />}

          {currentStep === 2 && (
            <PaymentForm onNext={handlePaymentNext} onBack={handlePaymentBack} initialData={paymentData || undefined} />
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Shipping Info */}
                  <div>
                    <h4 className="font-medium mb-2">Shipping Information</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        {shippingData?.firstName} {shippingData?.lastName}
                      </p>
                      <p>{shippingData?.email}</p>
                      <p>{shippingData?.phone}</p>
                      <p>{shippingData?.address}</p>
                      <p>
                        {shippingData?.city}, {shippingData?.postalCode}
                      </p>
                      <p className="capitalize">{shippingData?.deliveryMethod} delivery</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Info */}
                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <div className="text-sm text-muted-foreground">
                      {paymentData?.method === "mpesa" && <p>M-Pesa: {paymentData.mpesaNumber}</p>}
                      {paymentData?.method === "card" && <p>Card ending in ****{paymentData.cardNumber?.slice(-4)}</p>}
                      {paymentData?.method === "bank" && <p>Bank Transfer</p>}
                    </div>
                  </div>

                  <Separator />

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                  Back to Payment
                </Button>
                <Button onClick={handlePlaceOrder} disabled={isProcessing} className="flex-1">
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            itemCount={totalItems}
            onCheckout={() => {}}
            isCheckoutDisabled={true}
          />
        </div>
      </div>
    </div>
  )
}
