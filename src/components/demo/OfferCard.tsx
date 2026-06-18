"use client";

import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

interface OfferCardProps {
  listPrice: number;
  offer: number;
  counter: number;
  final: number;
}

export function OfferCard({ listPrice, offer, counter, final }: OfferCardProps) {
  const savings = listPrice - final;
  const savingsPct = Math.round((savings / listPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm"
    >
      <div className="border-b border-emerald-900/8 bg-emerald-50/80 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15">
            <TrendingDown className="h-3.5 w-3.5 text-accent" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-foreground">
              Price negotiation
            </p>
            <p className="text-[10px] text-muted">Live agent outreach</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 px-3.5 py-3">
        <PriceRow label="List price" value={listPrice} muted />
        <PriceRow label="Your opening offer" value={offer} accent />
        <PriceRow label="Seller counter" value={counter} />
        <div className="my-1 border-t border-dashed border-foreground/10" />
        <PriceRow label="Recommended offer" value={final} highlight />
        <p className="rounded-lg bg-accent/10 px-2.5 py-1.5 text-center text-[10px] font-medium text-accent">
          {formatCurrency(savings)} below ask ({savingsPct}% savings)
        </p>
      </div>
    </motion.div>
  );
}

function PriceRow({
  label,
  value,
  muted,
  accent,
  highlight,
}: {
  label: string;
  value: number;
  muted?: boolean;
  accent?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span
        className={
          highlight
            ? "text-[11px] font-semibold text-foreground"
            : "text-[10px] text-muted"
        }
      >
        {label}
      </span>
      <span
        className={
          highlight
            ? "text-[12px] font-semibold text-accent"
            : accent
              ? "text-[11px] font-medium text-foreground"
              : muted
                ? "text-[11px] text-muted line-through"
                : "text-[11px] font-medium text-foreground"
        }
      >
        {formatCurrency(value)}
      </span>
    </div>
  );
}
