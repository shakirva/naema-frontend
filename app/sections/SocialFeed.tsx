"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiInstagram } from "react-icons/fi";

const socials = [
  {
    id: 1,
    image: "/shop2.png",
  },
  {
    id: 2,
    image: "/shop.png",
  },
  {
    id: 3,
    image: "/shop3.png",
  },
  {
    id: 4,
    image: "/palm-2.jpg",
  },
];

const SocialFeed = () => {
  return (
    <section className="w-full bg-cream px-5 md:px-8 lg:px-16 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Label */}
        <span className="font-serif text-[22px] text-navy leading-none w-fit bg-gold/20 border border-gold/40 rounded-lg px-4 py-2">
          Social Feed
        </span>

        {/* Heading */}
        <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] text-center text-navy leading-[0.95] mt-8">
          Follow the <span className="italic text-deepgold">Naema</span>
          <br />
          Experience.
        </h2>

        {/* Body */}
        <p className="text-[clamp(1rem,1.5vw,1.15rem)] text-center text-navy/70 tracking-tight leading-[1.3] mt-6 max-w-[560px]">
          From orchard moments to beautifully packed collections — discover
          what’s happening behind the scenes and inside every Naema box.
        </p>

        {/* Feed Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full mt-14">
          {socials.map((item, index) => (
            <Link
              key={item.id}
              href="/"
              className={`group relative overflow-hidden rounded-[28px] border-2 border-gold bg-white aspect-[0.9/1] `}
            >
              <Image
                src={item.image}
                alt="Social feed"
                fill
                className="object-cover  rounded-[28px]   "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />

              {/* Icon */}
              <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-cream/90 backdrop-blur-sm border border-gold flex items-center justify-center">
                <FiInstagram className="text-navy text-[18px]" color="#baa448" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="mt-12 flex items-center gap-3 rounded-full border-2 border-gold bg-navy px-7 py-3 text-cream hover:bg-gold hover:text-navy transition-all duration-300"
        >
          <FiInstagram className="text-[18px] " color="" />

          <span className="text-sm font-medium  leading-none tracking-tight">
            Follow Us 
          </span>
        </Link>
      </div>
    </section>
  );
};

export default SocialFeed;