import Image from "next/image";
import React from "react";

const OurStoryBlocks = () => {
  return (
    <section className="w-full bg-cream px-5 md:px-8 lg:px-16 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col">

        {/* Top heading */}
        <h2 className="font-serif text-[clamp(2rem,4.5vw,4rem)] text-navy text-center leading-tight max-w-[700px] mx-auto mb-20 md:mb-32">
          Rooted in kuwait , <span className="italic">Crafted for You.</span>
        </h2>

        {/* Block 1 — image left, text right */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 mb-16 md:mb-0">
          <div className="w-full md:w-[55%] rounded-2xl overflow-hidden aspect-[4/3] relative border border-gold/20 shrink-0">
            <Image src="/story-orchards.jpg" alt="Our orchards" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-5 md:pt-32 max-w-[420px] max-md:w-full">
            <span className="w-fit text-[10px] font-medium tracking-[0.2em] uppercase border border-gold bg-gold/20 text-navy px-3 py-1.5 rounded">
              Our Orchards
            </span>
            <h3 className="font-serif text-[clamp(1.6rem,2.5vw,2.5rem)] text-navy leading-tight">
              From Palm to Package
            </h3>
            <div className="w-full h-px bg-gold/30" />
            <p className="text-navy/70 text-[clamp(0.875rem,1.2vw,1rem)] leading-relaxed tracking-tight">
              Our dates begin their journey in the sun-drenched orchards of
              India, carefully hand-picked at peak ripeness. We build lasting
              relationships with our growers — people who know their land and
              treat every harvest with deep respect.
            </p>
          </div>
        </div>

        {/* Block 2 — text left, image right */}
        <div className="flex flex-col-reverse md:flex-row items-start gap-8 md:gap-16 md:-mt-24 mb-16 md:mb-0">
          <div className="flex flex-col gap-5 md:pt-48 max-w-[420px] max-md:w-full">
            <span className="w-fit text-[10px] font-medium tracking-[0.2em] uppercase border border-gold bg-gold/20 text-navy px-3 py-1.5 rounded">
              Our Craft
            </span>
            <h3 className="font-serif text-[clamp(1.6rem,2.5vw,2.5rem)] text-navy leading-tight">
              Made with Intention
            </h3>
            <div className="w-full h-px bg-gold/30" />
            <p className="text-navy/70 text-[clamp(0.875rem,1.2vw,1rem)] leading-relaxed tracking-tight">
              Every product in our collection is assembled with care — from
              stuffed dates and roasted nuts to our artisan chocolate range.
              No shortcuts, no fillers. Just premium ingredients brought
              together thoughtfully.
            </p>
          </div>
          <div className="w-full md:w-[55%] rounded-2xl overflow-hidden aspect-[4/3] relative border border-gold/20 shrink-0">
            <Image src="/story-craft.jpg" alt="Our craft" fill className="object-cover" />
          </div>
        </div>

        {/* Block 3 — image left, text right */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 md:-mt-24">
          <div className="w-full md:w-[55%] rounded-2xl overflow-hidden aspect-[4/3] relative border border-gold/20 shrink-0">
            <Image src="/story-delivery.jpg" alt="Our delivery" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-5 md:pt-32 max-w-[420px] max-md:w-full">
            <span className="w-fit text-[10px] font-medium tracking-[0.2em] uppercase border border-gold bg-gold/20 text-navy px-3 py-1.5 rounded">
              Our Promise
            </span>
            <h3 className="font-serif text-[clamp(1.6rem,2.5vw,2.5rem)] text-navy leading-tight">
              To Your Door, Fresh
            </h3>
            <div className="w-full h-px bg-gold/30" />
            <p className="text-navy/70 text-[clamp(0.875rem,1.2vw,1rem)] leading-relaxed tracking-tight">
              From the moment an order is placed, we move fast. Every Naema
              box is packed to preserve freshness and delivered with the same
              care we put into sourcing — because the last mile matters just
              as much as the first.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurStoryBlocks;