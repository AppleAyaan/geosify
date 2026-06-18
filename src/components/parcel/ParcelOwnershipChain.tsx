"use client";

import Image from "next/image";
import { ArrowDown, Building2 } from "lucide-react";
import { brandById } from "@/lib/data/brands";
import type { OwnershipChainNode } from "@/lib/data/ownership-chains";
import { cn } from "@/lib/utils/cn";

interface ParcelOwnershipChainProps {
  nodes: OwnershipChainNode[];
  address?: string;
  compact?: boolean;
  className?: string;
}

function OwnershipLogoMark({
  node,
  compact,
}: {
  node: OwnershipChainNode;
  compact?: boolean;
}) {
  const size = compact ? 28 : 34;

  if (node.logo.type === "brand") {
    const brand = brandById[node.logo.brandId];
    if (!brand) {
      return (
        <div
          className="flex shrink-0 items-center justify-center rounded-lg bg-foreground/5"
          style={{ width: size, height: size }}
        >
          <Building2 className="h-3.5 w-3.5 text-muted" />
        </div>
      );
    }

    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-lg border border-foreground/6 bg-white px-1"
        style={{ width: size + 8, height: size }}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          width={compact ? 52 : 64}
          height={compact ? 16 : 20}
          className="h-auto max-h-4 w-auto object-contain md:max-h-5"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg text-[10px] font-bold tracking-tight text-white",
        node.logo.tone === "ontario" && "bg-[#1e3a5f]",
        node.logo.tone === "waterloo" && "bg-[#0f5c38]",
      )}
      style={{ width: size, height: size }}
    >
      {node.logo.label}
    </div>
  );
}

export function ParcelOwnershipChain({
  nodes,
  address,
  compact = false,
  className,
}: ParcelOwnershipChainProps) {
  if (nodes.length === 0) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-emerald-900/10 bg-white/90",
        className,
      )}
    >
      <div
        className={cn(
          "border-b border-emerald-900/8 bg-emerald-50/80",
          compact ? "px-2.5 py-2" : "px-3.5 py-2.5",
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center justify-center rounded-lg bg-accent/15",
              compact ? "h-6 w-6" : "h-7 w-7",
            )}
          >
            <Building2
              className={cn("text-accent", compact ? "h-3 w-3" : "h-3.5 w-3.5")}
            />
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                "font-semibold text-foreground",
                compact ? "text-[10px]" : "text-[11px]",
              )}
            >
              Chain of command
            </p>
            {address && (
              <p className="truncate text-[9px] text-muted md:text-[10px]">
                {address}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={cn(compact ? "px-2.5 py-2" : "px-3.5 py-3")}>
        {nodes.map((node, i) => (
          <div key={`${node.role}-${node.name}`}>
            <div
              className={cn(
                "flex gap-2.5 rounded-xl border border-foreground/6 bg-[#f9faf8]",
                compact ? "px-2 py-1.5" : "px-3 py-2",
              )}
            >
              <OwnershipLogoMark node={node} compact={compact} />
              <div className="min-w-0 flex-1">
                <p className="text-[8px] font-medium uppercase tracking-wider text-accent md:text-[9px]">
                  {node.role}
                </p>
                <p
                  className={cn(
                    "font-medium leading-tight text-foreground",
                    compact ? "text-[10px]" : "text-[12px]",
                  )}
                >
                  {node.name}
                </p>
                <p
                  className={cn(
                    "mt-0.5 leading-snug text-muted",
                    compact ? "text-[9px]" : "text-[10px]",
                  )}
                >
                  {node.detail}
                </p>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex justify-center py-0.5">
                <ArrowDown
                  className={cn("text-muted/50", compact ? "h-2.5 w-2.5" : "h-3 w-3")}
                  strokeWidth={2}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
