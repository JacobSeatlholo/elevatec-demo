/* ------------------------------------------------------------------ */
/*  Elevate Commercial Construction — Fitout Estimation Engine         */
/*  Shared pricing logic used by the calculator UI, the lead API and   */
/*  the downloadable PDF summary so every number stays consistent.     */
/* ------------------------------------------------------------------ */

export type PropertyType =
  | "commercial-office"
  | "retail-hospitality"
  | "allied-health"
  | "education-nfp";

export type FinishLevel = "standard" | "executive" | "highend";

export type ToggleKey =
  | "boardroom"
  | "kitchenette"
  | "phoneBooths"
  | "ddaBathrooms"
  | "reception";

export const PROPERTY_TYPES: {
  value: PropertyType;
  label: string;
  blurb: string;
  multiplier: number;
}[] = [
  {
    value: "commercial-office",
    label: "Commercial Office",
    blurb: "Corporate HQ, tenancy fitout, agile workspace",
    multiplier: 1.0,
  },
  {
    value: "retail-hospitality",
    label: "Retail / Hospitality",
    blurb: "Shopfront, café, showroom, hospitality venue",
    multiplier: 1.08,
  },
  {
    value: "allied-health",
    label: "Allied Health / Medical",
    blurb: "Clinics, consulting suites, dental & physio",
    multiplier: 1.18,
  },
  {
    value: "education-nfp",
    label: "Educational / NFP",
    blurb: "Schools, training facilities, not-for-profit",
    multiplier: 0.95,
  },
];

export const FINISH_LEVELS: {
  value: FinishLevel;
  label: string;
  blurb: string;
  inclusions: string[];
  low: number; // $/sqm
  high: number; // $/sqm
  weeksPerSqm: number;
}[] = [
  {
    value: "standard",
    label: "Standard Commercial",
    blurb: "Base spec, durable finishes",
    inclusions: [
      "Durable commercial carpet & vinyl",
      "Painted plasterboard partitions",
      "Standard lighting (LED panels)",
      "Contract-grade workstations",
    ],
    low: 800,
    high: 1200,
    weeksPerSqm: 1 / 260,
  },
  {
    value: "executive",
    label: "Executive / Architectural",
    blurb: "Custom joinery, acoustic walls",
    inclusions: [
      "Custom timber & stone joinery",
      "Acoustic wall & ceiling systems",
      "Architectural lighting design",
      "Premium finishes & ironmongery",
    ],
    low: 1200,
    high: 1800,
    weeksPerSqm: 1 / 210,
  },
  {
    value: "highend",
    label: "High-End / Turnkey",
    blurb: "Luxury finishes, full AV integration",
    inclusions: [
      "Luxury stone, metal & glass detailing",
      "Full AV & smart-building integration",
      "Designer furniture packages",
      "Concierge-grade end-to-end delivery",
    ],
    low: 1800,
    high: 2800,
    weeksPerSqm: 1 / 170,
  },
];

export const TOGGLES: {
  key: ToggleKey;
  label: string;
  blurb: string;
  low: number;
  high: number;
}[] = [
  {
    key: "boardroom",
    label: "Executive Boardroom",
    blurb: "AV-ready boardroom with custom table & joinery",
    low: 18000,
    high: 45000,
  },
  {
    key: "kitchenette",
    label: "Breakout Kitchenette",
    blurb: "Full staff kitchen, appliances & island bench",
    low: 12000,
    high: 28000,
  },
  {
    key: "phoneBooths",
    label: "Soundproof Phone Booths",
    blurb: "Acoustic single-person focus booths",
    low: 8500,
    high: 15000,
  },
  {
    key: "ddaBathrooms",
    label: "DDA Compliant Bathrooms",
    blurb: "Accessible amenities, ambulant & accessible",
    low: 22000,
    high: 40000,
  },
  {
    key: "reception",
    label: "Reception / Lobby Upgrade",
    blurb: "Feature entry, custom desk, signage & lighting",
    low: 15000,
    high: 35000,
  },
];

export interface FitoutInput {
  propertyType: PropertyType;
  suburb: string;
  postcode: string;
  floorArea: number; // sqm
  desks: number;
  toggles: ToggleKey[];
  finish: FinishLevel;
}

export interface FitoutEstimate {
  budgetLow: number;
  budgetHigh: number;
  durationLowWeeks: number;
  durationHighWeeks: number;
  rateLow: number;
  rateHigh: number;
  costPerDeskLow: number;
  costPerDeskHigh: number;
  densitySqmPerDesk: number;
  booths: number;
  toggleLines: {
    key: ToggleKey;
    label: string;
    low: number;
    high: number;
    qty: number;
  }[];
  baseLow: number;
  baseHigh: number;
  checklist: string[];
}

