import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, MessageCircle, Phone, Mail, Video } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'My Orders' section, or use the tracking number sent to your email.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-Pesa, bank transfers, Visa, Mastercard, and other major credit/debit cards.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery within Nairobi takes 1-2 business days. Other areas in Kenya take 2-5 business days depending on location.",
    },
    {
      question: "Can I return a product?",
      answer: "Yes, you can return products within 14 days of delivery in their original condition and packaging.",
    },
    {
      question: "Do you offer installation services?",
      answer: "Yes, we offer professional installation services for major appliances. Contact us for more details.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Support Center</h1>
            <p className="text-xl text-muted-foreground">Get help with your orders, products, and account</p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
                <Button size="sm">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Support</h3>
                <p className="text-sm text-muted-foreground mb-4">Speak directly with an agent</p>
                <Button size="sm" variant="outline">
                  +254 700 000 000
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">Send us your questions</p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/contact">Send Email</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Video className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Video Guides</h3>
                <p className="text-sm text-muted-foreground mb-4">Watch helpful tutorials</p>
                <Button size="sm" variant="outline">
                  View Guides
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-6 w-6" />
                    <span>Frequently Asked Questions</span>
                  </CardTitle>
                  <CardDescription>Find quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Support Categories */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Order Issues</span>
                    <Badge variant="secondary">24/7</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Product Support</span>
                    <Badge variant="secondary">Business Hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Help</span>
                    <Badge variant="secondary">Business Hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Returns & Refunds</span>
                    <Badge variant="secondary">24/7</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Account Help</span>
                    <Badge variant="secondary">24/7</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/account">My Account</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/orders">Order History</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/returns">Returns & Exchanges</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/warranty">Warranty Information</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
