"use client";

import { getCartItems } from "@/Actions/Cart.Actions";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export const NumOfItems = createContext();

export default function NumCartItemProvider({ children }) {
  const [itemsOfCart, setItemOfCart] = useState(0);
  const { status } = useSession();

  async function getLoggedCart() {
    try {
      const res = await getCartItems();
      let sum = 0;
      res.data.products.forEach((product) => {
        sum += product.count;
      });

      setItemOfCart(sum);
    } catch {
      setItemOfCart(0);
      console.log("you must login first");
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getLoggedCart();
    } else {
      setItemOfCart(0);
    }
  }, [status]);

  return (
    <NumOfItems.Provider value={{ itemsOfCart, setItemOfCart }}>
      {children}
    </NumOfItems.Provider>
  );
}
