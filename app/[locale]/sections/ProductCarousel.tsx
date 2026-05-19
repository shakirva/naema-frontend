"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/app/constants";
import { useCart } from "@/app/context/CartContext";

/* ------------------ STAR RATING ------------------ */

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => {
      const filled = rating >= star;
      const half = !filled && rating >= star - 0.5;

      return (
        <svg key={star} className="w-4 h-4" viewBox="0 0 20 20" fill="none">
          {filled ? (
            <path
              d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.77l-4.78 2.43.91-5.32L2.27 7.12l5.34-.78L10 1.5z"
              fill="#ccba78"
            />
          ) : half ? (
            <>
              <defs>
                <linearGradient id={`half-${star}`}>
                  <stop offset="50%" stopColor="#ccba78" />
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

/* ------------------ CARD ------------------ */

const CarouselCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "500g",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <Link
      href={`/shop/${product.category}/${product.id}`}
      className="flex-none w-[296px] max-md:w-[85vw] flex flex-col gap-3 group snap-center"
    >
      {/* IMAGE */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-black/10 bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.05] transition-all duration-500 ease-out"
          sizes="296px"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {product.badge && (
            <span
              className={`text-[10px] font-medium uppercase leading-none px-3 py-1 rounded-full ${
                product.badge === "New"
                  ? "bg-[#e6f2d7] text-black"
                  : product.badge === "Limited"
                    ? "bg-navy text-cream"
                    : product.badge === "Best Seller"
                      ? "bg-gold text-black"
                      : "bg-[#b63f3f] text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* DISCOUNT */}
        {product.originalPrice && discount && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-navy text-cream rounded-full w-14 h-14 flex flex-col items-center justify-center border border-gold">
              <span className="text-[12px] leading-none font-bold">
                {discount}%
              </span>
              <span className="text-[8px] leading-none uppercase mt-0.5">
                Off
              </span>
            </div>
          </div>
        )}

        {/* BOTTOM STOCK TAG */}
        {product.featured && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="bg-cream/90 backdrop-blur-sm text-black text-[10px] font-medium px-3 py-1 rounded-full border border-black/10">
              Limited Stock
            </span>
          </div>
        )}
      </div>

      {/* RATING */}
      <div className="flex items-center gap-1.5">
        <StarRating rating={product.rating} />
        <span className="text-sm font-semibold text-gold underline underline-offset-2">
          ({product.reviews.toLocaleString()})
        </span>
      </div>

      {/* NAME */}
      <h3 className="font-medium text-[20px] capitalize tracking-tight leading-tight text-black line-clamp-2">
        {product.name}
      </h3>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag, i) => (
          <span
            key={tag}
            className={`px-2 py-0.5 leading-none text-xs font-medium border border-black/20 rounded-full text-black/80 ${
              i === 0 ? "bg-gold/40" : "bg-white"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* PRICE */}
      <div className="flex items-end gap-2">
        <p className="font-bold text-xl text-black">
          ₹{product.price.toLocaleString()}
        </p>
        {product.originalPrice && (
          <span className="text-black/35 line-through text-sm pb-[2px]">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleAdd}
        className="w-full relative rounded-full border-2 border-gold bg-gold/40 font-bold tracking-tight text-sm cursor-pointer group overflow-hidden"
      >
        <span className="block py-3.5 group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
          {added ? "Added ✓" : "Add to Cart"}
        </span>
        <span className="block absolute inset-0 py-3.5 bg-navy text-white border-2 border-navy rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
          {added ? "Added ✓" : "Add to Cart"}
        </span>
      </button>
    </Link>
  );
};

/* ------------------ CAROUSEL ------------------ */

type Props = {
  title: string;
  description?: string;
  products: Product[];
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
    el.scrollBy({
      left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 350);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-16 pt-40 max-lg:px-8 max-lg:pt-20 max-md:px-0">
      {/* HEADING */}
      <h2 className="font-serif w-fit text-[clamp(2rem,3.33vw,3rem)] leading-none bg-gold/20 border border-gold/50 rounded-lg px-4 py-2 max-md:mx-5">
        {title}
      </h2>

      {/* TOP ROW */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8  max-md:mt-4 max-md:px-5">
        {/* DESCRIPTION */}
        {description && (
          <p className="text-[16px] max-md:text-sm text-black/80 tracking-tight max-w-[700px]">
            {description}
          </p>
        )}

        {/* DESKTOP ARROWS — hidden on mobile */}
        <div className="max-md:hidden flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer ${
              canScrollLeft
                ? "bg-navy border-navy"
                : "bg-white border-gold cursor-not-allowed"
            }`}
          >
            <ChevronLeft
              className="w-5 h-5"
              strokeWidth={2.5}
              color="#ccba78"
            />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer ${
              canScrollRight
                ? "bg-navy border-navy"
                : "bg-white border-gold cursor-not-allowed"
            }`}
          >
            <ChevronRight
              className="w-5 h-5"
              strokeWidth={2.5}
              color="#ccba78"
            />
          </button>
        </div>
      </div>

      {/* PRODUCTS + MOBILE OVERLAY ARROWS */}
      <div className="relative">
        {/* Mobile left arrow — centered vertically on card image */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`md:hidden absolute left-2 top-[calc(128px)] -translate-y-1/2 z-10 w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer
            ${canScrollLeft ? "bg-navy border-navy" : "bg-white/80 border-gold cursor-not-allowed"}`}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
        </button>

        {/* Mobile right arrow — centered vertically on card image */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`md:hidden absolute right-2 top-[calc(128px)] -translate-y-1/2 z-10 w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer
            ${canScrollRight ? "bg-navy border-navy" : "bg-white/80 border-gold cursor-not-allowed"}`}
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
        </button>

        {/* SCROLLABLE ROW */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory max-md:px-[7vw]"
        >
          {products.map((product) => (
            <CarouselCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
