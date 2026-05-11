import React from "react";

const OurMisson = () => {
  return (
    <section className=" w-full bg-cream    ">
      <div className=" max-w-[1440px] mx-auto px-16  max-lg:px-8 max-md:px-5">
        <div className="w-full flex flex-col  items-center py-16">
          {" "}
          <h2 className="font-serif text-[24px] font-medium lg:text-center leading-none w-fit bg-gold/20 border border-gold/50 rounded-lg px-4 py-2  ">
            Our Mission
          </h2>
          <h3 className="font-serif text-[clamp(2rem,3.3vw,3rem)] text-black/90 leading-none mt-6 text-center max-w-[550px]">
            Exceptional Flavours Crafted For Everyday Indulgence
          </h3>
          <p className="lg:text-[20px] text-black/80  tracking-tight leading-none text-center mt-12 max-w-[450px]">
            We source premium dates, chocolate, nuts, and dry fruits with a
            focus on quality and freshness. Every collection is thoughtfully
            curated for rich flavour, elegant presentation, and ingredients
            worth sharing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurMisson;
