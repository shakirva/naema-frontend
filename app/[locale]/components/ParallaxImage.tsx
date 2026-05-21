"use client";
import { useLenis } from "lenis/react";
import Image from "next/image";
import React, { useRef } from "react";

type ImageProps = {
  mainclass?: string;
  imageClass?: string;
  src: string;
  alt: string;
};

const ParallaxImage = ({ mainclass = "", imageClass = "", src, alt }: ImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLenis(() => {
    if (!containerRef.current || !imageRef.current) return;
    const scrollY = containerRef.current.getBoundingClientRect().top / window.innerHeight;
    imageRef.current.style.transform = `translateY(${-scrollY * 120}px)`;
  });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${mainclass}`}>
      <Image
        ref={imageRef}
        src={src}
        fill
        className={`size-full object-cover ${imageClass}`}
        alt={alt}
      />
    </div>
  );
};

export default ParallaxImage;