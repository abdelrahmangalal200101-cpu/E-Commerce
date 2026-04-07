"use client";

import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { FaBox, FaStar, FaTruck, FaArrowRotateLeft } from "react-icons/fa6";
import { OneProduct } from "@/types/Products";

const tabs = [
  { id: "details", label: "Product Details", icon: FaBox },
  { id: "reviews", label: "Reviews", icon: FaStar },
  { id: "shipping", label: "Shipping & Returns", icon: FaTruck },
];

const formatSold = (sold: number) => {
  if (!isFinite(sold) || sold > 1_000_000) return "N/A";
  if (sold >= 1000) return `${(sold / 1000).toFixed(1)}k+ sold`;
  return `${sold}+ sold`;
};

export default function ProductNavs({ product }: { product: OneProduct }) {
  const [activeTab, setActiveTab] = useState("details");  

  return (
    <div className="px-4 mt-14">
      <div className="rounded-[12px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="border-b border-gray-200 px-2">
          <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const count =
                tab.id === "reviews" ? product.ratingsQuantity : undefined;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex ${tab.id === "shipping" ? "hidden md:flex" : ""} items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-4 text-sm font-medium border-b-2 transition-all duration-200 -mb-0.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? "border-homeGreen text-homeGreen"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="text-[18px]" />
                  <span className="text-base font-medium">{tab.label}</span>
                  {count !== undefined && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? "bg-homeGreen text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 md:p-6">
          {activeTab === "details" && <ProductDetailsTab product={product} />}
          {activeTab === "reviews" && <ReviewsTab product={product} />}
          {activeTab === "shipping" && <ShippingTab />}
        </div>
      </div>
    </div>
  );
}

function ProductDetailsTab({ product }: { product: OneProduct }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="font-semibold text-[18px] text-[#101828] mb-2">
          About this Product
        </h4>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 rounded-xl bg-gray-50 p-4">
          <h5 className="font-semibold text-sm text-[#101828] mb-3">
            Product Information
          </h5>
          <div className="flex flex-col">
            {[
              { label: "Category", value: product.category.name },
              {
                label: "Subcategory",
                value: product.subcategory[0]?.name ?? "—",
              },
              { label: "Brand", value: product.brand.name },
              { label: "Items Sold", value: `${formatSold(product.sold)}` },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center pb-3"
              >
                <span className="text-sm text-gray-400">{row.label}</span>
                <span className="text-sm font-semibold text-[#101828]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 rounded-xl bg-gray-50 p-4">
          <h5 className="font-semibold text-sm text-[#101828] mb-3">
            Key Features
          </h5>
          <div className="flex flex-col gap-3">
            {[
              "Premium Quality Product",
              "100% Authentic Guarantee",
              "Fast & Secure Packaging",
              "Quality Tested",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <span className="text-homeGreen font-bold text-sm">✓</span>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ product }: { product: OneProduct }) {
  const reviews = product.reviews ?? [];
  const totalReviews = reviews.length;

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, pct };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex flex-col items-center justify-center min-w-32.5">
          <span className="text-5xl font-black text-[#101828]">
            {product.ratingsAverage.toFixed(1)}
          </span>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < Math.round(product.ratingsAverage)
                    ? "text-[#FCC800]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 mt-1.5 text-center">
            Based on {totalReviews} reviews
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-6 w-full">
          {breakdown.map(({ star, pct }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-10 text-right shrink-0">
                {star} star
              </span>
              <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#FCC800] transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8 shrink-0">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {reviews.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col gap-1.5 p-4 rounded-xl bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#101828]">
                  {review.user.name}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xs ${
                      i < review.rating ? "text-[#FCC800]" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{review.review}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-8">
          <FaStar className="text-4xl text-gray-300" />
          <p className="text-sm text-gray-400">
            Customer reviews will be displayed here.
          </p>
          <button className="text-sm font-semibold text-homeGreen hover:underline">
            Write a Review
          </button>
        </div>
      )}
    </div>
  );
}

function ShippingTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 rounded-xl bg-[#F0FDF4] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-homeGreen flex items-center justify-center shrink-0">
              <FaTruck className="text-white text-sm" />
            </div>
            <h5 className="font-semibold text-[#101828] text-sm">
              Shipping Information
            </h5>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              "Free shipping on orders over $50",
              "Standard delivery: 3-5 business days",
              "Express delivery available (1-2 business days)",
              "Track your order in real-time",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <span className="text-homeGreen font-bold text-sm mt-0.5">
                  ✓
                </span>
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 rounded-xl bg-[#F0FDF4] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-homeGreen flex items-center justify-center shrink-0">
              <FaArrowRotateLeft className="text-white text-sm" />
            </div>
            <h5 className="font-semibold text-[#101828] text-sm">
              Returns & Refunds
            </h5>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              "30-day hassle-free returns",
              "Full refund or exchange available",
              "Free return shipping on defective items",
              "Easy online return process",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <span className="text-homeGreen font-bold text-sm mt-0.5">
                  ✓
                </span>
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gray-50 p-5 flex items-start gap-4">
        <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <FaShieldAlt className="text-gray-500 text-sm" />
        </div>
        <div>
          <h5 className="font-semibold text-sm text-[#101828] mb-1">
            Buyer Protection Guarantee
          </h5>
          <p className="text-sm text-gray-500">
            Get a full refund if your order doesn't arrive or isn't as
            described. We ensure your shopping experience is safe and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
