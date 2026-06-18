"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiPackage,
  FiChevronDown,
  FiArrowLeft,
  FiMapPin,
  FiTruck,
} from "react-icons/fi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { cancelCustomerOrder } from "../../../../actions";

/* ------------------ TYPES ------------------ */

type OrderItem = {
  id: number | string;
  name: string;
  size: string;
  price: number;
  qty: number;
  image: string;
};

type Order = {
  id: string;
  display_id?: number | string;
  date: string;
  status: "paid" | "shipped" | "delivered" | "pending" | "canceled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  discount?: { code: string; amount: number };
  total: number;
  shippingAddress: string;
  billingAddress: string;
};

/* ------------------ MAPPING FUNCTION ------------------ */

const mapMedusaOrder = (medusaOrder: any): Order => {
  const sa = medusaOrder.shipping_address || {};
  const shippingStr = [
    `${sa.first_name || ""} ${sa.last_name || ""}`.trim(),
    sa.address_1 || "",
    sa.address_2 || "",
    `${sa.city || ""}, ${sa.province || ""} ${sa.postal_code || ""}`.trim(),
    (sa.country_code || "").toUpperCase(),
    sa.phone ? `Phone: ${sa.phone}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const ba = medusaOrder.billing_address || sa || {};
  const billingStr = [
    `${ba.first_name || ""} ${ba.last_name || ""}`.trim(),
    ba.address_1 || "",
    ba.address_2 || "",
    `${ba.city || ""}, ${ba.province || ""} ${ba.postal_code || ""}`.trim(),
    (ba.country_code || "").toUpperCase(),
    ba.phone ? `Phone: ${ba.phone}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  let status: Order["status"] = "pending";
  if (medusaOrder.status === "canceled") {
    status = "canceled";
  } else if (
    medusaOrder.fulfillment_status === "delivered" ||
    medusaOrder.fulfillment_status === "fulfilled"
  ) {
    status = "delivered";
  } else if (medusaOrder.fulfillment_status === "shipped") {
    status = "shipped";
  } else if (
    medusaOrder.payment_status === "captured" ||
    medusaOrder.payment_status === "paid"
  ) {
    status = "paid";
  }

  const items = (medusaOrder.items || []).map((item: any) => ({
    id: item.id,
    name: item.title,
    size: item.variant_title || "Standard",
    price: (item.unit_price ?? 0) / 1000, // KWD uses 1000 fils
    qty: item.quantity ?? 1,
    image: item.thumbnail || "/misc.png",
  }));

  const dateObj = new Date(medusaOrder.created_at || Date.now());
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return {
    id: medusaOrder.id,
    display_id: medusaOrder.display_id,
    date: formattedDate,
    status,
    items,
    subtotal: (medusaOrder.subtotal ?? 0) / 1000,
    shipping: (medusaOrder.shipping_total ?? 0) / 1000,
    taxes: (medusaOrder.tax_total ?? 0) / 1000,
    total: (medusaOrder.total ?? 0) / 1000,
    shippingAddress: shippingStr || "No shipping address specified",
    billingAddress: billingStr || "No billing address specified",
  };
};

/* ------------------ STATUS BADGE ------------------ */

const StatusBadge = ({ status }: { status: Order["status"] }) => {
  const map = {
    paid: {
      label: "Paid",
      classes: "bg-green-50 text-green-600 border-green-200",
    },
    shipped: {
      label: "Shipped",
      classes: "bg-blue-50 text-blue-600 border-blue-200",
    },
    delivered: {
      label: "Delivered",
      classes: "bg-gold/20 text-navy border-gold/30",
    },
    pending: {
      label: "Pending",
      classes: "bg-black/5 text-black/50 border-black/10",
    },
    canceled: {
      label: "Canceled",
      classes: "bg-red-50 text-red-600 border-red-200",
    },
  };
  const { label, classes } = map[status] || map.pending;

  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${classes}`}
    >
      <IoMdCheckmarkCircle size={13} />
      {label.toUpperCase()}
    </span>
  );
};

/* ------------------ ORDER DETAIL VIEW ------------------ */

const OrderDetail = ({
  order,
  onBack,
  onRefreshOrders,
}: {
  order: Order;
  onBack: () => void;
  onRefreshOrders: () => void;
}) => {
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(true);
    try {
      const res = await cancelCustomerOrder(order.id);
      if (res.success) {
        alert("Order canceled successfully!");
        onRefreshOrders();
        onBack();
      } else {
        alert(res.error || "Failed to cancel order.");
      }
    } catch (err: any) {
      alert(err.message || "Failed to cancel order.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden bg-white">
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
            <p className="text-xs text-black/40 mt-0.5">
              Order #{order.display_id || order.id}
            </p>
          </div>

          <StatusBadge status={order.status} />
        </div>

        <p className="text-xs text-black/40 mt-2">Placed on {order.date}</p>

        {/* Actions */}
        <div className="flex gap-3 mt-5 max-sm:flex-col">
          <Link
            href="/shop"
            className="flex-1 py-2.5 text-center text-cream font-medium text-sm bg-navy rounded-full transition cursor-pointer"
          >
            Reorder / Shop More
          </Link>

          {order.status !== "canceled" && order.status !== "delivered" && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex-1 py-2.5 text-sm border border-red-200 text-red-400 rounded-full hover:border-red-400 hover:text-red-500 transition cursor-pointer disabled:opacity-50"
            >
              {cancelling ? "Canceling..." : "Cancel Order"}
            </button>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Package */}
        <div className="border border-black/10 rounded-2xl overflow-hidden bg-white">
          <div className="flex items-center justify-between px-5 py-3.5 bg-black/[0.02] border-b border-black/10">
            <div className="flex items-center gap-3">
              <FiPackage size={15} className="text-black/40" />
              <span className="text-sm font-medium">Package 1 of 1</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium">
              <FiTruck size={13} />
              {order.status === "delivered"
                ? "Delivered"
                : "Active / Processing"}
            </div>
          </div>

          <div className="divide-y divide-black/5">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-black/10 shrink-0 bg-cream/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-black/40 mt-0.5">
                    Size: {item.size}
                  </p>
                  <p className="text-xs text-black/40">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold text-sm">
                  KD {(item.price * item.qty).toFixed(3)}
                </p>
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
          <div className="border border-black/10 rounded-2xl p-5 flex flex-col gap-3 self-start bg-white">
            <p className="text-sm font-medium mb-1">Order Summary</p>

            <div className="flex justify-between text-sm text-black/60">
              <span>
                Subtotal · {order.items.length} item
                {order.items.length !== 1 ? "s" : ""}
              </span>
              <span>KD {order.subtotal.toFixed(3)}</span>
            </div>
            <div className="flex justify-between text-sm text-black/60">
              <span>Shipping</span>
              <span>
                {order.shipping === 0 ? "FREE" : `KD ${order.shipping.toFixed(3)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm text-black/60">
              <span>Taxes</span>
              <span>KD {order.taxes.toFixed(3)}</span>
            </div>

            {order.discount && (
              <div className="flex justify-between text-sm text-darkgold">
                <span>{order.discount.code}</span>
                <span>−KD {order.discount.amount.toFixed(3)}</span>
              </div>
            )}

            <div className="border-t border-black/10 pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>KD {order.total.toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------ ORDERS LIST ------------------ */

const OrdersTab = ({
  orders = [],
  onRefreshOrders,
}: {
  orders: any[];
  onRefreshOrders: () => void;
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const mappedOrders = orders.map(mapMedusaOrder);

  // If a specific order is currently chosen, display detailed tracking page
  if (selectedOrder) {
    // Find current state of selected order in case it was refreshed/canceled
    const currentOrder =
      mappedOrders.find((o) => o.id === selectedOrder.id) || selectedOrder;
    return (
      <OrderDetail
        order={currentOrder}
        onBack={() => setSelectedOrder(null)}
        onRefreshOrders={onRefreshOrders}
      />
    );
  }

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden bg-white">
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

      {mappedOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-black/30 bg-white">
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
        <div className="divide-y divide-black/5 bg-white">
          {mappedOrders.map((order) => (
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
                    className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white bg-cream/30"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
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
                <p className="text-sm font-medium">
                  #{order.display_id || order.id}
                </p>
                <p className="text-xs text-black/40 mt-0.5">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}{" "}
                  · KD {order.total.toFixed(3)}
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
