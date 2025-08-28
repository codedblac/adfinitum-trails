import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, FileText, Phone } from "lucide-react"

export default function WarrantyPage() {
  const warrantyPeriods = [
    { category: "Smartphones", period: "12-24 months", coverage: "Manufacturer warranty" },
    { category: "Laptops & Computers", period: "12-36 months", coverage: "Manufacturer warranty" },
    { category: "Home Appliances", period: "12-60 months", coverage: "Manufacturer + Extended" },
    { category: "Audio Equipment", period: "12-24 months", coverage: "Manufacturer warranty" },
    { category: "Gaming Consoles", period: "12 months", coverage: "Manufacturer warranty" },
    { category: "Accessories", period: "6-12 months", coverage: "Manufacturer warranty" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Warranty Information</h1>
            <p className="text-xl text-muted-foreground">Comprehensive warranty coverage for your peace of mind</p>
          </div>

          {/* Warranty Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Manufacturer Warranty</h3>
                <p className="text-sm text-muted-foreground">
                  All products include full manufacturer warranty coverage
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Extended Options</h3>
                <p className="text-sm text-muted-foreground">
                  Additional warranty plans available for major appliances
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Support Included</h3>
                <p className="text-sm text-muted-foreground">Technical support and warranty claim assistance</p>
              </CardContent>
            </Card>
          </div>

          {/* Warranty Periods by Category */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Warranty Periods by Product Category</CardTitle>
              <CardDescription>Standard warranty coverage for different product types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {warrantyPeriods.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{item.category}</h4>
                      <p className="text-sm text-muted-foreground">{item.coverage}</p>
                    </div>
                    <Badge variant="secondary">{item.period}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What's Covered */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">What's Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Manufacturing defects</li>
                  <li>• Component failures under normal use</li>
                  <li>• Software issues (where applicable)</li>
                  <li>• Power supply problems</li>
                  <li>• Display and screen issues</li>
                  <li>• Audio and connectivity problems</li>
                  <li>• Motor and compressor failures (appliances)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">What's Not Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Physical damage from drops or impacts</li>
                  <li>• Water or liquid damage</li>
                  <li>• Damage from misuse or abuse</li>
                  <li>• Normal wear and tear</li>
                  <li>• Cosmetic damage that doesn't affect function</li>
                  <li>• Damage from unauthorized repairs</li>
                  <li>• Software issues caused by user modifications</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Warranty Claim Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6" />
                <span>How to Make a Warranty Claim</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Contact Us</h4>
                  <p className="text-xs text-muted-foreground">Call or email our support team with your issue</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Provide Details</h4>
                  <p className="text-xs text-muted-foreground">Share purchase receipt and describe the problem</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Assessment</h4>
                  <p className="text-xs text-muted-foreground">We'll evaluate and approve your warranty claim</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    4
                  </div>
                  <h4 className="font-semibold mb-2">Resolution</h4>
                  <p className="text-xs text-muted-foreground">Repair, replacement, or refund as appropriate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extended Warranty */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Extended Warranty Plans</CardTitle>
              <CardDescription>Additional protection beyond manufacturer warranty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For major appliances and high-value electronics, we offer extended warranty plans that provide
                additional coverage beyond the standard manufacturer warranty.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">Basic Extended</h4>
                  <p className="text-2xl font-bold text-primary mb-2">+1 Year</p>
                  <p className="text-sm text-muted-foreground">Additional year of coverage</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">Premium Extended</h4>
                  <p className="text-2xl font-bold text-primary mb-2">+2 Years</p>
                  <p className="text-sm text-muted-foreground">Two additional years plus accidental damage</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">Complete Care</h4>
                  <p className="text-2xl font-bold text-primary mb-2">+3 Years</p>
                  <p className="text-sm text-muted-foreground">Maximum coverage including maintenance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Warranty Support Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Need help with a warranty claim or have questions about coverage?</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Phone Support</h4>
                  <p className="text-muted-foreground">+254 700 000 000</p>
                  <p className="text-sm text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Email Support</h4>
                  <p className="text-muted-foreground">warranty@adfinitumtrails.com</p>
                  <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button>File Warranty Claim</Button>
                <Button variant="outline">Check Warranty Status</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
