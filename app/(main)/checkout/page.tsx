"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";
import { FiLock } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { formatKWD } from "@/lib/types";
import medusa from "@/lib/medusa";

/* ─── helpers ──────────────────────────────────────────────────────────── */
type ShippingOption = { id: string; name: string; amount: number };

const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white placeholder:text-black/30"
  />
);

const SectionHeading = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
      {number}
    </span>
    <h2 className="font-serif text-xl leading-none">{title}</h2>
  </div>
);

/* ─── main page ──────────────────────────────────────────────────────────── */
export default function CheckoutPage() {
  const { cart, items } = useCart();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [address, setAddress]     = useState("");
  const [city, setCity]           = useState("Kuwait City");
  const [area, setArea]           = useState("");

  // Shipping
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string>("");

  // UI
  const [step, setStep] = useState<"details" | "shipping" | "payment" | "done">("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  // Load shipping options when cart is ready
  useEffect(() => {
    if (!cart?.id) return;
    medusa.store.fulfillment
      .listCartOptions({ cart_id: cart.id })
      .then((res) => {
        const opts = ((res as { shipping_options?: { id: string; name: string; amount: number }[] }).shipping_options ?? []).map((o) => ({
          id: o.id,
          name: o.name,
          amount: o.amount,
        }));
        setShippingOptions(opts);
        if (opts.length) setSelectedShipping(opts[0].id);
      })
      .catch(() => {});
  }, [cart?.id]);

  const cartSubtotal = items.reduce((sum, item) => {
    const price = item.unit_price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  const selectedOption = shippingOptions.find((o) => o.id === selectedShipping);
  const shippingCost   = selectedOption?.amount ?? 0;
  const cartTotal      = cartSubtotal + shippingCost;

  /* ── step 1: save address → step 2 ── */
  const handleAddressNext = async () => {
    if (!cart?.id) return;
    if (!firstName || !lastName || !email || !phone || !address) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await (medusa.store.cart as unknown as {
        update: (id: string, data: object) => Promise<unknown>;
      }).update(cart.id, {
        email,
        shipping_address: {
          first_name: firstName,
          last_name: lastName,
          phone,
          address_1: address,
          city,
          province: area,
          country_code: "kw",
        },
        billing_address: {
          first_name: firstName,
          last_name: lastName,
          phone,
          address_1: address,
          city,
          province: area,
          country_code: "kw",
        },
      });
      setStep("shipping");
    } catch {
      setError("Failed to save address. Please try again.");
    }
    setLoading(false);
  };

  /* ── step 2: add shipping → step 3 ── */
  const handleShippingNext = async () => {
    if (!cart?.id || !selectedShipping) return;
    setLoading(true);
    try {
      await (medusa.store.cart as unknown as {
        addShippingMethod: (id: string, data: object) => Promise<unknown>;
      }).addShippingMethod(cart.id, { option_id: selectedShipping });
      setStep("payment");
    } catch {
      setError("Failed to apply shipping. Please try again.");
    }
    setLoading(false);
  };

  /* ── step 3: complete cart (Cash on Delivery) ── */
  const handlePlaceOrder = async () => {
    if (!cart?.id) return;
    setLoading(true);
    setError("");
    try {
      // Add a payment session for manual/COD provider
      await (medusa.store.payment as unknown as {
        initiatePaymentSession: (cart: { id: string }, data: object) => Promise<unknown>;
      }).initiatePaymentSession({ id: cart.id }, { provider_id: "pp_system_default" });

      const result = await (medusa.store.cart as unknown as {
        complete: (id: string) => Promise<{ type: string; order?: { id: string } }>;
      }).complete(cart.id);

      if (result.type === "order" && result.order?.id) {
        setOrderId(result.order.id);
        setStep("done");
        localStorage.removeItem("medusa_cart_id");
      } else {
        setError("Order could not be completed. Please try again.");
      }
    } catch {
      setError("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  /* ── empty cart guard ── */
  if (items.length === 0 && step !== "done") {
    return (
      <section className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-5">
        <p className="font-serif text-3xl">Your cart is empty</p>
        <Link href="/shop" className="px-8 py-4 bg-navy text-white rounded-full text-sm font-medium">
          Continue Shopping
        </Link>
      </section>
    );
  }

  /* ── success screen ── */
  if (step === "done") {
    return (
      <section className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-5">
        <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center">
          <IoMdCheckmark className="text-navy text-3xl" />
        </div>
        <h1 className="font-serif text-4xl text-center">Order Placed!</h1>
        <p className="text-black/50 text-center max-w-sm">
          Thank you for your order. We&apos;ll contact you on <strong>{phone}</strong> to confirm delivery.
        </p>
        {orderId && (
          <p className="text-xs text-black/30 font-mono">Order ID: {orderId.slice(0, 20)}…</p>
        )}
        <Link href="/" className="px-8 py-4 bg-navy text-white rounded-full text-sm font-medium mt-4">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream px-5 py-12 md:px-16">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10">

        {/* ── Left: Form Steps ── */}
        <div className="flex flex-col gap-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-black/40 tracking-widest uppercase">
            <Link href="/shop" className="hover:text-black">Shop</Link>
            <span>/</span>
            <span className="text-black">Checkout</span>
          </div>

          <h1 className="font-serif text-4xl leading-none">Checkout</h1>

          {/* STEP 1 — Contact & Address */}
          <div className={`rounded-2xl border-2 p-6 transition-all ${step === "details" ? "border-gold" : "border-black/10"}`}>
            <SectionHeading number="1" title="Contact & Delivery Address" />
            {step === "details" ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First name *" value={firstName} onChange={setFirstName} />
                  <Input placeholder="Last name *"  value={lastName}  onChange={setLastName} />
                </div>
                <Input placeholder="Email address *" type="email" value={email} onChange={setEmail} />
                <Input placeholder="Phone number (Kuwait) *" type="tel" value={phone} onChange={setPhone} />
                <Input placeholder="Street address *" value={address} onChange={setAddress} />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="City" value={city} onChange={setCity} />
                  <Input placeholder="Area / Block" value={area} onChange={setArea} />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handleAddressNext}
                  disabled={loading}
                  className="mt-2 w-full py-4 bg-navy text-white rounded-full font-bold text-sm hover:bg-navy/90 disabled:opacity-50 transition"
                >
                  {loading ? "Saving…" : "Continue to Shipping →"}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-black/60">{firstName} {lastName} · {phone}</p>
                <button onClick={() => setStep("details")} className="text-xs text-gold underline">Edit</button>
              </div>
            )}
          </div>

          {/* STEP 2 — Shipping */}
          <div className={`rounded-2xl border-2 p-6 transition-all ${step === "shipping" ? "border-gold" : "border-black/10"}`}>
            <SectionHeading number="2" title="Delivery Method" />
            {step === "shipping" ? (
              <div className="flex flex-col gap-4">
                {shippingOptions.length === 0 && (
                  <p className="text-sm text-black/40">Loading options…</p>
                )}
                {shippingOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between border-2 rounded-xl px-5 py-4 cursor-pointer transition ${
                      selectedShipping === opt.id ? "border-gold bg-gold/10" : "border-black/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.id}
                        checked={selectedShipping === opt.id}
                        onChange={() => setSelectedShipping(opt.id)}
                        className="accent-gold w-4 h-4"
                      />
                      <span className="text-sm font-medium">{opt.name}</span>
                    </div>
                    <span className="text-sm font-bold">
                      {opt.amount === 0 ? "FREE" : formatKWD(opt.amount)}
                    </span>
                  </label>
                ))}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handleShippingNext}
                  disabled={loading || !selectedShipping}
                  className="mt-2 w-full py-4 bg-navy text-white rounded-full font-bold text-sm hover:bg-navy/90 disabled:opacity-50 transition"
                >
                  {loading ? "Applying…" : "Continue to Payment →"}
                </button>
              </div>
            ) : (step as string) === "payment" || (step as string) === "done" ? (
              <div className="flex items-center justify-between">
                <p className="text-sm text-black/60">{selectedOption?.name}</p>
                <button onClick={() => setStep("shipping")} className="text-xs text-gold underline">Edit</button>
              </div>
            ) : (
              <p className="text-sm text-black/30">Complete step 1 first</p>
            )}
          </div>

          {/* STEP 3 — Payment */}
          <div className={`rounded-2xl border-2 p-6 transition-all ${step === "payment" ? "border-gold" : "border-black/10"}`}>
            <SectionHeading number="3" title="Payment" />
            {step === "payment" ? (
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 border-2 border-gold bg-gold/10 rounded-xl px-5 py-4 cursor-pointer">
                  <input type="radio" checked readOnly className="accent-gold w-4 h-4" />
                  <div>
                    <p className="font-medium text-sm">Cash on Delivery</p>
                    <p className="text-xs text-black/50">Pay when your order arrives</p>
                  </div>
                </label>

                <div className="flex items-center gap-2 text-xs text-black/40 mt-1">
                  <FiLock className="w-3 h-3" />
                  <span>Your order is processed securely</span>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="mt-2 w-full py-4 bg-gold border-2 border-gold text-navy rounded-full font-bold text-base hover:bg-navy hover:text-white disabled:opacity-50 transition"
                >
                  {loading ? "Placing order…" : `Place Order · ${formatKWD(cartTotal)}`}
                </button>
              </div>
            ) : (
              <p className="text-sm text-black/30">Complete previous steps first</p>
            )}
          </div>
        </div>

        {/* ── Right: Order Summary ── */}
        <div className="flex flex-col gap-4 sticky top-8 h-fit">
          <div className="rounded-2xl border-2 border-black/10 p-6 bg-white">
            <h3 className="font-serif text-xl mb-5">Order Summary</h3>

            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cream border border-black/10 flex items-center justify-center text-xs text-black/30 shrink-0 overflow-hidden">
                    {item.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      "📦"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight truncate">{item.title}</p>
                    <p className="text-xs text-black/40">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold shrink-0">
                    {formatKWD((item.unit_price ?? 0) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-black/10 mt-4 pt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span>{formatKWD(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : formatKWD(shippingCost)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-black/10">
                <span>Total</span>
                <span>{formatKWD(cartTotal)}</span>
              </div>
            </div>
          </div>

          <Link
            href="/shop"
            className="text-center text-xs text-black/40 hover:text-black underline underline-offset-4 transition"
          >
            ← Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
