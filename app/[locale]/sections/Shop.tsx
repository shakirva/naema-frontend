"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import ProductCarousel from "./ProductCarousel";
import { getProducts, getCategories, getCollections } from "@/lib/api";
import type { MedusaProduct, MedusaProductCategory } from "@/lib/types";

const Shop = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<MedusaProduct[]>([]);
  const [latestProducts, setLatestProducts] = useState<MedusaProduct[]>([]);
  const [categories, setCategories] = useState<MedusaProductCategory[]>([]);
  const [collections, setCollections] = useState<{ id: string; title: string; handle: string }[]>([]);

  useEffect(() => {
    const load = async () => {
      const [prodRes, latestRes, cats, cols] = await Promise.all([
        getProducts({ limit: 100 }), // Get all products for collections
        getProducts({ limit: 10, order: "-created_at" }),
        getCategories(),
        getCollections(),
      ]);
      setProducts(prodRes.products);
      setLatestProducts(latestRes.products);
      setCollections(cols);
      // Only top-level categories (no parent)
      setCategories(cats.filter((c) => !c.parent_category_id));
    };
    load();
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

  // Products grouped by collection ID
  const productsByCollection = collections.map((col) => ({
    collection: col,
    items: products.filter((p) => p.collection_id === col.id),
  })).filter((group) => group.items.length > 0);

  const latest = latestProducts.slice(0, 8);

  // Default category images (fallback)
  const categoryImages: Record<string, string> = {
    dates: "/dbox.jpg",
    nuts: "/nuts.jpg",
    "dry-fruits": "/dry.jpg",
    chocolates: "/chocos.jpg",
  };

  return (
    <section className="min-h-screen w-full bg-cream pb-16 lg:pb-32">
      <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3.5rem)] text-center px-5 md:px-8 lg:px-16 pt-10 lg:pt-16 leading-tight">
        A great box starts with carefully selected{" "}
        <span className="italic text-deepgold">dates,</span>
        <br className="hidden md:block" /> roasted{" "}
        <span className="italic text-deepgold">nuts,</span> and rich artisan{" "}
        <span className="italic text-deepgold">chocolate.</span>
      </h1>

      {productsByCollection.map(({ collection, items }) => (
        <ProductCarousel
          key={collection.id}
          title={collection.title}
          description={`Shop our curated selection from the ${collection.title} collection.`}
          products={items}
        />
      ))}

      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 pt-10 lg:pt-16">
        <div className="lg:mx-auto  mt-10 lg:mt-20">
          <h2 className="font-serif text-[clamp(2rem,4.4vw,4rem)] lg:text-center leading-none w-fit bg-gold/20 border border-gold/50 rounded-lg px-4  py-2">
            Our Collection
          </h2>
        </div>

        <span className="hidden lg:block text-[18px] tracking-tight leading-none text-center mt-2 lg:mt-4">
          Shop by preference
        </span>

        <div className="flex justify-between lg:hidden items-center w-full mt-4">
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
          {(categories.length > 0
            ? categories.map((cat) => ({
                src: (cat.metadata?.image_url as string) || categoryImages[cat.handle] || "/n1.jpg",
                label: cat.name,
                href: `/shop/${cat.handle}`,
              }))
            : [
                { src: "/dbox.jpg", label: "Dates", href: "/shop/dates" },
                { src: "/nuts.jpg", label: "Nuts", href: "/shop/nuts" },
                { src: "/dry.jpg", label: "Dry Fruits", href: "/shop/dry-fruits" },
                { src: "/chocos.jpg", label: "Chocolates", href: "/shop/chocolates" },
              ]
          ).map(({ src, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col gap-4 lg:gap-6 items-center justify-center flex-shrink-0 snap-center group"
            >
              <div className="w-[200px] h-[260px] md:w-[230px] md:h-[300px] lg:w-[260px] lg:h-[340px] rounded-[999px] overflow-hidden border-3 border-gold">
                <Image
                  src={src}
                  alt={label}
                  width={260}
                  height={340}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <p className="text-[20px] lg:text-[24px] text-center text-black/80 tracking-tight font-medium">
                {label}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <ProductCarousel
        title="Shop Our Latest Drops"
        description="From classic whole dates to gourmet stuffed varieties – find your perfect match."
        products={latest}
      />

      <div className="w-full flex items-center justify-center mt-10 lg:mt-12">
        <Link
          href="/shop"
          className="px-8 md:px-12 py-4 md:py-5 text-base font-medium tracking-tight border-2 border-gold bg-navy rounded-full text-white relative group overflow-hidden inline-block"
        >
          <span className="block group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
            Shop All Dates
          </span>
          <span className="block absolute inset-0 flex items-center justify-center bg-[#E7DCB7] text-navy  rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
            Shop All Dates
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Shop;
