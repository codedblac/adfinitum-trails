// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
const REFRESH_ENDPOINT = "/accounts/token/refresh/"

// ------------------ ENDPOINTS ------------------
export const API_ENDPOINTS = {
  accounts: {
    register: "/accounts/register/",
    login: "/accounts/login/",
    logout: "/accounts/logout/",
    me: "/accounts/me/",
    refresh: REFRESH_ENDPOINT,
    passwordReset: "/accounts/password-reset/",
    passwordResetConfirm: "/accounts/password-reset/confirm/",
  },
  users: {
    list: "/accounts/users/",
    detail: (id: number) => `/accounts/users/${id}/`,
    update: (id: number) => `/accounts/users/${id}/update/`,
    delete: (id: number) => `/accounts/users/${id}/delete/`,
  },
  products: {
    list: "/products/",
    detail: (slug: string) => `/products/${slug}/`,
    create: "/products/create/",
    update: (id: number) => `/products/${id}/update/`,
    delete: (id: number) => `/products/${id}/delete/`,
  },
  categories: {
    list: "/products/categories/",
    detail: (id: number) => `/products/categories/${id}/`,
    create: "/products/categories/create/",
    update: (id: number) => `/products/categories/${id}/update/`,
    delete: (id: number) => `/products/categories/${id}/delete/`,
  },
  brands: { list: "/products/brands/" },
  heroBanners: {
    list: "/products/hero-banners/",
    detail: (id: number) => `/products/hero-banners/${id}/`,
    create: "/products/hero-banners/create/",
    update: (id: number) => `/products/hero-banners/${id}/update/`,
    delete: (id: number) => `/products/hero-banners/${id}/delete/`,
  },
  cart: {
    list: "/cart/",
    add: "/cart/items/",
    update: (id: number) => `/cart/items/${id}/`,
    remove: (id: number) => `/cart/items/${id}/`,
    clear: "/cart/clear/",
    applyCoupon: "/cart/apply-coupon/",
  },
  orders: {
    list: "/orders/",
    create: "/orders/",
    detail: (id: number | string) => `/orders/${id}/`,
  },
  payments: {
    list: "/payments/",
    detail: (id: number | string) => `/payments/${id}/`,
    mpesaInitiate: "/payments/mpesa/initiate/",
    mpesaCallback: "/payments/mpesa/callback/",
    bankSubmit: "/payments/bank/submit/",
  },
  shipping: {
    addresses: "/shipping/addresses/",
    methods: "/shipping/methods/",
    shipments: "/shipping/shipments/",
    history: (shipmentId: number) => `/shipping/shipments/${shipmentId}/history/`,
  },
  hero: {
    list: "/hero/hero-slides/",
    detail: (id: number) => `/hero/hero-slides/${id}/`,
  },
  analytics: {
    overview: "/analytics/overview/",
    sales: "/analytics/sales/",
    recentOrders: "/analytics/recent-orders/",
  },
}

// ------------------ TOKEN HELPERS ------------------
function getAccessToken() {
  return typeof window !== "undefined" ? localStorage.getItem("access") : null
}

function setAccessToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem("access", token)
}

function removeTokens() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
  }
}

