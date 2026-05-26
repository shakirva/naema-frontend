import medusa, { MEDUSA_BACKEND_URL } from "./medusa";
import type { MedusaProduct, MedusaProductCategory, MedusaCart } from "./types";

// ─── Products ─────────────────────────────────────────────────────────────

const KUWAIT_REGION_ID = process.env.NEXT_PUBLIC_KUWAIT_REGION_ID || "reg_01KRK1KY4AJAE7SECNRDMJN2S2";

export async function getProducts(options?: {
  limit?: number;
  offset?: number;
  category_id?: string[];
  collection_id?: string[];
  order?: string;
  q?: string;
}): Promise<{ products: MedusaProduct[]; count: number }> {
  try {
    const params: Record<string, unknown> = {
      limit: options?.limit ?? 50,
      offset: options?.offset ?? 0,
      category_id: options?.category_id,
      collection_id: options?.collection_id,
      order: options?.order,
      region_id: KUWAIT_REGION_ID,
      fields: "+variants.calculated_price,+variants.prices,+images,+categories,+tags,+collection,+metadata",
    };
    if (options?.q) params.q = options.q;
    const res = await medusa.store.product.list(params);
    return {
      products: (res.products ?? []) as unknown as MedusaProduct[],
      count: res.count ?? 0,
    };
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return { products: [], count: 0 };
  }
}

export async function getProductByHandle(handle: string): Promise<MedusaProduct | null> {
  try {
    const res = await medusa.store.product.list({
      handle,
      region_id: KUWAIT_REGION_ID,
      fields: "+variants.calculated_price,+variants.prices,+images,+categories,+tags,+collection,+metadata",
      limit: 1,
    });
    const products = (res.products ?? []) as unknown as MedusaProduct[];
    return products[0] ?? null;
  } catch (err) {
    console.error("Failed to fetch product by handle:", err);
    return null;
  }
}

export async function getProductById(id: string): Promise<MedusaProduct | null> {
  try {
    const res = await medusa.store.product.retrieve(id, {
      region_id: KUWAIT_REGION_ID,
      fields: "+variants.calculated_price,+variants.prices,+images,+categories,+tags,+collection,+metadata",
    });
    return (res.product ?? null) as unknown as MedusaProduct | null;
  } catch (err) {
    console.error("Failed to fetch product by ID:", err);
    return null;
  }
}

// ─── Categories ───────────────────────────────────────────────────────────

export async function getCategories(): Promise<MedusaProductCategory[]> {
  try {
    const res = await medusa.store.category.list({
      fields: "+category_children,+metadata",
      include_descendants_tree: true,
    });
    return (res.product_categories ?? []) as unknown as MedusaProductCategory[];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
}

export async function getCategoryByHandle(handle: string): Promise<MedusaProductCategory | null> {
  try {
    const res = await medusa.store.category.list({
      handle,
      fields: "+category_children,+metadata",
    });
    const cats = (res.product_categories ?? []) as unknown as MedusaProductCategory[];
    return cats[0] ?? null;
  } catch (err) {
    console.error("Failed to fetch category:", err);
    return null;
  }
}

// ─── Cart ─────────────────────────────────────────────────────────────────

export async function createCart(): Promise<MedusaCart | null> {
  try {
    const res = await medusa.store.cart.create({
      region_id: KUWAIT_REGION_ID,
    });
    return (res.cart ?? null) as unknown as MedusaCart | null;
  } catch (err) {
    console.error("Failed to create cart:", err);
    return null;
  }
}

export async function getCart(cartId: string): Promise<MedusaCart | null> {
  try {
    const res = await medusa.store.cart.retrieve(cartId);
    return (res.cart ?? null) as unknown as MedusaCart | null;
  } catch (err) {
    console.error("Failed to get cart:", err);
    return null;
  }
}

export async function addItemToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1,
): Promise<MedusaCart | null> {
  try {
    const res = await medusa.store.cart.createLineItem(cartId, {
      variant_id: variantId,
      quantity,
    });
    return (res.cart ?? null) as unknown as MedusaCart | null;
  } catch (err) {
    console.error("Failed to add item to cart:", err);
    return null;
  }
}

