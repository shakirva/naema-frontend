import React from "react";

const badges = [
  "Farm to Table",
  "Premium Quality",
  "Fast Delivery",
  "Gift Packaging",
];

const Carousel = () => {

  const displayBadges = [...badges, ...badges, ...badges];

  return (
    <section className="w-full bg-cream px-16 py-8  border-black/10">
      <div className="w-full overflow-hidden whitespace-nowrap">
        <div className="carousel-anim flex items-center w-fit will-change-transform">
          {displayBadges.map((item, i) => (
            <div key={i} className="flex items-center">
              <span className="font-serif capitalize text-3xl text-black/80 px-8">
                {item}
              </span>

              <span className="size-[6px] bg-black/80 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
