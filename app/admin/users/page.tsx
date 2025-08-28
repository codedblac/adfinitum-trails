"use client"

import { UserTable } from "@/components/admin/user-table"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminUsersPage() {
  return (
    <ProtectedRoute requireAdmin>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage customer accounts and user permissions.</p>
        </div>

        <UserTable />
      </div>
    </ProtectedRoute>
  )
}
