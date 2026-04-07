"use client";

import { delWishItem, getLoggedWish } from "@/Actions/Wish.Action";
import { Wish, Products } from "@/types/Products";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaTag,
  FaShieldAlt,
  FaTruck,
  FaBoxOpen,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { addCartApi } from "@/Actions/Cart.Actions";
import { toast } from "sonner";
import { NumOfItems } from "@/Context/NumCartItemProvider";
import { NumOfWish } from "@/Context/NumWishItemProvider";

function WishCardSkeleton() {
  return (
    <div
      className="bg-white rounded-2xl p-4 flex gap-4 animate-pulse"
      style={{
        boxShadow: "0px 1px 3px 0px #0000001A, 0px 1px 2px -1px #0000001A",
      }}
    >
      <div className="w-24 h-24 bg-gray-100 rounded-xl shrink-0" />
      <div className="flex flex-col gap-2 flex-1 justify-center">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-4 bg-gray-100 rounded-full w-1/4 mt-2" />
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="w-24 h-9 bg-gray-100 rounded-xl" />
        <div className="w-24 h-9 bg-gray-100 rounded-xl" />
      </div>
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden animate-pulse"
      style={{
        boxShadow: "0px 1px 3px 0px #0000001A, 0px 1px 2px -1px #0000001A",
      }}
    >
      <div className="h-16 bg-gray-200" />
      <div className="p-5 flex flex-col gap-4">
        <div className="h-4 bg-gray-100 rounded-full w-full" />
        <div className="h-4 bg-gray-100 rounded-full w-2/3" />
        <div className="h-px bg-gray-100 w-full" />
        <div className="h-11 bg-gray-100 rounded-xl" />
        <div className="h-11 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

function EmptyWish() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
      <div
        className="w-24 h-24 rounded-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
        }}
      >
        <FaHeart className="w-10 h-10 text-red-500 opacity-60" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-800">
          Your wishlist is empty
        </h2>
        <p className="text-sm text-gray-400 max-w-xs">
          Save items you love and come back to them anytime!
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        style={{
          background: "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)",
        }}
      >
        <FaHeart className="w-3.5 h-3.5" />
        Explore Products
      </Link>
    </div>
  );
}

