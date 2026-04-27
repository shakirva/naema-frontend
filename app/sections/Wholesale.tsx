import Image from "next/image";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Wholesale = () => {
  return (
    <div className="max-w-7xl mx-auto relative z-1 mt-6">
      <div className="bg-navy border-2 border-gold flex max-md:flex-col rounded-xl justify-between py-12 px-8 max-lg:py-8 max-lg:px-6 gap-6">
        
        {/* Text side */}
        <div className="flex flex-col max-md:items-center flex-1">
          <span className="w-fit capitalize font-medium tracking-tight text-[10px] border border-gold bg-cream text-navy px-2 py-2 rounded-full leading-none text-center">
            wholesale
          </span>
          <h4 className="font-serif text-[clamp(1.6rem,3.33vw,3rem)] text-cream leading-none mt-4 max-md:text-center">
            Order in bulk, <span className="italic">save more</span>
          </h4>
          <p className="mt-2 max-lg:mt-3 text-sm lg:text-[16px] text-cream/70 tracking-tight max-w-[450px] max-lg:max-w-[280px] max-md:text-center">
            Whether you're stocking a store or planning a large event, we offer
            flexible wholesale pricing with guaranteed freshness and fast
            delivery on every order.
          </p>
          <div className="max-md:mt-8  mt-auto flex gap-2 flex-wrap max-md:justify-center">
            <button className="flex items-center gap-2 text-center py-3 px-5 max-lg:px-4 max-lg:py-2.5 rounded-full font-bold tracking-tight text-sm bg-gold text-navy border border-gold hover:bg-gold/80 transition-all duration-200 cursor-pointer leading-none">
              Get a quote <FaArrowRightLong />
            </button>
            <button className="text-center py-3 px-5 max-lg:px-4 max-lg:py-2.5 rounded-full border-gold border-2 bg-transparent text-cream font-bold tracking-tight text-sm hover:bg-white/10 transition-all duration-200 cursor-pointer leading-none">
              Learn More
            </button>
          </div>
        </div>

        {/* Images side */}
        <div className=" max-md:mt-4 shrink-0 max-md:flex max-md:items-center max-md:justify-center">
          <div className="w-[350px]  h-[250px] max-md: max-md:h-[200px] rounded-[999px] overflow-hidden  border-2 border-gold">
            <Image
              src="/dry.jpg"
              alt="Dry Fruits"
              width={260}
              height={340}
              className="w-full h-full object-cover"
            />
          </div>
         
        </div>

      </div>
    </div>
  );
};

export default Wholesale;