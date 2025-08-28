export const SITE_CONFIG = {
  name: "Adfinitum Trails",
  description: "Your trusted partner for premium electronics and home appliances",
  url: "https://adfinitumtrails.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/adfinitumtrails",
    facebook: "https://facebook.com/adfinitumtrails",
    instagram: "https://instagram.com/adfinitumtrails",
    linkedin: "https://linkedin.com/company/adfinitumtrails",
  },
}

export const CATEGORIES = {
  PHONES: "phones",
  APPLIANCES: "appliances",
} as const

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const

export const PAYMENT_METHODS = {
  MPESA: "mpesa",
  CARD: "card",
  BANK: "bank",
} as const
