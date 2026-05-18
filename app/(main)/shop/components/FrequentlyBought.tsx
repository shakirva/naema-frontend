"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { getProducts } from "@/lib/api";
import type { MedusaProduct } from "@/lib/types";
import { formatPrice, getProductPrice, getCheapestVariant } from "@/lib/types";

const FrequentlyBought = ({ currentProductId }: { currentProductId: string }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<MedusaProduct[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await getProducts({ limit: 6 });
      // Filter out current product
      setProducts(res.products.filter((p) => p.id !== currentProductId).slice(0, 3));
    };
    load();
  }, [currentProductId]);

  if (products.length === 0) return null;

  return (
    <div className="max-w-[1440px] mx-auto mt-16">
      <h2 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] mb-8">
        Frequently Bought Together
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => {
          const variant = getCheapestVariant(p);
          const price = getProductPrice(p);
          const thumbnail = p.thumbnail || p.images?.[0]?.url || "/n1.jpg";

          return (
            <div
              key={p.id}
              className="flex gap-4 items-center border border-black/10 rounded-2xl p-4 bg-white"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={thumbnail}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-tight">{p.title}</p>
                <p className="text-sm font-semibold mt-1">
                  {formatPrice(price)}
                </p>
              </div>
              <button
                onClick={() => variant && addToCart(variant.id, 1)}
                disabled={!variant}
                className="px-4 py-2 rounded-full border-2 border-gold bg-gold/30 text-xs font-medium hover:bg-navy hover:text-white transition shrink-0 disabled:opacity-50"
              >
                Add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FrequentlyBought;