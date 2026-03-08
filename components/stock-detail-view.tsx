"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, formatNumber, formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  Globe,
  Calendar,
  DollarSign,
  BarChart3,
  Briefcase,
  MapPin,
} from "lucide-react";
import { PriceChart } from "@/components/price-chart";
import { RevenueSegments } from "@/components/revenue-segments";

// Mock stock data
const stockData: Record<string, {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  volume: number;
  avgVolume: number;
  marketCap: number;
  pe: number;
  eps: number;
  dividend: number;
  dividendYield: number;
  sector: string;
  industry: string;
  employees: number;
  founded: string;
  headquarters: string;
  website: string;
  description: string;
}> = {
  BBCA: {
    ticker: "BBCA",
    name: "Bank Central Asia Tbk",
    price: 9825,
    change: 125,
    changePercent: 1.29,
    high: 9900,
    low: 9700,
    open: 9725,
    previousClose: 9700,
    volume: 15234567,
    avgVolume: 12500000,
    marketCap: 1210000000000000,
    pe: 26.5,
    eps: 370.57,
    dividend: 180,
    dividendYield: 1.83,
    sector: "Keuangan",
    industry: "Perbankan",
    employees: 24500,
    founded: "1957",
    headquarters: "Jakarta, Indonesia",
    website: "www.bca.co.id",
    description: "Bank Central Asia (BCA) adalah bank swasta terbesar di Indonesia berdasarkan kapitalisasi pasar. Didirikan pada tahun 1957, BCA menyediakan layanan perbankan komprehensif termasuk simpanan, pinjaman, kartu kredit, dan layanan perbankan digital melalui platform BCA mobile dan internet banking.",
  },
  TLKM: {
    ticker: "TLKM",
    name: "Telkom Indonesia Tbk",
    price: 3850,
    change: -30,
    changePercent: -0.77,
    high: 3900,
    low: 3825,
    open: 3880,
    previousClose: 3880,
    volume: 45678912,
    avgVolume: 40000000,
    marketCap: 380000000000000,
    pe: 14.2,
    eps: 271.13,
    dividend: 195,
    dividendYield: 5.06,
    sector: "Telekomunikasi",
    industry: "Telekomunikasi Terintegrasi",
    employees: 22000,
    founded: "1965",
    headquarters: "Bandung, Indonesia",
    website: "www.telkom.co.id",
    description: "Telkom Indonesia adalah perusahaan telekomunikasi terbesar di Indonesia yang menyediakan layanan seluler, internet, data center, dan layanan digital. Melalui anak perusahaannya Telkomsel, perusahaan ini melayani lebih dari 170 juta pelanggan seluler di seluruh Indonesia.",
  },
  BBRI: {
    ticker: "BBRI",
    name: "Bank Rakyat Indonesia Tbk",
    price: 5575,
    change: 100,
    changePercent: 1.83,
    high: 5625,
    low: 5475,
    open: 5500,
    previousClose: 5475,
    volume: 89123456,
    avgVolume: 75000000,
    marketCap: 845000000000000,
    pe: 12.8,
    eps: 435.55,
    dividend: 240,
    dividendYield: 4.3,
    sector: "Keuangan",
    industry: "Perbankan",
    employees: 45000,
    founded: "1895",
    headquarters: "Jakarta, Indonesia",
    website: "www.bri.co.id",
    description: "Bank Rakyat Indonesia (BRI) adalah bank BUMN terbesar di Indonesia dengan fokus pada sektor UMKM dan mikro. BRI memiliki jaringan cabang terluas di Indonesia dengan lebih dari 10.000 unit kerja yang tersebar di seluruh pelosok negeri.",
  },
};

// Default data for unknown tickers
const defaultStock = {
  ticker: "XXXX",
  name: "Perusahaan Tidak Ditemukan",
  price: 0,
  change: 0,
  changePercent: 0,
  high: 0,
  low: 0,
  open: 0,
  previousClose: 0,
  volume: 0,
  avgVolume: 0,
  marketCap: 0,
  pe: 0,
  eps: 0,
  dividend: 0,
  dividendYield: 0,
  sector: "-",
  industry: "-",
  employees: 0,
  founded: "-",
  headquarters: "-",
  website: "-",
  description: "Data tidak tersedia untuk ticker ini.",
};

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

