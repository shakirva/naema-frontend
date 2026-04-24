import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiPhone,
  FiMail,
  FiSearch,
  FiUser,
  FiShoppingCart,
} from "react-icons/fi";

export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "ABOUT", href: "/about" },
  { label: "WHOLESALE", href: "/wholesale" },
  { label: "CONTACT US", href: "/contact" },
];
const Header = () => {
  return (
    <header className="w-full  ">
      {/* <div className="w-full bg-white text-navy  text-[12px] relative">
              <div className="max-w-7xl mx-auto flex items-center justify-between py-4 "> */}
      {/* Left */}
      {/* <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <FiPhone size={20} />
                    <span>Call Us</span>
                  </div>
        
                  <div className="flex items-center gap-2 cursor-pointer">
                    <FiMail size={20} />
                    <span>Email us</span>
                  </div>
                </div> */}

      {/* Center */}
      {/* <div className="text-[16px] font-medium  tracking-tight absolute left-1/2 top-1/2 -translate-1/2">
                  Free express shipping for orders above $199
                </div> */}

      {/* Right */}

      {/* <div className="flex items-center gap-6">
                  <FiSearch size={20} className="cursor-pointer" />
                  <FiUser size={20} className="cursor-pointer" />
                  <FiShoppingCart size={20} className="cursor-pointer" />
                </div>
              </div>
            </div> */}

      <div className="w-full px-16 py-2  bg-navy relative ">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-center">
          <div className="flex  items-center  justify-between   w-full ">
            {/* Logo Placeholder */}
            <Image src="/logo.png" width={90} height={90} alt="logo" />

            {/* Navigation */}
            <nav>
              <div className="flex gap-4 text-[14px]  tracking-tight font-medium text-cream/60 absolute left-1/2   top-1/2 -translate-1/2">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="cursor-pointer px-4 py-6  hover:text-cream duration-300 transition-colors ease-in-out"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="flex items-center bg-transparent border border-cream/40 rounded-full px-3 py-1.5 focus-within:border-cream transition-all duration-300">
                  <FiSearch size={20} className="text-cream mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none text-cream placeholder:text-cream/40 text-[14px] w-[140px] focus:w-[180px] transition-all duration-300"
                  />
                </div>

                <FiUser size={20} className="cursor-pointer" color="#f6f1e7" />
                <FiShoppingCart
                  size={20}
                  className="cursor-pointer"
                  color="#f6f1e7"
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
