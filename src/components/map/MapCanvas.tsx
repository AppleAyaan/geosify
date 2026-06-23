"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useCallback, useState } from "react";
import maplibregl from "maplibre-gl";
import { matchesFilters } from "@/lib/utils/filters";
import { parcelRepository } from "@/lib/data/parcel-repository";
import {
  WATERLOO_CENTER,
  DEFAULT_ZOOM,
  SELECTED_ZOOM,
  MAP_STYLES,
  PARCEL_FILL_LAYER,
  PARCEL_HIGHLIGHT_FILL,
  PARCEL_HIGHLIGHT_LINE,
  type MapStyleKey,
} from "@/lib/map/config";
import {
  addParcelLayers,
  buildDefaultFillOpacity,
  buildFilteredFillOpacity,
  PARCEL_INTERACTIVE_LAYERS,
} from "@/lib/map/parcel-layers";
import { getCentroid } from "@/lib/utils/geo";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils/cn";

interface MapCanvasProps {
  variant?: "preview" | "full";
  className?: string;
  defaultSelectedId?: string;
  demoSelectedId?: string;
  onDemoParcelSelect?: (id: string) => void;
}

export function MapCanvas({
  variant = "full",
  className,
  defaultSelectedId,
  demoSelectedId,
  onDemoParcelSelect,
}: MapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const skipStyleSwapRef = useRef(true);
  const isPreview = variant === "preview";

  const selectedParcelId = useAppStore((s) => s.selectedParcelId);
  const hoveredParcelId = useAppStore((s) => s.hoveredParcelId);
  const mapStyle = useAppStore((s) => s.mapStyle);
  const filters = useAppStore((s) => s.filters);
  const selectParcel = useAppStore((s) => s.selectParcel);
  const setHoveredParcelId = useAppStore((s) => s.setHoveredParcelId);

  const [demoHoveredId, setDemoHoveredId] = useState<string | null>(null);

  const activeSelectedId = isPreview
    ? (demoSelectedId ?? defaultSelectedId ?? "")
    : (selectedParcelId ?? "");
  const activeHoveredId = isPreview ? demoHoveredId : hoveredParcelId;

  const flyToParcel = useCallback((id: string) => {
    const feature = parcelRepository.getById(id);
    if (!feature || !mapRef.current) return;
    const center = getCentroid(feature.geometry.coordinates);
    mapRef.current.flyTo({
      center,
      zoom: isPreview ? 14 : SELECTED_ZOOM,
      duration: 1200,
      essential: true,
    });
  }, [isPreview]);

  const applyParcelState = useCallback(
    (
      map: maplibregl.Map,
      styleKey: MapStyleKey,
      selectedId: string,
      hoveredId: string | null,
      activeFilters = useAppStore.getState().filters,
    ) => {
      if (!map.getLayer(PARCEL_FILL_LAYER)) return;

      map.setFilter(PARCEL_HIGHLIGHT_FILL, ["==", ["get", "id"], selectedId]);
      map.setFilter(PARCEL_HIGHLIGHT_LINE, ["==", ["get", "id"], selectedId]);

      const matchingIds = parcelRepository
        .getMapParcels()
        .features.filter((f) => matchesFilters(f.properties, activeFilters))
        .map((f) => f.properties.id);

      const hasActiveFilters =
        activeFilters.scoreMin !== null ||
        activeFilters.zoning.length > 0 ||
        activeFilters.vacancyOnly;

      if (!isPreview && hasActiveFilters) {
        map.setPaintProperty(
          PARCEL_FILL_LAYER,
          "fill-opacity",
          buildFilteredFillOpacity(styleKey, matchingIds, selectedId),
        );
      } else {
        map.setPaintProperty(
          PARCEL_FILL_LAYER,
          "fill-opacity",
          buildDefaultFillOpacity(styleKey, selectedId, hoveredId),
        );
      }
    },
    [isPreview],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const initialStyle = useAppStore.getState().mapStyle;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLES[initialStyle],
      center: WATERLOO_CENTER,
      zoom: isPreview ? 12.5 : DEFAULT_ZOOM,
      ...(isPreview ? { attributionControl: false as const } : {}),
      interactive: true,
      scrollZoom: false,
      boxZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      dragPan: true,
      touchZoomRotate: true,
    });

    if (isPreview && containerRef.current) {
      const container = containerRef.current;
      const enableScrollZoom = () => map.scrollZoom.enable();
      const disableScrollZoom = () => map.scrollZoom.disable();
      container.addEventListener("mouseenter", enableScrollZoom);
      container.addEventListener("mouseleave", disableScrollZoom);
      map.on("remove", () => {
        container.removeEventListener("mouseenter", enableScrollZoom);
        container.removeEventListener("mouseleave", disableScrollZoom);
      });
    }

    mapRef.current = map;

    const setupParcels = () => {
      const styleKey = useAppStore.getState().mapStyle;
      const selectedId = isPreview
        ? (demoSelectedId ?? defaultSelectedId ?? "")
        : (useAppStore.getState().selectedParcelId ?? "");

      addParcelLayers(map, parcelRepository.getMapParcels(), styleKey, selectedId);
      applyParcelState(map, styleKey, selectedId, null);
    };

    const handleParcelClick = (
      e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] },
    ) => {
      const feature = e.features?.[0];
      if (!feature?.properties?.id) return;
      const id = feature.properties.id as string;
      if (isPreview) {
        onDemoParcelSelect?.(id);
      } else {
        selectParcel(id);
      }
      flyToParcel(id);
    };

    const handleParcelEnter = (
      e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] },
    ) => {
      map.getCanvas().style.cursor = "pointer";
      const id = e.features?.[0]?.properties?.id as string | undefined;
      if (!id) return;
      if (isPreview) {
        setDemoHoveredId(id);
      } else {
        setHoveredParcelId(id);
      }
    };

    const handleParcelLeave = () => {
      map.getCanvas().style.cursor = isPreview ? "grab" : "";
      if (isPreview) {
        setDemoHoveredId(null);
      } else {
        setHoveredParcelId(null);
      }
    };

    const bindParcelEvents = () => {
      for (const layerId of PARCEL_INTERACTIVE_LAYERS) {
        map.on("click", layerId, handleParcelClick);
        map.on("mouseenter", layerId, handleParcelEnter);
        map.on("mouseleave", layerId, handleParcelLeave);
      }
    };

    map.on("load", () => {
      setupParcels();
      bindParcelEvents();

      if (defaultSelectedId) {
        flyToParcel(defaultSelectedId);
      }
    });

    if (!isPreview) {
      map.scrollZoom.enable();
    }

    const handleSelectParcel = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) flyToParcel(id);
    };

    window.addEventListener("geosify:select-parcel", handleSelectParcel);

    const handleZoom = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      map.zoomTo(map.getZoom() + detail, { duration: 300 });
    };

    const handleReset = (e: Event) => {
      const { center, zoom } = (
        e as CustomEvent<{ center: [number, number]; zoom: number }>
      ).detail;
      map.flyTo({ center, zoom, duration: 1200 });
    };

    window.addEventListener("geosify:zoom", handleZoom);
    window.addEventListener("geosify:reset-map", handleReset);

    return () => {
      window.removeEventListener("geosify:zoom", handleZoom);
      window.removeEventListener("geosify:reset-map", handleReset);
      window.removeEventListener("geosify:select-parcel", handleSelectParcel);
      map.remove();
      mapRef.current = null;
      skipStyleSwapRef.current = true;
    };
  }, [
    isPreview,
    defaultSelectedId,
    demoSelectedId,
    selectParcel,
    setHoveredParcelId,
    flyToParcel,
    onDemoParcelSelect,
    applyParcelState,
  ]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !map.getLayer(PARCEL_FILL_LAYER)) return;

    map.setFilter(PARCEL_HIGHLIGHT_FILL, ["==", ["get", "id"], activeSelectedId]);
    map.setFilter(PARCEL_HIGHLIGHT_LINE, ["==", ["get", "id"], activeSelectedId]);
  }, [activeSelectedId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !map.getLayer(PARCEL_FILL_LAYER)) return;

    applyParcelState(
      map,
      mapStyle,
      activeSelectedId,
      activeHoveredId,
      filters,
    );
  }, [activeHoveredId, activeSelectedId, mapStyle, filters, applyParcelState]);

  useEffect(() => {
    if (isPreview) return;

    const map = mapRef.current;
    if (!map) return;

    if (skipStyleSwapRef.current) {
      skipStyleSwapRef.current = false;
      return;
    }

    map.setStyle(MAP_STYLES[mapStyle]);
    map.once("style.load", () => {
      const state = useAppStore.getState();
      const selectedId = state.selectedParcelId ?? "";
      const hoveredId = state.hoveredParcelId;

      addParcelLayers(map, parcelRepository.getMapParcels(), mapStyle, selectedId);
      applyParcelState(
        map,
        mapStyle,
        selectedId,
        hoveredId,
        state.filters,
      );

      for (const layerId of PARCEL_INTERACTIVE_LAYERS) {
        map.on("click", layerId, (e) => {
          const feature = e.features?.[0];
          if (!feature?.properties?.id) return;
          const id = feature.properties.id as string;
          selectParcel(id);
          flyToParcel(id);
        });
        map.on("mouseenter", layerId, (e) => {
          map.getCanvas().style.cursor = "pointer";
          const id = e.features?.[0]?.properties?.id as string | undefined;
          if (id) setHoveredParcelId(id);
        });
        map.on("mouseleave", layerId, () => {
          map.getCanvas().style.cursor = "";
          setHoveredParcelId(null);
        });
      }
    });
  }, [isPreview, mapStyle, applyParcelState, selectParcel, setHoveredParcelId, flyToParcel]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      aria-label="Interactive land map"
    />
  );
}
