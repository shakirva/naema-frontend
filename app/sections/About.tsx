import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const About = () => {
  return (
    <section className=" w-full bg-gold/30  px-16 py-16 rounded-[200px] border-t-1 border-b border-navy ">
      <div className="flex flex-col items-center  w-full max-w-7xl mx-auto h-full">
        <div>
        <h1 className="font-serif text-[80px]  text-center leading-none">
          Our <span className="italic">Story</span>
        </h1>
        <div className="flex items-center mt-6  ">
          <p className="text-[20px]  text-black/70 tracking-tight text-center font-medium">
            Naema is dedicated to sourcing and crafting the finest selection of
            premium dates, nuts, and artisan chocolates. Each product is
            carefully chosen for quality, freshness, and flavor, combining
            traditional expertise with a modern approach to indulgence. The
            focus remains on delivering authentic taste, refined presentation,
            and a consistently elevated experience.
          </p>
        </div>
        </div>
        <div className="flex gap-6 relative mt-16 w-full ">
          {/* Left */}
          <div className="relative flex-1 h-[350px] rounded-2xl overflow-hidden border-3 border-gold">
            <Image src="/shop2.png" alt="img1" fill className="object-cover" />
          </div>

          {/* Center (taller) */}
          <div className="relative flex-1 h-[450px] rounded-2xl overflow-hidden border-3 border-gold ">
            <Image src="/shop.png" alt="shop" fill className="object-cover" />
          </div>

          {/* Right */}
          <div className="relative flex-1 h-[350px] rounded-2xl overflow-hidden border-3 border-gold">
            <Image src="/shop3.png" alt="img3" fill className="object-cover" />
          </div>
        </div>
      <Link
  href={"/about"}
  className="flex items-center justify-center gap-2 w-[200px] bg-navy text-cream font-medium tracking-tight px-6 py-4 leading-none rounded-full mt-12 border-2 border-gold"
>
  More about us <FaArrowRightLong className="text-cream" />
</Link>
      </div>
    </section>
  );
};

export default About;
