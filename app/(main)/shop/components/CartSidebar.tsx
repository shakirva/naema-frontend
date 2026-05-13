"use client";

import Image from "next/image";
import Link from "next/link";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useCart } from "@/app/context/CartContext";
import { formatKWD } from "@/lib/types";

const CartSidebar = () => {
  const { items, isOpen, closeCart, removeFromCart, updateQty, totalFormatted, itemCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] max-md:w-full bg-cream z-[9999] flex flex-col shadow-2xl transition-transform duration-400 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <h2 className="font-serif text-2xl leading-none">
            Your Cart {itemCount > 0 && <span className="text-base font-normal text-black/40">({itemCount})</span>}
          </h2>
          <button onClick={closeCart} className="text-black/50 hover:text-black transition">
            <FiX size={22} />
          </button>
        </div>

        {/* Top CTAs */}
        <div className="flex gap-3 px-6 py-4 border-b border-black/10">
          <button
            onClick={closeCart}
            className="flex-1 text-center py-2.5 rounded-full border-2 border-black/20 text-sm font-medium hover:border-black transition duration-200"
          >
            Keep Shopping
          </button>
          <Link
            href="/checkout"
            onClick={closeCart}
            className="flex-1 text-center py-2.5 rounded-full border-2 text-cream border-black/20 bg-navy text-sm font-medium hover:border-black hover:bg-cream hover:text-black transition duration-200"
          >
            Checkout →
          </Link>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-black/30">
              <span className="text-5xl">🫙</span>
              <p className="text-sm">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => {
                const thumb = item.thumbnail ?? "/n1.jpg";
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 items-start border border-black/10 rounded-2xl p-4"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-black/10">
                      <Image src={thumb} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                      <span className="font-medium text-sm leading-tight">{item.title}</span>
                      {item.variant_title && (
                        <span className="text-xs text-black/40">Size: {item.variant_title}</span>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-black/20 rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-base hover:bg-black/5 transition"
                          >−</button>
                          <span className="w-7 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-base hover:bg-black/5 transition"
                          >+</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-full gap-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-black/30 hover:text-black transition"
                      >
                        <FiTrash2 size={15} />
                      </button>
                      <span className="font-semibold text-sm">
                        {formatKWD(item.unit_price * item.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-black/10 px-6 py-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-black/60 tracking-wide uppercase">Subtotal</span>
              <span className="font-semibold text-lg">{totalFormatted}</span>
            </div>
            <p className="text-xs text-black/40">
              Taxes and <span className="underline">shipping</span> calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full py-4 rounded-full bg-navy text-white text-sm font-medium text-center hover:opacity-90 transition"
            >
              Proceed to Checkout →
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
