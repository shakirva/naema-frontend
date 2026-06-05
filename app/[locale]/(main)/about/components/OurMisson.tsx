import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const OurMisson = () => {
  const t = useTranslations("About");
  return (
    <section className=" w-full bg-cream  border-y-2 border-darkgold  relative overflow-hidden  ">
    <div className="h-full w-full absolute inset-0 opacity-10">
            <Image src="/goldpalmm.jpg" fill alt="palm" className="object-cover" />
          </div>
      <div className=" max-w-[1440px] mx-auto px-16  max-lg:px-8 max-md:px-5">
        <div className="w-full flex flex-col  items-center py-16">
          {" "}
          <h2 className="font-serif text-[24px] font-medium lg:text-center leading-none w-fit bg-gold/20 border border-gold/50 rounded-lg px-4 py-2  ">
            {t("missionLabel")}
          </h2>
          <h3 className="font-serif text-[clamp(2.8rem,8vw,5rem)] text-black/90 leading-none mt-6 text-center">
            {t("missionLine1")} <br/> {t("missionLine2")}
          </h3>
          <p className="lg:text-[20px] text-black/80  tracking-tight leading-[1.25] text-center mt-12 max-w-[450px]">
            {t("missionDesc")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurMisson;
