import React from "react";
import { PiTreePalm } from "react-icons/pi";
import { LuShoppingBasket } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";
import { navLinks } from "../../constants";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-[#0A223A] px-16 py-12 text-cream w-full relative  max-lg:pt-8 max-lg:px-8 max-md:px-5 ">
      <div className="h-full w-full absolute inset-0 opacity-5">
        <Image src="/footer.png" fill alt="palm" className=" object-cover " />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="flex items-center max-lg:flex-col  gap-16">
          <div className="flex flex-col lg:w-[50%] max-lg:w-full   order-2 lg:order-0">
            <h4
              className="font-serif text-[clamp(2.50rem,4.44vw,4rem)] leading-none"
              dangerouslySetInnerHTML={{ __html: t.raw("title") }}
            />

            <p className="mt-4 text-[18px] text-cream/80 tracking-tight lg:max-w-[400px]">
              {t("description")}
            </p>

            <div className="flex gap-4 text-black mt-14">
              <div className="lg:h-[250px] lg:max-w-[250px] flex-1 rounded-lg border-2 border-gold bg-cream p-4 flex flex-col">
                <PiTreePalm size={70} color="#baa448" />
                <div className="mt-auto">
                  <h4 className="font-semibold font-serif text-[24px] max-md:text-[20px]">
                    {t("perfectlyRipened")}
                  </h4>
                  <p className="md:text-base text-sm leading-[1.2em] mt-2">
                    {t("perfectlyRipenedDesc")}
                  </p>
                </div>
              </div>

              <div className="lg:h-[250px] lg:max-w-[250px] flex-1 text-black flex flex-col rounded-lg border-2 border-gold bg-cream p-4">
                <LuShoppingBasket size={70} color="#baa448" />
                <div className="mt-auto">
                  <h4 className="font-semibold font-serif text-[24px] max-md:text-[20px]">
                    {t("rootedInTradition")}
                  </h4>
                  <p className="md:text-base text-sm leading-[1.2em] mt-2">
                    {t("rootedInTraditionDesc")}
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
        <div className="w-full h-px bg-darkgold my-16" />

        {/* Footer Links */}
        <div className="grid grid-cols-4 max-md:grid-cols-1 gap-8 text-cream">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image src="/newnaema.png" width={90} height={90} alt="logo" />
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed  mt-4 mb-6">
              {t("aboutDesc")}
            </p>
            <p className="text-sm text-cream/80 mb-2">{t("email")}</p>
            <p className="text-sm text-cream/80 mb-2">{t("phone")}</p>
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
          <div className="w-fit">
            <h4 className="font-semibold mb-4">{t("shop")}</h4>
            <ul className="space-y-2 text-cream/70 text-sm">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.label} className="">
                  <Link
                    href={link.href}
                    className="hover:text-cream transition underlinee"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="w-fit">
            <h4 className="font-semibold mb-4">{t("explore")}</h4>
            <ul className="space-y-2 text-cream/70 text-sm">
              {navLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cream transition underlinee"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/account"
                  className="hover:text-cream transition underlinee"
                >
                  {t("account")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className=" max-md:col-span-1">
            <h4 className="font-semibold mb-4">{t("innerCircle")}</h4>
            <p className="text-cream/70 text-sm mb-4">
              {t("innerCircleDesc")}
            </p>
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="w-full px-4 py-3 text-black bg-cream rounded-full outline-none mb-3"
            />
            <button className="w-full bg-gold text-black py-3 rounded-full font-medium relative group overflow-hidden cursor-pointer">
              <span className="block group-hover:-translate-y-full tracking-tight transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]">
                {t("joinNow")}
              </span>
              <span className="block absolute inset-0 flex items-center tracking-tight justify-center bg-navy text-cream border-2 border-gold rounded-full translate-y-full scale-[0.5] transition-all duration-300 group-hover:scale-[1] group-hover:translate-y-0 ease-[cubic-bezier(0.65,0,0.35,1)]">
                {t("joinNow")}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex max-md:flex-col max-md:items-center max-md:gap-4 justify-between items-center mt-12 text-cream/50 text-sm">
          <p>{t("copyright")}</p>
          <div className="flex gap-6 max-md:gap-4 flex-wrap max-md:justify-center">
            <Link href="/policies" className="hover:text-cream transition">
              {t("privacy")}
            </Link>
            <Link href="/policies" className="hover:text-cream transition">
              {t("terms")}
            </Link>
            <Link href="/policies" className="hover:text-cream transition">
              {t("shipping")}
            </Link>
            <Link href="/policies" className="hover:text-cream transition">
              {t("returns")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
