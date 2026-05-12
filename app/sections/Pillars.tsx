"use client";
import Image from "next/image";
import React, { useState } from "react";

const pillars = [
  {
    numeral: "I",
    title: "Quality",
    description: "We never settle. Every product meets the highest standard before it reaches you.",
    image: "/quality.jpg",
  },
  {
    numeral: "II",
    title: "Trust",
    description: "Our word is our bond. Reliable and consistent, every single time.",
    image: "/trust.jpg",
  },
  {
    numeral: "III",
    title: "Authenticity",
    description: "Genuine sourcing, true to nature. Nothing artificial, ever.",
    image: "/auth.jpg",
  },
  {
    numeral: "IV",
    title: "Premium",
    description: "Luxury in every grain and date we carefully deliver to you.",
    image: "/premium.jpg",
  },
];

const PillarCard = ({
  pillar,
}: {
  pillar: (typeof pillars)[0];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-gold cursor-pointer group"
      style={{ minHeight: 420 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      {/* Image */}
      <Image
        src={pillar.image}
        alt={pillar.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Bottom bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-navy border-t border-gold px-6 transition-all duration-400 ease-in-out ${
          open ? "py-6" : "py-5"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-[clamp(1.4rem,2vw,2rem)] text-cream leading-none">
            {pillar.title}
          </h3>
          <button
            className="shrink-0 size-8 rounded-full border border-gold text-cream flex items-center justify-center text-lg leading-none transition-transform duration-300"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            aria-label={open ? "Close" : "Open"}
          >
            +
          </button>
        </div>

        {/* Expandable description */}
        <div
          className={`overflow-hidden transition-all duration-400 ease-in-out ${
            open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="font-serif italic text-cream/70 text-[15px] leading-relaxed">
            {pillar.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Pillars = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto gap-14">

      {/* Heading */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="font-serif  text-black text-[clamp(2rem,4.4vw,4rem)] leading-none max-w-[650px]">
          Nature's <span className="italic">Finest</span>, Delivered with Purpose.
        </h3>
        <h3 className="font-serif text-[clamp(1rem,2vw,2rem)]  mt-4 leading-none text-black/70">
          Where Quality is Not a Promise — It's Our Standard.
        </h3>
      </div>

      <p className="text-[11px] tracking-[0.3em] font-medium text-black/40 uppercase ">
        The Four Pillars of Naema ·
      </p>

      {/* Cards */}
      <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.title} pillar={pillar} />
        ))}
      </div>

      {/* Commitment box */}
      <div className="w-full border-2 border-gold rounded-2xl bg-navy px-16 py-14 max-lg:px-10 max-md:px-6 flex flex-col items-center gap-5 text-center">
        <p className="text-[10px] tracking-[0.3em] text-cream/40 uppercase font-medium">
          Our Commitment
        </p>
        <h3 className="font-serif text-[clamp(1.6rem,2.5vw,2.5rem)] text-cream leading-tight max-w-[600px]">
          Our Unbreakable Commitment
        </h3>
        <p className="font-serif italic text-cream/80 text-[clamp(1rem,1.6vw,1.3rem)] max-w-[620px] leading-relaxed">
          "We will NEVER compromise on Quality, Freshness, or Delivery."
        </p>
        <div className="w-12 h-px bg-gold/40 my-1" />
        <p className="text-cream/60 text-sm leading-relaxed max-w-[500px] tracking-tight">
          From our sourcing partners to your doorstep — every Naema product
          carries the same unwavering promise of excellence.
        </p>
      </div>

    </div>
  );
};

export default Pillars;