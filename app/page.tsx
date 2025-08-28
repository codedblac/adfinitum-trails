import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Truck, Shield, CreditCard } from "lucide-react"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { ProductSection } from "@/components/home/product-section"

// Mock data - in real app, this would come from your Django API
const featuredProducts = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro 128GB",
    price: 145000,
    originalPrice: 155000,
    image: "/iphone-15-pro-hands.png",
    rating: 4.8,
    reviewCount: 124,
    category: "Smartphones",
    isNew: true,
  },
  {
    id: "samsung-s24",
    name: "Samsung Galaxy S24 Ultra",
    price: 135000,
    image: "/samsung-galaxy-s24-ultra.png",
    rating: 4.7,
    reviewCount: 89,
    category: "Smartphones",
    isTrending: true,
  },
  {
    id: "lg-oled-tv",
    name: 'LG OLED 55" 4K Smart TV',
    price: 95000,
    originalPrice: 120000,
    image: "/lg-oled-tv.png",
    rating: 4.9,
    reviewCount: 67,
    category: "TVs",
  },
  {
    id: "samsung-fridge",
    name: "Samsung Double Door Refrigerator",
    price: 75000,
    image: "/samsung-refrigerator.png",
    rating: 4.6,
    reviewCount: 45,
    category: "Home Appliances",
  },
]

const trendingProducts = [
  {
    id: "airpods-pro",
    name: "Apple AirPods Pro (2nd Gen)",
    price: 28000,
    image: "/apple-airpods-pro.png",
    rating: 4.8,
    reviewCount: 156,
    category: "Audio",
    isTrending: true,
  },
  {
    id: "macbook-air",
    name: "MacBook Air M2 13-inch",
    price: 165000,
    image: "/macbook-air-m2.png",
    rating: 4.9,
    reviewCount: 78,
    category: "Laptops",
    isNew: true,
  },
  {
    id: "sony-headphones",
    name: "Sony WH-1000XM5 Headphones",
    price: 35000,
    originalPrice: 42000,
    image: "/sony-wh-1000xm5.png",
    rating: 4.7,
    reviewCount: 92,
    category: "Audio",
  },
  {
    id: "nintendo-switch",
    name: "Nintendo Switch OLED",
    price: 42000,
    image: "/nintendo-switch-oled.png",
    rating: 4.8,
    reviewCount: 134,
    category: "Gaming",
  },
]

const recommendedProducts = [
  {
    id: "ipad-air",
    name: "iPad Air 10.9-inch",
    price: 85000,
    image: "/ipad-air-lifestyle.png",
    rating: 4.7,
    reviewCount: 89,
    category: "Tablets",
  },
  {
    id: "dyson-vacuum",
    name: "Dyson V15 Detect Vacuum",
    price: 65000,
    originalPrice: 75000,
    image: "/dyson-vacuum-cleaner.png",
    rating: 4.8,
    reviewCount: 67,
    category: "Home Appliances",
  },
  {
    id: "canon-camera",
    name: "Canon EOS R6 Mark II",
    price: 285000,
    image: "/canon-eos-r6-camera.png",
    rating: 4.9,
    reviewCount: 34,
    category: "Cameras",
  },
  {
    id: "bose-speaker",
    name: "Bose SoundLink Revolve+",
    price: 25000,
    image: "/bose-portable-speaker.png",
    rating: 4.6,
    reviewCount: 78,
    category: "Audio",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Carousel */}
      <section className="container mx-auto px-4">
        <HeroCarousel />
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">Free delivery on orders over KSh 10,000 within Nairobi</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Warranty Protection</h3>
              <p className="text-sm text-muted-foreground">Comprehensive warranty coverage on all products</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Flexible Financing</h3>
              <p className="text-sm text-muted-foreground">Easy payment plans with M-Pesa and bank integration</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <ProductSection
          title="Featured Products"
          subtitle="Handpicked deals and latest arrivals"
          products={featuredProducts}
          viewAllHref="/products?featured=true"
        />
      </section>

      {/* Trending Products */}
      <section className="container mx-auto px-4">
        <ProductSection
          title="Trending Now"
          subtitle="What everyone's buying this week"
          products={trendingProducts}
          viewAllHref="/products?trending=true"
        />
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground">Explore our wide range of premium electronics and appliances</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">📱</div>
                  <div>
                    <h3 className="text-2xl font-bold">Smartphones</h3>
                    <p className="text-muted-foreground">Latest iPhone, Samsung, and more</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Button className="w-full" asChild>
                  <Link href="/categories/phones">
                    Browse Phones <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🏠</div>
                  <div>
                    <h3 className="text-2xl font-bold">Home Appliances</h3>
                    <p className="text-muted-foreground">TVs, Fridges, Microwaves & more</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Button className="w-full" asChild>
                  <Link href="/categories/appliances">
                    Browse Appliances <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* You Might Also Like */}
      <section className="container mx-auto px-4">
        <ProductSection
          title="You Might Also Like"
          subtitle="Recommended based on popular choices"
          products={recommendedProducts}
          viewAllHref="/products"
        />
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to upgrade your tech?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Adfinitum Trails for their electronics and appliance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link href="/categories/phones">Start Shopping</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/financing">Learn About Financing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
