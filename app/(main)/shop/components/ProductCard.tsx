"use client";

import { MedusaProduct, getKWDPrice, formatKWD } from "@/lib/types";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";

const ProductCard = ({
  product,
  category,
}: {
  product: MedusaProduct;
  category?: string;
}) => {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  // Default variant = first one (250g)
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant ? getKWDPrice(defaultVariant) : null;
  const image = product.thumbnail ?? product.images?.[0]?.url ?? "/n1.jpg";
  const tags = product.tags?.map((t) => t.value) ?? [];
  // Fall back to product handle when no category is passed (e.g. FrequentlyBought)
  const slug = category ?? product.handle ?? "pista";

  const handleAdd = async () => {
    if (!defaultVariant) return;
    setAdded(true);
    await addToCart(defaultVariant.id, 1);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="flex flex-col gap-3 group">
      <Link href={`/shop/${slug}/${product.id}`} className="flex flex-col gap-3">
        <div className="relative w-full h-[260px] rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-[1.05] transition-all duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        {/* Stars placeholder */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <IoMdStar key={i} size={14} color={i < 4 ? "#ccba78" : "#e5e5e5"} />
          ))}
        </div>

        <h3 className="text-[15px] font-medium leading-tight">{product.title}</h3>

        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className={`text-[10px] px-2 py-1 rounded-full border ${
                  i === 0
                    ? "bg-gold/60 border-gold text-navy"
                    : "border-black/20 text-black/70"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="font-semibold text-[15px]">
          {price !== null ? formatKWD(price) : "—"}
        </p>
      </Link>

      <button
        onClick={handleAdd}
        disabled={!defaultVariant}
        className="mt-auto py-3 rounded-full border-2 hover:border-gold hover:bg-gold/40 hover:text-black text-sm font-medium bg-navy text-white transition-all duration-200 cursor-pointer disabled:opacity-40"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
