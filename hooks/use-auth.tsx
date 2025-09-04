"use client"

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react"
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
} from "@/lib/auth"

// ---------- TYPES ----------
export interface User {
  id: string
  full_name: string
  email: string
  phone?: string
  address?: string
  city?: string
  postal_code?: string
  role?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (fullName: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

// ---------- CONTEXT ----------
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load profile on mount if token exists
  useEffect(() => {
    let mounted = true

    async function loadProfile() {
      try {
        const me = await getProfile()
        if (mounted) setUser(me)
      } catch {
        if (mounted) {
          setUser(null)
          logoutUser() // clear bad tokens
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    if (typeof window !== "undefined" && localStorage.getItem("access")) {
      loadProfile()
    } else {
      setIsLoading(false)
    }

    return () => {
      mounted = false
    }
  }, [])

  // ---------- LOGIN ----------
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await loginUser({ email, password })
      const me = await getProfile()
      setUser(me)
    } catch (err) {
      setUser(null)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ---------- REGISTER ----------
  const register = useCallback(
    async (fullName: string, email: string, password: string) => {
      setIsLoading(true)
      try {
        await registerUser({
          full_name: fullName,
          email,
          password,
          confirm_password: password,
        })
        // auto-login after register
        await login(email, password)
      } catch (err) {
        setUser(null)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [login]
  )

  // ---------- LOGOUT ----------
  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } finally {
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
