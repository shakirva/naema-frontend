import React from "react";

import Header from "./sections/Header";
import Hero from "./sections/Hero";

const page = () => {
  return (
    <main className="w-full h-full overflow-clip">
      <Header/>
      <Hero />
    </main>
  );
};

export default page;
