import { FilingsTable } from "@/components/filings-table";
import { FilingsHeader } from "@/components/filings-header";

export default function FilingsPage() {
  return (
    <div className="min-h-screen">
      <FilingsHeader />
      <div className="p-6">
        <FilingsTable />
      </div>
    </div>
  );
}
