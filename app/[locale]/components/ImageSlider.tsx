"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ParallaxImage from "./ParallaxImage";

const images = [
  "/dates2.webp",
  "/bg2.webp",
  "/bg3.webp",
  "/bg4.webp",
  "/bg5.webp",
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero image carousel"
      className="w-1/2 max-lg:h-1/2  max-lg:w-full  bg-brown relative overflow-hidden"
    >
      {images.map((src, index) => (
        <div
          key={src}
          id={`carousel-slide-${index + 1}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index === current ? "false" : "true"}
        >
          <ParallaxImage
            mainclass="w-full h-screen max-lg:h-full relative overflow-hidden "
            imageClass="object-cover scale-110"
            src={src}
            alt=""
            sizes="(min-width:1024px) 50vw, 100vw"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1} of ${images.length}`}
            aria-controls={`carousel-slide-${index + 1}`}
            aria-pressed={current === index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              current === index ? "bg-white scale-110" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
