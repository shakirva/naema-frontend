import Image from "next/image";
import React from "react";
import Latest from "./Latest";
import Link from "next/link";
import Best from "./Best";

const Shop = () => {
  return (
    <section className="min-h-screen w-full bg-white  px-16 py-12 ">
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        <h2 className="font-serif text-[52px] text-center leading-none">
          Our Collection
        </h2>
        <span className="text-[18px] tracking-tight leading-none text-center mt-4">
          Shop by preference
        </span>

        <div className="mt-24 flex justify-between items-center">
          {/* Dates */}
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="w-[260px] h-[340px] rounded-[999px] overflow-hidden">
              <Image
                src="/dates.jpg"
                alt="Dates"
                width={260}
                height={340}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[24px] text-center text-black/80 tracking-tight font-medium">
              Dates
            </p>
          </div>

          {/* Nuts */}
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="w-[260px] h-[340px] rounded-[999px] overflow-hidden">
              <Image
                src="/nuts.jpg"
                alt="Nuts"
                width={260}
                height={340}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[24px] text-center text-black/80 tracking-tight font-medium">
              Nuts
            </p>
          </div>

          {/* Dry Fruits */}
          <div className="flex flex-col gap-6 items-center ">
            <div className="w-[260px] h-[340px] rounded-[999px] overflow-hidden">
              <Image
                src="/dry.jpg"
                alt="Dry Fruits"
                width={260}
                height={340}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[24px] text-center text-black/80 tracking-tight font-medium">
              Dry Fruits
            </p>
          </div>

          {/* Chocolates */}
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="w-[260px] h-[340px] rounded-[999px] overflow-hidden">
              <Image
                src="/chocos.jpg"
                alt="Chocolates"
                width={260}
                height={340}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[24px] text-center text-black/80 tracking-tight font-medium">
              Chocolates
            </p>
          </div>
        </div>

        <Latest />
        <Best/>
        <div className="w-full flex items-center justify-center">
          <Link
            href={"/shop"}
            className="px-12 py-6 text-base font-medium uppercase tracking-tight border-2 border-gold bg-navy rounded-full text-white mt-6 w-fit "
          >
            Shop All Dates
          </Link>
        </div>
      </div>
      
    </section>
  );
};

export default Shop;
