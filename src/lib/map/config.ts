import type { StyleSpecification } from "maplibre-gl";
import { SATELLITE_STYLE } from "@/lib/map/satellite-style";

export const WATERLOO_CENTER: [number, number] = [-80.5204, 43.4643];

export const DEFAULT_ZOOM = 13;
export const SELECTED_ZOOM = 16;

export const MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  satellite: SATELLITE_STYLE,
} as const satisfies Record<string, string | StyleSpecification>;

export type MapStyleKey = keyof typeof MAP_STYLES;

export const PARCEL_SOURCE_ID = "parcels";
export const PARCEL_FILL_LAYER = "parcels-fill";
export const PARCEL_LINE_LAYER = "parcels-line";
export const PARCEL_HIGHLIGHT_FILL = "parcels-highlight-fill";
export const PARCEL_HIGHLIGHT_LINE = "parcels-highlight-line";
export const PARCEL_LABEL_PRICE_LAYER = "parcels-label-price";
export const PARCEL_LABEL_SCORE_LAYER = "parcels-label-score";
