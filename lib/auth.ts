import { apiRequest } from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ---------- TYPES ----------
interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface ForgotPasswordPayload {
  email: string;
}

interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

// ---------- REGISTER ----------
export async function registerUser(data: RegisterPayload) {
  return apiRequest("/accounts/register/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ---------- LOGIN ----------
export async function loginUser(data: LoginPayload) {
  const tokens = await apiRequest("/accounts/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);
  }

  return tokens;
}

// ---------- PROFILE ----------
export async function getProfile() {
  return apiRequest("/accounts/me/", {
    method: "GET",
  });
}

// ---------- LOGOUT ----------
export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

// ---------- FORGOT PASSWORD ----------
export async function forgotPassword({ email }: ForgotPasswordPayload) {
  return apiRequest("/accounts/password-reset/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// ---------- UPDATE PROFILE ----------
export async function updateProfile(data: UpdateProfilePayload) {
  return apiRequest("/accounts/me/", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
