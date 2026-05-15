"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiSliders } from "react-icons/fi";
import Link from "next/link";
import ProductCard from "@/app/(main)/shop/components/ProductCard";
import Footer from "@/app/sections/Footer";
import medusa from "@/lib/medusa";
import { MedusaProduct, getKWDPrice } from "@/lib/types";

type SortOrder = "default" | "low-to-high" | "high-to-low";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [products, setProducts] = useState<MedusaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const { products: data } = await medusa.store.product.list({
          q,
          fields: "id,title,handle,thumbnail,description,variants,variants.prices,tags,images,categories",
          limit: 50,
        } as Parameters<typeof medusa.store.product.list>[0]);
        setProducts(data as unknown as MedusaProduct[]);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (q) {
      fetchSearchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [q]);

  const filteredProducts = useMemo(() => {
    const list = [...products];
    if (sortOrder === "low-to-high") {
      return list.sort((a, b) => {
        const pa = getKWDPrice(a.variants?.[0]) ?? 0;
        const pb = getKWDPrice(b.variants?.[0]) ?? 0;
        return pa - pb;
      });
    }
    if (sortOrder === "high-to-low") {
      return list.sort((a, b) => {
        const pa = getKWDPrice(a.variants?.[0]) ?? 0;
        const pb = getKWDPrice(b.variants?.[0]) ?? 0;
        return pb - pa;
      });
    }
    return list;
  }, [products, sortOrder]);

  return (
    <>
      <section className="px-16 py-20 max-lg:px-8 max-md:px-5">
        {/* Top Bar */}
        <div className="w-full border-b border-black/10 pb-4 mb-10">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm">
                <FiSliders size={18} />
                FILTER
              </button>
              <div className="flex gap-3 ml-4">
                {(["default", "low-to-high", "high-to-low"] as SortOrder[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortOrder(opt)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${
                      sortOrder === opt
                        ? "bg-navy text-white border-navy"
                        : "border-black/20 text-black/60 hover:border-black"
                    }`}
                  >
                    {opt === "default" ? "Default" : opt === "low-to-high" ? "Price ↑" : "Price ↓"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-black/70">
              <Link href="/" className="hover:text-black transition">HOME</Link>
              <span>{">"}</span>
              <span className="text-black font-medium">SEARCH</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="max-w-[1440px] mx-auto min-h-[50vh]">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h1 className="font-serif text-[clamp(2.5rem,4.4vw,4rem)] leading-none">
                Search Results
              </h1>
              <p className="mt-2 text-black/50">
                {q ? `Showing results for "${q}"` : "Enter a search query"}
              </p>
            </div>
            <span className="text-sm text-black/50">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-black/40 gap-2">
              <span className="text-4xl">🔍</span>
              <p className="text-sm">No products found for "{q}".</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
