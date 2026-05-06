"use client";

import { useState } from "react";
import { FiMapPin, FiEdit2, FiTrash2, FiPlus, FiCheck } from "react-icons/fi";

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

const AddressesTab = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showForm, setShowForm] = useState(false);

  const setDefault = (id: number) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  const deleteAddress = (id: number) =>
    setAddresses((prev) => prev.filter((a) => a.id !== id));

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between max-md:px-4 px-6 py-5 bg-black/[0.02] border-b border-black/10">
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
          className="flex items-center gap-2 px-4 max-md:px-2 py-2 rounded-full border-2 border-gold bg-gold/20 md:text-sm  max-md:text-xs font-medium hover:bg-navy hover:text-white transition cursor-pointer"
        >
          <FiPlus className="size-[14px] max-md:size-[8px]" />
          Add Address
        </button>
      </div>

      <div className="max-md:py-6 max-md:px-4 p-6 flex flex-col gap-4">
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
            <div className="flex gap-3 mt-1">
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
                <span className="text-[8px] bg-gold text-navy font-semibold px-2.5 py-1 rounded-full tracking-wide">
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
              <span className="text-black/30">📞</span>
              <span>+91 {addr.phone}</span>
            </div>

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

export default AddressesTab;