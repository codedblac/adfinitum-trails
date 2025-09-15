"use client"

import { useState } from "react"
import { initiateMpesaPayment, submitBankTransfer, fetchPaymentById } from "@/lib/api"

// -------------------- TYPES --------------------
export interface PaymentMethod {
  id: string
  name: string
  type: "mpesa" | "bank"
  icon: string
  description: string
}

export interface PaymentStatus {
  status: "idle" | "processing" | "success" | "error"
  message?: string
  transactionId?: string
}

export interface MpesaPaymentData {
  order: number
  amount: number
  phone_number: string
}

export interface BankPaymentData {
  order: number
  amount: number
  reference_number: string
  receipt_image?: File
}

interface PaymentResult {
  success: boolean
  data?: any
  error?: string
}

// -------------------- HOOK --------------------
export function usePayments() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ status: "idle" })

  // Available payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "mpesa",
      name: "M-Pesa",
      type: "mpesa",
      icon: "📱",
      description: "Pay with your M-Pesa mobile money account",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      type: "bank",
      icon: "🏦",
      description: "Transfer funds directly from your bank account",
    },
  ]

  // -------------------- PROCESS PAYMENT --------------------
  const processPayment = async (
    method: "mpesa" | "bank",
    paymentData: MpesaPaymentData | BankPaymentData
  ): Promise<PaymentResult> => {
    setPaymentStatus({ status: "processing" })

    try {
      let response: any

      if (method === "mpesa") {
        response = await initiateMpesaPayment(paymentData as MpesaPaymentData)
      } else if (method === "bank") {
        const data = paymentData as BankPaymentData
        const formData = new FormData()
        formData.append("order", String(data.order))
        formData.append("amount", String(data.amount))
        formData.append("reference_number", data.reference_number)
        if (data.receipt_image) formData.append("receipt_image", data.receipt_image)
        response = await submitBankTransfer(formData)
      } else {
        throw new Error("Unsupported payment method")
      }

      setPaymentStatus({
        status: "success",
        message: "Payment processed successfully",
        transactionId: response.payment?.transaction_id,
      })

      return { success: true, data: response }
    } catch (error: any) {
      setPaymentStatus({
        status: "error",
        message: error.message || "Payment failed",
      })
      return { success: false, error: error.message || "Payment failed" }
    }
  }

  // -------------------- VERIFY PAYMENT --------------------
  const verifyPayment = async (paymentId: number | string) => {
    try {
      return await fetchPaymentById(paymentId)
    } catch (error) {
      console.error("Payment verification failed:", error)
      return { verified: false, error: "Verification failed" }
    }
  }

  // -------------------- RESET STATUS --------------------
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
