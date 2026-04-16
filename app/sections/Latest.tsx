"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
  id: number;
  name: string;
  tags: string[];
  price: string;
  rating: number;
  reviewCount: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Soft Rutab Medjool Dates",
    tags: ["Ripe and Gooey", "GF"],
    price: "$34.99",
    rating: 5,
    reviewCount: 2672,
    image: "/images/dates/soft-rutab.jpg",
  },
  {
    id: 2,
    name: "Fancy Tight-Skinned  Dates",
    tags: ["Firmer Chewier Bite", "GF"],
    price: "$29.99",
    rating: 4.5,
    reviewCount: 693,
    image: "/images/dates/fancy-tight.jpg",
  },
  {
    id: 3,
    name: "Zahidi Dates",
    tags: ["Subtle Sweetness", "GF"],
    price: "$39.99",
    rating: 4,
    reviewCount: 57,
    image: "/images/dates/zahidi.jpg",
  },
  {
    id: 4,
    name: "Dayri Dates",
    tags: ["Healthy Honey", "GF"],
    price: "$43.99",
    rating: 5,
    reviewCount: 11,
    image: "/images/dates/dayri.jpg",
  },
  {
    id: 5,
    name: "Medjool Date Sampler Box",
    tags: ["Best Value", "GF"],
    price: "$49.99",
    rating: 5,
    reviewCount: 312,
    image: "/images/dates/sampler.jpg",
  },
  {
    id: 6,
    name: "Organic Medjool Dates",
    tags: ["Certified Organic", "GF"],
    price: "$38.99",
    rating: 4.5,
    reviewCount: 148,
    image: "/images/dates/organic.jpg",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {filled ? (
              <path
                d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.77l-4.78 2.43.91-5.32L2.27 7.12l5.34-.78L10 1.5z"
                fill="#F59E0B"
              />
            ) : half ? (
              <>
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.77l-4.78 2.43.91-5.32L2.27 7.12l5.34-.78L10 1.5z"
                  fill={`url(#half-${star})`}
                />
              </>
            ) : (
              <path
                d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.77l-4.78 2.43.91-5.32L2.27 7.12l5.34-.78L10 1.5z"
                fill="#D1D5DB"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex-none w-72 flex flex-col gap-3">
      {/* Image */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="288px"
        />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <StarRating rating={product.rating} />
        <span className="text-sm font-semibold text-amber-600 underline underline-offset-2 cursor-pointer">
          ({product.reviewCount.toLocaleString()})
        </span>
      </div>

      {/* Name */}
      <h3 className="font-extrabold text-base uppercase tracking-tight leading-tight text-zinc-900 line-clamp-2">
        {product.name}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-0.5 text-xs font-semibold uppercase tracking-wide border border-zinc-800 rounded-full text-zinc-700 bg-white"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Price */}
      <p className="font-bold text-lg text-zinc-900">{product.price}</p>

      {/* Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-3.5 rounded-full border-2 border-black font-extrabold uppercase tracking-wide text-sm transition-all duration-200 cursor-pointer
          ${
            added
              ? "bg-amber-500 text-white shadow-none translate-y-[2px]"
              : "bg-[#F5F0E8] text-zinc-900 hover:bg-amber-500 hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px]"
          }`}
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
};

const Latest = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const SCROLL_AMOUNT = 320;

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  return (
    <div className="mt-32 bg-white">
      {/* Header row */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className=" font-serif text-[48px]  leading-none">
            Shop Our Latest drops
          </h2>
          <p className="mt-2  text-[16px] text-black/80 tracking-tight">
            From classic whole dates to gourmet stuffed varieties – find your perfect date match.
          </p>
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-2 shrink-0 ml-8">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`w-11 h-11 rounded-full border border-black/50 flex items-center justify-center transition-all duration-150 cursor-pointer
              ${
                canScrollLeft
                  ? "bg-zinc-900 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:bg-amber-500 hover:border-amber-500 active:shadow-none active:translate-y-px"
                  : "bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed"
              }`}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`w-11 h-11 rounded-full border- border-black/50 flex items-center justify-center transition-all duration-150 cursor-pointer
              ${
                canScrollRight
                  ? "bg-zinc-900 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:bg-amber-500 hover:border-amber-500 active:shadow-none active:translate-y-px"
                  : "bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed"
              }`}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Latest;