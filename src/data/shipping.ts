/**
 * Illustrative demo shipping rules.
 *
 * These are NOT Greenbush Twins' real rates. They exist so the shipping
 * estimator, cart totals, and checkout can be reviewed end to end. In
 * production, `estimateShipping` should be replaced by a call to the
 * WooCommerce Store API (`/wc/store/v1/cart/select-shipping-rate`) or the
 * configured carrier integration.
 */

export interface ShippingDestination {
  code: "US" | "CA";
  name: string;
  regionLabel: string;
  postalLabel: string;
  postalPattern: RegExp;
  postalHint: string;
  regions: { code: string; name: string }[];
}

export const destinations: ShippingDestination[] = [
  {
    code: "US",
    name: "United States",
    regionLabel: "State",
    postalLabel: "ZIP code",
    postalPattern: /^\d{5}(-\d{4})?$/,
    postalHint: "5-digit ZIP, e.g. 67301",
    regions: [
      "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
    ].map((c) => ({ code: c, name: c })),
  },
  {
    code: "CA",
    name: "Canada",
    regionLabel: "Province",
    postalLabel: "Postal code",
    postalPattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    postalHint: "Format A1A 1A1",
    regions: ["AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"].map((c) => ({ code: c, name: c })),
  },
];

export const unsupportedDestinations = [
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "OTHER", name: "Other / International" },
];

export interface ShippingMethod {
  id: "standard" | "expedited" | "ca-standard";
  name: string;
  description: string;
  destination: "US" | "CA";
  base: number;
  perItem: number;
  freeOver?: number;
}

export const shippingMethods: ShippingMethod[] = [
  { id: "standard", name: "Standard (sample)", description: "Illustrative ground rate", destination: "US", base: 6.95, perItem: 1.0, freeOver: 75 },
  { id: "expedited", name: "Expedited (sample)", description: "Illustrative priority rate", destination: "US", base: 14.95, perItem: 1.5 },
  { id: "ca-standard", name: "Canada Standard (sample)", description: "Illustrative international rate", destination: "CA", base: 18.95, perItem: 2.0 },
];

export interface ShippingAddress {
  country: string;
  region: string;
  postalCode: string;
  methodId: ShippingMethod["id"] | "";
}

export interface ShippingEstimate {
  amount: number;
  method: ShippingMethod;
  address: ShippingAddress;
  freeShippingApplied: boolean;
}

export type ShippingErrors = Partial<Record<keyof ShippingAddress, string>>;

export const AK_HI_SURCHARGE = 8;

export function validateShippingAddress(a: ShippingAddress): ShippingErrors {
  const errors: ShippingErrors = {};
  if (!a.country) errors.country = "Please choose a country or region.";
  const dest = destinations.find((d) => d.code === a.country);
  if (a.country && !dest) {
    errors.country = "We can't estimate shipping to this destination yet. Please contact us for a quote.";
    return errors;
  }
  if (dest) {
    if (!a.region) errors.region = `Please choose a ${dest.regionLabel.toLowerCase()}.`;
    if (!a.postalCode.trim()) errors.postalCode = `Please enter a ${dest.postalLabel}.`;
    else if (!dest.postalPattern.test(a.postalCode.trim()))
      errors.postalCode = `That doesn't look like a valid ${dest.postalLabel} (${dest.postalHint}).`;
    if (!a.methodId) errors.methodId = "Please choose a shipping method.";
    else if (!shippingMethods.some((m) => m.id === a.methodId && m.destination === dest.code))
      errors.methodId = "That method isn't available for the selected destination.";
  }
  return errors;
}

export function estimateShipping(a: ShippingAddress, subtotal: number, itemCount: number): ShippingEstimate | null {
  const errors = validateShippingAddress(a);
  if (Object.keys(errors).length || itemCount === 0) return null;
  const method = shippingMethods.find((m) => m.id === a.methodId)!;
  let amount = method.base + method.perItem * Math.max(0, itemCount - 1);
  if (a.country === "US" && (a.region === "AK" || a.region === "HI")) amount += AK_HI_SURCHARGE;
  const freeShippingApplied = !!method.freeOver && subtotal >= method.freeOver;
  if (freeShippingApplied) amount = 0;
  return { amount: round2(amount), method, address: a, freeShippingApplied };
}

export function methodsFor(country: string) {
  return shippingMethods.filter((m) => m.destination === country);
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
