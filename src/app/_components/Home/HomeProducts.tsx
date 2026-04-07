import React from "react";
import BtnCard from "../Shared/BtnCard";
import Cards from "../Shared/Cards";
import { getAllProducts } from "@/services/products.service";

export default async function HomeProducts() {
  const products = await getAllProducts();  
  
  return (
    <div className="px-10 py-28">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 sm:h-8 rounded-full bg-[linear-gradient(180deg,#00BC7D_0%,#007A55_100%)]"></div>

          <h2 className="text-[#1E2939] font-bold text-xl sm:text-2xl md:text-3xl">
            Fetured <span className="text-homeGreen2">Product</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <Cards products={products} />
        </div>
      </div>
    </div>
  );
}
