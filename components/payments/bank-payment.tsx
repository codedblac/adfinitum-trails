"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Copy, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BankPaymentProps {
  amount: number
  orderNumber: string
  onConfirm: () => void
}

const banks = [
  { id: "kcb", name: "KCB Bank", code: "01" },
  { id: "equity", name: "Equity Bank", code: "68" },
  { id: "coop", name: "Co-operative Bank", code: "11" },
  { id: "absa", name: "Absa Bank", code: "03" },
  { id: "standard", name: "Standard Chartered", code: "02" },
]

export function BankPayment({ amount, orderNumber, onConfirm }: BankPaymentProps) {
  const [selectedBank, setSelectedBank] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const { toast } = useToast()

  const bankDetails = {
    accountName: "Adfinitum Trails Ltd",
    accountNumber: "1234567890",
    bankCode: "KCBLKENX",
    reference: orderNumber,
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          Bank Transfer
        </CardTitle>
        <CardDescription>Transfer funds directly to our bank account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Your Bank</label>
          <Select value={selectedBank} onValueChange={setSelectedBank}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your bank" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-muted p-4 rounded-lg space-y-3">
          <h4 className="font-semibold text-sm">Bank Transfer Details</h4>
          <div className="space-y-2 text-sm">
            {Object.entries({
              "Account Name": bankDetails.accountName,
              "Account Number": bankDetails.accountNumber,
              "Bank Code": bankDetails.bankCode,
              Reference: bankDetails.reference,
            }).map(([label, value]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-muted-foreground">{label}:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{value}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(value, label)}
                    className="h-6 w-6 p-0"
                    aria-label={`Copy ${label}`}
                  >
                    {copied === label ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold text-lg">KSh {amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Please use the reference number "{orderNumber}" when making the transfer.
          </p>
        </div>

        <Button
          onClick={onConfirm}
          disabled={!selectedBank}
          className="w-full"
        >
          I have made the transfer
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your order will be processed once we confirm the payment (usually within 24 hours)
        </p>
      </CardContent>
    </Card>
  )
}
