"use client";

import { Search, Filter, Calendar, Send } from "lucide-react";
import { useState } from "react";

export function FilingsHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Simulate publish action
      await new Promise(resolve => setTimeout(resolve, 800));
      // You can replace this with actual API call
      console.log("[v0] Publishing filings...");
      // Show success toast/notification here
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Insider Filings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Transaksi insider saham terbaru
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari ticker atau nama..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            {/* Filter button */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground hover:bg-accent transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>

            {/* Date range */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground hover:bg-accent transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>30 Hari</span>
            </button>

            {/* Publish button */}
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary border border-primary rounded-xl text-sm font-medium text-background hover:bg-primary/90 hover:border-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Send className={`h-4 w-4 ${isPublishing ? 'animate-spin' : ''}`} />
              <span>{isPublishing ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
