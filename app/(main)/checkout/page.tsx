"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { IoMdCheckmark } from "react-icons/io";
import { FiChevronDown, FiLock } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "@/lib/types";
import {
  updateCart,
  getShippingOptions,
  addShippingMethod,
  initiatePaymentSession,
  completeCart,
} from "@/lib/api";

type PaymentMethod = "cod" | "card";

const Input = ({
  placeholder,
  type = "text",
  half = false,
  value,
  onChange,
  name,
}: {
  placeholder: string;
  type?: string;
  half?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
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

/* ------------------ CHECKOUT PAGE ------------------ */

const CheckoutPage = () => {
  const { cart, items, total, subtotal, refreshCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [processing, setProcessing] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<{ id: string; name: string; amount: number }[]>([]);

  // Form state
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    countryCode: "kw",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Load shipping options when cart is ready
  useEffect(() => {
    const loadShipping = async () => {
      if (!cart?.id) return;
      try {
        const options = await getShippingOptions(cart.id);
        setShippingOptions(options as { id: string; name: string; amount: number }[]);
      } catch (err) {
        console.error("Failed to load shipping options:", err);
      }
    };
    loadShipping();
  }, [cart?.id]);

  const handlePlaceOrder = async () => {
    if (!cart?.id) return;
    setProcessing(true);

    try {
      // 1. Update cart with customer info
      await updateCart(cart.id, {
        email: form.email || "customer@naema.com",
        shipping_address: {
          first_name: form.firstName || "Customer",
          last_name: form.lastName || "",
          address_1: form.address1 || "Block 1, Street 1",
          address_2: form.address2 || "",
          city: form.city || "Kuwait City",
          province: form.province || "Al Asimah",
          postal_code: form.postalCode || "13000",
          country_code: form.countryCode || "kw",
          phone: form.phone || "",
        },
        billing_address: {
          first_name: form.firstName || "Customer",
          last_name: form.lastName || "",
          address_1: form.address1 || "Block 1, Street 1",
          address_2: form.address2 || "",
          city: form.city || "Kuwait City",
          province: form.province || "Al Asimah",
          postal_code: form.postalCode || "13000",
          country_code: form.countryCode || "kw",
          phone: form.phone || "",
        },
      });

      // 2. Add shipping method if available
      if (shippingOptions.length > 0) {
        await addShippingMethod(cart.id, shippingOptions[0].id);
      }

      // 3. Initialize payment session
      await initiatePaymentSession(cart.id);

      // 4. Complete the cart
      const result = await completeCart(cart.id);
      if (result) {
        localStorage.removeItem("medusa_cart_id");
        await refreshCart();
        // Redirect to success page with order details
        const order = (result as Record<string, unknown>).order as Record<string, unknown> | undefined;
        const orderId = order?.id as string | undefined;
        const displayId = order?.display_id as number | undefined;
        router.push(`/order-success${orderId ? `?order=${orderId}${displayId ? `&display=${displayId}` : ""}` : ""}`);
      }
    } catch (err) {
      console.error("Order failed:", err);
      alert("Order processing failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0 && !processing) {
    return (
      <section className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <span className="text-5xl">🫙</span>
          <h1 className="font-serif text-3xl mt-4 mb-3">Your cart is empty</h1>
          <p className="text-black/60 mb-6">Add some products before checking out.</p>
          <Link href="/shop" className="inline-block px-8 py-3 rounded-full bg-navy text-white font-medium text-sm hover:opacity-90 transition">
            Browse Shop
          </Link>
        </div>
      </section>
    );
  }

  const shipping = cart?.shipping_total ?? 0;
  const discount = cart?.discount_total ?? 0;
  const tax = cart?.tax_total ?? 0;

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
                <Input
                  placeholder="Email address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <SectionHeading number="2" title="Delivery" />
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors bg-white appearance-none cursor-pointer"
                  >
                    <option value="kw">Kuwait</option>
                    <option value="ae">UAE</option>
                    <option value="sa">Saudi Arabia</option>
                    <option value="in">India</option>
                  </select>
                  <FiChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Input placeholder="First name" half name="firstName" value={form.firstName} onChange={handleChange} />
                  <Input placeholder="Last name" half name="lastName" value={form.lastName} onChange={handleChange} />
                </div>

                <Input placeholder="Address" name="address1" value={form.address1} onChange={handleChange} />
                <Input placeholder="Apartment, suite, etc. (optional)" name="address2" value={form.address2} onChange={handleChange} />

                <div className="flex gap-3">
                  <Input placeholder="City" half name="city" value={form.city} onChange={handleChange} />
                  <Input placeholder="Province / State" half name="province" value={form.province} onChange={handleChange} />
                  <Input placeholder="PIN / ZIP code" half name="postalCode" value={form.postalCode} onChange={handleChange} />
                </div>

                <Input placeholder="Phone number" type="tel" name="phone" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            {/* Shipping */}
            <div>
              <SectionHeading number="3" title="Shipping Method" />
              <div className="flex flex-col gap-2">
                {shippingOptions.length > 0 ? (
                  shippingOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className="flex items-center justify-between px-4 py-3.5 border border-black/10 rounded-xl bg-white text-sm"
                    >
                      <div>
                        <p className="font-medium">{opt.name}</p>
                      </div>
                      <span className="font-semibold text-sm">
                        {opt.amount === 0 ? (
                          <span className="text-gold">FREE</span>
                        ) : (
                          formatPrice(opt.amount)
                        )}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-between px-4 py-3.5 border border-black/10 rounded-xl bg-white text-sm">
                    <div>
                      <p className="font-medium">Standard Delivery</p>
                      <p className="text-xs text-black/40 mt-0.5">5–7 business days</p>
                    </div>
                    <span className="font-semibold text-sm text-gold">
                      Calculated at next step
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment */}
            <div>
              <SectionHeading number="4" title="Payment" />
              <p className="text-xs text-black/40 mb-4 flex items-center gap-1">
                <FiLock size={11} /> All transactions are secure and encrypted.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-gold bg-gold/10"
                      : "border-black/10 hover:border-black/30 bg-white"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "cod" ? "border-gold bg-gold" : "border-black/30"
                    }`}
                  >
                    {paymentMethod === "cod" && <IoMdCheckmark size={10} className="text-white" />}
                  </div>
                  <span className="text-xl shrink-0">💵</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Cash on Delivery</p>
                    <p className="text-xs text-black/40 mt-0.5">Pay when your order arrives</p>
                  </div>
                </button>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={processing || items.length === 0}
              className="w-full py-4 max-lg:hidden rounded-full bg-navy text-white font-medium text-sm hover:opacity-90 transition tracking-wide disabled:opacity-50"
            >
              {processing ? "Processing..." : "Place Order →"}
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
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 items-center"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-black/10 shrink-0">
                        <Image
                          src={item.thumbnail || "/n1.jpg"}
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
                            {item.variant_title}
                          </p>
                        )}
                      </div>
                      <span className="text-sm font-semibold">
                        {formatPrice(item.total ?? item.subtotal)}
                      </span>
                    </div>
                  ))
                )}
              </div>

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
                  <span className={shipping === 0 ? "text-gold font-medium" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-gold">
                    <span>Discount</span>
                    <span>−{formatPrice(discount)}</span>
                  </div>
                )}
                {tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-black/60">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                )}
                <div className="border-t border-black/10 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-lg">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={processing || items.length === 0}
                className="w-full py-4 lg:hidden rounded-full bg-navy text-white font-medium text-sm hover:opacity-90 transition tracking-wide disabled:opacity-50"
              >
                {processing ? "Processing..." : "Place Order →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
