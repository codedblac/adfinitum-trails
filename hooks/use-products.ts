"use client"

import { useState } from "react"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  description: string
  brand: string
  availability: string
  isNew?: boolean
  isTrending?: boolean
  hasFinancing?: boolean
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async (filters?: any) => {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call to Django backend
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters || {}),
      })

      if (!response.ok) throw new Error("Failed to fetch products")

      const data = await response.json()
      setProducts(data.products)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchProductById = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/products/${id}`)

      if (!response.ok) throw new Error("Product not found")

      const data = await response.json()
      return data.product
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const searchProducts = async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`)

      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()
      setProducts(data.products)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    searchProducts,
  }
}
