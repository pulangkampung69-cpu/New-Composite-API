"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { formatNumber } from "@/lib/utils";

// Mock revenue segment data
const revenueData: Record<string, {
  segments: { name: string; value: number; color: string }[];
  quarterly: { quarter: string; revenue: number; profit: number }[];
}> = {
  BBCA: {
    segments: [
      { name: "Kredit Konsumer", value: 45000000000000, color: "#10b981" },
      { name: "Kredit Korporasi", value: 32000000000000, color: "#3b82f6" },
      { name: "Treasury", value: 18000000000000, color: "#f59e0b" },
      { name: "Fee Based Income", value: 12000000000000, color: "#8b5cf6" },
      { name: "Lainnya", value: 5000000000000, color: "#6b7280" },
    ],
    quarterly: [
      { quarter: "Q1 2023", revenue: 24000000000000, profit: 11000000000000 },
      { quarter: "Q2 2023", revenue: 26000000000000, profit: 12000000000000 },
      { quarter: "Q3 2023", revenue: 28000000000000, profit: 13000000000000 },
      { quarter: "Q4 2023", revenue: 30000000000000, profit: 14000000000000 },
    ],
  },
  TLKM: {
    segments: [
      { name: "Seluler", value: 85000000000000, color: "#10b981" },
      { name: "Data & Internet", value: 35000000000000, color: "#3b82f6" },
      { name: "Enterprise", value: 25000000000000, color: "#f59e0b" },
      { name: "Consumer Digital", value: 15000000000000, color: "#8b5cf6" },
      { name: "Wholesale", value: 8000000000000, color: "#6b7280" },
    ],
    quarterly: [
      { quarter: "Q1 2023", revenue: 38000000000000, profit: 8000000000000 },
      { quarter: "Q2 2023", revenue: 40000000000000, profit: 8500000000000 },
      { quarter: "Q3 2023", revenue: 42000000000000, profit: 9000000000000 },
      { quarter: "Q4 2023", revenue: 45000000000000, profit: 10000000000000 },
    ],
  },
  BBRI: {
    segments: [
      { name: "Kredit Mikro", value: 55000000000000, color: "#10b981" },
      { name: "Kredit Ritel", value: 38000000000000, color: "#3b82f6" },
      { name: "Kredit Korporasi", value: 28000000000000, color: "#f59e0b" },
      { name: "Treasury", value: 15000000000000, color: "#8b5cf6" },
      { name: "Fee Based", value: 10000000000000, color: "#6b7280" },
    ],
    quarterly: [
      { quarter: "Q1 2023", revenue: 34000000000000, profit: 15000000000000 },
      { quarter: "Q2 2023", revenue: 36000000000000, profit: 16000000000000 },
      { quarter: "Q3 2023", revenue: 38000000000000, profit: 17000000000000 },
      { quarter: "Q4 2023", revenue: 40000000000000, profit: 18000000000000 },
    ],
  },
};

const defaultRevenueData = {
  segments: [
    { name: "Segmen A", value: 40000000000000, color: "#10b981" },
    { name: "Segmen B", value: 30000000000000, color: "#3b82f6" },
    { name: "Segmen C", value: 20000000000000, color: "#f59e0b" },
    { name: "Lainnya", value: 10000000000000, color: "#6b7280" },
  ],
  quarterly: [
    { quarter: "Q1 2023", revenue: 20000000000000, profit: 5000000000000 },
    { quarter: "Q2 2023", revenue: 22000000000000, profit: 5500000000000 },
    { quarter: "Q3 2023", revenue: 24000000000000, profit: 6000000000000 },
    { quarter: "Q4 2023", revenue: 26000000000000, profit: 6500000000000 },
  ],
};

export function RevenueSegments({ ticker }: { ticker: string }) {
  const data = revenueData[ticker] || defaultRevenueData;

  const totalRevenue = useMemo(
    () => data.segments.reduce((sum, seg) => sum + seg.value, 0),
    [data.segments]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Revenue by Segment - Pie Chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Revenue by Segment</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.segments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                animationDuration={500}
              >
                {data.segments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    const percentage = ((item.value / totalRevenue) * 100).toFixed(1);
                    return (
                      <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-lg font-bold text-foreground font-mono">
                          Rp {formatNumber(item.value)}
                        </p>
                        <p className="text-xs text-muted-foreground">{percentage}% of total</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Segment Details */}
        <div className="mt-4 space-y-2">
          {data.segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-foreground">{segment.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-foreground font-mono">
                  Rp {formatNumber(segment.value)}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({((segment.value / totalRevenue) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quarterly Performance - Bar Chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quarterly Performance</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.quarterly}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="quarter"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000000000000).toFixed(0)}T`}
                tickMargin={10}
                width={50}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
                        <p className="text-xs text-muted-foreground mb-2">{label}</p>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Revenue: </span>
                            <span className="font-semibold text-foreground font-mono">
                              Rp {formatNumber(payload[0].value as number)}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Profit: </span>
                            <span className="font-semibold text-success font-mono">
                              Rp {formatNumber(payload[1].value as number)}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
              <Bar
                dataKey="profit"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                name="Profit"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#3b82f6]" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success" />
            <span className="text-sm text-muted-foreground">Profit</span>
          </div>
        </div>

        {/* Quarterly Summary */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Revenue (2023)</p>
              <p className="text-xl font-bold text-foreground font-mono">
                Rp {formatNumber(data.quarterly.reduce((sum, q) => sum + q.revenue, 0))}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Profit (2023)</p>
              <p className="text-xl font-bold text-success font-mono">
                Rp {formatNumber(data.quarterly.reduce((sum, q) => sum + q.profit, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
