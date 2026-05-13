import Image from "next/image";
import React from "react";

const FounderNote = () => {
  return (
    <section className="w-full bg-gold/50 px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center lg:justify-center gap-10 md:gap-16 lg:gap-20">
        {/* Left — main image */}
        <div className="w-full lg:flex-1 lg:w-[38%] shrink-0 rounded-2xl overflow-hidden border-2 border-gold h-[420px] md:h-[550px] lg:h-[650px] relative">
          <Image
            src="/manwithdates.jpg"
            alt="Naema founder"
            fill
            className="object-cover"
          />
        </div>

        {/* Right — text */}
        <div className="flex flex-col flex-1 max-lg:items-center max-lg:text-center w-full">
          {/* Heading + portrait row */}
          <div className="flex items-center gap-4 md:gap-8 lg:gap-12 w-full max-lg:justify-center">
            <h2 className="font-serif text-[clamp(2.8rem,8vw,5rem)] text-navy leading-none">
              A Note From
              <br />
              Our Brand
            </h2>

            <div className="shrink-0 w-16 h-24 md:w-24 md:h-36 lg:w-30 lg:h-44 rounded-xl overflow-hidden border-2 -rotate-2 border-gold relative">
              <Image
                src="/mwd2.jpg"
                alt="Naema portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Quote */}
          <p className="text-[clamp(1rem,1.6vw,1.25rem)] max-w-[450px] mt-10 md:mt-12 tracking-tight text-navy/80 leading-[1.25]">
            "Naema was never just about dates — it was about bringing something
            truly pure to your table. We set out with one belief: that premium
            quality, honest sourcing, and real care could exist in every box we
            send. Every date we pick, every nut we select, carries that same
            intention — to give you nothing less than nature's finest."
          </p>

          {/* Attribution */}
          <p className="text-[11px] mt-6 text-navy/50 uppercase font-medium">
            — The Naema Team, Founded in Kuwait
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderNote;