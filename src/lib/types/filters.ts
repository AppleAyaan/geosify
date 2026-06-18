export interface ParcelFilters {
  priceMin: number | null;
  priceMax: number | null;
  acreageMin: number | null;
  acreageMax: number | null;
  zoning: string[];
  scoreMin: number | null;
  vacancyOnly: boolean;
}

export const defaultFilters: ParcelFilters = {
  priceMin: null,
  priceMax: null,
  acreageMin: null,
  acreageMax: null,
  zoning: [],
  scoreMin: null,
  vacancyOnly: false,
};
