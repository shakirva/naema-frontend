"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { MedusaProduct, formatKWD, getKWDPrice } from "@/lib/types";

/* ------------------ STAR RATING ------------------ */
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => {
      const filled = rating >= star;
      return (
        <svg key={star} className="w-4 h-4" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.77l-4.78 2.43.91-5.32L2.27 7.12l5.34-.78L10 1.5z"
            fill={filled ? "#ccba78" : "#D1D5DB"}
          />
        </svg>
      );
    })}
  </div>
);

/* ------------------ CARD ------------------ */
const CarouselCard = ({ product }: { product: MedusaProduct }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  // Pick the first (cheapest) variant — 250g
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant ? getKWDPrice(defaultVariant) : null;

  // Derive category slug from product handle (handle IS the slug: pista, walnut, etc.)
  const categorySlug = product.handle ?? "pista";

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!defaultVariant) return;
    await addToCart(defaultVariant.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={`/shop/${categorySlug}/${product.id}`}
      className="flex-none w-[296px] max-md:w-[240px] flex flex-col gap-3 group"
    >
      {/* Image */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-black/10 bg-cream">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-[1.1] transition-all duration-300 ease-in-out"
            sizes="296px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/20 text-sm">No image</div>
        )}
      </div>

      {/* Rating (static for now) */}
      <div className="flex items-center gap-1.5">
        <StarRating rating={5} />
        <span className="text-sm font-semibold text-gold underline underline-offset-2">(4.9)</span>
      </div>

      {/* Name */}
      <h3 className="font-medium text-[20px] capitalize tracking-tight leading-tight text-black line-clamp-2">
        {product.title}
      </h3>

      {/* Tags / variants */}
      <div className="flex flex-wrap gap-2">
        {product.variants?.map((v, i) => (
          <span
            key={v.id}
            className={`px-2 py-0.5 leading-none text-xs font-medium border border-black/60 rounded-full text-black/80 ${
              i === 0 ? "bg-gold/60" : "bg-white"
            }`}
          >
            {v.title}
          </span>
        ))}
      </div>

      {/* Price */}
      <p className="font-bold text-lg text-black">
        {price !== null ? `From ${formatKWD(price)}` : "–"}
      </p>

      {/* Button */}
      <button
        onClick={handleAdd}
        className="w-full py-3.5 rounded-full border-2 border-gold bg-gold/40 font-bold tracking-tight text-sm hover:border-navy hover:bg-navy hover:text-white transition-all duration-200 cursor-pointer"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </Link>
  );
};

/* ------------------ CAROUSEL ------------------ */
type Props = {
  title: string;
  description?: string;
  products: MedusaProduct[];
};

const ProductCarousel = ({ title, description, products }: Props) => {
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

  if (!products.length) return null;

  return (
    <div className="mt-32 max-lg:mt-24 max-md:mt-12">
      <h2 className="font-serif text-[clamp(2rem,3.33vw,3rem)] leading-none">{title}</h2>

      <div className="flex items-end justify-between mb-8">
        {description && (
          <p className="mt-2 text-[16px] max-md:text-sm text-black/80 tracking-tight">{description}</p>
        )}
        <div className="flex items-center gap-2 shrink-0 ml-8 max-md:hidden">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer ${
              canScrollLeft ? "bg-navy border-navy" : "bg-white border-gold cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer ${
              canScrollRight ? "bg-navy border-navy" : "bg-white border-gold cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <CarouselCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
