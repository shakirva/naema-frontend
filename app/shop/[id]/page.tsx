"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";

/* ------------------ MOCK DATA ------------------ */

const product = {
  name: "Zahidi Dates",
  price: 2400,
  rating: 4,
  reviews: 57,
  image: "/n1.jpg",
  description:
    "Carefully selected premium dates with a rich texture and natural sweetness. Perfect for daily use or gifting.",
};

/* ------------------ PAGE ------------------ */

const ProductDetail = () => {
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState("shipping");

  return (
    <section className="px-16 py-16 max-lg:px-8 max-md:px-5 bg-cream min-h-screen">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT → IMAGE (BRUTALIST STYLE) */}
        <div className="w-full border-2 border-black rounded-2xl overflow-hidden">
          <div className="relative w-full h-[500px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT → DETAILS */}
        <div className="flex flex-col gap-6">

          {/* Rating */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <IoMdStar
                key={i}
                size={18}
                color={i < product.rating ? "#ccba78" : "#e5e5e5"}
              />
            ))}
            <span className="text-sm text-black/60">
              ({product.reviews})
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-[clamp(2rem,3vw,3rem)] leading-none">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-xl font-semibold">
            ₹{product.price}
          </p>

          {/* Quantity + CTA */}
          <div className="flex items-center gap-4 mt-4">

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
            <button className="flex-1 py-3 rounded-full bg-navy text-white border-2 border-gold hover:bg-transparent hover:text-black transition">
              Add to Cart
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-black/70 leading-relaxed mt-4">
            {product.description}
          </p>

          {/* ACCORDION SECTIONS */}

          {/* Shipping */}
          <div className="border-t pt-4 mt-6">
            <button
              onClick={() => setOpen(open === "shipping" ? "" : "shipping")}
              className="w-full flex justify-between text-left font-medium"
            >
              Shipping Information
              <span>{open === "shipping" ? "-" : "+"}</span>
            </button>

            {open === "shipping" && (
              <p className="text-sm text-black/70 mt-2">
                Orders are processed within 2–3 business days. Delivered in
                4–6 days.
              </p>
            )}
          </div>

          {/* Package */}
          <div className="border-t pt-4">
            <button
              onClick={() => setOpen(open === "package" ? "" : "package")}
              className="w-full flex justify-between text-left font-medium"
            >
              Package Contains
              <span>{open === "package" ? "-" : "+"}</span>
            </button>

            {open === "package" && (
              <p className="text-sm text-black/70 mt-2">
                1 premium box of dates (500g / 1kg options available).
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetail;