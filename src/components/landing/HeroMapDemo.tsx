"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HeroParcelCard } from "@/components/landing/HeroParcelCard";
import { MediaFrame } from "@/components/landing/MediaFrame";
import { HERO_PARCEL_ID } from "@/lib/data/parcels";

const MapCanvas = dynamic(
  () =>
    import("@/components/map/MapCanvas").then((m) => ({ default: m.MapCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-lg bg-black/5" />
    ),
  },
);

export function HeroMapDemo() {
  const [selectedId, setSelectedId] = useState(HERO_PARCEL_ID);
  const [mapActive, setMapActive] = useState(true);

  useEffect(() => {
    const scrollEl = document.getElementById("presentation-scroll");
    const hero = document.getElementById("hero");
    if (!scrollEl || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setMapActive(entry.isIntersecting),
      { root: scrollEl, threshold: 0.2 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <MediaFrame className="aspect-auto h-full min-h-[240px]">
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute left-3 right-3 top-3 z-10">
          <div className="glass-inset rounded-lg px-3 py-2 text-xs text-muted">
            Search Waterloo, ON...
          </div>
          <p className="mt-1.5 text-center text-[10px] text-white/80 drop-shadow-sm">
            Drag to explore · Click a parcel · Scroll to zoom
          </p>
        </div>
        {mapActive ? (
          <MapCanvas
            variant="preview"
            className="h-full cursor-grab active:cursor-grabbing"
            demoSelectedId={selectedId}
            onDemoParcelSelect={setSelectedId}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-emerald-900/20 to-stone-800/30" />
        )}
        <div className="pointer-events-none absolute bottom-3 right-3 z-10">
          <div className="pointer-events-auto">
            <HeroParcelCard parcelId={selectedId} />
          </div>
        </div>
      </div>
    </MediaFrame>
  );
}
