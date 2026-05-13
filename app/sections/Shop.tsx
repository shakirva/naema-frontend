"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import ProductCarousel from "./ProductCarousel";
import { MedusaProduct } from "@/lib/types";
import medusa from "@/lib/medusa";

const REGION_ID = process.env.NEXT_PUBLIC_KUWAIT_REGION_ID || "reg_01KQVDZRC5V1R8SKYCN644H08T";

const Shop = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<MedusaProduct[]>([]);

  useEffect(() => {
    medusa.store.product
      .list({ region_id: REGION_ID, limit: 20, fields: "id,title,handle,thumbnail,variants.*,variants.calculated_price" } as Parameters<typeof medusa.store.product.list>[0])
      .then((res) => setProducts((res as { products: MedusaProduct[] }).products ?? []))
      .catch(() => setProducts([]));
  }, []);

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
    <section className="min-h-screen w-full bg-cream px-16 pt-16 max-lg:pt-8 max-lg:px-8 max-md:px-5 pb-32">
      <div className="flex flex-col w-full max-w-[1440px] mx-auto">
        <h2 className="font-serif text-[clamp(2.5rem,4.4vw,4rem)] lg:text-center leading-none bg-gold/20 border border-gold/50 px-4 py-2 rounded-full">
          Our Collection
        </h2>
        <span className="lg:text-[18px] max-lg:hidden tracking-tight leading-none lg:text-center mt-2 lg:mt-4">
          Shop by preference
        </span>
        <div className="flex justify-between lg:hidden items-center w-full">
          <span className="lg:text-[18px] tracking-tight leading-none lg:text-center mt-2 lg:mt-4">
            Shop by preference
          </span>
          <Link href="/shop" className="text-sm text-black underline cursor-pointer">
            view all
          </Link>
        </div>

        {/* Category tiles */}
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
            pb-4 lg:pb-0 lg:mx-0 lg:px-0"
        >
          {[
            { label: "Pistachios", slug: "pista", img: "/n1.jpg" },
            { label: "Walnuts",    slug: "walnut", img: "/n2.jpg" },
            { label: "Almonds",    slug: "almond", img: "/n3.jpg" },
            { label: "Cashews",    slug: "cashew", img: "/n4.jpg" },
            { label: "Pumpkin",    slug: "pumpkin-seed", img: "/n5.jpg" },
            { label: "Figs",       slug: "fig",    img: "/n6.jpg" },
            { label: "Raisins",    slug: "kismiss", img: "/dry.jpg" },
          ].map(({ label, slug, img }) => (
            <Link
              key={slug}
              href={`/shop/${slug}`}
              className="flex flex-col gap-6 items-center justify-center flex-shrink-0 snap-center group"
            >
              <div className="w-[200px] h-[260px] lg:w-[160px] lg:h-[210px] rounded-[999px] overflow-hidden border-3 border-gold group-hover:border-navy transition-colors duration-200">
                <Image
                  src={img}
                  alt={label}
                  width={200}
                  height={260}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-[22px] text-center text-black/80 tracking-tight font-medium">{label}</p>
            </Link>
          ))}
        </div>

        {/* Carousels fed from real Medusa data */}
        <ProductCarousel
          title="Shop Our Premium Range"
          description="Premium dry fruits & nuts — available in 250g, 500g, and 1kg packs."
          products={products}
        />

        <ProductCarousel
          title="Our Best Sellers"
          description="The most loved picks by our Kuwait customers."
          products={[...products].reverse()}
        />

        <div className="w-full flex items-center justify-center mt-12">
          <Link
            href="/shop"
            className="px-12 py-5 text-base font-medium tracking-tight border-2 border-gold bg-navy rounded-full text-white w-fit"
          >
            Shop All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Shop;
