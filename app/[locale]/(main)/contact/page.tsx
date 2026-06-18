"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import React, { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiInstagram } from "react-icons/fi";
import Footer from "../../sections/Footer";
import { useTranslations, useLocale } from "next-intl";

const page = () => {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmails = "support@naemafoodstuff.com";
    const mailtoSubject = encodeURIComponent(
      `Naema Inquiry: ${formData.subject || "Contact Form"}`,
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    window.location.href = `mailto:${targetEmails}?subject=${mailtoSubject}&body=${body}`;
  };

  return (
    <>
      <main
        className="w-full bg-cream overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Hero */}
        <section className="relative w-full px-5 md:px-8 lg:px-16 pt-24 md:pt-32 pb-14 md:pb-20">
          {/* Background */}
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/goldpalmm.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center text-center">
            {/* Label */}
            <span className="font-serif text-[22px] text-navy leading-none w-fit bg-gold/20 border border-gold/40 rounded-lg px-4 py-2">
              {t("label")}
            </span>

            {/* Heading */}
            <h1 className="font-serif text-[clamp(2.2rem,8vw,7rem)] leading-[0.95] text-navy mt-6 md:mt-8 max-w-[1000px]">
              {t("heroLine1")}
              <br />
              {t("heroLine2")}
            </h1>

            {/* Body */}
            <p className="text-[clamp(1rem,1.5vw,1.2rem)] tracking-tight text-navy/70 leading-[1.3] max-w-[650px] mt-6">
              {t("heroDesc")}
            </p>
          </div>
        </section>

        {/* Main contact section */}
        <section className="w-full px-5 md:px-8 lg:px-16 pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12">
            {/* Left */}
            <div className="bg-darkgold/20 border border-gold/30 rounded-[30px] p-5 md:p-8 lg:p-10 flex flex-col justify-between md:min-h-[720px]">
              <div>
                <span className="text-[11px] uppercase text-navy/50">
                  {t("getInTouch")}
                </span>

                <h2 className="font-serif text-[clamp(2rem,5vw,5rem)] leading-[0.95] text-navy mt-5">
                  {t("leftHeadLine1")}
                  <br />
                  {t("leftHeadLine2")}
                </h2>

                <p className="text-navy/70 text-[15px] md:text-base leading-relaxed tracking-tight mt-6 max-w-[520px]">
                  {t("leftDesc")}
                </p>
              </div>

              {/* Contact cards */}
              <div className="flex flex-col gap-4 mt-10">
                {/* Email */}
                <div className="bg-cream border border-gold/30 rounded-2xl p-4 md:p-5 flex items-center gap-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                    <FiMail className="text-navy text-[18px]" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] uppercase text-navy/40">
                      {t("emailLabel")}
                    </span>

                    <a
                      href="mailto:support@naemafoodstuff.com"
                      className="mt-1 text-navy text-[15px] md:text-lg tracking-tight break-all"
                    >
                      support@naemafoodstuff.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-cream border border-gold/30 rounded-2xl p-4 md:p-5 flex items-center gap-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                    <FiPhone className="text-navy text-[18px]" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] uppercase text-navy/40">
                      {t("phoneLabel")}
                    </span>

                    <a
                      href="tel:+96598043912"
                      className="mt-1 text-navy text-[15px] md:text-lg tracking-tight"
                    >
                      +965 9804 3912
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-cream border border-gold/30 rounded-2xl p-4 md:p-5 flex items-center gap-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                    <FiMapPin className="text-navy text-[18px]" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] uppercase text-navy/40">
                      {t("locationLabel")}
                    </span>

                    <p className="mt-1 text-navy text-[15px] md:text-lg tracking-tight">
                      {t("locationValue")}
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="bg-cream border border-gold/30 rounded-2xl p-4 md:p-5 flex items-center gap-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                    <FiInstagram className="text-navy text-[18px]" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] uppercase text-navy/40">
                      {t("instagramLabel")}
                    </span>

                    <Link
                      href="https://instagram.com/naema_foodstuff"
                      target="_blank"
                      className="mt-1 text-navy text-[15px] md:text-lg tracking-tight"
                    >
                      @naemafoodstuff
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="bg-white border border-gold/30 rounded-[30px] p-5 md:p-8 lg:p-10">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase text-navy/50">
                  {t("formLabel")}
                </span>

                <h3 className="font-serif text-[clamp(1.8rem,4vw,4rem)] text-navy leading-none mt-4 md:mt-5">
                  {t("formHeadLine1")}
                  <br />
                  {t("formHeadLine2")}
                </h3>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 mt-10"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-navy/70 tracking-tight">
                    {t("fullName")}
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t("namePlaceholder")}
                    className="w-full h-[58px] rounded-xl border border-gold/30 bg-cream px-5 outline-none text-navy placeholder:text-navy/35"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-navy/70 tracking-tight">
                    {t("emailAddress")}
                  </label>

                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className="w-full h-[58px] rounded-xl border border-gold/30 bg-cream px-5 outline-none text-navy placeholder:text-navy/35"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-navy/70 tracking-tight">
                    {t("subject")}
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder={t("subjectPlaceholder")}
                    className="w-full h-[58px] rounded-xl border border-gold/30 bg-cream px-5 outline-none text-navy placeholder:text-navy/35"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-navy/70 tracking-tight">
                    {t("message")}
                  </label>

                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t("messagePlaceholder")}
                    className="w-full h-[180px] rounded-xl border border-gold/30 bg-cream px-5 py-4 outline-none resize-none text-navy placeholder:text-navy/35"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="mt-2 h-[58px] rounded-full bg-navy text-cream font-medium tracking-tight hover:opacity-90 transition cursor-pointer"
                >
                  {t("sendBtn")}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
