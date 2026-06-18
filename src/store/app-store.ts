import { create } from "zustand";
import { defaultFilters, type ParcelFilters } from "@/lib/types/filters";
import type { ParcelId } from "@/lib/types/parcel";
import type { MapStyleKey } from "@/lib/mapbox/config";

interface AppState {
  selectedParcelId: ParcelId | null;
  hoveredParcelId: ParcelId | null;
  isPanelOpen: boolean;
  isFilterOpen: boolean;
  searchQuery: string;
  filters: ParcelFilters;
  mapStyle: MapStyleKey;
  setSelectedParcelId: (id: ParcelId | null) => void;
  setHoveredParcelId: (id: ParcelId | null) => void;
  setPanelOpen: (open: boolean) => void;
  setFilterOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: ParcelFilters) => void;
  updateFilters: (partial: Partial<ParcelFilters>) => void;
  resetFilters: () => void;
  setMapStyle: (style: MapStyleKey) => void;
  clearSelection: () => void;
  selectParcel: (id: ParcelId) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedParcelId: null,
  hoveredParcelId: null,
  isPanelOpen: false,
  isFilterOpen: false,
  searchQuery: "",
  filters: defaultFilters,
  mapStyle: "satellite",
  setSelectedParcelId: (id) => set({ selectedParcelId: id }),
  setHoveredParcelId: (id) => set({ hoveredParcelId: id }),
  setPanelOpen: (open) => set({ isPanelOpen: open }),
  setFilterOpen: (open) => set({ isFilterOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set({ filters }),
  updateFilters: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),
  resetFilters: () => set({ filters: defaultFilters }),
  setMapStyle: (style) => set({ mapStyle: style }),
  clearSelection: () =>
    set({ selectedParcelId: null, isPanelOpen: false }),
  selectParcel: (id) =>
    set({ selectedParcelId: id, isPanelOpen: true }),
}));
