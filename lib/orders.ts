"use server";

import { apiRequest } from "@/lib/api";
import { cookies as nextCookies } from "next/headers";

// ----------------------------
// Create Order (Checkout)
// ----------------------------
export async function createOrder(data: {
  cart_id: number;
  email: string;
  full_name: string;
  phone_number: string;
  shipping_address_id: number;
  shipping_method_id: number;
}) {
  const cookieStore = await nextCookies();
  const access = cookieStore.get("access")?.value;

  return apiRequest("/api/orders/", {
    method: "POST",
    headers: { Authorization: `Bearer ${access}` },
    body: JSON.stringify(data),
  });
}

// ----------------------------
// Get All Orders (user)
// ----------------------------
export async function getOrders() {
  const cookieStore = await nextCookies();
  const access = cookieStore.get("access")?.value;

  return apiRequest("/api/orders/", {
    method: "GET",
    headers: { Authorization: `Bearer ${access}` },
  });
}

// ----------------------------
// Get Single Order
// ----------------------------
export async function getOrderById(orderId: number) {
  const cookieStore = await nextCookies();
  const access = cookieStore.get("access")?.value;

  return apiRequest(`/api/orders/${orderId}/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${access}` },
  });
}

// ----------------------------
// Cancel Order
// ----------------------------
export async function cancelOrder(orderId: number) {
  const cookieStore = await nextCookies();
  const access = cookieStore.get("access")?.value;

  return apiRequest(`/api/orders/${orderId}/cancel/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access}` },
  });
}

// ----------------------------
// Get Order History
// ----------------------------
export async function getOrderHistory(orderId: number) {
  const cookieStore = await nextCookies();
  const access = cookieStore.get("access")?.value;

  return apiRequest(`/api/orders/${orderId}/history/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${access}` },
  });
}

// ----------------------------
// Admin: Update Status
// ----------------------------
export async function adminUpdateOrderStatus(orderId: number, status: string) {
  const cookieStore = await nextCookies();
  const access = cookieStore.get("access")?.value;

  return apiRequest(`/api/orders/${orderId}/update_status/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access}` },
    body: JSON.stringify({ status }),
  });
}
