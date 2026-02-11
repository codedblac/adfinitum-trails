"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { useCart } from "@/hooks/use-cart"
import { CheckoutSteps } from "@/components/checkout/checkout-steps"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { CartSummary } from "@/components/cart/cart-summary"
import { MpesaPayment } from "@/components/payments/mpesa-payment"
import { CardPayment } from "@/components/payments/card-payment"
import { BankPayment } from "@/components/payments/bank-payment"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"

import { createOrder } from "@/lib/api"

interface ShippingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  deliveryMethod: "standard" | "express" | "pickup"
  notes: string
}

interface PaymentData {
  method: "mpesa" | "card" | "bank"
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentData["method"] | "">("")

  const { items, totalItems, totalPrice, clearCart } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const subtotal = totalPrice
  const shipping = shippingData
    ? shippingData.deliveryMethod === "express"
      ? 1500
      : shippingData.deliveryMethod === "pickup"
      ? 0
      : subtotal >= 10000
      ? 0
      : 500
    : 500

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

  const handlePlaceOrder = async () => {
    if (!shippingData || !paymentData) {
      toast.error("Please complete shipping and payment details.")
      return
    }

    setIsProcessing(true)
    try {
      const orderData = {
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shipping: shippingData,
        payment: paymentData,
        totals: { subtotal, shipping, tax, total },
      }

      const result = await createOrder(orderData)
      clearCart()
      toast.success("Order placed successfully!")
      router.push(`/orders/${result.id}/success`)
    } catch (error: any) {
      console.error("Order placement failed:", error)
      toast.error(error.message || "Something went wrong placing your order.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/cart" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <CheckoutSteps currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <ShippingForm onNext={handleShippingNext} initialData={shippingData || undefined} />
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Select Payment Method</h3>
              <div className="flex flex-col gap-4">
                <Button
                  variant={paymentMethod === "mpesa" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("mpesa")}
                >
                  M-Pesa
                </Button>
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("card")}
                >
                  Credit/Debit Card
                </Button>
                <Button
                  variant={paymentMethod === "bank" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("bank")}
                >
                  Bank Transfer
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                {paymentMethod === "mpesa" && (
                  <MpesaPayment
                    orderId={Date.now()}
                    amount={total}
                    onSuccess={(txnId) =>
                      handlePaymentNext({ method: "mpesa", mpesaNumber: txnId })
                    }
                    onError={(err) => toast.error(err)}
                  />
                )}
                {paymentMethod === "card" && (
                  <CardPayment
                    amount={total}
                    onSuccess={(txnId) =>
                      handlePaymentNext({ method: "card", cardNumber: txnId })
                    }
                    onError={(err) => toast.error(err)}
                  />
                )}
                {paymentMethod === "bank" && (
                  <BankPayment
                    amount={total}
                    orderNumber={Date.now().toString()}
                    onConfirm={() => handlePaymentNext({ method: "bank", bankAccount: "manual" })}
                  />
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                  Back to Shipping
                </Button>
              </div>
            </div>
          )}


          
          {currentStep === 3 && shippingData && paymentData && (
            <div className="space-y-6">
              {/* Order Review */}
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
                        {shippingData.firstName} {shippingData.lastName}
                      </p>
                      <p>{shippingData.email}</p>
                      <p>{shippingData.phone}</p>
                      <p>{shippingData.address}</p>
                      <p>
                        {shippingData.city}, {shippingData.postalCode}
                      </p>
                      <p className="capitalize">{shippingData.deliveryMethod} delivery</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Info */}
                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <div className="text-sm text-muted-foreground">
                      {paymentData.method === "mpesa" && (
                        <p>M-Pesa Transaction: {paymentData.mpesaNumber}</p>
                      )}
                      {paymentData.method === "card" && (
                        <p>Card Transaction ID: {paymentData.cardNumber}</p>
                      )}
                      {paymentData.method === "bank" && <p>Bank Transfer</p>}
                    </div>
                  </div>

                  <Separator />

                  {/* Items */}
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

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            itemCount={totalItems}
            onCheckout={() => {}}
            isCheckoutDisabled
          />
        </div>
      </div>
    </div>
  )
}
