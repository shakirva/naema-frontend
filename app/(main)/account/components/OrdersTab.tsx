"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPackage, FiChevronDown, FiArrowLeft, FiMapPin, FiTruck } from "react-icons/fi";
import { IoMdCheckmarkCircle } from "react-icons/io";

/* ------------------ TYPES ------------------ */

type OrderItem = {
  id: number;
  name: string;
  size: string;
  price: number;
  qty: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  status: "paid" | "shipped" | "delivered" | "pending";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  discount?: { code: string; amount: number };
  total: number;
  shippingAddress: string;
  billingAddress: string;
};

/* ------------------ MOCK DATA ------------------ */

const mockOrders: Order[] = [
  {
    id: "503123524",
    date: "Fri, May 1, 2026",
    status: "shipped",
    items: [
      { id: 1, name: "Amber Dates", size: "500g", price: 1200, qty: 1, image: "/n1.jpg" },
      { id: 2, name: "Royal Dates", size: "1kg", price: 1500, qty: 1, image: "/n2.jpg" },
    ],
    subtotal: 2700,
    shipping: 0,
    taxes: 0,
    discount: { code: "NAEMA10", amount: 270 },
    total: 2430,
    shippingAddress: "Aisha Rahman\n12, Rose Garden, MG Road\nKozhikode, Kerala — 673001\nIndia\nPhone: 9876543210",
    billingAddress: "Aisha Rahman\n12, Rose Garden, MG Road\nKozhikode, Kerala — 673001\nIndia\nPhone: 9876543210",
  },
  {
    id: "501768980",
    date: "Mon, Apr 21, 2026",
    status: "delivered",
    items: [
      { id: 3, name: "Honey Dates", size: "250g", price: 1700, qty: 2, image: "/n3.jpg" },
    ],
    subtotal: 3400,
    shipping: 99,
    taxes: 0,
    total: 3499,
    shippingAddress: "Aisha Rahman\n12, Rose Garden, MG Road\nKozhikode, Kerala — 673001\nIndia\nPhone: 9876543210",
    billingAddress: "Aisha Rahman\n12, Rose Garden, MG Road\nKozhikode, Kerala — 673001\nIndia\nPhone: 9876543210",
  },
  {
    id: "50785427",
    date: "Sat, Apr 5, 2026",
    status: "delivered",
    items: [
      { id: 4, name: "Date Mix Box", size: "2kg", price: 1950, qty: 1, image: "/n4.jpg" },
    ],
    subtotal: 1950,
    shipping: 0,
    taxes: 0,
    total: 1950,
    shippingAddress: "Aisha Rahman\n12, Rose Garden, MG Road\nKozhikode, Kerala — 673001\nIndia\nPhone: 9876543210",
    billingAddress: "Aisha Rahman\n12, Rose Garden, MG Road\nKozhikode, Kerala — 673001\nIndia\nPhone: 9876543210",
  },
];

/* ------------------ STATUS BADGE ------------------ */

const StatusBadge = ({ status }: { status: Order["status"] }) => {
  const map = {
    paid:      { label: "Paid",      classes: "bg-green-50 text-green-600 border-green-200" },
    shipped:   { label: "Shipped",   classes: "bg-blue-50 text-blue-600 border-blue-200" },
    delivered: { label: "Delivered", classes: "bg-gold/20 text-navy border-gold/30" },
    pending:   { label: "Pending",   classes: "bg-black/5 text-black/50 border-black/10" },
  };
  const { label, classes } = map[status];

  return (
    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${classes}`}>
      <IoMdCheckmarkCircle size={13} />
      {label.toUpperCase()}
    </span>
  );
};

/* ------------------ ORDER DETAIL VIEW ------------------ */

const OrderDetail = ({ order, onBack }: { order: Order; onBack: () => void }) => (
  <div className="border border-black/10 rounded-2xl overflow-hidden">
    {/* Header */}
    <div className="px-6 py-5 border-b border-black/10 bg-black/[0.02]">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-black/50 hover:text-black transition mb-3 cursor-pointer"
      >
        <FiArrowLeft size={14} /> Back to orders
      </button>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-base">Order Details</h3>
          <p className="text-xs text-black/40 mt-0.5">Order #{order.id}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <p className="text-xs text-black/40 mt-2">Placed on {order.date}</p>
    </div>

    <div className="p-6 flex flex-col gap-6">
      {/* Package */}
      <div className="border border-black/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/[0.02] border-b border-black/10">
          <div className="flex items-center gap-3">
            <FiPackage size={15} className="text-black/40" />
            <span className="text-sm font-medium">Package 1 of 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium">
            <FiTruck size={13} />
            {order.status === "delivered" ? "Delivered" : "Shipped"}
          </div>
        </div>

        <div className="divide-y divide-black/5">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-5 py-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-black/10 shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-black/40 mt-0.5">Size: {item.size}</p>
                <p className="text-xs text-black/40">Qty: {item.qty}</p>
              </div>
              <p className="font-semibold text-sm">₹{(item.price * item.qty).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Addresses + Summary */}
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">

        {/* Addresses */}
        <div className="flex flex-col gap-4">
          {[
            { label: "Shipping Address", address: order.shippingAddress },
            { label: "Billing Address", address: order.billingAddress },
          ].map(({ label, address }) => (
            <div key={label}>
              <div className="flex items-center gap-2 mb-2">
                <FiMapPin size={13} className="text-black/30" />
                <p className="text-sm font-medium">{label}</p>
              </div>
              <p className="text-sm text-black/60 leading-relaxed whitespace-pre-line pl-5">
                {address}
              </p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border border-black/10 rounded-2xl p-5 flex flex-col gap-3 self-start">
          <p className="text-sm font-medium mb-1">Order Summary</p>

          <div className="flex justify-between text-sm text-black/60">
            <span>Subtotal · {order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
            <span>₹{order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-black/60">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
          </div>
          <div className="flex justify-between text-sm text-black/60">
            <span>Taxes</span>
            <span>₹{order.taxes}</span>
          </div>

          {order.discount && (
            <div className="flex justify-between text-sm text-darkgold">
              <span>{order.discount.code}</span>
              <span>−₹{order.discount.amount.toLocaleString()}</span>
            </div>
          )}

          <div className="border-t border-black/10 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------ ORDERS LIST ------------------ */

const OrdersTab = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (selectedOrder) {
    return (
      <OrderDetail
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 bg-black/[0.02] border-b border-black/10">
        <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
          <FiPackage size={18} className="text-white" />
        </div>
        <div>
          <p className="font-medium text-sm">My Orders</p>
          <p className="text-xs text-black/40">Your order history</p>
        </div>
      </div>

      {mockOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-black/30">
          <span className="text-5xl">🫙</span>
          <p className="text-sm font-medium">No orders yet</p>
          <p className="text-xs text-center max-w-[240px] leading-relaxed">
            When you place your first order it will appear here.
          </p>
          <Link
            href="/shop"
            className="mt-2 px-6 py-2.5 rounded-full border-2 border-gold bg-gold/20 text-sm font-medium text-black hover:bg-navy hover:text-white transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-black/5">
          {mockOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-black/[0.02] transition cursor-pointer text-left"
            >
              {/* Product thumbnails */}
              <div className="flex -space-x-3 shrink-0">
                {order.items.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="w-12 h-12 rounded-xl bg-black/10 border-2 border-white flex items-center justify-center text-xs font-medium text-black/50">
                    +{order.items.length - 2}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">#{order.id}</p>
                <p className="text-xs text-black/40 mt-0.5">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""} · ₹{order.total.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={order.status} />
                <FiChevronDown size={16} className="text-black/30" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;