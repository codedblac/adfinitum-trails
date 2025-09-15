"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Loader2, Lock } from "lucide-react"
import { toast } from "sonner"

interface CardPaymentProps {
  amount: number
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function CardPayment({ amount, onSuccess, onError }: CardPaymentProps) {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 16)
    return v.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 4)
    if (v.length > 2) return v.slice(0, 2) + "/" + v.slice(2)
    return v
  }

  const validateCardData = () => {
    if (!cardData.name || !cardData.number || !cardData.expiry || !cardData.cvv) {
      toast.error("Please fill in all card details")
      return false
    }
    if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ""))) {
      toast.error("Invalid card number")
      return false
    }
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      toast.error("Invalid expiry date")
      return false
    }
    if (!/^\d{3,4}$/.test(cardData.cvv)) {
      toast.error("Invalid CVV")
      return false
    }
    return true
  }

  const handleCardPayment = async () => {
    if (!validateCardData()) return

    setIsProcessing(true)
    try {
      const response = await fetch("/api/payments/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          card_number: cardData.number.replace(/\s/g, ""),
          expiry_date: cardData.expiry,
          cvv: cardData.cvv,
          cardholder_name: cardData.name,
          amount,
        }),
      })

      const data = await response.json()
      if (response.ok && data.transaction_id) {
        toast.success("Payment successful")
        onSuccess(data.transaction_id)
      } else {
        const msg = data.error || "Payment failed. Please try again."
        toast.error(msg)
        onError(msg)
      }
    } catch (err: any) {
      const msg = err?.message || "Network error. Please try again."
      toast.error(msg)
      onError(msg)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          Credit/Debit Card
        </CardTitle>
        <CardDescription>Pay securely with your credit or debit card</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-name">Cardholder Name</Label>
          <Input
            id="card-name"
            placeholder="John Doe"
            value={cardData.name}
            onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
            disabled={isProcessing}
            aria-invalid={!cardData.name}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input
            id="card-number"
            placeholder="1234 5678 9012 3456"
            value={cardData.number}
            onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
            maxLength={19}
            disabled={isProcessing}
            aria-invalid={!/^\d{16}$/.test(cardData.number.replace(/\s/g, ""))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="card-expiry">Expiry Date</Label>
            <Input
              id="card-expiry"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
              maxLength={5}
              disabled={isProcessing}
              aria-invalid={!/^\d{2}\/\d{2}$/.test(cardData.expiry)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-cvv">CVV</Label>
            <Input
              id="card-cvv"
              placeholder="123"
              value={cardData.cvv}
              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
              maxLength={4}
              disabled={isProcessing}
              aria-invalid={!/^\d{3,4}$/.test(cardData.cvv)}
            />
          </div>
        </div>

        <div className="bg-muted p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Amount to charge: <span className="font-semibold text-foreground">KSh {amount.toLocaleString()}</span>
          </p>
        </div>

        <Button
          onClick={handleCardPayment}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Pay KSh {amount.toLocaleString()}
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </CardContent>
    </Card>
  )
}