function WishCard({
  item,
  onDelete,
}: {
  item: Products;
  onDelete: (id: string) => void;
}) {
  const inStock = item.quantity > 0;

  const { itemsOfCart, setItemOfCart } = useContext(NumOfItems);

  const [addingToCart, setAddingToCart] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { itemsOfWish, setItemOfWish, wishList, setWishList } =
    useContext(NumOfWish);
  const isWished = wishList.includes(item._id);

  async function handleAddtoCart(id: string) {
    setAddingToCart(true);
    try {
      await addCartApi(id);
      toast.success("Added to cart!", {
        duration: 3000,
        position: "top-center",
      });
      setItemOfCart(itemsOfCart + 1);
    } catch {
      toast.error("Something went wrong", {
        description: "Could not add item to cart. Please try again.",
      });
    } finally {
      setAddingToCart(false);
    }
  }

  async function handleDeleteWish(id: string) {
    setDeleting(true);
    try {
      await delWishItem(id);
      setItemOfWish(itemsOfWish - 1);
      setWishList(wishList.filter((wishId : string) => wishId !== id));
      onDelete(id); 
    } catch {
      toast.error("Could not remove item. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl p-4 flex gap-4 items-center"
      style={{
        boxShadow: "0px 1px 3px 0px #0000001A, 0px 1px 2px -1px #0000001A",
      }}
    >
      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
        <img
          src={item.imageCover}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="text-xs text-gray-400 truncate">{item.category?.name}</p>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-base font-bold text-gray-900 mt-1">
          {item.priceAfterDiscount > 0 ? (
            <span className="flex items-center gap-2">
              <span className="text-red-500">
                {item.priceAfterDiscount} EGP
              </span>
              <span className="text-xs text-gray-400 line-through">
                {item.price} EGP
              </span>
            </span>
          ) : (
            <span>{item.price} EGP</span>
          )}
        </p>
        <span
          className={`mt-1 w-fit text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
            inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
          }`}
        >
          <FaBoxOpen className="w-2.5 h-2.5" />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        <button
          onClick={() => handleAddtoCart(item._id)}
          disabled={addingToCart || !inStock}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs
                    font-semibold text-white transition-all duration-200
                    hover:opacity-90 active:scale-[0.97] cursor-pointer
                    disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)",
          }}
        >
          {addingToCart ? (
            <>
              <svg
                className="w-3 h-3 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
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
              Adding...
            </>
          ) : (
            <>
              <FaShoppingCart className="w-3 h-3" />
              Add to Cart
            </>
          )}
        </button>

        <button
          onClick={() => handleDeleteWish(item._id)}
          disabled={deleting}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs
                    font-medium text-red-500 border border-red-100 bg-red-50
                    hover:bg-red-500 hover:text-white hover:border-red-500
                    transition-all duration-200 cursor-pointer
                    disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {deleting ? (
            <>
              <svg
                className="w-3 h-3 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
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
              Removing...
            </>
          ) : (
            <>
              <FaTrash className="w-3 h-3" />
              Remove
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function WishlistPage() {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function getWishItems() {
    try {
      const res: Wish = await getLoggedWish();
      setProducts(res.data as unknown as Products[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWishItems();
  }, []);

  const isEmpty = !loading && (!products || products.length === 0);
  const count = products?.length ?? 0;

  return (
    <div className="px-10 py-8 flex flex-col gap-8 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm text-muted-foreground">
          <Link
            className="hover:text-gray-900 duration-300 transition-all"
            href="/"
          >
            Home
          </Link>{" "}
          / <span className="font-medium text-foreground">Wishlist</span>
        </p>
        <div className="p-4 mb-2 flex gap-4 items-center">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
            <FaHeart className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Wishlist</h1>
            <p className="text-sm text-muted-foreground">
              {loading ? (
                <span className="inline-block w-32 h-3 bg-gray-200 rounded-full animate-pulse" />
              ) : (
                <>
                  You have{" "}
                  <span className="text-red-500 font-semibold">
                    {count} items
                  </span>{" "}
                  saved
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {isEmpty && <EmptyWish />}

      {!isEmpty && (
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-3/5">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <WishCardSkeleton key={i} />
                ))
              : null}
            <AnimatePresence>
              {!loading &&
                products?.map((item) => (
                  <WishCard
                    key={item._id}
                    item={item}
                    onDelete={(id) =>
                      setProducts(
                        (prev) => prev?.filter((p) => p._id !== id) ?? null,
                      )
                    }
                  />
                ))}
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-2/5 lg:sticky lg:top-6">
            {loading ? (
              <SummarySkeleton />
            ) : (
              <div
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0px 1px 3px 0px #0000001A, 0px 1px 2px -1px #0000001A",
                }}
              >
                <div
                  className="px-5 py-4 flex items-center gap-3"
                  style={{
                    background:
                      "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)",
                  }}
                >
                  <FaHeart className="text-white w-4 h-4" />
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight">
                      Wishlist Summary
                    </h2>
                    <p className="text-red-100 text-sm">{count} saved items</p>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-3 bg-[#FFF1F2] rounded-xl px-4 py-3">
                    <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                      <FaTag className="text-red-500 w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-red-500 font-semibold text-sm">
                        {
                          products?.filter((p) => p.priceAfterDiscount > 0)
                            .length
                        }{" "}
                        items on sale
                      </p>
                      <p className="text-red-400 text-xs">
                        Don't miss out on discounts!
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex flex-col gap-3 pt-2"
                    style={{ borderTop: "1px solid #F3F4F6" }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Total items</span>
                      <span className="text-gray-800 text-sm font-medium">
                        {count}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">In stock</span>
                      <span className="text-green-500 text-sm font-semibold">
                        {products?.filter((p) => p.quantity > 0).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">
                        Out of stock
                      </span>
                      <span className="text-red-400 text-sm font-semibold">
                        {products?.filter((p) => p.quantity === 0).length}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full cursor-pointer flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)",
                    }}
                  >
                    <FaShoppingCart className="w-3.5 h-3.5" />
                    Add All to Cart
                  </button>

                  <div
                    className="flex items-center justify-center gap-4 pt-1"
                    style={{ borderTop: "1px solid #F3F4F6" }}
                  >
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <FaShieldAlt className="w-3 h-3 text-red-400" />
                      Secure
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <FaTruck className="w-3 h-3 text-blue-400" />
                      Fast Delivery
                    </div>
                  </div>

                  <Link
                    href="/"
                    className="text-center text-red-500 text-sm font-medium hover:underline transition-all duration-200"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
