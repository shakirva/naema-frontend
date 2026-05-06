"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { IoMdCheckmark } from "react-icons/io";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [password, setPassword] = useState("");

  const passwordStrength = password.length === 0
    ? null
    : password.length < 6
    ? "weak"
    : password.length < 10
    ? "medium"
    : "strong";

  const strengthColor = {
    weak: "bg-red-400",
    medium: "bg-gold",
    strong: "bg-green-500",
  };

  return (
    <section className="min-h-screen bg-cream flex">

      {/* LEFT — decorative panel */}
      <div className="hidden lg:flex w-1/2 bg-navy relative overflow-hidden flex-col items-center justify-center p-16">
        <div className="absolute inset-0 opacity-5">
          <Image src="/verydarkpalm.png" fill alt="" className="object-cover" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <Image src="/logo.png" width={100} height={100} alt="Naema" />
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] text-cream leading-none">
            Join Naema.
          </h2>
          <p className="text-cream/50 text-sm max-w-[300px] leading-relaxed tracking-tight">
            Create an account to unlock member-only offers, track orders and
            experience the finest dates delivered to your door.
          </p>

          {/* Perks */}
          <div className="flex flex-col gap-3 mt-4 w-full max-w-[260px]">
            {[
              "Exclusive member discounts",
              "Early access to new arrivals",
              "Order tracking & history",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0">
                  <IoMdCheckmark size={10} className="text-gold" />
                </div>
                <span className="text-cream/60 text-xs tracking-tight">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Image src="/logo.png" width={70} height={70} alt="Naema" />
        </div>

        <div className="w-full max-w-[420px] flex flex-col gap-8">

          {/* Heading */}
          <div>
            <h1 className="font-serif text-[clamp(2rem,3vw,2.5rem)] leading-none">
              Create Account
            </h1>
            <p className="text-sm text-black/50 mt-2 tracking-tight">
              Already have an account?{" "}
              <Link href="/login" className="text-navy font-medium underline underline-offset-4 hover:text-gold transition">
                Sign in
              </Link>
            </p>
          </div>

          {/* Google SSO */}
          <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-full border-2 border-black/10 bg-white hover:border-gold transition-all duration-200 text-sm font-medium cursor-pointer">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-xs text-black/30">or</span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">

            {/* Name row */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <FiUser size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full border border-black/20 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full border border-black/20 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-black/20 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="relative">
                <FiLock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-black/20 rounded-xl pl-10 pr-12 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                />
                <button
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>

              {/* Password strength bar */}
              {passwordStrength && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {["weak", "medium", "strong"].map((level, i) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          ["weak", "medium", "strong"].indexOf(passwordStrength) >= i
                            ? strengthColor[passwordStrength]
                            : "bg-black/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-black/40 capitalize">{passwordStrength}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FiLock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border border-black/20 rounded-xl pl-10 pr-12 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
              />
              <button
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition cursor-pointer"
              >
                {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>

            {/* Email updates checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <div
                onClick={() => setEmailUpdates((e) => !e)}
                className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  emailUpdates ? "bg-navy border-navy" : "border-black/30"
                }`}
              >
                {emailUpdates && <IoMdCheckmark size={10} className="text-white" />}
              </div>
              <span className="text-xs text-black/50 leading-relaxed">
                Email me with exclusive offers, new arrivals and Naema updates.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button className="w-full py-4 rounded-full bg-navy text-white text-sm font-medium hover:opacity-90 transition-all duration-200 cursor-pointer tracking-wide">
            Create Account
          </button>

          {/* Terms */}
          <p className="text-xs text-black/30 text-center leading-relaxed">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-black transition">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-black transition">
              Privacy Policy
            </Link>.
          </p>

        </div>
      </div>
    </section>
  );
};

export default SignupPage;