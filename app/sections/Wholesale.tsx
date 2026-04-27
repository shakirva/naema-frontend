import Image from "next/image";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Wholesale = () => {
  return (
    <div className="max-w-7xl mx-auto relative z-1 mt-6">
      <div className="bg-navy border-2 border-gold flex rounded-xl justify-between py-12 px-8">
        <div className="flex flex-col">
          <span className="w-fit capitalize font-medium tracking-tight text-[10px] border border-gold bg-cream text-navy px-2 py-2 rounded-full leading-none text-center">
            wholesale
          </span>
          <h4 className="font-serif text-[48px] text-cream leading-none mt-4">
            Order in bulk, <span className="italic">save more</span>
          </h4>
          <p className="mt-2 text-[16px] text-cream/70 tracking-tight max-w-[450px]">
            Whether you're stocking a store or planning a large event, we offer
            flexible wholesale pricing with guaranteed freshness and fast
            delivery on every order.
          </p>
          <div className="mt-8 flex gap-2">
            <button className="flex items-center gap-2 text-center py-3 px-6 rounded-full font-bold tracking-tight text-sm bg-gold text-navy border border-gold hover:bg-gold/80 transition-all duration-200 cursor-pointer leading-none">
              Get a quote <FaArrowRightLong />
            </button>
            <button className="text-center py-3 px-6 rounded-full border-gold border-2 bg-transparent text-cream font-bold  tracking-tight text-sm hover:bg-white/10 transition-all duration-200 cursor-pointer leading-none">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[200px] h-[260px] rounded-[999px] overflow-hidden -rotate-25 mr-6 border-2 border-gold">
            <Image
              src="/dry.jpg"
              alt="Dry Fruits"
              width={260}
              height={340}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[200px] h-[260px] rounded-[999px] overflow-hidden rotate-25 ml-6 border-2 border-gold">
            <Image
              src="/chocos.jpg"
              alt="Chocolates"
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