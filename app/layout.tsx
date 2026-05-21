import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Instrument_Serif } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import LenisSmoothScroll from "./components/SmoothScroll/Lenis";


export const metadata: Metadata = {
  title: "Naema",
  description: "Premium dates and artisan products",
};

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const helveticaNeue = localFont({
  src: [
    { path: "./fonts/HelveticaNeue/HelveticaNeueUltraLight.otf", weight: "100" },
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
        <WishlistProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}