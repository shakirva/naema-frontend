"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import medusa from "@/lib/medusa";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Authenticate with Medusa
      await medusa.auth.login("customer", "emailpass", { email, password });
      router.push("/account");
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
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
            Welcome back.
          </h2>
          <p className="text-cream/80 text-sm max-w-[300px] leading-relaxed tracking-tight">
            Sign in to track your orders, manage your account and enjoy exclusive member offers.
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="lg:hidden mb-8">
          <Image src="/logo.png" width={90} height={90} alt="Naema" />
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-[420px] flex flex-col gap-6">
          <div>
            <h1 className="font-serif text-[clamp(2rem,3vw,2.5rem)] leading-none">Sign In</h1>
            <p className="text-sm text-black/50 mt-2 tracking-tight">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-navy font-medium underline underline-offset-4 hover:text-gold transition">
                Create one
              </Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <FiMail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-black/20 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-black/20 rounded-xl pl-10 pr-12 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>

            <div className="flex justify-center w-full">
              <Link href="/forgot-password" className="text-xs text-black/40 w-fit hover:text-black transition underline underline-offset-4">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-navy text-cream text-sm font-medium hover:opacity-90 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-xs text-black/50 text-center leading-relaxed">
            Need help?{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-black transition">
              Contact us
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;