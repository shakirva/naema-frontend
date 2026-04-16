import React from "react";

import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Shop from "./sections/Shop";
import Grid from "./components/Grid";

const page = () => {
  return (
    <main className="w-full h-full overflow-clip">
      <Header/>

      <Hero />
      <Shop/>
      <Grid/>
    </main>
  );
};

export default page;
