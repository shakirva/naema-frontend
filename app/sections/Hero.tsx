import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdStar } from "react-icons/io";

const Hero = () => {
  return (
    <section className="w-full h-screen  bg-navy bg-center bg-cover ">
      <div className="flex mx-auto max-w-8xl h-full">
        <div className="w-1/2 bg-brown relative">
          <Image src="/dates2.jpg" fill alt="Naema" className=" object-cover" />
        </div>
        <div className="w-1/2  text-cream  flex flex-col items-center justify-center relative  ">
          <div className="h-full w-full absolute inset-0 opacity-10">
            <Image src="/darkpalm.png" fill alt="palm" className=" object-cover " />
          </div>

          <div className="relative z-1 flex flex-col items-center  ">
            <div className="flex gap-1">
              <IoMdStar size={24} color="#ccba78" />
              <IoMdStar size={24} color="#ccba78" />
              <IoMdStar size={24} color="#ccba78" />
              <IoMdStar size={24} color="#ccba78" />
              <IoMdStar size={24} color="#ccba78" />
            </div>
            <span className="text-xs text-cream/60 mt-2 leading-none ">
              Cherished by 100,000+ customers
            </span>
            <h1 className="font-serif text-[clamp(2.25rem,4.4vw,4rem)] leading-none text-center mt-6 ">
              Finest dates and artisan
              <br /> chocolate crafted by Naema.
            </h1>
            <p className="text-[18px] tracking-tight leading-[1.3em] max-w-[450px] text-center mt-6 text-cream/80">
              Discover the finest selection of premium dates, nuts and artisan
              chocolate, masterfully created by Naema
            </p>
            <Link
              href={"/shop"}
              className="w-[200px] bg-cream text-navy text-center font-medium tracking-tight px-6 py-4 leading-none  rounded-full uppercase mt-8 border-2 border-gold"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
