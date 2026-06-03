// ─── Medusa Storefront API Response Types (Medusa v2) ─────────────────────

export type MedusaMoneyAmount = {
  id: string;
  currency_code: string;
  amount: number;
  raw_amount?: { value: string; precision: number };
};

export type MedusaProductVariant = {
  id: string;
  title: string;
  sku?: string;
  prices: MedusaMoneyAmount[];
  calculated_price?: {
    id: string;
    calculated_amount: number;
    raw_calculated_amount?: { value: string; precision: number };
    currency_code?: string;
    is_calculated_price_tax_inclusive?: boolean;
  } | null;
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

export function getLowestPrice(variant: MedusaProductVariant | null | undefined): number | null {
  if (!variant) return null;
  
  // First try calculated_price (region-aware, comes from API with region_id)
  if (variant.calculated_price) {
    if (variant.calculated_price.raw_calculated_amount?.value != null) {
      return Number(variant.calculated_price.raw_calculated_amount.value);
    }
    if (variant.calculated_price.calculated_amount != null) {
      return variant.calculated_price.calculated_amount;
    }
  }
  
  // Fall back to KWD price from prices array
  if (variant.prices && variant.prices.length > 0) {
    const kwdPrice = variant.prices.find((p) => p?.currency_code === "kwd");
    if (kwdPrice) {
      if (kwdPrice.raw_amount?.value != null) return Number(kwdPrice.raw_amount.value);
      if (kwdPrice.amount != null) return kwdPrice.amount;
    }
    
    // Get minimum price from any currency
    const validPrices = variant.prices
      .filter((p) => p && (p.raw_amount?.value != null || p.amount != null))
      .map((p) => p.raw_amount?.value != null ? Number(p.raw_amount.value) : p.amount);
    if (validPrices.length > 0) {
      return Math.min(...validPrices);
    }
  }
  
  return null;
}

export function getCheapestVariant(product: MedusaProduct | null | undefined): MedusaProductVariant | null {
  if (!product || !product.variants || product.variants.length === 0) return null;
  
  try {
    return product.variants.reduce((cheapest, v) => {
      if (!cheapest) return v;
      if (!v) return cheapest;
      
      const price = getLowestPrice(v);
      const cheapestPrice = getLowestPrice(cheapest);
      
      // If current variant has no price, skip it
      if (price === null) return cheapest;
      // If cheapest has no price, use current
      if (cheapestPrice === null) return v;
      // Otherwise compare
      return price < cheapestPrice ? v : cheapest;
    }, product.variants[0] || null);
  } catch (err) {
    console.error("Error getting cheapest variant:", err);
    return product.variants[0] || null;
  }
}

export function getProductPrice(product: MedusaProduct | null | undefined): number {
  if (!product) return 0;
  
  try {
    const variant = getCheapestVariant(product);
    if (!variant) return 0;
    
    const price = getLowestPrice(variant);
    return price ?? 0;
  } catch (err) {
    console.error("Error getting product price:", err);
    return 0;
  }
}
