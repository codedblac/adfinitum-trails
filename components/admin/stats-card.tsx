"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}

export function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs font-medium mt-1 ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
          aria-label={`Trend is ${trend}`}
        >
          {change} {trend === "up" ? "↑" : "↓"}
        </p>
      </CardContent>
    </Card>
  )
}
