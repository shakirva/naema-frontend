import Image from "next/image";
import React from "react";

const FounderNote = () => {
  return (
    <section className="w-full bg-gold/50 px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:justify-center gap-10 md:gap-16 lg:gap-20">
        {/* Left — main image */}
     
          <div className="w-full flex flex-1 md:w-[45%] lg:w-[38%] shrink-0 rounded-2xl overflow-hidden border-2 border-gold  h-[650px] relative">
            <Image
              src="/manwithdates.jpg"
              alt="Naema founder"
              fill
              className="object-cover"
            />
          </div>
       

        {/* Right — text */}
        <div className="flex flex-col  flex-1 max-md:text-center max-md:items-center">
          {/* Heading + portrait row */}
          <div className="flex items-center gap-4  lg:gap-12 w-full max-md:justify-center">
            <h2 className="font-serif text-[80px] text-navy leading-none">
              A Note From
              <br />
              Our Brand
            </h2>
            <div className="shrink-0 w-10 h-20 md:w-30 md:h-44 rounded-xl overflow-hidden border-2 -rotate-2 border-gold">
              <Image
                src="/mwd2.jpg"
                alt="Naema portrait"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Divider */}
         

          {/* Quote */}
          <p className=" text-[clamp(1rem,1.6vw,1.25rem)] max-w-[450px] mt-12 tracking-tight text-navy/80 leading-[1.25]">
            "Naema was never just about dates — it was about bringing something
            truly pure to your table. We set out with one belief: that premium
            quality, honest sourcing, and real care could exist in every box we
            send. Every date we pick, every nut we select, carries that same
            intention — to give you nothing less than nature's finest."
          </p>

          {/* Attribution */}
          <p className="text-[11px] mt-6  text-navy/50 uppercase font-medium">
            — The Naema Team, Founded in Kuwait
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderNote;
