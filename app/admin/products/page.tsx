"use client"

import { ProductTable } from "@/components/admin/product-table"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminProductsPage() {
  return (
    <ProtectedRoute requireAdmin>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory and listings.</p>
        </div>

        <ProductTable />
      </div>
    </ProtectedRoute>
  )
}
