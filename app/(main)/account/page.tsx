"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiUser, FiPackage, FiMapPin, FiLogOut,
  FiEdit2, FiTrash2, FiPlus, FiCheck, FiPhone, FiMail,
} from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

/* ------------------ MOCK USER ------------------ */

const user = {
  firstName: "Aisha",
  lastName: "Rahman",
  email: "aisha.rahman@gmail.com",
  phone: "9876543210",
  initials: "AR",
};

/* ------------------ TYPES ------------------ */

type Tab = "profile" | "orders" | "addresses";

type Address = {
  id: number;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pin: string;
  phone: string;
  isDefault: boolean;
};

/* ------------------ MOCK ADDRESSES ------------------ */

const initialAddresses: Address[] = [
  {
    id: 1,
    name: "Aisha Rahman",
    line1: "12, Rose Garden, MG Road",
    line2: "Near City Mall",
    city: "Kozhikode",
    state: "Kerala",
    pin: "673001",
    phone: "9876543210",
    isDefault: true,
  },
  {
    id: 2,
    name: "Aisha Rahman",
    line1: "45, Greenview Apartments",
    city: "Calicut",
    state: "Kerala",
    pin: "673002",
    phone: "9876543210",
    isDefault: false,
  },
];

/* ------------------ SIDEBAR NAV ITEM ------------------ */

