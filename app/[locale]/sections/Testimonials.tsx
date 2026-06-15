"use client";

import React from "react";
import { IoMdStar } from "react-icons/io";
import { useTranslations } from "next-intl";

const Testimonials = () => {
  const t = useTranslations("Testimonials");

  const testimonials = [
    {
      id: 1,
      quote: t("items.item1.quote"),
      author: t("items.item1.author"),
      rating: 5,
      bg: "bg-[#f4a987]",
      border: "border-[#ed8253]",
    },
    {
      id: 2,
      quote: t("items.item2.quote"),
      author: t("items.item2.author"),
      rating: 5,
      bg: "bg-[#b9d789]",
      border: "border-[#B5CD92]",
    },
    {
      id: 3,
      quote: t("items.item3.quote"),
      author: t("items.item3.author"),
      rating: 4,
      bg: "bg-[#f5db94]",
      border: "border-[#DFC57A]",
    },
    {
      id: 4,
      quote: t("items.item4.quote"),
      author: t("items.item4.author"),
      rating: 5,
      bg: "bg-[#c9997c]",
      border: "border-[#B8937C]",
    },
    {
      id: 5,
      quote: t("items.item5.quote"),
      author: t("items.item5.author"),
      rating: 5,
      bg: "bg-[#d8bde7]",
      border: "border-[#BFA7CC]",
    },
  ];

  return (
    <section
      className="w-full bg-cream py-24 max-md:py-12 overflow-hidden px-16 max-lg:px-8 max-md:px-5"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center">
          <p className="font-serif text-[clamp(1.5rem,3.3vw,3rem)] lg:text-center leading-none w-fit bg-gold/20 border border-gold/50 rounded-lg px-4 py-2">
            {t("reviews")}
          </p>

          <h2
            id="testimonials-heading"
            className="font-serif text-[clamp(2.5rem,5vw,5rem)] text-center leading-[1.25] mt-10 max-lg:mt-5 max-w-[900px] text-black"
          >
            {t.rich("titleLine1", {
              everywhere: (chunks) => (
                <span className="italic text-deepgold">{chunks}</span>
              ),
            })}
            <br />
            {t("titleLine2")}
          </h2>
        </div>

        <div
          className="mt-24 max-lg:mt-12 overflow-x-auto scrollbar-hide"
          aria-label="Customer testimonials"
        >
          <div
            className="flex gap-4 min-w-max pb-4"
            role="list"
            aria-label="Testimonials list"
          >
            {testimonials.map((item) => (
              <article
                key={item.id}
                role="listitem"
                className={`w-[320px] h-[320px] rounded-[22px] border-2 shadow-sm flex flex-col items-center justify-center gap-5 p-8 ${item.bg} ${item.border}`}
              >
                <div
                  className="flex gap-0.5"
                 
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IoMdStar
                      key={i}
                      size={18}
                      color={i < item.rating ? "#1a2e5a" : "#00000025"}
                      aria-hidden="true"
                      focusable="false"
                    />
                  ))}
                </div>

                <blockquote>
                  <p className="font-serif text-[22px] leading-[1.2] text-center text-black max-w-[230px]">
                    "{item.quote}"
                  </p>
                </blockquote>

                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center text-black text-xs font-medium shrink-0"
                    aria-hidden="true"
                  >
                    {item.author.charAt(0)}
                  </div>

                  <cite className="not-italic text-black/80 text-sm tracking-tight">
                    {item.author}
                  </cite>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3">
          <div
            className="w-10 h-[2px] bg-deepgold/40 rounded-full"
            aria-hidden="true"
          />

          <span className="text-xs tracking-tight text-deepgold">
            {t("swipeToExplore")}
          </span>

          <div
            className="w-10 h-[2px] bg-deepgold/40 rounded-full"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;