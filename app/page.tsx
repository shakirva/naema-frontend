import React from "react";

import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Shop from "./sections/Shop";
import Grid from "./components/Grid";
import Deal from "./sections/Deal";
import Footer from "./sections/Footer";

const page = () => {
  return (
    <main className="w-full h-full overflow-clip">
      <Header/>

      <Hero />
      <Shop/>
      <Grid/>
      <Deal/>
      <Footer/>
    </main>
  );
};

export default page;
