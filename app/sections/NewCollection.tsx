"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiShoppingCart } from "react-icons/fi";
import { IoMdStar } from "react-icons/io";
useCart
import { products } from "@/app/constants";
import { useCart } from "../context/CartContext";

const featured = products.slice(0, 4); // pick whichever products you want here

const NewCollection = () => {
  const [index, setIndex] = useState(0);
  const { addToCart } = useCart();
  const product = featured[index];

  const prev = () => setIndex((i) => (i === 0 ? featured.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === featured.length - 1 ? 0 : i + 1));

  return (
    <section className="w-full bg-cream py-24 px-16 max-lg:px-8 max-md:px-5">
      <div className="max-w-[1440px] mx-auto">

        {/* Section label */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[10px] tracking-widest font-bold text-black/40 uppercase">
              New Arrivals
            </span>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-none mt-1">
              New Collections
            </h2>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition cursor-pointer"
            >
              <FiArrowLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition cursor-pointer"
            >
              <FiArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Main split layout */}
        <div className="flex gap-0 rounded-3xl overflow-hidden border border-black/10 min-h-[520px] max-md:flex-col">

          {/* LEFT — large image */}
          <div className="relative w-[60%] max-md:w-full max-md:h-[300px]">
            <Image
              key={product.id}
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500"
              sizes="60vw"
              priority
            />

            {/* Limited edition badge */}
            <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
              New Arrival
            </div>
          </div>

          {/* RIGHT — product info */}
          <div className="flex-1 bg-white flex flex-col justify-between p-10 max-md:p-6">
            <div className="flex flex-col gap-5">

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {product.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`text-[10px] px-3 py-1 rounded-full border ${
                      i === 0
                        ? "bg-gold/60 border-gold text-navy"
                        : "border-black/20 text-black/50"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Name */}
              <h3 className="font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] leading-tight tracking-tight uppercase">
                {product.name}
              </h3>

              {/* Stars */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IoMdStar
                      key={i}
                      size={15}
                      color={i < product.rating ? "#ccba78" : "#e5e5e5"}
                    />
                  ))}
                </div>
                <span className="text-xs text-black/40 underline underline-offset-2">
                  {product.reviews} review{product.reviews !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-black/60 leading-relaxed max-w-[280px]">
                {product.description ??
                  "Hand-selected and carefully packed to preserve natural flavour and freshness."}
              </p>

              {/* Price */}
              <p className="text-3xl font-semibold tracking-tight">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-8">
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      size: "500g",
                    })
                  }
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-gold bg-gold/30 text-sm font-medium hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 cursor-pointer"
                >
                  <FiShoppingCart size={15} />
                  Add to Cart
                </button>

                <Link
                  href={`/shop/${product.category}/${product.id}`}
                  className="flex-1 py-3.5 rounded-full bg-navy text-white text-sm font-medium text-center hover:opacity-90 transition cursor-pointer"
                >
                  View Product
                </Link>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 mt-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`rounded-full transition-all duration-200 cursor-pointer ${
                      i === index
                        ? "w-6 h-2 bg-navy"
                        : "w-2 h-2 bg-black/20 hover:bg-black/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;