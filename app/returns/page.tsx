import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Package } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Returns & Exchanges</h1>
            <p className="text-xl text-muted-foreground">Easy returns and exchanges for your peace of mind</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-6 w-6 text-primary" />
                  <span>Return Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">14-day return window</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Original packaging required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Free return shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Full refund or exchange</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-6 w-6 text-primary" />
                  <span>Return Process</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">
                      1
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">Request Return</p>
                      <p className="text-xs text-muted-foreground">Contact support or use your account</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">
                      2
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">Package Item</p>
                      <p className="text-xs text-muted-foreground">Use original packaging and accessories</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">
                      3
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">Ship Back</p>
                      <p className="text-xs text-muted-foreground">Use provided return label</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">
                      4
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">Get Refund</p>
                      <p className="text-xs text-muted-foreground">Processed within 7-14 business days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Returnable vs Non-Returnable Items */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  <span>Returnable Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Smartphones and tablets (unopened)</li>
                  <li>• Laptops and computers</li>
                  <li>• Home appliances (unused)</li>
                  <li>• Audio equipment and headphones</li>
                  <li>• Cameras and accessories</li>
                  <li>• Gaming consoles and games</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <XCircle className="h-6 w-6" />
                  <span>Non-Returnable Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Opened software and digital products</li>
                  <li>• Personal care appliances (used)</li>
                  <li>• Custom or personalized items</li>
                  <li>• Items damaged by misuse</li>
                  <li>• Products past 14-day window</li>
                  <li>• Items without original packaging</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Exchange Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Exchange Information</CardTitle>
              <CardDescription>Need a different size, color, or model? We make exchanges easy.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Exchanges follow the same 14-day policy as returns. If you need to exchange an item for a different
                model or specification, simply request an exchange when initiating your return.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Same Price</div>
                  <div className="text-sm text-muted-foreground">Direct exchange at no extra cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Price Difference</div>
                  <div className="text-sm text-muted-foreground">Pay difference or receive refund</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Free Shipping</div>
                  <div className="text-sm text-muted-foreground">Both ways for exchanges</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact for Returns */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help with Returns?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our customer service team is here to help with your return or exchange.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button>Start Return Request</Button>
                <Button variant="outline">Contact Support</Button>
                <Button variant="outline">Track Return</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
