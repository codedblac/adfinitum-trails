import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, CreditCard, Clock, CheckCircle } from "lucide-react"

export default function FinancingPage() {
  const financingOptions = [
    {
      name: "3-Month Plan",
      duration: "3 months",
      interestRate: "5%",
      minAmount: 10000,
      maxAmount: 100000,
      monthlyFee: 500,
      features: ["No collateral required", "Quick approval", "Flexible payments"],
    },
    {
      name: "6-Month Plan",
      duration: "6 months",
      interestRate: "8%",
      minAmount: 20000,
      maxAmount: 200000,
      monthlyFee: 750,
      features: ["Lower monthly payments", "Extended warranty", "Free delivery"],
    },
    {
      name: "12-Month Plan",
      duration: "12 months",
      interestRate: "12%",
      minAmount: 50000,
      maxAmount: 500000,
      monthlyFee: 1000,
      features: ["Lowest monthly payments", "Premium support", "Insurance included"],
    },
  ]

  const requirements = [
    "Valid Kenyan ID or Passport",
    "Proof of income (payslip or bank statements)",
    "Active mobile money account",
    "Minimum age of 18 years",
    "Good credit history",
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Flexible Financing Options</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the electronics and appliances you need today with our affordable payment plans. No hidden fees,
            transparent terms.
          </p>
        </div>

        {/* Financing Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {financingOptions.map((option, index) => (
            <Card key={index} className="relative">
              {index === 1 && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {option.name}
                </CardTitle>
                <CardDescription>{option.duration} payment plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{option.interestRate}</div>
                  <div className="text-sm text-muted-foreground">Interest Rate</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Amount Range:</span>
                    <span className="text-sm font-medium">
                      KSh {option.minAmount.toLocaleString()} - {option.maxAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Fee:</span>
                    <span className="text-sm font-medium">KSh {option.monthlyFee}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Features:</h4>
                  <ul className="space-y-1">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              How It Works
            </CardTitle>
            <CardDescription>Simple steps to get your financing approved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Choose Products", desc: "Select the items you want to purchase" },
                { step: "2", title: "Apply Online", desc: "Fill out our quick application form" },
                { step: "3", title: "Get Approved", desc: "Receive approval within 24 hours" },
                { step: "4", title: "Enjoy Products", desc: "Get your items delivered and start paying" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
              <CardDescription>What you need to apply for financing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Payment Calculator
              </CardTitle>
              <CardDescription>Calculate your monthly payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">KSh 8,500</div>
                  <div className="text-sm text-muted-foreground">Estimated monthly payment</div>
                  <div className="text-xs text-muted-foreground mt-1">For KSh 50,000 over 6 months</div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Calculator className="mr-2 h-4 w-4" />
                  Open Full Calculator
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
