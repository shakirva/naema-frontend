import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiMail, FiMapPin, FiPhone, FiInstagram } from "react-icons/fi";
import Footer from "../../sections/Footer";

const page = () => {
  return (
    <>
      <main className="w-full bg-cream overflow-hidden">
        {/* Hero */}
        <section className="relative w-full px-5 md:px-8 lg:px-16 pt-32 pb-20">
          {/* Background */}
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/goldpalmm.jpg"
              alt="Palm background"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center text-center">
            {/* Label */}
            <span className="font-serif text-[22px] text-navy leading-none w-fit bg-gold/20 border border-gold/40 rounded-lg px-4 py-2">
              Contact Us
            </span>

            {/* Heading */}
            <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-navy mt-8 max-w-[1000px]">
              We’d Love to Hear
              <br />
              From You.
            </h1>

            {/* Body */}
            <p className="text-[clamp(1rem,1.5vw,1.2rem)] tracking-tight text-navy/70 leading-[1.3] max-w-[650px] mt-6">
              Questions about gifting, wholesale, orders, or custom collections?
              Reach out and our team will get back to you shortly.
            </p>
          </div>
        </section>

        {/* Main contact section */}
        <section className="w-full px-5 md:px-8 lg:px-16 pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12">
            {/* Left */}
            <div className="bg-darkgold/20 border border-gold/30 rounded-[30px] p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[720px]">
              <div>
                <span className="text-[11px] uppercase  text-navy/50">
                  Get In Touch
                </span>

                <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] text-navy mt-5">
                  Let’s Start a
                  <br />
                  Conversation.
                </h2>

                <p className="text-navy/70 text-[15px] md:text-base leading-relaxed tracking-tight mt-6 max-w-[520px]">
                  Whether you're planning corporate gifting, sourcing premium
                  products for your café, or simply have a question about your
                  order, we’re here to help.
                </p>
              </div>

              {/* Contact cards */}
              <div className="flex flex-col gap-4 mt-10">
                {/* Email */}
                <div className="bg-cream border border-gold/30 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                    <FiMail className="text-navy text-[18px]" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase  text-navy/40">
                      Email
                    </span>

                    <a
                      href="mailto:hello@naema.com"
                      className="mt-2 text-navy text-lg tracking-tight"
                    >
                      neama@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-cream border border-gold/30 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                    <FiPhone className="text-navy text-[18px]" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase  text-navy/40">
                      Phone
                    </span>

                    <a
                      href="tel:+96500000000"
                      className="mt-2 text-navy text-lg tracking-tight"
                    >
                      +965 9804 3912
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-cream border border-gold/30 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                    <FiMapPin className="text-navy text-[18px]" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase  text-navy/40">
                      Based In
                    </span>

                    <p className="mt-2 text-navy text-lg tracking-tight">
                      Shuwaikh Industrial Area 3, Kuwait
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="bg-cream border border-gold/30 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                    <FiInstagram className="text-navy text-[18px]" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase  text-navy/40">
                      Instagram
                    </span>

                    <Link
                      href="/"
                      className="mt-2 text-navy text-lg tracking-tight"
                    >
                      @naema
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="bg-white border border-gold/30 rounded-[30px] p-6 md:p-8 lg:p-10">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase  text-navy/50">
                  Send a Message
                </span>

                <h3 className="font-serif text-[clamp(2rem,4vw,4rem)] text-navy leading-none mt-5">
                  Tell Us What
                  <br />
                  You Need.
                </h3>
              </div>

              <form className="flex flex-col gap-5 mt-10">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-navy/70 tracking-tight">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full h-[58px] rounded-xl border border-gold/30 bg-cream px-5 outline-none text-navy placeholder:text-navy/35"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-navy/70 tracking-tight">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full h-[58px] rounded-xl border border-gold/30 bg-cream px-5 outline-none text-navy placeholder:text-navy/35"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-navy/70 tracking-tight">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Wholesale, gifting, order inquiry..."
                    className="w-full h-[58px] rounded-xl border border-gold/30 bg-cream px-5 outline-none text-navy placeholder:text-navy/35"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-navy/70 tracking-tight">
                    Message
                  </label>

                  <textarea
                    placeholder="Tell us more about your inquiry..."
                    className="w-full h-[180px] rounded-xl border border-gold/30 bg-cream px-5 py-4 outline-none resize-none text-navy placeholder:text-navy/35"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="mt-2 h-[58px] rounded-full bg-navy text-cream font-medium tracking-tight hover:opacity-90 transition cursor-pointer"
                >
                  Send Message
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
