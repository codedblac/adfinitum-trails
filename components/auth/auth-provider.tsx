// "use client"

// import type React from "react"
// import { createContext, useContext } from "react"
// import { useAuthState } from "@/hooks/use-auth"

// // Keep your User model flexible by making role optional
// interface User {
//   id: string
//   email: string
//   name: string
//   role?: "customer" | "admin"
// }

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<void>
//   register: (name: string, email: string, password: string) => Promise<void>
//   logout: () => void
//   isLoading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const auth = useAuthState()

//   return (
//     <AuthContext.Provider value={auth}>
//       {children}
//     </AuthContext.Provider>
//   )
// }
