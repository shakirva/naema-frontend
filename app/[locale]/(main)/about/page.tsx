
import React from "react";
import Hero from "./components/Hero";
import OurMisson from "./components/OurMisson";
import FounderNote from "./components/FounderNote";
import NaemaValues from "./components/NaemaValues";
import OurStoryBlocks from "./components/OurStoryBlocks";

import Hospitality from "./components/Hospitality";
import Footer from "../../sections/Footer";

const page = () => {
  return (
    <section className="w-full overflow-clip min-h-screen">
      <Hero />
      <OurMisson />
      <FounderNote />
      <NaemaValues />
      <Hospitality/>
      <OurStoryBlocks />

      <Footer/>
    </section>
  );
};

export default page;
