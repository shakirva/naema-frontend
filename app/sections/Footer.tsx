import React from "react";
import { PiTreePalm } from "react-icons/pi";
import { LuShoppingBasket } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";
import { navLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-[#0A223A] px-16 py-12 text-cream w-full relative  max-lg:pt-8 max-lg:px-8 max-md:px-5 ">
         <div className="h-full w-full absolute inset-0 opacity-5">
                <Image src="/footer.png" fill alt="palm" className=" object-cover " />
              </div>
        
      <div className="max-w-7xl mx-auto relative z-10">
      
        
        {/* Top Section */}
        <div className="flex items-center max-lg:flex-col  gap-16">
          
          <div className="flex flex-col lg:w-[50%] max-lg:w-full   order-2 lg:order-0">
            <h4 className="font-serif text-[clamp(2.50rem,4.44vw,4rem)] leading-none">
              Direct from <br className="max-lg:hidden" /> Farm to You
            </h4>

            <p className="mt-4 text-[18px] text-cream/80 tracking-tight lg:max-w-[400px]">
              Handled entirely in-house from growing to packing so you get
              nothing but the best.
            </p>

            <div className="flex gap-4 text-black mt-14">
              
              <div className="lg:h-[250px] lg:max-w-[250px] flex-1 rounded-lg border-2 border-gold bg-cream p-4 flex flex-col">
                <PiTreePalm size={70} color="#baa448"  />
                <div className="mt-auto">
                  <h4 className="font-semibold font-serif text-[24px] max-md:text-[20px]">
                    Perfectly Ripened
                  </h4>
                  <p className="md:text-base text-sm leading-[1.2em] mt-2">
                    Harvested only when each date reaches its natural peak.
                  </p>
                </div>
              </div>

              <div className="lg:h-[250px] lg:max-w-[250px] flex-1 text-black flex flex-col rounded-lg border-2 border-gold bg-cream p-4">
                <LuShoppingBasket size={70} color="#baa448" />
                <div className="mt-auto">
                  <h4 className="font-semibold font-serif text-[24px] max-md:text-[20px]">
                    Rooted in Tradition
                  </h4>
                  <p className="md:text-base text-sm leading-[1.2em] mt-2">
                    Years of expertise shape every harvest with care
                  </p>
                </div>
              </div>

            </div>
          </div>
 
          <div className="ml-auto lg:w-[50%] h-[600px]  w-full  overflow-hidden relative rounded-2xl border-3 border-gold">
            <Image
              src="/dateman.jpg"
              alt="Chocolates"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-cream/70 my-16" />

        {/* Footer Links */}
        <div className="grid grid-cols-4 gap-12 text-cream">

          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                width={70}
                height={70}
                alt="logo"
                className="mb-4 cursor-pointer"
              />
            </Link>

            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Thoughtfully sourced dates, nuts, and chocolates — crafted for
              moments worth savoring.
            </p>

            <p className="text-sm text-cream/80 mb-2">
              support@naema.co
            </p>

            <div className="flex gap-3 mt-4">
              <Link href="https://instagram.com" target="_blank">
                <div className="w-9 h-9 border border-cream/40 rounded-full flex items-center justify-center hover:border-cream transition">
                  <AiOutlineInstagram />
                </div>
              </Link>

              <Link href="https://facebook.com" target="_blank">
                <div className="w-9 h-9 border border-cream/40 rounded-full flex items-center justify-center hover:border-cream transition">
                  <AiFillFacebook />
                </div>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-cream/70 text-sm">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cream transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-cream/70 text-sm">
              {navLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cream transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link href="/track" className="hover:text-cream transition">
                  Track Order
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-cream transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">The Inner Circle</h4>
            <p className="text-cream/70 text-sm mb-4">
              Join for early access, exclusive drops, and special offers.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-black bg-cream rounded-full outline-none mb-3"
            />

            <button className="w-full bg-gold text-black py-3 rounded-full font-medium hover:opacity-90 transition">
              Join Now
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-center mt-12 text-cream/50 text-sm">
          <p>© 2026 Naema. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream transition">
              Terms
            </Link>
            <Link href="/shipping" className="hover:text-cream transition">
              Shipping
            </Link>
            <Link href="/returns" className="hover:text-cream transition">
              Returns
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;