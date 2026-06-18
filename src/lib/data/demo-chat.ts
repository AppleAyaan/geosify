export const demoParcel = {
  address: "88 Ira Needles Blvd",
  city: "Waterloo, ON",
  acreage: 8.2,
  listPrice: 2_100_000,
  zoning: "M1 — Light Industrial",
};

export const DEMO_STAGES = [
  { label: "Scanning parcels...", endIndex: 2 },
  { label: "Tracing ownership...", endIndex: 5 },
  { label: "Negotiating...", endIndex: 7 },
  { label: "Processing offer...", endIndex: 9 },
  { label: "Submitting offer...", endIndex: 11 },
] as const;

export function getDemoStage(visibleCount: number) {
  return (
    DEMO_STAGES.find((stage) => visibleCount <= stage.endIndex) ??
    DEMO_STAGES[DEMO_STAGES.length - 1]
  );
}

export type DemoChatMessage =
  | { id: string; kind: "user"; text: string }
  | { id: string; kind: "agent"; text: string }
  | { id: string; kind: "chain" }
  | { id: string; kind: "offer"; listPrice: number; offer: number; counter: number; final: number };

export const demoChatScript: DemoChatMessage[] = [
  {
    id: "m1",
    kind: "user",
    text: "Find vacant industrial land in Waterloo under $2.2M with strong development upside.",
  },
  {
    id: "m2",
    kind: "agent",
    text: "Found 3 matches. Best fit: 88 Ira Needles Blvd — 8.2 acres, M1 zoning, listed at $2.1M. Investment score 86/100.",
  },
  {
    id: "m3",
    kind: "user",
    text: "Who actually owns this? I need the full chain of command before we move.",
  },
  {
    id: "m4",
    kind: "chain",
  },
  {
    id: "m5",
    kind: "agent",
    text: "Traced 5 entities from crown registry to listing agent. Westmont Holdings is the beneficial owner — they’ve sold two parcels in this corridor in the last 18 months.",
  },
  {
    id: "m6",
    kind: "user",
    text: "Seller wants $2.1M. Can you negotiate on my behalf?",
  },
  {
    id: "m7",
    kind: "agent",
    text: "On it. Pulling comps and reaching out to Sarah Chen at Coldwell Banker Commercial.",
  },
  {
    id: "m8",
    kind: "offer",
    listPrice: 2_100_000,
    offer: 1_620_000,
    counter: 1_780_000,
    final: 1_680_000,
  },
  {
    id: "m9",
    kind: "agent",
    text: "Counter received at $1.78M. Comparable sales support $1.62M–$1.68M. I recommend $1.68M with a 45-day close.",
  },
  {
    id: "m10",
    kind: "user",
    text: "Go with $1.68M.",
  },
  {
    id: "m11",
    kind: "agent",
    text: "Offer submitted to Sarah Chen. I’ll notify you the moment they respond — typical turnaround is 24–48 hours.",
  },
];
