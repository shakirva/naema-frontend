"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

type WishlistItem = {
  id: string;
  title: string;
  thumbnail: string | null;
  handle: string;
  price: number;
  categoryHandle?: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextType | null>(null);
const WISHLIST_KEY = "naema_wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch (_) {}
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const isWishlisted = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.filter((i) => i.id !== item.id);
      return [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <WishlistContext.Provider
      value={{ items, isWishlisted, toggleWishlist, removeFromWishlist, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
