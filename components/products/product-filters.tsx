"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useBrands, useCategories } from "@/hooks/use-products";
import type { ProductFilters } from "@/hooks/use-products";

// ---------- TYPES ----------
export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  categories: string[];
  availability: NonNullable<ProductFilters["availability"]>;
  rating: number;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

// ---------- CONSTANTS ----------
const DEFAULT_AVAILABILITY_OPTIONS: {
  label: string;
  value: "in-stock" | "pre-order" | "coming-soon";
}[] = [
  { label: "In Stock", value: "in-stock" },
  { label: "Pre-order", value: "pre-order" },
  { label: "Coming Soon", value: "coming-soon" },
];

// ---------- COMPONENT ----------
export function ProductFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState<FilterState["priceRange"]>(filters.priceRange);

  const { brands, fetchBrands } = useBrands();
  const { categories, fetchCategories } = useCategories();

  // Fetch dynamic brands and categories on mount
  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, [fetchBrands, fetchCategories]);

  // Keep local priceRange in sync with props
  useEffect(() => {
    setPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  const handleMultiSelectChange = (
    value: string,
    field: keyof Omit<FilterState, "priceRange" | "rating">,
    checked: boolean
  ) => {
    const current = filters[field] as string[];
    const updated = checked ? [...current, value] : current.filter((v) => v !== value);
    onFiltersChange({ ...filters, [field]: updated } as FilterState);
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    onFiltersChange({ ...filters, priceRange: range });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating });
  };

  const activeFiltersCount =
    filters.brands.length +
    filters.categories.length +
    filters.availability.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500_000 ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.brands.map((b) => (
            <Badge key={b} variant="secondary" className="gap-1">
              {b}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleMultiSelectChange(b, "brands", false)}
              />
            </Badge>
          ))}
          {filters.categories.map((c) => (
            <Badge key={c} variant="secondary" className="gap-1">
              {c}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleMultiSelectChange(c, "categories", false)}
              />
            </Badge>
          ))}
          {filters.availability.map((a) => (
            <Badge key={a} variant="secondary" className="gap-1">
              {DEFAULT_AVAILABILITY_OPTIONS.find((opt) => opt.value === a)?.label || a}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleMultiSelectChange(a, "availability", false)}
              />
            </Badge>
          ))}
          {filters.rating > 0 && <Badge variant="secondary">{filters.rating}+ Stars</Badge>}
        </div>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={500_000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>KSh {priceRange[0].toLocaleString()}</span>
            <span>KSh {priceRange[1].toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.slug}`}
                  checked={filters.brands.includes(brand.slug)}
                  onCheckedChange={(checked) =>
                    handleMultiSelectChange(brand.slug, "brands", checked as boolean)
                  }
                />
                <label htmlFor={`brand-${brand.slug}`} className="text-sm cursor-pointer">
                  {brand.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Loading brands...</p>
          )}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.slug}`}
                  checked={filters.categories.includes(category.slug)}
                  onCheckedChange={(checked) =>
                    handleMultiSelectChange(category.slug, "categories", checked as boolean)
                  }
                />
                <label htmlFor={`category-${category.slug}`} className="text-sm cursor-pointer">
                  {category.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Loading categories...</p>
          )}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {DEFAULT_AVAILABILITY_OPTIONS.map((item) => (
            <div key={item.value} className="flex items-center space-x-2">
              <Checkbox
                id={`availability-${item.value}`}
                checked={filters.availability.includes(item.value)}
                onCheckedChange={(checked) =>
                  handleMultiSelectChange(item.value, "availability", checked as boolean)
                }
              />
              <label htmlFor={`availability-${item.value}`} className="text-sm cursor-pointer">
                {item.label}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={(checked) => handleRatingChange(checked ? rating : 0)}
              />
              <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                {rating}+ Stars
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
