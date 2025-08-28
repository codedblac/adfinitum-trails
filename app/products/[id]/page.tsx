"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ProductSection } from "@/components/home/product-section"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Phone } from "lucide-react"

// Mock product data
const productData = {
  "iphone-15-pro": {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro 128GB",
    price: 145000,
    originalPrice: 155000,
    images: ["/iphone-15-pro-hands.png", "/placeholder.svg", "/placeholder.svg"],
    rating: 4.8,
    reviewCount: 124,
    category: "Smartphones",
    brand: "Apple",
    availability: "In Stock",
    description:
      "The iPhone 15 Pro features a titanium design, A17 Pro chip, and advanced camera system with 5x telephoto zoom.",
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Chip: "A17 Pro",
      Storage: "128GB",
      Camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      Battery: "Up to 23 hours video playback",
      Material: "Titanium",
    },
    features: [
      "Titanium design with textured matte glass back",
      "A17 Pro chip with 6-core GPU",
      "Pro camera system with 5x telephoto zoom",
      "Action Button for quick access to features",
      "USB-C connector",
    ],
    isNew: true,
    hasFinancing: true,
  },
}

const relatedProducts = [
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
    id: "airpods-pro",
    name: "Apple AirPods Pro (2nd Gen)",
    price: 28000,
    image: "/apple-airpods-pro.png",
    rating: 4.8,
    reviewCount: 156,
    category: "Audio",
  },
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const product = productData[id as keyof typeof productData]
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound()
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isNew && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">New Arrival</Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                -{discount}% OFF
              </Badge>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {product.brand} • {product.category}
            </p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">KSh {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  KSh {product.originalPrice.toLocaleString()}
                </span>
              )}
              <Badge variant="outline" className="text-green-600 border-green-600">
                {product.availability}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground mb-4">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-r-none"
                >
                  -
                </Button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="rounded-l-none">
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Financing Option */}
            {product.hasFinancing && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-medium">Flexible Financing Available</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pay as low as KSh {Math.round(product.price / 12).toLocaleString()}/month with 0% interest
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Learn more about financing
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">2 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-sm">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="specifications" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Reviews coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <ProductSection
        title="You Might Also Like"
        subtitle="Related products that complement your choice"
        products={relatedProducts}
      />
    </div>
  )
}
