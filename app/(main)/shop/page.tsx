"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { getCategories } from "@/lib/api";
import type { MedusaProductCategory } from "@/lib/types";

const defaultCategories = [
  {
    slug: "dates",
    label: "Dates",
    description: "Hand-picked premium dates from the finest orchards.",
    image: "/n1.jpg",
    tags: ["Pressed", "Stuffed", "Dry", "Gift Boxes"],
  },
  {
    slug: "nuts",
    label: "Nuts",
    description: "Freshly sourced almonds, cashews, pistachios and more.",
    image: "/n2.jpg",
    tags: ["Almonds", "Cashews", "Walnuts", "Pistachios"],
  },
  {
    slug: "dry-fruits",
    label: "Dry Fruits",
    description: "Sun-dried fruits packed with natural goodness.",
    image: "/n3.jpg",
    tags: ["Raisins", "Figs", "Apricots", "Prunes"],
  },
  {
    slug: "chocolates",
    label: "Chocolates",
    description: "Artisan chocolates crafted with the finest cacao.",
    image: "/n4.jpg",
    tags: ["Dark", "Milk", "Date Chocolates", "Gift Box"],
  },
];

const CategoryPage = () => {
  const [categories, setCategories] = useState<typeof defaultCategories>(defaultCategories);

  useEffect(() => {
    const load = async () => {
      const cats = await getCategories();
      const topLevel = cats.filter((c) => !c.parent_category_id);
      if (topLevel.length > 0) {
        const categoryImages: Record<string, string> = {
          dates: "/n1.jpg",
          nuts: "/n2.jpg",
          "dry-fruits": "/n3.jpg",
          chocolates: "/n4.jpg",
        };
        setCategories(
          topLevel.map((c) => ({
            slug: c.handle,
            label: c.name,
            description: c.description || `Browse our ${c.name} collection.`,
            image: (c.metadata?.image_url as string) || categoryImages[c.handle] || "/n1.jpg",
            tags: c.category_children?.map((child) => child.name) ?? [],
          }))
        );
      }
    };
    load();
  }, []);

  return (
    <section className="min-h-screen bg-cream px-16 py-16 max-lg:px-8 max-md:px-5">
      <div className="max-w-[1440px] mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-black/40 mb-12 tracking-[0.18em] uppercase">
          <Link
            href="/"
            className="hover:text-black transition-colors duration-200"
          >
            Home
          </Link>

          <span>/</span>

          <span className="text-black">Shop</span>
        </div>

        {/* Heading */}
        <div className="mb-14 max-md:mb-10">
          <h1 className="font-serif text-[clamp(3rem,6vw,6rem)] leading-none tracking-tight">
            Our Collection
          </h1>

          <p className="mt-5 text-[15px] text-black/55 max-w-[520px] leading-relaxed tracking-tight">
            From premium dates to artisan chocolates — discover curated
            collections crafted for gifting, wellness, and everyday indulgence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">

          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="
                group relative overflow-hidden
                rounded-[34px]
                h-[420px] max-md:h-[360px]
                border-2 border-gold/70
                bg-[#efe7d5]
                transition-all duration-500
                hover:border-gold
              "
            >

              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent" />
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-7 max-md:p-5">

                {/* Tags */}
                {cat.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          text-[10px]
                          px-3 py-1.5
                          rounded-full
                          border border-gold/40
                          bg-white/10
                          backdrop-blur-sm
                          text-white/85
                          tracking-wide
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-end justify-between gap-5">

                  {/* Left */}
                  <div className="flex flex-col">

                    <h2 className="font-serif text-[clamp(2rem,3vw,3.5rem)] text-white leading-none">
                      {cat.label}
                    </h2>

                    <p className="mt-3 text-white/70 text-[14px] leading-relaxed tracking-tight max-w-[360px]">
                      {cat.description}
                    </p>
                  </div>

                  {/* Animated Button */}
                  <div
                    className="
                      relative overflow-hidden
                      w-14 h-14
                      rounded-full
                      border-2 border-gold
                      bg-[#E7DCB7]
                      shrink-0
                    "
                  >
                    <span className="absolute inset-0 flex items-center justify-center group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
                      <FiArrowRight
                        size={20}
                        className="text-navy"
                      />
                    </span>

                    <span className="absolute inset-0 flex items-center justify-center bg-navy text-white rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
                      <FiArrowRight
                        size={20}
                        className="text-gold"
                      />
                    </span>
                  </div>
                </div>
              </div>

              {/* Gold glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;