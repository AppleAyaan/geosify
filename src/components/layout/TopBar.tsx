"use client";

import { Logo } from "@/components/layout/Logo";
import { SearchBar, FilterTrigger } from "@/components/search/SearchBar";
import { FilterPanel, ActiveFilterChips } from "@/components/filters/FilterPanel";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function TopBar() {
  return (
    <div className="pointer-events-none absolute left-3 right-3 top-3 z-20 space-y-1.5 md:left-4 md:right-4 md:top-4">
      <GlassPanel className="pointer-events-auto flex flex-col gap-2 p-2 md:flex-row md:items-center md:p-2.5">
        <Logo href="/" className="shrink-0" size={36} />
        <div className="relative flex flex-1 items-center gap-1.5">
          <SearchBar className="flex-1" />
          <FilterTrigger />
        </div>
      </GlassPanel>
      <FilterPanel />
      <div className="pointer-events-auto px-0.5">
        <ActiveFilterChips />
      </div>
    </div>
  );
}
