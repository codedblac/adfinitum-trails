"use client";

import { useState, useEffect, useMemo } from "react";
import { ProductCard } from "@/components/home/product-card";
import { ProductListCard } from "@/components/products/product-list-card";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductSort } from "@/components/products/product-sort";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useProducts, useCategories } from "@/hooks/use-products";
import type { Product } from "@/lib/products";

interface FilterState {
  brands: string[];
  priceRange: [number, number];
  categories: string[];
  availability: ("in-stock" | "pre-order" | "coming-soon")[];
  rating: number;
}

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange: [0, 500_000],
    categories: [],
    availability: [],
    rating: 0,
  });

  const [sortBy, setSortBy] = useState<keyof typeof sortMapping>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { products, fetchProducts, isLoading } = useProducts();
  const { categories: backendCategories, fetchCategories } = useCategories();

  const [brands, setBrands] = useState<string[]>([]);
  const [availabilityOptions, setAvailabilityOptions] = useState<
    ("in-stock" | "pre-order" | "coming-soon")[]
  >([]);

  // Map frontend sort keys to backend ordering
  const sortMapping = useMemo(() => ({
    relevance: "",
    "price-low": "price",
    "price-high": "-price",
    rating: "-rating",
    newest: "-created_at",
    oldest: "created_at",
    popular: "-reviewCount",
  } as const), []);

  // Fetch categories once
  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  // Update dynamic brands and availability
  useEffect(() => {
    setBrands(
      Array.from(
        new Set(
          products
            .map((p) => (typeof p.brand === "string" ? p.brand : p.brand?.name))
            .filter(Boolean) as string[]
        )
      ).sort()
    );

    setAvailabilityOptions(
      Array.from(
        new Set(
          products
            .map((p) => p.availability)
            .filter(
              (a): a is "in-stock" | "pre-order" | "coming-soon" =>
                a === "in-stock" || a === "pre-order" || a === "coming-soon"
            )
        )
      ).sort()
    );
  }, [products]);

  const buildQueryFilters = () => {
    const query: Record<string, string | number> = {};
    if (filters.brands.length) query.brand = filters.brands.join(",");
    if (filters.categories.length) query.category = filters.categories.join(",");
    if (filters.availability.length) query.availability = filters.availability.join(",");
    if (filters.priceRange[0] > 0) query.min_price = filters.priceRange[0];
    if (filters.priceRange[1] < 500_000) query.max_price = filters.priceRange[1];
    if (filters.rating > 0) query.min_rating = filters.rating;
    if (sortMapping[sortBy]) query.ordering = sortMapping[sortBy];
    return query;
  };

  useEffect(() => {
    fetchProducts(buildQueryFilters());
  }, [filters, sortBy, fetchProducts]);

  const clearFilters = () => {
    setFilters({ brands: [], priceRange: [0, 500_000], categories: [], availability: [], rating: 0 });
    setSortBy("newest");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">Discover our complete range of electronics and appliances</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <ProductFilters filters={filters} onFiltersChange={setFilters} onClearFilters={clearFilters} />
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Mobile Filters & Sort */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <ProductFilters filters={filters} onFiltersChange={setFilters} onClearFilters={clearFilters} />
              </SheetContent>
            </Sheet>
          </div>

          <ProductSort
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalResults={products.length}
          />

          {/* Products Grid/List */}
          {isLoading ? (
            <p className="text-center py-12">Loading products...</p>
          ) : products.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {products.map((product: Product) =>
                viewMode === "grid" ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductListCard key={product.id} product={product} />
                )
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
