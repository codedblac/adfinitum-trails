"use client"

import { useEffect } from "react"
import { ProductTable } from "@/components/admin/product-table"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useProducts } from "@/hooks/use-products"

export default function AdminProductsPage() {
  const {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
    error,
  } = useProducts()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and listings.
          </p>
        </div>

        {/* Products Table */}
        <ProductTable
          products={products}
          isLoading={isLoading}
          error={error}
          onAdd={createProduct}
          onUpdate={updateProduct}
          onDelete={deleteProduct}
        />
      </div>
    </ProtectedRoute>
  )
}
