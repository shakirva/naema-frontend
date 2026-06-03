"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";
import type { MedusaProduct } from "@/lib/types";
import { getProductPrice, formatPrice, getCheapestVariant } from "@/lib/types";

const ProductCard = ({
  product,
  category,
}: {
  product: MedusaProduct;
  category?: string;
}) => {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const variant = getCheapestVariant(product);
  let price = getProductPrice(product) ?? 0;
  
  // Ensure price is valid
  if (typeof price !== 'number' || isNaN(price)) {
    price = 0;
  }

  const thumbnail = product.thumbnail || product.images?.[0]?.url || "/n1.jpg";
  const tags = product.tags?.map((t) => t?.value).filter(Boolean) ?? [];

  return (
    <div className="flex flex-col gap-3 group">
      <Link
        href={`/shop/${category || product.categories?.[0]?.handle || "all"}/${product.handle}`}
        className="flex flex-col gap-3"
      >
        {/* Image */}
        <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border-2 border-[#ccba78]">
          <Image
            src={thumbnail}
            alt={product.title || "Product"}
            fill
            className="object-cover group-hover:scale-[1.05] transition-all duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <IoMdStar
              key={i}
              size={14}
              color={i < 5 ? "#ccba78" : "#e5e5e5"}
            />
          ))}
          <span className="text-xs text-black/60 ml-0.5">
            (5)
          </span>
        </div>

        {/* Name */}
        <h3 className="text-[15px] font-medium leading-tight">
          {product.title || "Untitled Product"}
        </h3>

        {/* Tags */}
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
              {tag || "Tag"}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className="font-semibold text-[15px]">
          {formatPrice(price)}
        </p>
      </Link>

      {/* Button — outside Link so it doesn't navigate */}
      <button
        disabled={!variant}
        onClick={async () => {
          if (!variant) return;
          setAdded(true);
          setTimeout(() => setAdded(false), 1200);
          await addToCart(variant.id, 1);
        }}
        className="mt-auto relative rounded-full border-2 border-gold bg-gold/40 font-bold tracking-tight text-sm cursor-pointer group/btn overflow-hidden disabled:opacity-50"
      >
        <span className="block py-3 group-hover/btn:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
          {added ? "Added ✓" : "Add to Cart"}
        </span>
        <span className="block absolute inset-0 py-3 bg-navy text-white border-2 border-navy rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover/btn:scale-[1] group-hover/btn:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)] flex items-center justify-center">
          {added ? "Added ✓" : "Add to Cart"}
        </span>
      </button>
    </div>
  );
};

export default ProductCard;