"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiInstagram } from "react-icons/fi";
import { useTranslations } from "next-intl";

const socials = [
  {
    id: 1,
    image: "/shop2.webp",
  },
  {
    id: 2,
    image: "/shop.webp",
  },
  {
    id: 3,
    image: "/shop3.webp",
  },
  {
    id: 4,
    image: "/longpalmtrees.webp",
  },
];

const SocialFeed = () => {
  const t = useTranslations("SocialFeed");
  return (
    <section className="w-full bg-cream px-5 md:px-8 lg:px-16 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Label */}
        <span className="font-serif text-[22px] text-navy leading-none w-fit bg-gold/20 border border-gold/40 rounded-lg px-4 py-2">
          {t("badge")}
        </span>

        {/* Heading */}
        <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] text-center text-navy whitespace-pre-line leading-[0.95] mt-8">
          {t.rich("title", {
            naema: (chunks) => (
              <span className="italic text-deepgold">{chunks}</span>
            ),
          })}
        </h2>

        {/* Body */}
        <p className="text-[clamp(1rem,1.5vw,1.15rem)] text-center text-navy/70 tracking-tight leading-[1.3] mt-6 max-w-[560px]">
          {t("description")}
        </p>

        {/* Feed Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full mt-14">
          {socials.map((item, index) => (
            <Link
              key={item.id}
              href="/"
              className={`group relative overflow-hidden rounded-[28px] border-2 border-gold bg-white aspect-[0.9/1] `}
            >
              <Image
                src={item.image}
                alt="Social feed"
                fill
                sizes="(min-width:1024px) 25vw, 50vw"
                className="object-cover  rounded-[28px]   "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />

              {/* Icon */}
              <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-cream/90 backdrop-blur-sm border border-gold flex items-center justify-center">
                <FiInstagram
                  className="text-navy text-[18px]"
                  color="#baa448"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="https://instagram.com/naema_foodstuff"
          className="mt-12 inline-flex items-center gap-3 rounded-full border-2 border-gold bg-navy px-7 py-3 text-cream relative group overflow-hidden"
        >
          <span className="flex items-center gap-3 group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
            <FiInstagram className="text-[18px]" />
            <span className="text-sm font-medium leading-none tracking-tight">
              {t("followUs")}
            </span>
          </span>
          <span className="absolute inset-0 flex items-center justify-center gap-3 bg-gold text-navy  rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
            <FiInstagram className="text-[18px]" />
            <span className="text-sm font-medium leading-none tracking-tight">
              {t("followUs")}
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default SocialFeed;
