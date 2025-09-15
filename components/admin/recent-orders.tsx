"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchOrders } from "@/lib/api"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

type Order = {
  id: number | string
  customer_name?: string
  full_name?: string
  total: number
  status: OrderStatus
  date: string
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchOrders()
        const sorted = data
          .sort(
            (a: Order, b: Order) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 5) // latest 5 orders
        setOrders(sorted)
      } catch (err) {
        console.error("Failed to fetch orders:", err)
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/orders">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-2 last:border-b-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">ORD-{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer_name || order.full_name || "Unknown Customer"}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">KSh {order.total.toLocaleString()}</p>
                  <Badge className={statusColors[order.status]}>
                    {order.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
