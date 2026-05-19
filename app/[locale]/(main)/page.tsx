
import Hero from "../sections/Hero";
import Carousel from "../components/Carousel";
import Shop from "../sections/Shop";
import About2 from "../sections/About2";
import Testimonials from "../sections/Testimonials";
import { Grid } from "lucide-react";
import ValueSection from "../sections/ValueSection";
import SocialFeed from "../sections/SocialFeed";
import Footer from "../sections/Footer";


const page = () => {
  return (
    <main className="w-full h-full  overflow-clip">
      <Hero />

      <Carousel />

      <Shop/>

      <About2 />
      <Testimonials />

      <Grid/>

      <ValueSection />
      <SocialFeed />

      <Footer />
    </main>
  );
};

export default page;
