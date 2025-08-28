"use client"

import { useState } from "react"

export interface PaymentMethod {
  id: string
  name: string
  type: "mpesa" | "card" | "bank"
  icon: string
  description: string
}

export interface PaymentStatus {
  status: "idle" | "processing" | "success" | "error"
  message?: string
  transactionId?: string
}

export function usePayments() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ status: "idle" })

  const paymentMethods: PaymentMethod[] = [
    {
      id: "mpesa",
      name: "M-Pesa",
      type: "mpesa",
      icon: "📱",
      description: "Pay with your M-Pesa mobile money account",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      type: "card",
      icon: "💳",
      description: "Pay securely with your credit or debit card",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      type: "bank",
      icon: "🏦",
      description: "Transfer funds directly from your bank account",
    },
  ]

  const processPayment = async (method: string, paymentData: any) => {
    setPaymentStatus({ status: "processing" })

    try {
      const response = await fetch(`/api/payments/${method}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const data = await response.json()

      if (response.ok) {
        setPaymentStatus({
          status: "success",
          message: "Payment processed successfully",
          transactionId: data.transaction_id,
        })
        return { success: true, data }
      } else {
        setPaymentStatus({
          status: "error",
          message: data.error || "Payment failed",
        })
        return { success: false, error: data.error }
      }
    } catch (error) {
      setPaymentStatus({
        status: "error",
        message: "Network error. Please try again.",
      })
      return { success: false, error: "Network error" }
    }
  }

  const verifyPayment = async (transactionId: string) => {
    try {
      const response = await fetch(`/api/payments/verify/${transactionId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Payment verification failed:", error)
      return { verified: false, error: "Verification failed" }
    }
  }

  const resetPaymentStatus = () => {
    setPaymentStatus({ status: "idle" })
  }

  return {
    paymentMethods,
    paymentStatus,
    processPayment,
    verifyPayment,
    resetPaymentStatus,
  }
}
