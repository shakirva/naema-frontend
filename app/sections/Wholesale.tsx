"use client";

import Image from "next/image";
import Link from "next/link";
import ParallaxImage from "../components/ParallaxImage";

const Wholesale = () => {
  return (
    <section className="w-full bg-cream relative border border-darkgold/20 overflow-hidden rounded-xl">
      <div className="flex max-lg:flex-col w-full min-h-[780px] max-lg:min-h-fit">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 max-lg:w-full lg:w-1/2 h-full">
          <ParallaxImage
            mainclass="w-full h-[680px] max-lg:h-[60vw] max-md:h-[80vw] relative overflow-hidden"
            imageClass="object-cover scale-110"
            src="/chocobg.jpg"
            alt="Cafe"
          />
          <div className="max-w-[450px] px-5 pb-6 flex flex-col justify-between">
            <p className="mt-2 text-[clamp(0.875rem,1.2vw,1rem)] text-black/80 tracking-tight text-left leading-[1.35]">
              Partner with Naema for premium dates, artisan chocolates,
              handpicked nuts, and luxury gifting collections crafted for cafés,
              hotels, retailers, and modern hospitality spaces.
            </p>
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-medium mt-6 tracking-tight border-2 border-gold bg-cream rounded-full text-black w-fit"
            >
              Become a Partner
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 max-lg:w-full bg-navy text-cream flex flex-col justify-center  lg:px-12 px-5 py-6 relative overflow-hidden">

          <h2 className="font-serif text-[clamp(1.1rem,1.5vw,1.5rem)] leading-none w-fit bg-gold/20 border border-gold/50 rounded-lg px-4 py-2">
            Wholesale
          </h2>

          <div className="max-w-[700px] mt-6">
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,7rem)] leading-[1] tracking-tight">
              Our Café &<br />Wholesale Partners
            </h2>

            <p className="mt-8 md:mt-12 text-[clamp(0.875rem,1.3vw,1.35rem)] leading-[1.3] text-cream/80 max-w-[520px] tracking-tight">
              From boutique cafés to hospitality spaces, our collections bring
              premium flavour, elegant presentation, and dependable quality to
              customers every day.
            </p>

            <Link
              href="/contact"
              className="mt-10 md:mt-14 border-2 border-gold inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 rounded-full bg-cream text-navy text-sm md:text-base font-medium tracking-tight hover:scale-[1.02] transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Wholesale;