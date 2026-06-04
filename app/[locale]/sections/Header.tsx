"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart, FiX } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { navLinks } from "../../constants";
import { useCart } from "@/app/context/CartContext";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getCategories } from "@/lib/api";

/* ------------------ DATA ------------------ */

const getMegaMenu = (t: any) => ({
  columns: [
    {
      heading: t("Dry Fruits and Nuts"),
      handle: "dry-fruits-and-nuts",
      links: [
        { label: t("Walnut"), href: "/shop?search=Walnut" },
        { label: t("Cashew"), href: "/shop?search=Cashew" },
        { label: t("Almond"), href: "/shop?search=Almond" },
        { label: t("Pista"), href: "/shop?search=Pista" },
        { label: t("Fig (Theen Afghan)"), href: "/shop?search=Fig" },
        { label: t("Fig (Theen Iran)"), href: "/shop?search=Fig" },
        { label: t("Kismis (Golden Raisins)"), href: "/shop?search=Kismis" },
        { label: t("Pumpkin Seeds"), href: "/shop?search=Pumpkin" },
      ],
    },
    {
      heading: t("Dates"),
      handle: "dates",
      links: [
        { label: t("Khudri"), href: "/shop?search=Khudri" },
        { label: t("Safawi"), href: "/shop?search=Safawi" },
        { label: t("Medjool Jordan"), href: "/shop?search=Medjool" },
        { label: t("Mabroom"), href: "/shop?search=Mabroom" },
        { label: t("Ajwa"), href: "/shop?search=Ajwa" },
        { label: t("Medjool Saudi"), href: "/shop?search=Medjool" },
        { label: t("Sikhai"), href: "/shop?search=Sikhai" },
        { label: t("Munaifi"), href: "/shop?search=Munaifi" },
        { label: t("Mufathal (3kg box)"), href: "/shop?search=Mufathal" },
        { label: t("Galaxy (3kg box)"), href: "/shop?search=Galaxy" },
        { label: t("Sukkari (3kg box)"), href: "/shop?search=Sukkari" },
      ],
    },
    {
      heading: t("Other Products"),
      handle: "other-products",
      links: [
        { label: t("Pressed Dates"), href: "/shop?search=Pressed" },
        { label: t("Arabic Coffee (Robusta Mix)"), href: "/shop?search=Robusta" },
        { label: t("Arabic Coffee (Mysore mix)"), href: "/shop?search=Mysore" },
        { label: t("Date Honey (1 litre)"), href: "/shop?search=Honey" },
      ],
    },
  ],
  featured: [
    { label: t("Explore Gift Boxes"), image: "/chocos.jpg", href: "/shop/chocolates" },
    { label: t("Explore Premium Dates"), image: "/datedark.png", href: "/shop/dates" },
  ],
});

/* ------------------ MEGA MENU (desktop) ------------------ */

