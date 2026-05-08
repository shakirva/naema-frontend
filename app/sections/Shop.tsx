"use client";
import Image from "next/image";
import React, { useRef } from "react";
import Latest from "./Latest";
import Link from "next/link";
import Best from "./Best";
import ProductCarousel from "./ProductCarousel";
import { products } from "../constants";
import NewCollection from "./NewCollection";

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
    <section className="min-h-screen w-full bg-cream    pb-32">
      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-16 pt-16 max-lg:pt-8 max-lg:px-8 max-md:px-5">
        <div className="w-full flex justify-center">
          {" "}
          <h2 className="font-serif text-[clamp(2.5rem,4.4vw,4rem)] lg:text-center leading-none w-fit bg-gold/20 border border-gold/50 px-4 py-2 rounded-full ">
            Our Collection
          </h2>
        </div>

        <span className="lg:text-[18px] max-lg:hidden   tracking-tight leading-none lg:text-center mt-2 lg:mt-4">
          Shop by preference
        </span>
        <div className="flex justify-between lg:hidden items-center w-full">
          <span className="lg:text-[18px]   tracking-tight leading-none lg:text-center mt-2 lg:mt-4">
            Shop by preference
          </span>
          <Link
            href={"/shop"}
            className="text-sm text-black underline cursor-pointer"
          >
            view all
          </Link>
        </div>

        {/* Swipable on < lg, normal row on lg+ */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="lg:mt-24 mt-14 flex lg:flex-wrap gap-8 lg:justify-between lg:items-center
            overflow-x-auto lg:overflow-x-visible
            snap-x snap-mandatory lg:snap-none
            scrollbar-hide max-lg:cursor-grab max-lg:active:cursor-grabbing 
            pb-4 lg:pb-0   lg:mx-0 lg:px-0 "
        >
          {/* Dates */}
          <div className="flex flex-col gap-6 items-center justify-center flex-shrink-0 snap-center">
            <div className="w-[260px] h-[340px]  rounded-[999px] overflow-hidden border-3 border-gold">
              <Image
                src="/dbox.jpg"
                alt="Dates"
                width={260}
                height={340}
                className="w-full h-full object-cover "
              />
            </div>

            <p className="text-[24px] text-center text-black/80 tracking-tight font-medium ">
              Dates
            </p>
          </div>

          {/* Nuts */}
          <div className="flex flex-col gap-6 items-center justify-center flex-shrink-0 snap-center">
            <div className="w-[260px] h-[340px] rounded-[999px] overflow-hidden border-3 border-gold">
              <Image
                src="/nuts.jpg"
                alt="Nuts"
                width={260}
                height={340}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[24px] text-center text-black/80 tracking-tight font-medium">
              Nuts
            </p>
          </div>

          {/* Dry Fruits */}
          <div className="flex flex-col gap-6 items-center flex-shrink-0 snap-center">
            <div className="w-[260px] h-[340px] rounded-[999px] overflow-hidden border-3 border-gold">
              <Image
                src="/dry.jpg"
                alt="Dry Fruits"
                width={260}
                height={340}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[24px] text-center text-black/80 tracking-tight font-medium">
              Dry Fruits
            </p>
          </div>

          {/* Chocolates */}
          <div className="flex flex-col gap-6 items-center justify-center flex-shrink-0 snap-center">
            <div className="w-[260px] h-[340px] rounded-[999px] overflow-hidden border-3 border-gold">
              <Image
                src="/chocos.jpg"
                alt="Chocolates"
                width={260}
                height={340}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[24px] text-center text-black/80 tracking-tight font-medium">
              Chocolates
            </p>
          </div>
        </div>
      </div>

      <ProductCarousel
        title="Shop Our Latest Drops"
        description="From classic whole dates to gourmet stuffed varieties – find your perfect match."
        products={products.slice(0, 6)}
      />

      <ProductCarousel
        title="Shop Our Best Sellers"
        description="Our most loved products, trusted by thousands of customers."
        products={[...products]
          .sort((a, b) => b.reviews - a.reviews)
          .slice(0, 6)}
      />
      <div className="w-full flex items-center justify-center mt-12">
        <Link
          href={"/shop"}
          className="px-12 py-5 text-base font-medium  tracking-tight border-2 border-gold bg-navy rounded-full text-white w-fit"
        >
          Shop All Dates
        </Link>
      </div>
    </section>
  );
};

export default Shop;
