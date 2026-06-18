export function getCentroid(
  coordinates: GeoJSON.Polygon["coordinates"],
): [number, number] {
  const ring = coordinates[0];
  let sumLng = 0;
  let sumLat = 0;
  const count = ring.length - 1;

  for (let i = 0; i < count; i++) {
    sumLng += ring[i][0];
    sumLat += ring[i][1];
  }

  return [sumLng / count, sumLat / count];
}

export function makeRect(
  lng: number,
  lat: number,
  width: number,
  height: number,
): GeoJSON.Polygon {
  return {
    type: "Polygon",
    coordinates: [
      [
        [lng, lat],
        [lng + width, lat],
        [lng + width, lat + height],
        [lng, lat + height],
        [lng, lat],
      ],
    ],
  };
}

/** Closed polygon from absolute lng/lat coordinates (ring auto-closed). */
export function makePolygon(ring: [number, number][]): GeoJSON.Polygon {
  const closed =
    ring.length > 0 &&
    ring[0][0] === ring[ring.length - 1][0] &&
    ring[0][1] === ring[ring.length - 1][1]
      ? ring
      : [...ring, ring[0]];

  return {
    type: "Polygon",
    coordinates: [closed],
  };
}

/** Irregular lot outline offset from a center point (degrees). */
export function makeIrregularLot(
  centerLng: number,
  centerLat: number,
  outline: [number, number][],
): GeoJSON.Polygon {
  const ring = outline.map(
    ([dx, dy]) => [centerLng + dx, centerLat + dy] as [number, number],
  );
  return makePolygon(ring);
}

/** Scale a polygon ring around its centroid (values < 1 shrink the lot). */
export function scalePolygon(
  polygon: GeoJSON.Polygon,
  scale: number,
): GeoJSON.Polygon {
  const [centerLng, centerLat] = getCentroid(polygon.coordinates);
  const ring = polygon.coordinates[0].map(([lng, lat]) => [
    centerLng + (lng - centerLng) * scale,
    centerLat + (lat - centerLat) * scale,
  ]) as [number, number][];

  return makePolygon(ring);
}

/** Move polygon centroid to a new anchor while preserving shape. */
export function movePolygon(
  polygon: GeoJSON.Polygon,
  centerLng: number,
  centerLat: number,
): GeoJSON.Polygon {
  const [currentLng, currentLat] = getCentroid(polygon.coordinates);
  const dLng = centerLng - currentLng;
  const dLat = centerLat - currentLat;
  const ring = polygon.coordinates[0].map(([lng, lat]) => [
    lng + dLng,
    lat + dLat,
  ]) as [number, number][];

  return makePolygon(ring);
}
