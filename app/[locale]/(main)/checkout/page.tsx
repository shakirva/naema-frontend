"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoMdCheckmark } from "react-icons/io";
import { FiChevronDown, FiLock } from "react-icons/fi";
import { useCart } from "../../../context/CartContext";
import { formatPrice } from "@/lib/types";

type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

const Input = ({
  placeholder,
  type = "text",
  half = false,
}: {
  placeholder: string;
  type?: string;
  half?: boolean;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`${
      half ? "w-full" : "w-full"
    } border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30`}
  />
);

const SectionHeading = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
      {number}
    </span>
    <h2 className="font-serif text-xl leading-none">{title}</h2>
  </div>
);

const PaymentOption = ({
  id,
  label,
  description,
  icon,
  selected,
  onSelect,
}: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer ${
      selected
        ? "border-gold bg-gold/10"
        : "border-black/10 hover:border-black/30 bg-white"
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
        selected ? "border-gold bg-gold" : "border-black/30"
      }`}
    >
      {selected && <IoMdCheckmark size={10} className="text-white" />}
    </div>
    <span className="text-xl shrink-0">{icon}</span>
    <div className="flex-1">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-black/40 mt-0.5">{description}</p>
    </div>
  </button>
);

/* ------------------ CHECKOUT PAGE ------------------ */

const CheckoutPage = () => {
  const { items, total, subtotal, cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  // In Medusa, shipping and total are computed in the backend cart. 
  // If cart is available, we use cart values, else fallback to manual computation.
  const shippingTotal = cart?.shipping_total || (subtotal > 999 * 100 ? 0 : 99 * 100);
  const discountTotal = cart?.discount_total || (discountApplied ? Math.round(subtotal * 0.1) : 0);
  const grandTotal = total || (subtotal + shippingTotal - discountTotal);

  const handleApplyDiscount = () => {
    // In a real app this should call a Medusa API endpoint `medusa/carts/${cart.id}/taxes` or `line_items`
    if (discountCode.toLowerCase() === "naema10") setDiscountApplied(true);
  };

  return (
    <section className="min-h-screen bg-cream px-6 py-10 md:px-16">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-10">
          <Link href="/">
            <Image src="/naemadarklogo.png" width={70} height={70} alt="logo" />
          </Link>
        </div>

        <div className="flex gap-16 max-lg:flex-col">
          <div className="flex-1 flex flex-col gap-10">
            {/* 1. Contact */}
            <div>
              <SectionHeading number="1" title="Contact" />
              <div className="flex flex-col gap-3">
                <Input placeholder="Email address" type="email" />
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setEmailUpdates((e) => !e)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      emailUpdates ? "bg-navy border-navy" : "border-black/30"
                    }`}
                  >
                    {emailUpdates && (
                      <IoMdCheckmark size={10} className="text-white" />
                    )}
                  </div>
                  <span className="text-xs text-black/60">
                    Email me with news and exclusive offers
                  </span>
                </label>
              </div>
            </div>

            <div>
              <SectionHeading number="2" title="Delivery" />
              <div className="flex flex-col gap-3">
                {/* Country — India only */}
                <div className="relative">
                  <select className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white appearance-none cursor-pointer">
                    <option value="IN">India</option>
                  </select>
                  <FiChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Input placeholder="First name (optional)" half />
                  <Input placeholder="Last name" half />
                </div>

                <Input placeholder="Address" />
                <Input placeholder="Apartment, suite, etc. (optional)" />

                <div className="flex gap-3">
                  <Input placeholder="City" half />
                  <div className="relative w-full">
                    <select className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white appearance-none cursor-pointer">
                      <option value="">State</option>
                      {[
                        "Andhra Pradesh",
                        "Assam",
                        "Bihar",
                        "Chhattisgarh",
                        "Delhi",
                        "Goa",
                        "Gujarat",
                        "Haryana",
                        "Himachal Pradesh",
                        "Jharkhand",
                        "Karnataka",
                        "Kerala",
                        "Madhya Pradesh",
                        "Maharashtra",
                        "Manipur",
                        "Meghalaya",
                        "Mizoram",
                        "Nagaland",
                        "Odisha",
                        "Punjab",
                        "Rajasthan",
                        "Sikkim",
                        "Tamil Nadu",
                        "Telangana",
                        "Tripura",
                        "Uttar Pradesh",
                        "Uttarakhand",
                        "West Bengal",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                    />
                  </div>
                  <Input placeholder="PIN code" half />
                </div>

                <Input placeholder="Phone number" type="tel" />
              </div>
            </div>

            <div>
              <SectionHeading number="3" title="Shipping Method" />
              <div className="flex flex-col gap-2">
                {[
                  {
                    label: "Standard Delivery",
                    time: "5–7 business days",
                    price: subtotal > 999 * 100 ? "FREE" : "₹99",
                  },
                  {
                    label: "Express Delivery",
                    time: "2–3 business days",
                    price: "₹199",
                  },
                ].map((opt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3.5 border border-black/10 rounded-xl bg-white text-sm"
                  >
                    <div>
                      <p className="font-medium">{opt.label}</p>
                      <p className="text-xs text-black/40 mt-0.5">{opt.time}</p>
                    </div>
                    <span
                      className={`font-semibold text-sm ${opt.price === "FREE" ? "text-gold" : ""}`}
                    >
                      {opt.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading number="4" title="Payment" />
              <p className="text-xs text-black/40 mb-4 flex items-center gap-1">
                <FiLock size={11} /> All transactions are secure and encrypted.
              </p>

              <div className="flex flex-col gap-2">
                <PaymentOption
                  id="upi"
                  label="UPI"
                  description="Pay via GPay, PhonePe, Paytm or any UPI app"
                  icon="📲"
                  selected={paymentMethod === "upi"}
                  onSelect={() => setPaymentMethod("upi")}
                />
                {paymentMethod === "upi" && (
                  <div className="ml-4 pl-4 border-l-2 border-gold/40 pb-2">
                    <Input placeholder="Enter UPI ID (e.g. name@upi)" />
                    <div className="flex gap-3 mt-3">
                      {["gpay", "phonepe", "paytm"].map((app) => (
                        <div
                          key={app}
                          className="px-3 py-2 border border-black/10 rounded-lg text-xs font-medium bg-white text-black/60 capitalize"
                        >
                          {app === "gpay"
                            ? "GPay"
                            : app === "phonepe"
                              ? "PhonePe"
                              : "Paytm"}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <PaymentOption
                  id="card"
                  label="Credit / Debit Card"
                  description="Visa, Mastercard, RuPay accepted"
                  icon="💳"
                  selected={paymentMethod === "card"}
                  onSelect={() => setPaymentMethod("card")}
                />
                {paymentMethod === "card" && (
                  <div className="ml-4 pl-4 border-l-2 border-gold/40 flex flex-col gap-3 pb-2">
                    <Input placeholder="Card number" />
                    <div className="flex gap-3">
                      <Input placeholder="MM / YY" half />
                      <Input placeholder="CVV" half />
                    </div>
                    <Input placeholder="Name on card" />
                  </div>
                )}

                <PaymentOption
                  id="netbanking"
                  label="Net Banking"
                  description="All major Indian banks supported"
                  icon="🏦"
                  selected={paymentMethod === "netbanking"}
                  onSelect={() => setPaymentMethod("netbanking")}
                />
                {paymentMethod === "netbanking" && (
                  <div className="ml-4 pl-4 border-l-2 border-gold/40 pb-2">
                    <div className="relative">
                      <select className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold bg-white appearance-none">
                        <option value="">Select your bank</option>
                        {[
                          "SBI",
                          "HDFC Bank",
                          "ICICI Bank",
                          "Axis Bank",
                          "Kotak Bank",
                          "Punjab National Bank",
                          "Bank of Baroda",
                          "Canara Bank",
                        ].map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                      <FiChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                      />
                    </div>
                  </div>
                )}

                <PaymentOption
                  id="cod"
                  label="Cash on Delivery"
                  description="Pay when your order arrives"
                  icon="💵"
                  selected={paymentMethod === "cod"}
                  onSelect={() => setPaymentMethod("cod")}
                />
              </div>
            </div>

            <button className="w-full py-4 max-lg:hidden rounded-full bg-navy text-white font-medium text-sm hover:opacity-90 transition tracking-wide">
               Complete Order →
            </button>
          </div>

          <div className="w-[380px] max-lg:w-full shrink-0">
            <div className="sticky top-10 flex flex-col gap-6">
              <div className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="font-serif text-lg leading-none">
                  Order Summary
                </h3>

                {items.length === 0 ? (
                  <p className="text-sm text-black/40">No items in cart.</p>
                ) : (
                  items.map((item) => {
                    const thumbnail = item.thumbnail || "/n1.jpg";
                    return (
                      <div
                        key={item.id}
                        className="flex gap-3 items-center"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-black/10 shrink-0 bg-cream">
                          <Image
                            src={thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-navy text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-tight">
                            {item.title || item.product_title}
                          </p>
                          {item.variant_title && (
                            <p className="text-xs text-black/40">
                              Size: {item.variant_title}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice((item.unit_price ?? 0) * item.quantity)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex gap-2">
                <input
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder='Discount code (try "NAEMA10")'
                  className="flex-1 border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="px-5 py-3 rounded-xl border-2 border-gold bg-gold/30 text-sm font-medium hover:bg-navy hover:text-white transition"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <p className="text-xs text-gold font-medium -mt-3">
                  ✓ 10% discount applied!
                </p>
              )}

              <div className="bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">
                    Subtotal · {items.length} item
                    {items.length !== 1 ? "s" : ""}
                  </span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Shipping</span>
                  <span
                    className={shippingTotal === 0 ? "text-gold font-medium" : ""}
                  >
                    {shippingTotal === 0 ? "FREE" : formatPrice(shippingTotal)}
                  </span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-sm text-gold">
                    <span>Discount</span>
                    <span>−{formatPrice(discountTotal)}</span>
                  </div>
                )}
                <div className="border-t border-black/10 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-lg">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
                {subtotal < 999 * 100 && (
                  <p className="text-xs text-black/40 text-center mt-2">
                    Add {formatPrice(999 * 100 - subtotal)} more for free shipping
                  </p>
                )}
              </div>

              <button className="w-full py-4 lg:hidden rounded-full bg-navy text-white font-medium text-sm hover:opacity-90 transition tracking-wide">
                Complete Order →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
