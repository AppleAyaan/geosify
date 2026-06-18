import type { ParcelFilters } from "@/lib/types/filters";
import type { ParcelProperties } from "@/lib/types/parcel";

export function matchesFilters(
  parcel: ParcelProperties,
  filters: ParcelFilters,
): boolean {
  if (filters.priceMin !== null && parcel.price < filters.priceMin) return false;
  if (filters.priceMax !== null && parcel.price > filters.priceMax) return false;
  if (filters.acreageMin !== null && parcel.acreage < filters.acreageMin)
    return false;
  if (filters.acreageMax !== null && parcel.acreage > filters.acreageMax)
    return false;
  if (filters.zoning.length > 0 && !filters.zoning.includes(parcel.zoning))
    return false;
  if (filters.scoreMin !== null && parcel.investmentScore < filters.scoreMin)
    return false;
  if (filters.vacancyOnly && parcel.vacancyStatus !== "vacant") return false;
  return true;
}

export function matchesSearch(
  parcel: ParcelProperties,
  query: string,
): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    parcel.address.toLowerCase().includes(q) ||
    parcel.apn.toLowerCase().includes(q) ||
    parcel.city.toLowerCase().includes(q) ||
    parcel.zoning.toLowerCase().includes(q) ||
    parcel.zoningLabel.toLowerCase().includes(q)
  );
}
