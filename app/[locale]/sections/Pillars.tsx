"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const PillarCard = ({ pillar }: { pillar: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-gold cursor-pointer shadow-lg group"
      style={{ minHeight: 420 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      <Image
        src={pillar.image}
        alt={pillar.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-103"
      />
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
            className="shrink-0 size-8 rounded-full border border-gold text-cream flex items-center justify-center text-lg leading-none transition-transform duration-500"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            aria-label={open ? "Close" : "Open"}
          >
            +
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="font-serif  text-cream/80 text-base leading-relaxed">
            {pillar.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Pillars = () => {
  const t = useTranslations("ValueSection");

  const pillars = [
    {
      numeral: "I",
      title: t("pillars.quality.title"),
      description: t("pillars.quality.description"),
      image: "/quality.jpg",
    },
    {
      numeral: "II",
      title: t("pillars.trust.title"),
      description: t("pillars.trust.description"),
      image: "/trust.jpg",
    },
    {
      numeral: "III",
      title: t("pillars.authenticity.title"),
      description: t("pillars.authenticity.description"),
      image: "/auth.jpg",
    },
    {
      numeral: "IV",
      title: t("pillars.premium.title"),
      description: t("pillars.premium.description"),
      image: "/premium.jpg",
    },
  ];

  const stats = [
    {
      value: "100%",
      label: t("stats.stat1"),
      rotate: "-rotate-3",
      bg: "bg-cream",
      text: "text-navy",
    },
    {
      value: "50+",
      label: t("stats.stat2"),
      rotate: "rotate-2",
      bg: "bg-gold",
      text: "text-navy",
    },
    {
      value: "10K+",
      label: t("stats.stat3"),
      rotate: "-rotate-1",
      bg: "bg-[#c8a96e]",
      text: "text-navy",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto gap-14">
      {/* Heading */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="font-serif text-black text-[clamp(2rem,4.4vw,4rem)] leading-none max-w-[650px]">
          {t.rich("title", {
            finest: (chunks) => <span className="italic text-deepgold">{chunks}</span>
          })}
        </h3>
        <h3 className="font-serif text-[clamp(1rem,1.5vw,1.5rem)] mt-4 leading-none text-black/70">
          {t("subtitle")}
        </h3>
      </div>

      {/* Pillar cards */}
      <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.title} pillar={pillar} />
        ))}
      </div>

      {/* Commitment box */}
      <div className="w-full border-2 border-deepgold  shadow-lg rounded-2xl bg-navy px-16 py-24 max-md:py-12 max-lg:px-10 max-md:px-8 flex flex-col md:flex-row items-center justify-between gap-16 max-md:gap-4">
        {/* Left — text */}
        <div className="flex flex-col gap-6 flex-1 max-w-[480px] max-md:text-center max-md:items-center">
          <h3 className="font-serif text-[clamp(2rem,4.5vw,4.5rem)] text-cream leading-none">
            {t.rich("commitment.title", {
              commitment: (chunks) => <><br /><span className="italic text-lightgold">{chunks}</span></>
            })}
          </h3>
          <p className="text-cream/70 text-[clamp(0.9rem,1.3vw,1.1rem)] leading-relaxed tracking-tight">
            {t("commitment.description")}
          </p>
          <div className="w-10 h-px bg-gold" />
          <p className="font-serif  text-cream text-sm">{t("commitment.promise")}</p>
        </div>

        {/* Right — stacked stat cards */}
        <div className="relative flex-1 flex flex-col gap-2 items-start max-md:items-center max-md:gap-0   justify-center w-full max-w-[420px] min-h-[300px]">
          {/* Card 1 */}
          <div className=" w-[320px] max-lg:w-[280px]  -translate-x-10 -rotate-3 max-md:translate-0 shadow-[0_8px_30px_rgba(204,186,120,0.25)] bg-cream rounded-lg border-2 border-gold px-4 py-4 flex items-end gap-4">
            <span className="font-serif font-bold text-[clamp(2.5rem,8vw,6.25rem)] leading-[0.8] text-navy">
              100%
            </span>

            <span className="text-[10px] font-medium tracking-wider whitespace-pre-line text-navy opacity-80 leading-tight pb-1">
              {stats[0].label}
            </span>
          </div>

          {/* Card 2 */}
          <div className=" rotate-4 bg-gold rounded-lg  w-[320px] max-lg:w-[280px]  shadow-[0_8px_30px_rgba(204,186,120,0.25)] max-md:translate-0 border-2 border-deepgold px-4 py-4 flex items-end gap-4 translate-x-10 ">
            <span className="font-serif font-bold text-[clamp(2.5rem,8vw,6.25rem)] leading-[0.8] text-navy">
              50+
            </span>

            <span className="text-[10px] font-medium tracking-wider whitespace-pre-line text-navy opacity-80 leading-tight pb-1">
              {stats[1].label}
            </span>
          </div>

          {/* Card 3 */}
          <div className=" -rotate-3 bg-[#c8a96e] w-[320px] max-lg:w-[280px]  shadow-[0_8px_30px_rgba(204,186,120,0.25)] max-md:translate-0  rounded-lg border-2 border-gold px-4 py-4 flex -translate-x-2 items-end gap-4">
            <span className="font-serif font-bold text-[clamp(2.5rem,8vw,6.25rem)] leading-[0.8] text-navy">
              10K+
            </span>

            <span className="text-[10px] font-medium tracking-wider whitespace-pre-line text-navy opacity-80 leading-tight pb-1">
              {stats[2].label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pillars;
