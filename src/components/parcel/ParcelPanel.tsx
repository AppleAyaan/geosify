"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, TrendingUp, Sparkles, Bookmark } from "lucide-react";
import { parcelRepository } from "@/lib/data/parcel-repository";
import { useAppStore } from "@/store/app-store";
import { formatCurrency, formatAcreage } from "@/lib/utils/format";
import { getScoreColor, getScoreLabel } from "@/lib/utils/scoring";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ParcelOwnershipChain } from "@/components/parcel/ParcelOwnershipChain";
import { getOwnershipChain } from "@/lib/data/ownership-chains";
import { cn } from "@/lib/utils/cn";

function ScoreRing({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(22,163,74,0.15)"
          strokeWidth="7"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-semibold">{Math.round(score)}</div>
        <div className="text-[10px] text-muted">/ 100</div>
      </div>
    </div>
  );
}

export function ParcelPanel() {
  const selectedParcelId = useAppStore((s) => s.selectedParcelId);
  const isPanelOpen = useAppStore((s) => s.isPanelOpen);
  const clearSelection = useAppStore((s) => s.clearSelection);

  const feature = selectedParcelId
    ? parcelRepository.getById(selectedParcelId)
    : null;
  const analysis = selectedParcelId
    ? parcelRepository.getAnalysis(selectedParcelId)
    : null;

  return (
    <AnimatePresence>
      {isPanelOpen && feature && analysis && (
        <motion.aside
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 36 }}
          className="glass-panel-solid fixed bottom-0 right-0 top-0 z-40 w-full max-w-[380px] overflow-y-auto p-4 md:top-16 md:m-3 md:h-[calc(100vh-4.5rem)] md:rounded-xl"
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold">{feature.properties.address}</h2>
              <p className="text-[10px] font-mono text-muted">{feature.properties.apn}</p>
            </div>
            <button
              onClick={clearSelection}
              className="glass-inset rounded-md p-1 text-muted hover:text-foreground"
              aria-label="Close panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Button
            type="button"
            variant="glass"
            size="sm"
            className="mb-4 w-full"
            onClick={() => undefined}
          >
            <Bookmark className="h-3.5 w-3.5" />
            Save
          </Button>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            className="space-y-4"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
              className="grid grid-cols-2 gap-2"
            >
              {[
                { label: "Price", value: formatCurrency(feature.properties.price) },
                { label: "Acreage", value: formatAcreage(feature.properties.acreage) },
                { label: "$/Acre", value: formatCurrency(feature.properties.pricePerAcre) },
                { label: "Zoning", value: feature.properties.zoning },
              ].map((item) => (
                <div key={item.label} className="glass-inset rounded-lg p-3">
                  <p className="text-[10px] text-muted">{item.label}</p>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </motion.div>
            <p className="text-[10px] text-muted">{feature.properties.zoningLabel}</p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            >
              <ParcelOwnershipChain
                nodes={getOwnershipChain(feature.properties.id)}
                address={`${feature.properties.address}, ${feature.properties.city}`}
              />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            >
              <h3 className="mb-2 text-xs font-semibold">Investment Score</h3>
              <div className="flex items-center gap-4">
                <ScoreRing score={feature.properties.investmentScore} />
                <div className="flex-1 space-y-1.5">
                  {(
                    Object.entries(feature.properties.scoreBreakdown) as [
                      string,
                      number,
                    ][]
                  ).map(([key, value]) => (
                    <div key={key}>
                      <div className="mb-0.5 flex justify-between text-[10px]">
                        <span className="capitalize text-muted">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span>{value}</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-accent/10">
                        <motion.div
                          className="h-full rounded-full bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-[10px] text-muted">
                    {getScoreLabel(feature.properties.investmentScore)} opportunity
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <h3 className="text-xs font-semibold">AI Insights</h3>
              </div>
              <div className="space-y-2">
                {analysis.insights.map((insight) => (
                  <div key={insight.id} className="glass-card rounded-lg p-3">
                    <div className="mb-0.5 flex items-center justify-between gap-2">
                      <p className="text-xs font-medium">{insight.title}</p>
                      <Badge variant="gray">{insight.confidence}</Badge>
                    </div>
                    <p className="text-[11px] leading-relaxed text-muted">
                      {insight.summary}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                <h3 className="text-xs font-semibold">Risks</h3>
              </div>
              <div className="space-y-1.5">
                {analysis.risks.map((risk) => (
                  <div key={risk.id} className="glass-inset rounded-lg p-2.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          risk.severity === "high" && "bg-red-500",
                          risk.severity === "medium" && "bg-amber-500",
                          risk.severity === "low" && "bg-green-500",
                        )}
                      />
                      <p className="text-xs font-medium">{risk.label}</p>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted">{risk.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-accent" />
                <h3 className="text-xs font-semibold">Opportunities</h3>
              </div>
              <div className="space-y-1.5">
                {analysis.opportunities.map((opp) => (
                  <div key={opp.id} className="glass-pill rounded-lg p-2.5">
                    <p className="text-xs font-medium">{opp.label}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{opp.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <p className="text-[10px] text-muted">
              Analysis generated Jun 2026 · Geosify AI
            </p>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
