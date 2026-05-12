import React from "react";

const values = [
  {
    title: "Naturally Sourced",
    description: "Every date and nut traced back to its orchard. No shortcuts, no compromise.",
  },
  {
    title: "Zero Additives",
    description: "Pure as nature intended. Nothing artificial ever makes it into our products.",
  },
  {
    title: "Responsible Farming",
    description: "We work only with growers who respect the land and the people who work it.",
  },
  {
    title: "Premium Always",
    description: "Every product is held to the same uncompromising standard before it reaches you.",
  },
];

const NaemaValues = () => {
  return (
    <section className="w-full bg-navy px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12 md:gap-16">

        {/* Label */}
        <span className="font-serif text-[11px] tracking-[0.3em] text-cream/50 uppercase border border-gold/40 px-4 py-2 rounded-full">
          Our Values
        </span>

        {/* Big heading */}
        <h2 className="font-serif text-[clamp(2.5rem,7vw,7rem)] text-cream leading-none text-center max-w-[900px]">
          Good From the <span className="italic">Ground Up.</span>
        </h2>

        {/* Body */}
        <p className="font-serif text-[clamp(1rem,1.5vw,1.2rem)] text-cream/70 text-center max-w-[640px] leading-relaxed">
          Quality shows up in the everyday choices — how our dates are grown,
          how they're sourced, and how they're packed. We work with growers
          who care for their land and deliver nothing less than the finest to
          your door.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full mt-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex flex-col gap-6 bg-cream/5 border border-gold/30 rounded-2xl px-6 py-8 hover:bg-cream/10 transition-colors duration-300"
            >
              {/* Icon placeholder */}
              <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold text-lg">
                ✦
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[clamp(1.1rem,1.5vw,1.4rem)] text-cream leading-tight">
                  {v.title}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed tracking-tight">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NaemaValues;