"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Truck, Shield, CreditCard } from "lucide-react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ProductSection } from "@/components/home/product-section";

import {
  Product,
  Category,
  getProducts,
  getCategories,
} from "@/lib/products";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState({
    featured: true,
    trending: true,
    recommended: true,
    categories: true,
  });

  useEffect(() => {
    // Featured products
    (async () => {
      try {
        const res = await getProducts({ featured: true, ordering: "-created_at" });
        setFeaturedProducts(res.results || []);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading((prev) => ({ ...prev, featured: false }));
      }
    })();

    // Trending products
    (async () => {
      try {
        const res = await getProducts({ ordering: "-rating" });
        setTrendingProducts(res.results || []);
      } catch (err) {
        console.error("Error fetching trending products:", err);
      } finally {
        setLoading((prev) => ({ ...prev, trending: false }));
      }
    })();

    // Recommended products
    (async () => {
      try {
        const res = await getProducts({ ordering: "-created_at" });
        setRecommendedProducts(res.results || []);
      } catch (err) {
        console.error("Error fetching recommended products:", err);
      } finally {
        setLoading((prev) => ({ ...prev, recommended: false }));
      }
    })();

    // Categories
    (async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }));
      }
    })();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Carousel */}
      <section className="container mx-auto px-4">
        <HeroCarousel />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Free delivery on orders over KSh 10,000 within Nairobi
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Warranty Protection</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive warranty coverage on all products
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Flexible Financing</h3>
              <p className="text-sm text-muted-foreground">
                Easy payment plans with M-Pesa and bank integration
              </p>
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
          loading={loading.featured}
          viewAllHref="/products?featured=true"
        />
      </section>

      {/* Trending Products */}
      <section className="container mx-auto px-4">
        <ProductSection
          title="Trending Now"
          subtitle="What everyone's buying this week"
          products={trendingProducts}
          loading={loading.trending}
          viewAllHref="/products?trending=true"
        />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground">
            Explore our wide range of premium electronics and appliances
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading.categories
            ? Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-60 bg-muted animate-pulse rounded-lg"
                />
              ))
            : categories.slice(0, 2).map((cat) => (
                <Card
                  key={cat.id}
                  className="group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="text-6xl">📦</div>
                        <div>
                          <h3 className="text-2xl font-bold">{cat.name}</h3>
                          {cat.description && (
                            <p className="text-muted-foreground">
                              {cat.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <Button className="w-full" asChild>
                        <Link href={`/categories/${cat.slug}`}>
                          Browse {cat.name}{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="container mx-auto px-4">
        <ProductSection
          title="You Might Also Like"
          subtitle="Recommended based on popular choices"
          products={recommendedProducts}
          loading={loading.recommended}
          viewAllHref="/products"
        />
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to upgrade your tech?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust{" "}
            <span className="font-semibold">Adfinitum Trails</span> for their
            electronics and appliance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/categories/phones">Start Shopping</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/financing">Learn About Financing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
