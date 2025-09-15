"use client"

import { useState, useCallback } from "react"
import {
  getProducts,
  getProduct,
  getCategories,
  getBrands,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  getHeroBanners,
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
  Product,
  Category,
  Brand,
  HeroBanner,
  PaginatedResponse,
  ProductFilters as APIProductFilters,
} from "@/lib/products"

// ---------- HELPERS ----------
function normalizeProduct(p: Product): Product {
  return {
    ...p,
    brand: p.brand ?? null,
    category: p.category ?? null,
    rating: p.rating ?? 0,
    review_count: p.review_count ?? 0,
  }
}

// ---------- TYPES ----------
export type ProductFilters = APIProductFilters

// ---------- PRODUCTS ----------
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [next, setNext] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(
    async (
      filters?: ProductFilters,
      sortBy?: string,
      page: number = 1,
      append: boolean = false
    ): Promise<Product[]> => {
      setIsLoading(true)
      setError(null)
      try {
        const query: ProductFilters = { ...(filters || {}) }
        if (sortBy && sortBy !== "relevance") query.ordering = sortBy
        query.page = page

        const data: PaginatedResponse<Product> = await getProducts(query)
        const normalized = data.results.map(normalizeProduct)

        setProducts((prev) => (append ? [...prev, ...normalized] : normalized))
        setTotal(data.count)
        setNext(data.next)
        setPrevious(data.previous)

        return normalized
      } catch (err: any) {
        setError(err.message || "Failed to fetch products")
        return []
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const fetchProductById = useCallback(async (id: string | number): Promise<Product | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const p = await getProduct(id)
      return normalizeProduct(p)
    } catch (err: any) {
      setError(err.message || "Failed to fetch product")
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchRelatedProducts = useCallback(
    async (category: string | number, excludeId?: string | number): Promise<Product[]> => {
      try {
        const data: PaginatedResponse<Product> = await getProducts({ category })
        return data.results
          .map(normalizeProduct)
          .filter((p) => String(p.id) !== String(excludeId))
      } catch (err: any) {
        setError(err.message || "Failed to fetch related products")
        return []
      }
    },
    []
  )

  const searchProducts = useCallback(
    async (query: string, append: boolean = false): Promise<Product[]> => {
      setIsLoading(true)
      setError(null)
      try {
        const data: PaginatedResponse<Product> = await getProducts({ search: query })
        const normalized = data.results.map(normalizeProduct)

        setProducts((prev) => (append ? [...prev, ...normalized] : normalized))
        setTotal(data.count)
        setNext(data.next)
        setPrevious(data.previous)

        return normalized
      } catch (err: any) {
        setError(err.message || "Search failed")
        return []
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return {
    products,
    total,
    next,
    previous,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    fetchRelatedProducts,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}

// ---------- CATEGORIES ----------
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async (): Promise<Category[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getCategories()
      setCategories(data)
      return data
    } catch (err: any) {
      setError(err.message || "Failed to fetch categories")
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}

// ---------- BRANDS ----------
export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBrands = useCallback(async (): Promise<Brand[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getBrands()
      setBrands(data)
      return data
    } catch (err: any) {
      setError(err.message || "Failed to fetch brands")
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    brands,
    isLoading,
    error,
    fetchBrands,
  }
}

// ---------- HERO BANNERS ----------
export function useHeroBanners() {
  const [banners, setBanners] = useState<HeroBanner[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBanners = useCallback(async (): Promise<HeroBanner[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getHeroBanners()
      setBanners(data)
      return data
    } catch (err: any) {
      setError(err.message || "Failed to fetch hero banners")
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    banners,
    isLoading,
    error,
    fetchBanners,
    createHeroBanner,
    updateHeroBanner,
    deleteHeroBanner,
  }
}
