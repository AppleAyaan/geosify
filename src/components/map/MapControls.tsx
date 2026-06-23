"use client";

import { Layers, LocateFixed, Minus, Plus } from "lucide-react";
import { WATERLOO_CENTER, DEFAULT_ZOOM } from "@/lib/map/config";
import { useAppStore } from "@/store/app-store";

function GlassIconButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="glass-card flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-white/50 hover:text-foreground"
    >
      {children}
    </button>
  );
}

export function MapControls() {
  const mapStyle = useAppStore((s) => s.mapStyle);
  const setMapStyle = useAppStore((s) => s.setMapStyle);

  return (
    <div className="flex flex-col gap-1.5">
      <GlassIconButton
        label="Toggle map style"
        onClick={() => setMapStyle(mapStyle === "light" ? "satellite" : "light")}
      >
        <Layers className="h-3.5 w-3.5" />
      </GlassIconButton>
      <GlassIconButton
        label="Reset location"
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("geosify:reset-map", {
              detail: { center: WATERLOO_CENTER, zoom: DEFAULT_ZOOM },
            }),
          )
        }
      >
        <LocateFixed className="h-3.5 w-3.5" />
      </GlassIconButton>
      <div className="glass-card flex flex-col overflow-hidden rounded-lg">
        <button
          className="flex h-8 w-8 items-center justify-center text-muted hover:bg-white/40 hover:text-foreground"
          aria-label="Zoom in"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("geosify:zoom", { detail: 1 }))
          }
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <div className="h-px bg-white/40" />
        <button
          className="flex h-8 w-8 items-center justify-center text-muted hover:bg-white/40 hover:text-foreground"
          aria-label="Zoom out"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("geosify:zoom", { detail: -1 }))
          }
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
