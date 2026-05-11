"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const testimonials = [
  {
    id: 1,
    quote: "Perfectly soft, rich, and naturally sweet.",
    author: "Amina K.",
    bg: "bg-[#E7A27D]",
    button: "bg-[#D96B3C]",
    product: "PREMIUM MEDJOOL DATES",
    image: "/try.png",
  },
  {
    id: 2,
    quote:
      "Fresh, crunchy, and packed beautifully. You can really taste the quality.",
    author: "Rahul M.",
    bg: "bg-[#A7D56F]",
    button: "bg-[#7BC51D]",
    product: "ROASTED MIXED NUTS",
    image: "/nobg.png",
  },
  {
    id: 3,
    quote:
      "The perfect balance of texture and sweetness. My family finished it instantly.",
    author: "Sara H.",
    bg: "bg-[#F0C85F]",
    button: "bg-[#E3AF18]",
    product: "PREMIUM DRY FRUITS",
    image: "/nobg.png",
  },
  {
    id: 4,
    quote: "Luxury chocolate that actually tastes handcrafted.",
    author: "Yousef T.",
    bg: "bg-[#B68A6B]",
    button: "bg-[#8B5A3C]",
    product: "ARTISAN CHOCOLATE BOX",
    image: "/nobg.png",
  },
  {
    id: 5,
    quote: "Elegant packaging and incredible flavour in every bite.",
    author: "Leena F.",
    bg: "bg-[#C6B0CF]",
    button: "bg-[#A46CC1]",
    product: "GOURMET GIFT COLLECTION",
    image: "/nobg.png",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full bg-cream py-24 overflow-hidden px-16 max-lg:px-8 max-md:px-5 ">
      <div className="max-w-[1400px] mx-auto ">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <h2 className="font-serif text-[clamp(1.5rem,3.3vw,3rem)] lg:text-center leading-none w-fit bg-gold/20 border border-gold/50 rounded-lg px-4 py-2 -rotate-2  ">
            Reviews
          </h2>

          <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] text-center leading-[1.25] mt-10 max-w-[900px] text-black">
            Loved by people <span className="italic">everywhere.</span>
            <br />
            Here’s what they’re saying.
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-24 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max pb-4">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className={`w-[320px]  h-[430px] rounded-[22px] border border-black/20 flex flex-col justify-between p-4 ${item.bg}`}
              >
                {/* Content */}
                <div className="flex flex-col items-center justify-center flex-1 px-4">
                  <p className="font-serif text-[22px] leading-[1.2] text-center text-black max-w-[230px]">
                    “{item.quote}”
                  </p>

                  <span className="text-black/50 text-lg mt-6 tracking-tight">
                    {item.author}
                  </span>
                </div>

                {/* Product CTA */}
                <div
                  className={`w-full rounded-[18px] border border-black/20 flex items-center justify-between px-4 py-4 ${item.button}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-15 h-15 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.product}
                        fill
                        className="object-contain scale-[3]" 
                      />
                    </div>

                    <p className="text-xs leading-[0.95] font-light  tracking-tight uppercase max-w-[65px] text-black">
                      {item.product}
                    </p>
                  </div>

                  <Link
                    href="/shop"
                    className="bg-cream border border-black/30 rounded-full px-3 py-3 text-black text-[14px] tracking-tight hover:scale-[1.03] transition duration-200 shrink-0"
                  >
                    Shop
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
