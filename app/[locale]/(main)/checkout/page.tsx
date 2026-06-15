"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoMdCheckmark } from "react-icons/io";
import { FiChevronDown, FiLock } from "react-icons/fi";
import { useCart } from "../../../context/CartContext";
import { formatPrice } from "@/lib/types";
import medusa from "@/lib/medusa";
import { completeCheckoutFlowServer } from "../../../actions";

type PaymentMethod = "card" | "cod";

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
    type="button"
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
  const { items, total, subtotal, cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [governorate, setGovernorate] = useState("Capital Governorate");
  const [postalCode, setPostalCode] = useState("13001");
  const [phone, setPhone] = useState("+965");

  // Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  // Auto-fill customer details if logged in
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await medusa.store.customer.retrieve().catch(() => null);
        if (res?.customer) {
          setEmail(res.customer.email || "");
          setFirstName(res.customer.first_name || "");
          setLastName(res.customer.last_name || "");
          setPhone(res.customer.phone || "+965");
        }
      } catch (err) {
        // Ignore guest session
      }
    };
    fetchCustomer();
  }, []);

  const shippingTotal =
    cart?.shipping_total || (subtotal > 15 * 1000 ? 0 : 1.5 * 1000);
  const discountTotal =
    cart?.discount_total || (discountApplied ? Math.round(subtotal * 0.1) : 0);
  const grandTotal = total || subtotal + shippingTotal - discountTotal;

  const handleApplyDiscount = () => {
    if (discountCode.toLowerCase() === "naema10") setDiscountApplied(true);
  };

  const handleCompleteOrder = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!cart?.id) return;

    if (!email || !lastName || !address || !city || !phone) {
      setErrorMessage(
        "Please fill in all required fields (Email, Last name, Address, City, Phone).",
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const shippingAddress = {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        address_2: apartment,
        city,
        province: governorate,
        country_code: "kw",
        phone,
        postal_code: postalCode,
      };

      const billingAddress = {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        address_2: apartment,
        city,
        province: governorate,
        country_code: "kw",
        phone,
        postal_code: postalCode,
      };

      // Call the Server Action to safely perform checkout under the active customer session
      const completeRes = await completeCheckoutFlowServer(
        cart.id,
        email,
        shippingAddress,
        billingAddress,
      );

      if (completeRes.success && completeRes.order) {
        setPlacedOrder(completeRes.order);
        clearCart();
      } else {
        throw new Error(
          completeRes.error || "Failed to place your order. Please try again.",
        );
      }
    } catch (err: any) {
      console.error("Checkout failed:", err);
      setErrorMessage(
        err.message || "An unexpected error occurred during order submission.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success UI
  if (placedOrder) {
    return (
      <section className="min-h-screen bg-cream px-6 py-10 md:px-16 flex items-center justify-center">
        <div className="max-w-[600px] w-full bg-white border border-black/10 rounded-3xl p-8 md:p-12 shadow-sm text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-navy font-bold text-3xl">
            ✓
          </div>
          <h1 className="font-serif text-3xl text-navy">
            Order Placed Successfully!
          </h1>
          <p className="text-black/60 text-sm max-w-[400px]">
            Thank you for shopping with Naema. Your order has been registered in
            our system and is currently being processed.
          </p>

          <div className="w-full border-t border-b border-black/5 py-4 my-2 flex justify-between items-center text-sm">
            <span className="text-black/40">Order Reference</span>
            <span className="font-mono font-bold text-navy">
              #{placedOrder.display_id}
            </span>
          </div>

          <div className="w-full text-left bg-cream/40 rounded-2xl p-6 flex flex-col gap-3 text-sm">
            <p className="font-semibold text-black/80 mb-1">Shipping Details</p>
            <p className="text-black/60">
              {placedOrder.shipping_address?.first_name}{" "}
              {placedOrder.shipping_address?.last_name}
            </p>
            <p className="text-black/60">
              {placedOrder.shipping_address?.address_1}
              {placedOrder.shipping_address?.address_2
                ? `, ${placedOrder.shipping_address.address_2}`
                : ""}
            </p>
            <p className="text-black/60">
              {placedOrder.shipping_address?.city},{" "}
              {placedOrder.shipping_address?.province}, Kuwait
            </p>
            <p className="text-black/60">
              Phone: {placedOrder.shipping_address?.phone}
            </p>
          </div>

          <Link
            href="/"
            className="w-full py-4 mt-4 rounded-full bg-navy text-white text-sm font-semibold hover:opacity-90 transition tracking-wide text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream px-6 py-10 md:px-16">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-10">
          <Link href="/">
            <Image
              src="/naemadarklogo.webp"
              width={70}
              height={70}
              alt="Naema"
            />
          </Link>
        </div>

        <form
          onSubmit={handleCompleteOrder}
          className="flex gap-16 max-lg:flex-col"
        >
          <div className="flex-1 flex flex-col gap-10">
            {/* 1. Contact */}
            <div>
              <SectionHeading number="1" title="Contact" />
              <div className="flex flex-col gap-3">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                />
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

            {/* 2. Delivery */}
            <div>
              <SectionHeading number="2" title="Delivery" />
              <div className="flex flex-col gap-3">
                {/* Country Selection strictly Kuwait */}
                <div className="relative">
                  <select className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white appearance-none cursor-pointer">
                    <option value="KW">Kuwait 🇰🇼</option>
                  </select>
                  <FiChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                  />
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name (optional)"
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                  />
                  <input
                    required
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                  />
                </div>

                <input
                  required
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                />
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                />

                <div className="flex gap-3">
                  <input
                    required
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                  />
                  <div className="relative w-full">
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white appearance-none cursor-pointer"
                    >
                      {[
                        "Capital Governorate",
                        "Hawalli Governorate",
                        "Farwaniya Governorate",
                        "Mubarak Al-Kabeer Governorate",
                        "Ahmadi Governorate",
                        "Jahra Governorate",
                      ].map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal Code"
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                  />
                </div>

                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number (e.g., +965 12345678)"
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                />
              </div>
            </div>

            {/* 3. Shipping */}
            <div>
              <SectionHeading number="3" title="Shipping Method" />
              <div className="flex flex-col gap-2">
                {[
                  {
                    label: "Kuwait Standard Shipping",
                    time: "1–2 business days",
                    price: subtotal > 15 * 1000 ? "FREE" : "KD 1.500",
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

            {/* 4. Payment */}
            <div>
              <SectionHeading number="4" title="Payment" />
              <p className="text-xs text-black/40 mb-4 flex items-center gap-1">
                <FiLock size={11} /> All transactions are secure and encrypted.
              </p>

              <div className="flex flex-col gap-2">
                <PaymentOption
                  id="cod"
                  label="Cash on Delivery"
                  description="Pay with Cash or KNET on delivery"
                  icon="💵"
                  selected={paymentMethod === "cod"}
                  onSelect={() => setPaymentMethod("cod")}
                />

                <PaymentOption
                  id="card"
                  label="Credit / Debit Card"
                  description="Visa, Mastercard, KNET cards accepted"
                  icon="💳"
                  selected={paymentMethod === "card"}
                  onSelect={() => setPaymentMethod("card")}
                />
                {paymentMethod === "card" && (
                  <div className="ml-4 pl-4 border-l-2 border-gold/40 flex flex-col gap-3 pb-2 pt-2">
                    <input
                      placeholder="Card number"
                      className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                    />
                    <div className="flex gap-3">
                      <input
                        placeholder="MM / YY"
                        className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                      />
                      <input
                        placeholder="CVV"
                        className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                      />
                    </div>
                    <input
                      placeholder="Name on card"
                      className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
                    />
                  </div>
                )}
              </div>
            </div>

            {errorMessage && (
              <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl p-4">
                ⚠️ {errorMessage}
              </p>
            )}

            <button
              disabled={isSubmitting || items.length === 0}
              type="submit"
              className="w-full py-4 max-lg:hidden rounded-full bg-navy text-gold hover:text-white font-medium text-sm hover:opacity-95 transition tracking-wide disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  Placing Order...
                </>
              ) : (
                "Complete Order →"
              )}
            </button>
          </div>

          {/* Right Summary Column */}
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
                    const thumbnail = item.thumbnail || "/n1.webp";
                    return (
                      <div key={item.id} className="flex gap-3 items-center">
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
                  placeholder="Discount code (try 'NAEMA10')"
                  className="flex-1 border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30"
                />
                <button
                  type="button"
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
                    className={
                      shippingTotal === 0 ? "text-gold font-medium" : ""
                    }
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
                  <span className="text-lg">{formatPrice(grandTotal)}</span>
                </div>
                {subtotal < 15 * 1000 && (
                  <p className="text-xs text-black/40 text-center mt-2">
                    Add {formatPrice(15 * 1000 - subtotal)} more for free
                    shipping
                  </p>
                )}
              </div>

              <button
                disabled={isSubmitting || items.length === 0}
                type="submit"
                className="w-full py-4 lg:hidden rounded-full bg-navy text-gold hover:text-white font-medium text-sm hover:opacity-95 transition tracking-wide disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Complete Order →"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;
