"use client";

import { useState, useMemo } from "react";
import { FiSliders } from "react-icons/fi";
import Link from "next/link";
import ProductCard from "./ProductCard";
import Footer from "@/app/sections/Footer";
import { products, Product } from "@/app/constants";

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

type Props = {
  category: string;
  label: string;
};

/* ------------------ CATEGORY SIDEBAR DATA ------------------ */

const categoryFilters: Record<string, Category[]> = {
  dates: [
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
  ],
  nuts: [
    {
      name: "All Nuts",
      count: 48,
      subcategories: [
        { name: "Almonds", count: 12 },
        { name: "Cashews", count: 10 },
        { name: "Walnuts", count: 8 },
        { name: "Pistachios", count: 9 },
        { name: "Mixed Nuts", count: 9 },
      ],
    },
    { name: "Raw", count: 14 },
    { name: "Roasted", count: 18 },
    { name: "Salted", count: 10 },
    { name: "Gift Packs", count: 6 },
  ],
  "dry-fruits": [
    {
      name: "All Dry Fruits",
      count: 36,
      subcategories: [
        { name: "Raisins", count: 8 },
        { name: "Dried Figs", count: 7 },
        { name: "Dried Apricots", count: 6 },
        { name: "Dried Kiwi", count: 5 },
        { name: "Dried Prunes", count: 10 },
      ],
    },
    { name: "Unsweetened", count: 12 },
    { name: "Premium Picks", count: 8 },
    { name: "Gift Boxes", count: 6 },
  ],
  chocolates: [
    {
      name: "All Chocolates",
      count: 28,
      subcategories: [
        { name: "Dark Chocolate", count: 8 },
        { name: "Milk Chocolate", count: 7 },
        { name: "Date Chocolates", count: 6 },
        { name: "Artisan Bars", count: 4 },
        { name: "Gift Boxes", count: 3 },
      ],
    },
    { name: "Sugar Free", count: 6 },
    { name: "Vegan", count: 8 },
    { name: "Premium", count: 10 },
    { name: "Gift Sets", count: 4 },
  ],
};

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
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              active ? "bg-white/30 text-navy" : "bg-black/10 text-black/60"
            }`}
          >
            {cat.count}
          </span>
          {hasChildren && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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

/* ------------------ PRICE FILTER ------------------ */

const PriceFilter = ({
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
  min,
  max,
}: {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  min: number;
  max: number;
}) => (
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

    {/* Price Range */}
  </div>
);

/* ------------------ PRODUCT LISTING ------------------ */

const ProductListing = ({ category, label }: Props) => {
  // Filter products for this category from constants
  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === category),
    [category],
  );

  const MIN_PRICE = categoryProducts.length
    ? Math.min(...categoryProducts.map((p) => p.price))
    : 0;
  const MAX_PRICE = categoryProducts.length
    ? Math.max(...categoryProducts.map((p) => p.price))
    : 5000;

  const sidebarCategories = categoryFilters[category] ?? [];
  const defaultActive = sidebarCategories[0]?.name ?? "";

  const [activeCategory, setActiveCategory] = useState(defaultActive);
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);

  const filteredProducts = useMemo(() => {
    let result = categoryProducts.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );
    if (sortOrder === "low-to-high")
      result = [...result].sort((a, b) => a.price - b.price);
    if (sortOrder === "high-to-low")
      result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [categoryProducts, sortOrder, priceRange]);

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
            {/* Dynamic breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-black/70">
              <Link href="/" className="hover:text-black transition">
                HOME
              </Link>
              <span>{">"}</span>
              <Link href="/shop" className="hover:text-black transition">
                SHOP
              </Link>
              <span>{">"}</span>
              <span className="text-black font-medium">
                {label.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="max-w-[1440px] mx-auto flex gap-12">
          {/* Sidebar */}
          <aside className="w-[260px] hidden lg:block shrink-0">
            <h3 className="text-sm font-medium mb-4">Categories</h3>
            <div className="flex flex-col gap-1">
              {sidebarCategories.map((cat) => (
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

            <div className="my-6 border-t border-black/10" />

            <PriceFilter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              min={MIN_PRICE}
              max={MAX_PRICE}
            />
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-end justify-between mb-10">
              {/* Dynamic heading */}
              <h1 className="font-serif text-[clamp(2.5rem,4.4vw,4rem)] leading-none">
                {label}
              </h1>
              <span className="text-sm text-black/50">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} category={category} />
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
      <Footer />
    </>
  );
};

export default ProductListing;
