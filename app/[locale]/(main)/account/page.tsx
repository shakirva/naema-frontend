"use client";

import { useState } from "react";
import { FiUser, FiPackage, FiMapPin, FiLogOut } from "react-icons/fi";
import ProfileTab from "./components/ProfileTab";

import AddressesTab from "./components/AddressesTab";
import OrdersTab from "./components/OrdersTab";

type Tab = "profile" | "orders" | "addresses";

const user = {
  firstName: "Aisha",
  lastName: "Rahman",
  email: "aisha.rahman@gmail.com",
  phone: "9876543210",
  initials: "AR",
};

const NavItem = ({
  icon, label, sub, active, onClick,
}: {
  icon: React.ReactNode; label: string; sub: string; active: boolean; onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all duration-150 cursor-pointer
      ${active ? "bg-gold/20 border-2 border-gold/40" : "hover:bg-black/5 border-2 border-transparent"}`}
  >
    <span className={active ? "text-navy" : "text-black/40"}>{icon}</span>
    <div>
      <p className={`text-sm font-medium leading-none ${active ? "text-navy" : "text-black/70"}`}>{label}</p>
      <p className="text-xs text-black/40 mt-0.5">{sub}</p>
    </div>
  </button>
);

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  return (
    <section className="min-h-screen bg-cream px-8 py-12 max-md:px-4">
      <div className="max-w-[1200px] mx-auto flex gap-8 items-start max-lg:flex-col">

        {/* SIDEBAR */}
        <aside className="w-[25%] max-lg:w-full shrink-0 flex flex-col gap-4">
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

          <div className="bg-white border border-black/10 rounded-2xl p-3 flex flex-col gap-1">
            <NavItem icon={<FiUser size={17} />}    label="Profile"    sub="Personal info"      active={activeTab === "profile"}   onClick={() => setActiveTab("profile")} />
            <NavItem icon={<FiPackage size={17} />} label="My Orders"  sub="Order history"      active={activeTab === "orders"}    onClick={() => setActiveTab("orders")} />
            <NavItem icon={<FiMapPin size={17} />}  label="Addresses"  sub="Shipping & billing" active={activeTab === "addresses"} onClick={() => setActiveTab("addresses")} />
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-3 max-md:hidden">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer">
              <FiLogOut size={16} />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="w-[65%] max-lg:w-full">
          {activeTab === "profile"   && <ProfileTab />}
          {activeTab === "orders"    && <OrdersTab />}
          {activeTab === "addresses" && <AddressesTab />}
        </div>
        <div className="bg-white border w-full border-black/10 rounded-2xl p-3 md:hidden">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer">
              <FiLogOut size={16} />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
      </div>
      
    </section>
  );
};

export default AccountPage;