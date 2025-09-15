"use client"

import { useEffect, useState } from "react"
import { AnalyticsCharts } from "@/components/admin/analytics-charts"
import { StatsCard } from "@/components/admin/stats-card"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { TrendingUp, Users, Package, DollarSign } from "lucide-react"
import { fetchAnalyticsOverview } from "@/lib/api"

interface AnalyticsData {
  conversionRate: number
  avgOrderValue: number
  returnCustomers: number
  topProduct: string
  topProductSold: number
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await fetchAnalyticsOverview()
        setAnalytics(data)
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
      } finally {
        setLoading(false)
      }
    }
    loadAnalytics()
  }, [])

  if (loading) return <div className="py-8 text-center">Loading analytics...</div>
  if (!analytics) return <div className="py-8 text-center text-red-500">Failed to load analytics.</div>

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your business performance.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Conversion Rate"
            value={`${analytics.conversionRate}%`}
            change="+0.5%"
            trend="up"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Avg. Order Value"
            value={`KSh ${analytics.avgOrderValue.toLocaleString()}`}
            change="+12%"
            trend="up"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Return Customers"
            value={`${analytics.returnCustomers}%`}
            change="+5%"
            trend="up"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Top Product"
            value={analytics.topProduct}
            change={`${analytics.topProductSold} sold`}
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
