import type { ParcelId } from "@/lib/types/parcel";

export type OwnershipLogo =
  | { type: "brand"; brandId: string }
  | { type: "badge"; label: string; tone: "ontario" | "waterloo" };

export interface OwnershipChainNode {
  role: string;
  name: string;
  detail: string;
  logo: OwnershipLogo;
}

const CROWN = (apn: string): OwnershipChainNode => ({
  role: "Crown registry",
  name: "Ontario Land Registry",
  detail: `APN ${apn} · Fee simple title`,
  logo: { type: "badge", label: "ON", tone: "ontario" },
});

const MUNICIPAL: OwnershipChainNode = {
  role: "Municipal authority",
  name: "Region of Waterloo",
  detail: "Zoning & development approvals",
  logo: { type: "badge", label: "RW", tone: "waterloo" },
};

type EntityRef = {
  name: string;
  brandId: string;
  detail: string;
};

function chain(
  apn: string,
  title: EntityRef,
  beneficial: EntityRef,
  listing: EntityRef,
): OwnershipChainNode[] {
  return [
    CROWN(apn),
    MUNICIPAL,
    {
      role: "Title holder",
      name: title.name,
      detail: title.detail,
      logo: { type: "brand", brandId: title.brandId },
    },
    {
      role: "Beneficial owner",
      name: beneficial.name,
      detail: beneficial.detail,
      logo: { type: "brand", brandId: beneficial.brandId },
    },
    {
      role: "Listing agent",
      name: listing.name,
      detail: listing.detail,
      logo: { type: "brand", brandId: listing.brandId },
    },
  ];
}

