"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "@/app/constants";

const FrequentlyBought = ({ currentId }: { currentId: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const SCROLL_AMOUNT = 320;

  const related = products.filter((p) => p.id !== currentId);

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
    <div className="mt-24 max-lg:mt-16">
      {/* Header */}
      <h2 className="font-serif text-[clamp(2rem,3.33vw,3rem)] leading-none">
        Frequently Bought Together
      </h2>
      <div className="flex items-end justify-between mb-8 mt-2">
        <p className="text-[16px] max-md:text-sm text-black/60 tracking-tight">
          Customers who bought this also loved these.
        </p>

        {/* Desktop arrow controls — plain, no animation */}
        <div className="flex items-center gap-2 shrink-0 ml-8 max-md:hidden">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer
              ${canScrollLeft ? "bg-navy border-navy" : "bg-white border-gold cursor-not-allowed"}`}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer
              ${canScrollRight ? "bg-navy border-navy" : "bg-white border-gold cursor-not-allowed"}`}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
          </button>
        </div>
      </div>

      {/* Scrollable row + mobile overlay arrows */}
      <div className="relative">
        {/* Mobile left arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`md:hidden absolute left-2 top-[128px] -translate-y-1/2 z-10 w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer
            ${canScrollLeft ? "bg-navy border-navy" : "bg-white/80 border-gold cursor-not-allowed"}`}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
        </button>

        {/* Mobile right arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`md:hidden absolute right-2 top-[128px] -translate-y-1/2 z-10 w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer
            ${canScrollRight ? "bg-navy border-navy" : "bg-white/80 border-gold cursor-not-allowed"}`}
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory max-md:px-[7vw]"
        >
          {related.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[310px] max-md:w-[85vw] snap-center"
            >
              <ProductCard product={product} category={product.category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrequentlyBought;