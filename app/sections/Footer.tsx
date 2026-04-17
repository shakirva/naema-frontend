import React from "react";
import { PiTreePalm } from "react-icons/pi";
import { LuShoppingBasket } from "react-icons/lu";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0A223A] px-16 py-12 text-white w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex  items-center gap-16 ">
          <div className="flex flex-col  w-[50%] ">
            <h4 className="font-serif text-[54px]  leading-none ">
              Direct from <br/> Farm to You
            </h4>
            <p className="mt-2  text-[18px] text-white/80 tracking-tight max-w-[400]">
              Handled entirely in-house from growing to packing so you get
              nothing but the best.
            </p>
            <div className="flex gap-4 text-black mt-16">
              <div className="h-[200px] max-w-[200px] rounded-lg  border-2 border-gold  bg-cream p-4 flex flex-col ">
                <PiTreePalm size={50} />
                <div className="mt-auto">
                  <h4 className="font-semibold font-serif text-[24px]">Perfectly Ripened</h4>
                  <p className="text-base leading-[1.2em]" >Harvested only when each date reaches its natural peak.</p>
                </div>
              </div>
              <div className="h-[200px] max-w-[200px]  text-black flex flex-col rounded-lg   border-2 border-gold   bg-cream p-4">
                <LuShoppingBasket size={50} />
                <div className="mt-auto">
                  <h4 className="font-semibold font-serif text-[24px]">Rooted in Tradition</h4>
                  <p className="text-base leading-[1.2em]">Years of expertise shape every harvest with care</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" ml-auto w-[50%] h-[600px] overflow-hidden relative  rounded-2xl border-3 border-gold  ">
            <Image
              src="/dateman.jpg"
              alt="Chocolates"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
