"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatAcreage, formatCurrencyRange } from "@/lib/utils/format";
import { parcelRepository } from "@/lib/data/parcel-repository";
import { HERO_PARCEL_ID } from "@/lib/data/parcels";

export function HeroParcelCard({ parcelId = HERO_PARCEL_ID }: { parcelId?: string }) {
  const feature = parcelRepository.getById(parcelId);
  if (!feature) return null;

  const { address, city, province, acreage, price, investmentScore } =
    feature.properties;
  const priceMin = Math.round(price * 0.92);
  const priceMax = Math.round(price * 1.08);

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="glass-panel-solid z-10 w-[11.5rem] rounded-lg p-2 shadow-lg sm:w-52"
    >
      <div className="mb-1.5 h-9 overflow-hidden rounded-md bg-gradient-to-br from-accent/20 to-accent/5" />
      <h3 className="mb-0.5 text-[10px] font-semibold leading-tight sm:text-[11px]">
        Prime Development Land
      </h3>
      <p className="mb-1 line-clamp-2 text-[9px] leading-snug text-muted sm:text-[10px]">
        {address}, {city}, {province}
      </p>
      <div className="mb-1 flex flex-wrap gap-x-1.5 gap-y-0.5 text-[9px] text-muted sm:text-[10px]">
        <span>{formatAcreage(acreage)}</span>
        <span>·</span>
        <span className="font-medium text-foreground">
          {formatCurrencyRange(priceMin, priceMax)}
        </span>
        <span>·</span>
        <span className="font-medium text-accent">{investmentScore}/100</span>
      </div>
      <p className="mb-2 text-[9px] text-muted">Private · Vacant</p>

      <div className="flex flex-col gap-1">
        <Link href={`/explore?parcel=${parcelId}`}>
          <Button size="sm" className="h-7 w-full text-[10px] sm:h-8 sm:text-xs">
            View Details
          </Button>
        </Link>
        <Button
          variant="glass"
          size="sm"
          className="h-7 w-full text-[10px] sm:h-8 sm:text-xs"
          onClick={() => undefined}
        >
          <Bookmark className="h-3 w-3" />
          Save
        </Button>
      </div>
    </motion.div>
  );
}
