"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";
import { FiPackage } from "react-icons/fi";

const OrderSuccessInner = () => {
  const params = useSearchParams();
  const orderId = params.get("order");
  const displayId = params.get("display");

  return (
    <section className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto">
        {/* Animated checkmark */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center animate-bounce">
          <IoMdCheckmark size={40} className="text-navy" />
        </div>

        <h1 className="font-serif text-4xl mb-3">Order Confirmed!</h1>

        {displayId && (
          <p className="text-sm text-black/40 mb-2 font-mono">
            Order #{displayId}
          </p>
        )}

        <p className="text-black/60 mb-8 leading-relaxed">
          Thank you for your purchase! Your order has been placed successfully.
          You will receive a confirmation email shortly.
        </p>

        {/* Track order */}
        {orderId && (
          <div className="bg-white border border-black/10 rounded-2xl p-5 mb-6 flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
              <FiPackage size={18} className="text-navy" />
            </div>
            <div>
              <p className="text-sm font-medium">Track Your Order</p>
              <p className="text-xs text-black/40 mt-0.5">View status and shipping updates</p>
            </div>
            <Link
              href="/account"
              className="ml-auto text-xs font-medium text-navy underline underline-offset-2 hover:text-gold transition shrink-0"
            >
              View →
            </Link>
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-navy text-white font-medium text-sm hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="px-8 py-3 rounded-full border-2 border-navy text-navy font-medium text-sm hover:bg-navy hover:text-white transition"
          >
            My Orders
          </Link>
        </div>
      </div>
    </section>
  );
};

const OrderSuccessPage = () => (
  <Suspense fallback={
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  }>
    <OrderSuccessInner />
  </Suspense>
);

export default OrderSuccessPage;
