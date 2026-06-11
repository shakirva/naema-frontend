"use client";

import Image from "next/image";
import React, { useRef } from "react";
import DateSticker from "../components/DateSticker";

import Link from "next/link";
import ParallaxImage from "../components/ParallaxImage";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import { useTranslations } from "next-intl";

const About2 = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("About2");

  const sticker = useRef<HTMLDivElement | null>(null);
  const stickerlg = useRef<HTMLDivElement | null>(null);

  const span = useRef<HTMLSpanElement | null>(null);
  const title = useRef<HTMLParagraphElement | null>(null);
  const para = useRef<HTMLParagraphElement | null>(null);
  const icons = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(sticker.current, { y: -60 }, 0)
          .to(span.current, { y: -10 }, 0)
          .to(title.current, { y: -40 }, 0)
          .to(para.current, { y: -20 }, 0)
          .to(icons.current, { y: -15 }, 0);
      });

      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(sticker.current, { y: -120 }, 0)
          .to(span.current, { y: -10 }, 0)
          .to(stickerlg.current, { y: -120 }, 0)
          .to(title.current, { y: -100 }, 0)
          .to(para.current, { y: -60 }, 0)
          .to(icons.current, { y: -30 }, 0);
      });

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(sticker.current, { y: -200 }, 0)
          .to(span.current, { y: -100 }, 0)
          .to(stickerlg.current, { y: -200 }, 0)
          .to(title.current, { y: -200 }, 0)
          .to(para.current, { y: -100 }, 0)
          .to(icons.current, { y: -50 }, 0);
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="w-full relative border-y-2 border-navy bg-cream px-16 py-32 max-lg:pt-8 max-lg:px-8 max-md:px-5"
    >
      {/* Stickers */}
      <div ref={sticker} className="absolute top-0 right-2 z-10 lg:hidden">
        <DateSticker size={120} />
      </div>

      <div
        ref={stickerlg}
        className="absolute top-0 right-10 z-10 max-lg:hidden"
      >
        <DateSticker />
      </div>

      {/* Background */}
      <div className="h-full w-full absolute inset-0">
        <ParallaxImage
          mainclass="h-full w-full absolute inset-0"
          imageClass="object-cover scale-120"
          src="/goldpalmbg.webp"
          alt=""
        />

        <div className="h-full w-full absolute inset-0 bg-gold opacity-15" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center relative w-full max-w-[1440px] mx-auto h-full">
        {/* Badge */}
        <span
          ref={span}
          className="font-serif text-[clamp(1.5rem,4vw,5rem)] text-center leading-none bg-cream border-2 border-deepgold rounded-lg px-4 md:px-6 py-2 -rotate-2"
        >
          {t.rich("ourStory", {
            story: (chunks) => <span className="italic">{chunks}</span>,
          })}
        </span>

        {/* Title */}
        <p
          ref={title}
          className="text-[clamp(3rem,14vw,180px)] font-serif font-medium text-cream leading-none text-center mt-12 md:mt-18 lg:mt-24"
        >
          {t("bornIn")} <br />{" "}
          <span className="text-lightgold">{t("kuwait")}</span>
        </p>

        {/* Paragraph */}
        <p
          ref={para}
          className="font-serif text-[clamp(1.1rem,2.5vw,3rem)] text-cream leading-[1.25] text-center mt-10 md:mt-12 lg:mt-14 max-w-[90%] md:max-w-[80%]"
        >
          {t("description")}
        </p>

        {/* Icons + CTA */}
        <div className="w-full flex flex-col items-center justify-center mt-12 md:mt-18 lg:mt-24 gap-12 md:gap-16">
          {/* ICONS */}
          <div
            ref={icons}
            className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16"
          >
            {[
              {
                image: "/truck-icon.png",
                label: t("features.farmFresh"),
              },
              {
                image: "/orchard-icon.png",
                label: t("features.sourced"),
              },
              {
                image: "/premium-icon.png",
                label: t("features.premium"),
              },
            ].map(({ image, label }) => (
              <div
                key={label}
                className="flex flex-col gap-3 md:gap-4 items-center justify-center"
              >
                <div className="size-20 md:size-24 lg:size-32 bg-cream border-2 border-gold rounded-full flex items-center justify-center">
                  <Image
                    src={image}
                    alt={label}
                    width={70}
                    height={70}
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain"
                  />
                </div>

                <p className="font-serif text-base md:text-lg lg:text-xl text-cream max-w-[90px] md:max-w-[100px] text-center leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/about"
            className="px-8 md:px-12 py-4 md:py-5 text-sm md:text-base font-medium tracking-tight border-2 border-gold bg-cream rounded-full text-navy relative group overflow-hidden inline-block"
          >
            <span className="block group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
              {t("ourOrigins")}
            </span>
            <span className="block absolute inset-0 flex items-center justify-center bg-navy text-cream  rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
              {t("ourOrigins")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About2;
