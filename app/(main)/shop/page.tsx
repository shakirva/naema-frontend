"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const categories = [
  {
    slug: "dates",
    label: "Dates",
    description: "Hand-picked premium dates from the finest orchards.",
    image: "/n1.jpg",
    count: 24,
    tags: ["Pressed", "Stuffed", "Dry", "Gift Boxes"],
  },
  {
    slug: "nuts",
    label: "Nuts",
    description: "Freshly sourced almonds, cashews, pistachios and more.",
    image: "/n2.jpg",
    count: 12,
    tags: ["Almonds", "Cashews", "Walnuts", "Pistachios"],
  },
  {
    slug: "dry-fruits",
    label: "Dry Fruits",
    description: "Sun-dried fruits packed with natural goodness.",
    image: "/n3.jpg",
    count: 10,
    tags: ["Raisins", "Figs", "Apricots", "Prunes"],
  },
  {
    slug: "chocolates",
    label: "Chocolates",
    description: "Artisan chocolates crafted with the finest cacao.",
    image: "/n4.jpg",
    count: 8,
    tags: ["Dark", "Milk", "Date Chocolates", "Gift Box"],
  },
];

const CategoryPage = () => {
  return (
    <section className="min-h-screen bg-cream px-16 py-16 max-lg:px-8 max-md:px-5">
      <div className="max-w-[1440px] mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-black/40 mb-12 tracking-widest uppercase">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <span className="text-black">Shop</span>
        </div>

        {/* Heading */}
        <div className="mb-14">
          <h1 className="font-serif text-[clamp(3rem,6vw,6rem)] leading-none tracking-tight">
            Our Collection
          </h1>
          <p className="mt-4 text-base text-black/50 max-w-[480px] leading-relaxed">
            From premium dates to artisan chocolates — explore everything
            Naema has to offer.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className={`group relative overflow-hidden rounded-3xl border-2 border-black/10 hover:border-gold transition-all duration-300
                ${i === 0 ? "md:col-span-2 h-[420px]" : "h-[320px]"}
              `}
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

              {/* Count badge */}
              <div className="absolute top-5 right-5 bg-gold/90 text-navy text-xs font-bold px-3 py-1.5 rounded-full">
                {cat.count} products
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                <div className="flex flex-col gap-3">
                  <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">
                    {cat.label}
                  </h2>
                  <p className="text-white/70 text-sm max-w-[340px] leading-snug">
                    {cat.description}
                  </p>
                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mt-1">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-white/30 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <FiArrowRight size={18} className="text-navy" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;