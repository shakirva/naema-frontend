import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdStar } from "react-icons/io";

const Hero = () => {
  return (
    <section className="w-full h-screen  bg-cream bg-center bg-cover ">
      <div className="flex mx-auto max-w-8xl h-full">
        <div className="w-1/2 bg-brown relative">
        <Image src="/dates2.jpg" fill alt="Naema" className="w-full h-auto object-cover" /></div>
        <div className="w-1/2  text-black pr-16 pl-8 flex flex-col items-center justify-center ">
        <div className="flex gap-1">
            <IoMdStar size={24} color="#ccba78" /><IoMdStar size={24} color="#ccba78" /><IoMdStar size={24} color="#ccba78" /><IoMdStar size={24} color="#ccba78" /><IoMdStar size={24} color="#ccba78" />
        </div>
        <span className="text-xs text-black/60 mt-2 leading-none">Cherished by 100,000+ customers</span>
          <h1 className="font-serif text-[48px] leading-none text-center mt-6">
            Finest dates and artisan
            <br /> chocolate crafted by Naema.
          </h1>
          <p className="text-[16px] tracking-tight leading-[1.3em] max-w-[380px] text-center mt-6 text-black/80">
            Discover the finest selection of premium dates, nuts and artisan
            chocolate, masterfully created by Naema
          </p>
          <Link href={"/shop"} className="w-[200px] bg-[#361C0C] text-white text-center px-6 py-4 leading-none  rounded-full uppercase mt-8">
          Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
