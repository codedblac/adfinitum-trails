"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart as apiClearCart,
  type Cart,
  type CartItem as ApiCartItem,
} from "@/lib/cart"

// -------------------- TYPES --------------------

// Frontend-friendly CartItem
export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
  category?: string
}

// Normalize backend CartItem → frontend CartItem
function normalizeCartItem(item: ApiCartItem): CartItem {
  return {
    id: item.id,
    name: item.product?.name ?? "Unnamed Product",
    price: item.price,
    quantity: item.quantity,
    image: item.product?.image || "/placeholder.svg",
    category: item.product?.category || "Uncategorized",
  }
}

// -------------------- HOOK --------------------
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load cart from API (with localStorage fallback)
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true)
      try {
        const cart: Cart = await getCart()
        const normalized = cart.items.map(normalizeCartItem)
        setItems(normalized)
        localStorage.setItem("adfinitum-cart", JSON.stringify(normalized))
      } catch (err) {
        console.error("Failed to load cart:", err)
        setError(err instanceof Error ? err.message : "Failed to load cart")

        // Fallback: load from localStorage
        const savedCart = localStorage.getItem("adfinitum-cart")
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart))
          } catch {
            localStorage.removeItem("adfinitum-cart")
          }
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchCart()
  }, [])

  // Sync to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("adfinitum-cart", JSON.stringify(items))
  }, [items])

  // -------------------- CART OPERATIONS --------------------

  const addItem = useCallback(
    async (product: {
      id: number
      name: string
      price: number
      image?: string
      category?: string
      quantity?: number
    }) => {
      setIsLoading(true)
      try {
        const cart = await addCartItem(product.id, product.quantity ?? 1)
        setItems(cart.items.map(normalizeCartItem))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add item")
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const updateQuantity = useCallback(async (itemId: number, quantity: number) => {
    setIsLoading(true)
    try {
      const cart = await updateCartItem(itemId, quantity)
      setItems(cart.items.map(normalizeCartItem))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeItem = useCallback(async (itemId: number) => {
    setIsLoading(true)
    try {
      const cart = await removeCartItem(itemId)
      setItems(cart.items.map(normalizeCartItem))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearCart = useCallback(async () => {
    setIsLoading(true)
    try {
      await apiClearCart()
      setItems([])
      localStorage.removeItem("adfinitum-cart")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // -------------------- DERIVED VALUES --------------------
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    isLoading,
    error,
  }
}
