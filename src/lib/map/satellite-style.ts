import type { StyleSpecification } from "maplibre-gl";

export const SATELLITE_STYLE: StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution:
        "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community",
    },
  },
  layers: [
    {
      id: "satellite",
      type: "raster",
      source: "satellite",
    },
  ],
};
