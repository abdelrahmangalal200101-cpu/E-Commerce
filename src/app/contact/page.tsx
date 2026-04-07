"use client"

import { Variants } from "framer-motion";

import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-green-600 py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-3"
        >
          Get In Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-green-100 text-lg"
        >
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info Cards */}
        <div className="flex flex-col gap-5">
          {[
            {
              icon: FaPhone,
              title: "Phone",
              lines: ["+1 (800) 123-4567", "Mon - Fri, 9am - 6pm"],
            },
            {
              icon: FaEnvelope,
              title: "Email",
              lines: ["support@freshcart.com", "We reply within 24 hours"],
            },
            {
              icon: FaMapMarkerAlt,
              title: "Address",
              lines: ["123 Commerce Street", "New York, NY 10001"],
            },
            {
              icon: FaClock,
              title: "Working Hours",
              lines: ["Mon - Fri: 9am – 6pm", "Sat: 10am – 4pm"],
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <card.icon className="text-green-600" size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">{card.title}</p>
                {card.lines.map((l) => (
                  <p key={l} className="text-sm text-gray-500">{l}</p>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Social */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex gap-3 mt-1">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white hover:border-green-600 transition"
              >
                <Icon size={15} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
        >
          {sent ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-16 gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Message Sent!</h2>
              <p className="text-gray-500">Thanks for reaching out. We'll get back to you soon.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600 font-medium">Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600 font-medium">Email Address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@email.com"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-sm text-gray-600 font-medium">Subject</label>
                  <input
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-sm text-gray-600 font-medium">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}