/* Property-type-specific regulatory checklist ----------------------- */
function buildChecklist(type: PropertyType): string[] {
  const base = [
    "Building permit & registered building surveyor sign-off",
    "Occupancy permit / certificate of final inspection",
    "Fire safety systems — FB-01 annual cert & egress compliance",
    "DDA access & egress audit (Disability Discrimination Act)",
    "Asbestos survey & removal clearance (pre-1990 buildings)",
    "WorkSafe compliance — ISO 45001 OH&S site management",
  ];
  if (type === "allied-health") {
    base.push(
      "Australian Health Facility Guidelines (AHFG) compliance",
      "Medical gas & radiation shielding permits where applicable"
    );
  }
  if (type === "education-nfp") {
    base.push("VRQA / Dept. Education facility standards check");
  }
  if (type === "retail-hospitality") {
    base.push("Food premises registration & kitchen compliance");
  }
  if (type === "commercial-office") {
    base.push("NABERS / Green Star indoor environment target review");
  }
  return base;
}

/* Core estimator ----------------------------------------------------- */
export function estimateFitout(input: FitoutInput): FitoutEstimate {
  const property =
    PROPERTY_TYPES.find((p) => p.value === input.propertyType) ??
    PROPERTY_TYPES[0];
  const finish =
    FINISH_LEVELS.find((f) => f.value === input.finish) ?? FINISH_LEVELS[0];

  // Base construction cost driven by area x finish tier, adjusted by
  // property-type complexity (services, compliance, structural work).
  const baseLow = input.floorArea * finish.low * property.multiplier;
  const baseHigh = input.floorArea * finish.high * property.multiplier;

  // Phone booths scale with headcount: 1 booth per 12 desks (min 1, max 6).
  const booths =
    input.toggles.includes("phoneBooths")
      ? Math.min(6, Math.max(1, Math.floor(input.desks / 12) || 1))
      : 0;

  const toggleLines = TOGGLES.filter((t) => input.toggles.includes(t.key)).map(
    (t) => {
      const qty = t.key === "phoneBooths" ? booths : 1;
      return {
        key: t.key,
        label: t.label,
        low: t.low * qty,
        high: t.high * qty,
        qty,
      };
    }
  );

  const toggleLow = toggleLines.reduce((s, t) => s + t.low, 0);
  const toggleHigh = toggleLines.reduce((s, t) => s + t.high, 0);

  const budgetLow = Math.round((baseLow + toggleLow) / 500) * 500;
  const budgetHigh = Math.round((baseHigh + toggleHigh) / 500) * 500;

  // Duration: base weeks from area + finish intensity, +1 week per pair of
  // toggles for services & approvals, clamped to a 3–52 week window.
  const baseWeeks = 3 + input.floorArea * finish.weeksPerSqm;
  const toggleWeeks = Math.ceil(input.toggles.length / 2);
  const durationLowWeeks = Math.max(3, Math.round(baseWeeks));
  const durationHighWeeks = Math.max(
    durationLowWeeks + 1,
    Math.round(baseWeeks + 2 + toggleWeeks)
  );

  const densitySqmPerDesk = input.desks > 0 ? input.floorArea / input.desks : 0;

  return {
    budgetLow,
    budgetHigh,
    durationLowWeeks,
    durationHighWeeks,
    rateLow: finish.low,
    rateHigh: finish.high,
    costPerDeskLow: input.desks > 0 ? Math.round(budgetLow / input.desks) : 0,
    costPerDeskHigh: input.desks > 0 ? Math.round(budgetHigh / input.desks) : 0,
    densitySqmPerDesk,
    booths,
    toggleLines,
    baseLow: Math.round(baseLow),
    baseHigh: Math.round(baseHigh),
    checklist: buildChecklist(input.propertyType),
  };
}

/* Formatting helpers ------------------------------------------------- */
export function formatAUD(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${m.toFixed(m >= 10 ? 1 : 2)}M`;
  }
  return `$${Math.round(value).toLocaleString("en-AU")}`;
}

export function formatAUDFull(value: number): string {
  return `$${Math.round(value).toLocaleString("en-AU")}`;
}

export function suggestDesks(area: number): number {
  return Math.max(2, Math.round(area / 10));
}

export const FINISH_META = FINISH_LEVELS;
export const PROPERTY_META = PROPERTY_TYPES;
export const TOGGLE_META = TOGGLES;
