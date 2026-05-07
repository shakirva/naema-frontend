import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const About = () => {
  return (
    <section className=" w-full bg-gold/30  px-16 py-16 max-lg:pt-8 max-lg:px-8 max-md:px-5 lg:rounded-[200px] max-lg:rounded-[100px] max-md:rounded-[50px] border-t-1 border-b border-navy ">
      <div className="flex flex-col items-center  w-full max-w-[1440px] mx-auto h-full">
        <div>
          <h1 className="font-serif text-[clamp(2.25rem,5.56vw,5rem)] text-center leading-none">
            Our <span className="italic">Story</span>
          </h1>
          <div className="flex items-center mt-6 max-lg:mt-4  ">
            <p className="text-[clamp(0.75rem,1.39vw,1.25rem)] text-black/70 tracking-tight text-center font-medium">
               Rooted in tradition, Naema curates the finest dates, nuts,
              and artisan chocolates — chosen for quality, freshness, and an
              experience worth savoring. 
            </p>
          </div>
        </div>

        {/* use image carusel for small devices  */}
        <div className="flex gap-4 max-lg:gap-2 relative mt-16 max-lg:mt-8  w-full ">
          {/* Left */}
          <div className="relative flex-1 h-[350px] rounded-2xl overflow-hidden border-3 border-gold max-md:hidden">
            <Image src="/shop2.png" alt="img1" fill className="object-cover" />
          </div>

          {/* Center (taller) */}
          <div className="relative   flex-1  max-lg:flex-2 h-[450px] rounded-2xl overflow-hidden border-3 border-gold ">
            <Image src="/shop.png" alt="shop" fill className="object-cover" />
          </div>

          {/* Right */}
          <div className="relative flex-1 h-[350px] rounded-2xl overflow-hidden border-3 border-gold max-md:hidden">
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
