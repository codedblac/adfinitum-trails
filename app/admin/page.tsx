"use client"

import { StatsCard } from "@/components/admin/stats-cards"
import { RecentOrders } from "@/components/admin/recent-orders"
import { SalesChart } from "@/components/admin/sales-chart"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireAdmin>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value="KSh 2,450,000"
            change="+12.5%"
            trend="up"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Orders"
            value="1,234"
            change="+8.2%"
            trend="up"
            icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Products"
            value="456"
            change="+3.1%"
            trend="up"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Customers"
            value="2,890"
            change="-2.4%"
            trend="down"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        {/* Charts and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <RecentOrders />
        </div>
      </div>
    </ProtectedRoute>
  )
}
