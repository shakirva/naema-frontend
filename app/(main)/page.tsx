import React from "react";

import Hero from "../sections/Hero";
import Shop from "../sections/Shop";
import Grid from "../components/Grid";
import Deal from "../sections/Deal";
import Footer from "../sections/Footer";
import About from "../sections/About";
import NewCollection from "../sections/NewCollection";
import Carousel from "../components/Carousel";
import Pillars from "../sections/Pillars";
import About2 from "../sections/About2";
import Testimonials from "../sections/Testimonials";

const page = () => {
  return (
    <main className="w-full h-full  overflow-clip">
      <Hero />

      <Carousel />

      <NewCollection />

      <Shop />
      
      <About2/>
      <Testimonials/>
     

      <Grid />

      <Deal />
      <Pillars />
      <Footer />
    </main>
  );
};

export default page;
