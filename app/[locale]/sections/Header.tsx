"use client";

import React, { useState, useRef } from "react";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { navLinks } from "../../constants";
import { useCart } from "@/app/context/CartContext";
import { useLocale } from "next-intl";

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

/* ------------------ MEGA MENU ------------------ */

const MegaMenu = () => (
  <div className="bg-cream border-t border-darkgold shadow-2xl w-full flex">
    {/* LEFT */}
    <div className="flex flex-col flex-1 px-16 py-12 gap-10">
      <div className="grid grid-cols-4 gap-14">
        {megaMenu.columns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-black/40 font-bold">
              {col.heading}
            </span>

            <div className="flex flex-col gap-2.5">
              {col.links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13px] text-black/70 hover:text-gold transition-colors duration-200"
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
        <span className="block px-6 py-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
          Shop All
        </span>

        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-gold text-navy translate-y-full scale-[0.5] transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0 group-hover:scale-100">
          Shop All
        </span>
      </Link>
    </div>

    {/* RIGHT */}
    <div className="flex gap-4 px-10 py-10 border-l border-darkgold/20">
      {megaMenu.featured.map((f) => (
        <Link
          key={f.label}
          href={f.href}
          className="relative w-[180px] h-[220px] overflow-hidden rounded-[24px] group"
        >
          <Image
            src={f.image}
            alt={f.label}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />

          <span className="absolute bottom-5 left-5 right-5 font-serif text-[20px] leading-tight text-white">
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

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { openCart, items } = useCart();

  const pathname = usePathname();
  const locale = useLocale();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopHovered(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => {
      setShopHovered(false);
    }, 150);
  };

  return (
    <header className="w-full relative z-[9999] border-b border-darkgold bg-navy">
      {/* TOP HEADER */}
      <div className="relative border-b border-darkgold">
        <div className="max-w-[1440px] mx-auto h-[80px] px-8 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-5">
            <button className="hidden lg:flex text-cream hover:text-gold transition-colors">
              <FiSearch size={24} />
            </button>
          </div>

          {/* LOGO */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/newnaema.png"
              width={65}
              height={65}
              alt="logo"
              className="object-contain"
            />
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* LANGUAGE */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href={pathname}
                locale="en"
                className={`text-[12px] tracking-tight transition-colors duration-300 ${
                  locale === "en"
                    ? "text-gold"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                EN
              </Link>

              <span className="text-cream">/</span>

              <Link
                href={pathname}
                locale="ar"
                className={`text-[12px] tracking-tight transition-colors duration-300 ${
                  locale === "ar"
                    ? "text-gold"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                AR
              </Link>
            </div>

            {/* USER */}
            <Link href="/login">
              <FiUser
                size={22}
                className="hidden lg:block text-cream hover:text-gold transition-colors"
              />
            </Link>

            {/* CART */}
            <button onClick={openCart} className="relative">
              <FiShoppingCart
                size={22}
                className="hidden lg:block text-cream hover:text-gold transition-colors"
              />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold text-[10px] text-navy font-semibold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* MOBILE MENU */}
            <button
              className="lg:hidden text-cream"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden lg:flex border-b border-gold">
        {navLinks.map((link, index) => {
          const isShop = link.label.toLowerCase() === "shop";

          const isActive =
            pathname === link.href ||
            pathname.startsWith(link.href + "/");

          return (
            <div
              key={index}
              className="flex-1 relative border-r last:border-r-0 border-gold"
              onMouseEnter={() => isShop && handleEnter()}
              onMouseLeave={() => isShop && handleLeave()}
            >
              <Link
                href={link.href}
                className={`h-[64px] flex items-center justify-center text-[14px] uppercase tracking-tight font-medium transition-all duration-300 group
                ${
                  isActive
                    ? "text-gold bg-navy"
                    : "text-cream/80 bg-navy hover:text-cream"
                }
                ${isShop && shopHovered ? "bg-navy text-gold" : ""}
              `}
              >
                <span className="flex items-center gap-2">
                  {link.label}

                  {isShop && (
                    <IoIosArrowDown className="size-[16px] transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* MEGA MENU */}
      <div
        className={`hidden lg:block absolute top-full left-0 w-full transition-all duration-200 ease-out
        ${
          shopHovered
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <MegaMenu />
      </div>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-cream z-50 px-10 py-12 flex flex-col gap-8 transition-transform duration-500
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="self-end text-navy"
          onClick={() => setMenuOpen(false)}
        >
          <FiX size={28} />
        </button>

        <nav className="flex flex-col gap-6 mt-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[24px] font-medium text-cream hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-black/10 pt-6 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold">
            Shop Categories
          </span>

          {megaMenu.columns.map((col) => (
            <Link
              key={col.heading}
              href={`/shop/${col.heading.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-cream hover:text-gold transition-colors"
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