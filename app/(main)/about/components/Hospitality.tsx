"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const tabs = ["Tradition", "Connection", "Celebration"];

const cards = [
  {
    title: "Tradition",
    description:
      "Rooted in timeless hospitality, every Naema collection carries the warmth of shared tables and meaningful gatherings.",
    image: "/tradition.jpg",
    accent: "bg-[#ead6c2]",
  },
  {
    title: "Connection",
    description:
      "Thoughtfully curated to bring people closer — from quiet evenings at home to generous celebrations with family and friends.",
    image: "/connection.jpg",
    accent: "bg-[#d9c9a6]",
  },
  {
    title: "Celebration",
    description:
      "Created for gifting, sharing, and memorable moments that deserve something beautifully crafted and deeply satisfying.",
    image: "/celeb.jpg",
    accent: "bg-[#d7d1b8]",
  },
];

const Hospitality = () => {
  const [active, setActive] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  const isAutoScrolling = useRef(false);

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const card = container.children[index] as HTMLElement;

    isAutoScrolling.current = true;

    setActive(index);

    container.scrollTo({
      left:
        card.offsetLeft -
        container.offsetWidth / 2 +
        card.offsetWidth / 2,
      behavior: "smooth",
    });

    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 500);
  };

  useEffect(() => {
    const container = sliderRef.current;

    if (!container) return;

    const handleScroll = () => {
      if (isAutoScrolling.current) return;

      const containerCenter =
        container.scrollLeft + container.offsetWidth / 2;

      const cardElements = Array.from(
        container.children
      ) as HTMLElement[];

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardElements.forEach((card, index) => {
        const cardCenter =
          card.offsetLeft + card.offsetWidth / 2;

        const distance = Math.abs(
          containerCenter - cardCenter
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActive(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-full bg-gold/20 px-5 md:px-8 lg:px-16 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Label */}
        <span className="font-serif text-[22px] text-navy leading-none w-fit bg-gold/20 border border-gold/40 rounded-lg px-4 py-2">
          Our Philosophy
        </span>

        {/* Heading */}
        <h2 className="font-serif text-[clamp(2.8rem,7vw,6rem)] text-center text-navy leading-[0.95] mt-8 max-w-[900px]">
          A Taste of <span className="italic">Hospitality.</span>
        </h2>

        {/* Body */}
        <p className="text-[clamp(1rem,1.5vw,1.2rem)] text-center tracking-tight text-navy/70 leading-[1.3] max-w-[700px] mt-6">
          Naema is built around generosity, gathering, and
          thoughtful gifting — creating collections designed
          to be shared and remembered.
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-8 md:gap-14 mt-12 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => scrollToCard(index)}
              className={`relative pb-2 text-sm md:text-base transition-all duration-300 whitespace-nowrap cursor-pointer ${
                active === index
                  ? "text-navy"
                  : "text-navy/35 hover:text-navy/60"
              }`}
            >
              {tab}

              <span
                className={`absolute left-0 bottom-0 h-[2px] rounded-full bg-gold transition-all duration-300 ${
                  active === index ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="w-full mt-14">
          <div
            ref={sliderRef}
            className="
              flex gap-6 overflow-x-auto scrollbar-hide
              snap-x snap-mandatory scroll-smooth
              pb-2
              px-[5vw] lg:px-[20vw]
            "
          >
            {cards.map((card) => (
              <div
                key={card.title}
                className="
                  relative
                  min-w-[88vw]
                  md:min-w-[75vw]
                  lg:min-w-[43vw]
                  h-[420px]
                  md:h-[480px]
                  rounded-xl
                  overflow-hidden
                  border border-gold/30
                  shrink-0
                  snap-center
                "
              >
                {/* Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Floating content */}
                <div
                  className={`absolute left-5 bottom-5 md:left-8 md:bottom-8 max-w-[300px] md:max-w-[320px] rounded-xl border border-black/10 px-5 py-5 md:px-6 md:py-6 ${card.accent}`}
                >
                  <h3 className="font-serif text-[clamp(2rem,3vw,3rem)] text-navy leading-none">
                    {card.title}
                  </h3>

                  <p className="text-sm md:text-[15px] leading-relaxed tracking-tight text-navy/75 mt-4">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hospitality;