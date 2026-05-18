"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

import Footer from "@/app/sections/Footer";
import FrequentlyBought from "../../components/FrequentlyBought";
import CustomerReviews from "../../components/CustomerReviews";
import FAQ from "../../components/FAQ";
import { getProductByHandle } from "@/lib/api";
import { useCart } from "@/app/context/CartContext";
import type { MedusaProduct } from "@/lib/types";
import { formatPrice, getProductPrice, getCheapestVariant } from "@/lib/types";

const ProductDetail = () => {
  const params = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<MedusaProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState("shipping");
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const handle = params.id as string;
      const p = await getProductByHandle(handle);
      setProduct(p);
      if (p?.variants?.length) {
        setSelectedVariantId(p.variants[0].id);
      }
      setLoading(false);
    };
    load();
  }, [params.id]);

  if (loading) {
    return (
      <section className="px-16 py-16 max-lg:px-8 max-md:px-5 bg-cream min-h-screen">
        <div className="max-w-[1440px] mx-auto flex max-lg:flex-col items-start gap-16">
          <div className="w-1/2 max-lg:w-full h-[500px] rounded-2xl bg-black/5 animate-pulse" />
          <div className="w-1/2 max-lg:w-full flex flex-col gap-4">
            <div className="h-6 w-32 bg-black/5 rounded animate-pulse" />
            <div className="h-12 w-3/4 bg-black/5 rounded animate-pulse" />
            <div className="h-8 w-1/2 bg-black/5 rounded animate-pulse" />
            <div className="h-12 w-full bg-black/5 rounded-full animate-pulse mt-4" />
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="px-16 py-16 max-lg:px-8 max-md:px-5 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">🫙</span>
          <p className="text-lg mt-4 text-black/60">Product not found.</p>
        </div>
      </section>
    );
  }

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const price = selectedVariant?.prices?.[0]?.amount ?? getProductPrice(product);
  const thumbnail = product.thumbnail || product.images?.[0]?.url || "/n1.jpg";

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setAdded(true);
    await addToCart(selectedVariant.id, qty);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <section className="px-16 py-16 max-lg:px-8 max-md:px-5 bg-cream min-h-screen">
        <div className="max-w-[1440px] mx-auto flex max-lg:flex-col   items-start gap-16">
          <div className="w-1/2 max-lg:w-full border-2 border-black rounded-2xl overflow-hidden   self-start shrink-0">
            <div className="relative w-full h-[500px] max-lg:h-[350px]">
              <Image
                src={thumbnail}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT → DETAILS */}
          <div className="flex flex-col max-lg:w-full  w-1/2">
            {/* Rating */}
            <div className="flex items-center gap-2 ">
              {Array.from({ length: 5 }).map((_, i) => (
                <IoMdStar
                  key={i}
                  size={18}
                  color={i < 5 ? "#ccba78" : "#e5e5e5"}
                />
              ))}
            </div>

            {/* Title */}
            <h1 className="font-serif text-[clamp(2rem,3vw,3rem)] leading-none mt-4">
              {product.title}
            </h1>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="flex flex-col gap-3 mt-4">
                <p className="text-sm font-medium tracking-tight">
                  Variant —{" "}
                  <span className="text-black/50 font-normal">
                    {selectedVariant?.title}
                  </span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`relative px-5 py-2 rounded-full border text-sm font-medium transition-all duration-150
                      ${
                        selectedVariantId === v.id
                          ? "bg-navy text-white border-navy"
                          : "border-black/20 text-black/70 hover:border-black cursor-pointer"
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex items-center  gap-4 mt-6">
              {/* Qty */}
              <div className="flex items-center border border-black/20 rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2"
                >
                  -
                </button>
                <span className="px-4">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3  rounded-full bg-navy text-white border-2 border-gold hover:bg-transparent hover:text-black transition"
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            </div>
            {/* Price */}
            <p className="text-2xl font-semibold tracking-tight mt-4">
              {formatPrice(price * qty)}
              {qty > 1 && (
                <span className="text-sm font-normal text-black/40 ml-2">
                  ({formatPrice(price)} × {qty})
                </span>
              )}
            </p>
            <span className="text-xs font-light">
              {" "}
              <span className="underline">Shipping</span> calculated at
              checkout.
            </span>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-black/70 leading-relaxed mt-4">
                {product.description}
              </p>
            )}

            {/* Shipping */}
            <div className="border-t mt-6">
              <div
                onClick={() => setOpen(open === "shipping" ? "" : "shipping")}
                className="flex justify-between items-center py-4 cursor-pointer"
              >
                <span className="font-medium text-sm">
                  Shipping Information
                </span>
                <FaPlus
                  size={12}
                  className={`transition-transform duration-300 ease-in-out ${
                    open === "shipping" ? "rotate-45" : "rotate-0"
                  }`}
                />
              </div>
              <div
                className={`grid transition-all duration-500 ${
                  open === "shipping"
                    ? "grid-rows-[1fr] pb-4"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden min-h-0">
                  <p className="text-sm text-black/60 leading-relaxed">
                    Orders are processed within 2–3 business days. Delivered in
                    4–6 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Package */}
            <div className="border-t">
              <div
                onClick={() => setOpen(open === "package" ? "" : "package")}
                className="flex justify-between items-center py-4 cursor-pointer"
              >
                <span className="font-medium text-sm">Package Contains</span>
                <FaPlus
                  size={12}
                  className={`transition-transform duration-300 ease-in-out ${
                    open === "package" ? "rotate-45" : "rotate-0"
                  }`}
                />
              </div>
              <div
                className={`grid transition-all duration-500 ${
                  open === "package"
                    ? "grid-rows-[1fr] pb-4"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden min-h-0">
                  <p className="text-sm text-black/60 leading-relaxed">
                    1 premium pack of {product.title} — {selectedVariant?.title || "Standard"},
                    vacuum-sealed for freshness.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t" />
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto mt-16 border-1 border-navy rounded-2xl px-16 py-12 max-lg:px-10 max-md:px-6 flex flex-col items-center text-center gap-6">
          <h2 className="font-serif text-[clamp(1.2rem,2vw,1.5rem)] tracking-tight">
            Are {product.title} the right choice for you?
          </h2>

          <p className="text-sm text-black/60 leading-relaxed max-w-[680px]">
            {product.description || `If you're looking for naturally sweet, nutrient-dense products with a
            rich flavour profile, ${product.title} is the perfect choice —
            hand-selected from the finest sources and packed fresh for your
            doorstep.`}
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            {product.tags?.length
              ? product.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-5 py-2 rounded-full border border-black text-sm font-medium bg-gold/20"
                  >
                    {tag.value}
                  </span>
                ))
              : ["Natural", "Fresh", "Premium"].map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2 rounded-full border border-black text-sm font-medium bg-gold/20"
                  >
                    {tag}
                  </span>
                ))}
          </div>
        </div>

        <FrequentlyBought currentProductId={product.id} />
        <CustomerReviews />
        <FAQ />
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;
