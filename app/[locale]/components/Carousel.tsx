import React from "react";
import { useTranslations } from "next-intl";

const badges = [
  "farmToTable",
  "premiumQuality",
  "fastDelivery",
  "giftPackaging",
];

const Carousel = () => {
  const t = useTranslations("Carousel");

  const displayBadges = [...badges, ...badges, ...badges];

  return (
    <section
      className="w-full bg-cream px-16 py-8 border-black/10"
      aria-label="Badges carousel"
      role="region"
    >
      <h2 className="sr-only">Badges</h2>

      <div className="w-full overflow-hidden whitespace-nowrap">
        <ul
          className="carousel-anim flex items-center w-fit will-change-transform"
         
        >
          {displayBadges.map((item, i) => (
            <li key={i} className="flex items-center" role="listitem">
              <p className="font-serif capitalize text-3xl text-black/80 px-8 select-none">
                {t(item)}
              </p>

              <span
                className="w-1.5 h-1.5 bg-black/80 rounded-full shrink-0"
                aria-hidden="true"
              
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Carousel;
