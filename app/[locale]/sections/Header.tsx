"use client";

import React, { useState, useRef } from "react";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
} from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { navLinks } from "../../constants";
import { useCart } from "@/app/context/CartContext";
import { useLocale } from "next-intl";

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
  <div className="bg-cream border-t border-darkgold shadow-2xl w-full flex">
    <div className="flex flex-col flex-1 px-16 py-12 gap-10">
      <div className="grid grid-cols-4 gap-14">
        {megaMenu.columns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-4">
            <span className="text-[10px] uppercase  text-black/60 font-bold">
              {col.heading}
            </span>

            <div className="flex flex-col gap-2.5">
              {col.links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13px] text-black/70 hover:text-darkgold transition-colors duration-200"
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

const SearchOverlay = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState("");

  return (
    <div
      className={`fixed inset-0 z-[99999] transition-all duration-300 ease-out ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative z-10 w-full bg-cream border-b-2 border-darkgold shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-[80px] flex items-center gap-4">
          <FiSearch size={22} className="text-gold shrink-0" />

          <input
            autoFocus={open}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent text-navy placeholder-navy/40 text-[18px] tracking-tight outline-none"
          />

          <button
            onClick={onClose}
            className="text-navy/60 hover:text-navy transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
    <header className="w-full relative z-[9999] bg-navy">
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <div className="relative border-b border-lightgold/50">
        <div className="md:h-[96px] h-[80]  px-6 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              className="lg:hidden relative w-8 h-8 flex items-center justify-center z-[99999]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={`absolute h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out ${
                  menuOpen
                    ? "rotate-45 bg-black"
                    : "-translate-y-2 bg-cream"
                }`}
              />

              <span
                className={`absolute h-[2px] w-5  rounded-full transition-all duration-300 ease-in-out ${
                  menuOpen
                    ? "opacity-0 scale-0 bg-black"
                    : "opacity-100 scale-100 bg-cream"
                }`}
              />

              <span
                className={`absolute h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out ${
                  menuOpen
                    ? "-rotate-45 bg-black"
                    : "translate-y-2 bg-cream"
                }`}
              />
            </button>

            <button
              className="hidden lg:flex text-cream hover:text-gold transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <FiSearch size={24}  />
            </button>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/newnaema.png"
              width={65}
              height={65}
              alt="logo"
              className="object-contain md:size-[65px] size-[48px]"
            />
          </Link>

          <div className="flex items-center gap-4 lg:gap-5">
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href={pathname}
                locale="en"
                className={`text-[14px] tracking-tight transition-colors duration-300 ${
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
                className={`text-[14px] tracking-tight transition-colors duration-300 ${
                  locale === "ar"
                    ? "text-gold"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                AR
              </Link>
            </div>

            <button
              className="lg:hidden text-cream hover:text-gold transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <FiSearch size={22} />
            </button>

            <Link href="/login">
              <FiUser
                size={22}
                className="text-cream hover:text-gold transition-colors"
              />
            </Link>

            <button onClick={openCart} className="relative">
              <FiShoppingCart
                size={22}
                className="text-cream hover:text-gold transition-colors"
              />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold text-[10px] text-navy font-semibold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex border-b border-lightgold/50">
        {navLinks.map((link, index) => {
          const isShop = link.label.toLowerCase() === "shop";

          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <div
              key={index}
              className="flex-1 relative border-r last:border-r-0 border-lightgold/50"
              onMouseEnter={() => isShop && handleEnter()}
              onMouseLeave={() => isShop && handleLeave()}
            >
              <Link
                href={link.href}
                className={`h-[50px] flex items-center justify-center text-[14px] uppercase tracking-tight font-medium transition-all duration-300 group ${
                  isActive
                    ? "text-gold bg-navy"
                    : "text-cream/80 bg-navy hover:text-cream"
                } ${isShop && shopHovered ? "bg-navy text-gold" : ""}`}
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

      <div
        className={`hidden lg:block absolute top-full left-0 w-full transition-all duration-200 ease-out ${
          shopHovered
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <MegaMenu />
      </div>

      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-full md:w-1/2 bg-cream z-50 px-10 py-12 flex flex-col gap-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6 mt-20">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[24px] font-medium text-navy hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 pt-2">
          <Link
            href={pathname}
            locale="en"
            onClick={() => setMenuOpen(false)}
            className={`text-sm transition-colors ${
              locale === "en"
                ? "text-gold"
                : "text-navy/50 hover:text-navy"
            }`}
          >
            English
          </Link>

          <Link
            href={pathname}
            locale="ar"
            onClick={() => setMenuOpen(false)}
            className={`text-sm transition-colors ${
              locale === "ar"
                ? "text-gold"
                : "text-navy/50 hover:text-navy"
            }`}
          >
            العربية
          </Link>
        </div>

        <div className="border-t border-black/10 pt-6 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold">
            Shop Categories
          </span>

          {megaMenu.columns.map((col) => (
            <Link
              key={col.heading}
              href={`/shop/${col.heading
                .toLowerCase()
                .replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-navy hover:text-gold transition-colors"
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