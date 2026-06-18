"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { parcelRepository } from "@/lib/data/parcel-repository";
import { matchesSearch, matchesFilters } from "@/lib/utils/filters";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils/cn";
import { formatCurrency, formatAcreage } from "@/lib/utils/format";

export function SearchBar({ className }: { className?: string }) {
  const searchQuery = useAppStore((s) => s.searchQuery);
  const filters = useAppStore((s) => s.filters);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const selectParcel = useAppStore((s) => s.selectParcel);
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return parcelRepository
      .getMapParcels()
      .features.filter(
        (f) =>
          matchesSearch(f.properties, searchQuery) &&
          matchesFilters(f.properties, filters),
      )
      .slice(0, 6);
  }, [searchQuery, filters]);

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search address, APN, or city..."
          className="pl-9"
        />
      </div>
      {focused && results.length > 0 && (
        <div className="glass-panel absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-lg">
          {results.map((f) => (
            <button
              key={f.properties.id}
              className="flex w-full flex-col gap-0.5 px-3 py-2 text-left transition hover:bg-white/40"
              onMouseDown={() => {
                selectParcel(f.properties.id);
                setSearchQuery(f.properties.address);
                window.dispatchEvent(
                  new CustomEvent("geosify:select-parcel", {
                    detail: f.properties.id,
                  }),
                );
              }}
            >
              <span className="text-xs font-medium">{f.properties.address}</span>
              <span className="text-[11px] text-muted">
                {formatCurrency(f.properties.price)} ·{" "}
                {formatAcreage(f.properties.acreage)} · {f.properties.zoning}
              </span>
            </button>
          ))}
        </div>
      )}
      {focused && searchQuery && results.length === 0 && (
        <div className="glass-panel absolute top-full z-50 mt-1.5 w-full rounded-lg p-3 text-xs text-muted">
          No parcels match your search.
        </div>
      )}
    </div>
  );
}

export function FilterTrigger() {
  const isFilterOpen = useAppStore((s) => s.isFilterOpen);
  const setFilterOpen = useAppStore((s) => s.setFilterOpen);

  return (
    <Button
      variant="glass"
      size="sm"
      onClick={() => setFilterOpen(!isFilterOpen)}
      className="shrink-0"
    >
      <SlidersHorizontal className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Filters</span>
    </Button>
  );
}
