import React from "react";

import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Shop from "./sections/Shop";

const page = () => {
  return (
    <main className="w-full h-full overflow-clip">
      <Header/>

      <Hero />
      <Shop/>
    </main>
  );
};

export default page;
