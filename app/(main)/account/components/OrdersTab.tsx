"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiPackage,
  FiChevronDown,
  FiArrowLeft,
  FiMapPin,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import medusa from "@/lib/medusa";
import { formatPrice } from "@/lib/types";

/* ───────── STATUS BADGE ───────── */

type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | string;

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const map: Record<string, { label: string; classes: string }> = {
    pending:    { label: "Pending",    classes: "bg-black/5 text-black/50 border-black/10" },
    processing: { label: "Processing", classes: "bg-blue-50 text-blue-600 border-blue-200" },
    completed:  { label: "Delivered",  classes: "bg-gold/20 text-navy border-gold/30" },
    cancelled:  { label: "Cancelled",  classes: "bg-red-50 text-red-500 border-red-200" },
  };
  const { label, classes } = map[status] ?? map.pending;
  return (
    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${classes}`}>
      <IoMdCheckmarkCircle size={13} />
      {label.toUpperCase()}
    </span>
  );
};

/* ───────── SHIPPING TRACKER ───────── */

const ShipmentTracker = ({ status }: { status: OrderStatus }) => {
  const steps = [
    { key: "pending",    label: "Order Placed",   icon: "📦" },
    { key: "processing", label: "Processing",     icon: "⚙️" },
    { key: "shipped",    label: "Shipped",         icon: "🚚" },
    { key: "completed",  label: "Delivered",       icon: "✅" },
  ];

  const stepIndex = {
    pending: 0,
    processing: 1,
    shipped: 2,
    completed: 3,
  }[status] ?? 0;

  return (
    <div className="border border-black/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <FiTruck size={16} className="text-navy" />
        <p className="text-sm font-medium">Shipment Tracking</p>
      </div>
      <div className="flex items-start gap-0">
        {steps.map((step, i) => (
          <div key={step.key} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 z-10
                  ${i <= stepIndex ? "bg-navy text-white" : "bg-black/5 text-black/30"}`}
              >
                {i <= stepIndex ? "✓" : step.icon}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < stepIndex ? "bg-navy" : "bg-black/10"}`} />
              )}
            </div>
            <p className={`text-[10px] mt-2 text-center max-w-[70px] ${i <= stepIndex ? "text-navy font-medium" : "text-black/30"}`}>
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ───────── ORDER DETAIL ───────── */

const OrderDetail = ({ order, onBack }: { order: Record<string, unknown>; onBack: () => void }) => {
  const items = (order.items as Record<string, unknown>[]) ?? [];
  const shipping = (order.shipping_address as Record<string, string>) ?? {};
  const status = (order.status as OrderStatus) ?? "pending";
  const currency = (order.currency_code as string) ?? "kwd";
  const total = (order.total as number) ?? 0;
  const subtotal = (order.subtotal as number) ?? 0;
  const shippingTotal = (order.shipping_total as number) ?? 0;
  const taxTotal = (order.tax_total as number) ?? 0;
  const displayId = (order.display_id as number) ?? "";

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-black/10 bg-black/[0.02]">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-black/50 hover:text-black transition mb-3 cursor-pointer">
          <FiArrowLeft size={14} /> Back to orders
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-base">Order #{displayId}</h3>
            <p className="text-xs text-black/40 mt-0.5">
              {new Date(order.created_at as string).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Shipment tracker */}
        <ShipmentTracker status={status} />

        {/* Items */}
        <div className="border border-black/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 bg-black/[0.02] border-b border-black/10">
            <div className="flex items-center gap-3">
              <FiPackage size={15} className="text-black/40" />
              <span className="text-sm font-medium">Items ({items.length})</span>
            </div>
          </div>
          <div className="divide-y divide-black/5">
            {items.map((item) => {
              const thumbnail = (item.thumbnail as string) || "/n1.jpg";
              return (
                <div key={item.id as string} className="flex items-center gap-4 px-5 py-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-black/10 shrink-0">
                    <Image src={thumbnail} alt={item.product_title as string} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product_title as string}</p>
                    {(item.variant_title as string) && (
                      <p className="text-xs text-black/40 mt-0.5">{item.variant_title as string}</p>
                    )}
                    <p className="text-xs text-black/40">Qty: {item.quantity as number}</p>
                  </div>
                  <p className="font-semibold text-sm">{formatPrice((item.total as number) ?? 0, currency)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Addresses + Summary */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FiMapPin size={13} className="text-black/30" />
                <p className="text-sm font-medium">Shipping Address</p>
              </div>
              <p className="text-sm text-black/60 leading-relaxed pl-5">
                {shipping.first_name} {shipping.last_name}<br />
                {shipping.address_1}{shipping.address_2 ? `, ${shipping.address_2}` : ""}<br />
                {shipping.city}, {shipping.province} {shipping.postal_code}<br />
                {shipping.country_code?.toUpperCase()}
                {shipping.phone && <><br />Phone: {shipping.phone}</>}
              </p>
            </div>
          </div>

          <div className="border border-black/10 rounded-2xl p-5 flex flex-col gap-3 self-start">
            <p className="text-sm font-medium mb-1">Order Summary</p>
            <div className="flex justify-between text-sm text-black/60">
              <span>Subtotal · {items.length} item{items.length !== 1 ? "s" : ""}</span>
              <span>{formatPrice(subtotal, currency)}</span>
            </div>
            <div className="flex justify-between text-sm text-black/60">
              <span>Shipping</span>
              <span className={shippingTotal === 0 ? "text-gold font-medium" : ""}>
                {shippingTotal === 0 ? "FREE" : formatPrice(shippingTotal, currency)}
              </span>
            </div>
            {taxTotal > 0 && (
              <div className="flex justify-between text-sm text-black/60">
                <span>Tax</span>
                <span>{formatPrice(taxTotal, currency)}</span>
              </div>
            )}
            <div className="border-t border-black/10 pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(total, currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────── ORDERS LIST ───────── */

const OrdersTab = () => {
  const [orders, setOrders] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await medusa.store.order.list({});
      setOrders((res.orders as Record<string, unknown>[]) ?? []);
    } catch (err: unknown) {
      const e = err as { message?: string };
      // If not authenticated, show empty state
      if (e?.message?.includes("401") || e?.message?.includes("unauthorized")) {
        setError("Please log in to view your orders.");
      } else {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  if (selectedOrder) {
    return <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 bg-black/[0.02] border-b border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
            <FiPackage size={18} className="text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">My Orders</p>
            <p className="text-xs text-black/40">Your order history</p>
          </div>
        </div>
        <button onClick={fetchOrders} className="text-black/30 hover:text-black transition cursor-pointer">
          <FiRefreshCw size={16} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-black/40">
          <span className="text-3xl">🔒</span>
          <p className="text-sm">{error}</p>
          <Link href="/login" className="text-sm text-gold underline">Log in</Link>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-black/30">
          <span className="text-5xl">🫙</span>
          <p className="text-sm font-medium">No orders yet</p>
          <p className="text-xs text-center max-w-[240px] leading-relaxed">
            When you place your first order it will appear here.
          </p>
          <Link href="/shop" className="mt-2 px-6 py-2.5 rounded-full border-2 border-gold bg-gold/20 text-sm font-medium text-black hover:bg-navy hover:text-white transition">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-black/5">
          {orders.map((order) => {
            const items = (order.items as Record<string, unknown>[]) ?? [];
            const status = (order.status as OrderStatus) ?? "pending";
            const total = (order.total as number) ?? 0;
            const currency = (order.currency_code as string) ?? "kwd";
            const displayId = (order.display_id as number) ?? "";
            return (
              <button
                key={order.id as string}
                onClick={() => setSelectedOrder(order)}
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-black/[0.02] transition cursor-pointer text-left"
              >
                <div className="flex -space-x-3 shrink-0">
                  {items.slice(0, 2).map((item) => (
                    <div key={item.id as string} className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white">
                      <Image src={(item.thumbnail as string) || "/n1.jpg"} alt={item.product_title as string} fill className="object-cover" />
                    </div>
                  ))}
                  {items.length > 2 && (
                    <div className="w-12 h-12 rounded-xl bg-black/10 border-2 border-white flex items-center justify-center text-xs font-medium text-black/50">
                      +{items.length - 2}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">#{displayId}</p>
                  <p className="text-xs text-black/40 mt-0.5">
                    {items.length} item{items.length !== 1 ? "s" : ""} · {formatPrice(total, currency)}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={status} />
                  <FiChevronDown size={16} className="text-black/30" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
