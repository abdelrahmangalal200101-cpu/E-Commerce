import Link from "next/link";
import React from "react";
import { FaShop } from "react-icons/fa6";
import Coverpage from "../_components/Shared/Coverpage";
import { getAllProducts } from "@/services/products.service";
import Cards from "../_components/Shared/Cards";

export default async function page() {
  const products = await getAllProducts();

  return (
    <>
      <Coverpage
        href="/"
        pContent="Explore our complete product collection"
        h3Content="All Products"
        bgcolor="bg-[linear-gradient(135deg,_#16A34A_0%,_#22C55E_50%,_#4ADE80_100%)]"
        Icon={FaShop}
        sContent="All Products"
      />
      <div className="px-4 py-8 flex flex-col gap-6">
        <p className="text-secondary font-medium text-sm">
          Showing {products.length} Products
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <Cards products={products} />
        </div>
      </div>
    </>
  );
}
