"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

import Footer from "@/app/sections/Footer";
import { FiCopy } from "react-icons/fi";
import FrequentlyBought from "../../components/FrequentlyBought";
import CustomerReviews from "../../components/CustomerReviews";
import FAQ from "../../components/FAQ";
import { products } from "@/app/constants";
import { notFound } from "next/navigation"; // ✅ FIXED

const sizes = [
  { label: "250g", available: true },
  { label: "500g", available: true },
  { label: "1kg", available: false },
  { label: "2kg", available: true },
];

const ProductDetail = ({ params }: { params: { category: string; id: string } }) => {
  const product = products.find((p) => p.id === Number(params.id));

  // ✅ hooks must always run first
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState("shipping");
  const [selectedSize, setSelectedSize] = useState("500g");

  // ✅ moved AFTER hooks
  if (!product) return notFound();

  return (
    <>
      <section className="px-16 py-16 max-lg:px-8 max-md:px-5 bg-cream min-h-screen">
        <div className="max-w-[1440px] mx-auto flex max-lg:flex-col items-start gap-16">
          
          <div className="w-1/2 max-lg:w-full border-2 border-black rounded-2xl overflow-hidden self-start shrink-0">
            <div className="relative w-full h-[500px] max-lg:h-[350px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col max-lg:w-full w-1/2">
            
            <div className="flex items-center gap-2 ">
              {Array.from({ length: 5 }).map((_, i) => (
                <IoMdStar
                  key={i}
                  size={18}
                  color={i < product.rating ? "#ccba78" : "#e5e5e5"}
                />
              ))}
              <span className="text-sm text-black/60">({product.reviews})</span>
            </div>

            <h1 className="font-serif text-[clamp(2rem,3vw,3rem)] leading-none mt-4">
              {product.name}
            </h1>

            <div className="flex flex-col gap-3 mt-4">
              <p className="text-sm font-medium tracking-tight">
                Size —{" "}
                <span className="text-black/50 font-normal">{selectedSize}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    disabled={!size.available}
                    onClick={() => size.available && setSelectedSize(size.label)}
                    className={`relative px-5 py-2 rounded-full border text-sm font-medium transition-all duration-150
                      ${
                        !size.available
                          ? "border-black/10 text-black/25 cursor-not-allowed line-through"
                          : selectedSize === size.label
                          ? "bg-navy text-white border-navy"
                          : "border-black/20 text-black/70 hover:border-black cursor-pointer"
                      }`}
                  >
                    {size.label}
                    {!size.available && (
                      <span className="absolute -top-2 -right-1 text-[9px] bg-gold text-black/40 px-1.5 py-0.5 rounded-full leading-none">
                        sold out
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
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

              <button className="flex-1 py-3 rounded-full bg-navy text-white border-2 border-gold hover:bg-transparent hover:text-black transition">
                Add to Cart
              </button>
            </div>

            <p className="text-2xl font-semibold tracking-tight mt-4">
              ₹{(product.price * qty).toLocaleString()}
              {qty > 1 && (
                <span className="text-sm font-normal text-black/40 ml-2">
                  (₹{product.price.toLocaleString()} × {qty})
                </span>
              )}
            </p>

            <span className="text-xs font-light">
              <span className="underline">Shipping</span> calculated at checkout.
            </span>

            <p className="text-sm text-black/70 leading-relaxed mt-4">
              {product.description}
            </p>

            <div className="border-t mt-6">
              <div
                onClick={() => setOpen(open === "shipping" ? "" : "shipping")}
                className="flex justify-between items-center py-4 cursor-pointer"
              >
                <span className="font-medium text-sm">Shipping Information</span>
                <FaPlus
                  size={12}
                  className={`transition-transform duration-300 ease-in-out ${
                    open === "shipping" ? "rotate-45" : "rotate-0"
                  }`}
                />
              </div>
              <div
                className={`grid transition-all duration-500 ${
                  open === "shipping" ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
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
                  open === "package" ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden min-h-0">
                  <p className="text-sm text-black/60 leading-relaxed">
                    1 premium pack of {product.name} — {selectedSize},
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
            Are {product.name} the right choice for you?
          </h2>

          <p className="text-sm text-black/60 leading-relaxed max-w-[680px]">
            If you're looking for naturally sweet, nutrient-dense fruit with a rich
            flavour profile, {product.name} are the perfect choice — hand-selected
            from the finest orchards and packed fresh for your doorstep.
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            {product.tags?.length
              ? product.tags.map((tag, i) => (
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

        <FrequentlyBought currentId={Number(1)} />
        <CustomerReviews />
        <FAQ />
      </section>

      <Footer />
    </>
  );
};

export default ProductDetail;