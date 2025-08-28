import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Truck, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">About Adfinitum Trails</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your trusted partner for premium electronics and home appliances. We've been serving customers across
              Kenya with quality products and exceptional service since 2015.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-primary" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide our customers with the latest technology and home appliances at competitive prices, backed
                  by outstanding customer service and support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be Kenya's leading electronics and appliances retailer, known for innovation, reliability, and
                  customer satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Adfinitum Trails?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    All products come with manufacturer warranty and our quality assurance.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Free delivery within Nairobi and affordable shipping nationwide.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Expert Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Our knowledgeable team provides technical support and product guidance.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Best Prices</h3>
                  <p className="text-sm text-muted-foreground">
                    Competitive pricing with flexible financing options available.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Our Story */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
              <CardDescription>How Adfinitum Trails became Kenya's trusted electronics retailer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Founded in 2015 by a team of technology enthusiasts, Adfinitum Trails started as a small electronics
                store in Nairobi with a simple mission: to make the latest technology accessible to everyone in Kenya.
              </p>
              <p className="text-muted-foreground">
                Over the years, we've grown from a single storefront to a comprehensive online and offline retailer,
                serving thousands of satisfied customers across the country. Our commitment to quality, service, and
                innovation has made us a trusted name in the electronics industry.
              </p>
              <p className="text-muted-foreground">
                Today, we offer an extensive range of smartphones, laptops, home appliances, and accessories from the
                world's leading brands, backed by our exceptional customer service and technical support.
              </p>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,000+</div>
              <div className="text-sm text-muted-foreground">Products Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">47</div>
              <div className="text-sm text-muted-foreground">Counties Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">9</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
