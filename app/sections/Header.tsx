"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../constants";
import { useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";

const megaMenu = {
  columns: [
    {
      heading: "Dates",
      links: [
        "Pressed Dates",
        "Stuffed Dates",
        "Dry Dates",
        "Rutab",
        "Gift Boxes",
      ],
    },
    {
      heading: "Nuts",
      links: [
        "Almonds (Badam)",
        "Cashew (Kaju)",
        "Walnuts (Akhrot)",
        "Pistachio (Pista)",
        "Mixed Nuts",
      ],
    },
    {
      heading: "Dry Fruits",
      links: [
        "Raisins (Kishmish)",
        "Dried Figs (Anjeer)",
        "Dried Apricots",
        "Dried Kiwi",
        "Dried Prunes",
      ],
    },
    {
      heading: "Chocolates",
      links: [
        "Dark Chocolate",
        "Milk Chocolate",
        "Date Chocolates",
        "Chocolate Gift Box",
        "Artisan Bars",
      ],
    },
  ],
  featured: [
    { label: "Explore Gift Boxes", image: "/chocos.jpg" },
    { label: "Explore Premium Dates", image: "/datedark.png" },
  ],
};

const MegaMenu = () => (
  /* Removed absolute positioning from here so the parent wrapper can control it */
  <div className="rounded-sm w-fit bg-cream border border-gold shadow-xl flex">
    {/* Left — columns */}
    <div className="flex flex-col px-10 py-8">
      <div className="flex flex-1 gap-8 ">
        {megaMenu.columns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3 min-w-[110px]">
            <span className="text-[20px] font-medium font-serif  text-black ">
              {col.heading}
            </span>
            {col.links.map((item) => (
              <Link
                key={item}
                href="/shop"
                className="text-[13px] text-black/60 hover:text-gold transition-colors duration-200 leading-tight"
              >
                {item}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <Link
        href={"/shop"}
        className="bg-navy text-cream text-sm px-6 py-2 w-fit mt-8 rounded-full"
      >
        {" "}
        Shop all
      </Link>
    </div>

    {/* Right — featured images */}
    <div className="flex gap-3 p-4 shrink-0">
      {megaMenu.featured.map((f) => (
        <Link
          key={f.label}
          href="/shop"
          className="relative w-[160px] h-[200px] rounded-xl overflow-hidden group"
        >
          <Image
            src={f.image}
            alt={f.label}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-navy/40" />
          <span className="absolute bottom-3 left-3 right-3  text-[20px] font-medium font-serif   text-white  leading-tight">
            {f.label}
          </span>
        </Link>
      ))}
    </div>
  </div>
);

/* ------------------ HEADER ------------------ */

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);
  const { openCart, items } = useCart();
  const pathname = usePathname();

  return (
    <header className="w-full relative z-[9999]">
      <div className="w-full px-8 md:px-16 py-4 bg-navy relative">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Image src="/newnaema.png" width={90} height={90} alt="logo" />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-12 text-[14px] tracking-tight font-medium text-cream/60">
              {navLinks.map((link, index) => {
                const isShop = link.label.toLowerCase() === "shop";
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <div
                    key={index}
                    className="relative"
                    /* The key fix: hover logic is on this wrapper div */
                    onMouseEnter={() => isShop && setShopHovered(true)}
                    onMouseLeave={() => isShop && setShopHovered(false)}
                  >
                    <Link
                      href={link.href}
                      className={`cursor-pointer   underlinee hover:text-cream  duration-300 transition-colors ease-in-out block ${
                        isShop && shopHovered ? "text-gold" : ""
                      } ${isActive ? "text-gold" : "text-cream/60"}`}
                    >
                      {link.label}
                    </Link>

                    {isShop && (
                      <div
                        className={`absolute top-[40] left-1/2 -translate-x-1/2 pt-5 transition-all duration-200 ease-in-out ${
                          shopHovered
                            ? "opacity-100 pointer-events-auto translate-y-0"
                            : "opacity-0 pointer-events-none -translate-y-2"
                        }`}
                      >
                        <MegaMenu />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-transparent border border-cream/40 rounded-full px-3 py-1.5 focus-within:border-cream transition-all duration-300">
              <FiSearch size={20} className="text-cream mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-cream placeholder:text-cream/40 text-[14px] w-[140px] focus:w-[180px] transition-all duration-300"
              />
            </div>
            <Link href={"/login"}>
              {" "}
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

            {/* Hamburger */}
            <button
              className="lg:hidden text-cream"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
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
        className={`fixed top-0 right-0 h-full z-50 bg-cream flex flex-col px-10 py-12 gap-8 transition-transform duration-400 ease-in-out
          w-full md:w-1/2
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

        {/* Mobile shop sub-links */}
        <div className="border-t border-navy/10 pt-6 flex flex-col gap-4">
          <span className="text-xs font-bold tracking-widest text-navy/40 uppercase">
            Shop by category
          </span>
          {megaMenu.columns.map((col) => (
            <div key={col.heading}>
              <span className="text-sm font-semibold text-navy">
                {col.heading}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
