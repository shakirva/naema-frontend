import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full relative h-[80vh]">
      <Image
        src="/aboutpalm.jpg"
        alt="palm"
        fill
        className="object-cover saturate-50"
      />

      <div className="absolute inset-0 flex flex-col justify-end px-16 pb-12 max-lg:px-8 max-md:px-5">
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none text-black">
          Great Flavour. <br /> In Every Collection.
        </h1>
        <p className="text-base tracking-tight mt-4 max-w-[350px] text-black/80">
          Discover the craftsmanship, quality, and care behind everything we
          create.
        </p>
      </div>
    </section>
  );
};

export default Hero;
