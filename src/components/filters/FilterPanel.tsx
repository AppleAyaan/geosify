"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ZONING_OPTIONS } from "@/lib/data/parcels";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils/cn";

export function FilterPanel() {
  const isFilterOpen = useAppStore((s) => s.isFilterOpen);
  const filters = useAppStore((s) => s.filters);
  const updateFilters = useAppStore((s) => s.updateFilters);
  const resetFilters = useAppStore((s) => s.resetFilters);
  const setFilterOpen = useAppStore((s) => s.setFilterOpen);

  if (!isFilterOpen) return null;

  const toggleZoning = (zoning: string) => {
    const next = filters.zoning.includes(zoning)
      ? filters.zoning.filter((z) => z !== zoning)
      : [...filters.zoning, zoning];
    updateFilters({ zoning: next });
  };

  return (
    <GlassPanel
      variant="solid"
      className="pointer-events-auto fixed left-3 top-[6rem] z-50 w-72 p-4 md:left-4 md:top-[6.5rem]"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filters</h3>
        <button
          onClick={() => setFilterOpen(false)}
          className="text-muted hover:text-foreground"
          aria-label="Close filters"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-[11px] font-medium text-muted">
            Min investment score
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={filters.scoreMin ?? 0}
            onChange={(e) =>
              updateFilters({
                scoreMin: Number(e.target.value) || null,
              })
            }
            className="w-full accent-accent"
          />
          <span className="text-[11px] text-muted">{filters.scoreMin ?? 0}+</span>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium text-muted">
            Zoning
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ZONING_OPTIONS.map((z) => (
              <button
                key={z}
                onClick={() => toggleZoning(z)}
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-medium transition",
                  filters.zoning.includes(z)
                    ? "bg-accent text-white"
                    : "glass-inset text-muted hover:text-foreground",
                )}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={filters.vacancyOnly}
            onChange={(e) => updateFilters({ vacancyOnly: e.target.checked })}
            className="accent-accent"
          />
          Vacant land only
        </label>

        <Button variant="ghost" size="sm" onClick={resetFilters} className="w-full">
          Reset filters
        </Button>
      </div>
    </GlassPanel>
  );
}

export function ActiveFilterChips() {
  const filters = useAppStore((s) => s.filters);
  const resetFilters = useAppStore((s) => s.resetFilters);

  const hasFilters =
    filters.scoreMin !== null ||
    filters.zoning.length > 0 ||
    filters.vacancyOnly;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {filters.scoreMin !== null && (
        <span className="glass-pill rounded-full px-2.5 py-0.5 text-[11px] font-medium text-accent">
          Score {filters.scoreMin}+
        </span>
      )}
      {filters.zoning.map((z) => (
        <span
          key={z}
          className="glass-pill rounded-full px-2.5 py-0.5 text-[11px] font-medium text-accent"
        >
          {z}
        </span>
      ))}
      {filters.vacancyOnly && (
        <span className="glass-pill rounded-full px-2.5 py-0.5 text-[11px] font-medium text-accent">
          Vacant only
        </span>
      )}
      <button
        onClick={resetFilters}
        className="text-[11px] text-muted hover:text-foreground"
      >
        Clear
      </button>
    </div>
  );
}
