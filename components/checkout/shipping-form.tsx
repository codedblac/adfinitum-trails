"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export interface ShippingData {
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

interface ShippingFormProps {
  onNext: (data: ShippingData) => void
  initialData?: Partial<ShippingData>
}

export function ShippingForm({ onNext, initialData }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingData>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    postalCode: initialData?.postalCode || "",
    deliveryMethod: initialData?.deliveryMethod || "standard",
    notes: initialData?.notes || "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: keyof ShippingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/checkout/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Failed to save shipping information")
      }

      const data = await res.json()
      onNext(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" value={formData.firstName} onChange={(v) => handleChange("firstName", v)} />
            <InputField label="Last Name" value={formData.lastName} onChange={(v) => handleChange("lastName", v)} />
          </div>
          <InputField label="Email" type="email" value={formData.email} onChange={(v) => handleChange("email", v)} />
          <InputField label="Phone Number" type="tel" value={formData.phone} onChange={(v) => handleChange("phone", v)} />
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputField label="Street Address" value={formData.address} onChange={(v) => handleChange("address", v)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="City" value={formData.city} onChange={(v) => handleChange("city", v)} />
            <InputField label="Postal Code" value={formData.postalCode} onChange={(v) => handleChange("postalCode", v)} />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Method */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={formData.deliveryMethod} onValueChange={(value) => handleChange("deliveryMethod", value)}>
            {[
              { value: "standard", label: "Standard Delivery (3-5 days)", description: "KSh 500 - Free over KSh 10,000" },
              { value: "express", label: "Express Delivery (1-2 days)", description: "KSh 1,500" },
              { value: "pickup", label: "Store Pickup", description: "Free - Ready in 2 hours" },
            ].map((method) => (
              <div key={method.value} className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                <RadioGroupItem value={method.value} id={method.value} />
                <div className="flex-1">
                  <Label htmlFor={method.value} className="font-medium">{method.label}</Label>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Any special delivery instructions..." value={formData.notes} onChange={(e) => handleChange("notes", e.target.value)} />
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Continue to Payment"}
      </Button>
    </form>
  )
}

// Reusable input field
function InputField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required />
    </div>
  )
}
