import { StockSearch } from "@/components/stock-search";

export default function StocksPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Stock Details</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Cari dan analisis detail saham
          </p>
        </div>
      </header>
      <div className="p-6">
        <StockSearch />
      </div>
    </div>
  );
}
