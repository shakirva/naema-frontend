import Image from "next/image";
import React from "react";

const OurStoryBlocks = () => {
  return (
    <section className="w-full bg-cream px-5 md:px-8 lg:px-16 py-16 md:py-24  border-b-2 border-gold relative overflow-hidden">
      <div className="h-full w-full absolute inset-0 opacity-10">
              <Image src="/goldpalmm.jpg" fill alt="palm" className="object-cover" />
            </div>
      <div className="max-w-[1440px] mx-auto flex flex-col">

        <h2 className="font-serif text-[clamp(2.8rem,8vw,5rem)] text-center text-navy leading-none">
          Rooted in Kuwait, <br /><span className="italic">Crafted for You.</span>
        </h2>

        {/* Block 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mt-24 max-md:mt-12">
          <div className="w-full flex-1 rounded-2xl overflow-hidden aspect-[4/3] border-3 border-gold relative shrink-0">
            <Image src="/orchard.jpg" alt="Our orchards" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-5 flex-1 max-md:w-full">
            <span className="w-fit font-serif text-[clamp(0.75rem,1vw,0.875rem)] border border-gold bg-gold/20 text-navy px-3 py-1.5 rounded">
              Our Orchards
            </span>
            <h3 className="font-serif text-[clamp(2rem,5vw,4rem)] text-navy leading-tight">
              From Palm to Package
            </h3>
            <div className="w-full h-px bg-gold/30" />
            <p className="text-navy/70 text-[clamp(0.875rem,1.2vw,1rem)] leading-relaxed tracking-tight max-w-[520px]">
              Our dates begin their journey in the sun-drenched orchards of
              India, carefully hand-picked at peak ripeness. We build lasting
              relationships with our growers — people who know their land and
              treat every harvest with deep respect.
            </p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="flex items-center flex-col-reverse md:flex-row gap-8 md:gap-16 mt-24 max-md:mt-12">
          <div className="flex flex-1 w-full flex-col gap-5">
            <span className="w-fit font-serif text-[clamp(0.75rem,1vw,0.875rem)] border border-gold bg-gold/20 text-navy px-3 py-1.5 rounded">
              Our Craft
            </span>
            <h3 className="font-serif text-[clamp(2rem,5vw,4rem)] text-navy leading-tight">
              Made with Intention
            </h3>
            <div className="w-full h-px bg-gold/30" />
            <p className="text-navy/70 text-[clamp(0.875rem,1.2vw,1rem)] leading-relaxed tracking-tight max-w-[520px]">
              Every product in our collection is assembled with care — from
              stuffed dates and roasted nuts to our artisan chocolate range. No
              shortcuts, no fillers. Just premium ingredients brought together
              thoughtfully.
            </p>
          </div>
          <div className="w-full flex-1 rounded-2xl overflow-hidden aspect-[4/3] relative border-3 border-gold shrink-0">
            <Image src="/craft.jpg" alt="Our craft" fill className="object-cover" />
          </div>
        </div>

        {/* Block 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mt-24 max-md:mt-12">
          <div className="w-full flex-1 rounded-2xl overflow-hidden aspect-[4/3] relative border-3 border-gold shrink-0">
            <Image src="/fresh.jpg" alt="Our delivery" fill className="object-cover" />
          </div>
          <div className="flex flex-1 w-full flex-col gap-5 ">
            <span className="w-fit font-serif text-[clamp(0.75rem,1vw,0.875rem)] border border-gold bg-gold/20 text-navy px-3 py-1.5 rounded">
              Our Promise
            </span>
            <h3 className="font-serif text-[clamp(2rem,5vw,4rem)] text-navy leading-tight">
              To Your Door, Fresh
            </h3>
            <div className="w-full h-px bg-gold/30" />
            <p className="text-navy/70 text-[clamp(0.875rem,1.2vw,1rem)] leading-relaxed tracking-tight max-w-[520px]">
              From the moment an order is placed, we move fast. Every Naema box
              is packed to preserve freshness and delivered with the same care
              we put into sourcing — because the last mile matters just as much
              as the first.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurStoryBlocks;