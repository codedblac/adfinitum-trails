"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Smartphone } from "lucide-react"
import { initiateMpesaPayment, checkMpesaStatus } from "@/lib/api"
import { toast } from "sonner"

interface MpesaPaymentProps {
  orderId: number | string
  amount: number
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function MpesaPayment({ orderId, amount, onSuccess, onError }: MpesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)

  const validatePhone = (phone: string) => /^254\d{9}$/.test(phone.replace(/\D/g, ""))

  const handleMpesaPayment = async () => {
    if (!validatePhone(phoneNumber)) {
      const msg = "Please enter a valid phone number starting with 254"
      toast.error(msg)
      onError(msg)
      return
    }

    setIsProcessing(true)

    try {
      const response = await initiateMpesaPayment({
        order: Number(orderId),
        amount,
        phone_number: phoneNumber,
      })

      if (response?.payment?.transaction_id) {
        toast.success("Payment initiated. Check your M-Pesa prompt.")
        setTransactionId(response.payment.transaction_id)
      } else {
        const msg = "Payment initiation failed. Please try again."
        toast.error(msg)
        onError(msg)
        setIsProcessing(false)
      }
    } catch (error: any) {
      const msg = error?.message || "Network error. Please try again."
      toast.error(msg)
      onError(msg)
      setIsProcessing(false)
    }
  }

  // Polling for payment confirmation
  useEffect(() => {
    if (!transactionId) return

    const interval = setInterval(async () => {
      try {
        const status = await checkMpesaStatus(transactionId)
        if (status === "success") {
          clearInterval(interval)
          toast.success("Payment confirmed!")
          onSuccess(transactionId)
          setIsProcessing(false)
        } else if (status === "failed") {
          clearInterval(interval)
          const msg = "Payment failed or expired"
          toast.error(msg)
          onError(msg)
          setIsProcessing(false)
          setTransactionId(null)
        }
      } catch (err) {
        console.error("Polling error:", err)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [transactionId, onSuccess, onError])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-green-600" />
          M-Pesa Payment
        </CardTitle>
        <CardDescription>
          Pay securely using your M-Pesa mobile money account
        </CardDescription>
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
            aria-invalid={!validatePhone(phoneNumber)}
            aria-describedby="phone-error"
          />
        </div>

        <div className="bg-muted p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Amount to pay:{" "}
            <span className="font-semibold text-foreground">
              KSh {amount.toLocaleString()}
            </span>
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
              Waiting for M-Pesa confirmation...
            </>
          ) : (
            "Pay with M-Pesa"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          You will receive an M-Pesa prompt on your phone to complete the payment.
          Once confirmed, your order will automatically proceed.
        </p>
      </CardContent>
    </Card>
  )
}
