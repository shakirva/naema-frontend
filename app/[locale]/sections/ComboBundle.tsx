import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const ComboBundle = () => {
  return (
    <div className="max-w-[1440px] mx-auto w-full">
      <div className="bg-cream border-2 border-gold flex max-md:flex-col rounded-xl justify-between py-10  px-8 max-lg:py-8 max-lg:px-6 gap-6">
        <div className="flex flex-col max-md:items-center flex-1">
          <span className="w-fit capitalize font-medium tracking-tight text-[10px] border border-gold bg-navy text-white px-3 py-2 rounded-full leading-none text-center">
            best value
          </span>
          <h4 className="font-serif text-[clamp(1.6rem,3.33vw,3rem)] max-md:text-center leading-none mt-6">
            Indulgence, once isn't enough
          </h4>
          <p className="mt-4 max-lg:mt-3 text-sm lg:text-[16px] text-black/80 tracking-tight max-w-[420px] max-lg:max-w-[280px] max-md:text-center">
            Sweet, soft, and made to be savored — our dates are more than just a
            treat. They're little moments of joy you'll find yourself coming
            back to, again and again.
          </p>
          <div className="mt-auto flex gap-2 max-lg:mt-5 flex-wrap max-md:justify-center">
            <button className="relative group overflow-hidden text-center py-6 px-6 max-lg:px-4 max-lg:py-2.5 rounded-full font-medium tracking-tight text-sm bg-navy text-white border border-gold cursor-pointer leading-none">
              <span className="block group-hover:-translate-y-full transition-all  duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
                Add bundle — $23.87
              </span>
              <span className="block absolute inset-0 flex items-center justify-center bg-[#E7DCB7] text-navy  rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
                Add bundle — $23.87
              </span>
            </button>

            <button className="relative group overflow-hidden text-center py-6 px-6 max-lg:px-4 max-lg:py-2.5 rounded-full border-gold border-2 bg-gold/40 font-medium tracking-tight text-sm cursor-pointer leading-none">
              <span className="block group-hover:-translate-y-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
                View Details
              </span>
              <span className="block absolute inset-0 flex items-center justify-center bg-navy text-white  rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
                View Details
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center max-md:mt-4 shrink-0">
          <div className="w-[220px] h-[300px] max-lg:w-[110px] max-lg:h-[160px] max-md:w-[140px] max-md:h-[200px] rounded-[999px] overflow-hidden -rotate-12 max-lg:-rotate-8 mr-5 max-lg:mr-3 border-2 border-gold">
            <Image
              src="/dry.jpg"
              alt="Dry Fruits"
              width={320}
              height={420}
              className="w-full h-full object-cover"
            />
          </div>

          <FaPlus className="lg:size-7 size-4 shrink-0 text-black" />

          <div className="w-[220px] h-[300px] max-lg:w-[110px] max-lg:h-[160px] max-md:w-[140px] max-md:h-[200px] rounded-[999px] overflow-hidden rotate-12 max-lg:rotate-8 ml-5 max-lg:ml-3 border-2 border-gold">
            <Image
              src="/chocos.jpg"
              alt="Chocolates"
              width={320}
              height={420}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboBundle;