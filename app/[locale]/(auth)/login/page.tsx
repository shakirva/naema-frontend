"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { login } from "../../../actions";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (el: HTMLElement, config: any) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID =
  "726121337716-m3e5adatl4k95rlcvi88sj2ivttce5nv.apps.googleusercontent.com";

const LoginPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [gisReady, setGisReady] = useState(false);

  useEffect(() => {
    const initGIS = () => {
      if (!window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        ux_mode: "popup",
        callback: async (credentialResponse: { credential: string }) => {
          setGoogleLoading(true);
          setError(null);
          try {
            const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
            const res = await fetch(`${backendUrl}/store/auth/google/token`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: credentialResponse.credential }),
            });
            const data = await res.json();
            if (data.token) {
              const expires = new Date();
              expires.setFullYear(expires.getFullYear() + 1);
              document.cookie = `_medusa_jwt=${data.token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
              router.replace("/account");
            } else {
              setError(data.message || "Google sign-in failed. Please try again.");
            }
          } catch {
            setError("Google sign-in failed. Please try again.");
          } finally {
            setGoogleLoading(false);
          }
        },
      });
      setGisReady(true);
    };

    if (window.google?.accounts?.id) {
      initGIS();
    } else {
      // Avoid loading the script twice
      const existing = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = initGIS;
        document.head.appendChild(script);
      } else {
        // Script already in DOM, just wait for it
        existing.addEventListener("load", initGIS);
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const res = await login(formData);
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        router.push("/account");
      }
    });
  };

  return (
    <section className="min-h-screen bg-cream flex">
      {/* LEFT — decorative panel */}
      <div className="hidden lg:flex w-1/2 bg-navy relative overflow-hidden flex-col items-center justify-center p-16">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/verydarkpalm.webp"
            fill
            alt=""
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <Image src="/logo.webp" width={100} height={100} alt="Naema" />
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] text-cream leading-none">
            Welcome back.
          </h2>
          <p className="text-cream/80 text-sm max-w-[300px] leading-relaxed tracking-tight">
            Sign in to track your orders, manage your account and enjoy
            exclusive member offers.
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Image src="/logo.webp" width={90} height={90} alt="Naema" />
        </div>

        <div className="w-full max-w-[420px] flex flex-col gap-6">
          {/* Heading */}
          <div>
            <h1 className="font-serif text-[clamp(2rem,3vw,2.5rem)] leading-none">
              Sign In
            </h1>
            <p className="text-sm text-black/50 mt-2 tracking-tight">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-navy font-medium underline underline-offset-4 hover:text-gold transition"
              >
                Create one
              </Link>
            </p>
          </div>

          {/* Google SSO — popup only, no redirect */}
          <button
            onClick={() => {
              if (gisReady && window.google?.accounts?.id) {
                window.google.accounts.id.prompt();
              }
            }}
            disabled={googleLoading || !gisReady}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-full border-2 border-black/10 bg-white hover:border-gold transition-all duration-200 text-sm font-medium cursor-pointer disabled:opacity-60"
          >
            <FcGoogle size={20} />
            {googleLoading ? "Signing in..." : !gisReady ? "Loading..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-xs text-black/30">or</span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <FiMail
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black/20 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-black/20 rounded-xl pl-10 pr-12 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>

            <Link
              href="/forgot-password"
              className="text-xs text-black/40 underline underline-offset-4 self-center hover:text-black/70 transition"
            >
              Forgot your password?
            </Link>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 bg-navy text-cream rounded-full text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-xs text-black/30 text-center">
            Need help?{" "}
            <Link href="/contact" className="underline hover:text-black/60 transition">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
