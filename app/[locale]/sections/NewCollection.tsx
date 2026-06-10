"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FiArrowLeft, FiArrowRight, FiShoppingCart } from "react-icons/fi";
import { IoMdStar } from "react-icons/io";
import ParallaxImage from "../components/ParallaxImage";
import { useCart } from "@/app/context/CartContext";
import { getProducts } from "@/lib/api";
import type { MedusaProduct } from "@/lib/types";
import { getProductPrice, formatPrice, getCheapestVariant } from "@/lib/types";

const NewCollection = () => {
  const [index, setIndex] = useState(0);
  const { addToCart } = useCart();
  const [featured, setFeatured] = useState<MedusaProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNew = async () => {
      setLoading(true);
      try {
        const res = await getProducts({ limit: 4, order: "-created_at" });
        setFeatured(res.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNew();
  }, []);

  const prev = () => setIndex((i) => (i === 0 ? featured.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === featured.length - 1 ? 0 : i + 1));

  if (loading) {
    return (
      <section className="w-full bg-cream relative min-h-screen mt-24 border-darkgold border-b flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-48 h-10 bg-black/10 rounded mb-10"></div>
          <div className="w-[400px] h-[550px] bg-black/5 rounded-3xl"></div>
        </div>
      </section>
    );
  }

  if (featured.length === 0) return null;

  const product = featured[index];
  const variant = getCheapestVariant(product);
  const price = getProductPrice(product);
  const thumbnail = product.thumbnail || product.images?.[0]?.url || "/n1.jpg";
  const category = product.categories?.[0]?.handle || "all";

  return (
    <section className="w-full bg-cream relative min-h-screen mt-24 border-darkgold border-b">
      {/* Section label */}
      <div className="flex flex-col w-full items-center px-5">
        <h2 className="font-serif text-[clamp(2.5rem,4.4vw,4rem)] text-center leading-none  bg-gold/20 border border-gold/50 rounded-lg px-6 py-2 ">
          New Collections
        </h2>
      </div>

      {/* Split layout */}
      <div className="flex max-lg:flex-col w-full items-center justify-between mt-12 mb-10">
        {/* LEFT — parallax image */}
        <div className="flex flex-col gap-4  max-lg:w-full lg:w-1/2 h-full ">
          <ParallaxImage
            mainclass="w-full h-[60vw] max-lg:h-[50vw] max-md:h-[70vw] relative overflow-hidden rounded-tr-md rounded-br-md max-lg:rounded-tr-none max-lg:rounded-br-none max-lg:rounded-bl-md max-lg:rounded-br-md"
            imageClass="object-cover rounded-tr-md rounded-br-md scale-110 max-lg:rounded-tr-none max-lg:rounded-br-none"
            src="/bg5.jpg"
            alt="Orchard background"
          />
          <div className="self-end max-w-[450px] pl-16 max-lg:pl-8 max-md:pl-5 flex flex-col items-start">
            <p className="mt-2 text-[16px] max-md:text-sm text-black/80 tracking-tight text-left">
              Discover freshly curated selections of premium dates, handpicked
              nuts, and handcrafted treats designed for everyday
              indulgence and thoughtful gifting.
            </p>

            <Link
              href="/shop"
              className="px-5 py-2.5 text-sm font-medium mt-6 tracking-tight border-2 border-gold bg-cream rounded-full text-black w-fit"
            >
              Shop All Collections
            </Link>
          </div>
        </div>

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
                <div className="relative h-[50%] w-full bg-cream">
                  <Image
                    key={product.id}
                    src={thumbnail}
                    alt={product.title}
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
                      <h3 className="font-serif text-[clamp(1rem,2.5vw,1.8rem)] leading-none line-clamp-1">
                        {product.title}
                      </h3>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <IoMdStar
                              key={i}
                              size={15}
                              color="#ccba78"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-black/40 underline underline-offset-2">
                          (5) reviews
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-black/60 leading-[1.25] max-w-[280px] mb-4 line-clamp-2">
                      {product.description ??
                        "Hand-selected and carefully packed to preserve natural flavour and freshness."}
                    </p>

                    <p className="text-3xl font-semibold tracking-tight">
                      {formatPrice(price)}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      disabled={!variant}
                      onClick={async () => {
                        if (variant) {
                          await addToCart(variant.id, 1);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 max-md:text-xs rounded-full border-2 border-gold bg-gold/30 text-sm font-bold tracking-tight hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 cursor-pointer disabled:opacity-50"
                    >
                      <FiShoppingCart className="size-[14px] max-md:size-[12px]" />
                      Add to Cart
                    </button>
                    <Link
                      href={`/shop/${category}/${product.handle}`}
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
                      i === index
                        ? "w-6 h-2 bg-navy"
                        : "w-2 h-2 bg-black/20 hover:bg-black/40"
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
