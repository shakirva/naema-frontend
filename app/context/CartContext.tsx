"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import medusa from "@/lib/medusa";
import { MedusaCart, MedusaLineItem, formatKWD } from "@/lib/types";

// ─── Kuwait region ID ─────────────────────────────────────────────────────────
const KUWAIT_REGION_ID = "reg_01KQVDZRC5V1R8SKYCN644H08T";
const CART_ID_KEY = "medusa_cart_id";

// ─── Context shape ─────────────────────────────────────────────────────────────
type CartContextType = {
  cart: MedusaCart | null;
  items: MedusaLineItem[];
  isOpen: boolean;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQty: (lineItemId: string, quantity: number) => Promise<void>;
  totalFormatted: string;
  itemCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<MedusaCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Initialise or rehydrate cart ──────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const storedId = localStorage.getItem(CART_ID_KEY);
      if (storedId) {
        try {
          const { cart: existing } = await medusa.store.cart.retrieve(storedId);
          setCart(existing as unknown as MedusaCart);
          return;
        } catch {
          localStorage.removeItem(CART_ID_KEY);
        }
      }
      try {
        const { cart: fresh } = await medusa.store.cart.create({
          region_id: KUWAIT_REGION_ID,
        });
        localStorage.setItem(CART_ID_KEY, fresh.id);
        setCart(fresh as unknown as MedusaCart);
      } catch (err) {
        console.error("Failed to create Medusa cart:", err);
      }
    };
    init();
  }, []);

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cart?.id) return cart.id;
    const { cart: fresh } = await medusa.store.cart.create({
      region_id: KUWAIT_REGION_ID,
    });
    localStorage.setItem(CART_ID_KEY, fresh.id);
    setCart(fresh as unknown as MedusaCart);
    return fresh.id;
  }, [cart]);

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      setLoading(true);
      try {
        const cartId = await ensureCart();
        const { cart: updated } = await medusa.store.cart.createLineItem(
          cartId,
          { variant_id: variantId, quantity }
        );
        setCart(updated as unknown as MedusaCart);
        setIsOpen(true);
      } catch (err) {
        console.error("addToCart error:", err);
      } finally {
        setLoading(false);
      }
    },
    [ensureCart]
  );

  const removeFromCart = useCallback(
    async (lineItemId: string) => {
      if (!cart?.id) return;
      setLoading(true);
      try {
        const { cart: updated } = await medusa.store.cart.deleteLineItem(
          cart.id,
          lineItemId
        );
        setCart(updated as unknown as MedusaCart);
      } catch (err) {
        console.error("removeFromCart error:", err);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const updateQty = useCallback(
    async (lineItemId: string, quantity: number) => {
      if (!cart?.id) return;
      if (quantity < 1) {
        await removeFromCart(lineItemId);
        return;
      }
      setLoading(true);
      try {
        const { cart: updated } = await medusa.store.cart.updateLineItem(
          cart.id,
          lineItemId,
          { quantity }
        );
        setCart(updated as unknown as MedusaCart);
      } catch (err) {
        console.error("updateQty error:", err);
      } finally {
        setLoading(false);
      }
    },
    [cart, removeFromCart]
  );

  const items = (cart?.items ?? []) as MedusaLineItem[];
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const totalFormatted = cart ? formatKWD(cart.total ?? 0) : "KD 0.000";

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        isOpen,
        loading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeFromCart,
        updateQty,
        totalFormatted,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
