"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { AppShell } from "@/components/layout/AppShell";
import { MapControls } from "@/components/map/MapControls";
import { useAppStore } from "@/store/app-store";

const MapCanvas = dynamic(
  () =>
    import("@/components/map/MapCanvas").then((m) => ({ default: m.MapCanvas })),
  { ssr: false, loading: () => <div className="h-full w-full bg-subtle" /> },
);

function ExploreContent() {
  const searchParams = useSearchParams();
  const selectParcel = useAppStore((s) => s.selectParcel);
  const parcelId = searchParams.get("parcel");

  useEffect(() => {
    if (parcelId) {
      selectParcel(parcelId);
      window.dispatchEvent(
        new CustomEvent("geosify:select-parcel", { detail: parcelId }),
      );
    }
  }, [parcelId, selectParcel]);

  return (
    <AppShell>
      <MapCanvas variant="full" defaultSelectedId={parcelId ?? undefined} />
      <div className="pointer-events-none absolute bottom-4 left-4 z-10">
        <div className="pointer-events-auto">
          <MapControls />
        </div>
      </div>
    </AppShell>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="h-screen bg-subtle" />}>
      <ExploreContent />
    </Suspense>
  );
}
