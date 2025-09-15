"use client"

import { OrderTable } from "@/components/admin/order-table"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminOrdersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">
            Manage customer orders and track fulfillment.
          </p>
        </div>

        {/* Orders Table */}
        <OrderTable />
      </div>
    </ProtectedRoute>
  )
}
