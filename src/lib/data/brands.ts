export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export const brands: Brand[] = [
  { id: "remax", name: "RE/MAX", logo: "/brands/remax.svg" },
  { id: "colliers", name: "Colliers", logo: "/brands/colliers.svg" },
  { id: "cbre", name: "CBRE", logo: "/brands/cbre.svg" },
  {
    id: "cushman",
    name: "Cushman & Wakefield",
    logo: "/brands/cushman-wakefield.svg",
  },
  {
    id: "royal-lepage",
    name: "Royal LePage",
    logo: "/brands/royal-lepage.svg",
  },
  {
    id: "remax-commercial",
    name: "RE/MAX Commercial",
    logo: "/brands/remax.svg",
  },
  { id: "colliers-land", name: "Colliers Land", logo: "/brands/colliers.svg" },
  {
    id: "northridge",
    name: "Northridge Developments",
    logo: "/brands/northridge.svg",
  },
  {
    id: "keller-williams",
    name: "Keller Williams Land",
    logo: "/brands/keller-williams.svg",
  },
  {
    id: "summit-land",
    name: "Summit Land Co.",
    logo: "/brands/summit-land.svg",
  },
  {
    id: "royal-lepage-terrequity",
    name: "Royal LePage Terrequity",
    logo: "/brands/royal-lepage.svg",
  },
  {
    id: "verdant",
    name: "Verdant Holdings",
    logo: "/brands/verdant.svg",
  },
  {
    id: "pivot-capital",
    name: "Pivot Capital",
    logo: "/brands/pivot-capital.svg",
  },
  {
    id: "greenfield",
    name: "Greenfield Partners",
    logo: "/brands/greenfield.svg",
  },
  {
    id: "sothebys",
    name: "Sotheby's International",
    logo: "/brands/sothebys.svg",
  },
];

export const brandById = Object.fromEntries(brands.map((b) => [b.id, b])) as Record<
  string,
  Brand
>;

export const heroTrustedBrandIds = [
  "remax",
  "colliers",
  "cbre",
  "cushman",
  "royal-lepage",
] as const;

export const carouselBrandIds = [
  "remax-commercial",
  "colliers-land",
  "cbre",
  "northridge",
  "keller-williams",
  "cushman",
  "summit-land",
  "royal-lepage-terrequity",
  "verdant",
  "pivot-capital",
  "greenfield",
  "sothebys",
] as const;

export function getBrandsByIds(ids: readonly string[]): Brand[] {
  return ids.map((id) => brandById[id]).filter(Boolean);
}