const NavItem = ({
  icon,
  label,
  sub,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all duration-150 cursor-pointer
      ${active ? "bg-gold/20 border-2 border-gold/40" : "hover:bg-black/5 border-2 border-transparent"}`}
  >
    <span className={`${active ? "text-navy" : "text-black/40"}`}>{icon}</span>
    <div>
      <p className={`text-sm font-medium leading-none ${active ? "text-navy" : "text-black/70"}`}>{label}</p>
      <p className="text-xs text-black/40 mt-0.5">{sub}</p>
    </div>
  </button>
);

/* ------------------ PROFILE TAB ------------------ */

const ProfileTab = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });

  return (
    <div className="border  border-black/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-black/[0.02] border-b border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
            <FiUser size={18} className="text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">Profile Details</p>
            <p className="text-xs text-black/40">Manage your personal information</p>
          </div>
        </div>
        <button
          onClick={() => setEditing((e) => !e)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 text-sm hover:border-gold transition cursor-pointer"
        >
          <FiEdit2 size={13} />
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-8 flex flex-col gap-6">
        <p className="text-[10px] font-bold  text-black/40 uppercase">
          Basic Information
        </p>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
          {/* First name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-black/50">First Name</label>
            <div className="relative">
              <FiUser size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
              <input
                disabled={!editing}
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full border border-black/15 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-gold transition disabled:bg-black/[0.02] disabled:text-black/60 bg-white"
              />
            </div>
          </div>

          {/* Last name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-black/50">Last Name</label>
            <div className="relative">
              <FiUser size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
              <input
                disabled={!editing}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full border border-black/15 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-gold transition disabled:bg-black/[0.02] disabled:text-black/60 bg-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-black/50">Email Address</label>
            <div className="relative">
              <FiMail size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
              <input
                disabled={!editing}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-black/15 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-gold transition disabled:bg-black/[0.02] disabled:text-black/60 bg-white"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-black/50">Phone Number</label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 border border-black/15 rounded-xl bg-black/[0.02] text-sm text-black/50 shrink-0">
                🇮🇳 +91
              </div>
              <div className="relative flex-1">
                <FiPhone size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                <input
                  disabled={!editing}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-black/15 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-gold transition disabled:bg-black/[0.02] disabled:text-black/60 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {editing && (
          <button
            onClick={() => setEditing(false)}
            className="self-start px-8 py-3 rounded-full bg-navy text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

/* ------------------ ORDERS TAB ------------------ */

const OrdersTab = () => (
  <div className="border border-black/10 rounded-2xl overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-5 bg-black/[0.02] border-b border-black/10">
      <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
        <FiPackage size={18} className="text-white" />
      </div>
      <div>
        <p className="font-medium text-sm">My Orders</p>
        <p className="text-xs text-black/40">Your order history</p>
      </div>
    </div>

    {/* Empty state */}
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
  </div>
);

/* ------------------ ADDRESSES TAB ------------------ */

const AddressesTab = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showForm, setShowForm] = useState(false);

  const setDefault = (id: number) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  const deleteAddress = (id: number) =>
    setAddresses((prev) => prev.filter((a) => a.id !== id));

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-black/[0.02] border-b border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
            <FiMapPin size={18} className="text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">Saved Addresses</p>
            <p className="text-xs text-black/40">Shipping & billing</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 px-2 md:px-4 leading-none  justify-center py-2 rounded-full border-2 border-gold bg-gold/20 text-sm max-md:text-xs font-medium hover:bg-navy hover:text-white transition cursor-pointer"
        >
          <FiPlus className="max-md:size-[8px] size-[12px]"/>
          Add Address
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">

        {/* Add form */}
        {showForm && (
          <div className="border-2 border-gold/40 rounded-2xl p-5 bg-gold/5 flex flex-col gap-3">
            <p className="text-sm font-medium">New Address</p>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
              {["Full Name", "Phone", "Address Line 1", "Address Line 2", "City", "State", "PIN Code"].map((ph) => (
                <input
                  key={ph}
                  placeholder={ph}
                  className={`border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30
                    ${ph === "Address Line 1" || ph === "Address Line 2" ? "col-span-2 max-md:col-span-1" : ""}`}
                />
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-full bg-navy text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
              >
                Save Address
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-full border border-black/20 text-sm hover:border-black transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Address cards */}
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`border rounded-2xl p-5 flex flex-col gap-3 transition-all ${
              addr.isDefault ? "border-gold bg-gold/5" : "border-black/10"
            }`}
          >
            <div className="flex items-start justify-between">
              <p className="font-medium text-sm">{addr.name}</p>
              {addr.isDefault && (
                <span className="text-[8px] leading-none  bg-gold text-navy font-bold px-2.5 py-1 rounded-full ">
                  DEFAULT
                </span>
              )}
            </div>

            <div className="flex items-start gap-2 text-sm text-black/60">
              <FiMapPin size={13} className="mt-0.5 shrink-0 text-black/30" />
              <p className="leading-relaxed">
                {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
                {addr.city}, {addr.state} — {addr.pin}<br />
                India
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-black/50">
              <FiPhone size={12} className="text-black/30" />
              <span>+91 {addr.phone}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2 border-t border-black/8">
              <button className="flex items-center gap-1.5 text-xs text-black/50 hover:text-black transition cursor-pointer">
                <FiEdit2 size={12} /> Edit
              </button>
              
              {!addr.isDefault && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="flex items-center gap-1.5 text-xs text-black/50 hover:text-navy transition cursor-pointer"
                >
                  <FiCheck size={12} /> Set Default
                </button>
              )}
              <button
                onClick={() => deleteAddress(addr.id)}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition cursor-pointer ml-auto"
              >
                <FiTrash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------ PAGE ------------------ */

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <section className="min-h-screen bg-cream px-8 py-12 max-md:px-4">
      <div className="max-w-[1200px] mx-auto flex gap-8 items-start max-lg:flex-col">

        {/* ── SIDEBAR ── */}
        <aside className="w-[280px] max-lg:w-full shrink-0 flex flex-col gap-4">

          {/* User card */}
          <div className="bg-white border border-black/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg tracking-tight">{user.initials}</span>
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm leading-tight">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-black/40 truncate mt-0.5">{user.email}</p>
              <p className="text-xs text-black/40 mt-0.5">+91 {user.phone}</p>
            </div>
          </div>

          {/* Nav */}
          <div className="bg-white border border-black/10 rounded-2xl p-3 flex flex-col gap-1">
            <NavItem
              icon={<FiUser size={17} />}
              label="Profile"
              sub="Personal info"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
            <NavItem
              icon={<FiPackage size={17} />}
              label="My Orders"
              sub="Order history"
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
            />
            <NavItem
              icon={<FiMapPin size={17} />}
              label="Addresses"
              sub="Shipping & billing"
              active={activeTab === "addresses"}
              onClick={() => setActiveTab("addresses")}
            />
          </div>

          {/* Logout */}
          <div className="bg-white border border-black/10 rounded-2xl p-3 max-md:hidden">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer">
              <FiLogOut size={16} />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 max-lg:w-full">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "addresses" && <AddressesTab />}
        </div>

      </div>
       <div className="bg-white border mt-4 border-black/10 rounded-2xl p-3 md:hidden">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer">
              <FiLogOut size={16} />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
    </section>
  );
};

export default AccountPage;