function redirectToLogin() {
  if (typeof window !== "undefined") {
    window.location.href = "/login"
  }
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = typeof window !== "undefined" ? localStorage.getItem("refresh") : null
  if (!refresh) return null

  try {
    const res = await fetch(`${API_URL}${REFRESH_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    })

    if (!res.ok) {
      removeTokens()
      redirectToLogin()
      return null
    }

    const data = await res.json()
    if (data.access) setAccessToken(data.access)
    return data.access
  } catch (err) {
    console.error("Failed to refresh token:", err)
    removeTokens()
    redirectToLogin()
    return null
  }
}

// ------------------ GENERIC API REQUEST ------------------
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  if (typeof window === "undefined")
    throw new Error("apiRequest cannot be called on server")

  let token = getAccessToken()

  const isFormData = options.body instanceof FormData
  const headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  }

  let res = await fetch(`${API_URL}${endpoint}`, { ...options, headers })

  if (res.status === 401 && retry) {
    const newToken = await refreshAccessToken()
    if (newToken) return apiRequest<T>(endpoint, options, false)
  }

  if (!res.ok) {
    let errorMsg = `API error: ${res.status}`
    try {
      const errData = await res.json()
      errorMsg = errData.detail || errData.message || errData.error || errorMsg
    } catch {}
    throw new Error(`API error ${res.status} at ${endpoint}: ${errorMsg}`)
  }

  if (res.status === 204) return null as T

  const contentType = res.headers.get("Content-Type") || ""
  if (contentType.includes("application/json"))
    return res.json() as Promise<T>
  return res.text() as unknown as T
}

// ------------------ HELPERS ------------------

// Accounts
export async function loginUser(data: { email: string; password: string }) {
  return apiRequest(API_ENDPOINTS.accounts.login, {
    method: "POST",
    body: JSON.stringify(data),
  })
}
export async function registerUser(data: any) {
  return apiRequest(API_ENDPOINTS.accounts.register, {
    method: "POST",
    body: JSON.stringify(data),
  })
}
export async function fetchMe() {
  return apiRequest(API_ENDPOINTS.accounts.me)
}
export async function requestPasswordReset(email: string) {
  return apiRequest(API_ENDPOINTS.accounts.passwordReset, {
    method: "POST",
    body: JSON.stringify({ email }),
  })
}
export async function confirmPasswordReset(data: {
  uid: string
  token: string
  new_password: string
  re_new_password: string
}) {
  return apiRequest(API_ENDPOINTS.accounts.passwordResetConfirm, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Products
export async function fetchProducts(params?: Record<string, any>) {
  const query = params
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
    : ""
  return apiRequest(`${API_ENDPOINTS.products.list}${query}`)
}
export async function fetchProductBySlug(slug: string) {
  return apiRequest(API_ENDPOINTS.products.detail(slug))
}

// Orders
export async function fetchOrders() {
  return apiRequest(API_ENDPOINTS.orders.list)
}
export async function fetchOrderById(id: number | string) {
  return apiRequest(API_ENDPOINTS.orders.detail(id))
}
export async function createOrder(data: any) {
  return apiRequest(API_ENDPOINTS.orders.create, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Payments
export async function initiateMpesaPayment(data: {
  order: number
  amount: number
  phone_number: string
}) {
  return apiRequest(API_ENDPOINTS.payments.mpesaInitiate, {
    method: "POST",
    body: JSON.stringify(data),
  })
}
export async function submitBankTransfer(data: FormData) {
  return apiRequest(API_ENDPOINTS.payments.bankSubmit, {
    method: "POST",
    body: data,
    headers: {}, // let browser set boundary
  })
}

// Users
export async function fetchUsers() {
  return apiRequest(API_ENDPOINTS.users.list)
}
export async function fetchUserById(id: number) {
  return apiRequest(API_ENDPOINTS.users.detail(id))
}
export async function updateUser(id: number, data: any) {
  return apiRequest(API_ENDPOINTS.users.update(id), {
    method: "PUT",
    body: JSON.stringify(data),
  })
}
export async function deleteUser(id: number) {
  return apiRequest(API_ENDPOINTS.users.delete(id), { method: "DELETE" })
}

// Categories
export async function fetchCategories() {
  return apiRequest(API_ENDPOINTS.categories.list)
}
export async function fetchCategoryById(id: number) {
  return apiRequest(API_ENDPOINTS.categories.detail(id))
}
export async function fetchCategoryProducts(
  categoryId: number | string,
  extraParams?: Record<string, any>
) {
  const query = extraParams
    ? `?${new URLSearchParams({
        category: String(categoryId),
        ...extraParams,
      }).toString()}`
    : `?category=${categoryId}`
  return apiRequest(`${API_ENDPOINTS.products.list}${query}`)
}

// Hero
export async function fetchHeroSlides() {
  return apiRequest(API_ENDPOINTS.hero.list)
}

// Analytics
export async function fetchAnalyticsOverview() {
  return apiRequest(API_ENDPOINTS.analytics.overview)
}
export async function fetchSalesAnalytics() {
  return apiRequest(API_ENDPOINTS.analytics.sales)
}
export async function fetchCategoryAnalytics() {
  return apiRequest(API_ENDPOINTS.analytics.sales)
}

export async function fetchRecentOrdersAnalytics() {
  return apiRequest(API_ENDPOINTS.analytics.recentOrders)
}

// ------------------ EXPORT ------------------
const API = {
  apiRequest,
  loginUser,
  registerUser,
  fetchMe,
  requestPasswordReset,
  confirmPasswordReset,
  fetchProducts,
  fetchProductBySlug,
  fetchHeroSlides,
  fetchOrders,
  fetchUsers,
  fetchCategories,
  fetchCategoryProducts,
  createOrder,
  initiateMpesaPayment,
  submitBankTransfer,
}

export default API
