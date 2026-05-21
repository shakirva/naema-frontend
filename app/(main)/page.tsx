import React from "react";

import Hero from "../sections/Hero";
import Shop from "../sections/Shop";
import Grid from "../components/Grid";
import Deal from "../sections/ValueSection";
import Footer from "../sections/Footer";

import Carousel from "../components/Carousel";

import About2 from "../sections/About2";
import Testimonials from "../sections/Testimonials";
import SocialFeed from "../sections/SocialFeed";
import NewCollection from "../sections/NewCollection";

const page = () => {
  return (
    <main className="w-full h-full  overflow-clip">
      <Hero />

      <Carousel />

      <NewCollection />

      <Shop />

      <About2 />
      <Testimonials />

      <Grid />

      <Deal />
      <SocialFeed/>

      <Footer />
    </main>
  );
};

export default page;
