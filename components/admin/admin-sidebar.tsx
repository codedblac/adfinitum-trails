"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  FileText,
  Tag,
} from "lucide-react"

// Map backend "icon" strings to Lucide icons
const iconMap: Record<string, React.ElementType> = {
  dashboard: LayoutDashboard,
  products: Package,
  orders: ShoppingCart,
  users: Users,
  analytics: BarChart3,
  categories: Tag,
  reports: FileText,
  settings: Settings,
  // future: hero-carousel: ImageIcon
}

export interface NavItem {
  name: string
  href: string
  icon: keyof typeof iconMap
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [navigation, setNavigation] = useState<NavItem[]>([])

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const res = await fetch("/api/admin/navigation")
        if (!res.ok) throw new Error("Failed to load navigation")
        const data: NavItem[] = await res.json()
        setNavigation(data)
      } catch (error) {
        console.error(error)
        // fallback static navigation
        setNavigation([
          { name: "Dashboard", href: "/admin", icon: "dashboard" },
          { name: "Products", href: "/admin/products", icon: "products" },
          { name: "Orders", href: "/admin/orders", icon: "orders" },
          { name: "Users", href: "/admin/users", icon: "users" },
          { name: "Analytics", href: "/admin/analytics", icon: "analytics" },
          { name: "Categories", href: "/admin/categories", icon: "categories" },
          { name: "Reports", href: "/admin/reports", icon: "reports" },
          { name: "Settings", href: "/admin/settings", icon: "settings" },
        ])
      }
    }

    fetchNavigation()
  }, [])

  return (
    <aside className="w-64 bg-card border-r min-h-screen hidden lg:flex flex-col">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      </div>

      <nav className="px-4 flex-1 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
