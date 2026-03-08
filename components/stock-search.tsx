"use client";

import { useState, useMemo } from "react";
import { Search, TrendingUp, Building2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock stock data
const allStocks = [
  { ticker: "BBCA", name: "Bank Central Asia Tbk", sector: "Keuangan", price: 9825, change: 1.25 },
  { ticker: "TLKM", name: "Telkom Indonesia Tbk", sector: "Telekomunikasi", price: 3850, change: -0.78 },
  { ticker: "ASII", name: "Astra International Tbk", sector: "Industri", price: 5425, change: 0.56 },
  { ticker: "BMRI", name: "Bank Mandiri Tbk", sector: "Keuangan", price: 6150, change: 2.15 },
  { ticker: "UNVR", name: "Unilever Indonesia Tbk", sector: "Konsumsi", price: 3180, change: -1.23 },
  { ticker: "GOTO", name: "GoTo Gojek Tokopedia Tbk", sector: "Teknologi", price: 76, change: 5.56 },
  { ticker: "BBRI", name: "Bank Rakyat Indonesia Tbk", sector: "Keuangan", price: 5575, change: 1.89 },
  { ticker: "ICBP", name: "Indofood CBP Sukses Makmur Tbk", sector: "Konsumsi", price: 10325, change: 0.34 },
  { ticker: "ANTM", name: "Aneka Tambang Tbk", sector: "Pertambangan", price: 1785, change: 3.45 },
  { ticker: "PTBA", name: "Bukit Asam Tbk", sector: "Pertambangan", price: 2850, change: -2.10 },
  { ticker: "EMTK", name: "Elang Mahkota Teknologi Tbk", sector: "Media", price: 485, change: 1.04 },
  { ticker: "SIDO", name: "Industri Jamu dan Farmasi Sido Muncul Tbk", sector: "Kesehatan", price: 740, change: 0.82 },
];

export function StockSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(allStocks.map((s) => s.sector))];
    return uniqueSectors;
  }, []);

  const filteredStocks = useMemo(() => {
    return allStocks.filter((stock) => {
      const matchesSearch =
        searchQuery === "" ||
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = selectedSector === null || stock.sector === selectedSector;
      return matchesSearch && matchesSector;
    });
  }, [searchQuery, selectedSector]);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari ticker atau nama perusahaan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg"
        />
      </div>

      {/* Sector Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedSector(null)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all",
            selectedSector === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          Semua
        </button>
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              selectedSector === sector
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStocks.map((stock) => (
          <Link
            key={stock.ticker}
            href={`/stocks/${stock.ticker}`}
            className="group p-5 bg-card border border-border rounded-2xl hover:border-primary/50 hover:bg-card/80 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-xl font-bold text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {stock.ticker.slice(0, 2)}
              </div>
              <span
                className={cn(
                  "flex items-center gap-1 text-sm font-semibold",
                  stock.change >= 0 ? "text-success" : "text-destructive"
                )}
              >
                <TrendingUp
                  className={cn(
                    "h-4 w-4",
                    stock.change < 0 && "rotate-180"
                  )}
                />
                {stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(2)}%
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                {stock.ticker}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {stock.name}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-lg font-bold text-foreground font-mono">
                Rp {stock.price.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3" />
                {stock.sector}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredStocks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Tidak ada hasil
          </h3>
          <p className="text-sm text-muted-foreground">
            Coba ubah kata kunci pencarian atau filter sektor
          </p>
        </div>
      )}
    </div>
  );
}
