"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductSection } from "@/components/home/product-section";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Phone,
} from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import type { Product as LibProduct, Category, Brand, ProductImage } from "@/lib/products";

interface ProductPageProps {
  params: { id: string };
}

// Helper to normalize brand/category
const getName = (val?: string | Category | Brand | null) =>
  !val ? "" : typeof val === "string" ? val : val.name ?? "";

type ProductFrontend = Omit<LibProduct, "brand" | "category"> & {
  brand: string;
  category: string;
  createdAt?: string;
  images: ProductImage[];
};

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const { fetchProductById, fetchRelatedProducts } = useProducts();
  const { addItem } = useCart();

  const [product, setProduct] = useState<ProductFrontend | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductFrontend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        if (!data) return notFound();

        const normalized: ProductFrontend = {
          ...data,
          brand: getName(data.brand),
          category: getName(data.category),
          createdAt: data.createdAt ? String(data.createdAt) : undefined,
          images: Array.isArray(data.images)
            ? data.images
            : data.images
            ? [data.images[0]]
            : [{ id: 0, image: "/placeholder.svg" }],
        };
        setProduct(normalized);

        const related = await fetchRelatedProducts(normalized.category, normalized.id);
        setRelatedProducts(
          (related || []).map((p) => ({
            ...p,
            brand: getName(p.brand),
            category: getName(p.category),
            createdAt: p.createdAt ? String(p.createdAt) : undefined,
            images: Array.isArray(p.images) ? p.images : p.images ? [p.images[0]] : [{ id: 0, image: "/placeholder.svg" }],
          }))
        );
      } catch (err: any) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, fetchProductById, fetchRelatedProducts]);

  if (loading) return <p className="text-center py-20">Loading product...</p>;
  if (error || !product) return <p className="text-red-500 text-center py-20">{error || "Product not found"}</p>;

  const hasDiscount = product.discount_price && product.discount_price < product.price;
  const currentPrice = hasDiscount ? product.discount_price! : product.price;
  const discountPercent = hasDiscount ? Math.round(((product.price - currentPrice) / product.price) * 100) : 0;
  const isNew = product.createdAt && new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000;
  const images = product.images.length > 0 ? product.images : [{ id: 0, image: "/placeholder.svg" }];

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingToCart(true);
    try {
      await addItem({
        id: Number(product.id),
        name: product.name,
        price: currentPrice,
        quantity,
        image: images[0].image,
        category: product.category,
      });
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted group">
            <Image src={images[selectedImage].image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
            {isNew && <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">New Arrival</Badge>}
            {hasDiscount && <Badge variant="destructive" className="absolute top-4 right-4">-{discountPercent}% OFF</Badge>}
            {product.is_featured && <Badge variant="secondary" className="absolute bottom-4 left-4 bg-primary text-primary-foreground">Featured</Badge>}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(idx)}
                aria-label={`Select image ${idx + 1}`}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${selectedImage === idx ? "border-primary" : "border-transparent"}`}
              >
                <Image src={img.image} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.brand} • {product.category}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{(product.rating ?? 0).toFixed(1)} ({product.review_count ?? 0} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">KSh {currentPrice.toLocaleString()}</span>
              {hasDiscount && <span className="text-xl text-muted-foreground line-through">KSh {product.price.toLocaleString()}</span>}
              <Badge variant="outline">{product.availability}</Badge>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground mb-4">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-r-none">-</Button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="rounded-l-none">+</Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={addingToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" /> {addingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button variant="outline" size="lg"><Heart className="h-5 w-5" /></Button>
              <Button variant="outline" size="lg"><Share2 className="h-5 w-5" /></Button>
            </div>
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /><span className="text-sm">Free Delivery</span></div>
            <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /><span className="text-sm">2 Year Warranty</span></div>
            <div className="flex items-center gap-2"><RotateCcw className="h-5 w-5 text-primary" /><span className="text-sm">30-Day Returns</span></div>
            <div className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /><span className="text-sm">24/7 Support</span></div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && <ProductSection title="Related Products" products={relatedProducts} />}
    </div>
  );
}
