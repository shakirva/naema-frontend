"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { resetPassword } from "../../../actions";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    
    if (!token) {
      setError("Invalid reset token.");
      return;
    }

    startTransition(async () => {
      const res = await resetPassword(password, token);
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
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
            Secure Your Account
          </h2>
          <p className="text-cream/80 text-sm max-w-[300px] leading-relaxed tracking-tight">
            Create a strong new password to protect your account.
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
              Reset Password
            </h1>
            <p className="text-sm text-black/50 mt-2 tracking-tight">
              {email ? `Resetting password for ${email}` : "Enter your new password below."}
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm leading-relaxed text-center">
              Your password has been successfully reset. Redirecting you to login...
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              {/* Password */}
              <div className="relative">
                <FiLock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!token || isPending}
                  required
                  className="w-full border border-black/20 rounded-xl pl-10 pr-12 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <FiLock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!token || isPending}
                  required
                  className="w-full border border-black/20 rounded-xl pl-10 pr-12 py-3.5 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isPending || !token}
                className="w-full py-4 rounded-full bg-navy text-cream text-sm font-medium hover:opacity-90 transition-all duration-200 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isPending ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <div className="flex justify-center mt-2">
            <Link
              href="/login"
              className="text-sm text-black/50 hover:text-black transition underline underline-offset-4"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
