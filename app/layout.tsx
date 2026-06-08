import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Instrument_Serif } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import LenisSmoothScroll from "./[locale]/components/SmoothScroll/Lenis";

export const metadata: Metadata = {
  title: "Naema | Premium Dates and Artisan Products",
  description: "Experience the luxury of Naema's premium quality dates and artisan products. Handpicked, natural, and rich in tradition.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:3000")
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Naema | Premium Dates and Artisan Products",
    description: "Experience the luxury of Naema's premium quality dates and artisan products. Handpicked, natural, and rich in tradition.",
    url: "/",
    siteName: "Naema",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Naema - Premium Dates & Artisan Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naema | Premium Dates and Artisan Products",
    description: "Experience the luxury of Naema's premium quality dates and artisan products. Handpicked, natural, and rich in tradition.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const helveticaNeue = localFont({
  src: [
    {
      path: "./fonts/HelveticaNeue/HelveticaNeueUltraLight.otf",
      weight: "100",
    },
    { path: "./fonts/HelveticaNeue/HelveticaNeueThin.otf", weight: "200" },
    { path: "./fonts/HelveticaNeue/HelveticaNeueLight.otf", weight: "300" },
    { path: "./fonts/HelveticaNeue/HelveticaNeueRoman.otf", weight: "400" },
    { path: "./fonts/HelveticaNeue/HelveticaNeueMedium.otf", weight: "500" },
    { path: "./fonts/HelveticaNeue/HelveticaNeueBold.otf", weight: "700" },
    { path: "./fonts/HelveticaNeue/HelveticaNeueHeavy.otf", weight: "800" },
    { path: "./fonts/HelveticaNeue/HelveticaNeueBlack.otf", weight: "900" },
  ],
  variable: "--font-helvetica",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${helveticaNeue.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LenisSmoothScroll />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
