"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Smartphone } from "lucide-react"

interface MpesaPaymentProps {
  amount: number
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function MpesaPayment({ amount, onSuccess, onError }: MpesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleMpesaPayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      onError("Please enter a valid phone number")
      return
    }

    setIsProcessing(true)
    try {
      // This would integrate with your Django backend M-Pesa API
      const response = await fetch("/api/payments/mpesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-green-600" />
          M-Pesa Payment
        </CardTitle>
        <CardDescription>Pay securely using your M-Pesa mobile money account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mpesa-phone">Phone Number</Label>
          <Input
            id="mpesa-phone"
            type="tel"
            placeholder="254712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <div className="bg-muted p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Amount to pay: <span className="font-semibold text-foreground">KSh {amount.toLocaleString()}</span>
          </p>
        </div>

        <Button
          onClick={handleMpesaPayment}
          disabled={isProcessing || !phoneNumber}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Payment...
            </>
          ) : (
            "Pay with M-Pesa"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          You will receive an M-Pesa prompt on your phone to complete the payment
        </p>
      </CardContent>
    </Card>
  )
}
