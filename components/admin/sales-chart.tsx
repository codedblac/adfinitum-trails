"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type SalesData = {
  month: string
  total: number
}

export function SalesChart() {
  const [data, setData] = useState<{ name: string; sales: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/`)
        if (!res.ok) throw new Error("Failed to fetch sales data")
        const salesData: SalesData[] = await res.json()

        const formatted = salesData.map((item) => ({
          name: item.month, // optionally format with dayjs(item.month).format("MMM")
          sales: item.total,
        }))

        setData(formatted)
      } catch (err: any) {
        console.error("Error fetching sales:", err)
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading sales data...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : data.length === 0 ? (
          <p>No sales data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`KSh ${Number(value).toLocaleString()}`, "Sales"]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
