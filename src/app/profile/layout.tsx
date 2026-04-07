"use client";
import { FaUser, FaMapMarkerAlt, FaCog } from "react-icons/fa";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Coverpage from "../_components/Shared/Coverpage";

const navItems = [
  {
    label: "Addresses",
    href: "/profile/my-addresses",
    icon: FaMapMarkerAlt,
  },
  {
    label: "Settings",
    href: "/profile/settings",
    icon: FaCog,
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  const username = data?.user.name;
  const pathname = usePathname();

  return (
    <>
      <Coverpage
        bgcolor="bg-[linear-gradient(135deg,_#16A34A_0%,_#22C55E_50%,_#4ADE80_100%)]"
        h3Content={`Welcome ${username}`}
        pContent="Manage your addresses and account settings"
        Icon={FaUser}
        sContent="Profile"
      />

      <div className="py-10 px-6 flex gap-8 items-start justify-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-[20px] p-6 border border-[#F3F4F6] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] w-1/5 shrink-0"
        >
          <div className="mb-6 pb-5 border-b border-gray-100">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
              My Account
            </p>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navItems.map(({ label, href, icon: Icon }, i) => {
              const isActive = pathname === href || pathname.startsWith(href);
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.3 }}
                >
                  <Link
                    href={href}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeBar"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-green-500 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon
                      size={16}
                      className={`transition-colors duration-200 ${
                        isActive
                          ? "text-green-600"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    />
                    {label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-4/5"
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
