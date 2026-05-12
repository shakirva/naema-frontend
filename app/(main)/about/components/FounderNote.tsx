import Image from "next/image";
import React from "react";

const FounderNote = () => {
  return (
    <section className="w-full bg-cream px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-20">

        {/* Left — main image */}
        <div className="w-full md:w-[45%] lg:w-[48%] shrink-0 rounded-2xl overflow-hidden border-2 border-gold aspect-[3/4] relative">
          <Image
            src="/founder-main.jpg"
            alt="Naema founder"
            fill
            className="object-cover"
          />
        </div>

        {/* Right — text */}
        <div className="flex flex-col gap-6 flex-1 max-md:text-center max-md:items-center">

          {/* Heading + portrait row */}
          <div className="flex items-start justify-between gap-4 w-full max-md:justify-center">
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-navy leading-none">
              A Note From<br />Our Brand
            </h2>
            <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-gold">
              <Image
                src="/founder-portrait.jpg"
                alt="Naema portrait"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-10 h-px bg-gold" />

          {/* Quote */}
          <p className="font-serif text-[clamp(1rem,1.6vw,1.25rem)] text-navy/80 leading-relaxed">
            "Naema was never just about dates — it was about bringing something
            truly pure to your table. We set out with one belief: that premium
            quality, honest sourcing, and real care could exist in every box we
            send. Every date we pick, every nut we select, carries that same
            intention — to give you nothing less than nature's finest."
          </p>

          {/* Attribution */}
          <p className="text-[11px] tracking-[0.25em] text-navy/50 uppercase font-medium">
            — The Naema Team, Founded in India
          </p>
        </div>

      </div>
    </section>
  );
};

export default FounderNote;