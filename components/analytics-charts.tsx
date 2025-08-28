"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const salesData = [
  { name: "Jan", sales: 65000, orders: 45 },
  { name: "Feb", sales: 85000, orders: 62 },
  { name: "Mar", sales: 95000, orders: 78 },
  { name: "Apr", sales: 125000, orders: 89 },
  { name: "May", sales: 145000, orders: 102 },
  { name: "Jun", sales: 165000, orders: 118 },
]

const categoryData = [
  { name: "Smartphones", value: 45, color: "#0088FE" },
  { name: "TVs", value: 25, color: "#00C49F" },
  { name: "Home Appliances", value: 20, color: "#FFBB28" },
  { name: "Audio", value: 10, color: "#FF8042" },
]

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === "sales" ? `KSh ${Number(value).toLocaleString()}` : value,
                  name === "sales" ? "Sales" : "Orders",
                ]}
              />
              <Bar dataKey="sales" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
