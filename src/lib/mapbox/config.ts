export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export const WATERLOO_CENTER: [number, number] = [-80.5204, 43.4643];

export const DEFAULT_ZOOM = 13;
export const SELECTED_ZOOM = 16;

export const MAP_STYLES = {
  light: "mapbox://styles/mapbox/light-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
} as const;

export type MapStyleKey = keyof typeof MAP_STYLES;

export const PARCEL_SOURCE_ID = "parcels";
export const PARCEL_FILL_LAYER = "parcels-fill";
export const PARCEL_LINE_LAYER = "parcels-line";
export const PARCEL_HIGHLIGHT_FILL = "parcels-highlight-fill";
export const PARCEL_HIGHLIGHT_LINE = "parcels-highlight-line";
export const PARCEL_LABEL_PRICE_LAYER = "parcels-label-price";
export const PARCEL_LABEL_SCORE_LAYER = "parcels-label-score";
