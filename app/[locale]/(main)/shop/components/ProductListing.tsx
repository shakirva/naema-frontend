"use client";

import { useState, useEffect, useMemo } from "react";
import { FiSliders } from "react-icons/fi";
import { Link } from "@/i18n/routing";
import ProductCard from "./ProductCard";

import Footer from "@/app/[locale]/sections/Footer";
import { getProducts, getCategoryByHandle, getCategories } from "@/lib/api";
import type { MedusaProduct, MedusaProductCategory } from "@/lib/types";
import { getProductPrice } from "@/lib/types";

/* ------------------ TYPES ------------------ */

type SortOrder = "default" | "low-to-high" | "high-to-low";

type Props = {
  category?: string;
  label: string;
  searchQuery?: string;
};

/* ------------------ PRICE FILTER ------------------ */

const PriceFilter = ({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
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
  </div>
);

/* ------------------ PRODUCT LISTING ------------------ */

const ProductListing = ({ category, label, searchQuery }: Props) => {
  const [products, setProducts] = useState<MedusaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [allCategories, setAllCategories] = useState<MedusaProductCategory[]>([]);

  useEffect(() => {
    getCategories().then((cats) => {
      // Filter parent categories only
      const parents = cats.filter((c) => !c.parent_category_id);
      setAllCategories(parents);
    });
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const res = await getProducts({ q: searchQuery, limit: 50 });
          // Filter out invalid products
          const validProducts = (res.products || []).filter(p => p && p.id && p.title);
          setProducts(validProducts);
        } else if (category) {
          // Try to find category by handle
          const cat = await getCategoryByHandle(category);
          if (cat) {
            const res = await getProducts({ category_id: [cat.id], limit: 50 });
            const validProducts = (res.products || []).filter(p => p && p.id && p.title);
            setProducts(validProducts);
          } else {
            // If not a category, check if it's a collection
            const { getCollectionByHandle } = await import('@/lib/api');
            const collection = await getCollectionByHandle(category);
            if (collection) {
              const res = await getProducts({ collection_id: [collection.id], limit: 50 });
              const validProducts = (res.products || []).filter(p => p && p.id && p.title);
              setProducts(validProducts);
            } else {
              // Fallback: fetch all products
              const res = await getProducts({ limit: 50 });
              const validProducts = (res.products || []).filter(p => p && p.id && p.title);
              setProducts(validProducts);
            }
          }
        } else {
          // Fallback: fetch all products
          const res = await getProducts({ limit: 50 });
          const validProducts = (res.products || []).filter(p => p && p.id && p.title);
          setProducts(validProducts);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, searchQuery]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortOrder === "low-to-high") {
      sorted.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    } else if (sortOrder === "high-to-low") {
      sorted.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    }
    return sorted;
  }, [products, sortOrder]);

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
            <div className="flex flex-col gap-1.5">
              {/* Shop All Shortcut */}
              <Link
                href="/shop"
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-all duration-200
                  ${!category && !searchQuery
                    ? "bg-gold text-navy font-semibold shadow-md"
                    : "text-black/70 hover:bg-black/5 hover:text-black"
                  }`}
              >
                <span>All Products</span>
              </Link>

              {allCategories.map((cat) => {
                const isSelected = category === cat.handle;
                return (
                  <Link
                    key={cat.id}
                    href={`/shop/${cat.handle}`}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-all duration-200
                      ${isSelected
                        ? "bg-gold text-navy font-semibold shadow-md"
                        : "text-black/70 hover:bg-black/5 hover:text-black"
                      }`}
                  >
                    <span>{cat.name}</span>
                    {isSelected && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-navy font-medium">
                        {products.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="my-6 border-t border-black/10" />

            <PriceFilter
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
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
                {sortedProducts.length} product
                {sortedProducts.length !== 1 ? "s" : ""}
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-3 animate-pulse">
                    <div className="w-full h-[260px] rounded-2xl bg-black/5" />
                    <div className="h-4 w-3/4 rounded bg-black/5" />
                    <div className="h-4 w-1/2 rounded bg-black/5" />
                    <div className="h-10 rounded-full bg-black/5" />
                  </div>
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} category={category} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-black/40 gap-2">
                <span className="text-4xl">🫙</span>
                <p className="text-sm">No products found in this category.</p>
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
