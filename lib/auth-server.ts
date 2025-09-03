"use server"

import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
const isProd = process.env.NODE_ENV === "production"

// ---------- LOGIN ----------
export async function serverLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    let errorData: any = {}
    try {
      errorData = await res.json()
    } catch {
      errorData.detail = await res.text()
    }
    throw new Error(errorData.detail || "Login failed")
  }

  const tokens = await res.json()

  // Store tokens in cookies (for middleware & SSR)
  cookies().set("access", tokens.access, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
