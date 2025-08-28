"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Building } from "lucide-react"

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

interface PaymentFormProps {
  onNext: (data: PaymentData) => void
  onBack: () => void
  initialData?: Partial<PaymentData>
}

export function PaymentForm({ onNext, onBack, initialData }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentData>({
    method: initialData?.method || "mpesa",
    mpesaNumber: initialData?.mpesaNumber || "",
    cardNumber: initialData?.cardNumber || "",
    expiryDate: initialData?.expiryDate || "",
    cvv: initialData?.cvv || "",
    cardName: initialData?.cardName || "",
    bankAccount: initialData?.bankAccount || "",
    bankCode: initialData?.bankCode || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  const handleChange = (field: keyof PaymentData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={formData.method} onValueChange={(value) => handleChange("method", value)}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="mpesa" id="mpesa" />
              <div className="flex items-center gap-3 flex-1">
                <Smartphone className="h-5 w-5 text-green-600" />
                <div>
                  <Label htmlFor="mpesa" className="font-medium">
                    M-Pesa
                  </Label>
                  <p className="text-sm text-muted-foreground">Pay with your mobile money</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <div className="flex items-center gap-3 flex-1">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <div>
                  <Label htmlFor="card" className="font-medium">
                    Credit/Debit Card
                  </Label>
                  <p className="text-sm text-muted-foreground">Visa, Mastercard accepted</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="bank" id="bank" />
              <div className="flex items-center gap-3 flex-1">
                <Building className="h-5 w-5 text-purple-600" />
                <div>
                  <Label htmlFor="bank" className="font-medium">
                    Bank Transfer
                  </Label>
                  <p className="text-sm text-muted-foreground">Direct bank account transfer</p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* M-Pesa Form */}
      {formData.method === "mpesa" && (
        <Card>
          <CardHeader>
            <CardTitle>M-Pesa Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mpesaNumber">M-Pesa Phone Number</Label>
              <Input
                id="mpesaNumber"
                type="tel"
                placeholder="254712345678"
                value={formData.mpesaNumber}
                onChange={(e) => handleChange("mpesaNumber", e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                You will receive an STK push notification to complete the payment
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Card Form */}
      {formData.method === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                value={formData.cardName}
                onChange={(e) => handleChange("cardName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleChange("cardNumber", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange("expiryDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleChange("cvv", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bank Transfer Form */}
      {formData.method === "bank" && (
        <Card>
          <CardHeader>
            <CardTitle>Bank Transfer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankAccount">Account Number</Label>
              <Input
                id="bankAccount"
                value={formData.bankAccount}
                onChange={(e) => handleChange("bankAccount", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankCode">Bank Code</Label>
              <Input
                id="bankCode"
                placeholder="e.g., 01 for KCB"
                value={formData.bankCode}
                onChange={(e) => handleChange("bankCode", e.target.value)}
                required
              />
            </div>
            <p className="text-sm text-muted-foreground">
              You will receive bank details to complete the transfer after placing your order
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          Back to Shipping
        </Button>
        <Button type="submit" className="flex-1">
          Review Order
        </Button>
      </div>
    </form>
  )
}
