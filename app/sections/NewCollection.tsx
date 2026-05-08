"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiShoppingCart } from "react-icons/fi";
import { IoMdStar } from "react-icons/io";
import { products } from "@/app/constants";
import { useCart } from "../context/CartContext";
import ParallaxImage from "../components/ParallaxImage";

const featured = products.slice(0, 4);

const NewCollection = () => {
  const [index, setIndex] = useState(0);
  const { addToCart } = useCart();
  const product = featured[index];

  const prev = () => setIndex((i) => (i === 0 ? featured.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === featured.length - 1 ? 0 : i + 1));

  return (
    <section className="w-full bg-cream relative min-h-screen mt-24 border-black/60 border-b">

      {/* Section label */}
      <div className="flex flex-col w-full items-center px-5">
        <h2 className="font-serif text-[clamp(2.5rem,4.4vw,4rem)] text-center leading-none">
          New Collections
        </h2>
        <p className="mt-2 text-[16px] max-md:text-sm text-black/80 tracking-tight max-w-[450px] text-center">
          Discover freshly curated selections of premium dates, artisan
          chocolates, and handcrafted treats designed for everyday indulgence
          and thoughtful gifting.
        </p>
        <Link
          href="/shop"
          className="px-5 py-2.5 text-sm font-medium mt-6 tracking-tight border-2 border-gold bg-cream rounded-full text-black w-fit"
        >
          Shop All Collections
        </Link>
      </div>

      {/* Split layout */}
      <div className="flex max-lg:flex-col w-full items-center justify-between mt-12 mb-10">

        {/* LEFT — parallax image */}
        <ParallaxImage
          mainclass="w-1/2 max-lg:w-full h-[60vw] max-lg:h-[50vw] max-md:h-[70vw] relative overflow-hidden rounded-tr-md rounded-br-md max-lg:rounded-tr-none max-lg:rounded-br-none max-lg:rounded-bl-md max-lg:rounded-br-md"
          imageClass="object-cover rounded-tr-md rounded-br-md scale-110 max-lg:rounded-tr-none max-lg:rounded-br-none"
          src="/chocobg.jpg"
          alt="Chocolate background"
        />

        {/* RIGHT — card */}
        <div className="flex flex-col items-center justify-center relative w-1/2 max-lg:w-full max-lg:py-12 max-lg:px-5">
          <div className="flex items-center gap-4 max-md:gap-2">

            {/* Prev arrow */}
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition cursor-pointer shrink-0"
            >
              <FiArrowLeft size={16} />
            </button>

            {/* Card + dots */}
            <div className="flex flex-col">
              <div className="flex flex-col w-[400px] max-md:w-[320px] max-sm:w-[280px] h-[550px] max-md:h-[500px] gap-0 rounded-3xl overflow-hidden border border-black/10">

                {/* Product image */}
                <div className="relative h-[50%] w-full">
                  <Image
                    key={product.id}
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-500"
                    sizes="(max-width: 768px) 320px, 400px"
                    priority
                  />
                  <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                    New Arrival
                  </div>
                </div>

                {/* Product info */}
                <div className="bg-white h-[50%] flex flex-col justify-between p-6 max-md:p-4">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-serif text-[clamp(1rem,2.5vw,1.8rem)] leading-none">
                        {product.name}
                      </h3>
                      <div className="flex flex-col items-end gap-2">
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
                    </div>

                    <p className="text-sm text-black/60 leading-[1.25] max-w-[280px] mb-4">
                      {product.description ??
                        "Hand-selected and carefully packed to preserve natural flavour and freshness."}
                    </p>

                    <p className="text-3xl font-semibold tracking-tight">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>

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
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 max-md:text-xs rounded-full border-2 border-gold bg-gold/30 text-sm font-bold tracking-tight hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 cursor-pointer"
                    >
                      <FiShoppingCart className="size-[14px] max-md:size-[12px]" />
                      Add to Cart
                    </button>
                    <Link
                      href={`/shop/${product.category}/${product.id}`}
                      className="flex-1 py-2.5 rounded-full flex items-center max-md:text-xs  justify-center bg-navy text-white font-bold tracking-tight text-sm hover:opacity-90 transition cursor-pointer"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-3">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`rounded-full transition-all duration-200 cursor-pointer ${
                      i === index ? "w-6 h-2 bg-navy" : "w-2 h-2 bg-black/20 hover:bg-black/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition cursor-pointer shrink-0"
            >
              <FiArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;