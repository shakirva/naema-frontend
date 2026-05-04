"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

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
    className="border-1 border-navy/50 rounded-2xl px-6 cursor-pointer hover:border-gold/60 transition-colors duration-200"
  >
    {/* Question row */}
    <div className="flex items-center justify-between py-5 gap-4">
      <span className="font-medium text-[15px] tracking-tight">{q}</span>
      <FaPlus
        size={13}
        className={`shrink-0 transition-transform duration-300 ease-in-out text-black/80
          ${open ? "rotate-45" : "rotate-0"}`}
      />
    </div>

    {/* Answer — grid animation */}
    <div
      className={`grid transition-all duration-500 ease-in-out
        ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="overflow-hidden min-h-0">
        <div className="border-t border-black/10 py-5">
          <p className="text-sm text-black/80 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[1440px] mx-auto mt-20 px-16 max-lg:px-8 max-md:px-5 pb-20">
      <h2 className="font-serif text-[clamp(2rem,3.33vw,3rem)] leading-none text-center mb-10">
        FAQ
      </h2>

      <div className="flex flex-col gap-4 max-w-[860px] mx-auto">
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
    </div>
  );
};

export default FAQ;