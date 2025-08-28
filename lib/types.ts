export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  isAdmin: boolean
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  brand: string
  images: string[]
  specifications: Record<string, string>
  inStock: boolean
  stockCount: number
  rating: number
  reviewCount: number
  featured: boolean
  trending: boolean
  createdAt: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedVariant?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: string
  shippingAddress: Address
  paymentMethod: string
  paymentStatus: string
  createdAt: string
  updatedAt: string
}

export interface Address {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}
