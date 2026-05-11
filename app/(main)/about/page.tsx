import ParallaxImage from "@/app/components/ParallaxImage";
import Image from "next/image";
import React from "react";
import Hero from "./components/Hero";
import OurMisson from "./components/OurMisson";

const page = () => {
  return (
    <section className="w-full overflow-clip min-h-screen">
      <Hero/>
      <OurMisson/>
    </section>
  );
};

export default page;
