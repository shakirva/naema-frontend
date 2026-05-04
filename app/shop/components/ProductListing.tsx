"use client";

import { useState, useMemo } from "react";
import { FiSliders } from "react-icons/fi";
import Link from "next/link";
import ProductCard from "./ProductCard";
import Footer from "@/app/sections/Footer";
import { Product } from "@/app/constants";


/* ------------------ TYPES ------------------ */

type Subcategory = {
  name: string;
  count: number;
};

type Category = {
  name: string;
  count: number;
  subcategories?: Subcategory[];
};

type SortOrder = "default" | "low-to-high" | "high-to-low";

/* ------------------ DATA ------------------ */

const categories: Category[] = [
  {
    name: "All Dates",
    count: 209,
    subcategories: [
      { name: "Pressed Dates", count: 32 },
      { name: "Rutab", count: 7 },
      { name: "Stuffed Dates", count: 26 },
      { name: "Wrapped Dates", count: 33 },
      { name: "Dry Dates", count: 17 },
    ],
  },
  { name: "Soft Selection", count: 5 },
  { name: "Premium Picks", count: 4 },
  { name: "Gift Boxes", count: 3 },
  { name: "Everyday Packs", count: 6 },
];

const products: Product[] = [
  { id: 1, name: "Amber Dates", tags: ["Soft", "Sweet"], price: 1200, rating: 5, reviews: 120, image: "/n1.jpg" },
  { id: 2, name: "Royal Dates", tags: ["Rich", "Premium"], price: 1500, rating: 4, reviews: 80, image: "/n2.jpg" },
  { id: 3, name: "Desert Gold", tags: ["Mild", "Fresh"], price: 1100, rating: 4, reviews: 40, image: "/n3.jpg" },
  { id: 4, name: "Honey Dates", tags: ["Juicy", "Smooth"], price: 1700, rating: 5, reviews: 200, image: "/n4.jpg" },
  { id: 5, name: "Date Mix Box", tags: ["Value", "Mix"], price: 1950, rating: 5, reviews: 312, image: "/n5.jpg" },
  { id: 6, name: "Organic Dates", tags: ["Organic", "Pure"], price: 1350, rating: 4, reviews: 148, image: "/n6.jpg" },
];

const MIN_PRICE = Math.min(...products.map((p) => p.price));
const MAX_PRICE = Math.max(...products.map((p) => p.price));

/* ------------------ ACCORDION CATEGORY ITEM ------------------ */

const CategoryItem = ({
  cat,
  activeCategory,
  activeSubcategory,
  setActiveCategory,
  setActiveSubcategory,
}: {
  cat: Category;
  activeCategory: string;
  activeSubcategory: string;
  setActiveCategory: (name: string) => void;
  setActiveSubcategory: (name: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = !!cat.subcategories?.length;
  const active = activeCategory === cat.name;

  return (
    <div>
      <button
        onClick={() => {
          setActiveCategory(cat.name);
          setActiveSubcategory("");
          if (hasChildren) setOpen((o) => !o);
        }}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-full text-sm transition-colors
          ${active ? "bg-gold text-navy font-medium" : "text-black/70 hover:text-black"}`}
      >
        <span>{cat.name}</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${active ? "bg-white/30 text-navy" : "bg-black/10 text-black/60"}`}>
            {cat.count}
          </span>
          {hasChildren && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </div>
      </button>

      {hasChildren && open && (
        <div className="flex flex-col gap-1 mt-1 ml-3 pl-3 border-l border-black/10">
          {cat.subcategories!.map((sub) => {
            const subActive = activeSubcategory === sub.name;
            return (
              <button
                key={sub.name}
                onClick={() => {
                  setActiveSubcategory(sub.name);
                  setActiveCategory(cat.name);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full text-sm transition-colors
                  ${subActive ? "bg-gold/40 text-navy font-medium" : "text-black/60 hover:text-black"}`}
              >
                <span>{sub.name}</span>
                <span className="text-xs bg-black/10 text-black/50 px-2 py-0.5 rounded-full">
                  {sub.count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ------------------ PRICE SIDEBAR SECTION ------------------ */

const PriceFilter = ({
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
}: {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}) => {
  return (
    <div className="mt-8 flex flex-col gap-5">
      {/* Sort */}
      <div>
        <h3 className="text-sm font-medium mb-3">Sort by Price</h3>
        <div className="flex flex-col gap-1">
          {(
            [
              { label: "Default", value: "default" },
              { label: "Low → High", value: "low-to-high" },
              { label: "High → Low", value: "high-to-low" },
            ] as { label: string; value: SortOrder }[]
          ).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortOrder(opt.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-full text-sm transition-colors
                ${sortOrder === opt.value ? "bg-gold text-navy font-medium" : "text-black/70 hover:text-black"}`}
            >
              {opt.label}
              {sortOrder === opt.value && (
                <span className="w-1.5 h-1.5 rounded-full bg-navy" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
     
    </div>
  );
};

/* ------------------ PAGE ------------------ */

const ProductListing = () => {
  const [activeCategory, setActiveCategory] = useState("All Dates");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOrder === "low-to-high") result = [...result].sort((a, b) => a.price - b.price);
    if (sortOrder === "high-to-low") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [sortOrder, priceRange]);

  return (
    <>
    <section className="px-16 py-20 max-lg:px-8 max-md:px-5">
      {/* Top Bar */}
      <div className="w-full border-b border-black/10 pb-4 mb-10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm">
            <FiSliders size={18} />
            FILTER
          </button>
          <div className="flex items-center gap-2 text-sm text-black/70">
            <Link href="/">SHOP</Link>
            <span>{">"}</span>
            <span className="text-black font-medium">DATES</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1440px] mx-auto flex gap-12">
        {/* Sidebar */}
        <aside className="w-[260px] hidden lg:block shrink-0">
          <h3 className="text-sm font-medium mb-4">Categories</h3>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <CategoryItem
                key={cat.name}
                cat={cat}
                activeCategory={activeCategory}
                activeSubcategory={activeSubcategory}
                setActiveCategory={setActiveCategory}
                setActiveSubcategory={setActiveSubcategory}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-black/10" />

          <PriceFilter
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-end justify-between mb-10">
            <h1 className="font-serif text-[clamp(2.5rem,4.4vw,4rem)] leading-none">
              Dates
            </h1>
            <span className="text-sm text-black/50">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-black/40 gap-2">
              <span className="text-4xl">🫙</span>
              <p className="text-sm">No products match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default ProductListing;