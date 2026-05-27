"use client";

import { Product } from "@/app/constants";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";

const ProductCard = ({
  product,
  category,
}: {
  product: Product;
  category: string;
}) => {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col gap-3 group">
      <Link
        href={`/shop/${category}/${product.id}`}
        className="flex flex-col gap-3"
      >
        {/* Image */}
        <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border-2 border-[#ccba78]">
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
          <span className="text-xs text-black/60 ml-0.5">
            ({product.reviews})
          </span>
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
        <p className="font-semibold text-[15px]">
          ₹{product.price.toLocaleString()}
        </p>
      </Link>

      {/* Button — outside Link so it doesn't navigate */}
      <button
        onClick={() => {
          setAdded(true);
          setTimeout(() => setAdded(false), 1200);
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: "500g",
          });
        }}
        className="mt-auto relative rounded-full border-2 border-gold bg-gold/40 font-bold tracking-tight text-sm cursor-pointer group/btn overflow-hidden"
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