"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

// Generate mock price data
function generatePriceData(ticker: string, timeRange: TimeRange) {
  const basePrice = getBasePrice(ticker);
  const volatility = 0.02;
  const points = getDataPoints(timeRange);
  
  const data: { date: string; price: number; volume: number }[] = [];
  let currentPrice = basePrice * (0.95 + Math.random() * 0.1);
  
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const date = new Date(now);
    
    switch (timeRange) {
      case "1D":
        date.setMinutes(date.getMinutes() - i * 5);
        break;
      case "1W":
        date.setHours(date.getHours() - i * 2);
        break;
      case "1M":
        date.setDate(date.getDate() - i);
        break;
      case "3M":
        date.setDate(date.getDate() - i * 3);
        break;
      case "1Y":
        date.setDate(date.getDate() - i * 7);
        break;
      case "ALL":
        date.setMonth(date.getMonth() - i);
        break;
    }
    
    const change = (Math.random() - 0.48) * volatility * currentPrice;
    currentPrice = Math.max(currentPrice + change, basePrice * 0.5);
    
    data.push({
      date: formatDateLabel(date, timeRange),
      price: Math.round(currentPrice),
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    });
  }
  
  return data;
}

function getBasePrice(ticker: string): number {
  const prices: Record<string, number> = {
    BBCA: 9825,
    TLKM: 3850,
    ASII: 5425,
    BMRI: 6150,
    UNVR: 3180,
    GOTO: 76,
    BBRI: 5575,
    ICBP: 10325,
  };
  return prices[ticker] || 5000;
}

function getDataPoints(timeRange: TimeRange): number {
  switch (timeRange) {
    case "1D":
      return 78; // 5-min intervals for trading hours
    case "1W":
      return 56; // 2-hour intervals
    case "1M":
      return 30;
    case "3M":
      return 30;
    case "1Y":
      return 52;
    case "ALL":
      return 60;
    default:
      return 30;
  }
}

function formatDateLabel(date: Date, timeRange: TimeRange): string {
  switch (timeRange) {
    case "1D":
      return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    case "1W":
      return date.toLocaleDateString("id-ID", { weekday: "short", hour: "2-digit" });
    case "1M":
    case "3M":
      return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    case "1Y":
    case "ALL":
      return date.toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
    default:
      return date.toLocaleDateString("id-ID");
  }
}

interface PriceChartProps {
  ticker: string;
  timeRange: TimeRange;
  isPositive: boolean;
}

export function PriceChart({ ticker, timeRange, isPositive }: PriceChartProps) {
  const data = useMemo(() => generatePriceData(ticker, timeRange), [ticker, timeRange]);
  
  const minPrice = Math.min(...data.map((d) => d.price));
  const maxPrice = Math.max(...data.map((d) => d.price));
  const padding = (maxPrice - minPrice) * 0.1;

  const chartColor = isPositive ? "#10b981" : "#ef4444";

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={`gradient-${ticker}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#262626"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            tickMargin={10}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            domain={[minPrice - padding, maxPrice + padding]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
            tickMargin={10}
            width={60}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
                    <p className="text-xs text-muted-foreground mb-1">{data.date}</p>
                    <p className="text-lg font-bold text-foreground font-mono">
                      {formatCurrency(data.price)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Vol: {(data.volume / 1000000).toFixed(2)}M
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={chartColor}
            strokeWidth={2}
            fill={`url(#gradient-${ticker})`}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
