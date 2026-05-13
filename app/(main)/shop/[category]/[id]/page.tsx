"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

import Footer from "@/app/sections/Footer";
import FrequentlyBought from "../../components/FrequentlyBought";
import CustomerReviews from "../../components/CustomerReviews";
import FAQ from "../../components/FAQ";
import medusa from "@/lib/medusa";
import {
  MedusaProduct,
  MedusaProductVariant,
  getKWDPrice,
  formatKWD,
} from "@/lib/types";
import { useCart } from "@/app/context/CartContext";

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<MedusaProduct | null>(null);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<MedusaProductVariant | null>(null);
  const [open, setOpen] = useState("shipping");
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { product: data } = await medusa.store.product.retrieve(productId, {
          fields: "id,title,handle,thumbnail,description,variants,variants.prices,tags,images,categories",
        } as Parameters<typeof medusa.store.product.retrieve>[1]);
        const p = data as unknown as MedusaProduct;
        setProduct(p);
        if (p.variants?.length) setSelectedVariant(p.variants[0]);
      } catch {
        setNotFoundFlag(true);
      }
    };
    fetchProduct();
  }, [productId]);

  if (notFoundFlag) return notFound();
  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const image = product.thumbnail ?? product.images?.[0]?.url ?? "/n1.jpg";
  const price = selectedVariant ? getKWDPrice(selectedVariant) : null;
  const tags = product.tags?.map((t) => t.value) ?? [];

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setAdded(true);
    await addToCart(selectedVariant.id, qty);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <section className="px-16 py-16 max-lg:px-8 max-md:px-5 bg-cream min-h-screen">
        <div className="max-w-[1440px] mx-auto flex max-lg:flex-col items-start gap-16">
          {/* Image */}
          <div className="w-1/2 max-lg:w-full border-2 border-black rounded-2xl overflow-hidden self-start shrink-0">
            <div className="relative w-full h-[500px] max-lg:h-[350px]">
              <Image src={image} alt={product.title} fill className="object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col max-lg:w-full w-1/2">
            {/* Stars */}
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <IoMdStar key={i} size={18} color={i < 4 ? "#ccba78" : "#e5e5e5"} />
              ))}
            </div>

            <h1 className="font-serif text-[clamp(2rem,3vw,3rem)] leading-none mt-4">{product.title}</h1>

            {/* Variant Selector */}
            {product.variants?.length > 0 && (
              <div className="flex flex-col gap-3 mt-4">
                <p className="text-sm font-medium tracking-tight">
                  Size — <span className="text-black/50 font-normal">{selectedVariant?.title}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v) => {
                    const vPrice = getKWDPrice(v);
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-150 ${
                          isSelected
                            ? "bg-navy text-white border-navy"
                            : "border-black/20 text-black/70 hover:border-black cursor-pointer"
                        }`}
                      >
                        {v.title}
                        {vPrice !== null && (
                          <span className="ml-1.5 text-xs opacity-70">{formatKWD(vPrice)}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border border-black/20 rounded-full overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2">-</button>
                <span className="px-4">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="flex-1 py-3 rounded-full bg-navy text-white border-2 border-gold hover:bg-transparent hover:text-black transition disabled:opacity-40"
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>
            </div>

            {/* Price */}
            <p className="text-2xl font-semibold tracking-tight mt-4">
              {price !== null
                ? formatKWD(price * qty)
                : "—"}
              {qty > 1 && price !== null && (
                <span className="text-sm font-normal text-black/40 ml-2">
                  ({formatKWD(price)} × {qty})
                </span>
              )}
            </p>
            <span className="text-xs font-light">
              <span className="underline">Shipping</span> calculated at checkout.
            </span>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-black/70 leading-relaxed mt-4">{product.description}</p>
            )}

            {/* Shipping accordion */}
            <div className="border-t mt-6">
              <div
                onClick={() => setOpen(open === "shipping" ? "" : "shipping")}
                className="flex justify-between items-center py-4 cursor-pointer"
              >
                <span className="font-medium text-sm">Shipping Information</span>
                <FaPlus size={12} className={`transition-transform duration-300 ${open === "shipping" ? "rotate-45" : "rotate-0"}`} />
              </div>
              <div className={`grid transition-all duration-500 ${open === "shipping" ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden min-h-0">
                  <p className="text-sm text-black/60 leading-relaxed">
                    Kuwait: Standard delivery 2–3 days, Express same-day available. Free shipping on orders above KD 10.
                  </p>
                </div>
              </div>
            </div>

            {/* Package accordion */}
            <div className="border-t">
              <div
                onClick={() => setOpen(open === "package" ? "" : "package")}
                className="flex justify-between items-center py-4 cursor-pointer"
              >
                <span className="font-medium text-sm">Package Contains</span>
                <FaPlus size={12} className={`transition-transform duration-300 ${open === "package" ? "rotate-45" : "rotate-0"}`} />
              </div>
              <div className={`grid transition-all duration-500 ${open === "package" ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden min-h-0">
                  <p className="text-sm text-black/60 leading-relaxed">
                    1 premium pack of {product.title} — {selectedVariant?.title}, vacuum-sealed for freshness.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t" />
          </div>
        </div>

        {/* Tags section */}
        {tags.length > 0 && (
          <div className="max-w-[1440px] mx-auto mt-16 border-1 border-navy rounded-2xl px-16 py-12 max-lg:px-10 max-md:px-6 flex flex-col items-center text-center gap-6">
            <h2 className="font-serif text-[clamp(1.2rem,2vw,1.5rem)] tracking-tight">
              Why choose {product.title}?
            </h2>
            <div className="flex gap-3 flex-wrap justify-center">
              {tags.map((tag) => (
                <span key={tag} className="px-5 py-2 rounded-full border border-black text-sm font-medium bg-gold/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <FrequentlyBought currentProductId={productId} />
        <CustomerReviews />
        <FAQ />
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;
