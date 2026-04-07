"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiUser, HiEnvelope, HiPhone, HiLockClosed, HiEye, HiEyeSlash } from "react-icons/hi2";
import { toast } from "sonner";
import { updateUserData, updateUserInfo } from "../../../Actions/Auth.actions";

export default function SettingsPage() {
  // Profile form
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Password form
  const [passSaving, setPassSaving] = useState(false);
  const [passForm, setPassForm] = useState({
    currentPassword: "",
    password: "",
    rePassword: "",
  });
  const [show, setShow] = useState({
    currentPassword: false,
    password: false,
    rePassword: false,
  });

  const toggleShow = (key: keyof typeof show) =>
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));

  // Handlers
  const handleProfileSave = async () => {
    setProfileSaving(true);
    try {
      const res = await updateUserData({
        name: profileForm.name,
        email: profileForm.email,
        phone: Number(profileForm.phone),
      });
      console.log(res);
      
      if (res.message === "success") {
        toast.success("Profile updated successfully");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePassSave = async () => {
    if (passForm.password.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (passForm.password !== passForm.rePassword) {
      toast.error("Passwords do not match");
      return;
    }
    setPassSaving(true);
    try {
      const res = await updateUserInfo({
        curPass: passForm.currentPassword,
        pass: passForm.password,
        rePass: passForm.rePassword,
      });
      if (res.message === "success") {
        toast.success("Password updated successfully");
        setPassForm({ currentPassword: "", password: "", rePassword: "" });
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } finally {
      setPassSaving(false);
    }
  };

  // Fields
  const profileFields: {
    key: keyof typeof profileForm;
    label: string;
    placeholder: string;
    icon: React.ElementType;
    type?: string;
  }[] = [
    { key: "name", label: "Full Name", placeholder: "Ahmed Hassan", icon: HiUser },
    { key: "email", label: "Email Address", placeholder: "Enter your email", icon: HiEnvelope, type: "email" },
    { key: "phone", label: "Phone Number", placeholder: "01xxxxxxxxx", icon: HiPhone, type: "tel" },
  ];

  const passFields: {
    key: keyof typeof passForm;
    label: string;
    placeholder: string;
    hint?: string;
  }[] = [
    { key: "currentPassword", label: "Current Password", placeholder: "Enter your current password" },
    { key: "password", label: "New Password", placeholder: "Enter your new password", hint: "Must be at least 6 characters" },
    { key: "rePassword", label: "Confirm New Password", placeholder: "Confirm your new password" },
  ];

  const Spinner = () => (
    <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );

  return (
    <div className="flex flex-col gap-6 w-4/5 shrink-0">
      {/* Profile Info */}
      <div className="rounded-[20px] border border-[#F3F4F6] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] bg-white overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-[#F3F4F6]">
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <HiUser className="text-lg text-green-600" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Account</p>
              <h2 className="text-base font-bold text-gray-900">Profile Information</h2>
              <p className="text-xs font-medium text-gray-400 mt-0.5">Update your personal details</p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            {profileFields.map(({ key, label, placeholder, icon: Icon, type }) => (
              <div key={key}>
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                  <Icon className="text-xs" />
                  {label}
                </label>
                <input
                  type={type ?? "text"}
                  placeholder={placeholder}
                  value={profileForm[key]}
                  onChange={(e) => setProfileForm({ ...profileForm, [key]: e.target.value })}
                  disabled={profileSaving}
                  className="w-full text-sm font-medium border border-[#F3F4F6] rounded-xl px-3.5 py-2.5 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-gray-300 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <motion.button
              whileTap={{ scale: profileSaving ? 1 : 0.97 }}
              onClick={handleProfileSave}
              disabled={profileSaving}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-500 transition-colors shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {profileSaving ? <><Spinner /> Saving…</> : <><HiUser className="text-base" /> Save Changes</>}
            </motion.button>
          </div>
        </div>

        <div className="bg-gray-50 border-t border-[#F3F4F6] px-6 py-5">
          <p className="text-sm font-bold text-gray-800 mb-4">Account Information</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">User ID</span>
              <span className="text-xs font-semibold text-gray-500">—</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Role</span>
              <span className="text-[11px] font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-[20px] p-6 border border-[#F3F4F6] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] bg-white">
        <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-[#F3F4F6]">
          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <HiLockClosed className="text-lg text-orange-500" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Account</p>
            <h2 className="text-base font-bold text-gray-900">Change Password</h2>
            <p className="text-xs font-medium text-gray-400 mt-0.5">Update your account password</p>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          {passFields.map(({ key, label, placeholder, hint }) => (
            <div key={key}>
              <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                <HiLockClosed className="text-xs" />
                {label}
              </label>
              <div className="relative">
                <input
                  type={show[key] ? "text" : "password"}
                  placeholder={placeholder}
                  value={passForm[key]}
                  onChange={(e) => setPassForm({ ...passForm, [key]: e.target.value })}
                  disabled={passSaving}
                  className="w-full text-sm font-medium border border-[#F3F4F6] rounded-xl px-3.5 py-2.5 pr-10 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-gray-300 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => toggleShow(key)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {show[key] ? <HiEyeSlash className="text-base" /> : <HiEye className="text-base" />}
                </button>
              </div>
              {hint && (
                <p className="text-[11px] font-medium text-gray-400 mt-1.5">{hint}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <motion.button
            whileTap={{ scale: passSaving ? 1 : 0.97 }}
            onClick={handlePassSave}
            disabled={passSaving}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-400 transition-colors shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {passSaving ? <><Spinner /> Saving…</> : <><HiLockClosed className="text-base" /> Change Password</>}
          </motion.button>
        </div>
      </div>
    </div>
  );
}