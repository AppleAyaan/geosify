import { parcels } from "@/lib/data/parcels";
import { getParcelAnalysis } from "@/lib/data/insights";
import { formatCurrency, formatScore } from "@/lib/utils/format";
import type {
  ParcelAnalysis,
  ParcelFeature,
  ParcelFeatureCollection,
  ParcelId,
} from "@/lib/types/parcel";

function withMapLabels(
  collection: ParcelFeatureCollection,
): ParcelFeatureCollection {
  return {
    type: "FeatureCollection",
    features: collection.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        priceLabel: formatCurrency(feature.properties.price),
        scoreLabel: `${formatScore(feature.properties.investmentScore)} / 100`,
      },
    })),
  };
}

export interface ParcelRepository {
  getAll(): ParcelFeatureCollection;
  /** Parcels drawn on the map — vacant lots in open/industrial areas only. */
  getMapParcels(): ParcelFeatureCollection;
  getById(id: ParcelId): ParcelFeature | null;
  getAnalysis(id: ParcelId): ParcelAnalysis;
}

export const mockParcelRepository: ParcelRepository = {
  getAll() {
    return parcels;
  },
  getMapParcels() {
    return withMapLabels({
      type: "FeatureCollection",
      features: parcels.features.filter(
        (f) => f.properties.vacancyStatus === "vacant",
      ),
    });
  },
  getById(id) {
    return parcels.features.find((f) => f.properties.id === id) ?? null;
  },
  getAnalysis(id) {
    return getParcelAnalysis(id);
  },
};

export const parcelRepository = mockParcelRepository;
