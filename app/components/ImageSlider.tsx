"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/dates2.jpg", "/bg2.jpg", "/bg3.jpg", "/bg4.jpg", "/bg5.jpg"];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-1/2 max-lg:h-1/2  max-lg:w-full  bg-brown relative overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          fill
          alt="Naema"
          className={`object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
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