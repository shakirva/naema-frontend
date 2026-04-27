import Image from "next/image";
import React from "react";

type Item = {
  id: number;
  title: string;
  category: string;
  color: string;
};

const items: Item[] = [
  { id: 1, title: "Soft Dates", category: "Trending", color: "bg-amber-300" },
  {
    id: 2,
    title: "Premium Medjool",
    category: "Best Seller",
    color: "bg-orange-400",
  },
  { id: 3, title: "Zahidi", category: "Classic", color: "bg-yellow-500" },
  { id: 4, title: "Stuffed Dates", category: "Popular", color: "bg-amber-600" },
  { id: 5, title: "Luxury Box", category: "Gift", color: "bg-orange-600" },
];

const Grid = () => {
  return (
    
    <section className="w-full bg-[#0A223A] px-16 pb-24 pt-16 min-h-screen  mt-12 relative rounded-t-[200px] overflow-hidden">
       {/* <div className="absolute -top-10 -right-5">
        <Image src={"/palm-1.png"} alt="dates" width={450} height={450} />
      </div> */}
      <div className="absolute inset-0 h-full w-full opacity-5  ">
        <Image src={"/bigdarkpalm.png"} alt="dates" fill className="object-cover" />
      </div> 
      <div className="max-w-7xl mx-auto relative z-10">
        
        <h2 className="font-serif text-[64px]  leading-none text-center text-cream  ">
          Handpicked Favorites
        </h2>
        <p className="mt-4 text-cream text-center text-base tracking-tight">
          Our top picks, loved by thousands of date lovers worldwide.
        </p>

        <div className="w-full mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[380px] ">
            {/* Row 1 */}
            <div className="relative bg-cream rounded-xl overflow-hidden  border-2 border-gold">
              <Image
                src={"/chocolate.png"}
                alt="dates"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 w-full h-full px-4 py-4 flex flex-col justify-between hover:bg-black/60 z-10 transition-colors duration-300 ease-in-out">
                <span className="bg-cream text-black px-6 py-4 text-lg capitalize rounded-full w-fit text-center font-semibold  tracking-tight border-gold border-2 ">
                  trending
                </span>
              </div>
            </div>

            <div className="relative bg-cream rounded-xl overflow-hidden  border-2 border-gold">
              {" "}
              <Image
                src={"/dn.png"}
                alt="dates"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 w-full h-full px-4 py-4 flex flex-col justify-between hover:bg-black/60 z-10 transition-colors duration-300 ease-in-out">
                <span className="bg-cream text-black px-6 py-4 text-lg capitalize rounded-full w-fit text-center font-semibold  tracking-tight border-gold border-2 ">
                  trending
                </span>
              </div>
            </div>

            <div className="relative bg-cream rounded-xl overflow-hidden  border-2 border-gold">
              <Image
                src={"/misc.png"}
                alt="dates"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 w-full h-full px-4 py-4 flex flex-col justify-between hover:bg-black/60 z-10 transition-colors duration-300 ease-in-out">
                <span className="bg-cream text-black px-6 py-4 text-lg capitalize rounded-full w-fit text-center font-semibold  tracking-tight border-gold border-2 ">
                  New
                </span>
              </div>
            </div>

            {/* Row 2 (split evenly) */}
            <div className="relative bg-cream rounded-xl overflow-hidden  lg:col-span-1 border-2 border-gold">
              {" "}
              <Image
                src={"/datedark.png"}
                alt="dates"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 w-full h-full px-4 py-4 flex flex-col justify-between hover:bg-black/60 z-10 transition-colors duration-300 ease-in-out">
                <span className="bg-cream text-black px-6 py-4 text-lg capitalize rounded-full w-fit text-center font-semibold text-black/80 tracking-tight border-gold border-2">
                  trending
                </span>
              </div>
            </div>

            <div className="relative bg-cream rounded-xl overflow-hidden  lg:col-span-2 border-2 border-gold">
              <Image
                src={"/nutz.png"}
                alt="dates"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 w-full h-full px-4 py-4 flex flex-col justify-between hover:bg-black/60 z-10 transition-colors duration-300 ease-in-out">
                <span className="bg-cream text-black px-6 py-4 text-lg capitalize rounded-full w-fit text-center font-semibold  tracking-tight border-gold border-2 ">
                  trending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grid;
