import { notFound } from "next/navigation"
import { ProductCard } from "@/components/home/product-card"
import { Badge } from "@/components/ui/badge"

// Mock data for categories
const categoryData = {
  phones: {
    title: "Smartphones",
    description: "Latest smartphones from top brands",
    products: [
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
    ],
    brands: ["Apple", "Samsung", "Huawei", "Oppo", "Tecno", "Infinix"],
  },
  appliances: {
    title: "Home Appliances",
    description: "Premium home appliances for modern living",
    products: [
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
    ],
    brands: ["LG", "Samsung", "Sony", "Panasonic", "Hisense"],
  },
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const data = categoryData[category as keyof typeof categoryData]

  if (!data) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-muted-foreground mb-6">{data.description}</p>

        {/* Brand Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium">Popular Brands:</span>
          {data.brands.map((brand) => (
            <Badge key={brand} variant="outline">
              {brand}
            </Badge>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">Showing {data.products.length} of 24 products</p>
        {/* <Button variant="outline" size="lg">
          Load More Products
        </Button> */}
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [{ category: "phones" }, { category: "appliances" }]
}
