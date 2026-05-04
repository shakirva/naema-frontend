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

  // Filter out the current product so it doesn't show itself
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

        {/* Arrow Controls */}
        <div className="flex items-center gap-2 shrink-0 ml-8 max-md:hidden">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer
              ${canScrollLeft
                ? "bg-navy border-navy active:shadow-none"
                : "bg-white border-gold cursor-not-allowed"
              }`}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer
              ${canScrollRight
                ? "bg-navy border-navy active:shadow-none"
                : "bg-white border-gold cursor-not-allowed"
              }`}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} color="#ccba78" />
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {related.map((product) => (
          <div key={product.id} className="flex-none w-[280px] max-md:w-[240px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyBought;