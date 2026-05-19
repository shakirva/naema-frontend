import Image from "next/image";
import Link from "next/link";
import React from "react";
import ComboBundle from "../sections/ComboBundle";

const items = [
  {
    title: "The Royal Ajwa",
    image: "/chocolate.png",
    height: "lg:row-span-2",
  },
  {
    title: "The Sweetness of Tradition",
    image: "/dn.png",
  },
  {
    title: "The Caramelly Classic",
    image: "/datedark.png",
  },
  {
    title: "An Exquisite Symphony",
    image: "/misc.png",
    height: "lg:row-span-2",
  },
];

const Grid = () => {
  return (
    <section className="w-full bg-[#0A223A] px-5 md:px-8 lg:px-16 py-16 md:py-24 lg:rounded-t-[200px] md:rounded-t-[120px] rounded-t-[60px] border-t-10 border-darkgold relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/bigdarkpalm.png"
          alt="Palm"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="font-serif text-[22px] text-cream leading-none w-fit bg-gold/10 border border-gold/30 rounded-lg px-4 py-2">
            Featured Collections
          </span>

          <h2 className="font-serif text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] text-cream mt-8 max-w-[900px]">
            Handpicked <span className="italic text-gold">Favorites.</span>
          </h2>

          <p className="mt-6 text-cream/70 text-[clamp(1rem,1.5vw,1.15rem)] tracking-tight leading-[1.3] max-w-[620px]">
            Curated selections crafted for gifting, sharing, and everyday
            indulgence.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_0.9fr_1fr] gap-5 lg:auto-rows-[280px] mb-5">
          {/* Left Tall Card */}
          <Link
            href="/shop"
            className={`
              group relative overflow-hidden rounded-[28px]
              border-2 border-gold
              h-[420px] md:h-[520px] lg:h-auto
              ${items[0].height}
            `}
          >
            <Image
              src={items[0].image}
              alt={items[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
              <h3 className="font-serif text-[clamp(2.2rem,3vw,4rem)] leading-[0.95] text-cream max-w-[280px]">
                {items[0].title}
              </h3>

              <span className="inline-block mt-4 text-sm text-gold border-b border-gold/40 pb-1">
                View Collection
              </span>
            </div>
          </Link>

          {/* Middle Column */}
          <div className="flex flex-col gap-5 lg:h-[calc(280px*2+20px)]">
            {items.slice(1, 3).map((item) => (
              <Link
                key={item.title}
                href="/shop"
                className="
                  group relative overflow-hidden
                  rounded-[28px]
                  border-2 border-gold
                  flex-1
                  min-h-[240px]
                "
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                  <h3 className="font-serif text-[clamp(1.8rem,2vw,2.8rem)] leading-[1] text-cream max-w-[300px]">
                    {item.title}
                  </h3>

                  <span className="inline-block mt-3 text-sm text-gold border-b border-gold/40 pb-1">
                    View Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Tall Card */}
          <Link
            href="/shop"
            className={`
              group relative overflow-hidden rounded-[28px]
              border-2 border-gold
              h-[420px] md:h-[520px] lg:h-auto
              ${items[3].height}
            `}
          >
            <Image
              src={items[3].image}
              alt={items[3].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
              <h3 className="font-serif text-[clamp(2.2rem,3vw,4rem)] leading-[0.95] text-cream max-w-[320px]">
                {items[3].title}
              </h3>

              <span className="inline-block mt-4 text-sm text-gold border-b border-gold/40 pb-1">
                View Collection
              </span>
            </div>
          </Link>
        </div>
          <ComboBundle />
      </div>
    </section>
  );
};

export default Grid;