"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../../constants";

import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

/* ------------------ DATA ------------------ */

const megaMenu = {
  columns: [
    {
      heading: "Dates",
      links: [
        { label: "Pressed Dates", href: "/shop/dates" },
        { label: "Stuffed Dates", href: "/shop/dates" },
        { label: "Dry Dates", href: "/shop/dates" },
        { label: "Rutab", href: "/shop/dates" },
        { label: "Gift Boxes", href: "/shop/dates" },
      ],
    },
    {
      heading: "Nuts",
      links: [
        { label: "Almonds (Badam)", href: "/shop/nuts" },
        { label: "Cashew (Kaju)", href: "/shop/nuts" },
        { label: "Walnuts (Akhrot)", href: "/shop/nuts" },
        { label: "Pistachio (Pista)", href: "/shop/nuts" },
        { label: "Mixed Nuts", href: "/shop/nuts" },
      ],
    },
    {
      heading: "Dry Fruits",
      links: [
        { label: "Raisins (Kishmish)", href: "/shop/dry-fruits" },
        { label: "Dried Figs (Anjeer)", href: "/shop/dry-fruits" },
        { label: "Dried Apricots", href: "/shop/dry-fruits" },
        { label: "Dried Kiwi", href: "/shop/dry-fruits" },
        { label: "Dried Prunes", href: "/shop/dry-fruits" },
      ],
    },
    {
      heading: "Chocolates",
      links: [
        { label: "Dark Chocolate", href: "/shop/chocolates" },
        { label: "Milk Chocolate", href: "/shop/chocolates" },
        { label: "Date Chocolates", href: "/shop/chocolates" },
        { label: "Chocolate Gift Box", href: "/shop/chocolates" },
        { label: "Artisan Bars", href: "/shop/chocolates" },
      ],
    },
  ],
  featured: [
    {
      label: "Explore Gift Boxes",
      image: "/chocos.jpg",
      href: "/shop/chocolates",
    },
    {
      label: "Explore Premium Dates",
      image: "/datedark.png",
      href: "/shop/dates",
    },
  ],
};

const MegaMenu = () => (
  <div className="bg-cream border-t border-gold/30 shadow-xl w-full flex">
    <div className="flex flex-col pl-16 py-10 gap-8 flex-1">
      <div className="flex gap-16">
        {megaMenu.columns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3 min-w-[120px]">
            <span className="text-[10px] font-bold  text-black/40 uppercase">
              {col.heading}
            </span>
            <div className="flex flex-col gap-2.5">
              {col.links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13px] text-black/70 hover:text-gold transition-colors duration-200 leading-tight tracking-tight"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/shop"
        className="relative inline-flex w-fit overflow-hidden rounded-full border-2 border-gold bg-navy text-sm font-medium tracking-tight text-cream group"
      >
        {/* DEFAULT TEXT */}
        <span className="block px-6 py-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
          Shop All
        </span>

        {/* HOVER LAYER */}
        <span className="absolute inset-0 flex items-center justify-center rounded-full  bg-cream text-navy translate-y-full scale-[0.5] transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0 group-hover:scale-100">
          Shop All
        </span>
      </Link>
    </div>

    <div className="flex gap-3  pr-16 pl-8  py-10 shrink-0 border-l border-gold/20">
      {megaMenu.featured.map((f) => (
        <Link
          key={f.label}
          href={f.href}
          className="relative w-[160px] h-[200px] rounded-2xl overflow-hidden group"
        >
          <Image
            src={f.image}
            alt={f.label}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-navy/40" />
          <span className="absolute bottom-4 left-4 right-4 font-serif text-[18px] font-medium text-white leading-tight">
            {f.label}
          </span>
        </Link>
      ))}
    </div>
  </div>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openCart, items } = useCart();
  const pathname = usePathname();

  // ← KEY FIX: delay closing so mouse can travel from nav → menu
  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopHovered(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setShopHovered(false), 150);
  };

  return (
    <header className="w-full relative z-[9999]">
      {/* NAV BAR */}
      <div className="w-full px-8 md:px-16 py-4 bg-navy">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Image src="/newnaema.png" width={90} height={90} alt="logo" />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-12 text-[14px] tracking-tight font-medium">
              {navLinks.map((link, index) => {
                const isShop = link.label.toLowerCase() === "shop";
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");

                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => isShop && handleEnter()}
                    onMouseLeave={() => isShop && handleLeave()}
                  >
                    <Link
                      href={link.href}
                      className={`cursor-pointer duration-300 transition-colors ease-in-out block hover:text-cream
                        ${isActive ? "text-gold" : "text-cream/60"}
                        ${isShop && shopHovered ? "text-gold" : ""}
                      `}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-transparent border border-cream/40 rounded-full px-3 py-1.5 focus-within:border-cream transition-all duration-300">
              <FiSearch size={20} className="text-cream mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-cream placeholder:text-cream/40 text-[14px] w-[140px] focus:w-[180px] transition-all duration-300"
              />
            </div>
            <Link href="/login">
              <FiUser
                size={20}
                className="cursor-pointer hidden lg:block"
                color="#f6f1e7"
              />
            </Link>
            <button onClick={openCart} className="relative">
              <FiShoppingCart
                size={20}
                className="cursor-pointer hidden lg:block"
                color="#f6f1e7"
              />
              {items.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold rounded-full text-[9px] text-navy font-medium flex items-center justify-center">
                  {items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </button>
            <button
              className="lg:hidden text-cream"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`hidden lg:block absolute top-full left-0 w-full transition-all duration-200 ease-in-out
          ${
            shopHovered
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-1"
          }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <MegaMenu />
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-cream flex flex-col px-10 py-12 gap-8 transition-transform duration-400 ease-in-out w-full md:w-1/2
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="self-end text-navy"
          onClick={() => setMenuOpen(false)}
        >
          <FiX size={28} />
        </button>

        <nav className="flex flex-col gap-6 mt-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-navy text-[22px] font-medium tracking-tight hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-navy/10 pt-6 flex flex-col gap-4">
          <span className="text-xs font-bold tracking-widest text-navy/40 uppercase">
            Shop by category
          </span>
          {megaMenu.columns.map((col) => (
            <Link
              key={col.heading}
              href={`/shop/${col.heading.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-navy hover:text-gold transition-colors"
            >
              {col.heading}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
