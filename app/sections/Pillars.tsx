import React from "react";

const pillars = [
  {
    numeral: "I",
    title: "Quality",
    description: "We never settle. Every product meets the highest standard before it reaches you.",
  },
  {
    numeral: "II",
    title: "Trust",
    description: "Our word is our bond. Reliable and consistent, every single time.",
  },
  {
    numeral: "III",
    title: "Authenticity",
    description: "Genuine sourcing, true to nature. Nothing artificial, ever.",
  },
  {
    numeral: "IV",
    title: "Premium",
    description: "Luxury in every grain and date we carefully deliver to you.",
  },
];

const Pillars = () => {
  return (
    <>
      {/* Top section */}
      <section className="w-full bg-cream px-16 py-16 max-lg:pt-8 max-lg:px-8 max-md:px-5">
        <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto">
          <h3 className="font-serif text-[clamp(1.6rem,3.5vw,3rem)] text-center max-w-[650px] leading-none">
            Nature's <span className="italic">Finest</span>, Delivered with Purpose.
          </h3>
          <h3 className="font-serif text-[clamp(1.1rem,2.2vw,2.2rem)] text-center leading-none mt-4">
            Where Quality is Not a Promise — It's Our Standard.
          </h3>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="w-full bg-cream px-16 py-16 max-lg:px-8 max-md:px-5">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-14">

          {/* Label */}
          <p className="text-[11px] tracking-[0.3em] font-medium text-black/40 uppercase">
            The Four Pillars of Naema ·
          </p>

          {/* Cards */}
          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col justify-between border border-black/15 rounded-2xl px-8 py-10 min-h-[380px] bg-gold/20 hover:bg-gold/40 transition-colors duration-300"
              >
                {/* Numeral */}
                <p className="text-xs tracking-[0.25em] text-black/40 text-center font-medium">
                  — {pillar.numeral} —
                </p>

                {/* Title */}
                <h3 className="font-serif text-[clamp(1.6rem,2vw,2.2rem)] text-black text-center leading-none">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="font-serif italic text-black/60 text-center text-[15px] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Commitment box */}
          <div className="w-full border border-black/15 rounded-2xl bg-gold/20 px-16 py-14 max-lg:px-10 max-md:px-6 flex flex-col items-center gap-5 text-center">
            <p className="text-[10px] tracking-[0.3em] text-black/40 uppercase font-medium">
              Our Commitment
            </p>
            <h3 className="font-serif text-[clamp(1.6rem,2.5vw,2.5rem)] text-black leading-tight max-w-[600px]">
              Our Unbreakable Commitment
            </h3>
            <p className="font-serif italic text-black/70 text-[clamp(1rem,1.6vw,1.3rem)] max-w-[620px] leading-relaxed">
              "We will NEVER compromise on Quality, Freshness, or Delivery."
            </p>
            <div className="w-12 h-px bg-black/20 my-1" />
            <p className="text-black/50 text-sm leading-relaxed max-w-[500px] tracking-tight">
              From our sourcing partners to your doorstep — every Naema product
              carries the same unwavering promise of excellence.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Pillars;