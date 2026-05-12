"use client";
import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import ProductCarousel from "./ProductCarousel";
import { products } from "../constants";

const Shop = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    el.dataset.dragging = "true";
    el.dataset.startX = String(e.pageX - el.offsetLeft);
    el.dataset.scrollLeft = String(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el || el.dataset.dragging !== "true") return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - Number(el.dataset.startX);
    el.scrollLeft = Number(el.dataset.scrollLeft) - walk;
  };

  const handleMouseUp = () => {
    if (scrollRef.current) scrollRef.current.dataset.dragging = "false";
  };

  return (
    <section className="min-h-screen w-full bg-cream pb-16 lg:pb-32">

      <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3.5rem)] text-center px-5 md:px-8 lg:px-16 pt-10 lg:pt-16 leading-tight">
        A great box starts with carefully selected dates,
        <br className="hidden md:block" /> roasted nuts, and rich artisan chocolate.
      </h1>

      <ProductCarousel
        title="Shop Our Best Sellers"
        description="Our most loved products, trusted by thousands of customers."
        products={[...products]
          .sort((a, b) => b.reviews - a.reviews)
          .slice(0, 6)}
      />

      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 pt-10 lg:pt-16">

        <div className="w-full flex justify-center mt-10 lg:mt-20">
          <h2 className="font-serif text-[clamp(2rem,4.4vw,4rem)] lg:text-center leading-none w-fit bg-gold/20 border border-gold/50 rounded-lg px-4 py-2">
            Our Collection
          </h2>
        </div>

        <span className="hidden lg:block text-[18px] tracking-tight leading-none text-center mt-2 lg:mt-4">
          Shop by preference
        </span>

        <div className="flex justify-between lg:hidden items-center w-full mt-2">
          <span className="text-base tracking-tight leading-none">
            Shop by preference
          </span>
          <Link href="/shop" className="text-sm text-black underline">
            view all
          </Link>
        </div>

        {/* Swipeable on mobile, row on desktop */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="mt-10 lg:mt-24 flex gap-5 md:gap-8
            lg:flex-wrap lg:justify-between lg:items-center
            overflow-x-auto lg:overflow-x-visible
            snap-x snap-mandatory lg:snap-none
            scrollbar-hide cursor-grab active:cursor-grabbing lg:cursor-default
            pb-4 lg:pb-0
            -mx-5 px-5 md:-mx-8 md:px-8 lg:mx-0 lg:px-0"
        >
          {[
            { src: "/dbox.jpg", label: "Dates" },
            { src: "/nuts.jpg", label: "Nuts" },
            { src: "/dry.jpg", label: "Dry Fruits" },
            { src: "/chocos.jpg", label: "Chocolates" },
          ].map(({ src, label }) => (
            <div
              key={label}
              className="flex flex-col gap-4 lg:gap-6 items-center justify-center flex-shrink-0 snap-center"
            >
              <div className="w-[200px] h-[260px] md:w-[230px] md:h-[300px] lg:w-[260px] lg:h-[340px] rounded-[999px] overflow-hidden border-3 border-gold">
                <Image
                  src={src}
                  alt={label}
                  width={260}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[20px] lg:text-[24px] text-center text-black/80 tracking-tight font-medium">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ProductCarousel
        title="Shop Our Latest Drops"
        description="From classic whole dates to gourmet stuffed varieties – find your perfect match."
        products={products.slice(0, 6)}
      />

      <div className="w-full flex items-center justify-center mt-10 lg:mt-12">
        <Link
          href="/shop"
          className="px-8 md:px-12 py-4 md:py-5 text-base font-medium tracking-tight border-2 border-gold bg-navy rounded-full text-white"
        >
          Shop All Dates
        </Link>
      </div>

    </section>
  );
};

export default Shop;