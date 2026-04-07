import React from "react";
import pic from "../../../assets/a.shrink-0.svg";
import HomeAddresses from "../Shared/HomeComp/HomeAddresses";
import {
  FaShieldAlt,
  FaTruck,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { ImHeadphones } from "react-icons/im";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="py-4 px-4 bg-homeGreen/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          <HomeAddresses
            icon={FaTruck}
            textclr="homeGreen2"
            hcontent="Free Shipping"
            pcontent="On orders over 500 EGP"
            bg="bg-transparent"
          />
          <HomeAddresses
            icon={FaShieldAlt}
            textclr="homeGreen2"
            hcontent="Secure Payment"
            pcontent="100% secure transactions"
            bg="bg-transparent"
          />
          <HomeAddresses
            icon={FaArrowRotateLeft}
            textclr="homeGreen2"
            hcontent="Easy Returns"
            pcontent="14-day return policy"
            bg="bg-transparent"
          />
          <HomeAddresses
            icon={ImHeadphones}
            textclr="homeGreen2"
            hcontent="24/7 Support"
            pcontent="Dedicated support team"
            bg="bg-transparent"
          />
        </div>
      </div>
      <div
        style={{ backgroundColor: "#101828" }}
        className="text-gray-400 w-full"
      >
        <div className="w-full px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-3 bg-white rounded-lg px-5 py-3 mb-6">
              <Image src={pic} alt="FreshCart" className="h-8 w-auto" />
            </div>

            <p className="text-base leading-8 text-gray-300 mb-8">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at competitive 
              prices with a seamless shopping experience.
            </p>

            <div className="space-y-3 text-base">
              <div className="flex items-center gap-3">
                <FaPhone className="text-homeGreen" size={16} />
                <span>+1 (800) 123-4567</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-homeGreen" size={16} />
                <span>support@freshcart.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-homeGreen" size={16} />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 flex items-center justify-center rounded-full border hover:bg-homeGreen border-gray-700 hover:border-homeGreen hover:text-white transition"
                  >
                    <Icon size={16} />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Links Sections */}
          {[
            {
              title: "Shop",
              items: [
                "All Products",
                "Categories",
                "Brands",
                "Electronics",
                "Men's Fashion",
                "Women's Fashion",
              ],
            },
            {
              title: "Account",
              items: [
                "My Account",
                "Order History",
                "Wishlist",
                "Shopping Cart",
                "Sign In",
                "Create Account",
              ],
            },
            {
              title: "Support",
              items: [
                "Contact Us",
                "Help Center",
                "Shipping Info",
                "Returns & Refunds",
                "Track Order",
              ],
            },
            {
              title: "Legal",
              items: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3 text-base">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1d2939]">
          <div className="w-full px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-base text-gray-500">
            <span>© 2026 FreshCart. All rights reserved.</span>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <FaCcVisa size={26} />
                <span>Visa</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCcMastercard size={26} />
                <span>Mastercard</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCcPaypal size={26} />
                <span>PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
