import { StockDetailView } from "@/components/stock-detail-view";

type Props = {
  params: Promise<{ ticker: string }>;
};

export default async function StockDetailPage({ params }: Props) {
  const { ticker } = await params;

  return (
    <div className="min-h-screen">
      <StockDetailView ticker={ticker.toUpperCase()} />
    </div>
  );
}
