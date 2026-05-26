"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FiArrowUpRight } from "react-icons/fi";
import { getProducts } from "@/lib/api";
import type { MedusaProduct } from "@/lib/types";

/* ------------------ DATA ------------------ */

const cardColors = [
  "bg-[#f5e6c8]",
  "bg-[#e8d4a8]",
  "bg-[#f0dfc0]",
  "bg-[#dfc9a0]",
  "bg-[#f7edd8]",
  "bg-gold/30",
  "bg-[#eddfc4]",
  "bg-[#e2cfa4]",
];

const INITIAL_COUNT = 8;

/* ------------------ PRODUCT CARD ------------------ */

const ProductCard = ({ product, index }: { product: MedusaProduct; index: number }) => {
  const thumbnail = product.thumbnail || product.images?.[0]?.url || "/n1.jpg";
  const category = product.categories?.[0]?.handle || "Uncategorized";
  const badge = product.metadata?.badge ? String(product.metadata.badge) : "WHOLESALE";
  const color = cardColors[index % cardColors.length];

  return (
    <div className="flex flex-col gap-3 max-sm:gap-2 group">
      {/* Colored image card */}
      <div
        className={`relative rounded-2xl max-sm:rounded-xl overflow-hidden border-2 border-darkgold aspect-square ${color}`}
      >
        {/* Category badge */}
        <div className="absolute top-4 left-4 max-sm:top-2.5 max-sm:left-2.5 z-10">
          <span className="bg-white border border-darkgold text-black text-[10px] max-sm:text-[9px] font-bold leading-none px-3 max-sm:px-2 py-1.5 rounded-lg uppercase">
            {badge}
          </span>
        </div>

        {/* Product image — fills container */}
        <Image
          src={thumbnail}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-all duration-500 ease-out contrast-[1.12] saturate-[1.05] brightness-[1.03]"
        />

        {/* Inquire button — bottom right, only on hover */}
        <div className="absolute bottom-4 right-4 max-sm:bottom-2.5 max-sm:right-2.5 z-10 opacity-0 group-hover:opacity-100 max-sm:opacity-100 transition-opacity duration-200">
          <Link
            href={`/contact?product=${encodeURIComponent(product.title)}`}
            className="bg-white border-2 border-darkgold rounded-full px-3 max-sm:px-2.5 py-2.5 max-sm:py-2 flex flex-col items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 cursor-pointer group/btn"
          >
            <FiArrowUpRight size={14} className="group-hover/btn:text-gold" />
            <span className="text-[10px] max-sm:text-[9px] font-medium leading-none mt-0.5">
              Inquire
            </span>
          </Link>
        </div>
      </div>

      {/* Info below card */}
      <div className="flex flex-col gap-1 max-sm:gap-0.5 px-1">
        <h3 className="font-serif text-[clamp(1rem,1.5vw,1.4rem)] leading-tight text-black line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm max-sm:text-xs text-black/55 leading-snug tracking-tight line-clamp-2">
          {product.description || "Premium wholesale quality."}
        </p>
      </div>
    </div>
  );
};

/* ------------------ PAGE ------------------ */

const Wholesale = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [products, setProducts] = useState<MedusaProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await getProducts({ limit: 50 });
        setProducts(res.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.categories?.[0]?.handle).filter(Boolean)))];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.categories?.[0]?.handle === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <section className="w-full min-h-screen">
        {/* ── HERO HEADER ── */}
        <div className="bg-navy w-full px-16 pt-20 pb-16 max-lg:px-8 max-md:px-5">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
            {/* Label */}
            <span className="font-serif text-[22px] text-cream leading-none w-fit bg-gold/10 border border-gold/30 rounded-lg px-4 py-2">
              Featured Collections
            </span>

            {/* Heading */}
            <div>
              <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-cream max-w-[700px]">
                Premium dates,{" "}
                <span className="italic text-lightgold">sourced</span> at scale.
              </h1>
              <p className="mt-4 text-base text-cream/80 max-w-[480px] leading-relaxed tracking-tight">
                Bulk dates and dry fruits for businesses, retailers and
                distributors.{" "}
                <span className="text-lightgold">Minimum order 20kg.</span>{" "}
                Pricing and availability on enquiry.
              </p>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] text-cream uppercase">
                Explore by category
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setVisibleCount(INITIAL_COUNT);
                    }}
                    className={`px-5 py-2.5 rounded-xl border-2 text-sm font-medium tracking-tight transition-all duration-150 cursor-pointer capitalize
                      ${
                        activeCategory === cat
                          ? "bg-lightgold text-black border-darkgold"
                          : "bg-cream text-black/70 border-gold hover:border-darkgold hover:text-black"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PRODUCTS GRID ── */}
        <div className="bg-cream w-full px-16 py-16 max-lg:px-8 max-md:px-5 max-sm:px-4 max-sm:py-10 min-h-[500px]">
          <div className="max-w-[1440px] mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-black/40 gap-4">
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Loading products...</p>
              </div>
            ) : (
              <>
                {/* Results count */}
                <p className="text-sm text-black/40 mb-8 tracking-tight">
                  Showing {visible.length} of {filtered.length} products
                </p>

                <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-2 gap-8 max-sm:gap-4">
                  {visible.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>

                {/* Load more */}
                {hasMore && (
                  <div className="flex justify-center mt-16">
                    <button
                      onClick={() => setVisibleCount((c) => c + 4)}
                      className="relative group overflow-hidden inline-flex items-center justify-center px-12 py-4 rounded-full border-2 border-gold bg-cream text-black text-sm font-medium tracking-tight cursor-pointer"
                    >
                      <span className="block group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
                        Load More
                      </span>
                      <span className="block absolute inset-0 flex items-center justify-center bg-navy text-cream border-2 border-navy rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
                        Load More
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Enquiry CTA */}
            <div className="mt-20 border-2 border-gold/40 rounded-2xl bg-gold/10 px-12 py-10 max-md:px-6 max-sm:px-5 max-sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-[clamp(1.5rem,2.5vw,2.2rem)] leading-tight text-black">
                  Ready to place a bulk order?
                </h3>
                <p className="text-sm text-black/60 mt-2 tracking-tight">
                  Our team will get back to you with pricing, availability and
                  shipping details.
                </p>
              </div>
              <Link
                href="/contact"
                className="relative group overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gold bg-navy text-cream text-sm font-medium tracking-tight shrink-0 cursor-pointer"
              >
                <span className="block group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
                  Get in touch
                </span>
                <span className="block absolute inset-0 flex items-center justify-center bg-cream text-black rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
                  Get in touch
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wholesale;