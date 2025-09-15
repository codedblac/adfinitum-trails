"use server";

import { cookies as nextCookies } from "next/headers";
import { apiRequest, API_ENDPOINTS } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const isProd = process.env.NODE_ENV === "production";

/**
 * Set a secure cookie
 */
async function setCookie(name: string, value: string) {
  const cookieStore = await nextCookies(); // ✅ must await
  cookieStore.set({
    name,
    value,
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/",
  });
}

/**
 * Delete a cookie
 */
async function deleteCookie(name: string) {
  const cookieStore = await nextCookies(); // ✅ must await
  cookieStore.delete(name);
}

/**
 * Login server action
 */
export async function serverLogin(email: string, password: string) {
  const tokens = await apiRequest(API_ENDPOINTS.accounts.login, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  await setCookie("access", tokens.access);
  await setCookie("refresh", tokens.refresh);

  return tokens;
}

/**
 * Register server action
 */
export async function serverRegister(email: string, password: string) {
  const tokens = await apiRequest(API_ENDPOINTS.accounts.register, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  await setCookie("access", tokens.access);
  await setCookie("refresh", tokens.refresh);

  return tokens;
}

/**
 * Logout server action
 */
export async function serverLogout() {
  await deleteCookie("access");
  await deleteCookie("refresh");
  return { success: true };
}

/**
 * Refresh token server action
 */
export async function serverRefreshToken() {
  const cookieStore = await nextCookies();
  const refresh = cookieStore.get("refresh")?.value;

  if (!refresh) throw new Error("No refresh token found");

  const tokens = await apiRequest(API_ENDPOINTS.accounts.refresh, {
    method: "POST",
    body: JSON.stringify({ refresh }),
  });

  await setCookie("access", tokens.access);

  return tokens;
}
