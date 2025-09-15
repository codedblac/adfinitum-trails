"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Building } from "lucide-react"

export type PaymentMethod = "mpesa" | "card" | "bank"

export interface PaymentData {
  method: PaymentMethod
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
    method: initialData?.method ?? "mpesa",
    mpesaNumber: initialData?.mpesaNumber ?? "",
    cardNumber: initialData?.cardNumber ?? "",
    expiryDate: initialData?.expiryDate ?? "",
    cvv: initialData?.cvv ?? "",
    cardName: initialData?.cardName ?? "",
    bankAccount: initialData?.bankAccount ?? "",
    bankCode: initialData?.bankCode ?? "",
  })

  // Clear irrelevant fields when switching payment method
  useEffect(() => {
    setFormData((prev) => {
      switch (prev.method) {
        case "mpesa":
          return { ...prev, cardNumber: "", expiryDate: "", cvv: "", cardName: "", bankAccount: "", bankCode: "" }
        case "card":
          return { ...prev, mpesaNumber: "", bankAccount: "", bankCode: "" }
        case "bank":
          return { ...prev, mpesaNumber: "", cardNumber: "", expiryDate: "", cvv: "", cardName: "" }
        default:
          return prev
      }
    })
  }, [formData.method])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  const handleChange = (field: keyof PaymentData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.method}
            onValueChange={(value: PaymentMethod) => handleChange("method", value)}
          >
            {[
              { id: "mpesa", label: "M-Pesa", icon: <Smartphone className="h-5 w-5 text-green-600" />, description: "Pay with your mobile money" },
              { id: "card", label: "Credit/Debit Card", icon: <CreditCard className="h-5 w-5 text-blue-600" />, description: "Visa, Mastercard accepted" },
              { id: "bank", label: "Bank Transfer", icon: <Building className="h-5 w-5 text-purple-600" />, description: "Direct bank account transfer" },
            ].map((method) => (
              <div key={method.id} className="flex items-center space-x-2 p-4 border rounded-lg mb-2">
                <RadioGroupItem value={method.id as PaymentMethod} id={method.id} />
                <div className="flex items-center gap-3 flex-1">
                  {method.icon}
                  <div>
                    <Label htmlFor={method.id} className="font-medium">{method.label}</Label>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* M-Pesa */}
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
              <p className="text-sm text-muted-foreground">You’ll receive an STK push notification to complete payment</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Card */}
      {formData.method === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputField label="Cardholder Name" id="cardName" value={formData.cardName} onChange={(v) => handleChange("cardName", v)} />
            <InputField label="Card Number" id="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={(v) => handleChange("cardNumber", v)} />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Expiry Date" id="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={(v) => handleChange("expiryDate", v)} />
              <InputField label="CVV" id="cvv" placeholder="123" value={formData.cvv} onChange={(v) => handleChange("cvv", v)} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bank */}
      {formData.method === "bank" && (
        <Card>
          <CardHeader>
            <CardTitle>Bank Transfer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputField label="Account Number" id="bankAccount" value={formData.bankAccount} onChange={(v) => handleChange("bankAccount", v)} />
            <InputField label="Bank Code" id="bankCode" placeholder="e.g. 01 for KCB" value={formData.bankCode} onChange={(v) => handleChange("bankCode", v)} />
            <p className="text-sm text-muted-foreground">Bank details will be provided after placing your order</p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          Back to Shipping
        </Button>
        <Button type="submit" className="flex-1">Review Order</Button>
      </div>
    </form>
  )
}

// Reusable input field component
function InputField({
  label,
  id,
  value,
  onChange,
  placeholder,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  )
}
