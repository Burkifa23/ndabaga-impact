"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const COLORS = ["#18181b", "#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"]

interface MonthlyBar {
  month: string
  amount: number
}

interface MethodSlice {
  name: string
  value: number
}

interface DashboardChartsProps {
  monthlyData: MonthlyBar[]
  methodData: MethodSlice[]
}

export default function DashboardCharts({ monthlyData, methodData }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
      {/* Monthly Monetary Pledges — wider */}
      <Card className="lg:col-span-3 border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Monthly Monetary Pledges</CardTitle>
          <CardDescription className="text-xs">Last 6 months — excludes in-kind donations</CardDescription>
        </CardHeader>
        <CardContent>
          {monthlyData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">No data yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))" }}
                  formatter={(v: number) => [`${v.toLocaleString()}`, "Total"]}
                />
                <Bar dataKey="amount" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Donation Method Breakdown — narrower */}
      <Card className="lg:col-span-2 border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Donation Methods</CardTitle>
          <CardDescription className="text-xs">How supporters choose to give</CardDescription>
        </CardHeader>
        <CardContent>
          {methodData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">No data yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={methodData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={82}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {methodData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))" }}
                />
                <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
