import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By accessing and using the Adfinitum Trails website and services, you accept and agree to be bound by
                  the terms and provision of this agreement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Use License</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Permission is granted to temporarily download one copy of the materials on Adfinitum Trails' website
                  for personal, non-commercial transitory viewing only.
                </p>
                <p className="text-muted-foreground">
                  This license shall automatically terminate if you violate any of these restrictions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We strive to provide accurate product information, including descriptions, specifications, and
                  pricing. However, we do not warrant that product descriptions or other content is accurate, complete,
                  reliable, current, or error-free.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Orders and Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any
                  order for any reason at any time.
                </p>
                <p className="text-muted-foreground">
                  Payment must be received before products are shipped. We accept various payment methods including
                  M-Pesa, bank transfers, and credit/debit cards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Shipping and Delivery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We offer delivery services within Kenya. Delivery times are estimates and may vary based on location
                  and product availability.
                </p>
                <p className="text-muted-foreground">
                  Risk of loss and title for products purchased pass to you upon delivery to the carrier.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Returns and Refunds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Products may be returned within 14 days of delivery in their original condition and packaging. Some
                  restrictions may apply.
                </p>
                <p className="text-muted-foreground">
                  Refunds will be processed within 7-14 business days after we receive and inspect the returned item.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Warranty</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  All products come with manufacturer warranties. Additional warranty terms may apply to specific
                  products.
                </p>
                <p className="text-muted-foreground">
                  We provide warranty support and will facilitate warranty claims with manufacturers when applicable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  In no event shall Adfinitum Trails be liable for any damages (including, without limitation, damages
                  for loss of data or profit, or due to business interruption) arising out of the use or inability to
                  use the materials on our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our
                  services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                  posting on our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 space-y-1 text-muted-foreground">
                  <p>Email: legal@adfinitumtrails.com</p>
                  <p>Phone: +254 700 000 000</p>
                  <p>Address: 123 Electronics Street, Nairobi, Kenya</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
