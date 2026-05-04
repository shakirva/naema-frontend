"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";

export type Product = {
  id: number;
  name: string;
  tags: string[];
  price: number;
  rating: number;
  reviews: number;
  image: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col gap-3 group">
      {/* Clickable area → product page */}
      <Link href={`/shop/${product.id}`} className="flex flex-col gap-3">
        {/* Image */}
        <div className="relative w-full h-[260px] rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
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
              color={i < Math.floor(product.rating) ? "#ccba78" : "#e5e5e5"}
            />
          ))}
          <span className="text-xs text-black/60 ml-0.5">({product.reviews})</span>
        </div>

        {/* Name */}
        <h3 className="text-[15px] font-medium leading-tight">{product.name}</h3>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {product.tags.map((tag, i) => (
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

        {/* Price */}
        <p className="font-semibold text-[15px]">₹{product.price.toLocaleString()}</p>
      </Link>

      {/* Button — outside Link so it doesn't navigate */}
      <button
        onClick={() => {
          setAdded(true);
          setTimeout(() => setAdded(false), 1200);
        }}
        className="mt-auto py-3 rounded-full border-2 border-gold bg-gold/40 text-sm font-medium hover:bg-navy hover:text-white transition-all duration-200 cursor-pointer"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;