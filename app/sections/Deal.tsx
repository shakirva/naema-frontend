import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const Deal = () => {
  return (
    <section className="bg-white px-16 py-16 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="bg-cream border-2 border-gold flex rounded-xl  justify-between p-6">
          <div className="flex flex-col">
            <span className="w-fit uppercase font-medium tracking-tight text-[10px] bg-navy text-white px-2 py-2 rounded-full leading-none text-center  ">
              {" "}
              best value
            </span>
            <h4 className="font-serif text-[48px]  leading-none mt-4">
              Indulgence, once isn’t enough
            </h4>
            <p className="mt-2  text-[16px] text-black/80 tracking-tight max-w-[450]">
              Sweet, soft, and made to be savored — our dates are more than just
              a treat. They’re little moments of joy you’ll find yourself coming
              back to, again and again.
            </p>

            <div className="mt-auto flex gap-2">
              <button className=" text-center py-3 px-6 rounded-full  font-bold uppercase tracking-tight text-sm bg-navy text-white border border-gold hover:text-white transition-all duration-200 cursor-pointer leading-none">
                Add bundle - $23.87
              </button>
              <button className=" text-center py-3 px-6 rounded-full border-2 border-black/60 font-bold uppercase tracking-tight text-sm  transition-all duration-200 cursor-pointer leaading-none">
                View Details
              </button>
            </div>
          </div>
          <div className="flex items-center ">
            <div className="w-[200px] h-[260px] rounded-[999px] overflow-hidden -rotate-25 mr-6">
              <Image
                src="/dry.jpg"
                alt="Dry Fruits"
                width={260}
                height={340}
                className="w-full h-full object-cover"
              />
            </div>
            <FaPlus size={32} color="black" />
           
            <div className="w-[200px] h-[260px] rounded-[999px] overflow-hidden  rotate-25 ml-6">
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
    </section>
  );
};

export default Deal;