const PARCEL_CHAINS: Record<string, ReturnType<typeof chain>> = {
  "parcel-hero": chain(
    "061-2847-001",
    {
      name: "Northridge Developments Ltd.",
      brandId: "northridge",
      detail: "Registered owner since 2021",
    },
    {
      name: "Verdant Holdings Inc.",
      brandId: "verdant",
      detail: "Parent company · Toronto, ON",
    },
    {
      name: "Colliers Land",
      brandId: "colliers-land",
      detail: "Marcus Webb · Authorized negotiator",
    },
  ),
  "parcel-02": chain(
    "061-1124-003",
    {
      name: "Summit Land Co.",
      brandId: "summit-land",
      detail: "Registered owner since 2018",
    },
    {
      name: "Pivot Capital Partners",
      brandId: "pivot-capital",
      detail: "Institutional beneficial owner",
    },
    {
      name: "RE/MAX Commercial",
      brandId: "remax-commercial",
      detail: "Dana Okonkwo · Listing broker",
    },
  ),
  "parcel-03": chain(
    "061-0932-017",
    {
      name: "Greenfield Partners REIT",
      brandId: "greenfield",
      detail: "Registered owner since 2016",
    },
    {
      name: "Greenfield Partners REIT",
      brandId: "greenfield",
      detail: "Direct ownership · Improved asset",
    },
    {
      name: "Royal LePage Terrequity",
      brandId: "royal-lepage-terrequity",
      detail: "James Holt · Commercial division",
    },
  ),
  "parcel-04": chain(
    "061-1456-008",
    {
      name: "Keller Williams Land Group",
      brandId: "keller-williams",
      detail: "Registered owner since 2020",
    },
    {
      name: "Verdant Holdings Inc.",
      brandId: "verdant",
      detail: "Beneficial owner · Land banking",
    },
    {
      name: "Royal LePage",
      brandId: "royal-lepage",
      detail: "Priya Nair · Vacant land specialist",
    },
  ),
  "parcel-05": chain(
    "061-1789-012",
    {
      name: "Maple Industrial Trust REIT",
      brandId: "northridge",
      detail: "Registered owner since 2019",
    },
    {
      name: "Westmont Holdings Inc.",
      brandId: "pivot-capital",
      detail: "Parent company · Burlington, ON",
    },
    {
      name: "CBRE",
      brandId: "cbre",
      detail: "Sarah Chen · Authorized negotiator",
    },
  ),
  "parcel-06": chain(
    "061-2034-005",
    {
      name: "Colliers International",
      brandId: "colliers",
      detail: "Registered owner since 2014",
    },
    {
      name: "Colliers International",
      brandId: "colliers",
      detail: "Improved commercial holding",
    },
    {
      name: "Cushman & Wakefield",
      brandId: "cushman",
      detail: "Alex Rivera · Retail leasing",
    },
  ),
  "parcel-07": chain(
    "061-0567-021",
    {
      name: "Erbsville Land Trust",
      brandId: "summit-land",
      detail: "Registered owner since 2017",
    },
    {
      name: "Greenfield Partners",
      brandId: "greenfield",
      detail: "Development holding company",
    },
    {
      name: "Sotheby's International",
      brandId: "sothebys",
      detail: "Elena Voss · Private client group",
    },
  ),
  "parcel-08": chain(
    "061-3012-009",
    {
      name: "Lexington Industrial LP",
      brandId: "verdant",
      detail: "Registered owner since 2015",
    },
    {
      name: "Pivot Capital Partners",
      brandId: "pivot-capital",
      detail: "Fund IV beneficial interest",
    },
    {
      name: "CBRE",
      brandId: "cbre",
      detail: "Tom Bradley · Industrial team",
    },
  ),
  "parcel-09": chain(
    "061-0891-014",
    {
      name: "Albert Street Holdings",
      brandId: "royal-lepage",
      detail: "Registered owner since 2012",
    },
    {
      name: "Albert Street Holdings",
      brandId: "royal-lepage",
      detail: "Family-held improved asset",
    },
    {
      name: "RE/MAX",
      brandId: "remax",
      detail: "Chris Park · Downtown broker",
    },
  ),
  "parcel-10": chain(
    "061-2245-006",
    {
      name: "Weber North Properties",
      brandId: "keller-williams",
      detail: "Registered owner since 2022",
    },
    {
      name: "Northridge Developments Ltd.",
      brandId: "northridge",
      detail: "Beneficial owner · Assembly play",
    },
    {
      name: "Colliers Land",
      brandId: "colliers-land",
      detail: "Nina Kowalski · Land advisory",
    },
  ),
  "parcel-11": chain(
    "061-1678-011",
    {
      name: "Bridgeport Industrial Inc.",
      brandId: "northridge",
      detail: "Registered owner since 2011",
    },
    {
      name: "Bridgeport Industrial Inc.",
      brandId: "northridge",
      detail: "Owner-occupied industrial",
    },
    {
      name: "Cushman & Wakefield",
      brandId: "cushman",
      detail: "Mike Santos · Industrial sales",
    },
  ),
  "parcel-12": chain(
    "061-4123-002",
    {
      name: "R&T Park Holdings",
      brandId: "verdant",
      detail: "Registered owner since 2020",
    },
    {
      name: "Pivot Capital Partners",
      brandId: "pivot-capital",
      detail: "Tech corridor land bank",
    },
    {
      name: "Colliers",
      brandId: "colliers",
      detail: "Rachel Kim · Research park lead",
    },
  ),
  "parcel-13": chain(
    "061-0789-019",
    {
      name: "Westmount Land Corp.",
      brandId: "summit-land",
      detail: "Registered owner since 2019",
    },
    {
      name: "Verdant Holdings Inc.",
      brandId: "verdant",
      detail: "Residential land assembly",
    },
    {
      name: "Keller Williams Land",
      brandId: "keller-williams",
      detail: "Jordan Lee · Lot specialist",
    },
  ),
  "parcel-14": chain(
    "061-2567-007",
    {
      name: "Regina Street Properties",
      brandId: "royal-lepage",
      detail: "Registered owner since 2009",
    },
    {
      name: "Regina Street Properties",
      brandId: "royal-lepage",
      detail: "Improved infill holding",
    },
    {
      name: "RE/MAX Commercial",
      brandId: "remax-commercial",
      detail: "Sofia Martins · Urban lots",
    },
  ),
  "parcel-15": chain(
    "061-3345-004",
    {
      name: "Erbsville Road Industrial",
      brandId: "northridge",
      detail: "Registered owner since 2016",
    },
    {
      name: "Greenfield Partners",
      brandId: "greenfield",
      detail: "Industrial development pipeline",
    },
    {
      name: "CBRE",
      brandId: "cbre",
      detail: "David Cho · Large format land",
    },
  ),
  "parcel-16": chain(
    "061-1890-016",
    {
      name: "Erb East Land Trust",
      brandId: "greenfield",
      detail: "Registered owner since 2021",
    },
    {
      name: "Summit Land Co.",
      brandId: "summit-land",
      detail: "Beneficial owner · Infill reserve",
    },
    {
      name: "Royal LePage Terrequity",
      brandId: "royal-lepage-terrequity",
      detail: "Amir Hassan · Lot sales",
    },
  ),
  "parcel-17": chain(
    "061-4456-010",
    {
      name: "Lester Campus Holdings",
      brandId: "colliers",
      detail: "Registered owner since 2013",
    },
    {
      name: "Lester Campus Holdings",
      brandId: "colliers",
      detail: "Student housing operator",
    },
    {
      name: "Sotheby's International",
      brandId: "sothebys",
      detail: "Victoria Tran · Investment sales",
    },
  ),
  "parcel-18": chain(
    "061-5123-013",
    {
      name: "Phillip Street Ventures",
      brandId: "pivot-capital",
      detail: "Registered owner since 2022",
    },
    {
      name: "Northridge Developments Ltd.",
      brandId: "northridge",
      detail: "R&T Park expansion vehicle",
    },
    {
      name: "Cushman & Wakefield",
      brandId: "cushman",
      detail: "Laura Finch · Tech land desk",
    },
  ),
};

export function getOwnershipChain(parcelId: ParcelId): OwnershipChainNode[] {
  return PARCEL_CHAINS[parcelId] ?? [];
}
