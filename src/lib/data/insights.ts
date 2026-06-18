import type { ParcelAnalysis, ParcelId } from "@/lib/types/parcel";

const baseAnalysis: Record<ParcelId, ParcelAnalysis> = {
  "parcel-hero": {
    parcelId: "parcel-hero",
    generatedAt: "2026-06-01T10:00:00Z",
    insights: [
      {
        id: "i1",
        title: "Transit-oriented development corridor",
        summary:
          "Parcel sits within 400m of ION LRT Columbia station, supporting mixed-use density and strong rental demand from university workforce.",
        confidence: "high",
        category: "infrastructure",
      },
      {
        id: "i2",
        title: "Commercial zoning upside",
        summary:
          "C2 designation allows retail, office, and residential stacking — ideal for a 6–8 storey mixed-use podium development.",
        confidence: "high",
        category: "zoning",
      },
      {
        id: "i3",
        title: "Waterloo tech employment growth",
        summary:
          "Regional tech employment grew 12% YoY, driving land absorption along Columbia and University corridors.",
        confidence: "medium",
        category: "market",
      },
    ],
    risks: [
      {
        id: "r1",
        label: "Development charge escalation",
        severity: "medium",
        description:
          "Region of Waterloo DC rates increased 8% in 2025 — factor into pro forma feasibility.",
      },
      {
        id: "r2",
        label: "Heritage overlay proximity",
        severity: "low",
        description:
          "Adjacent heritage district may require design review for facade treatments.",
      },
    ],
    opportunities: [
      {
        id: "o1",
        label: "Assemblage potential",
        impact: "high",
        description:
          "Two adjacent parcels under same ownership — combined 7.1 acres enables phased master plan.",
      },
      {
        id: "o2",
        label: "Pre-leasing to anchor tenant",
        impact: "medium",
        description:
          "Strong demand from life-sciences and co-working operators in the UW innovation district.",
      },
    ],
  },
};

function defaultAnalysis(parcelId: ParcelId): ParcelAnalysis {
  return (
    baseAnalysis[parcelId] ?? {
      parcelId,
      generatedAt: "2026-06-01T10:00:00Z",
      insights: [
        {
          id: `${parcelId}-i1`,
          title: "Stable Waterloo market fundamentals",
          summary:
            "Waterloo CMA vacancy remains below provincial average with sustained population inflow from GTA spillover.",
          confidence: "medium",
          category: "market",
        },
        {
          id: `${parcelId}-i2`,
          title: "Zoning supports value-add",
          summary:
            "Current zoning permits intensification subject to site plan approval — moderate redevelopment pathway available.",
          confidence: "medium",
          category: "zoning",
        },
      ],
      risks: [
        {
          id: `${parcelId}-r1`,
          label: "Interest rate sensitivity",
          severity: "medium",
          description:
            "Higher cost of capital may compress exit cap rates for development projects in the 18–24 month window.",
        },
      ],
      opportunities: [
        {
          id: `${parcelId}-o1`,
          label: "Land banking",
          impact: "medium",
          description:
            "Hold for appreciation along planned infrastructure corridors with low carrying cost relative to GTA comparables.",
        },
      ],
    }
  );
}

export function getParcelAnalysis(parcelId: ParcelId): ParcelAnalysis {
  return defaultAnalysis(parcelId);
}
