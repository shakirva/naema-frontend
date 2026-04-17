import React from "react";
import { PiTreePalm } from "react-icons/pi";
import { LuShoppingBasket } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "./Header";
import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-[#0A223A] px-16 py-12 text-white w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section */}
        <div className="flex items-center gap-16">
          
          <div className="flex flex-col w-[50%]">
            <h4 className="font-serif text-[54px] leading-none">
              Direct from <br /> Farm to You
            </h4>

            <p className="mt-4 text-[18px] text-white/80 tracking-tight max-w-[400px]">
              Handled entirely in-house from growing to packing so you get
              nothing but the best.
            </p>

            <div className="flex gap-4 text-black mt-14">
              
              <div className="h-[200px] max-w-[200px] rounded-lg border-2 border-gold bg-cream p-4 flex flex-col">
                <PiTreePalm size={50} />
                <div className="mt-auto">
                  <h4 className="font-semibold font-serif text-[24px]">
                    Perfectly Ripened
                  </h4>
                  <p className="text-base leading-[1.2em]">
                    Harvested only when each date reaches its natural peak.
                  </p>
                </div>
              </div>

              <div className="h-[200px] max-w-[200px] text-black flex flex-col rounded-lg border-2 border-gold bg-cream p-4">
                <LuShoppingBasket size={50} />
                <div className="mt-auto">
                  <h4 className="font-semibold font-serif text-[24px]">
                    Rooted in Tradition
                  </h4>
                  <p className="text-base leading-[1.2em]">
                    Years of expertise shape every harvest with care
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="ml-auto w-[50%] h-[600px] overflow-hidden relative rounded-2xl border-3 border-gold">
            <Image
              src="/dateman.jpg"
              alt="Chocolates"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/70 my-16" />

        {/* Footer Links */}
        <div className="grid grid-cols-4 gap-12 text-white">

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

            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Thoughtfully sourced dates, nuts, and chocolates — crafted for
              moments worth savoring.
            </p>

            <p className="text-sm text-white/80 mb-2">
              support@naema.co
            </p>

            <div className="flex gap-3 mt-4">
              <Link href="https://instagram.com" target="_blank">
                <div className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center hover:border-white transition">
                  <AiOutlineInstagram />
                </div>
              </Link>

              <Link href="https://facebook.com" target="_blank">
                <div className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center hover:border-white transition">
                  <AiFillFacebook />
                </div>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition"
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
            <ul className="space-y-2 text-white/70 text-sm">
              {navLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link href="/track" className="hover:text-white transition">
                  Track Order
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">The Inner Circle</h4>
            <p className="text-white/70 text-sm mb-4">
              Join for early access, exclusive drops, and special offers.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-black bg-white rounded-full outline-none mb-3"
            />

            <button className="w-full bg-gold text-black py-3 rounded-full font-medium hover:opacity-90 transition">
              Join Now
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-center mt-12 text-white/50 text-sm">
          <p>© 2026 Naema. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/shipping" className="hover:text-white transition">
              Shipping
            </Link>
            <Link href="/returns" className="hover:text-white transition">
              Returns
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;