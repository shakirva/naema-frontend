import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import Wholesale from "./Wholesale";
import Pillars from "./Pillars";
import ComboBundle from "./ComboBundle";

const ValueSection = () => {
  return (
    <section className="w-full relative px-16 py-24 max-lg:py-16 max-lg:px-8 max-md:px-5 border-y-2 border-darkgold">
      {/* Shared goldpalm background */}
      <div className="h-full w-full absolute inset-0 opacity-25">
        <Image src="/goldpalmm.jpg" fill alt="palm" className="object-cover" />
      </div>

      <div className="relative z-10 flex flex-col gap-18 max-lg:gap-16">
        {/* Pillars */}
        <Pillars />

      

        <Wholesale />
      </div>
     
    </section>
  );
};

export default ValueSection;
