"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const GoogleSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setErrorMsg(decodeURIComponent(error));
      setStatus("error");
      return;
    }

    if (!token) {
      setErrorMsg("Authentication failed — no token received.");
      setStatus("error");
      return;
    }

    // Store the JWT token as a cookie
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `_medusa_jwt=${decodeURIComponent(token)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;

    // Redirect to account page
    router.replace("/account");
  }, [searchParams, router]);

  return (
    <section className="min-h-screen bg-cream flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <Image src="/logo.webp" width={70} height={70} alt="Naema" />
        {status === "loading" ? (
          <>
            <div className="w-10 h-10 border-4 border-navy border-t-transparent rounded-full animate-spin" />
            <p className="text-black/60 text-sm">Signing you in with Google...</p>
          </>
        ) : (
          <>
            <p className="text-red-500 font-medium">⚠️ {errorMsg}</p>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 bg-navy text-white rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              Back to Sign In
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default GoogleSuccessPage;
