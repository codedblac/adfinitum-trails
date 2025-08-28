"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Loader2, Lock } from "lucide-react"

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

  const handleCardPayment = async () => {
    if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
      onError("Please fill in all card details")
      return
    }

    setIsProcessing(true)
    try {
      // This would integrate with your Django backend payment processor
      const response = await fetch("/api/payments/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          card_number: cardData.number,
          expiry_date: cardData.expiry,
          cvv: cardData.cvv,
          cardholder_name: cardData.name,
          amount: amount,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess(data.transaction_id)
      } else {
        onError(data.error || "Payment failed")
      }
    } catch (error) {
      onError("Network error. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
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
          disabled={isProcessing || !cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name}
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
