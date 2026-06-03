"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

import FrequentlyBought from "../../components/FrequentlyBought";
import CustomerReviews from "../../components/CustomerReviews";
import FAQ from "../../components/FAQ";
import Footer from "@/app/[locale]/sections/Footer";
import { useCart } from "@/app/context/CartContext";
import { getProductByHandle } from "@/lib/api";
import type { MedusaProduct } from "@/lib/types";
import { getProductPrice, formatPrice, getCheapestVariant, getLowestPrice } from "@/lib/types";

const ProductDetail = () => {
  const params = useParams(); 

  const [product, setProduct] = useState<MedusaProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState("shipping");
  const [selectedSize, setSelectedSize] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const handle = params.id as string;
        if (!handle) {
          setLoading(false);
          return;
        }
        const p = await getProductByHandle(handle);
        if (p) {
          setProduct(p);
          if (p.variants && p.variants.length > 0) {
            setSelectedSize(p.variants[0].title);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <section className="px-16 py-16 max-lg:px-8 max-md:px-5 bg-cream min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!product) return notFound();

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants?.find(v => v.title === selectedSize) || getCheapestVariant(product);
    if (!variant) return;

    setAdding(true);
    await addToCart(variant.id, qty);
    setTimeout(() => setAdding(false), 1500);
  };

  // Get best image with fallbacks
  const thumbnail = product.thumbnail || product.images?.[0]?.url || "/n1.jpg";
  const tags = product.tags?.map((t) => t?.value).filter(Boolean) ?? [];
  const variant = product.variants?.find(v => v?.title === selectedSize) || getCheapestVariant(product);
  
  // Calculate price with proper null checking
  let price = 0;
  if (variant) {
    const variantPrice = getLowestPrice(variant);
    if (variantPrice !== null) {
      price = variantPrice;
    } else {
      price = getProductPrice(product) ?? 0;
    }
  } else {
    price = getProductPrice(product) ?? 0;
  }

  // Ensure price is a number
  if (typeof price !== 'number' || isNaN(price)) {
    price = 0;
  }

  return (
    <>
      <section className="px-16 py-16 max-lg:px-8 max-md:px-5 bg-cream min-h-screen">
        <div className="max-w-[1440px] mx-auto flex max-lg:flex-col items-start gap-16">
          <div className="w-1/2 max-lg:w-full border-2 border-gold rounded-2xl overflow-hidden self-start shrink-0">
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
                  color="#ccba78"
                />
              ))}
              <span className="text-sm text-black/60">(5)</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-[clamp(2rem,3vw,3rem)] leading-none mt-4">
              {product.title}
            </h1>
            
            {/* Size Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-col gap-3 mt-4">
                <p className="text-sm font-medium tracking-tight">
                  Size —{" "}
                  <span className="text-black/50 font-normal">
                    {selectedSize}
                  </span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v) => {
                    const isAvailable = (v.inventory_quantity ?? 0) > 0 || (v as any).allow_backorder;
                    return (
                      <button
                        key={v.id}
                        disabled={!isAvailable}
                        onClick={() => isAvailable && setSelectedSize(v.title)}
                        className={`relative px-5 py-2 rounded-full border text-sm font-medium transition-all duration-150
                        ${
                          !isAvailable
                            ? "border-black/10 text-black/25 cursor-not-allowed line-through"
                            : selectedSize === v.title
                              ? "bg-navy text-white border-navy"
                              : "border-black/20 text-black/70 hover:border-black cursor-pointer"
                        }`}
                      >
                        {v.title}
                        {!isAvailable && (
                          <span className="absolute -top-2 -right-1 text-[9px] bg-gold text-black/40 px-1.5 py-0.5 rounded-full leading-none">
                            sold out
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex items-center gap-4 mt-6">
              {/* Qty */}
              <div className="flex items-center border border-black/20 rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-black/5"
                >
                  -
                </button>
                <span className="px-4">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2 hover:bg-black/5"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!variant || adding}
                className="flex-1 relative rounded-full border-2 border-gold bg-navy text-white overflow-hidden group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="block py-3 group-hover:-translate-y-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
                  {adding ? "Added ✓" : "Add to Cart"}
                </span>
                <span className="block absolute font-medium tracking-tight inset-0 py-3 bg-[#E7DCB7] text-navy rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)] flex items-center justify-center">
                  {adding ? "Added ✓" : "Add to Cart"}
                </span>
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
            <div className="text-sm text-black/70 leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: product.description || "Premium product, naturally sweet and packed fresh." }}>
            </div>

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
                    1 premium pack of {product.title}
                    {selectedSize ? ` — ${selectedSize}` : ""},
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
            If you're looking for naturally sweet, nutrient-dense fruit with a
            rich flavour profile, {product.title} are the perfect choice —
            hand-selected from the finest orchards and packed fresh for your
            doorstep.
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            {tags.length > 0
              ? tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-5 py-2 rounded-full border border-black text-sm font-medium bg-gold/20"
                  >
                    {tag}
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

        <FrequentlyBought currentId={product.id} />
        <CustomerReviews />
        <FAQ />
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;
