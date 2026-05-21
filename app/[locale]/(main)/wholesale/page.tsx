"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Footer from "../../sections/Footer";

/* ------------------ DATA ------------------ */

type Category = "All" | "Dates" | "Dry Fruits";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  description: string;
  image: string;
  color: string;
  badge: string;
};

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

const products: Product[] = [
  {
    id: 1,
    name: "Khudri",
    category: "Dates",
    description:
      "A popular Saudi date known for its dry texture and exceptionally long shelf life.",
    image: "/khudhri.jpeg",
    color: cardColors[0],
    badge: "DATES",
  },
  {
    id: 2,
    name: "Safawi",
    category: "Dates",
    description:
      "Dark, moist dates from Madinah with a rich, naturally sweet flavour.",
    image: "/safawi.jpeg",
    color: cardColors[1],
    badge: "DATES",
  },
  {
    id: 3,
    name: "Medjool Jordan",
    category: "Dates",
    description:
      "Soft, large Jordanian Medjool dates with a rich caramel-like taste.",
    image: "/mejdool-jordan.jpeg",
    color: cardColors[2],
    badge: "DATES",
  },
  {
    id: 4,
    name: "Mabroom",
    category: "Dates",
    description:
      "Long, slender dates with a chewy texture and deep, earthy sweetness.",
    image: "/mabroom.jpeg",
    color: cardColors[3],
    badge: "DATES",
  },
  {
    id: 5,
    name: "Ajwa",
    category: "Dates",
    description:
      "Prized black dates from Madinah — soft, dark, and deeply flavourful.",
    image: "/ajwa.jpeg",
    color: cardColors[4],
    badge: "DATES",
  },
  {
    id: 6,
    name: "Medjool Saudi",
    category: "Dates",
    description:
      "Premium Saudi Medjool — large, moist, and irresistibly sweet.",
    image: "/mejdool-saudi.jpeg",
    color: cardColors[5],
    badge: "DATES",
  },
  {
    id: 7,
    name: "Sikhai",
    category: "Dates",
    description:
      "A golden-coloured variety with a soft texture and mild, honey-like sweetness.",
    image: "/sikhai.jpeg",
    color: cardColors[6],
    badge: "DATES",
  },
  {
    id: 8,
    name: "Munaifi",
    category: "Dates",
    description:
      "Rare and tender dates with a smooth, fudgy consistency and delicate flavour.",
    image: "/munaifi.jpeg",
    color: cardColors[7],
    badge: "DATES",
  },
  {
    id: 9,
    name: "Mufathal",
    category: "Dates",
    description:
      "Soft, amber-toned dates with a rich flavour profile and satisfying chew.",
    image: "/mufathal.jpeg",
    color: cardColors[0],
    badge: "DATES",
  },
  {
    id: 10,
    name: "Galaxy",
    category: "Dates",
    description:
      "A premium, glistening variety known for its unique sheen and rich sweetness.",
    image: "/galaxy.jpeg",
    color: cardColors[1],
    badge: "DATES",
  },
  {
    id: 11,
    name: "Sukkari",
    category: "Dates",
    description:
      "Beloved for their melt-in-the-mouth texture and exceptional natural sweetness.",
    image: "/sukkari.jpeg",
    color: cardColors[2],
    badge: "DATES",
  },
  {
    id: 12,
    name: "Theen Iran",
    category: "Dry Fruits",
    description:
      "Premium Iranian dried figs — naturally sun-dried with a soft interior and sweet bite.",
    image: "/theen-iran.jpeg",
    color: cardColors[3],
    badge: "DRY FRUITS",
  },
  {
    id: 13,
    name: "Theen Afghan",
    category: "Dry Fruits",
    description:
      "Afghan dried figs with a distinctive flavour — earthy, sweet and packed with nutrients.",
    image: "/theen-afhan.jpeg",
    color: cardColors[4],
    badge: "DRY FRUITS",
  },
];

const INITIAL_COUNT = 8;

/* ------------------ PRODUCT CARD ------------------ */

const ProductCard = ({ product }: { product: Product }) => (
  <div className="flex flex-col gap-4 group">
    {/* Colored image card */}
    <div
      className={`relative rounded-2xl overflow-hidden border-2 border-black/10 aspect-square ${product.color}`}
    >
      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-white border-2 border-black text-black text-[11px] font-black tracking-wider px-3 py-1.5 rounded-lg uppercase">
          {product.badge}
        </span>
      </div>

      {/* Min order badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-black/10 backdrop-blur-sm text-black/70 text-[10px] font-medium px-2.5 py-1 rounded-full">
          Min. 20kg
        </span>
      </div>

      {/* Product image — fills container */}
      <div className="absolute inset-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.05] transition-all duration-500 ease-out"
        />
      </div>

      {/* Inquire button — bottom right, only on hover */}
      <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          className="bg-white border-2 border-black rounded-xl px-3 py-2.5 flex flex-col items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 cursor-pointer group/btn"
        >
          <FiArrowUpRight size={16} className="group-hover/btn:text-gold" />
          <span className="text-[10px] font-bold leading-none mt-0.5">
            Inquire
          </span>
        </Link>
      </div>
    </div>

    {/* Info below card */}
    <div className="flex flex-col gap-1.5 px-1">
      <h3 className="font-serif text-[clamp(1.1rem,1.5vw,1.4rem)] leading-tight text-black">
        {product.name}
      </h3>
      <p className="text-sm text-black/55 leading-snug tracking-tight line-clamp-2">
        {product.description}
      </p>
    </div>
  </div>
);

/* ------------------ PAGE ------------------ */

const WholesalePage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const categories: Category[] = ["All", "Dates", "Dry Fruits"];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

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
                Premium dates, <span className="italic text-cream">sourced</span>{" "}
                at scale.
              </h1>
              <p className="mt-4 text-base text-cream/80 max-w-[480px] leading-relaxed tracking-tight">
                Bulk dates and dry fruits for businesses, retailers and
                distributors. Minimum order 20kg. Pricing and availability on
                enquiry.
              </p>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px]  text-cream uppercase">
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
                    className={`px-5 py-2.5 rounded-xl border-2 text-sm font-medium tracking-tight transition-all duration-150 cursor-pointer
                      ${
                        activeCategory === cat
                          ? "bg-gold text-black border-darkgold"
                          : "bg-cream text-black/70 border-black/15 hover:border-black/40"
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
        <div className="bg-cream w-full px-16 py-16 max-lg:px-8 max-md:px-5">
          <div className="max-w-[1440px] mx-auto">
            {/* Results count */}
            <p className="text-sm text-black/40 mb-8 tracking-tight">
              Showing {visible.length} of {filtered.length} products
            </p>

            <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
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

            {/* Enquiry CTA */}
            <div className="mt-20 border-2 border-gold/40 rounded-2xl bg-gold/10 px-12 py-10 max-md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
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
                  Get in Touch
                </span>
                <span className="block absolute inset-0 flex items-center justify-center bg-gold/30 text-navy border-2 border-gold rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
                  Get in Touch
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WholesalePage;
