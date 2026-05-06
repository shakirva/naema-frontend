"use client";

import { useState } from "react";
import { FiUser, FiEdit2, FiMail, FiPhone } from "react-icons/fi";

const user = {
  firstName: "Aisha",
  lastName: "Rahman",
  email: "aisha.rahman@gmail.com",
  phone: "9876543210",
  initials: "AR",
};

const ProfileTab = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden">
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

      <div className="px-6 py-8 flex flex-col gap-6">
        <p className="text-[10px] font-bold tracking-widest text-black/40 uppercase">
          Basic Information
        </p>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
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

export default ProfileTab;