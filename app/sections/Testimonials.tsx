"use client";

import React from "react";
import { IoMdStar } from "react-icons/io";

const testimonials = [
  {
    id: 1,
    quote: "Perfectly soft, rich, and naturally sweet.",
    author: "Amina K.",
    rating: 5,
    bg: "bg-[#f4a987]",
    border: "border-[#ed8253]",
  },
  {
    id: 2,
    quote:
      "Fresh, crunchy, and packed beautifully. You can really taste the quality.",
    author: "Rahul M.",
    rating: 5,
    bg: "bg-[#b9d789]",
    border: "border-[#B5CD92]",
  },
  {
    id: 3,
    quote:
      "The perfect balance of texture and sweetness. My family finished it instantly.",
    author: "Sara H.",
    rating: 4,
    bg: "bg-[#f5db94]",
    border: "border-[#DFC57A]",
  },
  {
    id: 4,
    quote: "Luxury chocolate that actually tastes handcrafted.",
    author: "Yousef T.",
    rating: 5,
    bg: "bg-[#c9997c]",
    border: "border-[#B8937C]",
  },
  {
    id: 5,
    quote: "Elegant packaging and incredible flavour in every bite.",
    author: "Leena F.",
    rating: 5,
    bg: "bg-[#d8bde7]",
    border: "border-[#BFA7CC]",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full bg-cream py-24 max-md:py-12 overflow-hidden px-16 max-lg:px-8 max-md:px-5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center">
          <h2 className="font-serif text-[clamp(1.5rem,3.3vw,3rem)] lg:text-center leading-none w-fit bg-gold/20 border border-gold/50 rounded-lg px-4 py-2">
            Reviews
          </h2>

          <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] text-center leading-[1.25] mt-10 max-lg:mt-5 max-w-[900px] text-black">
            Loved by people <span className="italic text-deepgold">everywhere.</span>
            <br />
            Here's what they're saying.
          </h2>
        </div>

        <div className="mt-24 max-lg:mt-12 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max pb-4">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className={`w-[320px] h-[320px] rounded-[22px] border-2 shadow-sm flex flex-col items-center justify-center gap-5 p-8 ${item.bg} ${item.border}`}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IoMdStar
                      key={i}
                      size={18}
                      color={i < item.rating ? "#1a2e5a" : "#00000025"}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif text-[22px] leading-[1.2] text-center text-black max-w-[230px]">
                  "{item.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center text-black text-xs font-medium shrink-0">
                    {item.author.charAt(0)}
                  </div>

                  <span className="text-black/60 text-sm tracking-tight">
                    {item.author}
                  </span>
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