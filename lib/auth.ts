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
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
}

// ---------- REGISTER ----------
export async function registerUser(data: RegisterPayload) {
  return apiRequest("/accounts/register/", {
    method: "POST",
    body: JSON.stringify({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      password2: data.confirm_password, // backend expects "password2"
    }),
  });
}

// ---------- LOGIN ----------
export async function loginUser(data: LoginPayload) {
  const res = await apiRequest("/accounts/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });

  // Debug backend response
  console.log("🔎 Login response:", res);

  // Safely get tokens from response
  const access = res.access || res.tokens?.access;
  const refresh = res.refresh || res.tokens?.refresh;

  if (!access || !refresh) {
    throw new Error("Login response missing access or refresh token");
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  }

  return res; // contains user info and tokens
}

// ---------- PROFILE ----------
export async function getProfile() {
  return apiRequest("/accounts/me/", {
    method: "GET",
  });
}

// ---------- LOGOUT ----------
export async function logoutUser() {
  if (typeof window === "undefined") return;

  const refresh = localStorage.getItem("refresh");
  if (refresh) {
    try {
      await apiRequest("/accounts/logout/", {
        method: "POST",
        body: JSON.stringify({ refresh }),
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

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
