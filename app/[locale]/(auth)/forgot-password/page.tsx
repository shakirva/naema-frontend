"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMail } from "react-icons/fi";
import { requestPasswordReset } from "../../../actions";

const ForgotPasswordPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await requestPasswordReset(email);
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        setSuccess(true);
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
           
            className="object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <Image src="/logo.webp" width={100} height={100} alt="Naema" />
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] text-cream leading-none">
            Reset Password
          </h2>
          <p className="text-cream/80 text-sm max-w-[300px] leading-relaxed tracking-tight">
            Enter your email to receive a password reset link.
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-16">
        <div className="lg:hidden mb-8">
          <Image src="/logo.webp" width={90} height={90} alt="Naema" />
        </div>

        <div className="w-full max-w-[420px] flex flex-col gap-6">
          <div>
            <h1 className="font-serif text-[clamp(2rem,3vw,2.5rem)] leading-none">
              Forgot Password
            </h1>
            <p className="text-sm text-black/50 mt-2 tracking-tight">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-navy font-medium underline underline-offset-4 hover:text-gold transition"
              >
                Sign in
              </Link>
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm leading-relaxed">
              If an account with that email exists, we have sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

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
                  required
                  className="w-full border border-black/20 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 rounded-full bg-navy text-cream text-sm font-medium hover:opacity-90 transition-all duration-200 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isPending ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
