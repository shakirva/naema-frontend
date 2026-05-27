"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdHelpCircleOutline } from "react-icons/io";

const faqs = [
  {
    q: "What do Zahidi Dates taste like?",
    a: "Our premium dates have a rich, caramel-like sweetness with a satisfying chewy texture — naturally sweet with no added sugar.",
  },
  {
    q: "Where do they come from?",
    a: "Our dates are sourced directly from trusted farms in the Middle East, grown in ideal desert climates and hand-picked at peak ripeness.",
  },
  {
    q: "How should I store them?",
    a: "Store in a cool, dry place away from direct sunlight. Once opened, keep refrigerated and consume within 3 months for best freshness.",
  },
  {
    q: "Are they suitable for gifting?",
    a: "Absolutely. Our dates come in beautiful packaging and are a popular choice for Eid, Ramadan, weddings and corporate gifting.",
  },
  {
    q: "Do you offer bulk orders?",
    a: "Yes! We offer special pricing for bulk and wholesale orders. Reach out to us directly via our contact page for a custom quote.",
  },
];

const FAQItem = ({
  q,
  a,
  open,
  toggle,
}: {
  q: string;
  a: string;
  open: boolean;
  toggle: () => void;
}) => (
  <div
    onClick={toggle}
    className={`
      group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300
      border backdrop-blur-sm
      ${
        open
          ? "bg-[#faf7ed] border-gold shadow-[0_10px_40px_rgba(204,186,120,0.12)]"
          : "bg-white border-black/10 hover:border-gold/50 hover:bg-[#fcfbf7]"
      }
    `}
  >
   
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />

  
    <div className="relative flex items-center justify-between px-6 py-5 gap-4">
      <div className="flex items-center gap-4">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
            ${
              open
                ? "bg-gold text-white scale-105"
                : "bg-brown/20 text-black/50 group-hover:bg-brown/30"
            }
          `}
        >
          <IoMdHelpCircleOutline size={18} className="" />
        </div>

        <span className="font-medium text-[15px] tracking-tight text-black/90">
          {q}
        </span>
      </div>

      <div
        className={`
          w-8 h-8 rounded-full border flex items-center justify-center shrink-0
          transition-all duration-300
          ${
            open
              ? "border-gold bg-gold text-white rotate-45"
              : "border-black/10 text-black/60 group-hover:border-gold/40"
          }
        `}
      >
        <FaPlus size={11} />
      </div>
    </div>

   
    <div
      className={`
        grid transition-all duration-500 ease-in-out
        ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-80"}
      `}
    >
      <div className="overflow-hidden min-h-0">
        <div className="px-6 pb-6 pl-[4.5rem]">
          <div className="h-px w-full bg-gradient-to-r from-gold/30 via-black/5 to-transparent mb-5" />

          <p className="text-sm leading-[1.9] text-black/65 max-w-[90%]">
            {a}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative max-w-[1440px] mx-auto mt-24 px-16 max-lg:px-8 max-md:px-5 pb-24 overflow-hidden">
      
  
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

     
      <div className="relative text-center mb-14">
        <span className="uppercase  text-[11px] text-black/35 font-medium">
          Need Help?
        </span>

        <h2 className="font-serif text-[clamp(2.3rem,4vw,4rem)] leading-none mt-3">
          Frequently Asked Questions
        </h2>

        <p className="text-sm text-black/45 mt-5 max-w-[520px] mx-auto leading-relaxed">
          Everything you need to know about our premium Zahidi dates,
          freshness, storage, gifting, and delivery.
        </p>
      </div>

   
      <div className="relative flex flex-col gap-4 max-w-[900px] mx-auto">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            q={faq.q}
            a={faq.a}
            open={openIndex === i}
            toggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;