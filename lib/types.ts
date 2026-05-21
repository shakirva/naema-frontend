// ─── Medusa Storefront API Response Types (Medusa v2) ─────────────────────

export type MedusaMoneyAmount = {
  id: string;
  currency_code: string;
  amount: number;
};

export type MedusaProductVariant = {
  id: string;
  title: string;
  sku?: string;
  prices: MedusaMoneyAmount[];
  inventory_quantity?: number;
  manage_inventory?: boolean;
  options?: { id: string; value: string; option_id: string }[];
};

export type MedusaProductImage = {
  id: string;
  url: string;
};

export type MedusaProductCategory = {
  id: string;
  name: string;
  handle: string;
  description?: string | null;
  rank?: number;
  parent_category_id?: string | null;
  category_children?: MedusaProductCategory[];
  metadata?: Record<string, unknown> | null;
};

export type MedusaProduct = {
  id: string;
  title: string;
  handle: string;
  subtitle?: string | null;
  description: string | null;
  thumbnail: string | null;
  images: MedusaProductImage[];
  variants: MedusaProductVariant[];
  categories?: MedusaProductCategory[];
  collection?: { id: string; title: string; handle: string } | null;
  tags?: { id: string; value: string }[];
  metadata?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
};

export type MedusaCollection = {
  id: string;
  title: string;
  handle: string;
  metadata?: Record<string, unknown> | null;
  products?: MedusaProduct[];
};

// ─── Cart / Line-Item Types ───────────────────────────────────────────────

export type MedusaLineItem = {
  id: string;
  title: string;
  variant_title?: string;
  product_title?: string;
  thumbnail: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
  total: number;
  variant_id: string;
  product_id?: string;
  variant?: MedusaProductVariant;
};

export type MedusaCart = {
  id: string;
  region_id: string | null;
  currency_code: string;
  items: MedusaLineItem[];
  subtotal: number;
  shipping_total: number;
  discount_total: number;
  tax_total: number;
  total: number;
  email?: string;
  shipping_address?: MedusaAddress | null;
  billing_address?: MedusaAddress | null;
  shipping_methods?: MedusaShippingMethod[];
  payment_collection?: MedusaPaymentCollection | null;
};

export type MedusaAddress = {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country_code?: string;
  phone?: string;
  company?: string;
};

export type MedusaShippingMethod = {
  id: string;
  name: string;
  amount: number;
  shipping_option_id: string;
};

export type MedusaShippingOption = {
  id: string;
  name: string;
  amount: number;
  provider_id: string;
};

export type MedusaPaymentCollection = {
  id: string;
  status: string;
  payment_sessions?: MedusaPaymentSession[];
};

export type MedusaPaymentSession = {
  id: string;
  provider_id: string;
  status: string;
  amount: number;
};

// ─── Helpers ──────────────────────────────────────────────────────────────

export function formatPrice(amount: number, currencyCode: string = "kwd"): string {
  const code = currencyCode.toLowerCase();
  // Medusa stores amounts in smallest unit
  if (code === "kwd") {
    return `KD ${(amount / 1000).toFixed(3)}`;
  }
  if (code === "inr") {
    return `₹${(amount / 100).toLocaleString()}`;
  }
  // Default: assume cents
  return `${(amount / 100).toFixed(2)} ${currencyCode.toUpperCase()}`;
}

export function getLowestPrice(variant: MedusaProductVariant): number | null {
  if (!variant.prices?.length) return null;
  return Math.min(...variant.prices.map((p) => p.amount));
}

export function getCheapestVariant(product: MedusaProduct): MedusaProductVariant | null {
  if (!product.variants?.length) return null;
  return product.variants.reduce((cheapest, v) => {
    const price = getLowestPrice(v);
    const cheapestPrice = getLowestPrice(cheapest);
    if (price === null) return cheapest;
    if (cheapestPrice === null) return v;
    return price < cheapestPrice ? v : cheapest;
  }, product.variants[0]);
}

export function getProductPrice(product: MedusaProduct): number {
  const variant = getCheapestVariant(product);
  if (!variant) return 0;
  const price = getLowestPrice(variant);
  return price ?? 0;
}
