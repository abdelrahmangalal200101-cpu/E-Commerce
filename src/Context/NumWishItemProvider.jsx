"use client";

import { getLoggedWish } from "@/Actions/Wish.Action";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export const NumOfWish = createContext();

export default function NumWishItemProvider({ children }) {
  const [itemsOfWish, setItemOfWish] = useState(0);
  const [wishList, setWishList] = useState([]);
  const { status } = useSession();

  async function getWishItems() {
    try {
      const res = await getLoggedWish();
      console.log(res);
      const ids = res.data.map((item) => item._id);
      setWishList(ids);
      setItemOfWish(res.count);
    } catch {
      setItemOfWish(0);
      console.log("you must login first");
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getWishItems();
    } else {
      setItemOfWish(0);
    }
  }, [status]);

  return (
    <NumOfWish.Provider value={{ itemsOfWish, setItemOfWish , wishList , setWishList }}>
      {children}
    </NumOfWish.Provider>
  );
}
