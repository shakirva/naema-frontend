import Image from "next/image";

import React from "react";
import { IoMdStar } from "react-icons/io";
import ImageSlider from "../components/ImageSlider";
import { IoIosArrowRoundDown } from "react-icons/io";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section
      aria-labelledby="hero-title"
      className="w-full h-screen bg-navy bg-center bg-cover"
    >
      <div className="flex max-lg:flex-col max-lg:w-full mx-auto h-full">
        <ImageSlider />

        <div className="w-1/2 max-lg:h-1/2 max-lg:w-full text-cream flex flex-col items-center justify-center relative">
          <div
            aria-hidden="true"
            className="absolute flex items-center justify-center bottom-0 right-8 translate-y-[50%]"
          >
            <div className="flower flex items-center justify-center  bg-gold size-16 max-lg:size-12 ">
              <IoIosArrowRoundDown
                aria-hidden="true"
                className="size-14 max-lg:size-8 text-navy"
              />
            </div>
          </div>

          <div className="h-full w-full absolute inset-0 opacity-10">
            <Image
              src="/verydarkpalm.webp"
              fill
              alt=""
             
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-1 flex flex-col items-center max-lg:px-6 max-lg:py-8">
            <div
              className="flex gap-1"
              role="img"
              aria-label="5 out of 5 stars"
            >
              <IoMdStar aria-hidden="true" size={24} className="text-gold" />
              <IoMdStar aria-hidden="true" size={24} className="text-gold" />
              <IoMdStar aria-hidden="true" size={24} className="text-gold" />
              <IoMdStar aria-hidden="true" size={24} className="text-gold" />
              <IoMdStar aria-hidden="true" size={24} className="text-gold" />
            </div>

            <span className="text-xs text-cream/60 mt-2 leading-none">
              {t("customers")}
            </span>

            <h1
              id="hero-title"
              className="font-serif text-[clamp(2.25rem,4.4vw,4rem)] leading-none text-center mt-6"
            >
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h1>

            <p className="lg:text-[18px] text-base max-md:text-sm tracking-tight leading-[1.3em] max-w-[450px] text-center mt-6 text-cream/80">
              {t("description")}
            </p>

            <Link
              href="/shop"
              aria-label={t("button")}
              className="w-[200px] max-md:text-sm relative rounded-full font-medium tracking-tight inline-block text-center mt-8 group overflow-hidden border-2 border-gold"
            >
              <span className="block px-6 py-4 leading-none bg-[#E7DCB7] text-navy rounded-full group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
                {t("button")}
              </span>

              <span
                aria-hidden="true"
                className="block absolute inset-0 px-6 py-4 leading-none bg-navy text-gold rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]"
              >
                {t("button")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