export function StockDetailView({ ticker }: { ticker: string }) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  const stock = stockData[ticker] || { ...defaultStock, ticker };

  const isPositive = stock.change >= 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/stocks"
              className="flex items-center justify-center w-10 h-10 bg-secondary rounded-xl hover:bg-accent transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                <span className="font-bold text-primary">{ticker.slice(0, 2)}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{ticker}</h1>
                <p className="text-sm text-muted-foreground">{stock.name}</p>
              </div>
            </div>
          </div>

          {/* Price Info */}
          <div className="flex flex-wrap items-baseline gap-4">
            <span className="text-4xl font-bold text-foreground font-mono">
              {formatCurrency(stock.price)}
            </span>
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg",
                isPositive ? "bg-success/10" : "bg-destructive/10"
              )}
            >
              {isPositive ? (
                <TrendingUp className={cn("h-4 w-4", isPositive ? "text-success" : "text-destructive")} />
              ) : (
                <TrendingDown className={cn("h-4 w-4", isPositive ? "text-success" : "text-destructive")} />
              )}
              <span className={cn("font-semibold", isPositive ? "text-success" : "text-destructive")}>
                {isPositive ? "+" : ""}{formatCurrency(stock.change)} ({isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Price Chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-foreground">Price History</h2>
            <div className="flex gap-2">
              {(["1D", "1W", "1M", "3M", "1Y", "ALL"] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    timeRange === range
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <PriceChart ticker={ticker} timeRange={timeRange} isPositive={isPositive} />
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<DollarSign className="h-5 w-5" />}
            label="Market Cap"
            value={formatNumber(stock.marketCap)}
          />
          <StatCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="Volume"
            value={formatNumber(stock.volume)}
            subValue={`Avg: ${formatNumber(stock.avgVolume)}`}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="P/E Ratio"
            value={stock.pe.toFixed(2)}
            subValue={`EPS: ${formatCurrency(stock.eps)}`}
          />
          <StatCard
            icon={<Calendar className="h-5 w-5" />}
            label="Dividend"
            value={formatCurrency(stock.dividend)}
            subValue={`Yield: ${stock.dividendYield.toFixed(2)}%`}
          />
        </div>

        {/* Price Range */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Trading Range Hari Ini</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Low: {formatCurrency(stock.low)}</span>
              <span className="text-muted-foreground">High: {formatCurrency(stock.high)}</span>
            </div>
            <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-gradient-to-r from-destructive via-warning to-success rounded-full"
                style={{ width: "100%" }}
              />
              <div
                className="absolute w-3 h-3 bg-foreground rounded-full -top-0.5 shadow-lg"
                style={{
                  left: `${((stock.price - stock.low) / (stock.high - stock.low)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <p className="text-xs text-muted-foreground">Open</p>
                <p className="font-semibold font-mono text-foreground">{formatCurrency(stock.open)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Previous Close</p>
                <p className="font-semibold font-mono text-foreground">{formatCurrency(stock.previousClose)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Day Low</p>
                <p className="font-semibold font-mono text-foreground">{formatCurrency(stock.low)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Day High</p>
                <p className="font-semibold font-mono text-foreground">{formatCurrency(stock.high)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Segments */}
        <RevenueSegments ticker={ticker} />

        {/* Company Info */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Informasi Perusahaan</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{stock.description}</p>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem icon={<Building2 className="h-4 w-4" />} label="Sektor" value={stock.sector} />
            <InfoItem icon={<Briefcase className="h-4 w-4" />} label="Industri" value={stock.industry} />
            <InfoItem icon={<Users className="h-4 w-4" />} label="Karyawan" value={stock.employees > 0 ? stock.employees.toLocaleString() : "-"} />
            <InfoItem icon={<Calendar className="h-4 w-4" />} label="Didirikan" value={stock.founded} />
            <InfoItem icon={<MapPin className="h-4 w-4" />} label="Kantor Pusat" value={stock.headquarters} />
            <InfoItem icon={<Globe className="h-4 w-4" />} label="Website" value={stock.website} isLink />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-xl text-muted-foreground">
          {icon}
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground font-mono">{value}</p>
      {subValue && <p className="text-sm text-muted-foreground mt-1">{subValue}</p>}
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  isLink = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-lg text-muted-foreground shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        {isLink && value !== "-" ? (
          <a
            href={`https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}
