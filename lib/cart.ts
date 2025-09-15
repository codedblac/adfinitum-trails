// lib/cart.ts
import { apiRequest, API_ENDPOINTS } from "./api"

// -------------------- TYPES --------------------

// Individual cart item (matches backend CartItem)
export interface CartItem {
  id: number // cart item ID (not product ID)
  product: {
    id: number
    name: string
    price: number
    image?: string
    category?: string
  }
  quantity: number
  price: number // unit price
  subtotal: number
}

// Cart structure (matches backend Cart)
export interface Cart {
  id: number
  items: CartItem[]
  total_items: number
  total_price: number
}

// Coupon response from backend
export interface CouponResponse {
  cart: Cart
  coupon: {
    id: number
    code: string
    discount_percent: number
    active: boolean
    valid_from: string
    valid_to: string
    is_valid: boolean
  }
  discount: number
  final_total: number
}

// -------------------- API FUNCTIONS --------------------

// Get current cart (user or guest)
export async function getCart(): Promise<Cart> {
  return apiRequest<Cart>(API_ENDPOINTS.cart.list)
}

// Add product to cart
export async function addCartItem(productId: number, quantity: number = 1): Promise<Cart> {
  return apiRequest<Cart>(API_ENDPOINTS.cart.add, {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity }),
  })
}

// Update quantity of existing cart item
export async function updateCartItem(itemId: number, quantity: number): Promise<Cart> {
  return apiRequest<Cart>(API_ENDPOINTS.cart.update(itemId), {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  })
}

// Remove a cart item
export async function removeCartItem(itemId: number): Promise<Cart> {
  await apiRequest(API_ENDPOINTS.cart.remove(itemId), { method: "DELETE" })
  // Return updated cart
  return getCart()
}

// Clear all items from cart
export async function clearCart(): Promise<Cart> {
  await apiRequest(API_ENDPOINTS.cart.clear, { method: "POST" })
  return getCart()
}

// Apply a coupon code to the cart
export async function applyCoupon(code: string): Promise<CouponResponse> {
  return apiRequest<CouponResponse>(API_ENDPOINTS.cart.applyCoupon, {
    method: "POST",
    body: JSON.stringify({ code }),
  })
}

// -------------------- DEFAULT EXPORT --------------------
export default {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
  applyCoupon,
}
