"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

export interface SortOption {
  value: string;
  label: string;
}

interface ProductSortProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  totalResults: number;
  options?: SortOption[];
}

/** Default sort options mapped to backend fields */
const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { value: "-created_at", label: "Newest First" },
  { value: "created_at", label: "Oldest First" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-rating", label: "Highest Rated" },
  { value: "relevance", label: "Most Relevant" }, // fallback for search
];

export function ProductSort({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalResults,
  options = DEFAULT_SORT_OPTIONS,
}: ProductSortProps) {
  // Auto default sort if "relevance" or empty
  const activeSort = sortBy === "relevance" || !sortBy ? "-created_at" : sortBy;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 flex-wrap">
      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{totalResults}</span>{" "}
        {totalResults === 1 ? "product" : "products"}
      </p>

      {/* Sorting and View Mode */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap w-full sm:w-auto">
        {/* Sort Select */}
        <Select
          value={activeSort}
          onValueChange={(value) => onSortChange(value)}
        >
          <SelectTrigger
            className="w-full sm:w-48"
            aria-label="Sort products"
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* View Mode Toggle */}
        <div className="flex border rounded-md overflow-hidden">
          <Button
            type="button"
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid view"
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            aria-label="List view"
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
