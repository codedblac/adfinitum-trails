"use client"

import { AnalyticsCharts } from "@/components/admin/analytics-charts"
import { StatsCard } from "@/components/admin/stats-cards"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { TrendingUp, Users, Package, DollarSign } from "lucide-react"

export default function AdminAnalyticsPage() {
  return (
    <ProtectedRoute requireAdmin>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your business performance.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Conversion Rate"
            value="3.2%"
            change="+0.5%"
            trend="up"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Avg. Order Value"
            value="KSh 95,000"
            change="+12%"
            trend="up"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Return Customers"
            value="68%"
            change="+5%"
            trend="up"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Top Product"
            value="iPhone 15 Pro"
            change="25 sold"
            trend="up"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        {/* Charts */}
        <AnalyticsCharts />
      </div>
    </ProtectedRoute>
  )
}
