"use client";

import { useState } from "react";
import { cn, formatNumber, formatCurrency, formatDate } from "@/lib/utils";
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  User,
} from "lucide-react";
import Link from "next/link";

// Mock data for insider filings
const mockFilings = [
  {
    id: "1",
    ticker: "BBCA",
    companyName: "Bank Central Asia Tbk",
    insiderName: "Jahja Setiaatmadja",
    insiderTitle: "Presiden Direktur",
    transactionType: "buy",
    shares: 500000,
    pricePerShare: 9825,
    totalValue: 4912500000,
    sharesOwned: 15000000,
    filingDate: "2024-01-15",
    transactionDate: "2024-01-12",
  },
  {
    id: "2",
    ticker: "TLKM",
    companyName: "Telkom Indonesia Tbk",
    insiderName: "Ririek Adriansyah",
    insiderTitle: "Direktur Utama",
    transactionType: "sell",
    shares: 1000000,
    pricePerShare: 3850,
    totalValue: 3850000000,
    sharesOwned: 5000000,
    filingDate: "2024-01-14",
    transactionDate: "2024-01-11",
  },
  {
    id: "3",
    ticker: "ASII",
    companyName: "Astra International Tbk",
    insiderName: "Djony Bunarto Tjondro",
    insiderTitle: "Presiden Direktur",
    transactionType: "buy",
    shares: 250000,
    pricePerShare: 5425,
    totalValue: 1356250000,
    sharesOwned: 8500000,
    filingDate: "2024-01-13",
    transactionDate: "2024-01-10",
  },
  {
    id: "4",
    ticker: "BMRI",
    companyName: "Bank Mandiri Tbk",
    insiderName: "Darmawan Junaidi",
    insiderTitle: "Direktur Utama",
    transactionType: "buy",
    shares: 750000,
    pricePerShare: 6150,
    totalValue: 4612500000,
    sharesOwned: 20000000,
    filingDate: "2024-01-12",
    transactionDate: "2024-01-09",
  },
  {
    id: "5",
    ticker: "UNVR",
    companyName: "Unilever Indonesia Tbk",
    insiderName: "Benjie Yap",
    insiderTitle: "Presiden Direktur",
    transactionType: "sell",
    shares: 300000,
    pricePerShare: 3180,
    totalValue: 954000000,
    sharesOwned: 1200000,
    filingDate: "2024-01-11",
    transactionDate: "2024-01-08",
  },
  {
    id: "6",
    ticker: "GOTO",
    companyName: "GoTo Gojek Tokopedia Tbk",
    insiderName: "Patrick Walujo",
    insiderTitle: "CEO",
    transactionType: "buy",
    shares: 50000000,
    pricePerShare: 76,
    totalValue: 3800000000,
    sharesOwned: 500000000,
    filingDate: "2024-01-10",
    transactionDate: "2024-01-07",
  },
  {
    id: "7",
    ticker: "BBRI",
    companyName: "Bank Rakyat Indonesia Tbk",
    insiderName: "Sunarso",
    insiderTitle: "Direktur Utama",
    transactionType: "buy",
    shares: 1000000,
    pricePerShare: 5575,
    totalValue: 5575000000,
    sharesOwned: 25000000,
    filingDate: "2024-01-09",
    transactionDate: "2024-01-06",
  },
  {
    id: "8",
    ticker: "ICBP",
    companyName: "Indofood CBP Sukses Makmur Tbk",
    insiderName: "Anthoni Salim",
    insiderTitle: "Komisaris Utama",
    transactionType: "sell",
    shares: 400000,
    pricePerShare: 10325,
    totalValue: 4130000000,
    sharesOwned: 10000000,
    filingDate: "2024-01-08",
    transactionDate: "2024-01-05",
  },
];

type SortField = "filingDate" | "ticker" | "totalValue" | "shares";
type SortDirection = "asc" | "desc";

export function FilingsTable() {
  const [sortField, setSortField] = useState<SortField>("filingDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedFilings = [...mockFilings].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case "filingDate":
        comparison = new Date(a.filingDate).getTime() - new Date(b.filingDate).getTime();
        break;
      case "ticker":
        comparison = a.ticker.localeCompare(b.ticker);
        break;
      case "totalValue":
        comparison = a.totalValue - b.totalValue;
        break;
      case "shares":
        comparison = a.shares - b.shares;
        break;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("ticker")}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  Saham
                  <SortIcon field="ticker" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Insider
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tipe
                </span>
              </th>
              <th className="px-6 py-4 text-right">
                <button
                  onClick={() => handleSort("shares")}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors ml-auto"
                >
                  Jumlah Saham
                  <SortIcon field="shares" />
                </button>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Harga/Lembar
                </span>
              </th>
              <th className="px-6 py-4 text-right">
                <button
                  onClick={() => handleSort("totalValue")}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors ml-auto"
                >
                  Total Nilai
                  <SortIcon field="totalValue" />
                </button>
              </th>
              <th className="px-6 py-4 text-right">
                <button
                  onClick={() => handleSort("filingDate")}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors ml-auto"
                >
                  Tanggal
                  <SortIcon field="filingDate" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedFilings.map((filing) => (
              <tr
                key={filing.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/stocks/${filing.ticker}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-xl font-bold text-sm text-foreground">
                      {filing.ticker.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {filing.ticker}
                        </span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {filing.companyName}
                      </span>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-lg">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {filing.insiderName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {filing.insiderTitle}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold",
                      filing.transactionType === "buy"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    )}
                  >
                    {filing.transactionType === "buy" ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    {filing.transactionType === "buy" ? "Beli" : "Jual"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-medium text-foreground font-mono">
                    {formatNumber(filing.shares)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-muted-foreground font-mono">
                    {formatCurrency(filing.pricePerShare)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-semibold text-foreground font-mono">
                    {formatCurrency(filing.totalValue)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="text-sm text-foreground">
                    {formatDate(filing.filingDate)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Transaksi: {formatDate(filing.transactionDate)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedFilings.map((filing) => (
          <Link
            key={filing.id}
            href={`/stocks/${filing.ticker}`}
            className="block p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-xl font-bold text-sm text-foreground">
                  {filing.ticker.slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {filing.ticker}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {filing.companyName}
                  </div>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold",
                  filing.transactionType === "buy"
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                )}
              >
                {filing.transactionType === "buy" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {filing.transactionType === "buy" ? "Beli" : "Jual"}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span>
                  {filing.insiderName} - {filing.insiderTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jumlah:</span>
                <span className="font-mono font-medium text-foreground">
                  {formatNumber(filing.shares)} lembar
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Nilai:</span>
                <span className="font-mono font-semibold text-foreground">
                  {formatCurrency(filing.totalValue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal:</span>
                <span className="text-foreground">
                  {formatDate(filing.filingDate)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
