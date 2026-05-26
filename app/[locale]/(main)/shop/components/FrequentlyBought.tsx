"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";
import type { MedusaProduct } from "@/lib/types";

const FrequentlyBought = ({ currentId }: { currentId: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [related, setRelated] = useState<MedusaProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const SCROLL_AMOUNT = 320;

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      try {
        const res = await getProducts({ limit: 10 });
        setRelated(res.products.filter(p => p.id !== currentId));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [currentId]);

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

  if (loading || related.length === 0) return null;

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
              ${
                canScrollLeft
                  ? "bg-navy border-navy active:shadow-none"
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
            aria-label="Scroll right"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer
              ${
                canScrollRight
                  ? "bg-navy border-navy active:shadow-none"
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

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {related.map((product) => {
          const category = product.categories?.[0]?.handle || "all";
          return (
            <div
              key={product.id}
              className="flex-none w-[280px] max-md:w-[240px]"
            >
              <ProductCard product={product} category={category} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FrequentlyBought;
