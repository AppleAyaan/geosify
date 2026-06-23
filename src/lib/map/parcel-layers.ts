import type { ExpressionSpecification, GeoJSONSource, Map, SymbolLayerSpecification } from "maplibre-gl";
import type { MapStyleKey } from "@/lib/map/config";
import {
  PARCEL_SOURCE_ID,
  PARCEL_FILL_LAYER,
  PARCEL_LINE_LAYER,
  PARCEL_HIGHLIGHT_FILL,
  PARCEL_HIGHLIGHT_LINE,
  PARCEL_LABEL_PRICE_LAYER,
  PARCEL_LABEL_SCORE_LAYER,
} from "@/lib/map/config";
import type { ParcelFeatureCollection } from "@/lib/types/parcel";

export interface ParcelPaintConfig {
  fillColor: string;
  fillOpacity: number;
  fillOpacityHover: number;
  fillOpacitySelected: number;
  fillOpacityDimmed: number;
  lineColor: string;
  lineWidth: number;
  lineOpacity: number;
  highlightFillOpacity: number;
  highlightLineWidth: number;
}

export const PARCEL_PAINT: Record<MapStyleKey, ParcelPaintConfig> = {
  light: {
    fillColor: "#16A34A",
    fillOpacity: 0.18,
    fillOpacityHover: 0.3,
    fillOpacitySelected: 0.38,
    fillOpacityDimmed: 0.05,
    lineColor: "#16A34A",
    lineWidth: 1.5,
    lineOpacity: 0.6,
    highlightFillOpacity: 0.38,
    highlightLineWidth: 3,
  },
  satellite: {
    fillColor: "#15803D",
    fillOpacity: 0.62,
    fillOpacityHover: 0.76,
    fillOpacitySelected: 0.85,
    fillOpacityDimmed: 0.14,
    lineColor: "#4ADE80",
    lineWidth: 2.75,
    lineOpacity: 1,
    highlightFillOpacity: 0.85,
    highlightLineWidth: 3.5,
  },
};

export function getParcelPaint(style: MapStyleKey): ParcelPaintConfig {
  return PARCEL_PAINT[style];
}

const LABEL_STYLE: Record<
  MapStyleKey,
  { priceColor: string; scoreColor: string; haloColor: string; haloWidth: number }
> = {
  light: {
    priceColor: "#111827",
    scoreColor: "#4b5563",
    haloColor: "#ffffff",
    haloWidth: 2,
  },
  satellite: {
    priceColor: "#ffffff",
    scoreColor: "#ecfdf5",
    haloColor: "#052e16",
    haloWidth: 2.25,
  },
};

const LABEL_FONTS = {
  price: ["Open Sans Bold", "Arial Unicode MS Bold"],
  body: ["Open Sans Regular", "Arial Unicode MS Regular"],
} as const;

function addParcelLabelLayers(map: Map, style: MapStyleKey) {
  const labels = LABEL_STYLE[style];
  const sharedLayout: SymbolLayerSpecification["layout"] = {
    "text-font": [...LABEL_FONTS.body],
    "text-anchor": "center",
    "text-allow-overlap": true,
    "text-ignore-placement": true,
    "symbol-placement": "point",
  };

  if (!map.getLayer(PARCEL_LABEL_PRICE_LAYER)) {
    map.addLayer({
      id: PARCEL_LABEL_PRICE_LAYER,
      type: "symbol",
      source: PARCEL_SOURCE_ID,
      minzoom: 11.5,
      layout: {
        ...sharedLayout,
        "text-field": ["get", "priceLabel"],
        "text-font": [...LABEL_FONTS.price],
        "text-size": ["interpolate", ["linear"], ["zoom"], 12, 14, 14, 16, 16, 18],
        "text-offset": [0, -1],
      },
      paint: {
        "text-color": labels.priceColor,
        "text-halo-color": labels.haloColor,
        "text-halo-width": labels.haloWidth + 0.25,
      },
    });
  }

  if (!map.getLayer(PARCEL_LABEL_SCORE_LAYER)) {
    map.addLayer({
      id: PARCEL_LABEL_SCORE_LAYER,
      type: "symbol",
      source: PARCEL_SOURCE_ID,
      minzoom: 11.5,
      layout: {
        ...sharedLayout,
        "text-field": ["get", "scoreLabel"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 12, 9.5, 14, 10.5, 16, 11.5],
        "text-offset": [0, 0.55],
      },
      paint: {
        "text-color": labels.scoreColor,
        "text-halo-color": labels.haloColor,
        "text-halo-width": labels.haloWidth,
      },
    });
  }
}

export function applyParcelLabelColors(map: Map, style: MapStyleKey) {
  const labels = LABEL_STYLE[style];
  if (!map.getLayer(PARCEL_LABEL_PRICE_LAYER)) return;

  map.setPaintProperty(PARCEL_LABEL_PRICE_LAYER, "text-color", labels.priceColor);
  map.setPaintProperty(PARCEL_LABEL_PRICE_LAYER, "text-halo-color", labels.haloColor);
  map.setPaintProperty(PARCEL_LABEL_PRICE_LAYER, "text-halo-width", labels.haloWidth);
  map.setPaintProperty(PARCEL_LABEL_SCORE_LAYER, "text-color", labels.scoreColor);
  map.setPaintProperty(PARCEL_LABEL_SCORE_LAYER, "text-halo-color", labels.haloColor);
  map.setPaintProperty(PARCEL_LABEL_SCORE_LAYER, "text-halo-width", labels.haloWidth);
}

export const PARCEL_INTERACTIVE_LAYERS = [
  PARCEL_FILL_LAYER,
  PARCEL_LABEL_PRICE_LAYER,
  PARCEL_LABEL_SCORE_LAYER,
] as const;

export function addParcelLayers(
  map: Map,
  data: ParcelFeatureCollection,
  style: MapStyleKey,
  selectedId = "",
) {
  const paint = getParcelPaint(style);

  if (!map.getSource(PARCEL_SOURCE_ID)) {
    map.addSource(PARCEL_SOURCE_ID, {
      type: "geojson",
      data,
      generateId: true,
    });
  } else {
    const source = map.getSource(PARCEL_SOURCE_ID) as GeoJSONSource;
    source.setData(data);
  }

  if (!map.getLayer(PARCEL_FILL_LAYER)) {
    map.addLayer({
      id: PARCEL_FILL_LAYER,
      type: "fill",
      source: PARCEL_SOURCE_ID,
      paint: {
        "fill-color": paint.fillColor,
        "fill-opacity": paint.fillOpacity,
      },
    });
  }

  if (!map.getLayer(PARCEL_LINE_LAYER)) {
    map.addLayer({
      id: PARCEL_LINE_LAYER,
      type: "line",
      source: PARCEL_SOURCE_ID,
      paint: {
        "line-color": paint.lineColor,
        "line-width": paint.lineWidth,
        "line-opacity": paint.lineOpacity,
      },
    });
  }

  if (!map.getLayer(PARCEL_HIGHLIGHT_FILL)) {
    map.addLayer({
      id: PARCEL_HIGHLIGHT_FILL,
      type: "fill",
      source: PARCEL_SOURCE_ID,
      paint: {
        "fill-color": paint.fillColor,
        "fill-opacity": paint.highlightFillOpacity,
      },
      filter: ["==", ["get", "id"], selectedId],
    });
  }

  if (!map.getLayer(PARCEL_HIGHLIGHT_LINE)) {
    map.addLayer({
      id: PARCEL_HIGHLIGHT_LINE,
      type: "line",
      source: PARCEL_SOURCE_ID,
      paint: {
        "line-color": paint.lineColor,
        "line-width": paint.highlightLineWidth,
      },
      filter: ["==", ["get", "id"], selectedId],
    });
  }

  applyParcelPaintColors(map, style);
  addParcelLabelLayers(map, style);
  applyParcelLabelColors(map, style);
}

export function applyParcelPaintColors(map: Map, style: MapStyleKey) {
  const paint = getParcelPaint(style);

  if (map.getLayer(PARCEL_FILL_LAYER)) {
    map.setPaintProperty(PARCEL_FILL_LAYER, "fill-color", paint.fillColor);
    map.setPaintProperty(PARCEL_LINE_LAYER, "line-color", paint.lineColor);
    map.setPaintProperty(PARCEL_LINE_LAYER, "line-width", paint.lineWidth);
    map.setPaintProperty(PARCEL_LINE_LAYER, "line-opacity", paint.lineOpacity);
    map.setPaintProperty(
      PARCEL_HIGHLIGHT_FILL,
      "fill-color",
      paint.fillColor,
    );
    map.setPaintProperty(
      PARCEL_HIGHLIGHT_FILL,
      "fill-opacity",
      paint.highlightFillOpacity,
    );
    map.setPaintProperty(PARCEL_HIGHLIGHT_LINE, "line-color", paint.lineColor);
    map.setPaintProperty(
      PARCEL_HIGHLIGHT_LINE,
      "line-width",
      paint.highlightLineWidth,
    );
    applyParcelLabelColors(map, style);
  }
}

export function buildDefaultFillOpacity(
  style: MapStyleKey,
  selectedId: string,
  hoveredId?: string | null,
) {
  const paint = getParcelPaint(style);

  if (hoveredId && hoveredId !== selectedId) {
    return [
      "case",
      ["==", ["get", "id"], hoveredId],
      paint.fillOpacityHover,
      ["==", ["get", "id"], selectedId],
      paint.fillOpacitySelected,
      paint.fillOpacity,
    ] as ExpressionSpecification;
  }

  return [
    "case",
    ["==", ["get", "id"], selectedId],
    paint.fillOpacitySelected,
    paint.fillOpacity,
  ] as ExpressionSpecification;
}

export function buildFilteredFillOpacity(
  style: MapStyleKey,
  matchingIds: string[],
  selectedId: string,
) {
  const paint = getParcelPaint(style);

  return [
    "case",
    ["in", ["get", "id"], ["literal", matchingIds]],
    ["==", ["get", "id"], selectedId],
    paint.fillOpacitySelected,
    paint.fillOpacity,
    paint.fillOpacityDimmed,
  ] as ExpressionSpecification;
}
