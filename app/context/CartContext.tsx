"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  createCart,
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
} from "@/lib/api";
import type { MedusaCart, MedusaLineItem } from "@/lib/types";

type CartContextType = {
  cart: MedusaCart | null;
  items: MedusaLineItem[];
  isOpen: boolean;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQty: (lineItemId: string, qty: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
  total: number;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_ID_KEY = "medusa_cart_id";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<MedusaCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Initialize or restore cart
  const initCart = useCallback(async () => {
    try {
      const storedId = localStorage.getItem(CART_ID_KEY);
      if (storedId) {
        const existing = await getCart(storedId);
        if (existing) {
          setCart(existing);
          return;
        }
      }
      // Create new cart
      const newCart = await createCart();
      if (newCart) {
        localStorage.setItem(CART_ID_KEY, newCart.id);
        setCart(newCart);
      }
    } catch (err) {
      console.error("Cart init failed:", err);
    }
  }, []);

  useEffect(() => {
    initCart();
  }, [initCart]);

  const refreshCart = useCallback(async () => {
    if (!cart?.id) return;
    const updated = await getCart(cart.id);
    if (updated) setCart(updated);
  }, [cart?.id]);

  const clearCart = useCallback(() => {
    localStorage.removeItem(CART_ID_KEY);
    setCart(null);
  }, []);

  const addToCart = async (variantId: string, quantity: number = 1) => {
    if (!cart?.id) {
      await initCart();
    }
    const cartId = cart?.id || localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;

    setLoading(true);
    try {
      let updated = await addItemToCart(cartId, variantId, quantity);
      
      // Self-healing: If adding fails (e.g. cart expired or invalid region), create a new cart
      if (!updated) {
        const newCart = await createCart();
        if (newCart) {
          localStorage.setItem(CART_ID_KEY, newCart.id);
          updated = await addItemToCart(newCart.id, variantId, quantity);
        }
      }

      if (updated) {
        setCart(updated);
        setIsOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (lineItemId: string) => {
    if (!cart?.id) return;
    setLoading(true);
    try {
      const updated = await removeCartItem(cart.id, lineItemId);
      if (updated) setCart(updated);
    } finally {
      setLoading(false);
    }
  };

  const updateQty = async (lineItemId: string, qty: number) => {
    if (!cart?.id) return;
    if (qty < 1) return removeFromCart(lineItemId);
    setLoading(true);
    try {
      const updated = await updateCartItem(cart.id, lineItemId, qty);
      if (updated) setCart(updated);
    } finally {
      setLoading(false);
    }
  };

  const items = cart?.items ?? [];
  const total = cart?.total ?? 0;
  const subtotal = cart?.subtotal ?? 0;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        isOpen,
        loading,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQty,
        refreshCart,
        clearCart,
        total,
        subtotal,
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