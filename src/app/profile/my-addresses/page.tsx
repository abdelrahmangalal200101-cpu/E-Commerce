"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPlus,
  HiMapPin,
  HiPhone,
  HiTrash,
  HiXMark,
  HiUser,
} from "react-icons/hi2";
import { toast } from "sonner";
import {
  AddAddress,
  delAdd,
  getLoggedAdd,
} from "../../../Actions/Address.Actions";

interface Address {
  _id: string;
  name: string;
  details: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AddressesSection() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    details: "",
    city: "",
    phone: "",
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = await AddAddress({
        addname: form.name,
        addDetail: form.details,
        addPhone: Number(form.phone),
        addCity: form.city,
      });

      if (data.status === "success") {
        setAddresses(data.data);
        toast.success(data.message);
        setShowModal(false);
        setForm({ name: "", details: "", city: "", phone: "" });
      } else {
        toast.error(data.message);
      }
    } finally {
      setSaving(false);
    }
  };

  async function handleGet() {
    try {
      const res = await getLoggedAdd();
      setAddresses(res.data);
      const def = res.data.find((a: Address) => a.isDefault);
      if (def) setSelectedId(def._id);
    } finally {
      setLoading(false);
    }
  }

  async function handleDel(id: string) {
    setDeletingId(id);
    try {
      const res = await delAdd(id);
      setAddresses(res.data);
      if (selectedId === id) setSelectedId(null);
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="rounded-[20px] p-6 border border-[#F3F4F6] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] w-4/5 shrink-0 bg-white">
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#F3F4F6]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Account
          </p>
          <h2 className="text-base font-bold text-gray-900">My Addresses</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition-colors shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
        >
          <HiPlus className="text-base" />
          Add address
        </motion.button>
      </div>

      <div className="flex flex-col gap-1">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-4 py-4 rounded-xl animate-pulse"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-gray-100 rounded-full w-1/3" />
                <div className="h-3 bg-gray-100 rounded-full w-2/3" />
                <div className="flex gap-4">
                  <div className="h-3 bg-gray-100 rounded-full w-16" />
                  <div className="h-3 bg-gray-100 rounded-full w-24" />
                </div>
              </div>
            </div>
          ))
        ) : addresses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <HiMapPin className="text-xl text-green-600" />
            </div>
            <p className="text-sm font-bold text-gray-800">No addresses yet</p>
            <p className="text-xs font-medium text-gray-400 mt-1">
              Add your first delivery address
            </p>
          </motion.div>
        ) : (
          addresses.map((addr, i) => {
            const isDeleting = deletingId === addr._id;
            const isSelected = selectedId === addr._id;

            return (
              <motion.div
                key={addr._id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: isDeleting ? 0.5 : 1, x: 0 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className={`relative flex items-start gap-4 px-4 py-4 rounded-xl transition-all duration-200 group
                  ${isSelected ? "bg-green-50" : "hover:bg-gray-50"}
                  ${isDeleting ? "pointer-events-none" : ""}`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="activeBar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-green-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5
                  ${isSelected ? "bg-green-200 text-green-800" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"}`}
                >
                  {getInitials(addr.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p
                      className={`text-sm font-bold ${isSelected ? "text-green-800" : "text-gray-800"}`}
                    >
                      {addr.name}
                    </p>
                    {isSelected && (
                      <span className="text-[11px] font-bold text-green-700 bg-green-200 px-2.5 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate mb-2 font-medium">
                    {addr.details}
                  </p>
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-semibold ${isSelected ? "text-green-600" : "text-gray-400"}`}
                    >
                      <HiMapPin className="text-sm" />
                      {addr.city}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                      <HiPhone className="text-sm" />
                      {addr.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">
                  {/* Default toggle button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedId(isSelected ? null : addr._id)}
                    title={isSelected ? "Remove default" : "Set as default"}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                      ${
                        isSelected
                          ? "text-green-600 bg-green-100"
                          : "text-gray-400 hover:text-green-600 hover:bg-green-100"
                      }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${isSelected ? "border-green-500 bg-green-500" : "border-current"}`}
                    >
                      <AnimatePresence>
                        {isSelected && (
                          <motion.svg
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            viewBox="0 0 10 10"
                            className="w-2.5 h-2.5"
                            fill="none"
                          >
                            <path
                              d="M2 5l2 2 4-4"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>

                  {/* Delete button */}
                  <motion.button
                    whileTap={{ scale: isDeleting ? 1 : 0.94 }}
                    onClick={() => handleDel(addr._id)}
                    disabled={isDeleting}
                    title="Remove"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <svg
                        className="animate-spin w-3.5 h-3.5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    ) : (
                      <HiTrash className="text-base" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm px-4"
            onClick={(e) =>
              !saving && e.target === e.currentTarget && setShowModal(false)
            }
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-[20px] border border-[#F3F4F6] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] p-6 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#F3F4F6]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                    Addresses
                  </p>
                  <h3 className="text-base font-bold text-gray-900">
                    Add new address
                  </h3>
                </div>
                <button
                  onClick={() => !saving && setShowModal(false)}
                  disabled={saving}
                  className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <HiXMark className="text-base" />
                </button>
              </div>

              <div className="flex flex-col gap-3.5">
                {[
                  {
                    key: "name",
                    label: "Full name",
                    placeholder: "Ahmed Hassan",
                    icon: HiUser,
                  },
                  {
                    key: "details",
                    label: "Address details",
                    placeholder: "Street, building…",
                    icon: HiMapPin,
                  },
                  {
                    key: "city",
                    label: "City",
                    placeholder: "Cairo",
                    icon: HiMapPin,
                  },
                  {
                    key: "phone",
                    label: "Phone",
                    placeholder: "+20 100 000 0000",
                    icon: HiPhone,
                  },
                ].map(({ key, label, placeholder, icon: Icon }) => (
                  <div key={key}>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                      <Icon className="text-xs" />
                      {label}
                    </label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      disabled={saving}
                      className="w-full text-sm font-medium border border-[#F3F4F6] rounded-xl px-3.5 py-2.5 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-gray-300 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2.5 mt-6">
                <button
                  onClick={() => !saving && setShowModal(false)}
                  disabled={saving}
                  className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-[#F3F4F6] rounded-xl hover:bg-gray-50 hover:text-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: saving ? 1 : 0.97 }}
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-green-600 rounded-xl hover:bg-green-500 transition-colors shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    "Save address"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
