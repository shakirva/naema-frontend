"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../constants";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="w-full px-8 md:px-16 py-2 bg-navy relative">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Image src="/logo.png" width={90} height={90} alt="logo" />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-4 text-[14px] tracking-tight font-medium text-cream/60">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="cursor-pointer px-4 py-6 hover:text-cream duration-300 transition-colors ease-in-out"
                >
                  {link.label}
                </Link>
              ))}
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
            <FiUser size={20} className="cursor-pointer hidden lg:block" color="#f6f1e7" />
            <FiShoppingCart size={20} className="cursor-pointer hidden lg:block" color="#f6f1e7" />

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

      {/* Mobile / Tablet Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-cream flex flex-col px-10 py-12 gap-8 transition-transform duration-400 ease-in-out
          w-full md:w-1/2
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button className="self-end text-navy" onClick={() => setMenuOpen(false)}>
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
      </div>
    </header>
  );
};

export default Header;