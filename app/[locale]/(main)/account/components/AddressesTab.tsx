"use client";

import { useState } from "react";
import { FiMapPin, FiTrash2, FiPlus } from "react-icons/fi";
import { addCustomerAddress, deleteCustomerAddress } from "../../../../actions";

const AddressesTab = ({ customer, onRefresh }: { customer: any; onRefresh: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [form, setForm] = useState({
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

  const addresses = customer?.addresses || [];

  const handleAddAddress = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.address1 ||
      !form.city ||
      !form.province ||
      !form.postalCode ||
      !form.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    try {
      const res = await addCustomerAddress({
        first_name: form.firstName,
        last_name: form.lastName,
        address_1: form.address1,
        address_2: form.address2,
        city: form.city,
        province: form.province,
        postal_code: form.postalCode,
        country_code: form.countryCode,
        phone: form.phone,
      });
      if (res.success) {
        alert("Address added successfully!");
        onRefresh();
        setShowForm(false);
        setForm({
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
      } else {
        alert(res.error || "Failed to add address");
      }
    } catch (err: any) {
      alert(err.message || "Failed to add address");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    setDeletingId(id);
    try {
      const res = await deleteCustomerAddress(id);
      if (res.success) {
        alert("Address deleted successfully!");
        onRefresh();
      } else {
        alert(res.error || "Failed to delete address");
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden bg-white">
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
          className="flex items-center gap-2 px-4 max-md:px-2 py-2 rounded-full border-2 border-gold bg-gold/20 md:text-sm max-md:text-xs font-medium hover:bg-navy hover:text-white transition cursor-pointer"
        >
          <FiPlus className="size-[14px] max-md:size-[8px]" />
          Add Address
        </button>
      </div>

      <div className="max-md:py-6 max-md:px-4 p-6 flex flex-col gap-4 bg-white">
        {showForm && (
          <div className="border-2 border-gold/40 rounded-2xl p-5 bg-gold/5 flex flex-col gap-3">
            <p className="text-sm font-medium">New Address</p>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 bg-white">
              <input
                placeholder="First Name *"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30"
              />
              <input
                placeholder="Last Name *"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30"
              />
              <input
                placeholder="Address Line 1 *"
                value={form.address1}
                onChange={(e) => setForm({ ...form, address1: e.target.value })}
                className="border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30 col-span-2 max-md:col-span-1"
              />
              <input
                placeholder="Address Line 2 (Optional)"
                value={form.address2}
                onChange={(e) => setForm({ ...form, address2: e.target.value })}
                className="border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30 col-span-2 max-md:col-span-1"
              />
              <input
                placeholder="City *"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30"
              />
              <input
                placeholder="State / Province *"
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
                className="border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30"
              />
              <input
                placeholder="Postal / ZIP Code *"
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                className="border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30"
              />
              <input
                placeholder="Phone Number *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border border-black/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition bg-white placeholder:text-black/30"
              />
            </div>
            <div className="flex gap-3 mt-1 bg-white">
              <button
                disabled={saving}
                onClick={handleAddAddress}
                className="flex-1 py-3 rounded-full bg-navy text-white text-sm font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Address"}
              </button>
              <button
                disabled={saving}
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-full border border-black/20 text-sm hover:border-black transition cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="text-center py-8 text-black/40 text-sm">
            No saved addresses found. Click "Add Address" to register shipping details.
          </div>
        ) : (
          addresses.map((addr: any, index: number) => {
            const isDefault = index === 0;
            return (
              <div
                key={addr.id}
                className={`border rounded-2xl p-5 flex flex-col gap-3 transition-all bg-white ${
                  isDefault ? "border-gold bg-gold/5" : "border-black/10"
                }`}
              >
                <div className="flex items-start justify-between bg-white">
                  <p className="font-medium text-sm">
                    {addr.first_name || ""} {addr.last_name || ""}
                  </p>
                  {isDefault && (
                    <span className="text-[8px] bg-gold text-navy font-semibold px-2.5 py-1 rounded-full tracking-wide">
                      DEFAULT
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-2 text-sm text-black/60 bg-white">
                  <FiMapPin size={13} className="mt-0.5 shrink-0 text-black/30" />
                  <p className="leading-relaxed bg-white">
                    {addr.address_1}
                    {addr.address_2 ? `, ${addr.address_2}` : ""}
                    <br />
                    {addr.city}, {addr.province} — {addr.postal_code}
                    <br />
                    {(addr.country_code || "KW").toUpperCase()}
                  </p>
                </div>

                {addr.phone && (
                  <div className="flex items-center gap-2 text-sm text-black/50 bg-white">
                    <span className="text-black/30">📞</span>
                    <span>{addr.phone}</span>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-2 border-t border-black/8 bg-white">
                  <button
                    disabled={deletingId !== null}
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition cursor-pointer ml-auto disabled:opacity-50"
                  >
                    <FiTrash2 size={12} /> {deletingId === addr.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AddressesTab;