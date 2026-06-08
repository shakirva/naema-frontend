"use client";

import { useState, useEffect } from "react";
import { FiUser, FiPackage, FiMapPin, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import ProfileTab from "./components/ProfileTab";
import AddressesTab from "./components/AddressesTab";
import OrdersTab from "./components/OrdersTab";
import { getCurrentCustomer, getCustomerOrders, logoutCustomer } from "../../../actions";
import Footer from "../../sections/Footer";

type Tab = "profile" | "orders" | "addresses";

const AccountPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const [customer, setCustomer] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const custRes = await getCurrentCustomer();
      if (!custRes.customer) {
        router.push("/login");
        return;
      }
      setCustomer(custRes.customer);
      const ordRes = await getCustomerOrders();
      if (ordRes.orders) {
        setOrders(ordRes.orders);
      }
    } catch (err) {
      console.error("Failed to load customer details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleLogout = async () => {
    await logoutCustomer();
    router.push("/login");
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-cream px-8 py-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-navy/70 font-medium animate-pulse">Loading your account...</p>
        </div>
      </section>
    );
  }

  const initials = customer
    ? `${customer.first_name?.[0] || ""}${customer.last_name?.[0] || ""}`.toUpperCase()
    : "";

  return (
    <>
    <section className="min-h-screen bg-cream px-8 py-12 max-md:px-4">
      <div className="max-w-[1200px] mx-auto flex gap-8 items-start max-lg:flex-col">

        {/* SIDEBAR */}
        <aside className="w-[25%] max-lg:w-full shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-black/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg tracking-tight">{initials || "U"}</span>
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm leading-tight">
                {customer?.first_name || ""} {customer?.last_name || ""}
              </p>
              <p className="text-xs text-black/40 truncate mt-0.5">{customer?.email || ""}</p>
              {customer?.phone && (
                <p className="text-xs text-black/40 mt-0.5">{customer.phone}</p>
              )}
            </div>
          </div>

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

          <div className="bg-white border border-black/10 rounded-2xl p-3 max-md:hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer text-left"
            >
              <FiLogOut size={16} />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="w-[65%] max-lg:w-full">
          {activeTab === "profile" && <ProfileTab customer={customer} onRefresh={fetchDetails} />}
          {activeTab === "orders" && <OrdersTab orders={orders} onRefreshOrders={fetchDetails} />}
          {activeTab === "addresses" && <AddressesTab customer={customer} onRefresh={fetchDetails} />}
        </div>
        
        <div className="bg-white border w-full border-black/10 rounded-2xl p-3 md:hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer text-left"
          >
            <FiLogOut size={16} />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

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
    <span className={active ? "text-navy" : "text-black/40"}>{icon}</span>
    <div>
      <p className={`text-sm font-medium leading-none ${active ? "text-navy" : "text-black/70"}`}>{label}</p>
      <p className="text-xs text-black/40 mt-0.5">{sub}</p>
    </div>
  </button>
);

export default AccountPage;