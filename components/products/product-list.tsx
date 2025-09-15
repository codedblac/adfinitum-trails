"use client";

import { useEffect, useState } from "react";
import { ProductListCard } from "./product-list-card";
import type { Product } from "@/lib/products";
import { ProductFilters, FilterState } from "./product-filters";
import { ProductSort } from "./product-sort";
import { useProducts } from "@/hooks/use-products";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const defaultFilters: FilterState = {
  brands: [],
  categories: [],
  availability: [],
  priceRange: [0, 500_000],
  rating: 0,
};

export function ProductList() {
  const { products, total, isLoading, error, fetchProducts, next, previous } = useProducts();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  // Fetch products whenever filters, sorting, or page changes
  useEffect(() => {
    const query: Record<string, any> = {};

    if (filters.brands.length) query.brand = filters.brands.join(",");
    if (filters.categories.length) query.category = filters.categories.join(",");
    if (filters.availability.length) query.availability = filters.availability.join(",");
    if (filters.priceRange[0] > 0) query.min_price = filters.priceRange[0];
    if (filters.priceRange[1] < 500_000) query.max_price = filters.priceRange[1];
    if (filters.rating > 0) query.min_rating = filters.rating;

    fetchProducts(query, sortBy, page, page > 1);
  }, [filters, sortBy, page, fetchProducts]);

  const handleFiltersChange = (updatedFilters: FilterState) => {
    setFilters(updatedFilters);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  const handleViewModeChange = (mode: "grid" | "list") => setViewMode(mode);

  const handleLoadMore = async () => {
    if (!next) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchProducts(filters, sortBy, nextPage, true);
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Filters Sidebar */}
      <div className="md:w-64 flex-shrink-0">
        <ProductFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Products & Sorting */}
      <div className="flex-1 space-y-4">
        <ProductSort
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          totalResults={total}
        />

        {products.length === 0 ? (
          <p className="text-center text-muted-foreground">No products found.</p>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {products.map((product: Product) => (
                <ProductListCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
              {previous && (
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!previous}
                >
                  Previous
                </Button>
              )}

              <span>
                Page {page} of {Math.max(1, Math.ceil(total / products.length))}
              </span>

              {next && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!next}
                  >
                    Next
                  </Button>

                  <Button onClick={handleLoadMore} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Load More"}
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
