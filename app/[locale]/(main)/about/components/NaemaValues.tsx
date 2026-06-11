import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const NaemaValues = () => {
  const t = useTranslations("About");

  const values = [
    {
      title: t("val1Title"),
      description: t("val1Desc"),
      image: "/val1.png",
    },
    {
      title: t("val2Title"),
      description: t("val2Desc"),
      image: "/val-2.png",
    },
    {
      title: t("val3Title"),
      description: t("val3Desc"),
      image: "/val-3.png",
    },
    {
      title: t("val4Title"),
      description: t("val4Desc"),
      image: "/val-4.png",
    },
  ];

  return (
    <section className="w-full bg-navy px-5 md:px-8 lg:px-16 py-16 md:py-24 relative overflow-scroll">
      <div className="absolute inset-0 h-full w-full opacity-5  ">
        <Image
          src="/bigdarkpalm.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="max-w-[1000px]  relative z-1 mx-auto flex flex-col items-center">
        {/* Label */}
        <span className="font-serif text-[clamp(1rem,1.5vw,1.5rem)] text-cream font-medium lg:text-center leading-none w-fit bg-gold/20 border border-gold/50 rounded-lg px-4 py-2">
          {t("valuesLabel")}
        </span>

        {/* Big heading */}
        <h2 className="font-serif text-[clamp(3rem,10vw,7.5rem)] text-cream leading-none text-center mt-8 max-w-[900px]">
          {t("valuesHeadLine1")}{" "}
          <span className="italic text-lightgold">{t("valuesHeadLine2")}</span>
        </h2>

        {/* Body */}
        <p className="text-[clamp(0.875rem,1.4vw,1.25rem)] max-w-[450px] text-center tracking-tight mt-8 text-cream/80 leading-[1.25]">
          {t("valuesDesc")}
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full mt-12">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex flex-col  bg-cream  border border-gold rounded-2xl px-4 md:px-6 py-4  "
            >
              {/* Image */}
              <div className="relative w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28">
                <Image
                  src={v.image}
                  alt={v.title}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-black text-[clamp(1.2rem,2vw,2rem)] leading-tight">
                  {v.title}
                </h3>
                <p className="  text-black/80 text-[14px] leading-[1.25] max-md:text-[12px] tracking-tight">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NaemaValues;
