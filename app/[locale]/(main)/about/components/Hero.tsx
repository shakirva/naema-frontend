"use client";

import ParallaxImage from "@/app/[locale]/components/ParallaxImage";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full relative h-screen">
      <ParallaxImage
        mainclass="w-full h-full absolute inset-0 overflow-hidden"
        imageClass="object-cover object-bottom scale-110 opacity-50"
        src="/palmbg.png"
        alt="palm"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 md:px-8 lg:px-16">
        <h1 className="font-serif text-[clamp(3rem,9vw,8rem)] leading-none text-black text-center">
          Great Flavour. <br /> In Every Collection.
        </h1>
        <p className="text-[20px] leading-[1.25] max-lg:text-[18px] max-md:text-[16px] tracking-tight mt-6 max-w-[400px] text-black/80 text-center">
          Discover the craftsmanship, quality, and care behind everything we
          create.
        </p>
      </div>
    </section>
  );
};

export default Hero;
