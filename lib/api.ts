const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const REFRESH_ENDPOINT = "/accounts/token/refresh/";

/**
 * Refresh the access token using the refresh token.
 * Returns the new access token or null if refresh failed.
 */
async function refreshAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null; // SSR safety

  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const res = await fetch(`${API_URL}${REFRESH_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return null;
    }

    const data = await res.json();
    if (data.access) {
      localStorage.setItem("access", data.access);
      return data.access;
    }
  } catch (err) {
    console.error("Failed to refresh token:", err);
  }

  return null;
}

/**
 * Generic API request handler with automatic token refresh.
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (typeof window === "undefined") {
    throw new Error("apiRequest cannot be called on the server");
  }

  let token = localStorage.getItem("access");

  const buildHeaders = (t?: string): HeadersInit => ({
    "Content-Type": "application/json",
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
    ...(options.headers || {}),
  });

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: buildHeaders(token || undefined),
  });

  // If token expired → try refresh once
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      token = newToken;
      res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: buildHeaders(newToken),
      });
    }
  }

  if (!res.ok) {
    let errorMsg = `API error: ${res.status}`;
    try {
      const errData = await res.json();
      errorMsg =
        errData.detail || errData.message || errData.error || errorMsg;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(errorMsg);
  }

  // If 204 No Content → return null instead of throwing JSON error
  if (res.status === 204) return null as T;

  return res.json() as Promise<T>;
}
