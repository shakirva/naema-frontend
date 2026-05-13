// ─── Medusa storefront types (Medusa v2 store API shapes) ─────────────────────

export type MedusaMoneyAmount = {
  id: string;
  currency_code: string;
  amount: number;
};

export type MedusaProductVariant = {
  id: string;
  title: string; // "250g" | "500g" | "1kg"
  prices: MedusaMoneyAmount[];
  inventory_quantity?: number;
  manage_inventory?: boolean;
};

export type MedusaProductImage = {
  id: string;
  url: string;
};

export type MedusaProductCategory = {
  id: string;
  name: string;
  handle: string;
};

export type MedusaProduct = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  images: MedusaProductImage[];
  variants: MedusaProductVariant[];
  categories: MedusaProductCategory[];
  tags?: { id: string; value: string }[];
};

// ─── Cart / line-item types ────────────────────────────────────────────────────

export type MedusaLineItem = {
  id: string;
  title: string;        // product title
  variant_title: string; // "250g" etc
  thumbnail: string | null;
  quantity: number;
  unit_price: number;   // in smallest currency unit (fils for KWD)
  subtotal: number;
};

export type MedusaCart = {
  id: string;
  region_id: string | null;
  currency_code: string;
  items: MedusaLineItem[];
  subtotal: number;
  shipping_total: number;
  discount_total: number;
  total: number;
};

// ─── Helper: format KWD price from fils → "KD 1.500" ─────────────────────────
export function formatKWD(fils: number): string {
  return `KD ${(fils / 1000).toFixed(3)}`;
}

// ─── Get the KWD price from a variant's prices array ─────────────────────────
export function getKWDPrice(variant: MedusaProductVariant): number | null {
  const p = variant.prices.find((m) => m.currency_code === "kwd");
  return p ? p.amount : null;
}
