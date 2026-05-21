"use client";

import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { getCheapestVariant, getProductPrice, formatPrice } from "@/lib/types";
import type { MedusaProduct } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdStar, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const ProductCard = ({ product, category }: { product: MedusaProduct; category: string }) => {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const variant = getCheapestVariant(product);
  const price = getProductPrice(product);
  const thumbnail = product.thumbnail || product.images?.[0]?.url || "/n1.jpg";
  const tags = product.tags?.map((t) => t.value) ?? [];
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      handle: product.handle,
      price,
      categoryHandle: category,
    });
  };

  const handleAdd = async () => {
    if (!variant) return;
    setAdded(true);
    await addToCart(variant.id, 1);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="flex flex-col gap-3 group">
      {/* Clickable area → product page */}
      <Link href={`/shop/${category}/${product.handle}`} className="flex flex-col gap-3">
        {/* Image */}
        <div className="relative w-full h-[260px] rounded-2xl overflow-hidden">
          <Image
            src={thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-[1.05] transition-all duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* Wishlist heart */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
          >
            {wishlisted
              ? <IoMdHeart size={16} className="text-red-500" />
              : <IoMdHeartEmpty size={16} className="text-black/50" />}
          </button>
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
        </div>

        {/* Name */}
        <h3 className="text-[15px] font-medium leading-tight">
          {product.title}
        </h3>

        {/* Tags */}
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

        {/* Price */}
        <p className="font-semibold text-[15px]">
          {formatPrice(price)}
        </p>
      </Link>

      {/* Button — outside Link so it doesn't navigate */}
      <button
        onClick={handleAdd}
        disabled={!variant}
        className="mt-auto py-3 rounded-full border-2 hover:border-gold hover:bg-gold/40 hover:text-black text-sm font-medium bg-navy text-white transition-all duration-200 cursor-pointer disabled:opacity-50"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
