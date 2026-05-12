import ParallaxImage from "@/app/components/ParallaxImage";
import Image from "next/image";
import React from "react";
import Hero from "./components/Hero";
import OurMisson from "./components/OurMisson";
import FounderNote from "./components/FounderNote";
import NaemaValues from "./components/NaemaValues";
import OurStoryBlocks from "./components/OurStoryBlocks";

const page = () => {
  return (
    <section className="w-full overflow-clip min-h-screen">
      <Hero />
      <OurMisson />
      <FounderNote />
      <NaemaValues />
      <OurStoryBlocks />
    </section>
  );
};

export default page;