const MegaMenu = ({ categories, featured, t }: { categories: any[], featured: any[], t: any }) => (
  <div className="w-fit bg-cream border-t border-x border-b border-gold/30 shadow-2xl flex justify-center rounded-b-2xl overflow-hidden mt-[1px]">
    <div className="w-fit flex flex-row justify-center gap-12 lg:gap-24 px-8">
      <div className="flex flex-col py-10 gap-8">
        <div className="flex gap-16 flex-wrap">
          {categories.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3 min-w-[120px]">
              <span className="text-[10px] font-bold text-black/40 uppercase">{col.heading}</span>
              <div className="flex flex-col gap-2.5">
                {col.links.map((item: any) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[13px] text-black/70 hover:text-deepgold cursor-pointer transition-colors duration-200 leading-tight tracking-tight"
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
          className="relative inline-flex w-fit overflow-hidden rounded-full border border-gold bg-navy text-xs font-medium tracking-tight text-cream group"
        >
          <span className="block px-5 py-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
            {t("Shop All")}
          </span>
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-cream text-navy translate-y-full scale-[0.5] transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0 group-hover:scale-100">
            {t("Shop All")}
          </span>
        </Link>
      </div>
      <div className="flex gap-4 py-10 shrink-0 border-s border-gold/20 ps-8">
        {featured.map((f) => (
          <Link key={f.label} href={f.href} className="relative w-[180px] h-[220px] rounded-2xl overflow-hidden group">
            <Image src={f.image} alt={f.label} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-navy/40" />
            <span className="absolute bottom-4 left-4 right-4 font-serif text-[18px] font-medium text-white leading-tight">
              {f.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

/* ------------------ SEARCH OVERLAY ------------------ */

const SearchOverlay = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const { push } = useRouter();

  const triggerSearch = () => {
    if (query.trim()) {
      push(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };
  return (
    <div className={`fixed inset-0 z-[99999] transition-all duration-300 ease-out ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative z-10 w-full bg-cream border-b-2 border-darkgold shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-[1440px] mx-auto px-8 h-[80px] flex items-center gap-4">
          <button
            onClick={triggerSearch}
            className="text-gold hover:text-darkgold transition-colors p-1"
            title="Search"
          >
            <FiSearch size={22} className="shrink-0" />
          </button>
          <input
            autoFocus={open}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-navy placeholder-navy/40 text-[18px] tracking-tight outline-none"
          />

          <button
            onClick={triggerSearch}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-gold text-navy hover:bg-darkgold hover:text-cream transition-all duration-300"
          >
            Search
          </button>

          <button onClick={onClose} className="text-navy/60 hover:text-navy transition-colors p-1 ml-2">
            <FiX size={20} />          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------ HEADER ------------------ */

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = useTranslations("Header");
  const megaMenu = getMegaMenu(t);
  const categories = megaMenu.columns;
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
    closeTimer.current = setTimeout(() => setShopHovered(false), 150);
  };

  return (
    <header className="w-full relative z-[9999]">
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── NAV BAR ── */}
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 lg:py-8 py-4 bg-navy border-b border-darkgold">
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">

          {/* Logo — left on mobile/tablet, centered on desktop */}
          <Link
            href="/"
            className="cursor-pointer shrink-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <Image
              src="/newnaema.png"
              width={70}
              height={70}
              alt="Naema logo"
              className="size-[44px] sm:size-[52px] md:size-[60px] object-contain"
            />
          </Link>

          {/* Desktop Nav — left side */}
          <nav className="hidden lg:flex">
            <div className="flex gap-12 text-[14px] tracking-tight font-medium">
              {navLinks.map((link, index) => {
                const isShop = link.label.toLowerCase() === "shop";
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => isShop && handleEnter()}
                    onMouseLeave={() => isShop && handleLeave()}
                  >
                    <Link
                      href={link.href}
                      className={`cursor-pointer duration-300 transition-colors group ease-in-out block relative hover:text-cream
                        ${isActive ? "text-gold" : "text-cream/60"}
                        ${isShop && shopHovered ? "text-gold" : ""}
                      `}
                    >
                      {link.label}{" "}
                      {isShop && (
                        <IoIosArrowDown className="inline-flex items-center ml-2 size-[14px] transition-all duration-300 group-hover:-rotate-180" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Right side — desktop icons + mobile icons + burger */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">

            {/* Desktop only: search icon */}
            <button
              className="hidden lg:flex text-cream/70 hover:text-gold transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <FiSearch size={20} />
            </button>

            {/* Desktop only: language */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href={pathname} locale="en" className={`text-[12px] tracking-tight transition-colors duration-300 ${locale === "en" ? "text-gold" : "text-cream/50 hover:text-cream"}`}>EN</Link>
              <span className="text-cream/20">/</span>
              <Link href={pathname} locale="ar" className={`text-[12px] tracking-tight transition-colors duration-300 ${locale === "ar" ? "text-gold" : "text-cream/50 hover:text-cream"}`}>AR</Link>
            </div>

            {/* Desktop only: login */}
            <Link href="/account" className="hidden lg:block">
              <FiUser size={20} className="text-cream/70 hover:text-gold transition-colors" />            </Link>

            {/* Desktop only: cart */}
            <button onClick={openCart} className="relative hidden lg:block">
              <FiShoppingCart size={20} className="text-cream/70 hover:text-gold transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold rounded-full text-[9px] text-navy font-medium flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile/tablet: search */}
            <button className="lg:hidden text-cream/80 hover:text-gold transition-colors" onClick={() => setSearchOpen(true)}>
              <FiSearch size={20} />
            </button>

            {/* Mobile/tablet: login */}
            <Link href="/login" className="lg:hidden">
              <FiUser size={20} className="text-cream/80 hover:text-gold transition-colors" />
            </Link>

            {/* Mobile/tablet: cart */}
            <button onClick={openCart} className="relative lg:hidden">
              <FiShoppingCart size={20} className="text-cream/80 hover:text-gold transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold rounded-full text-[9px] text-navy font-medium flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile/tablet: animated burger — rightmost, aligns with close button in drawer */}
            <button
              className="lg:hidden relative w-8 h-8 flex items-center justify-center ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`absolute h-[1.5px] w-[22px] bg-cream rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "rotate-45 translate-y-0" : "-translate-y-[7px]"}`} />
              <span className={`absolute h-[1.5px] w-[22px] bg-cream rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`} />
              <span className={`absolute h-[1.5px] w-[22px] bg-cream rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "-rotate-45 translate-y-0" : "translate-y-[7px]"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      <div
        className={`hidden lg:flex justify-center absolute top-full left-0 w-full transition-all duration-200 ease-in-out ${shopHovered ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <MegaMenu categories={categories} featured={megaMenu.featured} t={t} />
      </div>

      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 lg:hidden transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer — slides from RIGHT */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] sm:w-[60vw] md:w-[45vw] bg-[#faf7f2] z-50 flex flex-col lg:hidden
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${menuOpen ? "translate-x-0 shadow-2xl" : "translate-x-full shadow-none"}`}
      >
        {/* Drawer header — close button on the RIGHT, matching burger position */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5">
          <Image src="/newnaema.png" width={48} height={48} alt="Naema logo" className="size-[40px] object-contain" />
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
            aria-label="Close menu"
          >
            <FiX size={22} className="text-navy" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-0">

          {/* Main nav links — staggered animation */}
          <nav className="flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${index * 55 + 80}ms` : "0ms",
                }}
                className={`group flex items-center justify-between py-4 text-navy text-[20px] sm:text-[22px] font-medium tracking-tight
                  transition-all duration-400
                  ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                  hover:text-gold`}
              >
                <span>{link.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gold text-[13px]">→</span>
              </Link>
            ))}
          </nav>

          {/* Shop categories */}
          <div
            style={{ transitionDelay: menuOpen ? `${navLinks.length * 55 + 100}ms` : "0ms" }}
            className={`mt-6 transition-all duration-400 ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/35 font-bold block mb-4">
              {t("Shop by Category")}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((col) => (
                <Link
                  key={col.heading}
                  href={`/shop/${col.handle}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-navy/5 hover:bg-navy/10 text-[13px] font-medium text-navy hover:text-gold transition-all duration-200"
                >
                  {col.heading}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer footer — language + socials */}
        <div
          style={{ transitionDelay: menuOpen ? "380ms" : "0ms" }}
          className={`px-7 py-6 transition-all duration-400 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-black/30 uppercase tracking-widest">Language</span>
            <div className="flex items-center gap-2 ml-1">
              <Link
                href={pathname}
                locale="en"
                onClick={() => setMenuOpen(false)}
                className={`text-[13px] font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${locale === "en" ? "bg-gold text-navy" : "text-navy/50 hover:text-navy"}`}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="ar"
                onClick={() => setMenuOpen(false)}
                className={`text-[13px] font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${locale === "ar" ? "bg-gold text-navy" : "text-navy/50 hover:text-navy"}`}
              >
                عربي
              </Link>
            </div>
          </div>        </div>
      </div>
    </header>
  );
};

export default Header;