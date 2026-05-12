import React from "react";
import ProductCarousel from "./ProductCarousel";

const BestSeller = () => {
  return (
    <section className="min-h-screen w-full bg-cream    ">
      <h1 className="text-[56px] font-serif text-center px-16 pt-16 max-lg:pt-8 max-lg:px-8 max-md:px-5   leading-none">
        A great box starts with carefully selected dates,
        <br /> roasted nuts, and rich artisan chocolate.
      </h1>
      <ProductCarousel
        title="Shop Our Best Sellers"
        description="Our most loved products, trusted by thousands of customers."
        products={[...products]
          .sort((a, b) => b.reviews - a.reviews)
          .slice(0, 6)}
      />
    </section>
  );
};

export default BestSeller;