export async function updateCartItem(
  cartId: string,
  lineItemId: string,
  quantity: number,
): Promise<MedusaCart | null> {
  try {
    const res = await medusa.store.cart.updateLineItem(cartId, lineItemId, {
      quantity,
    });
    return (res.cart ?? null) as unknown as MedusaCart | null;
  } catch (err) {
    console.error("Failed to update cart item:", err);
    return null;
  }
}

export async function removeCartItem(
  cartId: string,
  lineItemId: string,
): Promise<MedusaCart | null> {
  try {
    const res = await medusa.store.cart.deleteLineItem(cartId, lineItemId);
    return (res.cart ?? null) as unknown as MedusaCart | null;
  } catch (err) {
    console.error("Failed to remove cart item:", err);
    return null;
  }
}

export async function updateCart(
  cartId: string,
  data: {
    email?: string;
    shipping_address?: Record<string, string>;
    billing_address?: Record<string, string>;
  },
): Promise<MedusaCart | null> {
  try {
    const res = await medusa.store.cart.update(cartId, data);
    return (res.cart ?? null) as unknown as MedusaCart | null;
  } catch (err) {
    console.error("Failed to update cart:", err);
    return null;
  }
}

export async function getShippingOptions(cartId: string): Promise<MedusaShippingOption[]> {
  try {
    const res = await medusa.store.fulfillment.listCartOptions({ cart_id: cartId });
    const opts = (res.shipping_options ?? []) as unknown as MedusaShippingOption[];
    return opts.filter(o => typeof o.amount === 'number');
  } catch (err) {
    console.error("Failed to get shipping options:", err);
    return [];
  }
}

export async function addShippingMethod(
  cartId: string,
  optionId: string,
): Promise<MedusaCart | null> {
  try {
    const res = await medusa.store.cart.addShippingMethod(cartId, {
      option_id: optionId,
    });
    return (res.cart ?? null) as unknown as MedusaCart | null;
  } catch (err) {
    console.error("Failed to add shipping method:", err);
    return null;
  }
}

export async function initiatePaymentSession(
  cartId: string,
): Promise<MedusaCart | null> {
  try {
    const cart = await getCart(cartId);
    if (!cart) return null;

    let pColId = cart.payment_collection?.id;
    
    // 1. Create payment collection if missing
    if (!pColId) {
      const res = await fetch(`${MEDUSA_BACKEND_URL}/store/payment-collections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        body: JSON.stringify({ cart_id: cartId }),
      }).then(r => r.json());
      
      pColId = res.payment_collection?.id;
    }

    if (!pColId) throw new Error("Failed to create payment collection");

    // 2. Initiate session
    await fetch(`${MEDUSA_BACKEND_URL}/store/payment-collections/${pColId}/payment-sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      },
      body: JSON.stringify({ provider_id: "pp_system_default" }),
    });

    return getCart(cartId);
  } catch (err) {
    console.error("Failed to initiate payment session:", err);
    return null;
  }
}

export async function completeCart(cartId: string): Promise<unknown> {
  try {
    const res = await medusa.store.cart.complete(cartId);
    return res;
  } catch (err) {
    console.error("Failed to complete cart:", err);
    return null;
  }
}

// ─── Collections ──────────────────────────────────────────────────────────

export async function getCollections() {
  try {
    const res = await medusa.store.collection.list({});
    return (res.collections ?? []) as unknown as { id: string; title: string; handle: string; metadata?: any }[];
  } catch (err) {
    console.error("Failed to fetch collections:", err);
    return [];
  }
}

export async function getCollectionByHandle(handle: string) {
  try {
    const res = await medusa.store.collection.list({ handle });
    return (res.collections?.[0] ?? null) as unknown as { id: string; title: string; handle: string; metadata?: any } | null;
  } catch (err) {
    console.error("Failed to fetch collection by handle:", err);
    return null;
  }
}

// Type import for shipping options
type MedusaShippingOption = {
  id: string;
  name: string;
  amount: number;
  provider_id: string;
};
