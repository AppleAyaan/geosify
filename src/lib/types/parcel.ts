export type ParcelId = string;

export interface ParcelProperties {
  id: ParcelId;
  apn: string;
  address: string;
  city: string;
  province: string;
  acreage: number;
  price: number;
  pricePerAcre: number;
  zoning: string;
  zoningLabel: string;
  vacancyStatus: "vacant" | "improved" | "unknown";
  investmentScore: number;
  scoreBreakdown: {
    location: number;
    zoning: number;
    price: number;
    developmentPotential: number;
  };
  /** Map label fields — populated for map-visible parcels */
  priceLabel?: string;
  scoreLabel?: string;
}

export interface ParcelFeature
  extends GeoJSON.Feature<GeoJSON.Polygon, ParcelProperties> {}

export interface ParcelFeatureCollection
  extends GeoJSON.FeatureCollection<GeoJSON.Polygon, ParcelProperties> {}

export interface AIInsight {
  id: string;
  title: string;
  summary: string;
  confidence: "high" | "medium" | "low";
  category: "market" | "zoning" | "infrastructure" | "demographics";
}

export interface Risk {
  id: string;
  label: string;
  severity: "low" | "medium" | "high";
  description: string;
}

export interface Opportunity {
  id: string;
  label: string;
  impact: "low" | "medium" | "high";
  description: string;
}

export interface ParcelAnalysis {
  parcelId: ParcelId;
  insights: AIInsight[];
  risks: Risk[];
  opportunities: Opportunity[];
  generatedAt: string;
}
