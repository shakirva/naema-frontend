import React from "react";
const badges = [
  "Hand-Picked",
  "Naturally Grown",
  "Direct Trade",
  "Halal",
  "Preservative Free",
  "Vegan",
];

const Info = () => {
  return (
    <section className=" w-full bg-cream  px-16 py-8 max-lg:pt-8 max-lg:px-8 max-md:px-5  ">
      <div className="flex flex-col items-center  w-full max-w-[1440px] mx-auto h-full">
        <div className="flex items-center gap-8 ">
          {badges.map((item, i) => (
            <React.Fragment key={i}>
              <span className="font-serif capitalize text-xl text-black/80">
                {item}
              </span>
              {i < badges.length - 1 && (
                <span className="size-[4px] bg-black/80 rounded-full" />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex w-full items-center justify-center mt-24">
          <div className="w-1/2  flex items-center  justify-center font-serif text-5xl leading-[1.25]">
            <h2 className="font-medium">
              JUST GOOD <br /> FOOD: <br />
              <span className="text-4xl font-normal">dates, nuts, dry fruits</span>
            </h2>
          </div>
          <div className="w-1/2 text-[24px] tracking-tight   flex items-cneter justify-center   font-serif border-l border-black/50">
            <div className="flex flex-col gap-4 text-black/80">
              {" "}
              <p className="max-w-[450px] text-balance">
                At Naema, every product stands on its own — dates, nuts, and dry
                fruits sourced with care, sold as nature intended, with nothing
                added and nothing taken away.
              </p>
              <p className="max-w-[450px] text-balance">
                From trusted farms to your door, so you always know exactly what
                you're eating.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
