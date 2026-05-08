"use client";
import { useLenis } from "lenis/react";
import Image from "next/image";
import React, { useRef, useState } from "react";

type ImageProps = {
  mainclass?: string;
  imageClass?: string;
  src: string;
  alt: string;
};

const ParallaxImage = ({
  mainclass = "",
  imageClass = "",
  src,
  alt,
}: ImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useLenis(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollY = rect.top / window.innerHeight;
    setOffset(-scrollY * 120);
  });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${mainclass}`}>
      <Image
        src={src}
        fill
        style={{ transform: `translateY(${offset}px)` }}
        className={`size-full object-contain   ${imageClass}`}
        alt={alt}
      />
    </div>
  );
};

export default ParallaxImage;