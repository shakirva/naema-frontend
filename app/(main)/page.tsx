import React from "react";

import Hero from "../sections/Hero";
import Shop from "../sections/Shop";
import Grid from "../components/Grid";
import Deal from "../sections/Deal";
import Footer from "../sections/Footer";
import About from "../sections/About";
import Wholesale from "../sections/Wholesale";
import Info from "../components/Info";
import NewCollection from "../sections/NewCollection";


const page = () => {
  return (
    <main className="w-full h-full  overflow-clip">
      <Hero />
      <NewCollection/>
     
      <Shop />
      <About />

      <Grid />

      <Deal />
      <Footer />
    </main>
  );
};

export default page;
