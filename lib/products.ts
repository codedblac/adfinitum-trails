// lib/products.ts
import { apiRequest, API_ENDPOINTS } from "./api"

// ---------- TYPES ----------
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parent?: number | null
  is_active: boolean
}

export interface Brand {
  id: number
  name: string
  slug: string
  description?: string
  is_active: boolean
}

export interface ProductImage {
  id: number
  image: string
  alt_text?: string
  is_featured?: boolean
}

export interface ProductReview {
  id: number
  user: number
  user_name: string
  rating: number
  comment: string
  created_at: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  discount_price?: number
  is_on_sale: boolean
  is_featured: boolean
  stock_quantity: number
  availability: "in-stock" | "pre-order" | "coming-soon"
  sku?: string
  seo_title?: string
  seo_description?: string
  category: Category
  brand?: Brand | null
  images: ProductImage[]
  variations?: any[]
  rating: number
  review_count: number
  reviews: ProductReview[]
}

export interface HeroBanner {
  id: number
  title: string
  subtitle?: string
  image: string
  cta_text?: string
  cta_link?: string
  is_active: boolean
  display_order: number
}

// ---------- PAGINATION ----------
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ---------- HELPERS ----------
function normalizeProduct(p: any): Product {
  return {
    ...p,
    rating: p.rating ?? 0,
    review_count: p.review_count ?? 0,
  }
}

// ---------- CATEGORIES ----------
export async function getCategories(): Promise<Category[]> {
  return apiRequest(API_ENDPOINTS.categories.list)
}

export async function createCategory(data: Partial<Category>) {
  return apiRequest(API_ENDPOINTS.categories.create, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateCategory(id: number, data: Partial<Category>) {
  return apiRequest(API_ENDPOINTS.categories.update(id), {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteCategory(id: number) {
  return apiRequest(API_ENDPOINTS.categories.delete(id), { method: "DELETE" })
}

// ---------- BRANDS ----------
export async function getBrands(): Promise<Brand[]> {
  return apiRequest(API_ENDPOINTS.brands.list)
}

// ---------- PRODUCTS ----------
export interface ProductFilters {
  category?: string | number
  brand?: string | number
  featured?: boolean
  on_sale?: boolean
  min_price?: number
  max_price?: number
  availability?: ("in-stock" | "pre-order" | "coming-soon")[]
  search?: string
  min_rating?: number
  ordering?: string
  page?: number
}

export async function getProducts(
  filters?: ProductFilters
): Promise<PaginatedResponse<Product>> {
  const params = new URLSearchParams()

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          params.append(key, value.join(","))
        } else {
          params.append(key, String(value))
        }
      }
    })
  }

  const query = params.toString() ? `?${params.toString()}` : ""

  try {
    const data = await apiRequest<PaginatedResponse<any>>(
      `${API_ENDPOINTS.products.list}${query}`
    )

    return {
      ...data,
      results: Array.isArray(data?.results)
        ? data.results.map(normalizeProduct)
        : [], // ✅ fallback
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return {
      count: 0,
      next: null,
      previous: null,
      results: [], // ✅ safe empty response
    }
  }
}


export async function getProductBySlug(slug: string): Promise<Product> {
  const p = await apiRequest(API_ENDPOINTS.products.detail(slug))
  return normalizeProduct(p)
}

// Backward compatible for old `getProduct`
export async function getProduct(idOrSlug: string | number): Promise<Product> {
  if (typeof idOrSlug === "number") {
    return getProductBySlug(String(idOrSlug))
  }
  return getProductBySlug(idOrSlug)
}

export async function createProduct(data: Partial<Product>) {
  return apiRequest(API_ENDPOINTS.products.create, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateProduct(id: string | number, data: Partial<Product>) {
  return apiRequest(API_ENDPOINTS.products.update(Number(id)), {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteProduct(id: string | number) {
  return apiRequest(API_ENDPOINTS.products.delete(Number(id)), { method: "DELETE" })
}

// ---------- HERO BANNERS ----------
export async function getHeroBanners(): Promise<HeroBanner[]> {
  return apiRequest(API_ENDPOINTS.heroBanners.list)
}

export async function createHeroBanner(data: Partial<HeroBanner>) {
  return apiRequest(API_ENDPOINTS.heroBanners.create, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateHeroBanner(id: number, data: Partial<HeroBanner>) {
  return apiRequest(API_ENDPOINTS.heroBanners.update(id), {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteHeroBanner(id: number) {
  return apiRequest(API_ENDPOINTS.heroBanners.delete(id), { method: "DELETE" })
}
